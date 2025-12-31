import React, { useContext } from 'react';
import ItemsContext from './store/items-context';
import Users from './pages/Users';
import Admin from './pages/Admin';
import CartProvider from './store/CartProvider'; 

function App() {
  const itemsCtx = useContext(ItemsContext);

  return (
   
    <CartProvider>
      
      {itemsCtx.switchPage ? <Users /> : <Admin />}
      
      <div style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', background: '#ccc', padding: '10px' }}>
         <button onClick={itemsCtx.togglePage}>
            {itemsCtx.switchPage ? 'Admin' : 'User'}
         </button>
      </div>

    </CartProvider>
  );
}

export default App;