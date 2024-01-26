import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../StyleSheets/CartSummary.css'
import { calculateOrder } from '../../api-helpers';

const CartSummary = (props) => {
    const [total, setTotal] = useState('');
    const parsedData = JSON.parse(localStorage.getItem('cart')) || [];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const storedData = localStorage.getItem('cart');
      
            if (storedData) {      
              const data = await calculateOrder(storedData);
              setTotal(data);
            }
          } catch (err) {
            console.error(err);
          }
        };
      
        fetchData();
    }, [props.change]);

  return (
    <Box className='cart_summary'>
        <p className='cart_summary_heading'>Total TK {total?.netTotalWithDiscount} BDT</p>
        <p className='cart_summary_subheading'>Shipping & taxes calculated at checkout</p>
        {
          parsedData?.length !== 0 && (
            <a href='/checkout'><button className='cart_summary_button'>Checkout</button></a> 
          )
        }
        
    </Box>
  )
}

export default CartSummary