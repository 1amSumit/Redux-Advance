import classes from "./CartButton.module.css";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const products = useSelector((state) => state.addProduct);
  return (
    <button onClick={props.onClick} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{products.length}</span>
    </button>
  );
};

export default CartButton;
