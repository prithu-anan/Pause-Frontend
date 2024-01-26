import React from 'react'
import { Box } from '@mui/material'
import RenderGroup from './CollectionSearch'
import { getAllCollection } from '../../api-helpers';
import CollectionEditCard from './CollectionEditCard';

const CollectionList = () => {
    const [collections, setCollections] = React.useState([]);
    const [displayedCollections, setDisplayedCollections] = React.useState([]);
    const [selectedCollection, setSelectedCollection] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
        try {
            getAllCollection().then((res) => {
            setCollections(res);
            setDisplayedCollections(res);
            });
        } catch (err) {
            console.error(err);
        }
        };

        fetchData();
    }, []);

    React.useEffect(() => {
        if(selectedCollection !== null) setDisplayedCollections([selectedCollection]);
        else setDisplayedCollections(collections);
    }
    ,[selectedCollection, collections])

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        <Box>
            <RenderGroup 
                collections={collections} 
                setCollections={setCollections}
                selectedCollection={selectedCollection}
                setSelectedCollection={setSelectedCollection}
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
            {displayedCollections.map((collection, collectionIndex) => (
              <CollectionEditCard key={collectionIndex} collection={collection}/>
            ))}
          </Box>    
    </Box>
  )
}

export default CollectionList