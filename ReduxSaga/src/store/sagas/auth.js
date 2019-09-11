import { put, delay } from 'redux-saga/effects'
import * as actions from '../actions/index';
import axios from 'axios';

const token = 'token';
const experationDate = 'experationDate';
const localId = 'localId'
const baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'

export function* logoutSaga(action) {
    yield localStorage.removeItem(token);
    yield localStorage.removeItem(experationDate);
    yield localStorage.removeItem(localId);
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
        yield delay(action.experationTime * 1000);
        yield put(actions.logout());
}

export function* authSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let event = "verifyPassword";

    if(action.isSignup){
        event = "signupNewUser";            
    }
    const keyStore =  yield getKey();
    const firebaseUrl = baseUrl + event + "?key=" + keyStore.data.keys.learnReact        
    try {
        const resp = yield axios.post(firebaseUrl, authData);    
        const experationDateValue = new Date(new Date().getTime() + resp.data.expiresIn * 1000);
        localStorage.setItem(token, resp.data.idToken);
        localStorage.setItem(experationDate, experationDateValue);
        localStorage.setItem(localId, resp.data.localId);
        yield put (actions.authSuccess(resp.data.idToken, resp.data.localId));
        yield put (actions.checkAuthTimeout(resp.data.expiresIn));
            
    } catch(error){
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const tokenValue = localStorage.getItem(token);
    if(!tokenValue) {
        yield put(actions.logout());
    } else
    {
        const experationDateValue = yield new Date(localStorage.getItem(experationDate));
        if(experationDateValue > new Date()) {
            const localIdValue = yield localStorage.getItem(localId);
            yield put(actions.authSuccess(tokenValue, localIdValue));
            const experationTime = yield (experationDateValue - new Date()) / 1000;
            yield put(actions.checkAuthTimeout(experationTime));
        } else {
           yield put(actions.logout())
        }
    }
}

const getKey = () => {
    return axios.get("https://localhost:5001/api/values", {headers: {
        'Content-Type': 'application/json'}});
}