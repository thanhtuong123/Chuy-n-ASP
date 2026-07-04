function CategoryMenu({ categories, selectedCategoryId, onSelectCategory }) {
    return (
        <div className="category-tabs">
            <button
                className={selectedCategoryId === 0 ? "active" : ""}
                onClick={() => onSelectCategory(0)}
            >
                ☷ TẤT CẢ SẢN PHẨM
            </button>

            {categories.map((item) => (
                <button
                    key={item.id}
                    className={selectedCategoryId === item.id ? "active" : ""}
                    onClick={() => onSelectCategory(item.id)}
                >
                    {item.name.toUpperCase()}
                </button>
            ))}
        </div>
    );
}

export default CategoryMenu;