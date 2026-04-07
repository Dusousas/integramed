import type { Metadata } from "next";
import { Urbanist, Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/componets/Header";
import Footer from "@/componets/Footer";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "IntegraMed | Clinica geral, exames e home care em Santa Maria da Serra",
  description:
    "Clinica IntegraMed em Santa Maria da Serra com atendimento de clinica geral, consultas, exames laboratoriais, prevencao, acompanhamento medico e home care.",
  keywords: [
    "clinica em Santa Maria da Serra",
    "clinica geral Santa Maria da Serra",
    "exames laboratoriais Santa Maria da Serra",
    "home care Santa Maria da Serra",
    "consultas medicas Santa Maria da Serra",
    "IntegraMed",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${urbanist.variable} ${mulish.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
