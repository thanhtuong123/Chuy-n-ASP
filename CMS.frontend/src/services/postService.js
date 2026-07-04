import axiosClient from "../api/axiosClient";

const normalizeList = (data) => {
    if (Array.isArray(data)) return data;
    if (data?.$values) return data.$values;
    return [];
};

const postService = {
    getAllPosts: async (filters = {}) => {
        const res = await axiosClient.get("/api/PostsApi", {
            params: filters,
        });

        return normalizeList(res.data);
    },

    getPostById: async (id) => {
        const res = await axiosClient.get(`/api/PostsApi/${id}`);
        return res.data;
    },

    getAllCategories: async () => {
        const res = await axiosClient.get("/api/CategoryPosts");
        return normalizeList(res.data);
    },
};

export default postService;