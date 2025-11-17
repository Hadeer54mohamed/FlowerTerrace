"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const search = window.location.search;
      
      // Remove current locale from path and add new locale
      const pathWithoutLocale = currentPath.replace(`/${locale}`, "") || "/";
      const newPath = `/${newLocale}${pathWithoutLocale}${search}`;
      
      window.location.href = newPath;
    }
  };

  return (
    <button onClick={toggleLanguage} className="lang-btn">
      {locale === "ar" ? "EN" : "AR"}
    </button>
  );
}
