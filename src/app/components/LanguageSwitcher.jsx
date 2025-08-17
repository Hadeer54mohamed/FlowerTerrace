"use client";

import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1];

  const toggleLanguage = () => {
    const newLocale = currentLocale === "ar" ? "en" : "ar";
    const search = typeof window !== "undefined" ? window.location.search : "";

    router.push(`/${newLocale}${pathname.substring(3)}${search}`);
  };

  return (
    <button onClick={toggleLanguage} className="lang-btn">
      {currentLocale === "ar" ? "EN" : "AR"}
    </button>
  );
}
