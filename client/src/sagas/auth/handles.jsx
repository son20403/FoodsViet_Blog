import { call, put } from "redux-saga/effects";
import { loginAuth, logoutAuth, registerAuth } from "./request";
import { requestFailure, loginSuccess, registerSuccess, logout } from "./authSlice";
import { toast } from "react-toastify";

export function* authenticateCustomer({ payload }) {
    try {
        const response = yield call(loginAuth, payload);
        if (response) {
            yield put(loginSuccess(response.data?.accessToken))
        }
    } catch (error) {
        if (error?.code === 'ERR_NETWORK') {
            yield put(requestFailure(error));
        } else {
            yield put(requestFailure(error?.response?.data));
        }
    }
}

export function* registerCustomer({ payload }) {
    try {
        const response = yield call(registerAuth, payload);
        if (response) {
            yield put(registerSuccess())
            toast.success(response.data?.message)
        }

    } catch (error) {
        if (error?.code === 'ERR_NETWORK') {
            yield put(requestFailure(error));
        } else {
            yield put(requestFailure(error?.response?.data));
        }
    }
}
export function* logoutCustomer({ payload }) {
    try {
        const response = yield call(logoutAuth, payload);
        if (response) {
            toast.success('Đăng xuất thành công')
        }

    } catch (error) {
        if (error?.code === 'ERR_NETWORK') {
            yield put(requestFailure(error));
        } else {
            yield put(requestFailure(error?.response?.data));
        }
    }
}