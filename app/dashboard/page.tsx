'use client';

import * as React from 'react'
import Iframe from 'react-iframe'

const DashboardPage: React.FC = () => {
  return (
    <Iframe
      url="http://localhost:8501"
      width="100%"
      height="1000vh"
      display="initial"
      position="relative"
      allowFullScreen
    />
  )
}

export default DashboardPage

