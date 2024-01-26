import React from 'react'
import ImageViewer from './ImageViewer'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom';
// import { getProductById } from '../../api-helpers';

const ProductPage = () => {
  const id = useParams().id;
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);
  
  return (
    <Box
      height={screenWidth > 768 ? '120vh' : '150vh'}
    >
        <Box
          height={'100vh'}
        >
            <ImageViewer id={id}/>
        </Box>
        <Box>

        </Box>
    </Box>
  )
}

export default ProductPage