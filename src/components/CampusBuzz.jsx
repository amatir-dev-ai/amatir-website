import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

// Blog data with different dates
const BLOG_DATA = {
  blog1: {
    slug: "blog",
    title: "Curriculum in Gurukuls: What Parents Should Know",
    excerpt: "Parents today are looking for more than just high scores—they want education that nurtures character, confidence, and clarity. The modern Gurukul system has evolved to offer just that: a balanced curriculum that blends traditional Indian wisdom with academic excellence.",
    img: "/images/Blog_main_pic_b15a6e.jpg",
    date: "10 Oct 2025",
    read: "7 min read",
  },
  blog2: {
    slug: "blog2",
    title: "A Day in the Life of a Girl at Amatir Gurukul",
    excerpt:
      "From morning prayers and CBSE classes to yoga, arts, and evening upasana—step through a complete weekday that balances study with inner work.",
    img: "/images/Rectangle_110_tdkht6.jpg",
    date: "10 Nov 2025",
    read: "6 min read",
  },
  blog3: {
    slug: "blog3",
    title: "Why Gurukul Education Builds Character",
    excerpt: "Discipline, devotion, and daily practice shape confidence without arrogance and resilience without rigidity—how a Gurukul forms character.",
    img: "/images/Rectangle_111_j4hdij.jpg",
    date: "15 Nov 2025",
    read: "5 min read",
  },
  blog4: {
    slug: "blog4",
    title: "CBSE in Gurukuls: How It Works",
    excerpt:
      "CBSE subjects delivered in a yogic environment—silence, nature, and presence—so students excel in exams and grow inwardly too.",
    img: "public/images/CBSE_in_Gurukuls__How_It_Works_u4yzti.jpg",
    date: "25 Nov 2025",
    read: "5 min read",
  },
};

