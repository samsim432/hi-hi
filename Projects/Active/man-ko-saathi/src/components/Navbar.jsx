import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaLeaf, FaExclamationTriangle } from "react-icons/fa";
import logo from "../assets/logo1.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Resources", path: "/resources" },
    { name: "Emergency Help", path: "/emergency-help", emergency: true },
  ];

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setCompact(true);
        setOpen(false);
      }

      if (currentScrollY < lastScrollY || currentScrollY < 40) {
        setCompact(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      ref={navRef}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        compact ? "px-4 pt-4" : "px-3 pt-3"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 ${
          compact
            ? "h-14 bg-transparent shadow-none"
            : "h-16 rounded-[2rem] border border-white/50 bg-white/75 px-4 shadow-[0_14px_45px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:px-6 lg:px-8"
        }`}
      >
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
          aria-label="Go to homepage"
        >
          <div
            className={`flex items-center justify-center overflow-hidden transition-all duration-300 ${
              compact
                ? "h-12 w-12 rounded-2xl bg-white/80 shadow-lg backdrop-blur-2xl"
                : "h-14 w-14 rounded-2xl bg-white/70 shadow-sm"
            }`}
          >
            <img
              src={logo}
              alt="Man Ko Saathi Logo"
              className="h-12 w-12 object-contain"
            />
          </div>

          {!compact && (
            <div className="leading-tight">
              <h1 className="text-base font-extrabold text-slate-900 sm:text-lg">
                Man Ko Saathi
              </h1>

              <p className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <FaLeaf className="text-emerald-500" />
                AI Wellness Companion
              </p>
            </div>
          )}
        </Link>

        {!compact && (
          <>
            <div className="hidden items-center gap-2 lg:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    link.emergency
                      ? `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                          isActive
                            ? "bg-red-100 text-red-700"
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`
                      : `rounded-full px-4 py-2 text-sm font-semibold transition ${
                          isActive
                            ? "bg-sky-100 text-sky-700"
                            : "text-slate-600 hover:bg-slate-100 hover:text-sky-700"
                        }`
                  }
                >
                  {link.emergency && <FaExclamationTriangle />}
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/login"
                className="rounded-full px-5 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-sky-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-700"
              >
                Start Free
              </Link>
            </div>
          </>
        )}

        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center justify-center text-slate-700 transition-all duration-300 lg:hidden ${
            compact
              ? "h-12 w-12 rounded-2xl bg-white/80 shadow-lg backdrop-blur-2xl"
              : "h-12 w-12 rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur-xl hover:bg-white"
          }`}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </nav>

      <div
        className={`mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/50 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition-all duration-300 lg:hidden ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-4 py-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                link.emergency
                  ? `flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${
                      isActive
                        ? "bg-red-100 text-red-700"
                        : "bg-red-50 text-red-600"
                    }`
                  : `block rounded-2xl px-4 py-3 text-sm font-bold ${
                      isActive
                        ? "bg-sky-100 text-sky-700"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
              }
            >
              {link.emergency && <FaExclamationTriangle />}
              {link.name}
            </NavLink>
          ))}

          <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2">
            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-center text-sm font-bold text-slate-700"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="rounded-2xl bg-sky-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-sky-200"
            >
              Start Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;