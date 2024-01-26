import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import { getAllProducts } from '../../api-helpers';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export default function RenderGroup(props) {

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        getAllProducts().then((res) => {
          props.setProducts(res.products);
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const options = props.products?.map((option) => {
    const firstLetter = option?.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option?.firstLetter}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      value={props.selectedProduct}
      isOptionEqualToValue={(option, value) => option?._id === value?._id}
      onChange={(event, newValue) => {
        props.setSelectedProduct(newValue);
      }}
      renderInput={(params) => <TextField {...params} label="Search Products" />}
      renderGroup={(params) => (
        <li key={params?.key}>
          <GroupHeader>{params?.group}</GroupHeader>
          <GroupItems>{params?.children}</GroupItems>
        </li>
      )}
    />
  );
}
