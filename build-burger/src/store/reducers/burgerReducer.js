import * as actionType from '../actions';

const initalState = {
    ingredients: null,
    totalPrice: 0
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionType.SET_INGREDIENTS : {
            return {
                ...state,
                ingredients: action.ingredients
            }
        }
        case actionType.UPDATE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: action.count
                }
            }
        case actionType.UPDATE_PRICE : 
            return {
                ...state,
                totalPrice: action.totalPrice
            }
        default: {
            return state;
        }
    }
}

export default reducer;