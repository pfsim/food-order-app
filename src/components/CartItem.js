import React from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartItem = (props) => {
  const price = `RM ${props.price.toFixed(2)}`;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <Box>
          <Typography variant="h6">{props.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'brown' }}>
              {price}
            </Typography>
            <Typography variant="body2" sx={{ border: '1px solid #ccc', padding: '2px 8px', borderRadius: '4px', marginLeft: '10px' }}>
              x {props.amount}
            </Typography>
          </Box>
        </Box>

        <Box>
          <IconButton onClick={props.onRemove} size="small" sx={{ border: '1px solid brown', borderRadius: '5px', marginRight: '5px', color: 'brown' }}>
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={props.onAdd} size="small" sx={{ border: '1px solid brown', borderRadius: '5px', color: 'brown' }}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default CartItem;