import * as actionTypes from './actionTypes';
import axios from '../../axios-order'


export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredients = () =>
{
    return dispatch => {
        axios.get('/Ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));            
        }).catch(dispatch(setError(true)));

    }
}

export const updateIngredient = (ingredient, count) => {
    return {
        type: actionTypes.UPDATE_INGREDIENT,
        ingredient: ingredient,
        count: count
    }
}

export const updatePrice = (totalPrice) => {
    return {
        type: actionTypes.UPDATE_PRICE,
        totalPrice: totalPrice
    }
}

export const setError = (error) => {
    return {
        type: actionTypes.SET_ERROR,
        error: error
    }
}