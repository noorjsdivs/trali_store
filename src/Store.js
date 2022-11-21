import { createContext, useReducer } from "react";
const Store = createContext();

//=================== User Store start here =====================
const userInitialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

function userReducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
}
//=================== User Store end here =====================
//=================== Cart Store start here =====================

const cartInitialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function cartReducer(state, action) {
  switch (action.type) {
    case "CART_ADD_PRODUCT": {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );

      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item.id === existingItem.id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      //================ Saving in localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_PRODUCT": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CLEAR_CART": {
      localStorage.removeItem("cartItems");
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    default:
      return state;
  }
}
//=================== Cart Store end here =====================
//=================== Wish List start here =====================
const wishlistInitialState = {
  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  },
};

function wishlistReducer(state, action) {
  switch (action.type) {
    case "WISHLIST_ADD_PRODUCT": {
      const newItem = action.payload;
      const existingItem = state.wishlist.wishlistItems.find(
        (item) => item.id === newItem.id
      );

      const wishlistItems = existingItem
        ? state.wishlist.wishlistItems.map((item) =>
            item.id === existingItem.id ? newItem : item
          )
        : [...state.wishlist.wishlistItems, newItem];
      // console.log(wishlistItems);

      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
      return { ...state, wishlist: { ...state.wishlist, wishlistItems } };
    }
    case "REMOVE_WISHLIST_PRODUCT": {
      const wishlistItems = state.wishlist.wishlistItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
      return { ...state, wishlist: { ...state.wishlist, wishlistItems } };
    }

    case "CLEAR_WISHLIST": {
      localStorage.removeItem("wishlistItems");
      return {
        ...state,
        wishlist: { ...state.wishlist, wishlistItems: [] },
      };
    }
    default:
      return state;
  }
}
//=================== Wish List end here =======================
//=================== Compare Store start here ===================
const compareInitialState = {
  compareItem: {
    compareItems: localStorage.getItem("compareItems")
      ? JSON.parse(localStorage.getItem("compareItems"))
      : [],
  },
};

function compareReducer(state, action) {
  switch (action.type) {
    case "ADD_COMPARE_PRODUCT": {
      const newItem = action.payload;
      const existingItem = state.compareItem.compareItems.find(
        (item) => item.id === newItem.id
      );

      const compareItems = existingItem
        ? state.compareItem.compareItems.map((item) =>
            item.id === existingItem.id ? newItem : item
          )
        : [...state.compareItem.compareItems, newItem];

      // console.log(compareItems);

      localStorage.setItem("compareItems", JSON.stringify(compareItems));
      return { ...state, compareItem: { ...state.compareItem, compareItems } };
    }
    case "REMOVE_COMPARE_PRODUCT": {
      const compareItems = state.compareItem.compareItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("compareItems", JSON.stringify(compareItems));
      return { ...state, compareItem: { ...state.compareItem, compareItems } };
    }
    case "CLEAR_COMPARE": {
      localStorage.removeItem("compareItems");
      return {
        ...state,
        compareItem: { ...state.compareItem, compareItems: [] },
      };
    }

    default:
      return state;
  }
}
//=================== Compare Store end here =====================

//=================== Provider start here =====================

function StoreProvider(props) {
  let [state, dispatch] = useReducer(userReducer, userInitialState);
  let [cartstate, cartdispatch] = useReducer(cartReducer, cartInitialState);
  let [comparestate, comparedispatch] = useReducer(
    compareReducer,
    compareInitialState
  );
  let [wishliststate, wishlistdispatch] = useReducer(
    wishlistReducer,
    wishlistInitialState
  );
  const value = {
    state,
    dispatch,
    cartstate,
    cartdispatch,
    comparestate,
    comparedispatch,
    wishliststate,
    wishlistdispatch,
  };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
//=================== Provider end here =====================

export { Store, StoreProvider };
