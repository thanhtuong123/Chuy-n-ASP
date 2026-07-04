import { useEffect, useState } from "react";

function HeroBanner() {
    const banners = [
        {
            image: "/img/banner/banner1.jpg",
            title: "BỘ SƯU TẬP MÙA HÈ 2026",
            description: "Khám phá những xu hướng thời trang mới nhất."
        },
        {
            image: "/img/banner/banner2.jpg",
            title: "GIẢM GIÁ ĐẾN 50%",
            description: "Ưu đãi đặc biệt dành cho khách hàng mới."
        },
        {
            image: "/img/banner/banner3.jpg",
            title: "THỜI TRANG CÔNG SỞ",
            description: "Phong cách thanh lịch cho dân văn phòng."
        }
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % banners.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section
    className="hero-banner"
    style={{
        backgroundImage:`url(${banners[index].image})`
    }}
>

    <div className="hero-overlay">

        <h1>{banners[index].title}</h1>

        <p>{banners[index].description}</p>

        <button className="hero-btn">
            MUA NGAY
        </button>

    </div>

</section>
    );
}

export default HeroBanner;