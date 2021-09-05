import { CALCULATOR_CREATE_FAIL, CALCULATOR_CREATE_REQUEST, CALCULATOR_CREATE_SUCCESS, CALCULATOR_MINE_LIST_FAIL, CALCULATOR_MINE_LIST_REQUEST, CALCULATOR_MINE_LIST_SUCCESS, GET_USER_BMI_FAIL, GET_USER_BMI_REQUEST, GET_USER_BMI_SUCCESS } from "../constants/calculatorConstants";
import { USER_LIST_BMI_FAIL, USER_LIST_BMI_REQUEST, USER_LIST_BMI_SUCCESS } from "../constants/userConstants";

export const calculatorCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CALCULATOR_CREATE_REQUEST:
            return { loading: true }
        case CALCULATOR_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case CALCULATOR_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const calculatorMineReducer = (state = { calculators: [] }, action) => {
    switch (action.type) {
        case CALCULATOR_MINE_LIST_REQUEST:
            return { loading: true };
        case CALCULATOR_MINE_LIST_SUCCESS:
            return { loading: false, calculators: action.payload };
        case CALCULATOR_MINE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const getAllUserBmiReducer = (state = { loading: true, userBMI: [] }, action) => {
    switch (action.type) {
        case USER_LIST_BMI_REQUEST:
            return { loading: true };
        case USER_LIST_BMI_SUCCESS:
            return { loading: false, userBMI: action.payload };
        case USER_LIST_BMI_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const getOneBMIReducer = (state = { loading: true, userBMI: [] }, action) => {
    switch (action.type) {
        case GET_USER_BMI_REQUEST:
            return { loading: true };
        case GET_USER_BMI_SUCCESS:
            return { loading: false, userBMI: action.payload };
        case GET_USER_BMI_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}