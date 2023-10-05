import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'category'
export function getAllCaterories(token) {
    return axios.get(`/${COLLECTION_NAME}/get_all_categories`, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
}
// "Content-Type": "multipart/form-data",
