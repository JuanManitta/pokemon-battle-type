import { Grid, Typography } from "@mui/material"
import {motion} from "framer-motion"



export const JugadorPokemonCards = ({
    selectedCardPlayer,
    isPlaying,
    jugadorCartas,
    handleCardBattle,
    checked
}) => {


 
  

  return (

    <Grid container
          justifyContent='center'
          alignContent='end'
          direction="row-reverse">
          {
          jugadorCartas.map( (card, index) => (
            <Grid item
            key={card.id}
            xs={2}
            sx={{display:'flex',
           justifyContent:'center',
             alignItems:'center'}}>

            <motion.button disabled={!isPlaying}
            className={`${selectedCardPlayer === card && 'motion__jugador animate__animated animate__slideInUp animate__faster'}`}
              onClick={() => handleCardBattle (card)} 
              item xs={2}
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: 200, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              >
              <Grid 
                className="pokemon__card"
                sx={{boxShadow: 3, backgroundColor:'#3E5DAF',
                borderRadius:'10px',
                width:{md:'110px', sm: '80px'},
                height:{md:'120px', sm: '60px'},
                display:'flex',
                justifyContent:'center'
                }}>
                <img src={card.img} alt="" />
              </Grid>
              <Typography
              display={`${selectedCardPlayer === card ||checked ? 'block' : 'none'}`}
              sx={{textAlign:'center',
              background: 'linear-gradient(to right bottom,#16213E, #2C427D)',
              color:'white',
              letterSpacing:'1.2px',
              width:'50%',
              fontSize:'0.4rem',
              p: 0.3,
              mt:1,
              ml:0.5,
              boxShadow: 5,
              textTransform:'capitalize',
              borderRadius:'5px'}}>{card.type}</Typography>
            </motion.button>
          </Grid>
    ))
  }         
        </Grid>
  )
}
