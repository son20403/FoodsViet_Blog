import { takeLatest } from "redux-saga/effects";
import { handleGetAllCustomers, handleGetDetailCustomer } from "./handles";
import { customerDetailRequest, customersRequest } from "./customersSlice";

export default function* customersSagas() {
    yield takeLatest(customerDetailRequest.type, handleGetDetailCustomer)
    yield takeLatest(customersRequest.type, handleGetAllCustomers)
}