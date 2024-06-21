'use client'

import React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import TableChartIcon from '@mui/icons-material/TableChart'
import BarChartIcon from '@mui/icons-material/BarChart'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Link from 'next/link'
import Button from '@mui/material/Button'
import WalletConnect from '@/app/dynamic'

// Set drawer width
const drawerWidth = 300

// Custom styled component for the Drawer
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

// Define your theme
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
  },
})

// Navigation items
const navItems = [
  { text: 'Starknet Explorer', icon: <HomeIcon />, link: '/' },
  { text: 'Storage Proof', icon: <TableChartIcon />, link: '/tables' },
  { text: 'Bridge', icon: <BarChartIcon />, link: '/charts' },
  { text: 'Account Recovery', icon: <DashboardIcon />, link: '/dashboard' },
]

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = React.useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleSignOut = () => {
    window.location.href = '/signin'
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        
        
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Box sx={{ flexGrow: 1 }}>
            <List>
              {navItems.map((item) => (
                <Link key={item.text} href={item.link} passHref>
                  <ListItem button component="a">
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
          <Box sx={{ p: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ExitToAppIcon />}
              fullWidth
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </Drawer>
        
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            height: '100vh',
            overflow: 'auto',
            p: 3, 
          }}
        >
          
          <WalletConnect />
          <Box sx={{ p: 2 }}>{children}</Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Layout
