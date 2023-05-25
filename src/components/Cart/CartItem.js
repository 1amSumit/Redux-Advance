import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, amount, total, price } = props.item;

  const onReduceHandler = () => {
    dispatch(cartActions.remoeItemFromCart(id));
  };
  const onIncreseHandler = () => {
    dispatch(
      cartActions.addProductToCart({
        id,
        title,
        amount,
        total,
        price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{amount}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onReduceHandler}>-</button>
          <button onClick={onIncreseHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
