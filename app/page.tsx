import Hero from "@/componets/Hero";
import Services from "@/componets/Services";
import Testimonials from "@/componets/Testimonials";
import BlogPreview from "@/componets/BlogPreview";
import Transforming from "@/componets/Transforming";
import Cards from "@/componets/Cards";
import Ctalogo from "@/componets/Ctalogo";


export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <Transforming />
      <Cards />
      <Ctalogo />
      <BlogPreview />

    </>
  );
}
