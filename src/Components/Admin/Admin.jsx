// UpdateForm.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, InputLabel, Avatar, TextField, Button, Container, Box, Typography, Divider } from '@mui/material';
import { editAccount, editDeliveryCharge, editFooter, getDeliveryCharge, getFooter, getHeaders, setHeaders } from '../../api-helpers';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

const Admin = (props) => {
  // State for email form
  const admin = JSON.parse(localStorage.getItem('admin'));
  const [email, setEmail] = useState(admin.email);

  // State for password form
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [insideDhaka, setInsideDhaka] = useState('');
  const [outsideDhaka, setOutsideDhaka] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let deliveryCharge;
      try {
        deliveryCharge = await getDeliveryCharge();
        setInsideDhaka(deliveryCharge.insideDhaka);
        setOutsideDhaka(deliveryCharge.outsideDhaka);
        setId(deliveryCharge._id);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // State for text headers form
  const [header1, setHeader1] = useState('');
  const [header2, setHeader2] = useState('');
  const [header3, setHeader3] = useState('');
  const [header4, setHeader4] = useState('');
  const [image, setImage] = useState('');

  const uploadImage = async (imageUpload) => {
    if (imageUpload == null) return;
  
    const imageRef = ref(storage, `images/logo/${imageUpload.name + v4()}`);
  
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setImage(url);
  
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let headers;
      try {
        headers = await getHeaders();
        setHeader1(headers.header1);
        setHeader2(headers.header2);
        setHeader3(headers.header3);
        setHeader4(headers.header4);
        setImage(headers.logo);
      } catch (err) {
        console.error(err);
      }
      console.log(headers);
    };

    fetchData();
  }, []);

  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [emailFooter, setEmailFooter] = useState('');
  const [phoneFooter, setPhoneFooter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let footers;
      try {
        footers = await getFooter();
        setFacebook(footers.facebook);
        setInstagram(footers.instagram);
        setTiktok(footers.tiktok);
        setEmailFooter(footers.email);
        setPhoneFooter(footers.phone);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleEmailUpdate = async() => {
    if (password !== confirmPassword) {
      alert('Password and Confirm Password must match!');
      return;
    }

    const res = await editAccount(admin._id, { email, password });
    if(res.success){
      const adminInfo = JSON.stringify({_id: res.admin._id, email: res.admin.email});
      localStorage.setItem('admin', adminInfo);
      window.location.reload();
    }
    else{
      alert(res.error);
    }
  };

  const handleDeliveryChargeUpdate = async() => {
    await editDeliveryCharge(id, { insideDhaka, outsideDhaka });
    window.location.reload();
  };

  const handleTextHeadersUpdate = async() => {
    await setHeaders({ header1, header2, header3, header4, logo: image});
    window.location.reload();
  };

  const handleFooter = async() => {
    await editFooter({ facebook, instagram, tiktok, email: emailFooter, phone: phoneFooter });
    window.location.reload();
  };

  return (
    <Container maxWidth="md">
      <Box mt={3}>
        <Typography variant="h5" style={{ fontFamily: "'Roboto Mono', monospace"}}>Update Email</Typography>
        <TextField
          required={true}
          label="Email"
          fullWidth
          defaultValue={props.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          required={true}
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          required={true}
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" style={{ fontFamily: "'Roboto Mono', monospace", marginTop: 10, marginBottom: 10}} onClick={handleEmailUpdate}>
          Update
        </Button>
      </Box>

      <Divider variant="middle" sx={{ my: 3 }} />

      <Box mt={3}>
        <Typography variant="h5" style={{ fontFamily: "'Roboto Mono', monospace"}}>Update Delivery Charge</Typography>
        <TextField
          label="Delivery Charge Inside Dhaka"
          fullWidth
          value={insideDhaka}
          type='number'
          onChange={(e) => setInsideDhaka(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Delivery Charge Outside Dhaka"
          fullWidth
          value={outsideDhaka}
          type='number'
          onChange={(e) => setOutsideDhaka(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" style={{ fontFamily: "'Roboto Mono', monospace", marginTop: 10, marginBottom: 10}} onClick={handleDeliveryChargeUpdate}>
          Update Delivery Charge
        </Button>
      </Box>

      <Divider variant="middle" sx={{ my: 3 }} />

      <Box mt={3}>
        <Typography variant="h5" style={{ fontFamily: "'Roboto Mono', monospace"}}>Update News Headers</Typography>
        <TextField
          label="Header 1"
          fullWidth
          value={header1}
          onChange={(e) => setHeader1(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Header 2"
          fullWidth
          value={header2}
          onChange={(e) => setHeader2(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Header 3"
          fullWidth
          value={header3}
          onChange={(e) => setHeader3(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Header 4"
          fullWidth
          value={header4}
          onChange={(e) => setHeader4(e.target.value)}
          margin="normal"
        />
        <Grid item xs={12}>
          <InputLabel>Header Logo</InputLabel>
          <TextField
            type="file"
            // label="Horizontal Image URL"
            name="logo"
            variant="outlined"
            margin="normal"
            fullWidth
            style={{ backgroundColor: 'white' }}
            InputProps={{
              inputProps: {
                accept: 'image/*', // Specify the accepted file types (e.g., images)
              },
            }}
            onChange={(event) => {
              const selectedFile = event.target.files[0];
              if (selectedFile) {
                uploadImage(selectedFile);
              } else {
                // Handle the case where the user canceled the file selection
                const updatedImage = '';
                setImage(updatedImage);
                // console.log('File selection canceled.');
              }
            }}
            // style={{marginBottom: 50}}
          />
          <Avatar
              src={image}
              alt="Thumbnail"
              style={{ width: 50, height: 50, marginTop: 10, marginBottom: 50 }}
          />
        </Grid>
        <Button variant="contained" color="primary" style={{ fontFamily: "'Roboto Mono', monospace", marginTop: 10, marginBottom: 10}} onClick={handleTextHeadersUpdate}>
          Update News Headers
        </Button>
      </Box>

      <Divider variant="middle" sx={{ my: 3 }} />

      <Box mt={3}>
        <Typography variant="h5" style={{ fontFamily: "'Roboto Mono', monospace"}}>Update Footer</Typography>
        <TextField
          label="Facebook ID"
          fullWidth
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Instagram ID"
          fullWidth
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Tiktok ID"
          fullWidth
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Footer Email"
          fullWidth
          value={emailFooter}
          onChange={(e) => setEmailFooter(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Footer Phone"
          fullWidth
          value={phoneFooter}
          onChange={(e) => setPhoneFooter(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" style={{ fontFamily: "'Roboto Mono', monospace", marginTop: 10, marginBottom: 10}} onClick={handleFooter}>
          Update Footer
        </Button>
      </Box>

      <Box display='flex' alignContent={'center'} justifyContent={'center'}>
        <Button variant="contained" color="primary" style={{ fontFamily: "'Roboto Mono', monospace", marginTop: 10, marginBottom: 40}} component={Link} to={`/dashboard/${JSON.parse(localStorage.getItem('admin'))._id}`}>
          Go Back
        </Button>
      </Box>      
    </Container>
  );
};

export default Admin;
