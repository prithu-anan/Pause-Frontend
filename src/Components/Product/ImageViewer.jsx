import { Box } from '@mui/material';
import '../../StyleSheets/ImageViewer.css';
import React, { useState, useRef, useEffect } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import CircleIcon from '@mui/icons-material/Circle';
import AccordionControlled from './Accordion';
import { getProductById } from '../../api-helpers';
import ChartDrawer from './ChartDrawer';
import { Button, Typography } from '@mui/material';

// const dummyImages = [
//     'https://lonelyghost.co/cdn/shop/files/TextMeWhenYouGetHome_FGR_Back.png?v=1698870300&width=1000',
//     'https://lonelyghost.co/cdn/shop/files/21-hd-txt-brp-back.png?v=1698872963&width=1000',
//     'https://lonelyghost.co/cdn/shop/files/TextMeWhenYouGetHomeHoodie_Indigo_Back.png?v=1698714739&width=1000',
//     'https://lonelyghost.co/cdn/shop/files/23-hd-txt-tus-back.png?v=1698714739&width=1200',
//     'https://lonelyghost.co/cdn/shop/files/22-hd-txt-saph-back.png?v=1698872924&width=1000',
// ];


// const allSizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

function ImageViewer(props) {
    const [product, setProduct] = useState();
    const [colors, setColors] = useState();
    const [color, setColor] = useState();
    const [images, setImages] = useState();
    const [img, setImg] = useState();
    const [sizes, setSizes] = useState();
    const [size, setSize] = useState();
    const [available, setAvailable] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);
    const [sizeIndex, setSizeIndex] = useState(0);
    // console.log(props.id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log("potu");
                const productData = await getProductById(props.id);
                // console.log(productData);
    
                setProduct(productData);
                const firstColor = productData?.colors[0];
    
                setColors(productData?.colors);
                setColor(firstColor);
                setImages([firstColor?.frontImage[0], firstColor?.backImage[0], firstColor?.frontImage[1], firstColor?.backImage[1]]);
                setImg(firstColor?.frontImage[0]);
                setSizes(firstColor?.sizes);
                setSize(firstColor?.sizes[0]);
                setAvailable(firstColor?.sizes[0]?.inStock > 0 ? true : false);
                // console.log(size);
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchData();
    }, [props.id]);
    
    const hoverHandler = (image, i) => {
        setImg(image);
        refs.current[i].classList.add('iactive');
        for (var j = 0; j < images?.length; j++) {
            if (i !== j) {
                refs.current[j].classList.remove('iactive');
            }
        }
    };    
    const refs = useRef([]);
    refs.current = [];
    const addRefs = (el) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    const colorHandler = async (color, i) => {
        setColor(color);
        setImages([color?.frontImage[0], color?.backImage[0], color?.frontImage[1], color?.backImage[1]]);
        setSizes(color?.sizes);
        setImg(color?.frontImage[0]);
        setColorIndex(i);
        refs.current[0].classList.add('iactive');
        for (var j = 1; j < images.length; j++) {            
            refs.current[j].classList.remove('iactive');            
        }
        crefs.current[i].classList.add('active_circle');
        for (j = 0; j < colors?.length; j++) {
            if (i !== j) {
                crefs.current[j].classList.remove('active_circle');
            }
        }
    };
    const crefs = useRef([]);
    crefs.current = [];
    const addCrefs = (el) => {
        if (el && !crefs.current.includes(el)) {
            crefs.current.push(el);
        }
    };

    const sizeHandler = (size, i) => {
        setSize(size);
        setSizeIndex(i);
        // console.log("potu", size);
        if(size?.inStock > 0) setAvailable(true);
        else setAvailable(false);
        srefs.current[i].classList.add('iactive_box');
        for (var j = 0; j < sizes?.length; j++) {
            if (i !== j) {
                srefs.current[j].classList.remove('iactive_box');
            }
        }
    };    
    const srefs = useRef([]);
    srefs.current = [];
    const addSrefs = (el) => {
        if (el && !srefs.current.includes(el)) {
            srefs.current.push(el);
        }
    };

    const addToCartHandler = () => {
        // Get existing cart from local storage or create an empty array
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Check if the product with the same color and size is already in the cart
        const existingProductIndex = existingCart.findIndex(
          (item) => item._id === product?._id && item.color === color?.name && item.size === size?.size
        );
    
        if (existingProductIndex !== -1) {
            // If the product is already in the cart, update the quantity
            const newQuantity = existingCart[existingProductIndex].quantity + 1;

            // Remove the product at the specified index
            existingCart.splice(existingProductIndex, 1);

            const updatedCart = [
                ...existingCart,
                {
                    name: product?.name,
                    price: product?.price,
                    discount: product?.discount,
                    frontImage: color?.frontImage[0],
                    _id: product?._id,
                    size: size?.size,
                    color: color?.name,                
                    quantity: newQuantity,
                },
            ];
        
            // Update local storage with the updated cart
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            // Optionally, you can show a success message or perform any other action
            // console.log('Product updated to the cart:', updatedCart);
            alert("Product added to the cart");
        } 

        else {
            // If the product is not in the cart, add it with a quantity of 1
            const updatedCart = [
                ...existingCart,
                {
                    name: product?.name,
                    price: product?.price,
                    discount: product?.discount,
                    frontImage: color?.frontImage[0],
                    _id: product?._id,
                    size: size?.size,
                    color: color?.name,                
                    quantity: 1,
                },
            ];
        
            // Update local storage with the updated cart
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            // Optionally, you can show a success message or perform any other action
            // console.log('Product added to the cart:', updatedCart);
            alert("Product added to the cart");
            window.location.reload();
        }        
    };

    const [drawerOpen, setDrawerOpen] = useState(false);
    

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <Box className="container">
            <Box className="left">
                <Box className="left_1">
                    {images?.map((image, i) => (
                        <Box
                            className={i === 0 ? 'img_wrap iactive' : 'img_wrap'}
                            key={i}
                            onClick={() => hoverHandler(image, i)}
                            ref={addRefs}
                        >
                            <img src={image} alt="" />
                        </Box>
                    ))}
                </Box>
                <Box className="left_2">
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                alt: '',
                                isFluidWidth: true,
                                src: img,
                            },
                            largeImage: {
                                src: img,
                                width: 1400,
                                height: 2000,
                            },
                            enlargedImageContainerDimensions: {
                                width: '100%',
                                height: '100%',
                            },
                        }}
                    />
                    {/* <img src={img} alt="" width={1400} height={2000}/> */}
                </Box>
            </Box>
            <Box className="right">
                <Box>
                    <p className="product_name">
                        {product?.name}
                    </p>
                    <p className='product_heading'>
                        {product?.description}
                    </p>
                    {
                        product?.discount === 0 ? (
                            <p className='product_price'>
                                {product?.price} BDT
                            </p>
                        )
                        : (
                            <Box 
                                display={'flex'}
                                flexDirection={'row'}
                                // justifyContent={'space-around'}
                                // alignItems={'center'}
                            >
                                <Typography className='product_price' sx={{ mt: 0, textAlign: 'center', fontSize: '20px', color: 'red', textDecoration: 'line-through', fontFamily: "'Roboto Mono' monospace", fontWeight: 'bold'}}>
                                    {product?.price} BDT
                                </Typography>
                                <Typography className='product_price' sx={{ mt: 0, textAlign: 'center', fontSize: '20px', color: 'green', ml: 2, fontFamily: "'Roboto Mono' monospace", fontWeight: 'bold'}}>
                                    {(product?.price - (product?.price * product?.discount / 100)).toFixed(2)} BDT
                                </Typography>
                            </Box>
                        )
                    }
                    {/* <p className='product_price'>
                        {product?.price}
                    </p> */}
                    <hr className='horizontal_rule'></hr>
                    <p className='product_heading'>
                        Color: {color?.name.toUpperCase()}
                    </p>
                    <Box className='color_selector'>
                        {
                            colors?.map((color, index) => (
                                <Box  
                                    key={index}
                                    className={index === 0 ? 'color_selector_circle active_circle' : 'color_selector_circle'}
                                    onClick={() => {
                                        if (index !== colorIndex) {
                                          colorHandler(color, index);
                                        } 
                                        // else {
                                        //     size.inStock > 0 ? setAvailable(true) : setAvailable(false);
                                        // }
                                    }}
                                    ref={addCrefs}
                                >
                                    <CircleIcon className='color_selector_circle_icon' style={{ color: color?.name }} />
                                </Box>
                            ))
                        }
                    </Box>
                    <p className='product_heading'>
                        Size: {size?.size}
                    </p>
                    <p className='product_heading'>
                        In Stock: {size?.inStock}
                    </p>
                    <Box display={'flex'} flexDirection={'row'}>
                        <Button onClick={handleDrawerOpen}>Size Chart</Button>
                        <ChartDrawer open={drawerOpen} onClose={handleDrawerClose} />
                    </Box>
                    <Box className='size_selector'>
                        {
                            sizes?.map((size, index) => (
                                <Box  
                                    key={index}
                                    className={index === 0 ? 'size_selector_box iactive_box' : 'size_selector_box'}
                                    onClick={() => {
                                        if (index !== sizeIndex) {
                                          sizeHandler(size, index);
                                        } 
                                    }}
                                    ref={addSrefs}
                                >
                                    <p className='size_selector_box_text'>{size?.size}</p>
                                    {/* sizes[index]?.size */}
                                </Box>
                            ))
                        }
                    </Box>
                    <Box className='button_container'>
                        <button className={available? 'add_to_cart' : 'sold_out'} onClick={addToCartHandler}>
                            {available ? 'Add To Cart' : 'Sold Out'}
                        </button>
                        {/* {                            
                            !available ? (
                                <Box>
                                    <button className='notify'>
                                        Notify Me When Available
                                    </button>
                                </Box>
                            )
                            :
                            (
                                <Box>
                                </Box>
                            )                            
                        }                         */}
                    </Box>
                    <hr className='horizontal_rule'></hr>
                    <AccordionControlled description={product?.description}/>
                </Box>
            </Box>
        </Box>
    );
}

export default ImageViewer