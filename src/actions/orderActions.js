import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_UPDATE_FAIL, ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS } from "../constants/orderConstants"
import axios from 'axios'
import { CART_EMPTY } from "../constants/cardConstants"
import { url } from './api';
export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
    try {
        const { userSignIn: { userInfo } } = getState()
        const { data } = await axios.post(`${url}/orders`, order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem('cartItems')
        localStorage.removeItem('shippingAddress')
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`${url}/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const listOrderMine = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_LIST_REQUEST })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`${url}/orders/mine`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_MINE_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const listOrder = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`${url}/orders`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const updateOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_UPDATE_REQUEST })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.put(`${url}/orders/` + order.id, order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_UPDATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}