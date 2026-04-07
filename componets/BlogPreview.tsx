import Link from "next/link";
import Image from "next/image";
import { getFeaturedBlogPosts } from "./blogPosts";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  category: string;
  publishedAt: string;
  readingTime?: string;
  image: string;
};

export default function BlogPreview() {
  const posts = getFeaturedBlogPosts(2) as unknown as Post[];

  return (
    <section className="relative overflow-hidden bg-white py-20">

      {/* ── Grain texture overlay ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "160px",
        }}
      />

      {/* ── Decorative vertical rule ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-Verdedark/10 to-transparent hidden lg:block"
      />

      {/* ── Large ghost number ── */}
      <span
        aria-hidden
        className="pointer-events-none uppercase absolute -right-6 top-10 select-none text-[220px] font-black leading-none text-Azullight/30 tracking-tighter hidden xl:block"
      >
        Blog
      </span>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ────────────────── HEADER ────────────────── */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

          <div className="lg:max-w-[54%]">
  

            {/* Headline – large serif-style weight */}
            <h2 className="text-[40px] text-center md:text-[54px] leading-[1.04] lg:text-left font-semibold text-Verdedark">
              Conteudos para cuidar melhor da sua{" "}
              <em className="not-italic relative inline-block">
                saude
                {/* underline accent */}
                <svg
                  aria-hidden
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  height="8"
                >
                  <path
                    d="M0 6 Q50 1 100 5 Q150 9 200 4"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-Azulmedio"
                    strokeLinecap="round"
                  />
                </svg>
              </em>{" "}
              no dia a dia
            </h2>
          </div>

          {/* Right block – copy + CTA */}
          <div className="lg:max-w-[38%] flex flex-col items-start gap-6">
   

            <Link
              href="/blog"
              className="group relative inline-flex justify-center mx-auto items-center gap-3 overflow-hidden lg:mx-auto rounded-full bg-Verdedark px-7 py-3.5 text-[13px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-Azulmedio"
            >
              Ver todo o blog
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* ────────────────── CARDS ────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className={`group relative flex flex-col rounded-[28px] overflow-hidden bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.05] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.13)] ${
                i === 0 ? "lg:col-span-1" : ""
              }`}
            >
              {/* IMAGE wrapper */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Gradient overlay – stronger at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Category pill – floated on image */}
                <span className="absolute left-5 top-5 rounded-full bg-white/90 backdrop-blur-sm px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-Verdedark shadow-sm">
                  {post.category}
                </span>

                {/* Reading time pill */}
                {post.readingTime && (
                  <span className="absolute right-5 top-5 rounded-full bg-black/30 backdrop-blur-sm px-3 py-1 text-[11px] font-medium text-white/90">
                    {post.readingTime}
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col justify-between px-7 pb-8 pt-6">
                <div>
                  {/* Date */}
                  <time className="text-[11px] uppercase tracking-[0.18em] text-Graylight/70 font-medium">
                    {formatDate(post.publishedAt)}
                  </time>

                  {/* Title */}
                  <h3 className="mt-3 text-[22px] md:text-[26px] font-black text-Verdedark leading-[1.2] tracking-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="mt-3 text-[15px] text-Graylight leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {/* Divider + CTA row */}
                <div className="mt-7 flex items-center justify-between border-t border-black/[0.07] pt-5">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-Azulmedio transition-all duration-200 group-hover:gap-3"
                  >
                    Ler artigo
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  {/* Decorative index number */}
                  <span
                    aria-hidden
                    className="text-[42px] font-black leading-none text-black/[0.06] select-none"
                  >
                    0{i + 1}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
