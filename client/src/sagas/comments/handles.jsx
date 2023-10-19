import { call, put } from "redux-saga/effects";
import { getAllComments, postComments } from "./request";
import { commentsRequest, getCommentsSuccess, postCommentsSuccess, requestFailure } from "./commentsSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";

export function* handleGetAllComments({ payload }) {
    try {
        const response = yield call(getAllComments, payload);
        if (response) {
            yield put(getCommentsSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handlePostComments({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        const response = yield call(postComments, payload?.token, payload.comment);
        if (response) {
            yield put(postCommentsSuccess(response.data.message))
            yield put(commentsRequest(payload?.token))
            yield put(setNotifyGlobal(response.data?.message))

        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

function* handleCommonError(error) {
    console.log("error:", error)
    if (error?.code === 'ERR_NETWORK') {
        yield put(requestFailure(error));
        yield put(setErrorGlobal(error?.message));
    } else {
        yield put(setNotifyGlobal(''))
        yield put(requestFailure(error?.response?.data));
        yield put(setErrorGlobal(error?.response?.data?.message));
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