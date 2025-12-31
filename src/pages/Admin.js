import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Box, Button, Typography, Paper, TextField, CircularProgress, List, ListItem, ListItemText, Divider } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import Meals from '../components/Meals';
import ItemsContext from '../store/items-context';

const Admin = () => {
  const itemsCtx = useContext(ItemsContext);

  // --- STATES ---
  const [currentView, setCurrentView] = useState('MENU'); 
  const [orders, setOrders] = useState([]); 
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form Inputs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // --- FUNCTION TO FETCH ORDERS ---
  const fetchOrders = useCallback(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const sortedOrders = storedOrders.reverse(); 
    setOrders(sortedOrders);
  }, []);

  // --- FUNCTION: DELETE ORDER ---
  const deleteOrderHandler = (id) => {
    if (window.confirm('Are you sure this order is fulfilled? This will remove it permanently.')) {
      const updatedOrders = orders.filter(order => order.id !== id);
      setOrders(updatedOrders);

      const currentStorage = JSON.parse(localStorage.getItem('orders')) || [];
      const newStorage = currentStorage.filter(order => order.id !== id);
      localStorage.setItem('orders', JSON.stringify(newStorage));
    }
  };

  // --- LOAD ORDERS WHEN VIEW CHANGES ---
  useEffect(() => {
    if (currentView === 'ORDERS') {
      fetchOrders();
    }
  }, [currentView, fetchOrders]);

  // --- HANDLERS ---
  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // =========================================================
  //  HYBRID SUBMIT HANDLER (API + Fallback)
  // =========================================================
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!name || !description || !price || !selectedFile) {
      alert("Please fill all fields and select an image.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Try to Upload to Cloud using the Public Key
      const formData = new FormData();
      formData.append('key', '6d207e02198a847aa98d0a2a901485a5'); // Public Demo Key
      formData.append('action', 'upload');
      formData.append('source', selectedFile);
      formData.append('format', 'json');

      let finalImageUrl;

      try {
        const response = await fetch('https://freeimage.host/api/1/upload', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();

        if (response.ok && data.image && data.image.url) {
           console.log("API Upload Success");
           finalImageUrl = data.image.url;
        } else {
           throw new Error("API Limit Reached");
        }
      } catch (apiError) {
        console.warn("API failed, switching to local mode.");
        // FALLBACK: Use local browser link so the app doesn't break
        finalImageUrl = URL.createObjectURL(selectedFile);
      }

      // 2. Add Item to Context (using either Cloud URL or Local URL)
      itemsCtx.addNewItem({
        id: Math.random().toString(),
        name: name,
        description: description,
        price: parseFloat(price),
        image: finalImageUrl
      });

      alert("Food Item Added Successfully!");
      
      // 3. Reset Form
      setName('');
      setDescription('');
      setPrice('');
      setSelectedFile(null);
      setIsFormVisible(false);

    } catch (error) {
      console.error("Critical Error:", error);
      alert("Something went wrong, please try again.");
    }

    setIsLoading(false);
  };
  // =========================================================


  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      
      <Paper sx={{ width: '250px', bgcolor: '#f4f4f4', padding: '20px', display: { xs: 'none', md: 'block' } }}>
        <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>Dashboard</Typography>
        
        <List>
          <ListItem button onClick={() => setCurrentView('MENU')} sx={{ bgcolor: currentView === 'MENU' ? '#ddd' : 'transparent', cursor: 'pointer' }}>
            <ListItemText primary="Manage Menu" />
          </ListItem>
          <ListItem button onClick={() => setCurrentView('ORDERS')} sx={{ bgcolor: currentView === 'ORDERS' ? '#ddd' : 'transparent', cursor: 'pointer' }}>
            <ListItemText primary="View Orders" />
          </ListItem>
        </List>
      </Paper>

      <Box sx={{ flex: 1, padding: '40px' }}>
        
        {currentView === 'ORDERS' && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <Typography variant="h4" sx={{ marginRight: '15px' }}>Incoming Orders</Typography>
              <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchOrders}>
                Refresh List
              </Button>
            </Box>

            {orders.length === 0 ? (
              <Typography>No orders placed yet.</Typography>
            ) : (
              orders.map((order, index) => (
                <Paper key={index} sx={{ padding: '20px', marginBottom: '15px', border: '1px solid #eee' }}>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Order ID: #{order.id}</Typography>
                    
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteOrderHandler(order.id)}
                    >
                      Mark Fulfilled
                    </Button>
                  </Box>

                  <Typography variant="caption" color="textSecondary">{new Date(order.date).toLocaleString()}</Typography>
                  
                  <Box sx={{ marginTop: '10px' }}>
                    {order.items.map(item => (
                      <Typography key={item.id} variant="body1">
                        - {item.name} x {item.amount} (RM {item.price})
                      </Typography>
                    ))}
                  </Box>
                  <Divider sx={{ margin: '10px 0' }} />
                  <Typography variant="h6" color="primary">Total: RM {order.totalAmount.toFixed(2)}</Typography>
                </Paper>
              ))
            )}
          </Box>
        )}

        {/* VIEW 2: MENU MANAGEMENT */}
        {currentView === 'MENU' && (
          <>
            {isFormVisible ? (
              <Box component="form" onSubmit={submitHandler} sx={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginBottom: '20px', backgroundColor: '#fff' }}>
                <Typography variant="h6">Add New Food Item</Typography>
                <TextField label="Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
                <TextField label="Description" fullWidth margin="normal" value={description} onChange={e => setDescription(e.target.value)} />
                <TextField label="Price (RM)" type="number" fullWidth margin="normal" value={price} onChange={e => setPrice(e.target.value)} />
                <Box sx={{ marginTop: '15px', marginBottom: '15px' }}>
                  <Typography variant="body2">Food Image:</Typography>
                  <input type="file" accept="image/*" onChange={fileChangeHandler} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <Button variant="outlined" color="error" onClick={() => setIsFormVisible(false)}>Cancel</Button>
                  <Button type="submit" variant="contained" color="success" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Add Item'}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Typography variant="h4">Manage Menu</Typography>
                <Button variant="contained" color="success" onClick={() => setIsFormVisible(true)}>+ Add Food Item</Button>
              </Box>
            )}
            
            <Meals isAdmin={true} />
          </>
        )}

      </Box>
    </Box>
  );
};

export default Admin;