import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  const price = `$${meal.price.toFixed(2)}`;

  const addItemHandler = (amount) => {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      amount: amount,
    });
    // console.log("MealItem", amount);
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addItemHandler} id={meal.id}></MealItemForm>
      </div>
    </li>
  );
}

export default MealItem;
