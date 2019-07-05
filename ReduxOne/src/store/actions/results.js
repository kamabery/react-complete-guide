import * as actionTypes from '../actions/actionTypes';

export const saveResult = (res) => {
    return {
        type: actionTypes.STORE_RESULT,
        counter: res
    }
}

export const storeResult = ( res ) => {
            // don't overuse getState here.
            return (dispatch, getState) => {
                setTimeout(() => {
                    const oldCounter = getState().counter.counter;
                    console.log(oldCounter);
                    dispatch(saveResult(res));
                }, 2000);    
            }
        }


export const deleteResult = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        id: id
    }    
}