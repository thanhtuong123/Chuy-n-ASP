import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HeroBanner from "../../components/HeroBanner";
import CategoryMenu from "../../components/CategoryMenu";
import ProductCard from "../../components/ProductCard";

import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import postService from "../../services/postService";

function HomePage() {

    const [categories, setCategories] = useState([]);
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [newestProducts, setNewestProducts] = useState([]);
    const [posts, setPosts] = useState([]);

    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    useEffect(() => {

        const loadData = async () => {

            try {

                const [
                    categoryData,
                    bestSeller,
                    newest,
                    postData
                ] = await Promise.all([

                    categoryService.getAll(),
                    productService.getBestSeller(),
                    productService.getNewest(),
                    postService.getAllPosts({})

                ]);

                setCategories(categoryData);
                setBestSellerProducts(bestSeller);
                setNewestProducts(newest);
                setPosts(postData);

            } catch (err) {

                console.log(err);

            }

        };

        loadData();

    }, []);

    const bestSellerFiltered =
        selectedCategoryId === 0
            ? bestSellerProducts
            : bestSellerProducts.filter(
                x => x.categoryProductId === selectedCategoryId
            );

    const newestFiltered =
        selectedCategoryId === 0
            ? newestProducts
            : newestProducts.filter(
                x => x.categoryProductId === selectedCategoryId
            );

    return (

        <>

            <HeroBanner />

            <main className="main-container">

                <CategoryMenu
                    categories={categories}
                    selectedCategoryId={selectedCategoryId}
                    onSelectCategory={setSelectedCategoryId}
                />

                {/* BEST SELLER */}

                <div className="section-heading">

                    <h2>SẢN PHẨM NỔI BẬT</h2>

                    <Link to="/shop">
                        Hiển thị tất cả
                    </Link>

                </div>

                {
                    bestSellerFiltered.length === 0 ?

                        <div className="empty-box">
                            Không có sản phẩm.
                        </div>

                        :

                        <div className="product-grid">

                            {
                                bestSellerFiltered.map(item => (

                                    <ProductCard
                                        key={item.id}
                                        product={item}
                                    />

                                ))
                            }

                        </div>
                }

                {/* NEWEST */}

                <div className="section-heading mt-5">

                    <h2>SẢN PHẨM MỚI</h2>

                </div>

                {
                    newestFiltered.length === 0 ?

                        <div className="empty-box">
                            Không có sản phẩm mới.
                        </div>

                        :

                        <div className="product-grid">

                            {
                                newestFiltered.map(item => (

                                    <ProductCard
                                        key={item.id}
                                        product={item}
                                    />

                                ))
                            }

                        </div>
                }

                {/* BLOG */}

                <section className="blog-section">

                    <div className="section-heading">

                        <h2>XU HƯỚNG THỜI TRANG</h2>

                    </div>

                    <p>
                        Cập nhật những bài viết mới nhất.
                    </p>

                    <div className="blog-grid">

                        {
                            posts.slice(0, 3).map(item => {

                                const content = item.content
                                    ? item.content.replace(/<[^>]*>/g, "")
                                    : "";

                                return (

                                    <div
                                        className="blog-card"
                                        key={item.id}
                                    >

                                        <div className="blog-img">

                                            <img
                                                src={`/img/blog/blog-${((item.id - 1) % 5) + 1}.jpg`}
                                                alt={item.title}
                                            />

                                        </div>

                                        <span>

                                            {
                                                new Date(item.createdDate)
                                                    .toLocaleDateString("vi-VN")
                                            }

                                        </span>

                                        <h3>{item.title}</h3>

                                        <p>

                                            {
                                                content.length > 100
                                                    ? content.substring(0, 100) + "..."
                                                    : content
                                            }

                                        </p>

                                        <Link to={`/blog/${item.id}`}>

                                            Đọc bài viết →

                                        </Link>

                                    </div>

                                );

                            })
                        }

                    </div>

                </section>

            </main>

        </>

    );

}

export default HomePage;