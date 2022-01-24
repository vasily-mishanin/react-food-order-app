import React, { useRef, useState } from "react";
import styles from "./Checkout.module.css";
import useInput from "../../hooks/use-input"; //custom hook

// validation helper functions
const isNotEmpty = (str) => str.trim().length > 0;
const isFiveChars = (str) => /\b(\w){5}\b/.test(str.trim()); // for postal code

function Checkout(props) {
  //let's use custom hooks
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    changeHandler: nameChangeHandler,
    blurHandler: nameInputBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetHasError,
    changeHandler: streetChangeHandler,
    blurHandler: streetInputBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeHasError,
    changeHandler: postalCodeChangeHandler,
    blurHandler: postalCodeInputBlurHandler,
  } = useInput(isFiveChars);
  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityHasError,
    changeHandler: cityChangeHandler,
    blurHandler: cityInputBlurHandler,
  } = useInput(isNotEmpty);

  const formIsValid =
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalCodeIsValid &&
    enteredCityIsValid;

  // we could use these to get entered Values
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    console.log("Confirm: formIsValid ", formIsValid);

    if (!formIsValid) {
      console.log("invalid from");
      return;
    }
    // in case form IS Valid -> confirm and POST data to server
    props.onConfirm({
      name: enteredName,
      address: {
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity,
      },
    });
  };

  // CSS classes
  const nameInputClass = `${styles.control} ${
    !nameHasError ? "" : styles.invalid
  }`;
  const streetInputClass = `${styles.control} ${
    !streetHasError ? "" : styles.invalid
  }`;
  const postalCodeInputClass = `${styles.control} ${
    !postalCodeHasError ? "" : styles.invalid
  }`;
  const cityInputClass = `${styles.control} ${
    !cityHasError ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          ref={nameInputRef}
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameHasError && <p>Please, enter your name</p>}
      </div>
      <div className={streetInputClass}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          ref={streetInputRef}
          onChange={streetChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {streetHasError && <p>Please, enter valid street</p>}
      </div>
      <div className={postalCodeInputClass}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          ref={postalCodeInputRef}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeInputBlurHandler}
        />
        {postalCodeHasError && (
          <p>Postal code must be 5 symbols (letters, digits)</p>
        )}
      </div>
      <div className={cityInputClass}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          ref={cityInputRef}
          onChange={cityChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {cityHasError && <p>Please, enter valid city</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCheckoutCancel}>
          Cancel
        </button>
        <button className={styles.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
}

export default Checkout;
