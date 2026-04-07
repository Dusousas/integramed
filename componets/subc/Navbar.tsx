"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/" ? pathname === path : pathname.startsWith(path);

  const linkClass = (path: string) =>
    `transition hover:opacity-70 ${isActive(path) ? "text-Azulmedio " : "text-Verdedark"}`;

  return (
    <nav className="w-full">
      <div className="flex items-center justify-center">
        <ul className="hidden md:flex gap-8 font-semibold text-sm uppercase tracking-wider">
          <li>
            <Link href="/" className={linkClass("/")}>
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/#sobre" className={linkClass("/")}>
              Sobre
            </Link>
          </li>
          <li>
            <Link href="/#servicos" className={linkClass("/")}>
              Servicos
            </Link>
          </li>
          <li>
            <Link href="/blog" className={linkClass("/blog")}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/#contato" className={linkClass("/")}>
              Contato
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          {open ? <HiX className="text-Azulmedio" /> : <HiMenu className="text-Azulmedio" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200">
          <ul className="flex flex-col gap-6 px-6 py-6 text-sm uppercase tracking-wider">
            <li>
              <Link href="/" onClick={() => setOpen(false)} className={linkClass("/")}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/#sobre" onClick={() => setOpen(false)} className={linkClass("/")}>
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="/#servicos"
                onClick={() => setOpen(false)}
                className={linkClass("/")}
              >
                Servicos
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                onClick={() => setOpen(false)}
                className={linkClass("/blog")}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/#contato"
                onClick={() => setOpen(false)}
                className={linkClass("/")}
              >
                Contato
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
