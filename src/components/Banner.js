import React from 'react';
import { Box, Typography } from '@mui/material';

const Banner = () => {
  return (
    <Box style={{ marginTop: '80px', textAlign: 'center', padding: '40px', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h3">Delicious Food for You Now</Typography>
      <Typography variant="body1">
        Choose your favorite meal to satisfy your hunger.
      </Typography>
    </Box>
  );
};

export default Banner;