import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [beenConfirmed, setBeenConfirmed] = useState(false);

  const itemsArr = cartCtx.items;
  const cartHasItems = cartCtx.items.length > 0;

  const onAddItemToCartHandler = (item) => {
    cartCtx.addItem(item);
  };
  const onRemoveItemFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const confirmOrderHandler = async (userData) => {
    setIsConfirming(true);
    const response = await fetch(
      "https://react-food-order-app-6b5dd-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ customer: userData, orderItems: cartCtx.items }),
        headers: {
          "Content-Type": "applications/jsons",
        },
      }
    );
    if (response.ok) {
      console.log("ORDER Confirmed !");
    }
    setIsConfirming(false);
    setBeenConfirmed(true);
    cartCtx.emptyCart();
  };

  //JSX

  const cartItemsList = (
    <ul>
      {itemsArr.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={onAddItemToCartHandler.bind(null, item)}
          onRemove={() => {
            onRemoveItemFromCartHandler(item.id);
          }}
        />
      ))}
    </ul>
  );

  const priceNumber = cartCtx.totalAmount.toFixed(2);
  const totalPrice = priceNumber.toString() === "-0.00" ? "0.00" : priceNumber;

  const cartActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onCartHide}>
        Close
      </button>
      {cartHasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <React.Fragment>
      <div className={styles["cart-items"]}>{cartItemsList}</div>

      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{`$${totalPrice}`}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCheckoutCancel={props.onCartHide}
          onConfirm={confirmOrderHandler}
        />
      )}
      {!isCheckout && cartActions}
    </React.Fragment>
  );

  const isConfirmingContent = (
    <h4 className={styles.isConfirmingMessage}>Order is processing...</h4>
  );

  const beenConfirmedContent = (
    <React.Fragment>
      <h4 className={styles.confirmedMessage}>Order is confirmed!</h4>{" "}
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCartHide}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onCartHide={props.onCartHide}>
      {" "}
      {!isConfirming && !beenConfirmed && cartContent}
      {isConfirming && !beenConfirmed && isConfirmingContent}
      {!isConfirming && beenConfirmed && beenConfirmedContent}
    </Modal>
  );
}

export default Cart;
