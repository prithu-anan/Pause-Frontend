import { Box } from '@mui/material'
import React from 'react'
import '../../StyleSheets/CollectionItems.css'
import ProductCard from '../ProductCard'

const CollectionItems = ({ products }) => {
  return (
    <Box className='card_container'>
      {products?.map((product, index) => {
        // Use `map` on `product.colors` and return the result
        return product?.colors?.map((color, item) => {
          // Return the ProductCard component inside the inner `map` function
          return <ProductCard key={item} item={item} product={product} />;
        });
      })}
    </Box>
  );
};


export default CollectionItems