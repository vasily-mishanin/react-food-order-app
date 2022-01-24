import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartDefaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //check if item is already in items and update only amount
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    const updatedTotalAmount = state.totalAmount + action.item.price;
    //  console.log("updatedTotalAmount ", typeof updatedTotalAmount);
    const updatedState = {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
    //  console.log("cartReducer", updatedState);
    return updatedState;
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem.amount === 1) {
      //remove whole item {}
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      // decrease amount by 1
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    const updatedState = {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
    return updatedState;
  }

  if (action.type === "EMPTY") {
    return cartDefaultState;
  }

  return cartDefaultState;
};

function CartProvider(props) {
  const [cartState, dispatchCart] = useReducer(cartReducer, cartDefaultState);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const emptyCartHandler = () => {
    dispatchCart({ type: "EMPTY" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    emptyCart: emptyCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
