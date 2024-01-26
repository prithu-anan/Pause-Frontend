import { Box } from '@mui/material'
import React from 'react'
import CartList from './CartList'
import CartSummary from './CartSummary'
import '../../StyleSheets/CartPage.css'

const CartPage = () => {
    const [change, setChange] = React.useState(false);

  return (
    <Box
        width={'100vw'}
        height='auto'
        display='flex'
        flexDirection='column'
    >
        <Box>
            <p className='cart'>Cart</p>
        </Box>
        <Box className='cart_container'>
            <Box
                width='65%'
                height='auto'
                position={'sticky'}
            >
                <CartList change={change} setChange={setChange}/>
            </Box>
            <Box>
                <CartSummary change={change}/>
            </Box> 
        </Box>               
    </Box>
  )
}

export default CartPage