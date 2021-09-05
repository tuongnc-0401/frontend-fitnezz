import axios from 'axios'

import { MEAL_CREATE_FAIL, MEAL_CREATE_REQUEST, MEAL_CREATE_SUCCESS, MEAL_DETAILS_FAIL, MEAL_DETAILS_REQUEST, MEAL_DETAILS_SUCCESS, MEAL_LIST_FAIL, MEAL_LIST_REQUEST, MEAL_LIST_SUCCESS, MEAL_REMOVE_FAIL, MEAL_REMOVE_REQUEST, MEAL_REMOVE_SUCCESS, MEAL_UPDATE_FAIL, MEAL_UPDATE_REQUEST, MEAL_UPDATE_SUCCESS, MEAL_ONE_FAIL, MEAL_ONE_REQUEST, MEAL_ONE_SUCCESS } from '../constants/mealConstants'
import { url } from './api';


export const listMeal = () => async (dispatch, getState) => {
    dispatch({ type: MEAL_LIST_REQUEST })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`${url}/meals`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: MEAL_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: MEAL_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const deletedMeal = (mealId) => async (dispatch, getState) => {
    dispatch({ type: MEAL_REMOVE_REQUEST, payload: mealId })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.delete(`${url}/meals/` + mealId, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: MEAL_REMOVE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: MEAL_REMOVE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const createdMeal = (meal) => async (dispatch, getState) => {
    dispatch({ type: MEAL_CREATE_REQUEST, payload: meal })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.post(`${url}/meals`, meal, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: MEAL_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: MEAL_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const detailsMeal = (mealId) => async (dispatch, getState) => {
    dispatch({ type: MEAL_DETAILS_REQUEST, payload: mealId })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`${url}/meals/${mealId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch({ type: MEAL_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: MEAL_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updatedMeal = (meal) => async (dispatch, getState) => {
    dispatch({ type: MEAL_UPDATE_REQUEST, payload: meal })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.put(`${url}/meals/` + meal._id, meal, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: MEAL_UPDATE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: MEAL_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getOneMeal = (id) => async (dispatch) => {
    if (!id) {
        id = 0;
    }
    const dataSent = {
        _id: id
    };

    dispatch({
        type: MEAL_ONE_REQUEST,
        payload: dataSent
    })
    try {
        const { data } = await axios.post(`${url}/meals/getone`, dataSent);
        dispatch({
            type: MEAL_ONE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: MEAL_ONE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}