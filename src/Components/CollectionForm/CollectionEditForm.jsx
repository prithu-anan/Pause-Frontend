import React, { useEffect, useState } from 'react';
import '../../StyleSheets/CollectionForm.css';
import {
  TextField,
  Avatar,
  Button,
  Grid,
  Box,
  InputLabel,
} from '@mui/material';
import { editCollection, getCollectionById } from '../../api-helpers';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { useParams } from 'react-router-dom';
// import { set } from 'mongoose';

const CollectionEditForm = () => {
    const id = useParams().id;
    // console.log(id);
    const [collection, setCollection] = useState();

    useEffect(() => {
        const fetchCollection = async () => {
            const res = await getCollectionById(id);
            setCollection(res);
            // console.log(res);
        }
        fetchCollection();
    }, [id]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    landscape: ['', '', ''],
    portrait: ['', '', ''],
  });

    useEffect(() => {
        if (collection) {
            setFormData({
                name: collection?.name,
                description: collection?.description,
                landscape: collection?.landscape,
                portrait: collection?.portrait,
            })
        }
    }, [collection])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadHorizontalImage = async (imageUpload, index) => {
    if (imageUpload == null) return;
    const horizontalImages = formData.landscape;
  
    const imageRef = ref(storage, `images/collections/horizontal/${imageUpload.name + v4()}`);
  
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      horizontalImages[index] = url;
  
      setFormData((prevData) => ({
        name: formData?.name,
        description: formData?.description,
        landscape: horizontalImages,
        portrait: formData?.portrait,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  const uploadVerticalImage = async (imageUpload, index) => {
    if (imageUpload == null) return;
    const verticalImages = formData.portrait;
  
    const imageRef = ref(storage, `images/collections/vertical/${imageUpload.name + v4()}`);
  
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      verticalImages[index] = url;
  
      setFormData((prevData) => ({
        name: formData?.name,
        description: formData?.description,
        landscape: formData?.landscape,
        portrait: verticalImages,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form Data:', formData);
  
    // Assuming addProduct returns a Promise
    try {
      await editCollection(id, formData);
      // Reload the window after successful execution of addProduct
      window.location.reload();
      alert('Collection Edited Successfully');
    } catch (error) {
      // Handle any errors from addProduct
      console.error('Error adding product:', error);
    }
  };

  useEffect(() => {
    if (formData.name !== '' || formData.description !== '') {
        setFormData({
            name: formData?.name,
            description: formData?.description,
            landscape: formData?.landscape,
            portrait: formData?.portrait,
        })
    }
}, [uploadHorizontalImage, uploadVerticalImage])

  return (
    <form onSubmit={handleSubmit}>
      <Grid className='form-container' container spacing={2}>
      <Grid textAlign={'center'} item xs={12}>
            <h1>Collection Form</h1>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required={true}
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required={true}
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        {
          [0, 1, 2].map((index) => (
            <Grid item key={index}>
              <Grid item xs={12}>
                <InputLabel>Horizontal Image {index + 1}</InputLabel>
                <TextField
                  // required
                  type="file"
                  // label="Horizontal Image URL"
                  name="landscape"
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
                      uploadHorizontalImage(selectedFile, index);
                    } else {
                      // Handle the case where the user canceled the file selection
                      const updatedImages = formData.landscape;
                      updatedImages[index] = '';
                      setFormData({
                        name: formData?.name,
                        description: formData?.description,
                        landscape: updatedImages,
                        portrait: formData?.portrait,
                      })
                      // console.log('File selection canceled.');
                    }
                  }}
                  // style={{marginBottom: 50}}
                />
                <Avatar
                    src={formData?.landscape[index]}
                    alt="Thumbnail"
                    style={{ width: 50, height: 50, marginTop: 10, marginBottom: 50 }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Vertical Image {index + 1}</InputLabel>
                <TextField
                  // required
                  type="file"
                  // label="Horizontal Image URL"
                  name="portrait"
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
                      uploadVerticalImage(selectedFile, index);
                    } else {
                      // Handle the case where the user canceled the file selection
                      const updatedImages = formData.portrait;
                      updatedImages[index] = '';
                      setFormData({
                        name: formData?.name,
                        description: formData?.description,
                        landscape: formData?.landscape,
                        portrait: updatedImages,
                      })
                      // console.log('File selection canceled.');
                    }
                  }}
                  // style={{marginBottom: 50}}
                />
                <Avatar
                    src={formData?.portrait[index]}
                    alt="Thumbnail"
                    style={{ width: 50, height: 50, marginTop: 10, marginBottom: 50 }}
                />
              </Grid>
            </Grid>
          ))
        }
        
        <Grid item xs={12}>
          <Box className='button-container'>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default CollectionEditForm;
