import Cart from '../components/Cart/Cart';
import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const sendCartData = (cart) => {
  //receives the dispatch function as an argument
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
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
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Send cart data successfully!',
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://reactjs-http-eb2df-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error("Couldn't fetch the data");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(
        cartActions.replaceCart({
          cartItems: cartData.cartItems || [],
          totalPrice: cartData.totalPrice,
          totalCartItems: cartData.totalCartItems,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};
