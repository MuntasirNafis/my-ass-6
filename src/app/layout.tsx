import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "A dark, no-nonsense gym companion app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#121214] text-white min-h-screen flex flex-col justify-between`}>
        <PlanProvider>
          <div>
            <Navbar />
            <main>{children}</main>
          </div>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}