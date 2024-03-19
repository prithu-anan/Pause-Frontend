import React, { useEffect, useState } from 'react'
import '../../StyleSheets/CategoryPage.css'
import { Box } from '@mui/material'
// import { useParams } from 'react-router-dom';
import CategoryFilter from './CategoryFilter'
import CategoryItems from './CategoryItems'
import { getAllProductColors, getAllProducts, getProductByColor } from '../../api-helpers';
import SortingFilter from './SortingFilter';
import RenderGroup from '../ProductForm/RenderGroup'

const CategoryPage = () => {
    // const id = useParams().id;
    // const name = useParams().name;

    const [colors, setColors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await getAllProductColors();
                setColors(res);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    })

    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = React.useState([]);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await getAllProducts();
                setProducts(res.products);
                setDisplayedProducts(res.products);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    })

    React.useEffect(() => {
        setDisplayedProducts(selectedProduct == null ? products : [selectedProduct]);
    }
    ,[selectedProduct, products])

    const [sortingCriteria, setSortingCriteria] = useState("best");
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await getProductByColor({sizes: selectedSizes, colors: selectedColors,  sort: sortingCriteria});
                setProducts(res);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [selectedColors, selectedSizes, sortingCriteria])

    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // useEffect(() => {
    //   const updateScreenWidth = () => {
    //     setScreenWidth(window.innerWidth);
    //   };
  
    //   window.addEventListener('resize', updateScreenWidth);
  
    //   return () => {
    //     window.removeEventListener('resize', updateScreenWidth);
    //   };

    // }, []);
    
  return (
    <Box className='collection_page'>
        <Box className='heading'>
            {/* <img src={collection?.landscape}
                alt="" 
                className='collection_image'
            /> */}
            <p className='collection_name'>Products</p>
            {/* <p className='collection_description'>{category?.description}</p> */}
        </Box>
        
        <Box 
            display="flex"
            justifyContent="center" 
            alignItems="center" 
            mt={'3vh'} 
            mb={'3vh'}
         >
            <RenderGroup 
                products={products} 
                setProducts={setProducts}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
            />
        </Box>
        
        <Box className='collection'>
            <Box className='sort_filter'>
                <Box className='filter_container'>
                    <SortingFilter 
                        sortingCriteria={sortingCriteria}
                        setSortingCriteria={setSortingCriteria}
                    />
                </Box>
                <Box className='filter_container'>
                    <CategoryFilter 
                        colors={colors}
                        selectedColors={selectedColors}
                        setSelectedColors={setSelectedColors}
                        selectedSizes={selectedSizes}
                        setSelectedSizes={setSelectedSizes}
                    />
                </Box> 
            </Box>           
            <Box className='item_container'>
                <CategoryItems products={displayedProducts}/>
            </Box>
        </Box>
    </Box>
    
  )
}

export default CategoryPage