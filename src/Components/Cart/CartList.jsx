import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../StyleSheets/CartList.css'
import CartListItem from './CartListItem'

const CartList = (props) => {
  const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null);

  useEffect(() => {
    setCart(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null)
  }, [])
  
  return (
    <Box className='cart_list'>
        <Box className='cart_heading'>
            <p className='cart_heading_product'>Product</p>
            <p className='cart_heading_quantity'>Quantity</p>
            <p className='cart_heading_total'>Total</p>            
        </Box>
        <hr className='table_rule'></hr>
        <Box>
          {
            cart?.map((item, index) => {
              return <CartListItem 
                key={index} 
                item={item} 
                index={index}
                change={props.change}
                setChange={props.setChange}
              />
            })
          }
        </Box>
    </Box>
  )
}

export default CartList