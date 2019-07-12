import * as actionTypes from './actionTypes';
import axios from 'axios';

const baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
const token = 'token';
const experationDate = 'experationDate';
const localId = 'localId'

export const checkAuthTimeout = (experationTime)  => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, experationTime * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem(token);
    localStorage.removeItem(experationDate);
    localStorage.removeItem(localId);
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
      return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let action = "verifyPassword";

        if(isSignup){
            action = "signupNewUser";            
        }

        authenticate(action, authData, dispatch)
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const tokenValue = localStorage.getItem(token);
        if(!tokenValue) {
            dispatch(logout());
        } else
        {
            const experationDateValue = new Date(localStorage.getItem(experationDate));
            if(experationDateValue > new Date()) {
                const localIdValue = localStorage.getItem(localId);
                dispatch(authSuccess(tokenValue, localIdValue));
                const experationTime = (experationDateValue - new Date()) / 1000;
                dispatch(checkAuthTimeout(experationTime));
            } else {
                dispatch(logout());
            }
        }
    }
}

const authenticate = (action, authData, dispatch) => {
    axios.get("https://localhost:5001/api/values", {headers: {
        'Content-Type': 'application/json'}}).then(response => {
        let firebaseUrl = baseUrl + action + "?key=" + response.data.keys.learnReact        
        axios.post(firebaseUrl, authData)
        .then(response => {
            const experationDateValue = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem(token, response.data.idToken);
            localStorage.setItem(experationDate, experationDateValue);
            localStorage.setItem(localId, response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        })
    })    
}