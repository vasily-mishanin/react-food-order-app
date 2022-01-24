import { useState } from "react";

function useInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(enteredValue);
  const hasError = isTouched && !isValid;

  const changeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const blurHandler = (e) => {
    setIsTouched(true);
  };

  return { value: enteredValue, isValid, hasError, changeHandler, blurHandler };
}

export default useInput;
