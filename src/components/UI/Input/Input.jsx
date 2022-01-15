import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const { label, inputArgs, value, inputChangeHandler } = props;
  return (
    <div className={styles.input}>
      <label htmlFor={inputArgs.id}>{label}</label>
      <input
        ref={ref}
        {...inputArgs}
        value={value}
        onChange={inputChangeHandler}
      />
    </div>
  );
});

export default Input;
