import axios from "../../axios-interceptor/api";
const COLLECTION_NAME = 'customer'
export function getDetailCustomer(token, id) {
    return axios.get(`/${COLLECTION_NAME}/detail?id=${id}`, {
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
// headers: {
//     "Content-Type": "multipart/form-data",
//     token: `Bearer ${token}`,
// },