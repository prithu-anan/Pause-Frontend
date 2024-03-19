import React, { useState, useEffect, useCallback } from 'react';
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
import { addProduct, getAllCategories, getAllCollection, selectColor } from '../../api-helpers';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

const ProductForm = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        getAllCategories().then((categories) => {setCategories(categories)});
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        getAllCollection().then((collections) => {setCollections(collections)});
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

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

  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    collection: '',
    colors: [{ name: '', sizes: [{size: '', inStock: ''}], frontImage: [], backImage: [], selected: false }],
    thumbnail: '',
    description: '',
    price: '',
    discount: '0',    
    type: '',            
  });

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
      const updatedColors = formData?.colors;
      // console.log("potu");
      // Add a new size to the selected color
      updatedColors[colorIndex].sizes.push({ size: '', inStock: '' });
      return {
        name: formData?.name,
        category: formData?.category,
        collection: formData?.collection,
        colors: updatedColors,
        thumbnail: formData?.thumbnail,
        description: formData?.description,
        price: formData?.price,
        discount: formData?.discount,    
        type: formData?.type,
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
  
  
  // const [imageUrls, setImageUrls] = useState([]);
  // const imagesListRef = ref(storage, "images/products/");

  const uploadFrontImage1 = useCallback((imageUpload, colorIndex) => {
    setFormData((prevData) => {
      const updatedColors = formData.colors;

      if (imageUpload == null) return;

      const imageRef = ref(storage, `images/proucts/front1/${imageUpload.name + v4()}`);

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updatedColors[colorIndex].frontImage[0] = url;
        });
      });
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
  }, [formData.colors, formData.name, formData.category, formData.collection, formData.thumbnail, formData.description, formData.price, formData.discount, formData.type]);


  const uploadFrontImage2 = useCallback((imageUpload, colorIndex) => {
    setFormData((prevData) => {
      const updatedColors = formData.colors;

      if (imageUpload == null) return;

      const imageRef = ref(storage, `images/proucts/front2/${imageUpload.name + v4()}`);

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updatedColors[colorIndex].frontImage[1] = url;
        });
      });
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
  }, [formData.colors, formData.name, formData.category, formData.collection, formData.thumbnail, formData.description, formData.price, formData.discount, formData.type]);

  const uploadBackImage1 = useCallback((imageUpload, colorIndex) => {
    setFormData((prevData) => {
      const updatedColors = formData.colors;

      if (imageUpload == null) return;

      const imageRef = ref(storage, `images/proucts/back1/${imageUpload.name + v4()}`);

      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updatedColors[colorIndex].backImage[0] = url;
        });
      });
      return {
        name: formData?.name,
        category: formData?.category,
        collection: formData?.collection,
        colors: updatedColors,
        thumbnail: formData?.thumbnail,
        description: formData?.description,
        price: formData?.price,
        discount: formData?.discount,    
        type: formData?.type,
      };
    });
  }, [formData.colors, formData.name, formData.category, formData.collection, formData.thumbnail,
     formData.description, formData.price, formData.discount, formData.type]);

     const uploadBackImage2 = useCallback((imageUpload, colorIndex) => {
      setFormData((prevData) => {
        const updatedColors = formData.colors;
  
        if (imageUpload == null) return;
  
        const imageRef = ref(storage, `images/proucts/back2/${imageUpload.name + v4()}`);
  
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            updatedColors[colorIndex].backImage[1] = url;
          });
        });
        return {
          name: formData?.name,
          category: formData?.category,
          collection: formData?.collection,
          colors: updatedColors,
          thumbnail: formData?.thumbnail,
          description: formData?.description,
          price: formData?.price,
          discount: formData?.discount,    
          type: formData?.type,
        };
      });
    }, [formData.colors, formData.name, formData.category, formData.collection, formData.thumbnail,
       formData.description, formData.price, formData.discount, formData.type]);

  // ... Rest of your component

  // useEffect hook with dependencies
  useEffect(() => {
    setFormData({
      name: formData.name,
      category: formData.category,
      collection: formData.collection,
      colors: formData.colors,
      thumbnail: formData.thumbnail,
      description: formData.description,
      price: formData.price,
      discount: formData.discount,
      type: formData.type,
    });
  }, [uploadFrontImage1, uploadBackImage1, uploadFrontImage2, uploadBackImage2, formData.name, formData.category, formData.collection, formData.colors,
     formData.thumbnail, formData.description, formData.price, formData.discount, formData.type]);

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form Data:', formData);
  
    // Assuming addProduct returns a Promise
    try {
      await addProduct(formData);
      // Reload the window after successful execution of addProduct
      alert("Product Added Successfully");
      window.location.reload();
    } catch (error) {
      // Handle any errors from addProduct
      console.error('Error adding product:', error);
    }
  };

  React.useEffect(() => {
    setFormData({
      name: formData?.name,
      category: formData?.category,
      collection: formData?.collection,
      colors: formData?.colors,
      thumbnail: formData?.thumbnail,
      description: formData?.description,
      price: formData?.price,
      discount: formData?.discount,
      type: formData?.type,
    })
  }, [uploadFrontImage1, uploadBackImage1, uploadFrontImage2, uploadBackImage2, formData?.name, formData?.category, formData?.collection,  
    formData?.colors, formData?.thumbnail, formData?.description, formData?.price, formData?.discount, formData?.type]);
  

  return (
    <form onSubmit={handleSubmit}>
      <Grid className="form-container" container spacing={2}>
        <Grid textAlign={'center'} item xs={12}>
            <h1>Product Form</h1>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required={true}
            label="Name"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required={true}>
            <InputLabel>Category</InputLabel>
            <Select              
              label="Category"
              name="category"
              value={formData?.category}
              onChange={handleInputChange}
              style={{ backgroundColor: 'white' }}
            >
              {
                categories.map((category, index) => (
                  <MenuItem key={index} value={category._id}>{category.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required={true}>
            <InputLabel>Collection</InputLabel>
            <Select              
              label="Collection"
              name="collection"
              value={formData?.collection}
              onChange={handleInputChange}
              style={{ backgroundColor: 'white' }}
            >
              {
                collections.map((collection, index) => (
                  <MenuItem key={index} value={collection._id}>{collection.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData?.description}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required={true}
            label="Price"
            name="price"
            type="number"
            value={formData?.price}
            inputProps={{ min: 0 }}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Discount"
            name="discount"
            type="number"
            value={formData?.discount}
            inputProps={{ min: 0 }}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Type"
            name="type"
            value={formData?.type}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        {formData?.colors.map((colorItem, index) => (
          <Grid margin={'auto'} container spacing={2} key={index}>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth required={true}>
                <InputLabel>Color</InputLabel>
                <Select
                  label="Color"
                  name="color"
                  value={colorItem.name}
                  onChange={(e) => handleInputChange(e, index, index)}
                  style={{ backgroundColor: 'white' }}
                >
                  {
                    colors.map((color, ColorIndex) => (
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
                index !== 0 && (
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
                    sizeIndex !== 0 && (
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
                  required={true}
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
                  required={true}
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
                      updatedColors[index].backImage[1] = '';
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

export default ProductForm;
