import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let initial = true;

const App = () => {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const addToCart = async () => {
      dispatch(
        uiActions.setNotification({
          status: "pending",
          message: "Sending...",
          title: "Sending data to cart!",
        })
      );
      const response = await fetch(
        "https://orders-f0024-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      dispatch(
        uiActions.setNotification({
          status: "seccess",
          message: "Order add to cart successfully",
          title: "Placed in Cart successfully",
        })
      );
    };

    if (initial) {
      initial = false;
      return;
    }

    addToCart().catch((err) => {
      dispatch(
        uiActions.setNotification({
          status: "error",
          message: err.message,
          title: "Got some error",
        })
      );
    });
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
