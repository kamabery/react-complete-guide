import * as actionType from '../actions/actionTypes';
import { updateObject } from './../utility';

const initalState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    building: false
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionType.SET_INGREDIENTS : {
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 0,
                building: false
            }
        }
        case actionType.UPDATE_INGREDIENT :
            const updatedIngredient = {[action.ingredient]: action.count};
            const updateIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ...state,
                ingredients: updateIngredients,
                building: true
            }
            
            return updatedState;
        case actionType.UPDATE_PRICE : 
            return {
                ...state,
                totalPrice: action.totalPrice,
                error: false                
            }
        case actionType.SET_ERROR : 
            return {
                ...state,
                error: action.error
            }
        default: {
            return state;
        }
    }
}

export default reducer;