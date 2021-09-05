import { CART_ADD_INGREDIENT, REMOVE_CART_INGREDIENT, UPDATE_CART_INGREDIENT } from "../constants/cartIngredientConstants"

export const cartAddIngredient = (ingredient, qty) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_INGREDIENT,
        payload: {
            name: ingredient.name,
            image: ingredient.image,
            calo: ingredient.calo,
            description: ingredient.description,
            ingredient: ingredient._id,
            qty,
        }
    })

}

export const removeCartIngredient = (ingredient) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_INGREDIENT,
        payload: {
            name: ingredient.name,
            image: ingredient.image,
            calo: ingredient.calo,
            description: ingredient.description,
            ingredient: ingredient.ingredient,
        }
    })

}

export const updateCartIngredient = (ingredient, qty) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_CART_INGREDIENT,
        payload: {
            name: ingredient.name,
            image: ingredient.image,
            calo: ingredient.calo,
            description: ingredient.description,
            ingredient: ingredient.ingredient,
            qty
        }
    })

}