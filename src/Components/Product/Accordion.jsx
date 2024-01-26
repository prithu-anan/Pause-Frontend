import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';

export default function AccordionControlled({ description }) {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  const [index, setIndex] = React.useState(null);
  return (
    <AccordionGroup sx={{ width: screenWidth > 768 ? 800 : '90vw' }}>
      <Accordion
        expanded={index === 0}
        onChange={(event, expanded) => {
          setIndex(expanded ? 0 : null);
        }}
      >
        <AccordionSummary 
          sx={{ 
            fontWeight:'bold', 
            marginBottom: '20px', 
            fontSize: '20px' 
          }}>
            Description
        </AccordionSummary>
        <AccordionDetails
         sx={{  
          // marginBottom: '40px', 
          fontSize: '18px' 
        }}>
          {description}
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
