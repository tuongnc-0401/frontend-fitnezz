import axios from 'axios'
import { CALCULATOR_CREATE_FAIL, CALCULATOR_CREATE_REQUEST, CALCULATOR_CREATE_SUCCESS, CALCULATOR_MINE_LIST_FAIL, CALCULATOR_MINE_LIST_REQUEST, CALCULATOR_MINE_LIST_SUCCESS, GET_USER_BMI_FAIL, GET_USER_BMI_REQUEST, GET_USER_BMI_SUCCESS } from '../constants/calculatorConstants'
import { USER_LIST_BMI_FAIL, USER_LIST_BMI_REQUEST, USER_LIST_BMI_SUCCESS } from '../constants/userConstants'
import { url } from './api';

export const createCalculator = (calculatorInfo) => async (dispatch, getState) => {
    dispatch({ type: CALCULATOR_CREATE_REQUEST, payload: calculatorInfo })
    try {
        const { userSignIn: { userInfo } } = getState()
        const { data } = await axios.post(`${url}/calculators`, calculatorInfo, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: CALCULATOR_CREATE_SUCCESS, payload: data.calculatorInfo })

    } catch (error) {
        dispatch({
            type: CALCULATOR_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getAllCalculatorHistory = () => async (dispatch, getState) => {
    dispatch({ type: CALCULATOR_MINE_LIST_REQUEST });
    try {
        const { userSignIn: { userInfo } } = getState();
        const { data } = await axios.get(`${url}/calculators/mine`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch({ type: CALCULATOR_MINE_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: CALCULATOR_MINE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const listAllUserBmi = () => async (dispatch, getState) => {
    dispatch({
        type: USER_LIST_BMI_REQUEST
    })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`${url}/calculators/getBmiAllUser`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: USER_LIST_BMI_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_LIST_BMI_FAIL, payload: error.message })
    }
}

export const getOneUserBMI = () => async (dispatch, getState) => {
    dispatch({ type: GET_USER_BMI_REQUEST });
    try {
        const { userSignIn: { userInfo } } = getState();
        const { data } = await axios.get(`${url}/calculators/getOne`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch({ type: GET_USER_BMI_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: GET_USER_BMI_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}