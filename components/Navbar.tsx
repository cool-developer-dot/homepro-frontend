'use client';

import { Home, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthContext } from "@/context/AuthProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuthContext();
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatches by rendering after mount
  if (!mounted) {
    return <header className="h-16" />;
  }

  return (
    <header className={`sticky top-0 z-50 transition-all backdrop-blur-md bg-[#0b2a4a]/60 ring-1 ring-white/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="grid place-items-center h-9 w-9 rounded-lg bg-white text-[#0b2a4a] shadow-sm ring-1 ring-white/40">
              <Home className="h-5 w-5" />
            </span>
            <span className="text-white font-bold text-xl tracking-tight group-hover:opacity-90">
              HomePro
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 relative">
            <Link
              href="/services"
              className="text-white/90 hover:text-white inline-flex items-center gap-1 relative transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white/70 after:origin-left after:scale-x-0 after:transition-transform hover:after:scale-x-100"
            >
              Services
            </Link>
            <NavAnchor href="/#how-it-works">How It Works</NavAnchor>
            <NavAnchor href="/#about-us">About Us</NavAnchor>
            <NavAnchor href="/#contact-us">Contact</NavAnchor>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-white/90 hover:text-white inline-flex items-center relative transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white/70 after:origin-left after:scale-x-0 after:transition-transform hover:after:scale-x-100"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="text-white/90 hover:text-white inline-flex items-center relative transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white/70 after:origin-left after:scale-x-0 after:transition-transform hover:after:scale-x-100"
                >
                  Profile
                </Link>
                <button onClick={() => void logout()} className="btn-outline h-10 px-4">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-outline h-10 px-4">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary h-10 px-4 shadow-lg shadow-orange-500/20">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
             className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl text-white bg-slate-950/85 backdrop-blur-md border border-white/20 ring-1 ring-black/30 shadow-lg shadow-black/35 hover:bg-slate-900/90 active:scale-[0.97] active:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition-all duration-150"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[80]">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[88vw] max-w-[360px] bg-slate-950/95 text-white shadow-2xl ring-1 ring-white/20 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid place-items-center h-9 w-9 rounded-lg bg-white text-[#0b2a4a] shadow-sm ring-1 ring-white/40">
                  <Home className="h-5 w-5" />
                </span>
                <span className="text-white font-bold text-lg">HomePro</span>
              </div>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="h-10 w-10 grid place-items-center rounded-lg bg-white/10 hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 space-y-2">
              <Link href="/services" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 bg-white/5 hover:bg-white/10">Services</Link>
              <a
                href="/#how-it-works"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 bg-white/5 hover:bg-white/10 transition relative after:absolute after:left-4 after:right-4 after:-bottom-[1px] after:h-[2px] after:bg-white/70 after:opacity-0 after:scale-x-0 after:transition after:duration-200 hover:after:opacity-100 hover:after:scale-x-100"
              >
                How It Works
              </a>
              <a
                href="/#about-us"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 bg-white/5 hover:bg-white/10 transition relative after:absolute after:left-4 after:right-4 after:-bottom-[1px] after:h-[2px] after:bg-white/70 after:opacity-0 after:scale-x-0 after:transition after:duration-200 hover:after:opacity-100 hover:after:scale-x-100"
              >
                About Us
              </a>
              <a
                href="/#contact-us"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 bg-white/5 hover:bg-white/10 transition relative after:absolute after:left-4 after:right-4 after:-bottom-[1px] after:h-[2px] after:bg-white/70 after:opacity-0 after:scale-x-0 after:transition after:duration-200 hover:after:opacity-100 hover:after:scale-x-100"
              >
                Contact
              </a>
            </nav>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {user ? (
                <>
                  <Link href="/dashboard" className="btn-outline h-10 px-4 text-center">Dashboard</Link>
                  <Link href="/profile" className="btn-outline h-10 px-4 text-center">Profile</Link>
                  <button onClick={() => void logout()} className="btn-primary h-10 px-4 text-center">Log out</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-outline h-10 px-4 text-center">Sign In</Link>
                  <Link href="/register" className="btn-primary h-10 px-4 text-center">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavAnchor({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-white/90 hover:text-white inline-flex items-center relative transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-white/70 after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
    >
      {children}
    </a>
  );
}
