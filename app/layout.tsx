import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Phenom Auth - AI Backend Generator",
  description: "Upload your frontend and get a complete backend in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body overflow-x-hidden min-h-screen relative selection:bg-neon-purple selection:text-white bg-deep-navy text-white">
        {/* Background Ambient Glows */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-deep-violet/40 rounded-full blur-[120px]"></div>
          <div className="absolute top-[20%] right-[0%] w-[40%] h-[60%] bg-neon-purple/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] bg-mid-purple/20 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 grid-bg opacity-30"></div>
        </div>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
