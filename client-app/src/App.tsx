import React, { useCallback, useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';

import './App.css';
import { NewOrder, Order } from './models/order';

import agent from './api/agent';
import OrderPage from './pages/OrderPage';
import AlertComponent from './components/Alert/AlertContainer';
import { Severity } from './models/severity';
import NewOrderDialog from './components/NewOrderDialog/NewOrderDialog';

function App() {
  const [data, setData] = useState<Order[]>([]);
  const [alert, setAlert] = useState({
    show: false,
    text: '',
    severity: 'info' as Severity,
  });
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const fetchData = useCallback(async () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders`)
      .then(res => res.json())
      .then((data: Order[]) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleCloseAlert(event?: React.SyntheticEvent | Event, reason?: string) {
    setAlert(prevState => ({
      ...prevState,
      show: false,
    }));
  };

  function handleDelete(id: string) {
    agent.Orders.delete(id).then(() => {
      fetchData();
      setAlert({
        show: true,
        text: `Successfully deleted order with id ${id}`,
        severity: 'success'
      });
    }).catch(() => {
      setAlert({
        show: true,
        text: `Could not delete order`,
        severity: 'error'
      });
    });
  }

  function handleCreateNewOrder(newOrder: NewOrder) {
    agent.Orders.create(newOrder)
      .then(() => {
        setOpenNewDialog(false);
        fetchData();
        setAlert({
          show: true,
          text: `Successfully created new order`,
          severity: 'success'
        });
      }).catch(() => {
        setAlert({
          show: true,
          text: `Could not register a new order`,
          severity: 'error'
        });
      });
  }

  function handleEdit(order: Order) {
    agent.Orders.update(order)
      .then(() => {
        fetchData();
        setAlert({
          show: true,
          text: `Successfully updated order with id ${order.id}`,
          severity: 'success'
        });
      }).catch(() => {
        setAlert({
          show: true,
          text: `Could not updated order`,
          severity: 'error'
        });
      });
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <span className='title'>
          Orders
        </span>
        <IconButton
          color={'inherit'}
          style={{
            position: 'absolute',
            right: 10
          }}
          onClick={() => setOpenNewDialog(true)}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </header>
      <OrderPage
        data={data}
        onDelete={handleDelete}
        onUpdate={handleEdit}
        onValueChange={newValue => setData(newValue)}
      />
      <AlertComponent
        open={alert.show}
        text={alert.text}
        severity={alert.severity}
        onClose={handleCloseAlert}
      />
      <NewOrderDialog
        open={openNewDialog}
        onClose={() => setOpenNewDialog(false)}
        onCreate={handleCreateNewOrder}
      />
    </div>
  );
}

export default App;
