import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'post'
export function getAllPost(token) {
    return axios.get(`/${COLLECTION_NAME}/getAll`, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
}
// "Content-Type": "multipart/form-data",
