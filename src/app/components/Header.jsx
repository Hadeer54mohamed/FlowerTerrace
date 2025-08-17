"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FiMenu, FiX, FiHome, FiInfo, FiPhone } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const locale = useLocale();
  const t = useTranslations("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header-bg  top-0   text-white z-50">
      <div className=" mx-auto  items-center">
        <nav
          className={`desktop-nav hidden md:flex items-center gap-8 ${
            locale === "ar" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <Link href="#menu" className="nav-link">
            {t("menu")}
          </Link>
          <Link href="#about" className="nav-link">
            {t("about")}
          </Link>
          <Link href="#contact" className="nav-link">
            {t("contact")}
          </Link>
        </nav>

        <div className="navz flex ml-auto">
          <LanguageSwitcher />

          <button
            className=" md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="overlay-bg fixed inset-0 z-40"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className={`mobile-menu fixed top-0 h-full w-72 z-50 rounded-2xl overflow-hidden ${
                locale === "ar" ? "right-0" : "left-0"
              }`}
              initial={{ x: locale === "ar" ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: locale === "ar" ? "100%" : "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="mobile-header p-4 flex justify-between items-center border-b border-orange-300">
                <h2 className="text-lg font-bold">{t("header")}</h2>
                <button onClick={closeMenu} aria-label="Close menu">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <nav
                className={`mobile-nav  gap-5 p-6 text-lg font-medium ${
                  locale === "ar"
                    ? "items-end text-right"
                    : "items-start text-left"
                }`}
              >
                <Link
                  href="#menu"
                  onClick={closeMenu}
                  className="mobile-nav-link"
                >
                  <FiHome className="text-xl" />
                  {t("menu")}
                </Link>
                <Link
                  href="#about"
                  onClick={closeMenu}
                  className="mobile-nav-link"
                >
                  <FiInfo className="text-xl" />
                  {t("about")}
                </Link>
                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className="mobile-nav-link"
                >
                  <FiPhone className="text-xl" />
                  {t("contact")}
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="logo">
        <video
          src="/images/xxxxx.mp4"
          className="logo-img mr-3"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </header>
  );
}
