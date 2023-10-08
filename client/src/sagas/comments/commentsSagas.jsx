import { takeLatest } from "redux-saga/effects";
import { handleGetAllComments, handlePostComments } from "./handles";
import { commentsRequest, postCommentsRequest } from "./commentsSlice";

export default function* commetsSagas() {
    yield takeLatest(commentsRequest.type, handleGetAllComments)
    yield takeLatest(postCommentsRequest.type, handlePostComments)
}