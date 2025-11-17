"use client";

import { useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const locale = useLocale();

  return (
    <header className="header-bg top-0 text-white relative">
      <div className={`language-switcher-container ${locale === "ar" ? "lang-position-ar" : "lang-position-en"}`}>
        <LanguageSwitcher />
      </div>

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
