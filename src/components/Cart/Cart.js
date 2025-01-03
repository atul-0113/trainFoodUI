import { Fragment } from "react";
import { useContext, useState } from "react";
import CartContext from "../../store/Cart-Context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { BASE_URL } from "../../Configs/config";

const Cart = (props) => {
  const [isCheckout, setCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [submited, setSubmited] = useState(false);

  const cartContext = useContext(CartContext);
  const authToken = localStorage.getItem("authToken");
  const userObj = JSON.parse(localStorage.getItem('userData'))
  const totalAmount = `Rs. ${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHadler = (id) => {
    cartContext.removeItem(id);
  };
  const cartItemAddHadler = (item) => {
    cartContext.additem(item);
  };

  const orderHandler = () => {
    setCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch(
      `${BASE_URL}/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          delivery_address : userData?.station?.stationName+"-"+userData.station.stationCode,
          user_id: userObj._id,
          train_number : userData.trainNumber?.trainNumber,
          coach_number: userData.coachNumber,
          seat_number : userData.seatNumber ,
          food_items: cartContext.items
        }),
      }
    );
    setIsSubmiting(false);
    setSubmited(true);
    cartContext.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item, id) => (
        <CartItem
          key={id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHadler.bind(null, item.id)}
          onAdd={cartItemAddHadler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmitingModalContent = <p>Sending order data...</p>;

  const submitedModalContent = (
    <Fragment>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !submited && cartModalContent}
      {isSubmiting && isSubmitingModalContent}
      {!isSubmiting && submited && submitedModalContent}
    </Modal>
  );
};

export default Cart;
