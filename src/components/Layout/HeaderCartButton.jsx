import React, { useContext, useState, useEffect } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

function HeaderCartButton({ text, onCartShow }) {
  const [isBumped, setIsBumped] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.reduce(
    (totalNumber, currentItem) => totalNumber + currentItem.amount,
    0
  );

  const items = cartCtx.items;
  useEffect(() => {
    // after state changes
    if (items.length === 0) {
      return;
    }
    // console.log("EFFECT");
    setIsBumped(true);
    const timer = setTimeout(() => {
      setIsBumped(false);
    }, 300);
    // before each useEffect code
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const buttonClasses = `${styles.button} ${isBumped ? styles.bump : ""}`;
  return (
    <button className={buttonClasses} onClick={onCartShow}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>{text}</span>
      <span className={styles.badge}>{numberOfItems}</span>
    </button>
  );
}

export default HeaderCartButton;
