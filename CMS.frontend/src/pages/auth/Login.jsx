import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./auth.css";
import customerService from "../../services/customerService";

function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

   const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const res = await customerService.login(form);

        localStorage.setItem(
            "customer_login",
            JSON.stringify(res.data)
        );

        window.dispatchEvent(
            new Event("customerLoginChanged")
        );

        alert("Đăng nhập thành công!");

        navigate("/");

    }
    catch {

        alert("Email hoặc mật khẩu không đúng!");

    }

};

    return (
        <main className="auth-page">
            <div className="auth-box">
                <h2>ĐĂNG NHẬP</h2>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Nhập email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    <button type="submit" className="btn-auth">
                        Đăng nhập
                    </button>
                </form>

               <div className="login-links">

    <p>
        Chưa có tài khoản?
        <Link to="/register"> Đăng ký</Link>
    </p>

    <Link
        to="/forgot-password"
        className="forgot-link"
    >
        Quên mật khẩu?
    </Link>

</div>
            </div>
        </main>
    );
}

export default LoginPage;