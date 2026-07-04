export const formatPrice = (price) => {
    if (!price) return "0 đ";
    return Number(price).toLocaleString("vi-VN") + " đ";
};

export const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return import.meta.env.VITE_API_URL + url;
};