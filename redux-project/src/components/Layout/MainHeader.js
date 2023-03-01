import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';
import { cartActions } from '../../store/cart-slice';
import { useDispatch, useSelector } from 'react-redux';

const MainHeader = (props) => {
  const dispatch = useDispatch();

  const showCartHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  const itemsQuantity = useSelector((state) => state.cart.totalCartItems);

  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton onClick={showCartHandler} quantity={itemsQuantity} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
