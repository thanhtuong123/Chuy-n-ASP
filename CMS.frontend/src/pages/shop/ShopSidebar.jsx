import { useEffect, useState } from "react";
import categoryProductService from "../../services/categoryProductService";

function ShopSidebar({ activeCategory, minPrice, maxPrice, onFilterChange }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryProductService.getAllCategoryProducts();
            setCategories(data);
        } catch (error) {
            console.log("Lỗi tải danh mục sản phẩm:", error);
        }
    };

    return (
        <aside className="shop-sidebar">
            <h3>DANH MỤC</h3>

            <button
                className={activeCategory === "" ? "active" : ""}
                onClick={() => onFilterChange({ categoryProductId: "" })}
            >
                Tất cả sản phẩm
            </button>

            {categories.map((item) => (
                <button
                    key={item.id}
                    className={Number(activeCategory) === item.id ? "active" : ""}
                    onClick={() => onFilterChange({ categoryProductId: item.id })}
                >
                    {item.name}
                </button>
            ))}

            <h3 className="mt-title">KHOẢNG GIÁ</h3>

            <label>Giá từ</label>
            <input
                type="number"
                value={minPrice}
                placeholder="0"
                onChange={(e) => onFilterChange({ minPrice: e.target.value })}
            />

            <label>Giá đến</label>
            <input
                type="number"
                value={maxPrice}
                placeholder="500000"
                onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
            />

            <button
                className="clear-filter"
                onClick={() =>
                    onFilterChange({
                        categoryProductId: "",
                        minPrice: "",
                        maxPrice: "",
                        keyword: "",
                    })
                }
            >
                Xóa bộ lọc
            </button>
        </aside>
    );
}

export default ShopSidebar;