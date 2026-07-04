import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orderService from "../../services/orderService";
import { formatPrice } from "../../utils/format";

function HistoryPage() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const customer = JSON.parse(
            localStorage.getItem("customer_login")
        );

        if (!customer) return;

        loadData(customer.email);

    }, []);

    const loadData = async (email) => {

        try {

            const data = await orderService.getHistory(email);

            setOrders(data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <main className="main-container page-section">

            <h2>LỊCH SỬ ĐƠN HÀNG</h2>

            {
                orders.length === 0 ?

                    <p>Chưa có đơn hàng.</p>

                    :

                    <table className="cart-table">

                        <thead>

                            <tr>

                                <th>Mã đơn</th>

                                <th>Ngày đặt</th>

                                <th>Tổng tiền</th>

                                <th>Trạng thái</th>

                                <th></th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                orders.map(item => (

                                    <tr key={item.id}>

                                        <td>#{item.id}</td>

                                        <td>
                                            {
                                                new Date(item.orderDate)
                                                    .toLocaleDateString("vi-VN")
                                            }
                                        </td>

                                        <td>
                                            {formatPrice(item.total)}
                                        </td>

                                        <td>

                                            {
                                                item.status === 0
                                                    ? "Chờ xác nhận"
                                                    : "Đã xử lý"
                                            }

                                        </td>

                                        <td>

                                            <Link
                                                to={`/orders/${item.id}`}
                                            >
                                                Chi tiết
                                            </Link>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

            }

        </main>

    );

}

export default HistoryPage;