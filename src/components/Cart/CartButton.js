import classes from "./CartButton.module.css";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const products = useSelector((state) => state.totalProduct);
  return (
    <button onClick={props.onClick} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{products}</span>
    </button>
  );
};

export default CartButton;
