"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type LinkItem = {
  label: string;
  href: string;
  primary?: boolean;
};

const LINKS: LinkItem[] = [
  {
    label: "Agendar consulta",
    href: "https://wa.me/5519991149528?text=Olá%2C%20vim%20pelo%20Instagram%20da%20Clínica%20IntegraMed%20e%20gostaria%20de%20mais%20informações%20sobre%20consultas%20e%20especialidades.",
    primary: true,
  },
  {
    label: "Ver localização",
    href: "https://www.google.com/maps/search/?api=1&query=Rua+Olavo+Bilac+911+Santa+Maria+da+Serra+SP",
  },
  { label: "Visite nosso site", href: "https://clinicaintegramed.com.br" },
];

export default function LinksPageClinica() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const btnPrimaryRef = useRef<HTMLAnchorElement | null>(null);
  const btnsWrapRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, y: 20, scale: 0.985 });
      gsap.set(logoWrapRef.current, { opacity: 0, y: 10, scale: 0.98 });
      gsap.set(badgeRef.current, { opacity: 0, y: -10, scale: 0.95 });
      gsap.set(btnsWrapRef.current?.children ?? [], { opacity: 0, y: 10 });

      if (titleRef.current) {
        gsap.set(titleRef.current, { backgroundPosition: "-120% center" });
      }

      const tl = gsap.timeline({ delay: 0.12 });

      tl.to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      })
        .to(
          badgeRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "back.out(1.7)",
          },
          "-=0.28",
        )
        .to(
          logoWrapRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.2",
        )
        .to(
          btnsWrapRef.current?.children ?? [],
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.12",
        );

      if (btnPrimaryRef.current) {
        gsap.to(btnPrimaryRef.current, {
          y: -2,
          duration: 1.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.1,
        });
      }

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          backgroundPosition: "220% center",
          duration: 2.4,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 2.0,
          delay: 0.8,
        });
      }

      const buttons = Array.from(
        (btnsWrapRef.current?.querySelectorAll("a") ??
          []) as NodeListOf<HTMLAnchorElement>,
      );

      const enterHandlers: Array<() => void> = [];
      const leaveHandlers: Array<() => void> = [];

      buttons.forEach((btn) => {
        const onEnter = () =>
          gsap.to(btn, { scale: 1.03, duration: 0.18, ease: "power2.out" });
        const onLeave = () =>
          gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" });

        enterHandlers.push(onEnter);
        leaveHandlers.push(onLeave);

        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
      });

      return () => {
        buttons.forEach((btn, i) => {
          btn.removeEventListener("mouseenter", enterHandlers[i]);
          btn.removeEventListener("mouseleave", leaveHandlers[i]);
        });
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden px-6 py-2 flex items-center justify-center bg-[#070A0D]">
      <div className="absolute inset-0">
        <div className="aurora-sweep absolute inset-0 opacity-[0.22]" />

        <div className="blob blob-blue absolute -top-24 -left-24" />
        <div className="blob blob-green absolute top-1/2 -right-32 -translate-y-1/2" />
        <div className="blob blob-warm absolute -bottom-32 left-1/3" />

        <div className="noise absolute inset-0 opacity-[0.08] mix-blend-overlay" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div
          ref={cardRef}
          className="
            relative rounded-[32px] p-8 md:p-9
            border border-white/12
            bg-white/8 backdrop-blur-xl
            shadow-[0_22px_70px_rgba(0,0,0,0.55)]
          "
        >
          <div
            ref={badgeRef}
            className="
              absolute -top-4 left-1/2 -translate-x-1/2
              px-4 py-2 rounded-full
              bg-white/10 border border-white/14
              text-white/80 text-[11px] uppercase tracking-[0.22em] font-semibold text-center
              backdrop-blur-xl
            "
          >
            Clínica Multidisciplinar
          </div>

          <div ref={logoWrapRef} className="flex flex-col items-center mt-5">
            <div
              className="
                w-24 h-24 rounded-full
                bg-white/10 border border-white/15
                shadow-[0_14px_30px_rgba(0,0,0,0.35)]
                overflow-hidden
                flex items-center justify-center
              "
            >
              <img
                src="/logo.png"
                alt="Logo da clínica"
                className="w-[78%] h-[78%] object-contain"
                draggable={false}
              />
            </div>

            <h1
              ref={titleRef}
              className="
                mt-5 text-2xl md:text-[28px] font-bold uppercase text-center
                tracking-[0.14em]
                bg-gradient-to-r from-[#25B6FF] via-white to-[#FFB800]
                bg-[length:220%_100%]
                bg-clip-text text-transparent
              "
            >
              INTEGRAMED
            </h1>

            <p className="mt-2 text-sm text-white/70 text-center leading-relaxed max-w-[290px]">
              Cuidado completo com atendimento humanizado, médicos e
              especialistas em um só lugar.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-7">
            <InfoPill title="Atendimento" value="Humanizado" />
            <InfoPill title="Equipe" value="Especialistas" />
          </div>

          <div ref={btnsWrapRef} className="mt-7 flex flex-col gap-4">
            {LINKS.map((item) => (
              <LinkButton
                key={item.label}
                ref={item.primary ? btnPrimaryRef : undefined}
                text={item.label}
                href={item.href}
                primary={item.primary}
              />
            ))}

            <p className="uppercase text-center mt-4 text-white/55">
              Rua Olavo Bilac, 911, Sala 2 - Centro, Santa Maria da Serra - SP
            </p>
          </div>

          <div className="mt-7 pt-5 border-t border-white/10 text-center">
            <p className="text-xs text-white/55">
              Sua saúde com mais cuidado, praticidade e confiança.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPill({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/8 border border-white/12 px-4 py-3 text-center backdrop-blur-xl">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
        {title}
      </p>
      <span className="block mt-1 text-sm font-semibold text-white/85">
        {value}
      </span>
    </div>
  );
}

const LinkButton = React.forwardRef<
  HTMLAnchorElement,
  { text: string; href: string; primary?: boolean }
>(function LinkButton({ text, href, primary }, ref) {
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        w-full rounded-2xl py-3.5 px-5 text-center font-semibold uppercase tracking-[0.08em]
        transition-all duration-300 active:scale-95
        ${
          primary
            ? "text-[#061017] shadow-[0_16px_34px_rgba(37,182,255,0.18)] bg-gradient-to-r from-[#25B6FF] via-[#46E6B0] to-[#FFB800]"
            : "bg-white/8 text-white/85 border border-white/12 hover:bg-white/12"
        }
      `}
    >
      {text}
    </a>
  );
});