
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_RESET, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_ALL_FAIL, PRODUCT_LIST_ALL_REQUEST, PRODUCT_LIST_ALL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REMOVE_FAIL, PRODUCT_REMOVE_REQUEST, PRODUCT_REMOVE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants";
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.data, currentPage: action.payload.currentPage, numberOfPage: action.payload.numberOfPage }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productListAllReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_ALL_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_ALL_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_ALL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: {}, loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_DETAILS_RESET:
            return { product: {}, success: false }
        default:
            return state
    }
}

export const productCreatedReducer = (state = { product: {}, success: false }, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productRemovedReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_REMOVE_REQUEST:
            return { loading: true };
        case PRODUCT_REMOVE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_REMOVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productUpdatedReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
