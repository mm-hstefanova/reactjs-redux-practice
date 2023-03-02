import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart);
  const showCart = useSelector((state) => state.cart.showCart);

  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );

      const response = await fetch(
        'https://reactjs-http-eb2df-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Send cart data successfully!',
        })
      );
    };

    // prevent the first time this component builds to send empty cart to the database
    if (isInitial) {
      isInitial = false;
      return;
    }

    // returns promise, so we can catch the error here
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    });
  }, [cart, dispatch]);

  const products = [
    {
      id: '1',
      title: 'Product Title 1',
      description: 'Lorem ipsum dolor sit amet 11',
      quantity: 1,
      price: 5,
    },
    {
      id: '2',
      title: 'Product Title 2',
      description: 'Lorem ipsum dolor sit amet 22',
      quantity: 1,
      price: 10,
    },
    {
      id: '3',
      title: 'Product Title 3',
      description: 'Lorem ipsum dolor sit amet 33',
      quantity: 1,
      price: 15,
    },
  ];

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart items={cartItems} />}
        <Products items={products} />
      </Layout>
    </>
  );
}

export default App;
