import { Button, Grid, Typography } from '@mui/material'

export const Buttons = ({
    handleStartGame,
    handleNextRound,
    handleRestart,
    gameOver,
    jugadorCartas
}) => {

  


  return (
    <Grid item xs={12} sm={3}
        sx={{
          display: {xs:'flex', sm:'grid' },
          placeItems:'center',
        }}
      > 
        <Button onClick={handleStartGame} sx={{width:'100px', mb: 2, mt:{xs:2, sm:0}  }} variant={gameOver ? 'contained' : 'disabled'}
        size="small">
          <span>Start game</span>
        </Button>
        <Button onClick={handleNextRound} sx={{width:'100px', mb: 2, mt:{xs:2, sm:0} }} color='success' variant={jugadorCartas.length || gameOver > 0 ? 'disabled':'contained'}
        size="small">
          <span>Next round</span>
        </Button>
        <Button onClick={handleRestart} sx={{width:'100px', mt: {xs:0, sm:6 }, opacity:'0.7' }} color='error' variant="contained"
        size="small">
          <span>Restart</span>
        </Button>
        

        <Typography
        sx={{backgroundColor: 'white', p:1.5,
         borderRadius: 2,
         fontSize: 7,
         display:{xs:'none'},
         color:'#22335f',
         textAlign:'justify',
         letterSpacing: 1, ml:4, mr:4, mt: 6,
         textTransform: "uppercase",
         fontWeight: 'bold',
         boxShadow: 5
            }}>
          Si el tipo de tu pokemon le gana el tipo del rival, sumas 1 punto, caso contrario, el rival suma 1 punto.
          Ej: Agua le gana a Fugo.
        </Typography>
     
      </Grid>
  )
}
