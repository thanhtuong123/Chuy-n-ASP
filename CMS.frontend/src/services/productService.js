import axiosClient from "../api/axiosClient";

const normalizeList = (data) => {
    if (Array.isArray(data)) return data;
    if (data?.$values) return data.$values;
    return [];
};

const productService = {
    getAll: async (filters = {}) => {
        const res = await axiosClient.get("/api/ProductsApi", {
            params: filters,
        });

        return normalizeList(res.data);
    },

    getAllProducts: async (filters = {}) => {
        const res = await axiosClient.get("/api/ProductsApi", {
            params: filters,
        });

        return normalizeList(res.data);
    },

    getNewest: async () => {
        const res = await axiosClient.get("/api/ProductsApi/newest");
        return normalizeList(res.data);
    },

    getBestSeller: async () => {
        const res = await axiosClient.get("/api/ProductsApi/bestseller");
        return normalizeList(res.data);
    },

    getById: async (id) => {
        const res = await axiosClient.get(`/api/ProductsApi/${id}`);
        return res.data;
    },

    getProductById: async (id) => {
        const res = await axiosClient.get(`/api/ProductsApi/${id}`);
        return res.data;
    },
};

export default productService;