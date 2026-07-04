import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./auth.css";
import customerService from "../../services/customerService";

function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
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

    if (!form.fullName || !form.email || !form.password) {

        alert("Vui lòng nhập đầy đủ thông tin!");

        return;

    }

    try{

        const res = await customerService.register(form);

        alert(res.data.message);

        navigate("/login");

    }
    catch (error) {

    console.log(error);

    console.log(error.response);

    alert(
        error.response?.data?.message ??
        "Đăng ký thất bại."
    );

}

};

    return (
        <main className="auth-page">
            <div className="auth-box">
                <h2>ĐĂNG KÝ TÀI KHOẢN</h2>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Họ và tên</label>
                        <input
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Nhập họ tên"
                        />
                    </div>

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
                        <label>Số điện thoại</label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
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
                        Đăng ký
                    </button>
                </form>

                <p className="auth-link">
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </div>
        </main>
    );
}

export default RegisterPage;