import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { useSelector } from "react-redux";

const App = () => {
  const showCart = useSelector((state) => state.showCart);
  return (
    <Layout>
      {showCart && <Cart />}
      {!showCart && <Products />}
    </Layout>
  );
};

export default App;
