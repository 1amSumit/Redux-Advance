import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { sendDataToCArt } from "./store/cart-slice";
import { getData } from "./store/cart-slice";
import Notification from "./components/UI/Notification";

let initial = true;

const App = () => {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendDataToCArt(cart));
    }
  }, [cart, dispatch]);

  return (
    <Layout>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {showCart && <Cart />}
      {!showCart && <Products />}
    </Layout>
  );
};

export default App;
