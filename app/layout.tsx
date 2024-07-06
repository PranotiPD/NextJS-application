import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import Providers from "@/Providers";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/utils/SessionProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider session={session}>
          <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
              <Navbar />
              <Providers>
                {children}
              </Providers>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
