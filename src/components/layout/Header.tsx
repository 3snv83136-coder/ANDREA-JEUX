import Link from "next/link";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/recherche", label: "Recherche" },
  { href: "/planning", label: "Planning" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-orbitron)] text-lg font-bold tracking-wider text-[var(--accent-glow)]"
        >
          ANDREA<span className="text-[var(--cyan)]">KING</span>
        </Link>
        <nav className="flex gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-violet-500/10 hover:text-white sm:px-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
