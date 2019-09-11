import * as actionTypes from './actionTypes';

const token = 'token';
const experationDate = 'experationDate';
const localId = 'localId'

export const checkAuthTimeout = (experationTime)  => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        experationTime: experationTime
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
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
    return {
        type: actionTypes.AUTH,
        email: email,
        password: password,
        isSignup: isSignup
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}