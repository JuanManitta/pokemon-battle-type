

export const pokemonBattle = (pokemonJugador, pokemonPc) =>{


    const typeBattle = {
       bug:      ['grass','psychic'],
       dragon:   ['flying'],
       electric: ['flying', 'water'],
       fighting: ['ice', 'normal', 'dark', 'steel', 'rock'],
       fire:     ['bug', 'grass', 'ice', 'steel'],
       flying:   ['bug', 'fighting', 'grass'],
       ghost:    ['psychic', 'ghost'],
       grass:    ['ground', 'rock', 'water'],
       ground:   ['electric', 'fire', 'poison', 'rock', 'steel'],
       ice:      ['dragon', 'flying', 'grass', 'ground'],
       normal:   [],
       poison:   ['grass', 'fairy'],
       psychic:  ['fighting', 'psychic'],
       rock:     ['bug', 'fire', 'flying', 'ice'],
       water:    ['fire', 'ground', 'rock'],
       fairy:    ['fighting', 'dragon', 'dark'],
       steel:    ['ice', 'rock', 'fairy'],
       dark:     ['psychic', 'ghost'],
       sinTipo:   []
    };


    const pokemonJugadorType = [pokemonJugador.type];
    const pokemonPcType1 = [pokemonPc.type];
    const pokemonPcType2 = [pokemonPc.type2];

    if ( typeBattle[pokemonJugadorType].includes(pokemonPc.type) 
    || typeBattle[pokemonJugadorType].includes(pokemonPc.type2 )) {
        return 1
      } else if (typeBattle[pokemonPcType1].includes(pokemonJugadorType[0]) 
      || typeBattle[pokemonPcType2].includes(pokemonJugadorType[0])){
        return 2
      } else {
        return 0
      }
      
    }