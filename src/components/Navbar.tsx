'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">IP Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              首页
            </Link>
            <Link href="/compare" className="text-slate-600 hover:text-slate-900 transition-colors">
              IP对比
            </Link>
            <Link href="/#contact" className="btn-primary text-sm py-2">
              联系咨询
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                href="/compare"
                className="text-slate-600 hover:text-slate-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                IP对比
              </Link>
              <Link
                href="/#contact"
                className="btn-primary text-center text-sm py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                联系咨询
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
