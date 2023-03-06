import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {props.items.map((item) => {
          return (
            <CartItem
              key={item.id}
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
