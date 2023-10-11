import { call, put } from "redux-saga/effects";
import { loginAuth, logoutAuth, registerAuth } from "./request";
import { requestFailure, loginSuccess, registerSuccess } from "./authSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";

export function* authenticateCustomer({ payload }) {
    try {
        yield put(setErrorGlobal(''));
        const response = yield call(loginAuth, payload);
        if (response) {
            yield put(setNotifyGlobal(response.data?.message))
            yield put(loginSuccess(response.data?.accessToken))
        }
    } catch (error) {
        if (error?.code === 'ERR_NETWORK') {
            yield put(requestFailure(error));
            yield put(setErrorGlobal(error?.message));
        } else {
            yield put(setNotifyGlobal(''))
            yield put(requestFailure(error?.response?.data));
            yield put(setErrorGlobal(error?.response?.data?.message));
        }
    }
}

export function* registerCustomer({ payload }) {
    try {
        yield put(setErrorGlobal(''));
        const response = yield call(registerAuth, payload);
        if (response) {
            yield put(registerSuccess())
            yield put(setNotifyGlobal(response.data?.message))
        }

    } catch (error) {
        if (error?.code === 'ERR_NETWORK') {
            yield put(requestFailure(error));
            yield put(setErrorGlobal(error?.message));
        } else {
            yield put(setNotifyGlobal(''))
            yield put(requestFailure(error?.response?.data));
            yield put(setErrorGlobal(error?.response?.data?.message));
        }
    }
}
export function* logoutCustomer({ payload }) {
    try {
        const response = yield call(logoutAuth, payload);
        if (response) {
            yield put(setErrorGlobal(''));
            yield put(setNotifyGlobal(response.data?.message))
        }

    } catch (error) {
        if (error?.code === 'ERR_NETWORK') {
            yield put(requestFailure(error));
            yield put(setErrorGlobal(error?.message));
        } else {
            yield put(setNotifyGlobal(''))
            yield put(requestFailure(error?.response?.data));
            yield put(setErrorGlobal(error?.response?.data?.message));
        }
    }
}