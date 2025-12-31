import React, { useState } from 'react';
import ItemsContext from './items-context';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi (8 pieces)',
    description: 'Try different raw fishes in one go',
    price: 16.90,
    image: 'https://iili.io/fXlRDbe.jpg' 
  },
  {
    id: 'm2',
    name: 'Chicken Chop',
    description: 'A local favourite, Hainanese style',
    price: 18.90,
    image: 'https://iili.io/fXlRte9.jpg'
  },

  {
    id: 'm3',
    name: 'Double Cheese Burger',
    description: 'Beef Burger with cheese and side fries',
    price: 18.90,
    image: 'https://iili.io/fXlRpWb.jpg'
  },
];


const ItemsProvider = (props) => {
  const [showUserPage, setShowUserPage] = useState(true);
  const [items, setItems] = useState(DUMMY_MEALS);

  const togglePageHandler = () => {
    setShowUserPage((prevState) => !prevState);
  };

  const addNewItemHandler = (item) => {
    setItems((prevItems) => {
      return [item, ...prevItems];
    });
  };

  const removeItemHandler = (id) => {
    setItems((prevItems) => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  const itemsContextValue = {
    itemsData: items, 
    switchPage: showUserPage,
    addNewItem: addNewItemHandler,
    removeItem: removeItemHandler, 
    updateItem: (id) => {},
    togglePage: togglePageHandler,
  };

  return (
    <ItemsContext.Provider value={itemsContextValue}>
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;