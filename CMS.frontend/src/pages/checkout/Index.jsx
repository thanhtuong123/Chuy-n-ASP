import { useMemo, useState } from "react";
import cartService from "../../services/cartService";
import orderService from "../../services/orderService";
import { formatPrice } from "../../utils/format";

function CheckoutPage() {
    const [cart] = useState(() => cartService.getCart());
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        email: "",
        note: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const total = useMemo(
        () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cart]
    );

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!form.fullName.trim()) nextErrors.fullName = "Vui long nhap ho ten.";
        if (!form.phone.trim()) nextErrors.phone = "Vui long nhap so dien thoai.";
        if (!form.address.trim()) nextErrors.address = "Vui long nhap dia chi.";

        return nextErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Gio hang dang trong!");
            return;
        }

        const nextErrors = validateForm();
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        try {
            setIsSubmitting(true);

          const result = await orderService.createOrder({
    customer: {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
    },

    notes: form.note.trim(),

    items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
    }))
});

            alert(`Dat hang thanh cong. Ma don hang: ${result.orderId}`);
            cartService.clearCart();
            window.location.href = "/";
        } catch (error) {

    console.log(error.response?.data);

    alert(
        JSON.stringify(error.response?.data, null, 2)
    );  }
     finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="main-container page-section">
            <div className="section-heading">
                <h2>THANH TOAN</h2>
                <span>Tong tien: {formatPrice(total)}</span>
            </div>

            <div className="checkout-box">
                <form onSubmit={handleSubmit} className="checkout-form">
                    <label>Ho va ten</label>
                    <input name="fullName" value={form.fullName} onChange={handleChange} />
                    {errors.fullName ? <small className="text-danger">{errors.fullName}</small> : null}

                    <label>So dien thoai</label>
                    <input name="phone" value={form.phone} onChange={handleChange} />
                    {errors.phone ? <small className="text-danger">{errors.phone}</small> : null}

                    <label>Dia chi</label>
                    <input name="address" value={form.address} onChange={handleChange} />
                    {errors.address ? <small className="text-danger">{errors.address}</small> : null}

                    <label>Email</label>
                    <input name="email" value={form.email} onChange={handleChange} />

                    <label>Ghi chu</label>
                    <textarea name="note" value={form.note} onChange={handleChange}></textarea>

                    <button type="submit" className="btn-buy-main" disabled={isSubmitting}>
                        {isSubmitting ? "Dang gui don hang..." : "Xac nhan dat hang"}
                    </button>
                </form>

                <div className="order-summary">
                    <h3>Don hang</h3>

                    {cart.map((item) => (
                        <div key={item.id} className="summary-row">
                            <span>
                                {item.name} x {item.quantity}
                            </span>
                            <b>{formatPrice(item.price * item.quantity)}</b>
                        </div>
                    ))}

                    <hr />
                    <h3>Tong: {formatPrice(total)}</h3>
                </div>
            </div>
        </main>
    );
}

export default CheckoutPage;
