import axiosClient from "../api/axiosClient";

const normalizeList = (data) => {
    if (Array.isArray(data)) return data;
    if (data?.$values) return data.$values;
    return [];
};

const categoryService = {
    getAll: async () => {
        const res = await axiosClient.get("/api/CategoryProductsApi");
        return normalizeList(res.data);
    },
};

export default categoryService;