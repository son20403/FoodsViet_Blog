import { call, put } from "redux-saga/effects";
import { getAllComments, postComments } from "./request";
import { getCommentsSuccess, postCommentsSuccess, requestFailure } from "./commentsSlice";
import { setNotifyGlobal } from "../global/globalSlice";

export function* handleGetAllComments({ payload }) {
    try {
        const response = yield call(getAllComments, payload);
        if (response) {
            yield put(getCommentsSuccess(response.data))
        }
    } catch (error) {
        if (error?.code === 'ERR_NETWORK') {
            yield put(requestFailure(error));
        } else {
            yield put(requestFailure(error?.response?.data));
        }
    }
}
export function* handlePostComments({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        const response = yield call(postComments, payload?.token, payload.comment);
        if (response) {
            yield put(postCommentsSuccess(response.data.message))
            yield put(setNotifyGlobal(response.data?.message))

        }
    } catch (error) {
        if (error?.code === 'ERR_NETWORK') {
            yield put(requestFailure(error));
        } else {
            yield put(requestFailure(error?.response?.data));
            yield put(setNotifyGlobal(''))

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