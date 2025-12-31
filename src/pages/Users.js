import React, { useState } from 'react';
import Appbar from '../components/Appbar';
import Banner from '../components/Banner';
import Meals from '../components/Meals';
import Cart from '../components/Cart';

const Users = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <>
      <Cart open={cartIsShown} onClose={hideCartHandler} />
      <Appbar onShowCart={showCartHandler} />
      <Banner />
      <Meals />
    </>
  );
};

export default Users;