"use client";

import { useState } from "react";
import { useLanguage } from "./language-provider";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/">HisabKitab</Link>
        </motion.div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <motion.nav
          className="hidden md:flex items-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/"
            className={`hover:text-primary transition-colors ${
              isActive("/") ? "text-primary font-medium" : ""
            }`}
          >
            {t("home")}
          </Link>
          <Link
            href="/calculator"
            className={`hover:text-primary transition-colors ${
              isActive("/calculator") ? "text-primary font-medium" : ""
            }`}
          >
            {t("calculator")}
          </Link>
          <Link
            href="/converter"
            className={`hover:text-primary transition-colors ${
              isActive("/converter") ? "text-primary font-medium" : ""
            }`}
          >
            {t("converter")}
          </Link>
          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="font-medium"
          >
            {language === "en" ? "नेपाली" : "English"}
          </Button>
          <ModeToggle />
        </motion.nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-background border-b md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                href="/"
                className={`py-2 hover:text-primary transition-colors ${
                  isActive("/") ? "text-primary font-medium" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("home")}
              </Link>
              <Link
                href="/calculator"
                className={`py-2 hover:text-primary transition-colors ${
                  isActive("/calculator") ? "text-primary font-medium" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("calculator")}
              </Link>
              <Link
                href="/converter"
                className={`py-2 hover:text-primary transition-colors ${
                  isActive("/converter") ? "text-primary font-medium" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("converter")}
              </Link>
              <div className="flex items-center justify-between pt-2 border-t">
                <Button
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="font-medium"
                >
                  {language === "en" ? "नेपाली" : "English"}
                </Button>
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
