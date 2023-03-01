import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const Products = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    dispatch(cartActions.addItem(item));
  };

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {props.items.map((item) => {
          return (
            <ProductItem
              key={item.id}
              item={item}
              onClick={() => addToCartHandler(item)}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
