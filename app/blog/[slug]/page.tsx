import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/componets/blogPosts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post nao encontrado | Blog IntegraMed" };
  }

  return {
    title: `${post.title} | Blog IntegraMed`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getBlogPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  return (
    <main className="bg-[#F2F6F4] min-h-screen">

      {/* ─────────────────── HERO ─────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "520px" }}>

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark gradient so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-Verdedark/95 via-Verdedark/60 to-Verdedark/20" />
        </div>

        {/* Grain texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px",
          }}
        />

        {/* Content over hero */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-14 pt-24" style={{ minHeight: "520px" }}>

          {/* Back link */}
          <Link
            href="/blog"
            className="group mb-10 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/80 ring-1 ring-white/20 transition hover:bg-white/20"
          >
            <svg className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar para o blog
          </Link>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="rounded-full bg-Azulmedio px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              {post.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-[12px] text-white/60 tracking-wide">{formatDate(post.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-[12px] text-white/60 tracking-wide">{post.readingTime} de leitura</span>
          </div>

          {/* Title */}
          <h1 className="max-w-[820px] text-[36px] md:text-[52px] font-black leading-[1.06] tracking-tight text-white">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-white/70">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* ─────────────────── ARTICLE BODY ─────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:grid lg:grid-cols-[1fr_300px] lg:gap-16 xl:gap-24">

        {/* Main content */}
        <article>

          {/* Drop cap first paragraph */}
          <div className="space-y-7">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className={`leading-[1.85] text-[17px] text-[#1E3A3C] ${
                  i === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[72px] first-letter:font-black first-letter:leading-[0.85] first-letter:text-Verdedark"
                    : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div className="mt-14 flex items-center gap-4">
            <div className="h-px flex-1 bg-Verdedark/10" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-Verdedark/30 font-semibold">Fim do artigo</span>
            <div className="h-px flex-1 bg-Verdedark/10" />
          </div>

          {/* Share / back row */}
          <div className="mt-10 flex items-center justify-between">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-Azulmedio transition hover:gap-3"
            >
              <svg className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Todos os artigos
            </Link>

            <span className="text-[12px] text-Graylight/60 tracking-wide">{post.readingTime} de leitura</span>
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className="mt-14 lg:mt-0">

          {/* Sticky wrapper */}
          <div className="lg:sticky lg:top-10 space-y-6">

            {/* About card */}
            <div className="rounded-[24px] bg-white ring-1 ring-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-7">
              <p className="text-[10px] uppercase tracking-[0.26em] text-Verdedark/50 font-semibold mb-4">Sobre o autor</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-Azullight flex items-center justify-center text-Verdedark font-black text-lg">
                  IM
                </div>
                <div>
                  <p className="font-bold text-Verdedark text-[15px]">Equipe IntegraMed</p>
                  <p className="text-[12px] text-Graylight">Clinica geral e prevencao</p>
                </div>
              </div>
              <p className="text-[13px] text-Graylight leading-relaxed">
                Conteudos informativos para orientar pacientes sobre consultas,
                exames, prevencao e cuidados com a saude.
              </p>
            </div>

            {/* Category tag */}
            <div className="rounded-[24px] bg-Verdedark p-7">
              <p className="text-[10px] uppercase tracking-[0.26em] text-white/50 font-semibold mb-3">Categoria</p>
              <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-[13px] font-bold text-white">
                {post.category}
              </span>
              <p className="mt-4 text-[13px] leading-relaxed text-white/60">
                Explore outros artigos sobre {post.category.toLowerCase()} no nosso blog.
              </p>
              <Link
                href="/blog"
                className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-Azullight transition hover:opacity-80"
              >
                Ver mais →
              </Link>
            </div>

          </div>
        </aside>
      </div>

      {/* ─────────────────── RELATED POSTS ─────────────────── */}
      <section className="border-t border-Verdedark/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

          <div className="flex items-center gap-4 mb-10">
            <span className="block h-px w-10 bg-Verdedark/30" />
            <p className="text-[11px] uppercase tracking-[0.26em] text-Verdedark/50 font-semibold">Continue lendo</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((item, i) => (
              <article
                key={item.slug}
                className="group relative flex flex-col overflow-hidden rounded-[24px] bg-[#F2F6F4] ring-1 ring-black/[0.05] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)]"
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-Verdedark">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-6 pb-7 pt-5">
                  <time className="text-[11px] uppercase tracking-[0.18em] text-Graylight/70 font-medium">
                    {formatDate(item.publishedAt)}
                  </time>
                  <h3 className="mt-2 text-[20px] font-black text-Verdedark leading-snug tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-Graylight leading-relaxed line-clamp-2">
                    {item.excerpt}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-black/[0.07] pt-4">
                    <Link
                      href={`/blog/${item.slug}`}
                      className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-Azulmedio transition group-hover:gap-3"
                    >
                      Ler artigo
                      <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <span aria-hidden className="text-[36px] font-black leading-none text-black/[0.05] select-none">
                      0{i + 1}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
