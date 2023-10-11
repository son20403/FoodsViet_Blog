import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import { getAllCustomers, getDetailCustomer } from "./request";
import { customerDetailSuccess, customersSuccess, requestFailure } from "./customersSlice";
import { setErrorGlobal } from "../global/globalSlice";

export function* handleGetDetailCustomer({ payload }) {
    try {
        const response = yield call(getDetailCustomer, payload.token, payload.id);
        if (response) {
            yield put(customerDetailSuccess(response.data))
        }
    } catch (error) {
        yield put(requestFailure(error.response.data.message));
    }
}

export function* handleGetAllCustomers({ payload }) {
    try {
        const response = yield call(getAllCustomers, payload);
        if (response) {
            yield put(customersSuccess(response.data))
        }
    } catch (error) {
        if (error?.code === 'ERR_NETWORK') {
            yield put(requestFailure(error));
            yield put(setErrorGlobal(error?.message));
        } else {
            yield put(requestFailure(error?.response?.data));
            yield put(setErrorGlobal(error?.response?.data?.message));
        }
    }
}
