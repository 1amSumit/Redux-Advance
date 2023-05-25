import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/redux";

const ProductItem = (props) => {
  const products = useSelector((state) => state.addProduct);
  const itemInCart = useSelector((state) => state.itemAlreadyInCart);

  const dispatch = useDispatch();
  const { title, price, description } = props;

  let index;

  const checkItem = (title) => {
    products.forEach((product, i) => {
      console.log(product.title, title);
      if (product.title === title) {
        index = i;
        dispatch(cartActions.setItemAlreadyinCart());
      } else {
        dispatch(cartActions.setItemNotinCart());
      }
    });
  };

  const addToCarthandler = () => {
    checkItem(title);
    if (!itemInCart) {
      dispatch(
        cartActions.addProductToCart({
          title,
          price,
          description,
          amount: 1,
        })
      );
    } else {
      dispatch(cartActions.increaseItem(index));
    }
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCarthandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
