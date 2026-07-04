import { useEffect, useState } from "react";
import postService from "../../services/postService";
import BlogSidebar from "./BlogSidebar";
import BlogList from "./BlogList";

function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(0);

    useEffect(() => {
        async function initializeBlogPage() {
            try {
                const categoriesData = await postService.getAllCategories();
                const postsData = await postService.getAllPosts({});

                setCategories(categoriesData);
                setPosts(postsData);
            } catch (error) {
                console.log("Lỗi tải dữ liệu blog:", error);
            }
        }

        initializeBlogPage();
    }, []);

    const loadPosts = async (categoryId) => {
        try {
            const filters = categoryId === 0 ? {} : { categoryId };

            const data = await postService.getAllPosts(filters);

            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilter = (categoryId) => {
        setActiveCategory(categoryId);
        loadPosts(categoryId);
    };

    return (
        <main className="main-container page-section cms-blog-page">

            <div className="section-heading">
                <h2>TIN TỨC / BLOG</h2>
                <span>{posts.length} bài viết</span>
            </div>

            <div className="cms-blog-layout">

                <BlogSidebar
                    categories={categories}
                    activeCategory={activeCategory}
                    onFilterChange={handleFilter}
                />

                <BlogList posts={posts} />

            </div>

        </main>
    );
}

export default BlogPage;