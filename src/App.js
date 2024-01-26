import { Box } from '@mui/system';
import NewsTicker from './Components/NewsTicker';
import ResponsiveAppBar from './Components/Header';
import HomePage from './Components/HomePage';
import { Fab } from '@mui/material';
import ChatBubbleOutlineTwoToneIcon from '@mui/icons-material/ChatBubbleOutlineTwoTone';
import './StyleSheets/Fab.css';
import ProductPage from './Components/Product/ProductPage';
import { Routes, Route, Link } from "react-router-dom";
import Footer from './Components/Footer';
import CartPage from './Components/Cart/CartPage';
import CheckOutPage from './Components/CheckOut/CheckOutPage';
import CollectionPage from './Components/Collection/CollectionPage';
import ProductForm from './Components/ProductForm/ProductForm';
import CollectionForm from './Components/CollectionForm/CollectionForm';
// import Test from './Components/Test';
import Admin from './Components/Admin/Admin';
import Dashboard from './Components/Admin/Dashboard';
import OrderDetailsPage from './Components/Admin/OrderDetailsPage';
import ProductList from './Components/ProductForm/ProductList';
import CollectionList from './Components/CollectionForm/CollectionList';
import ProductEditForm from './Components/ProductForm/ProductEditForm';
import CategoryPage from './Components/Category/CategoryPage';
import LoginPage from './Components/Admin/Login';
import { useEffect } from 'react';
import CollectionEditForm from './Components/CollectionForm/CollectionEditForm';
import NewCategoryPage from './Components/NewCategory/NewCategoryPage';
// import { Helmet } from 'react-helmet';

function App() {
  const parsedData = JSON.parse(localStorage.getItem('admin'));
  const admin = parsedData || null;

  useEffect(() => {
    
  }, [admin])
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* <Helmet>
        <title>Pause BD</title>
        <img src='pausebd.jpg' alt='' style={{ width: '100%', height: 'auto' }} />
      </Helmet> */}
      <NewsTicker />
      <ResponsiveAppBar />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/collection/:id" element={<CollectionPage />} />
          <Route path="/category/:name/:id" element={<NewCategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />          
          <Route path="/login" element={<LoginPage />} />

          {admin !== null && (
            <>
              <Route path={`/productform/${admin?._id}`} element={<ProductForm />} />
              <Route path={`/collectionform/${admin?._id}`} element={<CollectionForm />} />
              <Route path={`/admin/${admin?._id}`} element={<Admin admin={admin}/>} />
              <Route path={`/dashboard/${admin?._id}`} element={<Dashboard id={admin?._id}/>} />
              <Route path="/dashboard/order/:id" element={<OrderDetailsPage/>} />
              <Route path={`/productlist/${admin?._id}`} element={<ProductList />} />
              <Route path={`collectionlist/${admin?._id}`} element={<CollectionList />} />
              <Route path="/productlist/:id" element={<ProductEditForm />} />
              <Route path="/collectionlist/:id" element={<CollectionEditForm />} />
            </>
          )}
          
          {/* <Route path="/test" element={<Test/>} /> */}
        </Routes>
      </section>
      <Link to="https://www.instagram.com/direct/t/17851149599737728/" target="_blank" rel="noopener noreferrer">
        <Fab 
          className='fab' 
          color="primary" 
          aria-label="add" 
          style={{
            position: 'fixed',
            top: '80%',
            right: '5%',
            zIndex: 20,
          }}
        >        
          <ChatBubbleOutlineTwoToneIcon />        
        </Fab>
      </Link>
      <Footer />
    </Box>
  );
}

export default App;