export default function CampusBuzz() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isLgUp = useMediaQuery({ minWidth: 1024 });
  const isUltrawide = useMediaQuery({ query: "(min-aspect-ratio: 16/9)" });
  const isShort = useMediaQuery({ query: "(max-height: 770px)" });
  const isTall = useMediaQuery({ query: "(min-height: 1000px)" });

  const btnPct = isTall ? 10 : isUltrawide ? 11 : isShort ? 13.5 : 12;
  const gapPct = 3;

  const navigate = useNavigate();

  const mainBlog = BLOG_DATA.blog1;
  const rightBlog1 = BLOG_DATA.blog2;
  const rightBlog2 = BLOG_DATA.blog3;

  const handleBlogClick = (slug) => {
    navigate(`/${slug}`);
  };

  return (
    <section className={`bg-white ${isLgUp ? "h-screen" : "py-[80px]"}`} style={{ paddingBottom: "5%" }}>
      <div className="mx-auto flex h-full w-screen flex-col items-center">
        <h3
          className="mt-[40px] text-center leading-[120%] text-[#1C3664]"
          style={{
            fontFamily: '"CentSchbkCyrill BT", Georgia, serif',
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: isLgUp ? "48px" : "40px",
            letterSpacing: "0",
            paddingBottom: "1%",
          }}
        >
          Campus Buzz
        </h3>

        <div className="mt-6 w-[90%] max-w-[1290px] flex-1">
          {isMobile ? (
            <div className="flex flex-col items-center">
              <article
                className="flex w-full max-w-[400px] flex-col rounded-[38px] border border-[#DCDCDC] bg-[#CFCFCF] p-[14px] cursor-pointer"
                onClick={() => handleBlogClick(mainBlog.slug)}
              >
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[24px] bg-[#CFCFCF]">
                  <figure className="relative overflow-hidden rounded-t-[24px] h-[230px]">
                    <img src={mainBlog.img} alt="Campus gathering" className="absolute inset-0 h-full w-full object-cover" />
                  </figure>

                  <div className="p-[24px] text-[#1C3664]">
                    <h4
                      className="leading-[120%]"
                      style={{
                        fontFamily: '"CentSchbkCyrill BT", Georgia, serif',
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: 24,
                      }}
                    >
                      {mainBlog.title}
                    </h4>
                    <p className="mt-2 text-[#6B7280]" style={{ fontSize: 14 }}>
                      {mainBlog.date}
                    </p>
                    <p className="mt-3 text-[#3A2323]" style={{ lineHeight: "1.7", fontSize: 15 }}>
                      {mainBlog.excerpt}
                    </p>
                    <a
                      href="#"
                      className="mt-5 inline-block text-[#1C3664] underline-offset-2 hover:underline"
                      style={{ fontSize: 14 }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/blog");
                      }}
                    >
                      Know More
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ) : (
            <div className="grid h-full grid-cols-1 gap-[28px] lg:grid-cols-2">
              {/* LEFT */}
              <article
                className="flex h-full flex-col rounded-[38px] border border-[#DCDCDC] bg-[#F5F5F5] p-[14px] cursor-pointer"
                onClick={() => handleBlogClick(mainBlog.slug)}
              >
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[24px] bg-white">
                  <figure className="relative min-h-0 flex-1 overflow-hidden">
                    <img src={mainBlog.img} alt="Campus gathering" className="absolute inset-0 h-full w-full object-cover" />
                  </figure>

                  <div className="p-[24px] text-[#1C3664]">
                    <h4
                      className="leading-[120%]"
                      style={{
                        fontFamily: '"CentSchbkCyrill BT", Georgia, serif',
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: 26,
                      }}
                    >
                      {mainBlog.title}
                    </h4>
                    <p className="mt-2 text-[#6B7280]" style={{ fontSize: 14 }}>
                      {mainBlog.date}
                    </p>
                    <p className="mt-3 text-[#3A2323]" style={{ lineHeight: "1.7", fontSize: 15 }}>
                      {mainBlog.excerpt}
                    </p>
                    <a
                      href="#"
                      className="mt-5 inline-block text-[#1C3664] underline-offset-2 hover:underline"
                      style={{ fontSize: 14 }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/blog");
                      }}
                    >
                      Know More
                    </a>
                  </div>
                </div>
              </article>

              {/* RIGHT */}
              <div
                className="relative flex h-full flex-col"
                style={
                  isLgUp
                    ? {
                        "--gapP": `${gapPct}%`,
                        "--btnP": `${btnPct}%`,
                      }
                    : undefined
                }
              >
                <RightStoryCard
                  percentHeight={isLgUp ? "calc((100% - var(--gapP) - var(--btnP)) / 2)" : undefined}
                  image={rightBlog1.img}
                  title={rightBlog1.title}
                  date={rightBlog1.date}
                  slug={rightBlog1.slug}
                  onBlogClick={handleBlogClick}
                />

                <div style={isLgUp ? { height: "var(--gapP)" } : { height: 16 }} />

                <RightStoryCard
                  percentHeight={isLgUp ? "calc((100% - var(--gapP) - var(--btnP)) / 2)" : undefined}
                  image={rightBlog2.img}
                  title={rightBlog2.title}
                  date={rightBlog2.date}
                  slug={rightBlog2.slug}
                  onBlogClick={handleBlogClick}
                />

                <div className="flex items-center" style={isLgUp ? { height: "var(--btnP)", marginTop: "1.5rem"} : undefined}>
                  <a
                    href="#"
                    className="inline-flex cursor-pointer items-center rounded-full bg-[#ED6D23] px-6 py-3 text-white transition-opacity hover:opacity-90"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/blog");
                    }}
                  >
                    Know More
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RightStoryCard({ percentHeight, image, title, date, slug, onBlogClick }) {
  return (
    <article
      className="flex w-full items-center gap-5 rounded-[38px] border border-[#DCDCDC] bg-[#F5F5F5] p-[14px] cursor-pointer"
      style={percentHeight ? { height: percentHeight } : undefined}
      onClick={() => onBlogClick(slug)}
    >
      <div className="flex w-[110px] shrink-0 flex-col items-center justify-center rounded-[28px] bg-white py-8 text-[#1C3664]">
        <span
          className="tracking-wide"
          style={{
            fontFamily:
              'Univers, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
            fontSize: 12,
            letterSpacing: "0.12em",
          }}
        >
          {new Date(date).toLocaleString("en-US", { month: "short" }).toUpperCase()}
        </span>
        <span
          className="my-2"
          style={{
            fontFamily:
              'Univers, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
            fontWeight: 700,
            fontSize: 28,
            lineHeight: 1,
          }}
        >
          {new Date(date).toLocaleString("en-US", { day: "2-digit" })}
        </span>
        <span
          className="tracking-wide"
          style={{
            fontFamily:
              'Univers, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
            fontSize: 12,
            letterSpacing: "0.12em",
          }}
        >
          {new Date(date).toLocaleString("en-US", { weekday: "short" }).toUpperCase()}
        </span>
      </div>

      <div className="relative h-full min-w-0 flex-1 overflow-hidden rounded-[22px]">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5">
          <p
            className="text-white leading-snug"
            style={{
              fontFamily: '"CentSchbkCyrill BT", Georgia, serif',
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: 22,
              maxWidth: 360,
            }}
          >
            {title}
          </p>
        </div>
      </div>
    </article>
  );
}
