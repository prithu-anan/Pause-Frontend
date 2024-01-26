import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material'
import '../../StyleSheets/CartListItem.css'

const CartListItem = (props) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(props.item.quantity);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
        props.setChange(!props.change)
    };

    const handleRemove = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = existingCart.findIndex(
            (item) => item._id === props.item?._id && item.color === props.item?.color && item.size === props.item?.size
        );
        existingCart.splice(existingProductIndex, 1);
        localStorage.setItem('cart', JSON.stringify(existingCart));

        if (existingCart.length === 0) {
            localStorage.removeItem('cart');
            // Navigate to the root route
            navigate('/');
        }
                    
        window.location.reload();
    };

    useEffect(() => {
        const addToCartHandler = () => {
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        
            const existingProductIndex = existingCart.findIndex(
              (item) => item._id === props.item?._id && item.color === props.item?.color && item.size === props.item?.size
            );
        
            if (existingProductIndex !== -1) {
                const newQuantity = quantity;
    
                existingCart.splice(existingProductIndex, 1);
    
                const updatedCart = [
                    ...existingCart,
                    {
                        name: props.item?.name,
                        price: props.item?.price,
                        discount: props.item?.discount,
                        frontImage: props.item?.frontImage[0],
                        _id: props.item?._id,
                        size: props.item?.size,
                        color: props.item?.color,                
                        quantity: newQuantity,
                    },
                ];
            
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                // console.log('Product updated to the cart:', updatedCart);
            } 
    
            else {
                const updatedCart = [
                    ...existingCart,
                    {
                        name: props.item?.name,
                        price: props.item?.price,
                        discount: props.item?.discount,
                        frontImage: props.item?.frontImage[0],
                        _id: props.item?._id,
                        size: props.item?.size,
                        color: props.item?.color,                
                        quantity: 1,
                    },
                ];
            
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                // console.log('Product added to the cart:', updatedCart);
            }
          };

          addToCartHandler();
    }, [quantity, props.item?.color, props.item?.discount, props.item?._id, 
        props.item?.name, props.item?.price, props.item?.size, props.item?.frontImage]);

    
    
  return (
    <Box className='cart_list_item'>
        <Box className='cart_list_product'>
            <Box className='cart_list_image_container'>
                <img 
                    className='cart_list_image'
                    src={props.item.frontImage}
                    alt=''
                />
            </Box>
            <Box  className='cart_list_product_description'>
                <p className='cart_list_product_name'>{props.item.name}</p>
                <p className='cart_list_product_price'>{props.item.price}</p>
                <p className='cart_list_product_color'>{props.item.color}/{props.item.size}</p>
            </Box>
        </Box>
        <Box className='cart_list_quantity'>
            <TextField
                className='cart_list_quantity_input'
                type="number"
                id={`quantity${props.index}`}
                name="quantity"
                defaultValue={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1 }}
            />
            <a href='/cart' onClick={handleRemove}>Remove</a>
        </Box>
        <Box className='cart_list_total'>
            TK {props.item.price * quantity}
        </Box>
    </Box>
  )
}

export default CartListItem