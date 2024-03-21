import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { getAllCategories } from '../api-helpers';

export default function CategoryDrawer({close}) {
  const [state, setState] = React.useState({left: false, bottom: false});
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        getAllCategories().then((collections) => {setCollections(collections)});
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    // Attach event listener for window resize
    window.addEventListener('resize', updateScreenWidth);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
    close();
  };

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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography component="div" sx={{ p: 2, textAlign: 'center', fontFamily: "'Roboto Mono', monospace", fontWeight: 'bold', fontSize: '30px' }}>
        Categories
      </Typography>
      <List>
        {collections.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{
                backgroundColor: '#FFFFFF',
                margin: 0.5,
                borderRadius: 2,
              }}
              href={`/category/${text.name}/${text._id}`}
            >
              <Typography variant="body1" 
                style={{ 
                  color: 'black', 
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  fontFamily: "'Roboto Mono', monospace" 
                }}>
                {text.name}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box mt={2} ml={2} mr={3}>
      {[(screenWidth > 768) ? 'left' : 'bottom'].map((anchor, index) => (
        <React.Fragment key={index}>
          <Button style={{color:(scrolling && screenWidth > 768) ? 'white' : 'black', fontFamily: "'Roboto Mono', monospace"}} onClick={toggleDrawer(anchor, true)}>            
            Categories            
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {/* <Typography variant="h6" component="div" sx={{ p: 1, textAlign: 'center' }}> */}
              {list(anchor)}
            {/* </Typography> */}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}
