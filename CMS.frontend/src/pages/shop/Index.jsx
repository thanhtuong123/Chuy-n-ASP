import { useEffect, useState } from "react"
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import ProductList from "./ProductList";
import { useSearchParams } from "react-router-dom";
function ShopPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   const [searchParams] = useSearchParams();
   const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    categoryProductId: "",
    minPrice: "",
    maxPrice: "",
});
useEffect(() => {
    setFilters((prev) => ({
        ...prev,
        keyword: searchParams.get("keyword") || "",
    }));
}, [searchParams]);
    useEffect(() => {
        const run = async () => {
            try {
                const data = await categoryService.getAll();
                setCategories(data);
            } catch (error) {
                console.log("Lỗi tải danh mục sản phẩm:", error);
            }
        };

        run();
    }, []);

    useEffect(() => {
        const run = async () => {
            try {
                setIsLoading(true);

                const cleanFilters = {};

                Object.keys(filters).forEach((key) => {
                    if (filters[key] !== "") {
                        cleanFilters[key] = filters[key];
                    }
                });

                const data = await productService.getAll(cleanFilters);
                setProducts(data);
            } catch (error) {
                console.log("Lỗi tải sản phẩm:", error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        run();
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryClick = (categoryId) => {
        setFilters((prev) => ({
            ...prev,
            categoryProductId: categoryId,
        }));
    };

    const clearFilter = () => {
        setFilters({
            keyword: "",
            categoryProductId: "",
            minPrice: "",
            maxPrice: "",
        });
    };
 

    return (
        <main className="main-container page-section">
            <div className="section-heading">
                <h2>CỬA HÀNG</h2>
                <span>Hiển thị {products.length} sản phẩm</span>
            </div>

            <div className="shop-layout">
                <aside className="shop-sidebar">
                    <h3>BỘ LỌC SẢN PHẨM</h3>

                    <div className="filter-group">
                        <label>Danh mục</label>

                        <button
                            type="button"
                            className={filters.categoryProductId === "" ? "active" : ""}
                            onClick={() => handleCategoryClick("")}
                        >
                            Tất cả sản phẩm
                        </button>

                        {categories.map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                className={
                                    Number(filters.categoryProductId) === item.id
                                        ? "active"
                                        : ""
                                }
                                onClick={() => handleCategoryClick(item.id)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    <div className="filter-group">
                        <label>Giá từ</label>
                        <input
                            name="minPrice"
                            type="number"
                            value={filters.minPrice}
                            onChange={handleChange}
                            placeholder="VD: 100000"
                        />
                    </div>

                    <div className="filter-group">
                        <label>Giá đến</label>
                        <input
                            name="maxPrice"
                            type="number"
                            value={filters.maxPrice}
                            onChange={handleChange}
                            placeholder="VD: 500000"
                        />
                    </div>

                    <button
                        type="button"
                        className="clear-filter"
                        onClick={clearFilter}
                    >
                        Xóa bộ lọc
                    </button>
                </aside>

                <section className="shop-content">
                    <div className="shop-header">
                        <div>
                            Tìm thấy <strong>{products.length}</strong> sản phẩm
                        </div>

                        <input
                            name="keyword"
                            placeholder="Tìm sản phẩm..."
                            value={filters.keyword}
                            onChange={handleChange}
                        />
                    </div>

                    <ProductList products={products} isLoading={isLoading} />
                </section>
            </div>
        </main>
    );
}

export default ShopPage;