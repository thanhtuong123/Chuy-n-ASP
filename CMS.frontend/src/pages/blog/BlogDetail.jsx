import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import postService from "../../services/postService";
import "./blog-detail.css";

function BlogDetailPage() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
    const loadPost = async () => {
        try {
            setLoading(true);
            const data = await postService.getPostById(id);
            setPost(data);
        } catch (error) {
            console.log("Lỗi tải chi tiết bài viết:", error);
            setPost(null);
        } finally {
            setLoading(false);
        }
    };

    loadPost();
}, [id]);

    const stripHtml = (html) => {
        if (!html) return "";
        return html.replace(/<[^>]*>/g, "");
    };

    if (loading) {
        return (
            <main className="blog-detail-page">
                <div className="blog-detail-container">
                    <div className="blog-detail-card">Đang tải bài viết...</div>
                </div>
            </main>
        );
    }

    if (!post) {
        return (
            <main className="blog-detail-page">
                <div className="blog-detail-container">
                    <div className="blog-detail-card">
                        Không tìm thấy bài viết.
                        <br />
                        <Link to="/blog" className="back-news-btn">
                            ← Quay lại tin tức
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="blog-detail-page">
            <div className="blog-detail-container">
                <div className="breadcrumb">
                    <Link to="/">Trang Chủ</Link>
                    <span>/</span>
                    <Link to="/blog">Tin tức</Link>
                    <span>/</span>
                    <span>{post.title}</span>
                </div>

                <article className="blog-detail-card">
                    <h1>{post.title}</h1>

                    <div className="blog-meta">
                        <span>📅 {new Date(post.createdDate).toLocaleDateString("vi-VN")}</span>
                        <span>👤 Tác giả: TuongCMS</span>
                        <span>👁 Lượt xem: 525 lượt</span>
                    </div>

                <div className="blog-hero-image">
    <img
        src={`/img/blog/blog-${Number(post.id % 5) + 1}.jpg`}
        alt={post.title}
    />
</div>

                    <div className="blog-content">
                        {post.content ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            ></div>
                        ) : (
                            <p>
                                {stripHtml(post.description) ||
                                    "Nội dung bài viết đang được cập nhật."}
                            </p>
                        )}
                    </div>

                    <div className="blog-detail-footer-line">
                        <Link to="/blog" className="back-news-btn">
                            ← Quay lại mục Tin tức
                        </Link>

                        <span>Mã bài viết: #{post.id}</span>
                    </div>
                </article>
            </div>
        </main>
    );
}

export default BlogDetailPage;