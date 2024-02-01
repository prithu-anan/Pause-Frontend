import React, { useState, useEffect } from 'react';
import '../../StyleSheets/ProductForm.css';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Box,
  Avatar,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { editProduct, getProductById, selectColor } from '../../api-helpers';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { useParams } from 'react-router-dom';

const ProductEditForm = () => {
    const id = useParams().id;
    // console.log(id);

  const [colors, setColors] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        selectColor().then((response) => {setColors(response)});
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById(id).then((product) => {
            setProduct(product);
            // console.log(product?.colors);
        });
    }, [id]);

  const [formData, setFormData] = useState({
    name: product?.name,
    category: product?.category,
    collection: product?.collection,
    colors: product?.colors,
    thumbnail: product?.thumbnail,
    description: product?.description,
    price: product?.price,
    discount: product?.discount,    
    type: product?.type,            
  });

  useEffect(() => {
    if (product) {
        setFormData({
            name: product?.name,
            category: product?.category,
            collection: product?.collection,
            colors: product?.colors,
            thumbnail: product?.thumbnail,
            description: product?.description,
            price: product?.price,
            discount: product?.discount,
            type: product?.type,
        });
        // console.log(formData?.collection);
    }
  }, [product]);

  const handleInputChange = (e, index, sizeIndex) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };
  
    if (name === 'inStock') {
      // Handle inStock selection within the sizes array
      updatedFormData.colors[index].sizes[sizeIndex].inStock = value;
    } else if (name === 'size') {    
      // Handle size selection within the colors array
      updatedFormData.colors[index].sizes[sizeIndex].size = value
    } else if (name === 'color') {
      // Handle color selection within the colors array
      updatedFormData.colors[index].name = value;
    } else if (name === 'frontImage' || name === 'backImage') {
      // Handle frontImage and backImage within the colors array
      updatedFormData.colors[index][name][0] = value;
    } else {
      // Handle other form fields
      updatedFormData[name] = value;
    }
  
    setFormData(updatedFormData);
  };
  

  const sizeOptions = ["S", "M", "L", "XL"];

  const handleAddColor = () => {
    setFormData((prevData) => ({
      name: formData.name,
      category: formData.category,
      collection: formData.collection,
      colors: [...prevData.colors, { name: '', sizes: [{size: '', inStock: ''}], frontImage: [], backImage: [] }],
      thumbnail: formData.thumbnail,
      description: formData.description,
      price: formData.price,
      discount: formData.discount,    
      type: formData.type,
    }));
  };

  const handleDeleteColor = (colorIndex) => {
    setFormData((prevData) => {
      const updatedColors = formData.colors;
      // Remove the color at the specified index
      updatedColors.splice(colorIndex, 1);
  
      return {
        name: formData.name,
        category: formData.category,
        collection: formData.collection,
        colors: updatedColors,
        thumbnail: formData.thumbnail,
        description: formData.description,
        price: formData.price,
        discount: formData.discount,    
        type: formData.type,
      };
    });
  };  

  const handleAddSize = (colorIndex) => {
    setFormData((prevData) => {
      const updatedColors = formData.colors;
      // console.log("potu");
      // Add a new size to the selected color
      updatedColors[colorIndex].sizes.push({ size: '', inStock: '' });
      return {
        name: formData.name,
        category: formData.category,
        collection: formData.collection,
        colors: updatedColors,
        thumbnail: formData.thumbnail,
        description: formData.description,
        price: formData.price,
        discount: formData.discount,    
        type: formData.type,
      };
    });
  };

  const handleDeleteSize = (colorIndex, sizeIndex) => {
    setFormData((prevData) => {
      const updatedColors = [...prevData.colors];
      // Remove the last size from the selected color
      updatedColors[colorIndex].sizes.splice(sizeIndex, 1);
      return {
        name: formData.name,
        category: formData.category,
        collection: formData.collection,
        colors: updatedColors,
        thumbnail: formData.thumbnail,
        description: formData.description,
        price: formData.price,
        discount: formData.discount,    
        type: formData.type,
      };
    });
  };

  const uploadFrontImage1 = (imageUpload, colorIndex) => {
    setFormData((prevData) => {
      const updatedColors = [...prevData.colors];

      if (imageUpload == null) return;

      const imageRef = ref(storage, `images/proucts/front1/${imageUpload.name + v4()}`);

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updatedColors[colorIndex].frontImage[0] = url;
        });
      });
      return {
        ...prevData,
        colors: updatedColors,
      };
    });
  };

  const uploadFrontImage2 = (imageUpload, colorIndex) => {
    setFormData((prevData) => {
      const updatedColors = [...prevData.colors];

      if (imageUpload == null) return;

      const imageRef = ref(storage, `images/proucts/front2/${imageUpload.name + v4()}`);

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updatedColors[colorIndex].frontImage[1] = url;
        });
      });
      return {
        ...prevData,
        colors: updatedColors,
      };
    });
  };

  const uploadBackImage1 = (imageUpload, colorIndex) => {
    setFormData((prevData) => {
      const updatedColors = [...prevData.colors];

      if (imageUpload == null) return;

      const imageRef = ref(storage, `images/proucts/back1/${imageUpload.name + v4()}`);

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updatedColors[colorIndex].backImage[0] = url;
        });
      });
      return {
        ...prevData,
        colors: updatedColors,
      };
    });
  };

  const uploadBackImage2 = (imageUpload, colorIndex) => {
    setFormData((prevData) => {
      const updatedColors = [...prevData.colors];

      if (imageUpload == null) return;

      const imageRef = ref(storage, `images/proucts/back2/${imageUpload.name + v4()}`);

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updatedColors[colorIndex].backImage[1] = url;
        });
      });
      return {
        ...prevData,
        colors: updatedColors,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form Data:', formData);
  
    // Assuming addProduct returns a Promise
    try {
      await editProduct(id, formData);
      // Reload the window after successful execution of addProduct
      alert("Product Updated Successfully");
      window.location.reload();
    } catch (error) {
      // Handle any errors from addProduct
      console.error('Error adding product:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <Grid className="form-container" container spacing={2}>
        <Grid textAlign={'center'} item xs={12}>
            <h1>Product Edit Form</h1>
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Name</InputLabel>
          <TextField
            fullWidth
            required={true}
            // label="Name"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Description</InputLabel>
          <TextField
            fullWidth
            // label="Description"
            name="description"
            value={formData?.description}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Price</InputLabel>
          <TextField
            fullWidth
            required={true}
            // label="Price"
            name="price"
            type="number"
            value={formData?.price}
            inputProps={{ min: 0 }}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Discount</InputLabel>
          <TextField
            fullWidth
            // label="Discount"
            name="discount"
            type="number"
            value={formData?.discount}
            inputProps={{ min: 0 }}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Discount</InputLabel>
          <TextField
            fullWidth
            // label="Type"
            name="type"
            value={formData?.type}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        {formData?.colors?.map((colorItem, index) => (
          <Grid margin={'auto'} container spacing={2} key={index}>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth required={true}>
                <InputLabel>Color</InputLabel>
                <Select
                  label="Color"
                  name="color"
                  value={colorItem.name.toUpperCase()}
                  onChange={(e) => handleInputChange(e, index, index)}
                  style={{ backgroundColor: 'white' }}
                >
                  {
                    colors?.map((color, ColorIndex) => (
                      <MenuItem key={ColorIndex} value={color.name}>
                        <CircleIcon className='color_selector_circle_icon' style={{ color: color?.name }} />
                        {color.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              {
                formData?.colors?.length !== 1 && (
                  <Button style={{marginTop: 10}} onClick={() => handleDeleteColor(index)}>
                    Delete Color
                  </Button>
                )
              }   
            </Grid>
            {colorItem.sizes.map((size, sizeIndex) => (
              <Grid margin={'auto'} container spacing={2} key={sizeIndex}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth required={true}>
                    <InputLabel>Size</InputLabel>
                    <Select
                      label="Size"
                      name="size"
                      value={size.size}
                      onChange={(e) => handleInputChange(e, index, sizeIndex)}
                      style={{ backgroundColor: 'white' }}
                    >
                      {
                        sizeOptions.map((sizeOption, sizeOptionsIndex) => (
                          <MenuItem key={sizeOptionsIndex} value={sizeOption}>
                            {sizeOption}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required={true}
                    fullWidth
                    label="In Stock"
                    name="inStock"
                    type='number'
                    value={size.inStock}
                    inputProps={{ min: 0 }}
                    onChange={(e) => handleInputChange(e, index, sizeIndex)}
                    style={{ backgroundColor: 'white' }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  {                    
                    colorItem.sizes.length !== 1 && (
                      <Button style={{marginTop: 10}} onClick={() => handleDeleteSize(index, sizeIndex)}>
                        Delete Size
                      </Button>
                    )                  
                  }
                </Grid>
              </Grid>
            ))}
            
            <Grid margin={'auto'} item xs={12}>
              <Button onClick={() => handleAddSize(index)}>
                Add More Sizes
              </Button>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={12}  sm={1} marginTop={4} marginLeft={4}>
                <InputLabel>Front Image 1</InputLabel>
              </Grid>              
              <Grid item xs={12} sm={3}>                
                <TextField
                  label=''
                  type="file"
                  name="frontImage1"
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    inputProps: {
                      accept: 'image/*',
                    },
                  }}
                  onChange={(event) => {
                    const selectedFile = event.target.files[0];
                    if (selectedFile) {
                      uploadFrontImage1(selectedFile, index);
                    } else {
                      // Handle the case where the user canceled the file selection
                      const updatedColors = formData.colors;
                      updatedColors[index].frontImage[0] = '';
                      setFormData({
                        name: formData.name,
                        category: formData.category,
                        collection: formData.collection,
                        colors: updatedColors,
                        thumbnail: formData.thumbnail,
                        description: formData.description,
                        price: formData.price,
                        discount: formData.discount,    
                        type: formData.type,
                      })
                      // console.log('File selection canceled.');
                    }
                  }}
                  style={{ backgroundColor: 'white' }}
                />
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <Avatar
                  src={formData?.colors[index].frontImage[0]}
                  alt="Thumbnail"
                  style={{ width: 50, height: 50, marginTop: 20, marginBottom: 50 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}  sm={1} marginTop={4} marginLeft={4}>
                <InputLabel>Front Image 2</InputLabel>
              </Grid>              
              <Grid item xs={12} sm={3}>                
                <TextField
                  label=''
                  type="file"
                  name="frontImage2"
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    inputProps: {
                      accept: 'image/*',
                    },
                  }}
                  onChange={(event) => {
                    const selectedFile = event.target.files[0];
                    if (selectedFile) {
                      uploadFrontImage2(selectedFile, index);
                    } else {
                      // Handle the case where the user canceled the file selection
                      const updatedColors = formData.colors;
                      updatedColors[index].frontImage[0] = '';
                      setFormData({
                        name: formData.name,
                        category: formData.category,
                        collection: formData.collection,
                        colors: updatedColors,
                        thumbnail: formData.thumbnail,
                        description: formData.description,
                        price: formData.price,
                        discount: formData.discount,    
                        type: formData.type,
                      })
                      // console.log('File selection canceled.');
                    }
                  }}
                  style={{ backgroundColor: 'white' }}
                />
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <Avatar
                  src={formData?.colors[index].frontImage[1]}
                  alt="Thumbnail"
                  style={{ width: 50, height: 50, marginTop: 20, marginBottom: 50 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={1} marginTop={4} marginLeft={4}>
                <InputLabel>Back Image 1</InputLabel>
              </Grid>              
              <Grid item xs={12} sm={3}>                
                <TextField
                  label=''
                  type="file"
                  name="backImage1"
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    inputProps: {
                      accept: 'image/*',
                    },
                  }}
                  onChange={(event) => {
                    const selectedFile = event.target.files[0];
                    if (selectedFile) {
                      uploadBackImage1(selectedFile, index);
                    } else {
                      // Handle the case where the user canceled the file selection
                      const updatedColors = formData.colors;
                      updatedColors[index].backImage[0] = '';
                      setFormData({
                        name: formData.name,
                        category: formData.category,
                        collection: formData.collection,
                        colors: updatedColors,
                        thumbnail: formData.thumbnail,
                        description: formData.description,
                        price: formData.price,
                        discount: formData.discount,    
                        type: formData.type,
                      })
                      // console.log('File selection canceled.');
                    }
                  }}
                  style={{ backgroundColor: 'white' }}
                />
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <Avatar
                  src={formData?.colors[index].backImage[0]}
                  alt="Thumbnail"
                  style={{ width: 50, height: 50, marginTop: 20, marginBottom: 50 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={1} marginTop={4} marginLeft={4}>
                <InputLabel>Back Image 2</InputLabel>
              </Grid>              
              <Grid item xs={12} sm={3}>                
                <TextField
                  label=''
                  type="file"
                  name="backImage2"
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    inputProps: {
                      accept: 'image/*',
                    },
                  }}
                  onChange={(event) => {
                    const selectedFile = event.target.files[0];
                    if (selectedFile) {
                      uploadBackImage2(selectedFile, index);
                    } else {
                      // Handle the case where the user canceled the file selection
                      const updatedColors = formData.colors;
                      updatedColors[index].backImage[0] = '';
                      setFormData({
                        name: formData.name,
                        category: formData.category,
                        collection: formData.collection,
                        colors: updatedColors,
                        thumbnail: formData.thumbnail,
                        description: formData.description,
                        price: formData.price,
                        discount: formData.discount,    
                        type: formData.type,
                      })
                      // console.log('File selection canceled.');
                    }
                  }}
                  style={{ backgroundColor: 'white' }}
                />
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <Avatar
                  src={formData?.colors[index].backImage[1]}
                  alt="Thumbnail"
                  style={{ width: 50, height: 50, marginTop: 20, marginBottom: 50 }}
                />
              </Grid>
            </Grid>
                     
          </Grid>          
        ))}
        
        <Grid margin={'auto'} item xs={12}>
          <Button onClick={handleAddColor}>
            Add More Colors
          </Button>
        </Grid>        
        <Grid item xs={12}>
          <Box className="button-container" >
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductEditForm;
