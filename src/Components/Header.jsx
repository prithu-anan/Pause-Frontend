import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import CollectionDrawer from './CollectionDrawer';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
// import SearchDrawer from './SearchDrawer';
// import ProductDrawer from './ProductDrawer';
// import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as RRLink } from 'react-router-dom';
import CategoryDrawer from './CategoryDrawer';
import Badge from '@mui/material/Badge';

// const pages = ['Products', 'About Us'];
const settings = [ 'Account', 'Dashboard', 'Logout'];


function ResponsiveAppBar() {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [cart, setCart] = React.useState(null);

  React.useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  React.useEffect(() => {
    const updateCart = () => {
      setCart(localStorage.getItem('cart'));
    };

    updateCart();
  }, []);

  const [scrolling, setScrolling] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()

  const id = JSON.parse(localStorage.getItem('admin'))?._id;
  const admin = JSON.parse(localStorage.getItem('admin')) || null;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    switch (setting) {
      case 'Account':
        navigate(`/admin/${id}`);
        break;
      case 'Dashboard':
        navigate(`/dashboard/${id}`);
        break;
      case 'Logout':
        localStorage.removeItem('admin');
        navigate('/');
        break;
      default:
        // navigate('/');
    }

    return() => {
      setAnchorElUser(null);
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'rgba(255, 255, 255, 0)', padding: '5px'}} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              // color="inherit"
              color={scrolling? "inherit" : 'black'}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                color: 'black !important',
              }}
            >
              <CollectionDrawer close={handleCloseNavMenu}/>
              <CategoryDrawer close={handleCloseNavMenu}/>
              {/* <ProductDrawer /> */}
              <Button style={{ color:'#000000', margin: 18, fontFamily: "'Roboto Mono', monospace" }} component={RRLink} to="/category" onClick={handleCloseNavMenu}>            
                Products            
              </Button>
            </Menu>
          </Box>

          {
            screenWidth <= 768 && (
              <IconButton href='/' sx={{ mr: localStorage.getItem('admin') === null ? 9 : 3 }}>
                <img src="/pause.png"
                  alt="" 
                  height="35px" 
                  width="80px" 
                />
              </IconButton>
            )
          }
          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', marginBottom: 15}}}>
            <CollectionDrawer close={handleCloseNavMenu}/>
            <CategoryDrawer close={handleCloseNavMenu}/>
            
            <Button style={{color: scrolling? 'white' : 'black', marginTop:16, fontFamily: "'Roboto Mono', monospace"}} component={RRLink} to="/category">            
              Products            
            </Button>
          </Box>

          {
            screenWidth > 768 && (
              <IconButton href='/' sx={{ p: 2, mr: localStorage.getItem('admin') === null ? 75 : 70 }}> 
                <img src="/pause.png"
                  alt="" 
                  height="35px" 
                  width="80px" 
                />
              </IconButton>
            )
          }

          <Box sx={{ flexGrow: 0, display: { xs: 'flex' } }}>
            
          {
            cart !== null ? (
              <Badge color="primary" overlap="circular" variant="dot">
                <IconButton href='/cart' sx={{ p: 2 }}> 
                  <ShoppingBagOutlinedIcon sx={{ color: scrolling? 'white' : 'black' }} />
                </IconButton>
              </Badge>
            )
            : (
              <IconButton href='/cart' sx={{ p: 2 }}> 
                <ShoppingBagOutlinedIcon sx={{ color: scrolling? 'white' : 'black' }} />
              </IconButton>
            )
          }
                
                          
            {/* <SearchDrawer /> */}
            {/* <IconButton sx={{ p: 2 }}>
              <SearchOutlinedIcon sx={{ color: 'black' }} />
            </IconButton> */}
            
            {
              admin !== null && (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ pl: 1, pr: 1 }}>
                      <Avatar alt="Pause BD" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                        {/* <Link to={generateRoute(setting)} style={{ textDecoration: 'none', color: 'black' }}> */}
                          <Typography textAlign="center" fontFamily= {"'Roboto Mono', monospace"}>{setting}</Typography>
                        {/* </Link> */}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )
            }
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
