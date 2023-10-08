import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'comment'
export function getAllComments(token) {
    return axios.get(`/${COLLECTION_NAME}/get_all_comments`, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
}
export function postComments(token, entity) {
    console.log("🚀 ~ file: request.jsx:11 ~ postComments ~ entity:", entity)
    return axios.post(`/${COLLECTION_NAME}/create`, entity, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
}
// "Content-Type": "multipart/form-data",
