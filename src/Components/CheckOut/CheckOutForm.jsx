import { TextField, Button, Grid, Container, Typography, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../../StyleSheets/CheckOutForm.css';
import { confirmOrder, getDeliveryCharge } from '../../api-helpers';

const CheckOutForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('insideDhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [thana, setThana] = useState('');
  const [road, setRoad] = useState('');
  const [building, setBuilding] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [error, setError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // Function to handle form submission
  const handleSubmit  = async (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    const formData = {
      name,
      phone,
      email,
      inDhaka: location === 'insideDhaka' ? true : false,
      district: location === 'outsideDhaka' ? district : 'Dhaka',
      thana,
      road,
      building,
      transactionId,
      otherDetails,
    };

    const cartInfo = localStorage.getItem('cart');

    try {
      // Call your confirmOrder function or perform other submission logic
      await confirmOrder(formData, cartInfo);
      // console.log('Order submitted successfully:', result);
  
      // Reset the form fields if needed
      resetForm();
      localStorage.removeItem('cart');
      alert('Order submitted successfully, you will receive an email soon');
    } catch (error) {
      console.error('Error submitting order:', error);
      // Handle error if needed
    }
  };

  // Function to reset form fields
  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setLocation('insideDhaka');
    setDistrict('Dhaka');
    setThana('');
    setRoad('');
    setBuilding('');
    setTransactionId('');
    setOtherDetails('');
  };

  // Function to handle location change
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    if (e.target.value === 'insideDhaka') setDistrict('Dhaka');
    else setDistrict('');
  };

  const [charge, setCharge] = useState();

  useEffect(() => {
    const calculateCharge = async () => {
      const result = await getDeliveryCharge();
      setCharge(result);
      // console.log(result);
    };
    calculateCharge();
  }, []);

  useEffect(() => {
    // console.log(charge);
  }, [charge]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
        Checkout Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required={true}
              name='name'
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required={true}
              name='phone'
              label="Phone Number"
              fullWidth
              error={phoneError}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                if (e.target.value.length === 11) {
                  setPhoneError(false);
                } else {                 
                  setPhoneError(true);
                }
              }}
              style={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              name='email'
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: 'white' }}
            />
          </Grid>          
          <Grid item xs={12} sm={6}>
            <Select
              value={location}
              fullWidth
              name='location'
              onChange={handleLocationChange}
              style={{ backgroundColor: 'white', marginRight: '10px' }}
            >
              <MenuItem value="insideDhaka">Inside Dhaka</MenuItem>
              <MenuItem value="outsideDhaka">Outside Dhaka</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required={true}
              name='district'
              label="District"
              fullWidth
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              // Conditionally show based on location
              style={{ backgroundColor: 'white', display: location === 'outsideDhaka' ? 'block' : 'none' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required={true}
              name='thana'
              label="Thana"
              fullWidth
              value={thana}
              onChange={(e) => setThana(e.target.value)}
              style={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required={true}
              name='road'
              label="Road"
              fullWidth
              value={road}
              onChange={(e) => setRoad(e.target.value)}
              style={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              name='building'
              label="Building No"
              fullWidth
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              style={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body2" style={{ marginTop: 20, textAlign: 'center', color: 'red' }}>
              Please BKash {location === 'outsideDhaka'? charge?.outsideDhaka : charge?.insideDhaka} TK BDT to {charge?.phone} as delivery charge
              and then paste the Transaction ID below. Transaction ID must be of 10 characters.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required={true}
              name='transactionId'
              label="Transaction ID"
              fullWidth
              error={error}
              value={transactionId}
              onChange={(e) => {
                setTransactionId(e.target.value)
                if (e.target.value.length === 10) {
                  setError(false);
                } else {                 
                  setError(true);
                }
              }}
              style={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='otherDetails'
              label="Other Details"
              fullWidth
              value={otherDetails}
              onChange={(e) => setOtherDetails(e.target.value)}
              style={{ backgroundColor: 'white' }}
            />
          </Grid>          
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CheckOutForm;
