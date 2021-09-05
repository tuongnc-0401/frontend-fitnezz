import axios from "axios";
import {
    PROGRAM_UPDATE_REQUEST, PROGRAM_UPDATE_SUCCESS, PROGRAM_UPDATE_FAIL,
    CREATE_ONE_PROGRAM_REQUEST, CREATE_ONE_PROGRAM_SUCCESS, CREATE_ONE_PROGRAM_FAIL,
    GET_ALL_PROGRAM_REQUEST, GET_ALL_PROGRAM_SUCCESS, GET_ALL_PROGRAM_FAIL,
    GET_ONE_PROGRAM_REQUEST, GET_ONE_PROGRAM_SUCCESS, GET_ONE_PROGRAM_FAIL,
    DEL_PROGRAM_REQUEST, DEL_PROGRAM_SUCCESS, DEL_PROGRAM_FAIL
} from './../constants/programConstants';
import { url } from './api';
export const createOneProgram = (name, gender, type, equipment, timeMinute, duration, videos, imgUrl) => async (dispatch, getState) => {
    dispatch({ type: CREATE_ONE_PROGRAM_REQUEST });
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.post(`${url}/fitnessvideo`, { name, gender, type, equipment, timeMinute, duration, videos, imgUrl }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: CREATE_ONE_PROGRAM_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CREATE_ONE_PROGRAM_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const getAllProgram = () => async (dispatch) => {
    dispatch({ type: GET_ALL_PROGRAM_REQUEST });
    try {
        const { data } = await axios.get(`${url}/fitnessvideo`);
        dispatch({ type: GET_ALL_PROGRAM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_PROGRAM_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const getOneProgram = (programId) => async (dispatch) => {
    dispatch({ type: GET_ONE_PROGRAM_REQUEST });
    try {
        const { data } = await axios.get(`${url}/fitnessvideo/${programId}`);
        dispatch({ type: GET_ONE_PROGRAM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ONE_PROGRAM_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const deleteOneProgram = (id) => async (dispatch, getState) => {
    dispatch({ type: DEL_PROGRAM_REQUEST });
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.delete(`${url}/fitnessvideo/${id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({ type: DEL_PROGRAM_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DEL_PROGRAM_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};

export const updatedOneProgram = (id, name, gender, type, equipment, timeMinute, duration, imgUrl, videos) => async (dispatch, getState) => {
    dispatch({ type: PROGRAM_UPDATE_REQUEST })
    const { userSignIn: { userInfo } } = getState()
    try {
        const { data } = await axios.put(`${url}/fitnessvideo/${id}`, { name, gender, type, equipment, timeMinute, duration, videos, imgUrl }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: PROGRAM_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: PROGRAM_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}