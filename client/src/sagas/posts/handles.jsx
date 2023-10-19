import { call, put } from "redux-saga/effects";
import { getAllPost, getDetailPost, getSearchPost, likePost, uploadImage } from "./request";
import { getDetailPostSuccess, getPostsSuccess, getSearchPostsSuccess, likePostSuccess, postDetailRequest, postsRequest, requestFailure, setLoadingPost } from "./postsSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";

export function* handleGetAllPosts({ payload }) {
    try {
        const response = yield call(getAllPost, payload);
        if (response?.data) {
            yield put(getPostsSuccess(response.data?.reverse()))
        } else {
            yield put(getPostsSuccess([]))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleGetDetailPosts({ payload }) {
    try {
        const response = yield call(getDetailPost, payload?.token, payload?.slug);
        if (response?.data) {
            yield put(getDetailPostSuccess(response.data))
        } else {
            yield put(getDetailPostSuccess({}))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleGetSearchPosts({ payload }) {
    yield put(setLoadingPost(true))
    try {
        const response = yield call(getSearchPost, payload?.token, payload?.query);
        if (response?.data) {
            yield put(getSearchPostsSuccess(response.data))
        } else {
            yield put(getDetailPostSuccess({}))
        }
        yield put(setLoadingPost(false))
    } catch (error) {
        yield handleCommonError(error)
        yield put(setLoadingPost(false))
    }
}
export function* handleLikePost({ payload }) {
    try {
        const response = yield call(likePost, payload?.token, payload?.id);
        if (response?.data) {
            yield put(likePostSuccess())
            yield put(setNotifyGlobal(response.data?.message));
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUploadImage({ payload }) {
    console.log("🚀 ~ file: handles.jsx:57 ~ function*handleUploadImage ~ payload:", payload)
    try {
        const response = yield call(uploadImage, payload?.token, payload?.image);
        if (response?.data) {
            console.log("🚀 ~ file: handles.jsx:61 ~ function*handleUploadImage ~ response:", response)
            yield put(setNotifyGlobal(response.data?.message));
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