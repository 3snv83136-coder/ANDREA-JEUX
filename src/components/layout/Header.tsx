"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/accueil", label: "Accueil" },
  { href: "/recherche", label: "Recherche" },
  { href: "/valorant", label: "Valorant" },
  { href: "/planning", label: "Planning" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/accueil"
          className="shrink-0 font-[family-name:var(--font-orbitron)] text-base font-bold tracking-wider text-[var(--accent-glow)] sm:text-lg"
        >
          ANDREA<span className="text-[var(--cyan)]">KING</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex lg:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition lg:px-4 ${
                pathname === link.href
                  ? "bg-violet-500/15 text-white"
                  : "text-slate-300 hover:bg-violet-500/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] text-slate-300 transition hover:border-violet-500/50 hover:text-white md:hidden"
        >
          {menuOpen ? (
            <span className="text-xl leading-none">✕</span>
          ) : (
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-[var(--border)] bg-[var(--background)] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-base font-semibold transition ${
                  pathname === link.href
                    ? "bg-violet-500/15 text-white"
                    : "text-slate-300 hover:bg-violet-500/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
