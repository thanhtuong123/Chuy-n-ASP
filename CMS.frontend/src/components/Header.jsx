import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(() => {
        const data = localStorage.getItem("customer_login");
        return data ? JSON.parse(data) : null;
    });

    const [cartCount, setCartCount] = useState(0);

    const [keyword, setKeyword] = useState("");

    const loadCustomer = () => {
        const data = localStorage.getItem("customer_login");
        setCustomer(data ? JSON.parse(data) : null);
    };

    const loadCartCount = () => {
        const data = localStorage.getItem("cart_items");

        if (!data) {
            setCartCount(0);
            return;
        }

        const cart = JSON.parse(data);

        setCartCount(
            cart.reduce((sum, item) => sum + item.quantity, 0)
        );
    };

    useEffect(() => {
        loadCustomer();
        loadCartCount();

        window.addEventListener("customerLoginChanged", loadCustomer);
        window.addEventListener("cartChanged", loadCartCount);
        window.addEventListener("storage", loadCartCount);

        return () => {
            window.removeEventListener("customerLoginChanged", loadCustomer);
            window.removeEventListener("cartChanged", loadCartCount);
            window.removeEventListener("storage", loadCartCount);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("customer_login");

        setCustomer(null);

        window.dispatchEvent(
            new Event("customerLoginChanged")
        );

        alert("Đã đăng xuất!");

        navigate("/");
    };

    const handleSearch = () => {
        if (!keyword.trim()) return;

        navigate(
            `/shop?keyword=${encodeURIComponent(keyword)}`
        );
    };

    return (
        <>
            <div className="top-bar">

                <div>
                    Hotline: 0900.456.567
                </div>

                <div>
                    Email: thanhtuong@gmail.com
                </div>

                <div>

                    {customer ? (

                        <>

                            <span>
                                Xin chào, <strong>{customer.fullName}</strong>
                            </span>

                            <span> | </span>

                            <Link to="/orders">
                                Đơn hàng
                            </Link>

                            <span> | </span>

                            <Link to="/change-password">
                                Đổi mật khẩu
                            </Link>

                            <span> | </span>

                            <button
                                onClick={handleLogout}
                                className="logout-link"
                            >
                                Đăng xuất
                            </button>

                        </>

                    ) : (

                        <>

                            <Link to="/login">
                                Đăng nhập
                            </Link>

                            <span> | </span>

                            <Link to="/register">
                                Đăng ký
                            </Link>

                        </>

                    )}

                </div>

            </div>

            <header className="header">

                <Link to="/" className="logo">
                    TuongCMS<span>.Fashion</span>
                </Link>

                <div className="search-box">

                    <input
                        placeholder="Tìm kiếm sản phẩm..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />

                    <button onClick={handleSearch}>
                        Search
                    </button>

                </div>

                <Link to="/cart" className="cart-icon">

                    <i className="bi bi-cart3"></i>

                    {cartCount > 0 && (

                        <span className="cart-badge">
                            {cartCount}
                        </span>

                    )}

                </Link>

            </header>

            <nav className="menu">

                <Link to="/">
                    Trang chủ
                </Link>

                <Link to="/shop">
                    Cửa hàng
                </Link>

                <Link to="/blog">
                    Tin tức / Blog
                </Link>

                <Link to="/about">
                    Về chúng tôi
                </Link>

            </nav>
        </>
    );
}

export default Header;