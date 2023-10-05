import { takeLatest } from "redux-saga/effects";
import { handleGetAllPosts } from "./handles";
import { postsRequest } from "./postsSlice";

export default function* postsSagas() {
    yield takeLatest(postsRequest.type, handleGetAllPosts)
}