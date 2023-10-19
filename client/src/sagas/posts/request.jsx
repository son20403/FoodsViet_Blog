import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'post'
export function getAllPost(token) {
    return axios.get(`/${COLLECTION_NAME}/getAll`, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
}
export function getDetailPost(token, slug) {
    return axios.get(`/${COLLECTION_NAME}/detail?slug=${slug}`, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
}
export function getSearchPost(token, query) {
    return axios.get(`/${COLLECTION_NAME}/search?key=${query}`, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
}
export function likePost(token, id) {
    return axios.put(`/${COLLECTION_NAME}/like?id=${id}`, {}, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
}
export function uploadImage(token, entity, config) {
    console.log("🚀 ~ file: request.jsx:32 ~ uploadImage ~ entity:", entity)
    return axios.post(`/${COLLECTION_NAME}/uploadImage`, entity, {
        ...config,
        headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${token}`,
        },
    })
}
// "Content-Type": "multipart/form-data",
