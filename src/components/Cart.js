import React, { useContext } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import CartContext from '../store/cart-context';
import CartItem from './CartItem';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflowY: 'auto'
};

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `RM ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  

  const orderHandler = () => {
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    const newId = existingOrders.length + 1;

    const orderData = {
      id: newId, 
      items: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
      date: new Date().toISOString()
    };

    existingOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    cartCtx.clearCart(); 

    alert(`Order #${newId} Placed Successfully!`);
    props.onClose();
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box sx={style}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {cartCtx.items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
            />
          ))}
        </ul>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontWeight: 'bold' }}>
          <Typography variant="h5">Total Amount</Typography>
          <Typography variant="h5">{totalAmount}</Typography>
        </Box>

        <Box sx={{ textAlign: 'right', marginTop: '20px' }}>
          <Button onClick={props.onClose} color="error" variant="text" sx={{ marginRight: '10px' }}>
            Close
          </Button>
          {hasItems && (
            <Button onClick={orderHandler} variant="contained" color="primary" sx={{ borderRadius: '20px' }}>
              Order
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default Cart;