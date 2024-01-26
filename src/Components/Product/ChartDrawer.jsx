// ChartDrawer.js
import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getChart } from '../../api-helpers';

const ChartDrawer = ({ onClose, open }) => {
      const [chartData, setChartData] = useState([]);
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getChart('pant');
            const response2 = await getChart('shirt');
            const response3 = await getChart('tee');
            setChartData([response.chart, response2.chart, response3.chart]);
          } catch (error) {
            console.error('Error fetching chart data:', error);
          }
        };
    
        fetchData();
      }, []);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List>
        {chartData.map((category, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText 
                style={{ textAlign: 'center', textDecoration: 'underline'}}
                primary={
                    index === 0
                    ? `Pant`
                    : index === 1
                    ? `Shirt`
                    : index === 2
                    ? `Tee`
                    : ``
                    } 
            />
            </ListItem>
            {category.map((item, itemIndex) => (
              <ListItem key={item._id}>
                <ListItemText
                  primary={
                    index === 0
                    ? `${item.size}: Waist ${item.waist}, Outseam ${item.outseam}, Inseam ${item.inseam}`
                    : index === 1
                    ? `${item.size}: Width ${item.width}, Length ${item.length}, Sleeve ${item.sleeve}`
                    : index === 2
                    ? `${item.size}: Width ${item.width}, Length ${item.length}`
                    : ``
                    }
                />
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default ChartDrawer;
