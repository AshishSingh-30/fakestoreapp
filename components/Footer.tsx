"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { FaGithub, FaStore } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsDarkMode } from "@/store/slices/global.slice";

type FooterLink = {
  label: string;
  href: string;
};

const resourceLinks: FooterLink[] = [
  { label: "Fake Store API", href: "https://fakestoreapi.com" },
  { label: "Next.js Docs", href: "https://nextjs.org/docs" },
  { label: "shadcn/ui", href: "https://ui.shadcn.com" },
  { label: "TanStack Query", href: "https://tanstack.com/query/latest" },
];

const projectLinks: FooterLink[] = [
  {
    label: "Apple Website",
    href: "https://apple-website-snowy-zeta.vercel.app/",
  },
  {
    label: "CarHub",
    href: "https://carhub-58zm.vercel.app/",
  },
  {
    label: "Perfume Store",
    href: "https://perfume-eight-wine.vercel.app/",
  },
  {
    label: "GTT Car Rental",
    href: "https://gtt-carrental.vercel.app/",
  },
];

export default function Footer() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.global.isDarkMode);

  return (
    <footer className="border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <FaStore />
            FakeStore
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            <Button variant="outline" size="icon" asChild>
              <a
                href="https://github.com/AshishSingh-30"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-2">
            Designed by{" "}
            <span className="font-medium text-foreground">Ashish Singh</span>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {resourceLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4">Client Projects</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {projectLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
