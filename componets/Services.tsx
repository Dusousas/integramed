"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const title = root.querySelector("[data-title]");
      const desc = root.querySelector("[data-desc]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");

      if (!title || !desc || !cards.length) return;

      gsap.set([title, desc], { opacity: 0, y: 18 });
      gsap.set(cards, { opacity: 0, y: 22, scale: 0.99 });

      mm.add("(min-width: 1024px)", () => {
        gsap.set([title, desc], { filter: "blur(2px)" });
        gsap.set(cards, { filter: "blur(2px)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power3.out" },
        });

        tl.to(title, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, 0)
          .to(desc, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 0.12)
          .to(
            cards,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.65,
              stagger: 0.12,
            },
            0.22
          );

        cards.forEach((card) => {
          const onEnter = () =>
            gsap.to(card, { y: -8, duration: 0.25, ease: "power2.out" });
          const onLeave = () =>
            gsap.to(card, { y: 0, duration: 0.25, ease: "power2.out" });

          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
        });

        return () => {};
      });

      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power3.out" },
        });

        tl.to(title, { opacity: 1, y: 0, duration: 0.5 }, 0)
          .to(desc, { opacity: 1, y: 0, duration: 0.45 }, 0.1)
          .to(
            cards,
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
            0.18
          );

        return () => {};
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="servicos" ref={rootRef} className="bg-white py-20">
      <div className="maxW">
        <h2
          data-title
          className="font-bold text-Verdedark text-2xl text-center lg:text-left font-primary max-w-[900px] lg:text-5xl"
        >
          Uma clinica pensada para reunir em um so lugar o que sua rotina mais
          precisa:{" "}
          <span className="text-Azulmedio">consulta, exames e acompanhamento.</span>
        </h2>

        <p
          data-desc
          className="mt-6 text-Graylight lg:max-w-[700px] text-center lg:text-left"
        >
          A IntegraMed nasceu para oferecer mais praticidade, seguranca e
          proximidade no cuidado com a saude. Aqui, o paciente encontra
          atendimento medico humanizado, solicitacao de exames e suporte para as
          necessidades mais comuns do dia a dia, inclusive com home care.
        </p>

        <article className="flex flex-col mt-20 gap-8 justify-center mx-auto lg:flex-row lg:max-w-[1200px]">
          <div data-card className="bg-[#EDF9FC] rounded-xl px-8 py-10 lg:w-1/3">
            <p className="text-Verdedark">Clinica geral</p>
            <h2 className="font-primary mt-30 text-Verdedark text-2xl font-semibold">
              Consultas para o cuidado do dia a dia
            </h2>
            <div className="border-b border-Verdedark my-10" />
            <p className="text-Graylight">
              Atendimento para sintomas clinicos, check-ups, avaliacao de
              queixas recorrentes, renovacao de condutas e acompanhamento com
              olhar atento para cada paciente.
            </p>
          </div>

          <div
            data-card
            className="bgCards rounded-xl px-8 py-10 lg:w-1/3 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#008cf3] opacity-80 rounded-xl" />

            <div className="relative z-10">
              <p className="text-white">Exames e prevencao</p>
              <h2 className="font-primary mt-30 text-white text-2xl font-semibold">
                Mais praticidade para solicitar e acompanhar exames
              </h2>
              <div className="border-b border-white my-10" />
              <p className="text-white">
                Hemograma, glicemia, colesterol, hormonios, vitaminas e outros
                exames laboratoriais para investigacao, check-up e monitoramento
                da sua saude com mais agilidade.
              </p>
            </div>
          </div>

          <div data-card className="bg-Verdedark rounded-xl px-8 py-10 lg:w-1/3">
            <p className="text-white">Home care</p>
            <h2 className="font-primary mt-30 text-white text-2xl font-semibold">
              Atendimento em domicilio com mais conforto e seguranca
            </h2>
            <div className="border-b border-white my-10" />
            <p className="text-Graylight">
              Para quem precisa de acompanhamento mais proximo, a IntegraMed
              tambem oferece home care, levando atendimento medico ate voce
              quando necessario.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
