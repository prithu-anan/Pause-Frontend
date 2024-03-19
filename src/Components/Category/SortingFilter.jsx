import { Box, Typography, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import '../../StyleSheets/CollectionFilter.css';

const SortingFilter = ({sortingCriteria, setSortingCriteria}) => {

  const handleSortingChange = (event) => {
    setSortingCriteria(event.target.value);
  };

  return (
    <Box className='filter_list'>
      <FormControl component='fieldset'>
      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333', fontFamily: "'Roboto Mono', monospace"}}>
        Sort
      </Typography>
        <RadioGroup
          aria-label='sorting-criteria'
          name='sorting-criteria'
          value={sortingCriteria}
          onChange={handleSortingChange} 
                   
        >
          {/* <FormControlLabel value='alphabet' control={<Radio />} label='Alphabet (A-Z)' />
          <FormControlLabel value='date' control={<Radio />} label='Latest' /> */}
          <FormControlLabel value='best' control={<Radio />} label='Best Selling' />
          <FormControlLabel value='price' control={<Radio />} label='Price' />
          {/* Add more sorting criteria as needed */}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default SortingFilter;
