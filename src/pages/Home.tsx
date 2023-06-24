import React from 'react'
import Characters from '../components/Home/Characters'
import { Box } from '@mui/material'
import MusicPlayerSlider from '../components/Home/Media'

 const Home = () => {
   
  return (
    <Box>
      <MusicPlayerSlider/>
      <Characters/>
    </Box>
  )
}
export default Home