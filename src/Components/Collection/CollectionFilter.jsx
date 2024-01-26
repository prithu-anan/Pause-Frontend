import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useRef, useState } from 'react'
import '../../StyleSheets/CollectionFilter.css'
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import CircleIcon from '@mui/icons-material/Circle';

const sizes = ['S', 'M', 'L', 'XL'];
// const colors = ['Red', 'Green', 'Blue', 'Black'];

const CollectionFilter = ({colors, selectedColors, setSelectedColors, selectedSizes, setSelectedSizes}) => {
    const [index1, setIndex1] = React.useState(null);
    const [index2, setIndex2] = React.useState(null);

    const toggleColor = (color, index) => {
        const isSelected = selectedColors.includes(color);
    
        if (isSelected) {
          // If the color is already selected, remove it
          setSelectedColors((prevColors) => prevColors.filter((c) => c !== color));
        } else {
          // If the color is not selected, add it
          setSelectedColors((prevColors) => [...prevColors, color]);
        }
    
        // Toggle the 'active_circle' class for the clicked element
        crefs.current[index].classList.toggle('active_circle', !isSelected);
    };

    const crefs = useRef([]);
    crefs.current = [];
    const addCrefs = (el) => {
        if (el && !crefs.current.includes(el)) {
            crefs.current.push(el);
        }
    };

    const toggleSize = (size) => {
        const isSelected = selectedSizes.includes(size);
    
        if (isSelected) {
          // If the size is already selected, remove it
          setSelectedSizes((prevSizes) => prevSizes.filter((s) => s !== size));
        } else {
          // If the size is not selected, add it
          setSelectedSizes((prevSizes) => [...prevSizes, size]);
        }
    };
    
  return (
    <Box className='filter_list'>
        <AccordionGroup sx={{ maxWidth: 800 }}>        
            <Accordion
                expanded={index1 === 0}
                onChange={(event, expanded) => {
                    setIndex1(expanded ? 0 : null);
                }}
            >
                <AccordionSummary className='summary_sizes'>
                    Sizes
                </AccordionSummary>
                <AccordionDetails className='details_sizes'>
                    <FormGroup className='size_group'>
                        {
                            sizes.map((size, index) => {
                                return (
                                    <FormControlLabel 
                                        key={index}
                                        control={<Checkbox />}
                                        label={size}
                                    />
                                )
                            })
                        }
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={index2 === 0}
                onChange={(event, expanded) => {
                    setIndex2(expanded ? 0 : null);
                }}
            >
                <AccordionSummary className='summary_colors'>
                    Colors
                </AccordionSummary>
                <AccordionDetails className='details_colors'>
                    <Box className='color_selector'>
                        {                
                            colors.map((color, index) => (
                                <Box  
                                    key={index}
                                    className={selectedColors.includes(color) ? 'color_selector_circle active_circle' : 'color_selector_circle'}
                                    onClick={() => toggleColor(color, index)}
                                    ref={addCrefs}
                                >
                                    <CircleIcon className='color_selector_circle_icon' style={{ color: color }} />
                                </Box>
                            ))                           
                        }
                    </Box>
                </AccordionDetails>
            </Accordion>
        </AccordionGroup>
    </Box>
  )
}

export default CollectionFilter