function BlogSidebar({ categories, activeCategory, onFilterChange }) {
    return (
        <aside className="cms-blog-sidebar">
            <h3>DANH MỤC TIN TỨC</h3>

            <button
                className={activeCategory === 0 ? "active" : ""}
                onClick={() => onFilterChange(0)}
            >
                Tất cả bài viết
            </button>

            {categories.map((item) => (
                <button
                    key={item.id}
                    className={activeCategory === item.id ? "active" : ""}
                    onClick={() => onFilterChange(item.id)}
                >
                    {item.name}
                </button>
            ))}
        </aside>
    );
}

export default BlogSidebar;