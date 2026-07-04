import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/auth/ForgotPassword";
import HomePage from "./pages/home/Index";
import ShopPage from "./pages/shop/Index";
import ProductDetailPage from "./pages/product-detail/Index";
import CartPage from "./pages/cart/Index";
import CheckoutPage from "./pages/checkout/Index";
import BlogPage from "./pages/blog/Index";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import BlogDetailPage from "./pages/blog/BlogDetail";
import OrderHistoryPage from "./pages/orders/History";
import OrderDetailPage from "./pages/orders/Detail";
import ChangePassword from "./pages/auth/ChangePassword";
function AboutPage() {
  return (
    <main className="main-container page-section">
      <h2>VỀ CHÚNG TÔI</h2>
      <p>
        TuongCMS Fashion là website bán hàng thời trang sử dụng ReactJS
        và ASP.NET Core Web API.
      </p>
    </main>
  );
}



function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/orders"element={<OrderHistoryPage />}/>
        <Route
    path="/change-password"
    element={<ChangePassword />}
/>
        <Route
    path="/orders/:id"
    element={<OrderDetailPage />}
/>
        <Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App; 