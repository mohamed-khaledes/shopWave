import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "ShopWave — Modern Product Store",
  description: "Discover and shop the best products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning prevents mismatch on the class attribute
    <html lang="en" suppressHydrationWarning>
      <body className="mesh-bg min-h-screen">
        <ThemeProvider>
          <StoreProvider>
            <Navbar />
            <main className="relative z-10">{children}</main>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}