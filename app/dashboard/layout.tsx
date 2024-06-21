'use client' 

import * as React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
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
import Iframe from 'react-iframe'

const drawerWidth: number = 300

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#333', // Change the color of the AppBar here
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

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

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#333', // Change the primary color
    },
  },
})

const navItems = [
  { text: 'Home', icon: <HomeIcon />, link: '/' },
  { text: 'Tables', icon: <TableChartIcon />, link: '/tables' },
  { text: 'Charts', icon: <BarChartIcon />, link: '/charts' },
  { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
]

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = React.useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleSignOut = () => {
    window.location.href = '/signin' // Redirect to sign-in page after sign-out
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', p: 0 }}>
        {' '}
        {/* Remove the padding */}
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
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
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            p: 0, // Remove padding from the main content area
          }}
        >
          <Toolbar />
          <Box sx={{ p: 0 }}>{children}</Box>{' '}
          {/* Remove padding from the child container */}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Layout
