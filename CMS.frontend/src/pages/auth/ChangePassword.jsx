import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customerService from "../../services/customerService";
import "./auth.css";

function ChangePasswordPage() {
    const navigate = useNavigate();

    const customer = JSON.parse(
        localStorage.getItem("customer_login")
    );

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.oldPassword ||
            !form.newPassword ||
            !form.confirmPassword
        ) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            alert("Xác nhận mật khẩu không khớp.");
            return;
        }

        try {
            const res = await customerService.changePassword({
                email: customer.email,
                oldPassword: form.oldPassword,
                newPassword: form.newPassword
            });

            alert(res.data.message);

            localStorage.removeItem("customer_login");

            window.dispatchEvent(
                new Event("customerLoginChanged")
            );

            navigate("/login");
        }
        catch (error) {
            alert(
                error.response?.data?.message ??
                "Đổi mật khẩu thất bại."
            );
        }
    };

    return (
        <main className="auth-page">

            <div className="auth-box">

                <h2>ĐỔI MẬT KHẨU</h2>

                <form
                    onSubmit={handleSubmit}
                    className="auth-form"
                >

                    <div className="form-group">

                        <label>Mật khẩu cũ</label>

                        <input
                            type="password"
                            name="oldPassword"
                            value={form.oldPassword}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu cũ"
                        />

                    </div>

                    <div className="form-group">

                        <label>Mật khẩu mới</label>

                        <input
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu mới"
                        />

                    </div>

                    <div className="form-group">

                        <label>Xác nhận mật khẩu</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Nhập lại mật khẩu mới"
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn-auth"
                    >
                        Đổi mật khẩu
                    </button>

                </form>

            </div>

        </main>
    );
}

export default ChangePasswordPage;