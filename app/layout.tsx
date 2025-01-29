import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import CSPostHogProvider from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pesos a Dólar | Cotizaciones en Tiempo Real y Conversor de Divisas Argentina",
  description: "Seguí al instante el valor del dólar o euro oficial y blue en Argentina. Calculá conversiones ARS/USD y ARS/EUR exactas con nuestro conversor integrado. Datos actualizados cada 5 minutos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CSPostHogProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
