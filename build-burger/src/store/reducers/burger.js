import * as actionType from '../actions';

const initalState = {
    ingredients: [],
    totalPrice: 0
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case actionType.SET_INGREDIENTS : {
            return {
                ...state,
                ingredients: [...action.ingredients]
            }
        }
        case actionType.UPDATE_INGREDIENT :
            const updatedArray = state.ingredients.filter();
            for(let ing in updatedArray){
                if(ing.action.ingredientKey === ing){
                    updatedArray[ing] = action.count;
                }
            }

            return {
                ...state,
                ingredients: updatedArray
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