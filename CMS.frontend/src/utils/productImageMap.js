import productImage1 from "../assets/img/OIP.jpg";
import productImage2 from "../assets/img/OIP (1).jpg";
import productImage3 from "../assets/img/OIP (2).jpg";
import heroImage from "../assets/hero.png";

const productImageMap = {
    1: productImage1,
    2: productImage2,
    3: productImage3,
};

export const getProductImage = (product) => {
    if (!product) {
        return heroImage;
    }

    return productImageMap[product.id] || heroImage;
};

export default productImageMap;
