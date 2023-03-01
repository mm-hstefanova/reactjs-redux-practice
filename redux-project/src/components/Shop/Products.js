import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {props.items.map((item) => {
          return <ProductItem key={item.id} item={item} />;
        })}
      </ul>
    </section>
  );
};

export default Products;
