import { Link } from "react-router-dom";

function BlogList({ posts }) {

    if (!posts || posts.length === 0) {
        return <div className="empty-box">Chưa có bài viết.</div>;
    }

    return (
        <section className="cms-blog-list">

            {posts.map((item) => {

                const content = item.content
                    ? item.content.replace(/<[^>]*>/g, "")
                    : "";

                return (
                    <article className="cms-blog-card" key={item.id}>

                        <div className="cms-blog-thumb">
                            <img
                                src={`/img/blog/blog-${((item.id - 1) % 5) + 1}.jpg`}
                                alt={item.title}
                            />
                        </div>

                        <div className="cms-blog-content">

                            <span className="cms-blog-date">
                                {item.createdDate
                                    ? new Date(item.createdDate).toLocaleDateString("vi-VN")
                                    : ""}
                            </span>

                            <h3>{item.title}</h3>

                            <p>
                                {content.length > 140
                                    ? content.substring(0, 140) + "..."
                                    : content}
                            </p>

                            <Link
                                to={`/blog/${item.id}`}
                                className="cms-read-more"
                            >
                                Đọc bài viết →
                            </Link>

                        </div>

                    </article>
                );

            })}

        </section>
    );
}

export default BlogList;