import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';

const ProductItem = (props) => {
  // const { title, price, description, id } = props;
  const { item } = props;

  return (
    <li className={classes.item} key={item.id}>
      <Card>
        <header>
          <h3>{item.title}</h3>
          <div className={classes.price}>${item.price.toFixed(2)}</div>
        </header>
        <p>{item.description}</p>
        <div className={classes.actions}>
          <button onClick={props.onClick}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
