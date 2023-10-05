import { takeLatest } from "redux-saga/effects";
import { handleGetAllComments } from "./handles";
import { commentsRequest } from "./commentsSlice";

export default function* commetsSagas() {
    yield takeLatest(commentsRequest.type, handleGetAllComments)
}