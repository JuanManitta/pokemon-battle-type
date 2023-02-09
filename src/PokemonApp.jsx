import { FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import pokeball from './assets/pokeball.svg'
import 'animate.css';

import React, { useState, useEffect } from "react";
import _ from "underscore";
import pokeApi from "./api/pokeApi";
import { Buttons } from "./components/Buttons";
import { Score } from "./components/Score";
import { PcPokemonCards } from "./components/PcPokemonCards";
import { JugadorPokemonCards } from "./components/JugadorPokemonCards";
import { pokemonBattle } from "./helpers/pokemonBattle";


export const PokemonApp = () => {

  const [pokemons, setPokemons] = useState([]);
  const [jugadorCartas, setJugadorCartas] = useState([])
  const [pcCartas, setPcCartas] = useState([])
  const [gameOver, setGameOver] = useState(true);
  const [playerRoundScore, setPlayerRoundScore] = useState(0);
  const [pcRoundScore, setPcRoundScore] = useState(0);
  const [selectedCardPlayer, setSelectedCardPlayer] = useState(null);
  const [selectedCardPc, setSelectedCardPc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [battleWinner, setBattleWinner] = useState(null);
  const [checked, setChecked] = useState(false)
  console.log({checked})

  

  useEffect(() => {
    async function fetchData() {
      const {data: pokemons} = await pokeApi.get("/pokemon?limit=250");
      const completePokemons = await Promise.all(
        pokemons.results.map(async(poke, index) => {
            const {data: pokemon} = await pokeApi.get(poke.url);
            return{
                ...poke,
                id: index + 1,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`,
                type: pokemon.types[0].type.name,
                type2: pokemon.types.length > 1 ? pokemon.types[1].type.name : 'sinTipo'
            };
        })
      );
        setPokemons(_.shuffle(completePokemons))
    }
    fetchData();
  }, []);


//START GAME

  const handleStartGame = () =>{
    if(pokemons.length <= 1) return;

    setBattleWinner(null)
    setPcRoundScore(0);
    setPlayerRoundScore(0);
    setGameOver(false)
    setJugadorCartas( selectCards())
    setPcCartas( selectCards() )

    setTimeout (() =>{
      setIsPlaying(true)
    }, 2000)
  }

  const handleNextRound = () =>{
    if(pokemons.length <= 1) return;
    setJugadorCartas( selectCards())
    setPcCartas( selectCards() )
    setIsPlaying(false)
    setBattleWinner(null)

    setTimeout (() =>{
      setIsPlaying(true)
    }, 2000)
  }

  const handleRestart = () =>{
    setPcRoundScore(0);
    setPlayerRoundScore(0);
    setGameOver(true)
    setJugadorCartas([])
    setPcCartas([])
    setIsPlaying(false)
    setBattleWinner(null)
  }

//SELECCIONAR CARTAS PARA CADA JUGADOR

  const selectCards = () =>{
    let cards = [];

    for( let i = 0; i < 6; i++){
        let pokemonSelected = pokemons[i];
        cards.push(pokemonSelected);
        pokemons.splice(i, 1);
    }
    return cards
  }


  const handleCardBattle = (carta) => {

    let pcSelectedCard = pcCartas[0]
    setPcCartas(pcCartas);
    
    setBattleWinner(null)
    setSelectedCardPlayer(carta);
    setSelectedCardPc(pcSelectedCard);

    setIsPlaying(false)

    setTimeout(() => {

      const remainingCards = jugadorCartas.filter ( cartas => cartas.id !== carta.id);
      setJugadorCartas(remainingCards)
      
      pcSelectedCard = pcCartas.shift();
      setPcCartas(pcCartas);
      
      setIsPlaying(true)

      const result = pokemonBattle(carta, pcSelectedCard);
      if (result === 1) {
        setPlayerRoundScore(playerRoundScore +1)
        setBattleWinner(1)
      } else if (result === 2){
        setPcRoundScore(pcRoundScore + 1)
        setBattleWinner(2)
      } else {
        return setBattleWinner(null)
      }
    }, 1000);
    
  }
  

  

  


  return (
    <>
 
    <Grid
    container
      sx={{
        minHeight: "100vh",
        background: 'linear-gradient(to right bottom,#16213E, #2C427D)',
        display: "flex",
        flexDirection:{lg:'row', md: 'row', sm: 'row', xs:'column'},
        alignItems: "center",
        justifyContent: "center"
      }}
    >

      <Buttons
      handleStartGame={handleStartGame}
      handleNextRound={handleNextRound}
      handleRestart={handleRestart}
      gameOver={gameOver}
      jugadorCartas={jugadorCartas}/>

      <Grid item xs={12} sm={6}
        style={{
          borderRadius: "5px",
          boxShadow: 5,
          background: 'linear-gradient(to right top,#3A56A2, #9AACDB)',
          height: "100%",
          padding:'1rem',
          width: "100%",
          display:'grid',
          gridTemplateRows:'repeat(3, 27vh)',
        }}
      >
        <PcPokemonCards
        pcCartas={pcCartas}
        selectedCardPc ={selectedCardPc}
        checked={checked}/>

        <Grid container
        justifyContent='center'
        alignContent='center'>

          <Typography
          display={battleWinner === null ? 'block' : 'none'}>
           <img className="img__pokeball" src={pokeball} alt=""/> 
          </Typography>

          <Typography
          className="animate__animated animate__zoomIn animate__faster"
          display={battleWinner === 1 ? 'block' : 'none'}
          variant="h6"
          sx={{backgroundColor: 'white',
          borderRadius: '5px',
          fontWeight:'bold',
          fontSize:12,
          p:0.4,
          boxShadow: 3 }}>
            J1 GANA
          </Typography>

          <Typography
          className="animate__animated animate__zoomIn animate__faster"
          display={battleWinner === 2 ? 'block' : 'none'}
          variant="h6"
          sx={{backgroundColor: 'white',
          borderRadius: '5px',
          fontWeight:'bold',
          fontSize:12,
          p:0.4,
          boxShadow:3}}>
            PC GANA
          </Typography>


        </Grid>

        <JugadorPokemonCards
        selectedCardPlayer={selectedCardPlayer}
        isPlaying={isPlaying}
        jugadorCartas={jugadorCartas}
        handleCardBattle={handleCardBattle}
        checked={checked}/>

      </Grid>

      <Score
      pcRoundScore={pcRoundScore}
      playerRoundScore={playerRoundScore}
      checked={checked}
      setChecked={setChecked}
      />

      
  

    </Grid>
  </>
);
}
