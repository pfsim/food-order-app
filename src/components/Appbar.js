import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import CartContext from '../store/cart-context';

const Appbar = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography 
        variant="h6" 
        component="div" 
        sx={{ 
        flexGrow: 1, 
        fontWeight: 'bold',     
        fontSize: '2rem',        
        color: '#e1f06cff',        
        letterSpacing: '2px',     
        fontFamily: 'cursive',    
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
        cursor: 'pointer'         
        }}
        >
          Feed Me Now
        </Typography>
        <Button 
          color="inherit" 
          variant="outlined" 
          onClick={props.onShowCart}
        >
          Your Cart
          <span style={{ marginLeft: '10px', background: 'brown', padding: '0 8px', borderRadius: '10px' }}>
            {numberOfCartItems}
          </span>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;