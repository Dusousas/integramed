"use client";

import React, { useEffect, useRef } from "react";
import { HiCheckBadge } from "react-icons/hi2";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: "Clinica geral",
    description:
      "Consultas para sintomas do dia a dia, avaliacao clinica e acompanhamento com mais proximidade.",
  },
  {
    id: 2,
    title: "Check-up e prevencao",
    description:
      "Cuidado preventivo para identificar alteracoes cedo e manter sua saude em dia.",
  },
  {
    id: 3,
    title: "Exames laboratoriais",
    description:
      "Solicitacao e acompanhamento de exames importantes para investigacao e monitoramento.",
  },
  {
    id: 4,
    title: "Atendimento humanizado",
    description:
      "Mais escuta, mais clareza nas orientacoes e mais respeito a historia de cada paciente.",
  },
  {
    id: 5,
    title: "Agilidade no cuidado",
    description:
      "Mais praticidade para consultar, avaliar exames e seguir o tratamento com seguranca.",
  },
  {
    id: 6,
    title: "Acompanhamento continuo",
    description:
      "Condutas ajustadas conforme a evolucao do paciente, com foco em resolucao e qualidade de vida.",
  },
  {
    id: 7,
    title: "Home care",
    description:
      "Atendimento em domicilio para ampliar o acesso ao cuidado quando houver necessidade.",
  },
  {
    id: 8,
    title: "Santa Maria da Serra e regiao",
    description:
      "Uma clinica criada para estar perto da comunidade, com atendimento confiavel e responsavel.",
  },
];

export default function Cards() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const headerItems = gsap.utils.toArray<HTMLElement>("[data-anim='header']");
      const cardEls = gsap.utils.toArray<HTMLElement>("[data-anim='card']");

      gsap.set([...headerItems, ...cardEls], {
        y: 26,
        opacity: 0,
        filter: "blur(10px)",
      });

      gsap.to([...headerItems, ...cardEls], {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "back.out(1.25)",
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      let activeIndex = 0;

      const setBg = (el: HTMLElement, active: boolean) => {
        el.classList.toggle("bg-Azulmedio/30", active);
        el.classList.toggle("bg-Azulmedio/10", !active);
      };

      const animateActive = (nextIndex: number) => {
        const prev = cardEls[activeIndex];
        const next = cardEls[nextIndex];
        if (!prev || !next) return;

        setBg(prev, false);
        gsap.to(prev, {
          y: 0,
          scale: 1,
          boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          duration: 0.85,
          ease: "power2.out",
        });

        setBg(next, true);
        gsap.fromTo(
          next,
          { y: 0, scale: 1 },
          {
            y: -4,
            scale: 1.015,
            boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
            duration: 1.15,
            ease: "power3.out",
          }
        );

        activeIndex = nextIndex;
      };

      cardEls.forEach((el, i) => setBg(el, i === 0));

      const tl = gsap.timeline({ repeat: -1 });

      cardEls.forEach((_, i) => {
        tl.call(() => animateActive(i)).to({}, { duration: 2.2 });
      });

      const onEnter = (i: number) => {
        tl.pause();
        animateActive(i);
      };

      const onLeave = () => {
        tl.play();
      };

      cardEls.forEach((el, i) => {
        const enter = () => onEnter(i);
        const leave = () => onLeave();

        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);

        (el as HTMLElement & { __enter?: () => void; __leave?: () => void }).__enter =
          enter;
        (el as HTMLElement & { __enter?: () => void; __leave?: () => void }).__leave =
          leave;
      });

      return () => {
        cardEls.forEach((el) => {
          const handlers = el as HTMLElement & {
            __enter?: () => void;
            __leave?: () => void;
          };

          if (handlers.__enter) el.removeEventListener("mouseenter", handlers.__enter);
          if (handlers.__leave) el.removeEventListener("mouseleave", handlers.__leave);
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-20 bg-[#F4F9FA]">
      <div className="max-w-[1300px] mx-auto px-4">
        <article className="flex flex-col lg:flex-row lg:gap-40 gap-6 items-start lg:items-end">
          <div className="lg:w-1/2">
            <p
              data-anim="header"
              className="text-Verdedark uppercase text-sm font-semibold"
            >
              Diferenciais da clinica
            </p>

            <h1
              data-anim="header"
              className="font-bold text-Verdedark font-primary max-w-[900px] text-2xl lg:text-3xl"
            >
              Tudo o que a IntegraMed entrega para tornar o atendimento mais
              completo, pratico e confiavel.
            </h1>
          </div>

          <div className="lg:w-1/2 lg:flex lg:justify-end">
            <p
              data-anim="header"
              className="text-Verdedark uppercase text-sm font-semibold max-w-[500px]"
            >
              <span className="font-bold">IntegraMed </span>e uma clinica geral
              preparada para cuidar da sua rotina de saude com acolhimento,
              exames, acompanhamento e home care.
            </p>
          </div>
        </article>

        <article className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.id}
              data-anim="card"
              className="
                bg-Azulmedio/10
                transition-colors duration-500
                p-8 rounded-xl relative
                will-change-transform
              "
            >
              <div className="h-12 w-12 bg-white rounded-full flex absolute right-4 top-4 items-center justify-center text-Azulmedio/30">
                <HiCheckBadge className="text-2xl" />
              </div>

              <h2 className="mt-8 font-semibold text-Verdedark tracking-wider uppercase">
                {card.title}
              </h2>

              <p className="mt-2 text-Verdedark">{card.description}</p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
