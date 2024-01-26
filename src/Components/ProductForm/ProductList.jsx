import React from 'react'
import { Box } from '@mui/material'
import RenderGroup from './RenderGroup'
import { getAllProducts } from '../../api-helpers';
import ProductEditCard from './ProductEditCard';

const ProductList = () => {
    const [products, setProducts] = React.useState([]);
    const [displayedProducts, setDisplayedProducts] = React.useState([]);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
        try {
            getAllProducts().then((res) => {
            setProducts(res.products);
            setDisplayedProducts(res.products);
            });
        } catch (err) {
            console.error(err);
        }
        };

        fetchData();
    }, []);

    React.useEffect(() => {
        if(selectedProduct !== null) setDisplayedProducts([selectedProduct]);
        else setDisplayedProducts(products);
    }
    ,[selectedProduct, products])

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        <Box>
            <RenderGroup 
                products={products} 
                setProducts={setProducts}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
            />
        </Box>
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '50px',
              gap: '30px',
            }}
          >
            {displayedProducts.map((product, productIndex) => (
              <ProductEditCard key={productIndex} product={product}/>
            ))}
          </Box>    
    </Box>
  )
}

export default ProductList