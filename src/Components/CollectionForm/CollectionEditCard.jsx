import * as React from 'react';
import '../../StyleSheets/ProductCard.css';
// import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
// import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import { Link as RRLink } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { deleteCollection, setFeaturedCollection } from '../../api-helpers';

const CollectionEditCard = (props) => {
    const handleAddToFeatured = (id) => {
        setFeaturedCollection(id).then((res) => {
            window.location.reload();
        });
    }

    const handleDeleteCollection = (id) => {
        deleteCollection(id).then((res) => {
            window.location.reload();
        });
    }

  return (
    <Card sx={{ width: '330px', height:600, padding: 0, maxWidth: '100%', boxShadow: 'lg',  display: 'flex', flexDirection: 'column'  }}>
      <CardOverflow>
        {/* <AspectRatio sx={{ minWidth: 200, height: 400}}> */}
          <img
            src={props?.collection?.portrait}
            srcSet={props?.collection?.portrait}
            loading="lazy"
            alt=""
            width='100%'
            height='380px'
          />
        {/* </AspectRatio> */}
      </CardOverflow>
      <CardContent sx={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'center' }}> {/* Center-align the text content */}
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {
          props?.collection?.colors?.map((color, index) => (
            <Box key={index}>
                <CircleIcon className='color_selector_circle_icon' style={{ color: color?.name }} />
            </Box>
        ))
        }
      </Box> */}
      <Link
        href={`/collection/${props?.collection?._id}`}
        fontWeight="md"
        color="neutral"
        textColor="text.primary"
        overlay
        endDecorator={<ArrowOutwardIcon />}
        sx={{ display: 'block' }}
      >
        {props?.collection?.name}
      </Link>

      {/* <Typography
        level="title-lg"
        sx={{ mt: 1, fontWeight: 'xl', textAlign: 'center'}}
      >
        {props.collection.price} BDT
      </Typography> */}
      <Typography level="body-sm">
        (Total <b>{props?.collection?.order}</b> Orders)
      </Typography>
      <CardOverflow>
        {props?.collection.isFeatured ? (
            <Button variant="solid" sx={{ backgroundColor: 'gray' }} size="lg" disabled>
                Featured
            </Button>
        ) : (
            <Button variant="solid" sx={{ backgroundColor: 'green' }} size="lg" onClick={() => handleAddToFeatured(props?.collection?._id)}>
                Add to Featured
            </Button>
        )}
        <Button variant="solid" sx={{backgroundColor: 'black'}} size="lg" component={RRLink} to={`/collectionlist/${props?.collection?._id}`}>
          Edit
        </Button>
        <Button variant="solid" sx={{backgroundColor: 'red'}} size="lg" onClick={() => handleDeleteCollection(props?.collection?._id)}>
          Delete
        </Button>
      </CardOverflow>
    </CardContent>
      {/* <CardOverflow>
        <Button variant="solid" sx={{backgroundColor: 'black'}} size="lg">
          Add to cart
        </Button>
      </CardOverflow> */}
    </Card>
  );
}

export default CollectionEditCard;