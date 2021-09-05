import { CART_ADD_ITEM, CART_EMPTY, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, REMOVE_ALL_ITEMS, REMOVE_CART_ITEMS, UPDATE_CART_ITEMS } from "../constants/cardConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? { ...x, qty: item.qty + existItem.qty } : x)
                }
            } else {
                return { ...state, cartItems: [...state.cartItems, item] }
            }
        case UPDATE_CART_ITEMS:
            const item1 = action.payload
            const existItem1 = state.cartItems.find(x => x.product === item1.product)
            if (existItem1) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem1.product ? item1 : x)
                }
            } else {
                return state;
            }
        case REMOVE_CART_ITEMS:
            const item2 = action.payload
            const existItem2 = state.cartItems.find(x => x.product === item2.product)
            if (existItem2) {
                return {
                    ...state,
                    cartItems: state.cartItems.filter(x => x.product !== item2.product)
                }
            } else {
                return state;
            }
        case REMOVE_ALL_ITEMS:
            return { ...state, cartItems: [] }
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload }
        case CART_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload }
        case CART_EMPTY:
            return { cartItems: [], shippingAddress: {} }
        default:
            return state
    }
}