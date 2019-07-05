import * as actionTypes from '../actions/actionTypes';

const initialState = {
    results: []
}

const deleteResult = (state, id) => {
    const updatedArray = state.results.filter(result => {
        return result.id !== id;
    })
    return {
        ...state,
        results: updatedArray
    }
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
            return deleteResult(state, action.id);
        }
        default: {
            return state;
        }
    }
};

export default reducer;