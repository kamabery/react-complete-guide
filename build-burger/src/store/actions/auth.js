import * as actionTypes from './actionTypes';
import axios from 'axios';
const apiKey = 'AIzaSyCsJKeHeE8375af3M0iKeNEOvyAeVQnHXs'
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
        let url = getUrl("verifyPassword");
        if(isSignup){
            url = getUrl("signupNewUser");
        }

        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err => {
            console.log(err)
            dispatch(authFail(err.response.data.error));
        })
    }
}

const getUrl = (action) => {
    return baseUrl + action + "?key=" + apiKey;
}