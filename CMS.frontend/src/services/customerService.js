import axiosClient from "../api/axiosClient";

const customerService = {

    login(data) {
        return axiosClient.post("/api/CustomerApi/login", data);
    },

    register(data) {
        return axiosClient.post("/api/CustomerApi/register", data);
    },
changePassword(data) {

    return axiosClient.post(
        "/api/CustomerApi/change-password",
        data
    );

},
    forgotPassword(email) {
        return axiosClient.post("/api/CustomerApi/forgot-password", {
            email
        });
    }

};

export default customerService;