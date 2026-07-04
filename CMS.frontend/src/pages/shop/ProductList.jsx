import ProductCard from "../../components/ProductCard";
import LoadingOrEmpty from "./LoadingOrEmpty";

function ProductList({ products = [], isLoading = false }) {
    return (
        <LoadingOrEmpty isLoading={isLoading} totalItems={products.length}>
            <div className="product-grid">
                {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </LoadingOrEmpty>
    );
}

export default ProductList;