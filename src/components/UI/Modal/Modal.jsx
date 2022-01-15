import React from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

//for blackened backdrop
const Backdrop = (props) => {
  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        e.preventDefault();
        props.onCartHide();
      }}
    ></div>
  );
};

//for modal overlay with children
const Overlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCartHide={props.onCartHide} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Overlay children={props.children} />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
}

export default Modal;
