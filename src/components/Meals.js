import React, { useContext } from 'react';
import { Grid, Box } from '@mui/material';
import ItemsContext from '../store/items-context';
import MealsItem from './MealsItem';

const Meals = (props) => {
  const itemsCtx = useContext(ItemsContext);

  return (
    <Box sx={{ flexGrow: 1, padding: '20px', marginTop: '20px' }}>
      <Grid container spacing={3} justifyContent="center">
        {itemsCtx.itemsData.map((meal) => (
          <Grid key={meal.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <MealsItem
              id={meal.id}
              price={meal.price}
              image={meal.image}
              isAdmin={props.isAdmin}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Meals;