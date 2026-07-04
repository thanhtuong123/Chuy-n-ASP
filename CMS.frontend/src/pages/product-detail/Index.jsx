import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../../services/productService";
import cartService from "../../services/cartService";
import { formatPrice, getImageUrl } from "../../utils/format";

function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) {
                setLoading(false);
                setProduct(null);
                return;
            }

            try {
                setLoading(true);
                const data = await productService.getById(id);
                setProduct(data);
            } catch (error) {
                console.log("Lỗi lấy chi tiết sản phẩm:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        void loadProduct();
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);

        if (!Number.isFinite(value) || value < 1) {
            setQuantity(1);
            return;
        }

        setQuantity(value);
    };

    const handleAddToCart = () => {
        if (!product) return;

        if (quantity > product.stockQuantity) {
            alert(
                `Số lượng mua (${quantity}) vượt quá tồn kho hiện có (${product.stockQuantity}).`
            );
            return;
        }

        cartService.addToCart(product, quantity);
        alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`);
    };

    if (loading) {
        return (
            <main className="main-container page-section">
                <div className="empty-box">Đang tải chi tiết sản phẩm...</div>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="main-container page-section">
                <div className="empty-box">
                    Không tìm thấy sản phẩm.
                    <br />
                    <Link to="/shop" className="detail-back-link">
                        Quay lại cửa hàng
                    </Link>
                </div>
            </main>
        );
    }

    const isOutOfStock = product.stockQuantity <= 0;

    return (
        <main className="main-container page-section">
            <div className="product-detail-wrapper">
                <div className="product-detail-left">
                    {product.imageUrl ? (
                        <img src={getImageUrl(product.imageUrl)} alt={product.name} />
                    ) : (
                        <div className="no-image">Chưa có ảnh</div>
                    )}
                </div>

                <div className="product-detail-right">
                    <h1>{product.name}</h1>

                    <div className="detail-price">
                        {formatPrice(product.price)}
                    </div>

                    <div className={isOutOfStock ? "stock-badge out" : "stock-badge"}>
                        {isOutOfStock
                            ? "Hết hàng"
                            : `Còn ${product.stockQuantity} sản phẩm trong kho`}
                    </div>

                    <p className="detail-description">
                        {product.description ||
                            "Thông tin mô tả sản phẩm đang được cập nhật."}
                    </p>

                    <div className="detail-meta">
                        <p>
                            <strong>Danh mục:</strong>{" "}
                            {product.categoryProduct?.name || "Chưa có danh mục"}
                        </p>
                    </div>

                    <div className="detail-action-row">
                        <div className="quantity-field">
                            <label>SỐ LƯỢNG MUA:</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                disabled={isOutOfStock}
                                onChange={handleQuantityChange}
                            />
                        </div>

                        <button
                            type="button"
                            className="add-cart-button"
                            disabled={isOutOfStock}
                            onClick={handleAddToCart}
                        >
                            🛒 THÊM VÀO GIỎ HÀNG
                        </button>
                    </div>

                    <Link to="/shop" className="detail-back-link">
                        ← Quay lại cửa hàng
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default ProductDetailPage;
