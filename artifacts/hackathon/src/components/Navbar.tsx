import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onRegisterClick?: () => void;
}

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/timeline", label: "Timeline" },
  { href: "/rules", label: "Rules" },
  { href: "/prizes", label: "Prizes" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ onRegisterClick }: NavbarProps) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-black text-2xl tracking-tighter text-blue-600">
              CodeSprint<span className="text-orange-500">2026</span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                {link.label}
              </Link>
            ))}
            <button
              onClick={onRegisterClick}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Register Now
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onRegisterClick?.(); }}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md w-full"
          >
            Register Now
          </button>
        </div>
      )}
    </nav>
  );
}
