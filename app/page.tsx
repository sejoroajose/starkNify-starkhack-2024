'use client'

import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Iframe from 'react-iframe'
import AppAppBar from '@/app/components/AppAppBar'
import Hero from '@/app/components/Hero'

export default function LandingPage() {
  return (
    <Box>
      <CssBaseline />
      <AppAppBar />

      <Hero />

      <Box
        sx={{
          mt: { xs: 4, sm: 6 },
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Iframe
          id="explore"
          url="https://starknify.streamlit.app/"
          width="90%"
          height="1000vh"
          display="block"
          position="relative"
          allowFullScreen
        />
      </Box>
    </Box>
  )
}
