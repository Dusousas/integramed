"use client";

import React, { useLayoutEffect, useRef } from "react";
import Navbar from "./subc/Navbar";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      header.classList.add("header-solid");
      header.classList.remove("header-glass", "header-top");

      let lastState: "top" | "glass" | "solid" = "top";
      let lastDir: 1 | -1 = 1;

      const setState = (state: "top" | "glass" | "solid") => {
        if (state === lastState) return;
        lastState = state;

        header.classList.remove("header-top", "header-glass", "header-solid");
        header.classList.add(
          state === "top" ? "header-top" : state === "glass" ? "header-glass" : "header-solid"
        );
      };

      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const y = self.scroll();
            const dir = self.direction as 1 | -1;

            if (y <= 8) {
              setState("top");
              return;
            }

            if (dir !== lastDir) lastDir = dir;

            if (dir === 1) setState("glass");
            else setState("solid");
          },
        });

        return () => st.kill();
      });

      mm.add("(max-width: 1023px)", () => {
        const st = ScrollTrigger.create({
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const y = self.scroll();
            const dir = self.direction as 1 | -1;

            if (y <= 8) {
              setState("top");
              return;
            }

            if (dir !== lastDir) lastDir = dir;

            if (dir === 1) setState("glass");
            else setState("solid");
          },
        });

        return () => st.kill();
      });

      return () => mm.revert();
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sticky top-0 z-[999] p-6 bg-transparent">
      <header
        ref={headerRef}
        className="headerBase rounded-lg px-10 py-1 flex items-center justify-between"
      >
        <div className="lg:w-1/3">
          <a
            className="text-2xl uppercase tracking-wider text-Azulmedio font-bold"
            href="/"
          >
            <img className="w-[130px]" src="/logo.png" alt="Logo da IntegraMed" />
          </a>
        </div>

        <div className="lg:w-1/3 flex justify-center items-center text-center">
          <Navbar />
        </div>

        <div className="hidden lg:w-1/3 flex gap-4 items-center justify-end text-Verdedark lg:flex">


          <a
            className="uppercase text-sm bg-Azulmedio text-white px-4 py-2 rounded-xl"
            href="https://wa.me/5515997446097"
          >
            Agende pelo WhatsApp
          </a>
        </div>
      </header>

      <style jsx global>{`
        .headerBase {
          will-change: background-color, box-shadow, backdrop-filter;
          transition: background-color 180ms ease, box-shadow 180ms ease,
            backdrop-filter 180ms ease;
          -webkit-transition: background-color 180ms ease, box-shadow 180ms ease,
            -webkit-backdrop-filter 180ms ease;
        }

        .header-top {
          background-color: rgba(255, 255, 255, 1);
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
        }

        .header-glass {
          background-color: rgba(255, 255, 255, 0.55);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .header-solid {
          background-color: rgba(255, 255, 255, 1);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
        }

        @media (max-width: 1023px) {
          .header-glass {
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </section>
  );
}
