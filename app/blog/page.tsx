import Link from "next/link";
import { getBlogPosts } from "@/componets/blogPosts";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className="bg-white pb-20">
      <section className="bg-Azullight py-20">
        <div className="maxW">
          <p className="text-Verdedark uppercase text-sm font-semibold">
            Blog IntegraMed
          </p>

          <h1 className="mt-5 max-w-[800px] text-4xl font-primary font-bold text-Verdedark md:text-5xl">
            Conteudos sobre clinica geral, exames, prevencao e home care.
          </h1>

          <p className="mt-5 max-w-[680px] text-Graylight">
            Artigos diretos e profissionais para orientar o cuidado com a saude
            no dia a dia.
          </p>
        </div>
      </section>

      <section className="pt-16">
        <div className="maxW grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-slate-100 bg-[#f8fdff] p-7"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide">
                <span className="rounded-full bg-Azullight px-3 py-1 font-semibold text-Verdedark">
                  {post.category}
                </span>
                <span className="text-Graylight">{formatDate(post.publishedAt)}</span>
                <span className="text-Graylight">{post.readingTime}</span>
              </div>

              <h2 className="mt-5 text-2xl font-primary font-semibold text-Verdedark">
                {post.title}
              </h2>

              <p className="mt-4 text-Graylight">{post.excerpt}</p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-7 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-Azulmedio transition hover:opacity-75"
              >
                Ler artigo
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
