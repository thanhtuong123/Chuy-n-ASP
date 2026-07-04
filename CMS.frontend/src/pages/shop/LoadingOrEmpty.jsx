function LoadingOrEmpty({ isLoading, totalItems, children }) {
    if (isLoading) {
        return (
            <div className="empty-box">
                <h3>Đang tải dữ liệu...</h3>
            </div>
        );
    }

    if (totalItems === 0) {
        return (
            <div className="empty-box">
                <img
                    src="/img/not-found.png"
                    alt="Không tìm thấy"
                    style={{
                        width: "220px",
                        marginBottom: "20px"
                    }}
                />

                <h3>Không tìm thấy sản phẩm nào</h3>

                <p>
                    Không tìm thấy sản phẩm nào phù hợp với tiêu chí của bạn.
                </p>
            </div>
        );
    }

    return children;
}

export default LoadingOrEmpty;