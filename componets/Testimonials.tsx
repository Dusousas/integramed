"use client";

import React, { JSX, useLayoutEffect, useMemo, useRef } from "react";
import { IoIosStar } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";

gsap.registerPlugin(Draggable, InertiaPlugin);

type Testimonial = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

export default function Testimonials(): JSX.Element {
  const testimonials = useMemo<Testimonial[]>(
    () => [
      {
        name: "Eduardo Sousa",
        role: "Paciente",
        rating: 5,
        text: "Fui muito bem atendido, consegui resolver minhas queixas do dia a dia e ainda sai com orientacoes claras para seguir o tratamento.",
      },
      {
        name: "Mariana Lima",
        role: "Paciente",
        rating: 5,
        text: "Gostei da rapidez no atendimento e da forma como explicaram meus exames. Passa seguranca e muito profissionalismo.",
      },
      {
        name: "Carlos Henrique",
        role: "Paciente",
        rating: 5,
        text: "Profissionais atenciosos, clinica organizada e um cuidado realmente humano. A gente se sente acolhido do comeco ao fim.",
      },
      {
        name: "Fernanda Souza",
        role: "Paciente",
        rating: 5,
        text: "O atendimento foi objetivo, cuidadoso e muito claro. E um lugar em que voce percebe compromisso de verdade com a saude.",
      },
      {
        name: "João Pedro",
        role: "Paciente",
        rating: 5,
        text: "Ter opcao de consulta, exames e acompanhamento em um mesmo lugar facilita muito. Recomendo para toda a familia.",
      },
    ],
    []
  );

  // duplicação pra “infinite loop” no desktop
  const looped = useMemo<Testimonial[]>(
    () => [...testimonials, ...testimonials],
    [testimonials]
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // helpers
      let draggable: Draggable | null = null;
      let rafActive = false;
      let halfWidth = 0;
      let x = 0;
      const speed = 70; // px/s (desktop)

      const compute = () => {
        const totalWidth = track.scrollWidth;
        halfWidth = totalWidth / 2;
      };

      // wrap sem criar modifier custoso
      const wrapX = (value: number) => {
        if (halfWidth === 0) return 0;
        // mantém no range [-halfWidth, 0)
        const min = -halfWidth;
        const max = 0;
        const range = max - min;
        let v = value;
        while (v < min) v += range;
        while (v >= max) v -= range;
        return v;
      };

      const setX = gsap.quickSetter(track, "x", "px");

      // pausa quando sai da tela (MUITO importante)
      const io = new IntersectionObserver(
        ([entry]) => {
          rafActive = entry.isIntersecting;
        },
        { threshold: 0.15 }
      );
      io.observe(viewport);

      // ResizeObserver (melhor que window resize + loop)
      const ro = new ResizeObserver(() => {
        compute();
        x = wrapX(x);
        setX(x);
      });
      ro.observe(viewport);

      // ================
      // DESKTOP: autoplay + draggable
      // ================
      mm.add("(min-width: 1024px)", () => {
        // no desktop, tira overflow horizontal do viewport e controla via transform
        viewport.style.overflow = "hidden";

        compute();
        x = 0;
        setX(x);

        // ticker mais leve que tween com modifiers infinito
        const tick = () => {
          if (!rafActive) return;
          const dt = gsap.ticker.deltaRatio(60) / 60; // segundos aproximados
          x = wrapX(x - speed * dt);
          setX(x);
        };

        gsap.ticker.add(tick);

        // Draggable
        draggable = Draggable.create(track, {
          type: "x",
          inertia: true,
          allowContextMenu: true,
          onPress: () => {
            // pausa “autoplay” enquanto arrasta
            rafActive = false;
          },
          onDrag: () => {
            const current = Number(gsap.getProperty(track, "x"));
            x = wrapX(current);
            setX(x);
          },
          onThrowUpdate: () => {
            const current = Number(gsap.getProperty(track, "x"));
            x = wrapX(current);
            setX(x);
          },
          onRelease: () => {
            // volta autoplay se estiver visível
            rafActive = true;
          },
        })[0];

        // hover pausa só no desktop
        const onEnter = () => (rafActive = false);
        const onLeave = () => (rafActive = true);
        viewport.addEventListener("mouseenter", onEnter);
        viewport.addEventListener("mouseleave", onLeave);

        return () => {
          viewport.removeEventListener("mouseenter", onEnter);
          viewport.removeEventListener("mouseleave", onLeave);
          draggable?.kill();
          draggable = null;
          gsap.ticker.remove(tick);
          // reset
          setX(0);
        };
      });

      // ================
      // MOBILE/TABLET: scroll nativo (sem GSAP loop / sem Draggable)
      // ================
      mm.add("(max-width: 1023px)", () => {
        // no mobile, deixa o scroll nativo e zera transform
        gsap.set(track, { clearProps: "transform" });

        // garante overflow horizontal nativo
        viewport.style.overflowX = "auto";
        viewport.style.overflowY = "hidden";
        // melhora sensação no iOS
        (viewport.style as any).webkitOverflowScrolling = "touch";

        return () => {
          // nada
        };
      });

      return () => {
        ro.disconnect();
        io.disconnect();
        mm.revert();
      };
    }, viewport);

    return () => ctx.revert();
  }, [looped.length]);

  return (
    <section className="bg-white pb-20">
      <div className="maxW">
        <p className="text-Verdedark uppercase text-sm font-semibold text-center">
          Cuidado que transmite confianca
        </p>

        <h2 className="text-Verdedark text-3xl text-center mt-4 font-semibold mx-auto max-w-[900px]">
          Pacientes que buscam atendimento medico com acolhimento, clareza e
          resolucao na{" "}
          <span className="text-Azulmedio font-bold">Clinica IntegraMed.</span>
        </h2>

        {/* Carousel */}
        <div
          ref={viewportRef}
          className={[
            "mt-16 select-none touch-pan-y",
            // mobile: scroll nativo
            "overflow-x-auto lg:overflow-hidden",
            // snap no mobile (bem gostoso)
            "snap-x snap-mandatory lg:snap-none",
            // esconde scrollbar (opcional)
            "[&::-webkit-scrollbar]:hidden",
          ].join(" ")}
        >
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform lg:cursor-grab lg:active:cursor-grabbing"
          >
            {looped.map((t, index) => (
              <div
                key={`${t.name}-${index}`}
                className={[
                  "border rounded-xl py-10 px-8 shrink-0 bg-white",
                  "w-[85vw] sm:w-[420px] lg:w-[380px]",
                  // snap só no mobile
                  "snap-center lg:snap-none",
                ].join(" ")}
              >
                <div className="flex text-Azulmedio">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <IoIosStar key={i} />
                  ))}
                </div>

                <p className="text-Graylight mt-10">{t.text}</p>

                <div className="mt-6 flex gap-2 items-center">
                  <IoPersonCircle className="text-Azulmedio text-6xl" />
                  <div>
                    <p className="text-Verdedark font-semibold">{t.name}</p>
                    <p className="text-Graylight text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fade lateral (efeito premium) */}
        <div className="pointer-events-none relative mt-[-260px] h-[260px] hidden lg:block">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
