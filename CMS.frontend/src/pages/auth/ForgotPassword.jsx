import { useState } from "react";
import customerService from "../../services/customerService";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await customerService.forgotPassword(email);

            alert(res.data.message);

        }
        catch {

            alert("Email không tồn tại.");

        }

    };

    return (

        <main className="main-container page-section">

            <div className="auth-box">

                <h2>Quên mật khẩu</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Nhập Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button>

                        Kiểm tra Email

                    </button>

                </form>

            </div>

        </main>

    );

}

export default ForgotPassword;  