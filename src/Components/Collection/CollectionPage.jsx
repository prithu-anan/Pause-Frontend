import React, { useEffect, useState } from 'react'
import CollectionItems from './CollectionItems'
import '../../StyleSheets/NewCollection.css'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom';
import { getCollectionById, getColorByCollection, getProductByCollection, getSpecificProductByColor } from '../../api-helpers'
import SortingFilter from '../Category/SortingFilter';
import CategoryFilter from '../Category/CategoryFilter';

const CollectionPage = () => {
    const id = useParams().id;
    const [collection, setCollection] = useState();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
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

    useEffect(() => {
        const fetchData = async () => {
            try{
                const collection = await getCollectionById(id);
                setCollection(collection);
                // console.log(collection);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [id])

    const [colors, setColors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await getColorByCollection(id);
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
                const res = await getProductByCollection(id);
                setProducts(res);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [id])

    const [sortingCriteria, setSortingCriteria] = useState("best");
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await getSpecificProductByColor('collection', id, {sizes: selectedSizes, colors: selectedColors,  sort: sortingCriteria});
                setProducts(res);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [id, selectedColors, selectedSizes, sortingCriteria])

  return (
    <Box className='newcollection_page'>
        <Box className='newheading'>
            <img src={collection?.landscape[0]}
                alt="" 
                className='newcollection_image'
            />
            <p className='newcollection_name'>{collection?.name}</p>
            <p className='newcollection_description'>{collection?.description}</p>
        </Box>
        <Box className='newcollection'>
            <Box className='sort_filter' marginTop={screenWidth > 768 ? 34 : 0}>
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
        <Box className='newitem_container'>
            <CollectionItems id={id}  products={products}/>
        </Box>
        </Box>
    </Box>
    
  )
}

export default CollectionPage