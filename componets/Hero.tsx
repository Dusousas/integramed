"use client";

import React, { useLayoutEffect, useRef } from "react";
import { IoIosStar } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);

  const titleBg1Ref = useRef<HTMLParagraphElement | null>(null);
  const titleBg2Ref = useRef<HTMLParagraphElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const ratingRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const bg1 = titleBg1Ref.current;
    const bg2 = titleBg2Ref.current;
    const content = contentRef.current;
    const img = imageRef.current;
    const rating = ratingRef.current;

    if (!root || !bg1 || !bg2 || !content || !img || !rating) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      gsap.set([bg1, bg2], { opacity: 0 });
      gsap.set(content, { opacity: 0, y: 18 });
      gsap.set(img, { opacity: 0, y: 28, scale: 0.99 });
      gsap.set(rating, { opacity: 0, y: 14 });

      mm.add("(min-width: 1024px)", () => {
        gsap.set([bg1, bg2], { filter: "blur(2px)" });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(
          [bg1, bg2],
          { opacity: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.08 },
          0,
        )
          .fromTo(bg1, { x: -24 }, { x: 0, duration: 0.8 }, 0.05)
          .fromTo(bg2, { x: 24 }, { x: 0, duration: 0.8 }, 0.05)
          .to(img, { opacity: 1, y: 0, scale: 1, duration: 0.85 }, 0.15)
          .to(content, { opacity: 1, y: 0, duration: 0.7 }, 0.25)
          .to(rating, { opacity: 1, y: 0, duration: 0.6 }, 0.35);

        gsap.to(bg1, {
          y: 18,
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(bg2, {
          y: -12,
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        const imgX = gsap.quickTo(img, "x", {
          duration: 0.5,
          ease: "power2.out",
        });
        const imgY = gsap.quickTo(img, "y", {
          duration: 0.5,
          ease: "power2.out",
        });

        const contentX = gsap.quickTo(content, "x", {
          duration: 0.6,
          ease: "power2.out",
        });
        const contentY = gsap.quickTo(content, "y", {
          duration: 0.6,
          ease: "power2.out",
        });

        const ratingX = gsap.quickTo(rating, "x", {
          duration: 0.6,
          ease: "power2.out",
        });
        const ratingY = gsap.quickTo(rating, "y", {
          duration: 0.6,
          ease: "power2.out",
        });

        const bg1X = gsap.quickTo(bg1, "x", {
          duration: 0.8,
          ease: "power2.out",
        });
        const bg2X = gsap.quickTo(bg2, "x", {
          duration: 0.8,
          ease: "power2.out",
        });

        const onMove = (e: MouseEvent) => {
          const rect = root.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;

          imgX(px * 16);
          imgY(py * 18);

          contentX(px * -10);
          contentY(py * -8);

          ratingX(px * 10);
          ratingY(py * 6);

          bg1X(px * -8);
          bg2X(px * 8);
        };

        root.addEventListener("mousemove", onMove);

        return () => {
          root.removeEventListener("mousemove", onMove);
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to([bg1, bg2], { opacity: 1, duration: 0.45, stagger: 0.08 }, 0)
          .to(img, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 0.1)
          .to(content, { opacity: 1, y: 0, duration: 0.55 }, 0.2);

        gsap.to(bg1, {
          y: 10,
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* animação de flutuação */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      <section
        ref={rootRef}
        className="relative bg-Azullight overflow-hidden h-[80vh] lg:h-[calc(100vh-96px)]"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-14 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(2,153,203,0.3)_0%,rgba(2,153,203,0.18)_26%,rgba(2,153,203,0)_72%)] blur-3xl lg:h-[28rem] lg:w-[28rem]" />
          <div className="absolute left-[34%] top-24 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,190,32,0.18)_0%,rgba(255,190,32,0)_72%)] blur-3xl lg:h-64 lg:w-64" />
          <div className="absolute right-[12%] top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,190,32,0.22)_0%,rgba(255,190,32,0.12)_30%,rgba(255,190,32,0)_72%)] blur-3xl lg:h-80 lg:w-80" />
          <div className="absolute bottom-28 left-[14%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(102,201,76,0.22)_0%,rgba(102,201,76,0.1)_28%,rgba(102,201,76,0)_72%)] blur-3xl lg:h-64 lg:w-64" />
          <div className="absolute right-[8%] bottom-10 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(239,83,80,0.2)_0%,rgba(239,83,80,0.08)_32%,rgba(239,83,80,0)_72%)] blur-3xl lg:h-72 lg:w-72" />
        </div>

        <div className="maxW relative h-full flex flex-col lg:justify-start lg:items-center lg:flex-row">
          <div className="absolute inset-0 pointer-events-none">
            <p
              ref={titleBg1Ref}
              className="absolute left-1/2 -translate-x-1/2 font-primary tracking-widest top-74 sm:top-60 uppercase sm:text-8xl font-bold leading-none text-white/30 lg:top-60 lg:text-[120px] 2xl:text-[220px]"
            >
              IntegraMed
            </p>
          </div>

          <div
            ref={contentRef}
            className="
    text-Verdedark w-full z-20
    sm:top-10
    sm:absolute lg:max-w-[800px] lg:text-center
    lg:top-30 lg:left-1/2 
    lg:-translate-x-1/2 lg:-translate-y-1/2 
    2xl:top-auto 2xl:left-auto 
    2xl:translate-x-0 2xl:translate-y-0 
    2xl:bottom-30
    2xl:max-w-[600px]"
          >
            <h2 className="font-primary font-bold text-center text-3xl lg:text-center lg:text-5xl 2xl:text-left">
              Atendimento medico completo, humano e pratico para o dia a dia.
            </h2>

            <p className="text-Graylight mt-4 text-center lg:text-center 2xl:text-left">
              A IntegraMed oferece clinica geral, exames laboratoriais,
              acompanhamento continuo e home care para Santa Maria da Serra e
              regiao, com acolhimento, agilidade e foco no que realmente
              importa: a sua saude.
            </p>
          </div>

          {/* IMAGEM COM SOMBRA + FLOAT */}
          <div className="w-full flex mt-auto justify-center lg:mt-0 lg:justify-center 2xl:justify-end">
            <img
              ref={imageRef}
              src="/medico.png"
              alt="Equipe medica da Clinica IntegraMed"
              className="absolute w-[800px] -bottom-10 z-10 object-contain  sm:max-w-[820px] lg:max-w-none  lg:w-[900px]  2xl:w-[1400px] lg:object-cover 
              
              drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)] 
              animate-[float_4s_ease-in-out_infinite]"
              draggable={false}
            />
          </div>

          <div
            ref={ratingRef}
            className="hidden text-Verdedark lg:absolute 
  bg-white/20 backdrop-blur-md 
  p-4 rounded-xl z-20 relative max-w-[300px] 
  bottom-10 right-2 lg:block border border-white/30"
          >
            <div className="flex text-Azulmedio z-20 relative">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
            </div>
            <p className="font-semibold mt-2">
              Medicos que ja acompanham a realidade da comunidade e oferecem um
              cuidado proximo, responsavel e resolutivo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
