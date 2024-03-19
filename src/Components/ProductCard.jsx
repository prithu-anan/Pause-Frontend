import * as React from 'react';
import '../StyleSheets/ProductCard.css';
// import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
// import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import {Link as RRLink} from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
// import { useParams } from 'react-router-dom';
// import { getProductById } from '../api-helpers';
import { Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const ProductCard = (props) => {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  const cardWidth = screenWidth > 768 ? '330px' : '150px';
  const cardHeight = screenWidth > 768 ? '600px' : 'auto';
  const imgWidth = screenWidth > 768 ? '100%' : 'auto';
  const imgHeight = screenWidth > 768 ? '380px' : 'auto';
  const priceFontSize = screenWidth > 768 ? '20px' : '16px';
  
  return (
    <Card sx={{ width: cardWidth, height: cardHeight, border: 0, padding: 0, maxWidth: '100%', boxShadow: 'lg',  display: 'flex', flexDirection: 'column'  }}>
      <CardOverflow>
        {/* <AspectRatio sx={{ minWidth: 200, height: 400}}> */}
          <img
            src={props?.product?.colors[0]?.frontImage}
            srcSet={props?.product?.colors[0]?.frontImage}
            loading="lazy"
            alt=""
            width={imgWidth}
            height={imgHeight}
            sx={{ borderRadius: 10 }}
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
        fontWeight='xl'
        color="neutral"
        textColor="text.primary"
        overlay
        // endDecorator={<ArrowOutwardIcon />}
        sx={{ display: 'block' }}
        fontSize= {priceFontSize}
      >
        {props?.product?.name}
      </Link>

      {
        props?.product?.discount === 0 ? (
          <Typography
            level="title-lg"
            sx={{ 
              mb: 5,
              fontWeight: 'l', 
              textAlign: 'center', 
              fontSize: priceFontSize
            }}
          >
            {props.product.price} BDT
          </Typography>
        )
        : (
          <>
            <Typography
              level="title-lg"
              sx={{ mt: 1, textAlign: 'center', fontSize: '20px', color: 'red', textDecoration: 'line-through'}}
            >
              {props.product.price} BDT
            </Typography>

            <Typography
                level="title-lg"
                sx={{ mt: 1, fontWeight: 'xl', textAlign: 'center', fontSize: '20px', color: 'green'}}
            >
                {((props.product.price - (props.product.price * props.product.discount / 100))).toFixed(2)} BDT
            </Typography>
          </>
        )
      }

      


      {/* <Typography level="body-sm">
        (Only <b>{props?.product?.colors[0]?.sizes[0]?.inStock}</b> left in stock!)
      </Typography> */}
      {/* <CardOverflow>
        <Button variant="solid" sx={{backgroundColor: 'black'}} component={RRLink} to={`/product/${props?.product?._id}`} size="lg">
          Add to cart
        </Button>
      </CardOverflow> */}
    </CardContent>
      {/* <CardOverflow>
        <Button variant="solid" sx={{backgroundColor: 'black'}} size="lg">
          Add to cart
        </Button>
      </CardOverflow> */}
    </Card>
  );
}

export default ProductCard;