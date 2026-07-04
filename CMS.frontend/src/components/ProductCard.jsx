import { Link } from "react-router-dom";
import { formatPrice, getImageUrl } from "../utils/format";
import cartService from "../services/cartService";

function ProductCard({
    product,
    isBestSeller = false
}) {
    const handleAddCart = () => {
        cartService.addToCart(product, 1);
        alert("Đã thêm sản phẩm vào giỏ hàng!");
    };

    return (
        <div className="product-card">
            <div className="product-image">
               {
    isBestSeller &&
    <span className="sale-badge">
        🔥 Bán chạy
    </span>
}
                {product.imageUrl ? (
                    <img src={getImageUrl(product.imageUrl)} alt={product.name} />
                ) : (
                    <div className="no-image">Ảnh sản phẩm</div>
                )}
            </div>

            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">{formatPrice(product.price)}</p>

                <div className="product-actions">
                    <Link to={`/product/${product.id}`} className="btn-detail">
                        👁 Chi tiết
                    </Link>

                    <button className="btn-buy" onClick={handleAddCart}>
                        🛒 Mua ngay
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;