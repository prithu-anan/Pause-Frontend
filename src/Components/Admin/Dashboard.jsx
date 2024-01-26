import React, { useEffect, useState } from 'react'
import { Typography, Button } from '@mui/material';
import {Link} from 'react-router-dom';
import { PieChart } from '@mui/x-charts';
import '../../StyleSheets/Dashboard.css'
import { getProductWiseIncome } from '../../api-helpers';
import OrderList from './OrderList';

const Dashboard = ({id}) => {
    const [products, setProducts] = React.useState([]);
    const [collection, setCollection] = React.useState([]);

    React.useEffect(() => {
        const fetchProducts = async () => {
            const res = await getProductWiseIncome();
            setProducts(res?.products)
            setCollection(res?.collection)
        }
        fetchProducts()
    }, [])

    const [shouldRenderCharts, setShouldRenderCharts] = useState(true);

    useEffect(() => {
        const handleResize = () => {
        setShouldRenderCharts(window.innerWidth > 768);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

  return (
    <div className='dashboard'>        
        <Typography variant="h3" gutterBottom style={{ textAlign: 'center'}}>
            Dashboard
        </Typography>
        {shouldRenderCharts && (
            <div className='charts'>
                <div style={{background: 'AliceBlue', padding: 50, display: 'flex', flexDirection: 'column', borderRadius: 20, width: '900px', }}>
                    <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                        Collection
                    </Typography>
                    <PieChart
                        series={[
                            {
                                data: collection?.slice(0, collection?.length < 5 ? collection?.length : 5)?.map((item, index) => ({ id: index, value: item?.income, label: item?.name })),
                            },
                        ]}
                        width={800}
                        height={300}
                    />
                </div>

                <div style={{background: 'AliceBlue', padding: 50, display: 'flex', flexDirection: 'column', borderRadius: 20, width: '900px', }}>
                    <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                        Product
                    </Typography>
                    <PieChart
                        series={[
                            {
                                data: products?.slice(0, products?.length < 5 ? products?.length : 5)?.map((item, index) => ({ id: index, value: item?.income, label: item?.name })),
                            },
                        ]}
                        width={800}
                        height={300}
                    />
                </div>
            </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px' }}>
            {/* Add five buttons here */}
            <Button variant="contained" color="primary" style={{margin: 20}} component={Link} to={`/productform/${id}`}>
                Add Product
            </Button>
            <Button variant="contained" color="primary" style={{margin: 20}} component={Link} to={`/collectionform/${id}`}>
                Add Collection
            </Button>
            <Button variant="contained" color="primary" style={{margin: 20}} component={Link} to={`/productlist/${id}`}>
                View Products
            </Button>
            <Button variant="contained" color="primary" style={{margin: 20}} component={Link} to={`/collectionlist/${id}`}>
                View Collection
            </Button>
            <Button variant="contained" color="primary" style={{margin: 20}} component={Link} to={`/admin/${id}`}>
                Admin Info
            </Button>
        </div>
        <div className='order-table'>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                Orders
            </Typography>
            <OrderList />
        </div>
    </div>
  )
}

export default Dashboard