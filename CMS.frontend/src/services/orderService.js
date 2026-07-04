import axiosClient from "../api/axiosClient";

const orderService = {

    createOrder(data) {
        return axiosClient.post("/api/OrdersApi", data)
            .then(res => res.data);
    },

    getHistory(email) {
        return axiosClient
            .get(`/api/OrdersApi/history/${email}`)
            .then(res => res.data);
    },

    getDetail(id) {
        return axiosClient
            .get(`/api/OrdersApi/${id}`)
            .then(res => res.data);
    }

};

export default orderService;