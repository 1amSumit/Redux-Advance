import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";

const MainHeader = (props) => {
  const dispatch = useDispatch();
  const cartClickHandler = () => {
    dispatch(uiActions.showCartModel());
  };
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton onClick={cartClickHandler} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
