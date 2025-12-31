import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import CartContext from '../store/cart-context';
import ItemsContext from '../store/items-context';

const MealsItem = (props) => {
  const cartCtx = useContext(CartContext);
  const itemsCtx = useContext(ItemsContext);

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: 1,
      price: props.price
    });
  };

  const deleteHandler = () => {
    itemsCtx.removeItem(props.id);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', borderRadius: '15px', boxShadow: 3 }}>
      <CardMedia component="img" height="180" image={props.image} alt={props.name} />
      <CardContent>
        <Typography gutterBottom variant="h5">{props.name}</Typography>
        <Typography variant="body2" color="text.secondary">{props.description}</Typography>
        <Typography variant="h6" sx={{ marginTop: 1 }}>RM {props.price}</Typography>
      </CardContent>
      
      <CardActions>
        {props.isAdmin ? (
           <Button 
             size="small" variant="contained" color="error" 
             onClick={deleteHandler}
             sx={{ width: '100%', fontWeight: 'bold' }}
           >
             Delete
           </Button>
        ) : (
           <Button 
             size="small" variant="contained" color="primary" 
             onClick={addToCartHandler}
             sx={{ width: '100%', fontWeight: 'bold' }}
           >
             Add To Cart
           </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MealsItem;