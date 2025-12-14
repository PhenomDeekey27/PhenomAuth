"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-deep-navy/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center gap-2">
                <div className="size-8 flex items-center justify-center rounded-lg bg-neon-purple/20 border border-neon-purple/50 text-white neon-box-glow">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    terminal
                  </span>
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-white neon-text-glow">
                  Cold Blue Neon
                </span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                onClick={() => handleNavigation("/")}
                className="border-b-2 border-neon-purple text-white px-3 py-2 text-sm font-medium"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("/features")}
                className="border-b-2 border-transparent text-white hover:border-neon-purple px-3 py-2 text-sm font-medium"
              >
                Features
              </button>
              <button
                onClick={() => handleNavigation("/pricing")}
                className="border-b-2 border-transparent text-white hover:border-neon-purple px-3 py-2 text-sm font-medium"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavigation("/docs")}
                className="border-b-2 border-transparent text-white hover:border-neon-purple px-3 py-2 text-sm font-medium"
              >
                Documentation
              </button>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Search Bar (commented out as requested) */}
            {/* <div className="relative ml-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-white/60" style={{ fontSize: '20px' }}>
                  search
                </span>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-md leading-5 bg-charcoal/50 placeholder-white/30 focus:outline-none focus:placeholder-white/60 focus:ring-1 focus:ring-neon-purple focus:border-neon-purple sm:text-sm"
                placeholder="Search..."
              />
            </div> */}
            <button
              onClick={() => handleNavigation("/auth/login")}
              className="ml-4 px-4 py-2 border border-white/20 rounded-md text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-purple"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavigation("/auth/signup")}
              className="ml-4 px-4 py-2 bg-gradient-to-r from-neon-purple to-mid-purple text-white font-medium rounded-md text-sm hover:from-light-purple hover:to-mid-purple transition-all duration-300"
            >
              Get Started
            </button>
          </div>
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neon-purple"
            >
              <span className="sr-only">Open main menu</span>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "24px" }}
              >
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() => handleNavigation("/")}
              className="block px-3 py-2 text-base font-medium text-white border-l-4 border-neon-purple bg-deep-navy/50 w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/features")}
              className="block px-3 py-2 text-base font-medium text-white border-l-4 border-transparent hover:bg-deep-navy/50 hover:border-neon-purple w-full text-left"
            >
              Features
            </button>
            <button
              onClick={() => handleNavigation("/pricing")}
              className="block px-3 py-2 text-base font-medium text-white border-l-4 border-transparent hover:bg-deep-navy/50 hover:border-neon-purple w-full text-left"
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavigation("/docs")}
              className="block px-3 py-2 text-base font-medium text-white border-l-4 border-transparent hover:bg-deep-navy/50 hover:border-neon-purple w-full text-left"
            >
              Documentation
            </button>
            <button
              onClick={() => handleNavigation("/auth/login")}
              className="block px-3 py-2 text-base font-medium text-white border-l-4 border-transparent hover:bg-deep-navy/50 hover:border-neon-purple w-full text-left"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavigation("/auth/signup")}
              className="block px-3 py-2 text-base font-medium text-white border-l-4 border-transparent hover:bg-deep-navy/50 hover:border-neon-purple w-full text-left"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
