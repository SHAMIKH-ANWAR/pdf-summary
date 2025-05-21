"use client";

import Link from "next/link";
import { FileText, Menu, X } from "lucide-react";
import { 
  SignedIn, 
  SignedOut, 
  UserButton 
} from "@clerk/nextjs/client";
import PlanBadge from "./plan-badge";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
    )}>
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="font-bold flex items-center gap-1.5">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-gray-900 hover:rotate-12 transform transition-all duration-300 ease-in-out" />
            <span className="text-xl md:text-2xl text-gray-900">Resumen</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          <Link href="/#pricing" className="text-gray-700 hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          <SignedIn>
            <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 transition-colors">
              Your Summaries
            </Link>
          </SignedIn>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          <SignedIn>
            <Link 
              href="/upload" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Upload a PDF
            </Link>
            <div className="flex items-center gap-3">
              <PlanBadge />
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <SignedOut>
            <Link 
              href="/sign-in"
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-900 transition-all"
            >
              Sign in
            </Link>
            <Link 
              href="/sign-up"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              Sign up
            </Link>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center text-gray-700" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[65px] bg-white shadow-lg md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link 
            href="/#pricing" 
            className="py-3 text-gray-700 hover:text-gray-900 border-b border-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          
          <SignedIn>
            <Link 
              href="/dashboard" 
              className="py-3 text-gray-700 hover:text-gray-900 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Your Summaries
            </Link>
            <Link 
              href="/upload" 
              className="py-3 text-gray-700 hover:text-gray-900 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload a PDF
            </Link>
            <div className="py-3 flex items-center justify-between border-b border-gray-100">
              <PlanBadge />
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          
          <SignedOut>
            <div className="flex flex-col space-y-3 pt-3">
              <Link 
                href="/sign-in"
                className="py-2.5 text-center rounded-md bg-gray-100 hover:bg-gray-200 text-gray-900 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link 
                href="/sign-up"
                className="py-2.5 text-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;