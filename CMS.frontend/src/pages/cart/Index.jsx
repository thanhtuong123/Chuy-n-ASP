import { useState } from "react";
import { Link } from "react-router-dom";
import cartService from "../../services/cartService";
import { formatPrice, getImageUrl } from "../../utils/format";

function CartPage() {
    const [cart, setCart] = useState(() => cartService.getCart());

    const changeQuantity = (id, quantity) => {
        cartService.updateQuantity(id, quantity);
        setCart(cartService.getCart());
    };

    const removeItem = (id) => {
        cartService.removeItem(id);
        setCart(cartService.getCart());
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <main className="main-container page-section">
            <div className="section-heading">
    <h2>GIỎ HÀNG</h2>
</div>

            {cart.length === 0 ? (
                <div className="empty-box">Giỏ hàng đang trống.</div>
            ) : (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Ảnh</th>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        {item.imageUrl ? (
                                            <img src={getImageUrl(item.imageUrl)} alt={item.name} />
                                        ) : (
                                            "Không ảnh"
                                        )}
                                    </td>

                                    <td>{item.name}</td>
                                    <td>{formatPrice(item.price)}</td>

                                    <td>
                                        <button onClick={() => changeQuantity(item.id, item.quantity - 1)}>
                                            -
                                        </button>

                                        <span className="qty">{item.quantity}</span>

                                        <button onClick={() => changeQuantity(item.id, item.quantity + 1)}>
                                            +
                                        </button>
                                    </td>

                                    <td>{formatPrice(item.price * item.quantity)}</td>

                                    <td>
                                        <button className="btn-remove" onClick={() => removeItem(item.id)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

<div className="cart-footer">

    <div className="cart-action">

        <Link
            to="/shop"
            className="btn-shopping"
        >
            Tiếp tục mua
        </Link>

        <Link
            to="/checkout"
            className="btn-checkout"
        >
            Thanh toán
        </Link>

    </div>

    <div className="cart-total">

        <span>Tổng tiền:</span>

        <h2>{formatPrice(total)}</h2>

    </div>

</div>
                </>
            )}
        </main>
    );
}

export default CartPage;