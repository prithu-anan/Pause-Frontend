import { Box } from '@mui/material'
import React from 'react'
import '../../StyleSheets/CollectionItems.css'
import ProductCard from '../ProductCard'

const CollectionItems = ({products}) => {
  return (
    <Box className='card_container'>
        {products.map((product, index) => {
            return <ProductCard key={index} product={product}/>
        })}
    </Box>
  )
}

export default CollectionItems