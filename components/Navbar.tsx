"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsDarkMode } from "@/store/slices/global.slice";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import clsx from "clsx";
import { FaStore, FaGithub } from "react-icons/fa";

export default function Navbar() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const isDarkMode = useSelector((state: RootState) => state.global.isDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const linkClass = (path: string) =>
    clsx(
      "text-sm font-medium transition-colors",
      pathname === path
        ? "text-primary"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-8">
        
        <Link href="/" className="text-lg font-semibold flex items-center gap-2">
          <FaStore className="text-primary" />
          FakeStore
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/create-product" className={linkClass("/create-product")}>
            Create
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          asChild
          aria-label="GitHub Profile"
        >
          <a
            href="https://github.com/AshishSingh-30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={18} />
          </a>
        </Button>
      </div>
    </nav>
  );
}
