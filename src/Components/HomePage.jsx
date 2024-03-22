import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SlideShow from './SlideShow';
import ProductCard from './ProductCard';
import { getBestCollection, getFeaturedCollection, getLatestCollection, getProductByCollection } from '../api-helpers';

const HomePage = () => {
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featured, latest, best] = await Promise.all([
          getFeaturedCollection(),
          getLatestCollection(),
          getBestCollection(),
        ]);

        setCollections([latest, featured, best]);

        const [featuredProducts, latestProducts, bestProducts] = await Promise.all([
          getProductByCollection(featured?._id),
          getProductByCollection(latest?._id),
          getProductByCollection(best?._id),
        ]);

        //change the order here
        setProducts([latestProducts, featuredProducts, bestProducts]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  return (
    <Box>
      {collections?.map((collection, collectionIndex) => (
        <Box key={collectionIndex}>
          <SlideShow _id={collection?._id} name={collection?.name} landscape={screenWidth > 768 ? collection?.landscape : collection?.portrait} />
          <Box
            sx={{
              justifyContent:"space-around",
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              // justifyContent: 'center',
              alignItems: 'center',
              padding: '0px',
              gap: '0px',
            }}
          >
            {products[collectionIndex]?.slice(0, screenWidth > 768 ? 8 : 4).map((product, productIndex) => (              
                product?.colors?.map((color, item) => {
                  return <ProductCard key={item} item={item} product={product}/>
                })              
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HomePage;
