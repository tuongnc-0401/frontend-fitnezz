import { CART_ADD_ITEM, REMOVE_CART_ITEMS, UPDATE_CART_ITEMS, REMOVE_ALL_ITEMS, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cardConstants"

export const addToCart = (product, qty) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            product: product._id,
            qty,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const updateCartItems = (product, qty) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_CART_ITEMS,
        payload: {
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            product: product.product,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeCartItems = (product) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEMS,
        payload: {
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            product: product.product,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeAllItems = () => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ALL_ITEMS,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
}

