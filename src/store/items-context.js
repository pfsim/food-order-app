import React from 'react';

const ItemsContext = React.createContext({
  itemsData: [],
  switchPage: null,
  addNewItem: (item) => {},
  removeItem: (id) => {},
  updateItem: (id) => {},
  togglePage: () => {},
});

export default ItemsContext;