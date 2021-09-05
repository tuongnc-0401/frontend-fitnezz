import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { cartIngredientReducer } from './reducers/cartIngredientReducers.js';
import { calculatorCreateReducer, calculatorMineReducer, getAllUserBmiReducer, getOneBMIReducer } from './reducers/calculatorReducers.js';
import { cartReducer } from './reducers/cartReducers.js';



import { ingredientDetailsReducer, ingredientListReducer, ingredientUpdatedReducer, ingredientRemovedReducer, ingredientCreatedReducer } from './reducers/ingredientReducers.js';


import { orderCreateReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderUpdateReducer } from './reducers/orderReducers.js';
import { productCreatedReducer, productDetailsReducer, productListAllReducer, productListReducer, productRemovedReducer, productUpdatedReducer } from './reducers/productReducers.js'
import { getAllProgramsReducer, getOneProgramReducer, delProgramReducer, createProgramReducer, updateProgramReducer } from './reducers/programReducers';
import { userAdminDetailsReducer, userCreatedReducer, userDetailsReducer, userListReducer, userRegisterReducer, userRemovedReducer, userSignInReducer, userUpdatedReducer, userUpdateProfileReducer } from './reducers/userReducers.js';

import { mealCreatedReducer, mealDetailsReducer, mealListReducer, mealRemovedReducer, mealUpdatedReducer, mealOneReducer } from './reducers/mealReducers.js';




const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
    },
    userSignIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,

    }
}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignIn: userSignInReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    newProduct: productCreatedReducer,
    removeProduct: productRemovedReducer,
    updateProduct: productUpdatedReducer,
    ingredientList: ingredientListReducer,
    cartIngredient: cartIngredientReducer,
    updateIngredient: ingredientUpdatedReducer,
    ingredientDetails: ingredientDetailsReducer,
    removeIngredient: ingredientRemovedReducer,
    newIngredient: ingredientCreatedReducer,
    getAllPrograms: getAllProgramsReducer,
    getOneProgram: getOneProgramReducer,
    calculatorCreate: calculatorCreateReducer,
    delProgram: delProgramReducer,
    orderUpdate: orderUpdateReducer,
    orderList: orderListReducer,
    userList: userListReducer,
    removeUser: userRemovedReducer,
    newUser: userCreatedReducer,
    updateUser: userUpdatedReducer,
    userAdminDetails: userAdminDetailsReducer,
    calculatorMine: calculatorMineReducer,
    createProgram: createProgramReducer,
    updateProgram: updateProgramReducer,

    mealList: mealListReducer,
    removeMeal: mealRemovedReducer,
    newMeal: mealCreatedReducer,
    mealDetails: mealDetailsReducer,
    updateMeal: mealUpdatedReducer,

    getUserBMI: getOneBMIReducer,
    mealOne: mealOneReducer,
    productListAll: productListAllReducer,
    allUserBmi: getAllUserBmiReducer,


})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store
