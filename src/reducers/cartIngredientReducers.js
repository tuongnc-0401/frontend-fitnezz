import { CART_ADD_INGREDIENT, CART_INGREDIENT_EMPTY, REMOVE_CART_INGREDIENT, UPDATE_CART_INGREDIENT } from "../constants/cartIngredientConstants"

export const cartIngredientReducer = (state = { cartIngredients: [] }, action) => {
    switch (action.type) {
        case CART_ADD_INGREDIENT:
            const ingredient = action.payload
            const existIngredient = state.cartIngredients.find((x) => x.ingredient === ingredient.ingredient)
            if (!existIngredient) {
                return {
                    ...state,
                    cartIngredients: [...state.cartIngredients, ingredient]
                }
            }
            return state
        case UPDATE_CART_INGREDIENT:
            const updateIngredient = action.payload
            const existUpdateIngredient = state.cartIngredients.find(x => x.ingredient === updateIngredient.ingredient)
            if (existUpdateIngredient) {
                return {
                    ...state,
                    cartIngredients: state.cartIngredients.map(x => x.ingredient === existUpdateIngredient.ingredient ? updateIngredient : x)
                }
            } else {
                return state;
            }
        case REMOVE_CART_INGREDIENT:
            const removeIngredient = action.payload
            const existRemoveIngredient = state.cartIngredients.find(x => x.ingredient === removeIngredient.ingredient)
            if (existRemoveIngredient) {
                return {
                    ...state,
                    cartIngredients: state.cartIngredients.filter(x => x.ingredient !== removeIngredient.ingredient)
                }
            } else {
                return state;
            }
        case CART_INGREDIENT_EMPTY:
            return { cartIngredients: [] }
        default:
            return state
    }
}