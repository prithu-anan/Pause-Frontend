import { Box } from '@mui/material'
import React from 'react'
import CheckOutForm from './CheckOutForm'
import '../../StyleSheets/CheckOutPage.css'

const CheckOutPage = () => {
  return (
    <Box className='checkout_page'>
        <CheckOutForm />
    </Box>
  )
}

export default CheckOutPage