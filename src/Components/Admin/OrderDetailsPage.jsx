import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { getPendingOrders } from '../../api-helpers';
import { Link, useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
    const id = useParams().id;
    const [order, setOrder] = React.useState([])
    const parsedData = JSON.parse(localStorage.getItem('admin'));

    React.useEffect(() => {
        const fetchOrders = async () => {
            const res = await getPendingOrders();
            setOrder(res?.find(item => item?._id === id))            
        }
        fetchOrders()
    }, [id])

    React.useEffect(() => {
        // console.log(order);
    }, [order]);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Order Details
        </Typography>

        <Box sx={{ marginBottom: 2 }}>
          <Divider />
        </Box>

        <Typography variant="h6" gutterBottom>
          Customer Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary={`Name: ${order?.name}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Phone: ${order?.phone}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Email: ${order?.email}`} />
          </ListItem>
        </List>

        <Box sx={{ marginBottom: 2 }}>
          <Divider />
        </Box>

        <Typography variant="h6" gutterBottom>
          Delivery Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary={`In Dhaka: ${order?.inDhaka ? 'Yes' : 'No'}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`District: ${order?.inDhaka ? 'Dhaka' : order?.district}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Thana: ${order?.thana}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Road: ${order?.road}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Building: ${order?.building}`} />
          </ListItem>
        </List>

        <Box sx={{ marginBottom: 2 }}>
          <Divider />
        </Box>

        <Typography variant="h6" gutterBottom>
          Transaction Details
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary={`Transaction ID: ${order?.transactionId}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Other Details: ${order?.otherDetails}`} />
          </ListItem>
        </List>

        <Box sx={{ marginBottom: 2 }}>
          <Divider />
        </Box>

        <Typography variant="h6" gutterBottom>
          Cart Items
        </Typography>
        <List>
          {order?.cart?.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${index + 1}. Name: ${item.id.name}, Size: ${item.size}, Color: ${item.color}, Quantity: ${item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
        <Box sx={{ textAlign: 'center', margin: 2 }}>
            <Button component={Link} to={`/dashboard/${parsedData._id}`} variant="contained" color="primary">
                Go Back
            </Button>
        </Box>
    </Container>
  );
};

export default OrderDetailsPage;
