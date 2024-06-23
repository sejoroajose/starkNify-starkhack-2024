import * as React from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import WalletConnect from '@/app/dynamic' 

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
}

function AppAppBar() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId)
    const offset = 128
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset
      sectionElement.scrollIntoView({ behavior: 'smooth' })
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      })
      setOpen(false)
    }
  }

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <h1 className="text-gray-950 font-extrabold">Starknify</h1>
              {/* <img
                src={'https://imgur.com/FWtbTPv'}
                style={logoStyle}
                alt="Starknify logo"
                onClick={() => (window.location.href = '/')}
              /> */}
            </Box>

            <Box
              sx={{
                flexGrow: 2,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MenuItem
                onClick={() => scrollToSection('explore')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant="body2" color="text.primary">
                  Explore
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => (window.location.href = '/storage_proofs')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant="body2" color="text.primary">
                  Chain Specific Data
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection('')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant="body2" color="text.primary">
                  Swap
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection('')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant="body2" color="text.primary">
                  Bridge
                </Typography>
              </MenuItem>
            </Box>

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
              }}
            >
              <WalletConnect />
            </Box>

            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <MenuItem onClick={() => scrollToSection('explore')}>
                    Explore
                  </MenuItem>
                  <MenuItem
                    onClick={() => (window.location.href = '/storage_proofs')}
                  >
                    Chain Specific Data
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('')}>Swap</MenuItem>
                  <MenuItem onClick={() => scrollToSection('')}>
                    Bridge
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <WalletConnect />
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default AppAppBar
