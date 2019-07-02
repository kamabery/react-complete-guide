import * as actionTypes from '../actions'

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_RESULT: {
            return {
                counter: 0,
                results: state.results.concat({
                    id: new Date(), 
                    value: action.counter})
            }
        }
        case actionTypes.DELETE_RESULT: {
            const updatedArray = state.results.filter(result => {
                return result.id !== action.id;
            })
            return {
                ...state,
                results: updatedArray
            }
        }
        default: {
            return state;
        }
    }
};

export default reducer;