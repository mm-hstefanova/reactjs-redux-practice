import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { cartActions } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';

const Cart = (props) => {
  const dispatch = useDispatch();

  const addItemHandler = (item) => {
    dispatch(cartActions.addItem(item));
  };

  const removeItemHandler = (id) => {
    console.log('remove id: ', id);
    dispatch(cartActions.removeItem(id));
  };

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {props.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              onAdd={() => addItemHandler(item)}
              onRemove={() => removeItemHandler(item.id)}
              item={{
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                total: item.quantity * item.price,
                price: item.price,
              }}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
