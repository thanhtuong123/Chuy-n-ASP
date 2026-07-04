function ShopHeader({ total, keyword, onSearchChange }) {
    return (
        <div className="shop-header">
            <div>
                Tìm thấy <strong>{total}</strong> sản phẩm
            </div>

            <input
                type="text"
                placeholder="Tìm mẫu áo, quần, giày..."
                value={keyword}
                onChange={(e) => onSearchChange({ keyword: e.target.value })}
            />
        </div>
    );
}

export default ShopHeader;