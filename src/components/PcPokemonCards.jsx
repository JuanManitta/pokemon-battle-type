import { Grid, Typography } from '@mui/material'
import {motion} from "framer-motion"


export const PcPokemonCards = ({
  pcCartas,
  selectedCardPc,
  checked
 }) => {
  return (

    <Grid container
        justifyContent='flex-end'
        alignContent='start'
        >
          {
            pcCartas.map( (card, index) => (
              <Grid item
              key={card.id} 
              xs={2}
              sx={{display:'flex',
              justifyContent:'center',
               alignItems:'center'}}>
              <motion.div
                className={`${selectedCardPc === card && 'motion__pc animate__animated animate__slideInDown animate__faster'}`}
                item xs={2}
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: -200, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                >
                <Grid
                  className='pokemon__card' 
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
                        display={`${selectedCardPc === card || checked ? 'block' : 'none'}`}
                        sx={{
                        textAlign:'center',
                        background: 'linear-gradient(to right bottom,#16213E, #2C427D)',
                        color:'white',
                        letterSpacing:'1.2px',
                        fontSize:'0.4rem',
                        width:'60%',
                        height:'17px',
                        p: 0.5,
                        mt:1,
                        ml:0.5,
                        boxShadow: 5,
                        textTransform:'capitalize',
                        borderRadius:'5px'}}>
                          {card.type} / {card.type2 === 'sinTipo' ? '-' : card.type2}
                    </Typography>
                </motion.div>
                </Grid>
              ))
            }
    </Grid>
  )
}
