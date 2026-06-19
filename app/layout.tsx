import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Abhay Kumar Singh — Software Engineer",
    template: "%s | Abhay Kumar Singh",
  },
  description:
    "Abhay Kumar Singh — backend & full-stack engineer. Builds concurrency-safe wallets, AI automation pipelines, and real-time APIs with Python, FastAPI, and PostgreSQL.",
  keywords: [
    "Abhay Kumar Singh",
    "backend engineer",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "software engineer",
    "full-stack",
    "AI",
  ],
  authors: [{ name: "Abhay Kumar Singh" }],
  creator: "Abhay Kumar Singh",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Abhay Kumar Singh",
    title: "Abhay Kumar Singh — Software Engineer",
    description:
      "Backend & full-stack engineer. Concurrency-safe wallets, AI pipelines, real-time APIs.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Abhay Kumar Singh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhay Kumar Singh — Software Engineer",
    description:
      "Backend & full-stack engineer. Concurrency-safe wallets, AI pipelines, real-time APIs.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abhay Kumar Singh",
  email: "abhaykumar2007singh@gmail.com",
  jobTitle: "Software Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Government Engineering College, Ajmer",
  },
  sameAs: [
    "https://github.com/Abhay2007Singh",
    "https://linkedin.com/in/abhay-kumar-singh-aks",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-bg text-text antialiased">{children}</body>
    </html>
  );
}
