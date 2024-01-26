import React, { useEffect, useState } from 'react'
import '../../StyleSheets/CategoryPage.css'
import { Box } from '@mui/material'
// import { useParams } from 'react-router-dom';
import { getColorByCategory, getProductByCategory, getSpecificProductByColor } from '../../api-helpers';
import SortingFilter from '../Category/SortingFilter';
import CategoryFilter from '../Category/CategoryFilter';
import CategoryItems from '../Category/CategoryItems';
import { useParams } from 'react-router-dom';

const NewCategoryPage = () => {
    const id = useParams().id;
    const name = useParams().name;

    const [colors, setColors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await getColorByCategory(id);
                setColors(res);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [id])

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await getProductByCategory(id);
                setProducts(res);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [id])

    const [sortingCriteria, setSortingCriteria] = useState("alphabet");
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await getSpecificProductByColor('category', id, {sizes: selectedSizes, colors: selectedColors,  sort: sortingCriteria});
                setProducts(res);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [id, selectedColors, selectedSizes, sortingCriteria])
    
  return (
    <Box className='collection_page'>
        <Box className='heading'>
            {/* <img src={collection?.landscape}
                alt="" 
                className='collection_image'
            /> */}
            <p className='collection_name'>{name}</p>
            {/* <p className='collection_description'>{category?.description}</p> */}
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
                <CategoryItems products={products}/>
            </Box>
        </Box>
    </Box>
    
  )
}

export default NewCategoryPage