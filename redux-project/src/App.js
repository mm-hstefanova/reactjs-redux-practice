import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart);
  const showCart = useSelector((state) => state.cart.showCart);

  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    // changed is a flag that indicates if we have some updates on the cart and to update the database
    if (cart.changed) {
      // sendCartData - is action creator and we need to dispatch it

      dispatch(sendCartData(cart));
    }
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
