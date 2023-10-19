import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'customer'
export function getDetailCustomer(token, slug) {
    return axios.get(`/${COLLECTION_NAME}/detail?slug=${slug}`, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
}
export function getAllCustomers(token) {
    return axios.get(`/${COLLECTION_NAME}/getAll`, {
        headers: {
            token: `Bearer ${token}`,
        },
    })
}
export function updateCustomer(token, entity) {
    return axios.put(`/${COLLECTION_NAME}/updateCustomer`, entity, {
        headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${token}`,
        },
    })
}

// headers: {
//     "Content-Type": "multipart/form-data",
//     token: `Bearer ${token}`,
// },