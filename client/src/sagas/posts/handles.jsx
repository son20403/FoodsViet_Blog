import { call, put } from "redux-saga/effects";
import { getAllPost } from "./request";
import { getPostsSuccess, requestFailure } from "./postsSlice";

export function* handleGetAllPosts({ payload }) {
    try {
        const response = yield call(getAllPost, payload);
        if (response?.data) {
            yield put(getPostsSuccess(response.data?.reverse()))
        } else {
            yield put(getPostsSuccess([]))
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