import { FormControlLabel, Grid, Switch, Typography } from '@mui/material'
import React from 'react'

export const Score = ({
    pcRoundScore,
    playerRoundScore,
    checked,
    setChecked
}) => {


  const handleChange = (event) =>{
    setChecked(event.target.checked)

  }


  return (
    
    
    <Grid item xs={12} sm={3}
        sx={{
          display: {xs:'flex', sm:'grid'},
          placeItems:'center',
          gap:{xs:3, sm: 0}
        }}
      >
        <Typography 
        sx={{ color:'white',
        fontWeight: 'bold',
        fontSize:{xs:'0.5rem',sm:'0.8rem'},
        p:1,
        letterSpacing: 1.2}}
        variant="span">
          PC PUNTOS: {pcRoundScore}
        </Typography>

        <Typography 
        variant="span"
        sx={{backgroundColor:'white',
        display:{xs:'none', sm:'block'},
        borderRadius: '4px',
        fontWeight: 'bold',
        fontSize:'0.8rem',
        width:'45%',
        mt: 6,
        mb: 6,
        textAlign:'center',
        p:1,
        letterSpacing: 1.2}}>
          PUNTOS
        </Typography>

        <Typography 
        sx={{ color:'white',
        fontWeight: 'bold',
        fontSize:{xs:'0.5rem',sm:'0.8rem'},
        p:1,
        letterSpacing: 1.2}}
        variant="span">
          J1 PUNTOS: {playerRoundScore}
        </Typography>

        <FormControlLabel
          sx={{color:'white', mt:{sm:6}}}
          labelPlacement='bottom'
          label={<Typography fontSize={8}>TIPOS</Typography>} 
          control={<Switch checked={checked}
          size='small'
          onChange={handleChange}/>}/>

        
      </Grid>
    
  )
}
