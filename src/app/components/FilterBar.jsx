"use client";

import { useTranslations, useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/getProducts";

export default function FilterBar({ filter, setFilter }) {
  const t = useTranslations("FilterBar");
  const locale = useLocale();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // استخراج تصنيفات من الوصف
  const descriptionCategories = [];
  if (Array.isArray(products)) {
    const seenKeys = new Set();
    for (const p of products) {
      const ar = (p.description || "").trim();
      const en = (p.description_en || "").trim();
      const base = (ar || en);
      if (!base) continue;
      const key = base.toLowerCase();
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      descriptionCategories.push({ name_ar: ar || en, name_en: en || ar });
    }
  }

  return (
    <section id="menu" className="filterBarSection">
      <div className="filterButtonsContainer">
        <button
          type="button"
          className={`filterButton ${filter === "all" ? "filterButtonActive" : "filterButtonInactive"}`}
          onClick={() => setFilter("all")}
        >
          {t("all")}
        </button>

        {isLoading && (
          <button type="button" className="filterButton filterButtonInactive" disabled>
            ...
          </button>
        )}

        {!isLoading && descriptionCategories.map((cat, idx) => {
          const label = locale === "ar" ? cat.name_ar : (cat.name_en || cat.name_ar);
          const isActive = typeof filter === "object" && filter?.name_ar === cat.name_ar && filter?.name_en === cat.name_en;
          return (
            <button
              key={`${idx}-${label}`}
              type="button"
              className={`filterButton ${isActive ? "filterButtonActive" : "filterButtonInactive"}`}
              onClick={() => setFilter({ name_ar: cat.name_ar, name_en: cat.name_en })}
            >
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
