export const cartCanteenReducer = (state = { cartcanteenItems: [] }, action) => {
    switch (action.type) {
      case "ADD_TO_CANTEENCART":
        const alreadyExists = state.cartcanteenItems.find(
          (item) =>
            item.varient === action.payload.varient &&
            item.name === action.payload.name
        );
        if (alreadyExists) {
          return {
            ...state,
            cartcanteenItems: state.cartcanteenItems.map((item) =>
              item.varient === action.payload.varient &&
              item.name === action.payload.name
                ? action.payload
                : item
            ),
          };
        } else {
          return {
            ...state,
            cartcanteenItems: [...state.cartcanteenItems, action.payload],
          };
        }
      case "DELETE_FROM_CANTEENCART":
        return {
          ...state,
          cartcanteenItems: state.cartcanteenItems.filter(
            (item) => item.price !== action.payload.price
          ),
        };
      default:
        return state;
    }
  };
  