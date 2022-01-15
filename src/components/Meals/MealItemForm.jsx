import React, { useState, useRef, useEffect } from "react";
import styles from "./MealItemForm.module.css";
import Input from "../UI/Input/Input";

function MealItemForm({ id, onAddToCart }) {
  const [amount, setAmount] = useState(1);
  const [isFormValid, setIsFormValid] = useState(true);
  const inputValueRef = useRef();
  const isValid = (v) => v.trim().length > 0 && v > 0 && v < 6;

  const inputChangeHandler = (event) => {
    setAmount(event.target.value);
    console.log("inputChangeHandler ", event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    //console.log(inputValueRef);
    const enteredAmount = inputValueRef.current.value;
    if (isValid(enteredAmount)) {
      const enteredAmountNumber = +enteredAmount;
      onAddToCart(enteredAmountNumber);
      return;
    } else {
      setIsFormValid(false);
    }
  };
  // useEffect(() => {
  //   if (amount === 1) {
  //     return;
  //   }
  //   console.log("MealItemForm amount", amount);
  // }, [amount]);
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        ref={inputValueRef}
        label="Amount"
        inputArgs={{
          id: `amount${id}`,
          type: "number",
          // min: "1",
          // max: "5",
          step: "1",
        }}
        value={amount}
        inputChangeHandler={inputChangeHandler}
      />
      <button>+ Add</button>
      {!isFormValid && (
        <p style={{ marginTop: "5px", color: "salmon", fontSize: "0.75rem" }}>
          Please enter valid amount (1..5)
        </p>
      )}
    </form>
  );
}

export default MealItemForm;
