import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import heroImage from "../../assets/hero.png";
import postService from "../../services/postService.js";

function PostDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPost = async () => {
            try {
                setError("");
                const postDetail = await postService.getById(id);
                setPost(postDetail);
            } catch (apiError) {
                console.error("Loi goi chi tiet bai viet:", apiError);
                setPost(null);
                setError("Khong tai duoc chi tiet bai viet.");
            }
        };

        void loadPost();
    }, [id]);

    const formatDate = (value) => {
        if (!value) return "Chưa cập nhật";
        return new Date(value).toLocaleDateString("vi-VN");
    };

    const resolveMediaUrl = (value) => {
        if (!value) return "";
        if (value.startsWith("http://") || value.startsWith("https://")) {
            return value;
        }

        return `https://localhost:7294${value}`;
    };

    return (
        <div className="home-page">
            <div className="top-bar">
                <div>Hotline:  0900.456.567</div>
                <div>Email: thanhtuong@gmail.com</div>
                <div>
                    <Link to="/">Trang chủ</Link>
                </div>
            </div>

            <header className="header">
                <Link className="logo" to="/">
                    TuongCMS<span>.Fashion</span>
                </Link>
            </header>

            <main className="main-container">
                <section className="post-detail-page">
                    <Link className="back-link" to="/">
                        ← Quay lại trang chủ
                    </Link>

                    {error && <div className="error-message">{error}</div>}

                    {!error && !post && (
                        <div className="empty-products">Đang tải chi tiết bài viết...</div>
                    )}

                    {post && (
                        <article className="post-detail-card">
                            <div className="post-detail-meta">
                                <span>{formatDate(post.createdDate)}</span>
                                <span>{post.categoryName || "Chuyên mục tổng hợp"}</span>
                            </div>

                            <h1>{post.title}</h1>

                            {post.imageUrl ? (
                                <img
                                    className="post-detail-cover"
                                    src={resolveMediaUrl(post.imageUrl)}
                                    alt={post.title}
                                    onError={(event) => {
                                        event.currentTarget.onerror = null;
                                        event.currentTarget.src = heroImage;
                                    }}
                                />
                            ) : (
                                <div className="post-detail-cover post-detail-placeholder">
                                    Không có ảnh bài viết
                                </div>
                            )}

                            <div className="post-detail-content">
                                {post.content?.split(/\r?\n/).map((paragraph, index) => (
                                    <p key={`${post.id}-${index}`}>
                                        {paragraph.trim() || "\u00A0"}
                                    </p>
                                ))}
                            </div>
                        </article>
                    )}
                </section>
            </main>
        </div>
    );
}

export default PostDetailPage;
