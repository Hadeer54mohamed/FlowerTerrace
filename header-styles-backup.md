# Header Styles Documentation
## ملف توثيق أنماط الهيدر الكاملة

---

## 1. ملف Header.jsx الكامل

```jsx
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
     {/*  <div className=" mx-auto  items-center">
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
      </div> */}

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

             {/*  <nav
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
              </nav> */}
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
```

---

## 2. المتغيرات CSS المستخدمة في الهيدر

```css
:root {
  --primary-color: #003824;
  --secondary-color: #ffffff;
  --accent-color: #012921;
  --accent-dark: #002011;
  --accent-darker: #00150a;
  --highlight-color: #003824;
  --text-light: #f5f5f5;
  --text-dark: #1f2937;
  --bg-light: #fffaf5;
}
```

---

## 3. أنماط CSS الأساسية للهيدر

```css
/* Header Background */
.header-bg {
  padding: 0;
  margin: 0;
  height: 279px;
  background-image: url("/images/headerbg.png");
  background-repeat: no-repeat;
  background-position: center center;
}

/* Logo Container */
.logo {
  margin: auto;
  text-align: center;
  padding: 0;
}

/* Logo Image/Video */
.logo-img {
  margin: auto;
}

/* Header Title */
.header-title {
  font-size: 9pt;
  font-weight: normal;
  color: var(--text-light);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

/* Desktop Navigation */
.desktop-nav .nav-link {
  color: var(--text-light);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: normal;
  position: relative;
}

.desktop-nav .nav-link:hover {
  color: var(--highlight-color);
  transform: translateY(-2px);
}

.desktop-nav .nav-link::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background-color: var(--highlight-color);
  transition: width 0.3s ease;
}

.desktop-nav .nav-link:hover::after {
  width: 80%;
}

/* Nav Container */
.navz {
  display: none;
}

/* Language Button */
.lang-btn {
  padding: 0.5rem 1rem;
  background-color: var(--secondary-color);
  color: var(--text-light);
  border-radius: 0.5rem;
  font-size: 9pt;
  font-weight: normal;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.lang-btn:hover {
  background-color: var(--highlight-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Mobile Menu Overlay */
.overlay-bg {
  background-color: rgba(0, 0, 0, 0.6);
}

/* Mobile Menu */
.mobile-menu {
  background: linear-gradient(to top, var(--primary-color), var(--accent-dark));
  color: var(--text-light);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  padding: 1.5rem;
}

/* Mobile Menu Header */
.mobile-header {
  border-bottom: 1px solid var(--secondary-color);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

/* Mobile Navigation Links */
.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: var(--text-light);
  font-size: 9pt;
  font-weight: normal;
}

.mobile-nav-link:hover {
  color: var(--secondary-color);
  transform: translateX(5px);
}
```

---

## 4. Media Queries للهيدر (Mobile)

```css
@media (max-width: 767px) {
  .header-bg {
    height: 150px;
    background-size: cover;
  }
  
  .logo-img {
    max-height: 250px;
    width: auto;
  }
}
```

---

## 5. ملاحظات مهمة

### البنية الأساسية:
- الهيدر يستخدم `className="header-bg"` ككلاس رئيسي
- يحتوي على فيديو لوجو داخل `<div className="logo">`
- يستخدم `framer-motion` للحركات والانتقالات
- القائمة المحمولة (Mobile Menu) مخفية حالياً (commented out)

### الملفات المطلوبة:
- صورة الخلفية: `/images/headerbg.png`
- فيديو اللوجو: `/images/xxxxx.mp4`
- أيقونات: `react-icons/fi` (FiMenu, FiX, FiHome, FiInfo, FiPhone)

### الحركات والانتقالات:
- يستخدم `AnimatePresence` من framer-motion
- القائمة المحمولة تظهر من الجانب (يمين للعربي، يسار للإنجليزي)
- الانتقالات: `spring` مع `stiffness: 100` و `damping: 20`

### الألوان المستخدمة:
- الخلفية: صورة `headerbg.png`
- النص: `var(--text-light)` (#f5f5f5)
- الأزرار: `var(--secondary-color)` (#ffffff)
- Hover: `var(--highlight-color)` (#003824)

---

## 6. الاستخدام في Main Branch

عند تطبيق هذه الأنماط في الفرع الرئيسي:
1. انسخ كود Header.jsx
2. انسخ أنماط CSS من القسم 3
3. تأكد من وجود المتغيرات CSS من القسم 2
4. أضف Media Queries من القسم 4
5. تأكد من وجود الملفات المطلوبة (headerbg.png, xxxxx.mp4)

