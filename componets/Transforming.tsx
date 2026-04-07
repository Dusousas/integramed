"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Transforming() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const items = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-tl-item]")
      );
      const line = section.querySelector<HTMLElement>("[data-tl-line]");

      if (!items.length) return;

      items.forEach((item) => {
        const imgWrap = item.querySelector<HTMLElement>("[data-tl-img]");
        const textWrap = item.querySelector<HTMLElement>("[data-tl-text]");
        const badge = item.querySelector<HTMLElement>("[data-tl-badge]");
        const img = imgWrap?.querySelector("img");

        gsap.set(item, { autoAlpha: 0, y: 20 });
        if (imgWrap) gsap.set(imgWrap, { autoAlpha: 0 });
        if (textWrap) gsap.set(textWrap, { autoAlpha: 0 });
        if (badge) gsap.set(badge, { autoAlpha: 0, scale: 0.9 });
        if (img) gsap.set(img, { scale: 1.03 });
      });

      mm.add("(min-width: 1024px)", () => {
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0, transformOrigin: "top" },
            {
              scaleY: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 0.6,
                once: true,
              },
            }
          );
        }

        items.forEach((item) => {
          const side = item.getAttribute("data-side");
          const xFrom = side === "left" ? -40 : 40;

          const imgWrap = item.querySelector<HTMLElement>("[data-tl-img]");
          const textWrap = item.querySelector<HTMLElement>("[data-tl-text]");
          const badge = item.querySelector<HTMLElement>("[data-tl-badge]");
          const img = imgWrap?.querySelector("img");

          gsap.to(item, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              once: true,
            },
          });

          if (imgWrap) {
            gsap.fromTo(
              imgWrap,
              { x: xFrom },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
                  once: true,
                },
              }
            );
          }

          if (img) {
            gsap.to(img, {
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            });
          }

          if (textWrap) {
            gsap.fromTo(
              textWrap,
              { x: -xFrom },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
                  once: true,
                },
              }
            );
          }

          if (badge) {
            gsap.to(badge, {
              scale: 1,
              autoAlpha: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
                once: true,
              },
            });
          }
        });
      });

      mm.add("(max-width: 1023px)", () => {
        items.forEach((item) => {
          const imgWrap = item.querySelector<HTMLElement>("[data-tl-img]");
          const textWrap = item.querySelector<HTMLElement>("[data-tl-text]");
          const img = imgWrap?.querySelector("img");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
            defaults: { ease: "power3.out" },
          });

          tl.to(item, { autoAlpha: 1, y: 0, duration: 0.5 }, 0);

          if (imgWrap) tl.to(imgWrap, { autoAlpha: 1, duration: 0.5 }, 0.05);
          if (img) tl.to(img, { scale: 1, duration: 0.9 }, 0.05);
          if (textWrap) tl.to(textWrap, { autoAlpha: 1, duration: 0.5 }, 0.12);
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="bg-[#F4F9FA] py-24 overflow-x-hidden lg:overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-24">
          <span className="text-Verdedark uppercase text-sm font-semibold">
            Sobre a IntegraMed
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-[#062E33] tracking-tight">
            Um cuidado mais{" "}
            <span className="text-[#1AA6B7]">completo, humano e acessivel</span>
          </h2>
        </div>

        <div className="relative">
          <div
            data-tl-line
            className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#1AA6B7]/20 -translate-x-1/2 hidden lg:block"
          />

          <div className="space-y-24 lg:space-y-32">
            <div
              data-tl-item
              data-side="left"
              className="relative flex flex-col lg:flex-row items-center"
            >
              <div
                data-tl-badge
                className="absolute left-1/2 -translate-x-1/2 z-20 hidden lg:flex"
              >
                <div className="w-10 h-10 bg-[#1AA6B7] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  1
                </div>
              </div>

              <div
                data-tl-img
                className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:pr-16 mb-10 lg:mb-0"
              >
                <div className="relative h-[380px] w-full max-w-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <Image
                    src="/integrativa1.png"
                    alt="Consulta de clinica geral"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                data-tl-text
                className="w-full lg:w-1/2 lg:pl-16 text-center lg:text-left"
              >
                <h3 className="text-3xl lg:text-4xl font-semibold text-[#062E33] mb-6">
                  Atendimento medico para a rotina real do paciente
                </h3>
                <p className="text-[#0B3B43]/60 text-lg leading-relaxed">
                  Nossa equipe ja atua ha anos em Santa Maria da Serra e conhece
                  de perto as necessidades da comunidade. Por isso, a IntegraMed
                  nasceu para oferecer consultas com escuta, criterio e
                  acompanhamento individualizado.
                </p>
              </div>
            </div>

            <div
              data-tl-item
              data-side="right"
              className="relative flex flex-col lg:flex-row items-center"
            >
              <div
                data-tl-badge
                className="absolute left-1/2 -translate-x-1/2 z-20 hidden lg:flex"
              >
                <div className="w-10 h-10 bg-[#1AA6B7] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  2
                </div>
              </div>

              <div
                data-tl-text
                className="w-full lg:w-1/2 lg:pr-16 text-center lg:text-left order-2 lg:order-1"
              >
                <h3 className="text-3xl lg:text-4xl font-semibold text-[#062E33] mb-6">
                  Consultas e exames com mais praticidade
                </h3>
                <p className="text-[#0B3B43]/60 text-lg leading-relaxed">
                  A proposta da clinica e facilitar o acesso a consultas,
                  solicitacao de exames laboratoriais e monitoramento continuo,
                  reunindo diferentes frentes do cuidado em um so lugar.
                </p>
              </div>

              <div
                data-tl-img
                className="w-full lg:w-1/2 flex justify-center lg:justify-start lg:pl-16 mb-10 lg:mb-0 order-1 lg:order-2"
              >
                <div className="relative h-[380px] w-full max-w-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <Image
                    src="/integrativa1.png"
                    alt="Exames laboratoriais e acompanhamento medico"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div
              data-tl-item
              data-side="left"
              className="relative flex flex-col lg:flex-row items-center"
            >
              <div
                data-tl-badge
                className="absolute left-1/2 -translate-x-1/2 z-20 hidden lg:flex"
              >
                <div className="w-10 h-10 bg-[#1AA6B7] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  3
                </div>
              </div>

              <div
                data-tl-img
                className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:pr-16 mb-10 lg:mb-0"
              >
                <div className="relative h-[380px] w-full max-w-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <Image
                    src="/integrativa1.png"
                    alt="Atendimento domiciliar home care"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                data-tl-text
                className="w-full lg:w-1/2 lg:pl-16 text-center lg:text-left"
              >
                <h3 className="text-3xl lg:text-4xl font-semibold text-[#062E33] mb-6">
                  Home care para quando o cuidado precisa ir ate voce
                </h3>
                <p className="text-[#0B3B43]/60 text-lg leading-relaxed">
                  Alem do atendimento presencial, a IntegraMed tambem contara
                  com home care, ampliando o suporte para pacientes que precisam
                  de conforto, praticidade e assistencia mais proxima.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
