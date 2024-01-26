import * as React from 'react';
import '../../StyleSheets/ProductCard.css';
// import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
// import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { deleteProduct } from '../../api-helpers';
import { Link as RRLink } from 'react-router-dom';


const ProductEditCard = (props) => {
    const handleDeleteProduct = (id) => {
        deleteProduct(id).then((res) => {
            window.location.reload();
        });
    }

  return (
    <Card sx={{ width: '330px', height:650, padding: 0, maxWidth: '100%', boxShadow: 'lg',  display: 'flex', flexDirection: 'column'  }}>
      <CardOverflow>
        {/* <AspectRatio sx={{ minWidth: 200, height: 400}}> */}
          <img
            src={props?.product?.colors[0]?.frontImage}
            srcSet={props?.product?.colors[0]?.frontImage}
            loading="lazy"
            alt=""
            width='100%'
            height='380px'
          />
        {/* </AspectRatio> */}
      </CardOverflow>
      <CardContent sx={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'center' }}> {/* Center-align the text content */}
      <Box
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
          props?.product?.colors?.map((color, index) => (
            <Box key={index}>
                <CircleIcon className='color_selector_circle_icon' style={{ color: color?.name }} />
            </Box>
        ))
        }
      </Box>
      <Link
        href={`/product/${props?.product?._id}`}
        fontWeight="md"
        color="neutral"
        textColor="text.primary"
        overlay
        endDecorator={<ArrowOutwardIcon />}
        sx={{ display: 'block' }}
      >
        {props?.product?.name}
      </Link>

      <Typography
        level="title-lg"
        sx={{ mt: 1, fontWeight: 'xl', textAlign: 'center'}}
        // endDecorator={
        //   <Chip component="span" size="sm" variant="soft" color="success">
        //     Lowest price
        //   </Chip>
        // }
      >
        {props.product.price} BDT
      </Typography>
      <Typography level="body-sm">
        (Only <b>{props?.product?.colors[0]?.sizes[0]?.inStock}</b> left in stock!)
      </Typography>
      <CardOverflow>
        <Button variant="solid" sx={{backgroundColor: 'black'}} size="lg" component={RRLink} to={`/productlist/${props?.product?._id}`}>
          Edit
        </Button>
        <Button variant="solid" sx={{backgroundColor: 'red'}} size="lg" onClick={() => handleDeleteProduct(props?.product?._id)}>
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

export default ProductEditCard;