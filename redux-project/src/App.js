import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);

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
  const showCart = useSelector((state) => state.cart.showCart);

  return (
    <Layout>
      {showCart && <Cart items={cartItems} />}
      <Products items={products} />
    </Layout>
  );
}

export default App;
