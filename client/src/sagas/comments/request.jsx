import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'comment'
export function getAllComments(token) {
    return axios.get(`/${COLLECTION_NAME}/get_all_comments`, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
}
// "Content-Type": "multipart/form-data",
