import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IP Hub - 独立IP选型顾问平台",
  description: "中立对比多家IP供应商PPA，降低选型成本，加速决策。专注LPDDR/DDR Memory IP选型服务。",
  keywords: ["IP选型", "LPDDR5X", "Memory IP", "PHY", "Controller", "PPA对比", "芯片设计"],
  authors: [{ name: "IP Hub" }],
  openGraph: {
    title: "IP Hub - 独立IP选型顾问平台",
    description: "中立对比多家IP供应商PPA，降低选型成本，加速决策",
    type: "website",
    locale: "zh_CN",
    siteName: "IP Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "IP Hub - 独立IP选型顾问平台",
    description: "中立对比多家IP供应商PPA，降低选型成本，加速决策",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IP Hub",
  description: "独立IP选型顾问平台，中立对比多家IP供应商PPA参数",
  url: "https://iphub.com",
  logo: "https://iphub.com/logo.png",
  sameAs: [],
  offers: {
    "@type": "Offer",
    name: "Memory IP选型服务",
    description: "LPDDR5X/LPDDR5 Controller和PHY的选型咨询服务",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
