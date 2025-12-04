import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { generateSEO, generatePersonJsonLd } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = generateSEO({ locale: "en", path: "/" });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generatePersonJsonLd("en");

  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-indigo-500/30">
        <div className="relative w-full overflow-x-hidden">
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl" />
            <div className="absolute -bottom-1/2 right-0 h-[800px] w-[800px] rounded-full bg-gradient-to-t from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl" />
          </div>
          
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
