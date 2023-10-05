import { call, put } from "redux-saga/effects";
import { getAllCaterories } from "./request";
import { getCategoriesSuccess, requestFailure } from "./categoriesSlice";

export function* handleGetAllCategories({ payload }) {
    try {
        const response = yield call(getAllCaterories, payload);
        if (response) {
            yield put(getCategoriesSuccess(response.data))
        }
    } catch (error) {
        if (error?.code === 'ERR_NETWORK') {
            yield put(requestFailure(error));
        } else {
            yield put(requestFailure(error?.response?.data));
        }
    }
}

// export function* registerCustomer({ payload }) {
//     try {
//         const response = yield call(registerAuth, payload);
//         if (response) {
//             yield put(registerSuccess())
//             toast.success(response.data?.message)
//         }

//     } catch (error) {
//         yield put(requestFailure(error.response.data.message));
//     }
// }