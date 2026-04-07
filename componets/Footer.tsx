"use client";

import React from "react";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1920 80"
          className="w-full block"
        >
          <path
            fill="#ADDAEF"
            d="M40 80H0V60h40v20Zm80 0H80V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20Zm80 0h-40V60h40v20ZM80 40H40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20Zm80 0h-40V20h40v20ZM40 20H0V0h40v20Zm80 0H80V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Zm80 0h-40V0h40v20Z"
          />
        </svg>
      </div>

      <footer id="contato" className="bg-Azulmedio/10 text-[#0a2e32]">
        <div className="maxW">
          <div className="px-6 grid grid-cols-1 py-10 md:grid-cols-3 gap-12">
            <div>
          <img className="w-[140px]" src="logo1.png" alt="" />
              <p className="mt-4 text-sm text-[#0a2e32] leading-relaxed">
                Clinica geral, exames laboratoriais e home care com atendimento
                humano, responsavel e acessivel para Santa Maria da Serra e
                regiao.
              </p>
            </div>

            <div>
              <h3 className="uppercase tracking-wider font-semibold text-sm">
                Navegacao
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#0a2e32]">
                <li className="hover:text-[#0a2e32] transition">
                  <a href="/">Inicio</a>
                </li>
                <li className="hover:text-[#0a2e32] transition">
                  <a href="/#sobre">Sobre</a>
                </li>
                <li className="hover:text-[#0a2e32] transition">
                  <a href="/#servicos">Servicos</a>
                </li>
                <li className="hover:text-[#0a2e32] transition">
                  <a href="/blog">Blog</a>
                </li>
                <li className="hover:text-[#0a2e32] transition">
                  <a href="/#contato">Contato</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="uppercase tracking-wider font-semibold text-sm">
                Contato
              </h3>

              <ul className="mt-4 space-y-4 text-sm text-[#0a2e32]">
                <li className="flex items-center gap-3">
                  <FaWhatsapp />
                  <a href="https://wa.me/5515997446097">(15) 99744-6097</a>
                </li>
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt />
                  <span>Rua Olavo Bilac, 911, Sala 2 - Centro</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope />
                  <span>CEP 17370-033 - Santa Maria da Serra - SP</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-[#0a2e32]">
          IntegraMed {new Date().getFullYear()} - Todos os direitos reservados
        </div>
      </footer>
    </>
  );
}
