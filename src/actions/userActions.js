import axios from 'axios'
import { CART_EMPTY } from "../constants/cardConstants"
import { CART_INGREDIENT_EMPTY } from '../constants/cartIngredientConstants'
import { USER_ADMIN_DETAILS_FAIL, USER_ADMIN_DETAILS_REQUEST, USER_ADMIN_DETAILS_SUCCESS, USER_ADMIN_UPDATE_FAIL, USER_ADMIN_UPDATE_REQUEST, USER_ADMIN_UPDATE_SUCCESS, USER_CREATE_FAIL, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REMOVE_FAIL, USER_REMOVE_REQUEST, USER_REMOVE_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"
import { url } from './api';
export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
    try {
        const { data } = await axios.post(`${url}/users/signin`, { email, password })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}

export const register = (name, email, password, gender) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post(`${url}/users/register`, { name, email, password, gender })
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

        })
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    dispatch({ type: USER_SIGNOUT })
    dispatch({ type: CART_EMPTY })
    dispatch({ type: CART_INGREDIENT_EMPTY })

}

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`${url}/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.put(`${url}/users/profile`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })

        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })

        dispatch({
            type: USER_SIGNIN_SUCCESS, payload: data
        })
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }

}


export const listUsers = () => async (dispatch, getState) => {
    dispatch({
        type: USER_LIST_REQUEST
    })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`${url}/users`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_LIST_FAIL, payload: error.message })
    }
}

export const deletedUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_REMOVE_REQUEST, payload: userId })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.delete(`${url}/users/` + userId, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: USER_REMOVE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: USER_REMOVE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const createdUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_CREATE_REQUEST, payload: user })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.post(`${url}/users`, user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: USER_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updatedUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_ADMIN_UPDATE_REQUEST, payload: user })
    const { userSignIn: { userInfo } } = getState()
    try {

        const { data } = await axios.put(`${url}/users/update/` + user._id, user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: USER_ADMIN_UPDATE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: USER_ADMIN_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const detailsAdminUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_ADMIN_DETAILS_REQUEST, payload: userId })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`${url}/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        })
        dispatch({ type: USER_ADMIN_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_ADMIN_DETAILS_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}