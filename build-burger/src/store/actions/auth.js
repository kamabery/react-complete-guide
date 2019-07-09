import * as actionTypes from './actionTypes';
import axios from 'axios';

const baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'

export const checkAuthTimeout = (experationTime)  => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, experationTime * 1000)
    }
}

export const logout = () => {
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


const authenticate = (action, authData, dispatch) => {
    axios.get("https://localhost:5001/api/values", {headers: {
        'Content-Type': 'application/json'}}).then(response => {
        let firebaseUrl = baseUrl + action + "?key=" + response.data.keys.learnReact

        axios.post(firebaseUrl, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err => {
            console.log(err)
            dispatch(authFail(err.response.data.error));
        })
    })    
}