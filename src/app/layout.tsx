import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog - Train With Intent",
  description: "Track your daily gym workouts and plan your routines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#121212] text-slate-100 min-h-screen flex flex-col justify-between`}>
        <PlanProvider>
          <div>
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-8 flex-1 w-full">
              {children}
            </main>
          </div>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}