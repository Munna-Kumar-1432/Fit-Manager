import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  Home,
  Dumbbell,
  Calendar,
  Settings,
  Plus
} from "lucide-react";
import Link from "next/link";
import { ClerkProvider } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { dark } from '@clerk/themes';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PowerFit | Member Portal",
  description: "Track your fitness journey",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#dc2626',
          colorBackground: 'transparent',
          colorText: 'white',
          colorInputBackground: 'rgba(255, 255, 255, 0.05)',
          colorInputText: 'white',
        },
      }}
    >
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-red-500/30">

            {/* Main Content Area */}
            <main className="pb-24 lg:pb-0 lg:pl-0">
              {children}
            </main>

            {/* Bottom Navigation (Mobile/Standard) - Only show if authenticated */}
            {userId && (
              <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg glass rounded-3xl p-2 z-50 border border-white/10 shadow-2xl shadow-black/50">
                <div className="flex items-center justify-around relative">
                  <NavItem href="/" icon={<Home size={22} />} active />
                  <NavItem href="/activity" icon={<Calendar size={22} />} />

                  {/* Fab Button */}
                  <button className="relative -top-6 w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-600/40 hover:scale-110 active:scale-95 transition-all border-4 border-[#020617]">
                    <Plus size={28} />
                  </button>

                  <NavItem href="/workouts" icon={<Dumbbell size={22} />} />
                  <NavItem href="/settings" icon={<Settings size={22} />} />
                </div>
              </nav>
            )}

          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

function NavItem({ href, icon, active }: { href: string; icon: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`p-3 rounded-2xl transition-all ${active ? 'bg-red-500/10 text-red-500 shadow-inner' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
    >
      {icon}
    </Link>
  );
}
