import React, { useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const itemsArr = cartCtx.items;
  const cartHasItems = cartCtx.items.length > 0;

  const onAddItemToCartHandler = (item) => {
    cartCtx.addItem(item);
  };
  const onRemoveItemFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

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

  return (
    <CartContext.Consumer>
      {(ctx) => (
        <Modal onCartHide={props.onCartHide}>
          <div className={styles["cart-items"]}>{cartItemsList}</div>

          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{`$${totalPrice}`}</span>
          </div>
          <div className={styles.actions}>
            <button
              className={styles["button--alt"]}
              onClick={props.onCartHide}
            >
              Close
            </button>
            {cartHasItems && <button className={styles.button}>Order</button>}
          </div>
        </Modal>
      )}
    </CartContext.Consumer>
  );
}

export default Cart;
