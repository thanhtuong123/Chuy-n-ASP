import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderService from "../../services/orderService";
import { formatPrice } from "../../utils/format";

function DetailPage() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await orderService.getDetail(id);
            setOrder(data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!order) {
        return (
            <main className="main-container page-section">
                <h3>Đang tải...</h3>
            </main>
        );
    }

    return (
        <main className="main-container page-section">

            <h2>CHI TIẾT ĐƠN HÀNG #{order.id}</h2>

            <div className="checkout-box">

                <div className="checkout-form">

                    <h3>Thông tin khách hàng</h3>

                    <p>
                        <b>Họ tên:</b> {order.customer.fullName}
                    </p>

                    <p>
                        <b>Email:</b> {order.customer.email}
                    </p>

                    <p>
                        <b>Số điện thoại:</b> {order.customer.phone}
                    </p>

                    <p>
                        <b>Địa chỉ:</b> {order.customer.address || "Chưa cập nhật"}
                    </p>

                    <p>
                        <b>Ngày đặt:</b>{" "}
                        {new Date(order.orderDate).toLocaleString("vi-VN")}
                    </p>

                    <p>
                        <b>Trạng thái:</b>{" "}
                        {order.status === 0 ? "Chờ xác nhận" : "Đã xử lý"}
                    </p>

                    <p>
                        <b>Ghi chú:</b>{" "}
                        {order.notes || "Không có"}
                    </p>

                </div>

                <div className="order-summary">

                    <h3>Sản phẩm</h3>

                    {order.items.map(item => (

                        <div
                            key={item.productId}
                            className="summary-row"
                        >

                            <span>
                                {item.productName}
                                <br />
                                x {item.quantity}
                            </span>

                            <b>
                                {formatPrice(item.total)}
                            </b>

                        </div>

                    ))}

                    <hr />

                    <h3>
                        Tổng tiền: {formatPrice(order.total)}
                    </h3>

                </div>

            </div>

        </main>
    );
}

export default DetailPage;