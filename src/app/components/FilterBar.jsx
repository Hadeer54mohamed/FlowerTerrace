"use client";

import { useTranslations, useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../../../services/getProducts";

// أيقونات التصنيفات
const getCategoryIcon = (categoryName) => {
  const iconMap = {
    // أمثلة للأيقونات - يمكن تخصيصها حسب أسماء التصنيفات
    مشروبات: "☕",
    drinks: "☕",
    قهوة: "☕",
    coffee: "☕",
    طعام: "🍽️",
    food: "🍽️",
    حلويات: "🍰",
    desserts: "🍰",
    sweets: "🍰",
    مقبلات: "🥗",
    appetizers: "🥗",
    سلطات: "🥗",
    salads: "🥗",
    ساخن: "🔥",
    hot: "🔥",
    بارد: "🧊",
    cold: "🧊",
    شاي: "🍵",
    tea: "🍵",
    عصائر: "🥤",
    juices: "🥤",
    وجبات: "🍽️",
    meals: "🍽️",
    افطار: "🌅",
    breakfast: "🌅",
    غداء: "🌞",
    lunch: "🌞",
    عشاء: "🌙",
    dinner: "🌙",
  };

  const name = categoryName?.toLowerCase() || "";
  return iconMap[name] || "🏷️";
};

export default function FilterBar({ filter, setFilter }) {
  const t = useTranslations("FilterBar");
  const locale = useLocale();

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const isLoading = productsLoading || categoriesLoading;

  return (
    <section id="menu" className="filterBarSection">
      <div className="filterButtonsContainer">
        <button
          type="button"
          className={`filterButton enhanced-filter-btn ${
            filter === "all" ? "filterButtonActive" : "filterButtonInactive"
          }`}
          onClick={() => setFilter("all")}
          title={t("all")}
        >
          <span className="filter-icon">📋</span>
          <span className="filter-text">{t("all")}</span>
        </button>

        {isLoading && (
          <>
            {[1, 2, 3].map((i) => (
              <button
                key={`loading-${i}`}
                type="button"
                className="filterButton enhanced-filter-btn filterButtonInactive loading-skeleton"
                disabled
              >
                <span className="filter-icon loading-pulse">⏳</span>
                <span className="filter-text loading-pulse">
                  جاري التحميل...
                </span>
              </button>
            ))}
          </>
        )}

        {!isLoading &&
          categories?.map((cat, idx) => {
            const label =
              locale === "ar" ? cat.name_ar : cat.name_en || cat.name_ar;
            const isActive =
              typeof filter === "object" &&
              filter?.name_ar === cat.name_ar &&
              filter?.name_en === cat.name_en;
            const icon = getCategoryIcon(label);

            return (
              <button
                key={`${idx}-${label}`}
                type="button"
                className={`filterButton enhanced-filter-btn ${
                  isActive ? "filterButtonActive" : "filterButtonInactive"
                }`}
                onClick={() =>
                  setFilter({
                    id: cat.id,
                    name_ar: cat.name_ar,
                    name_en: cat.name_en,
                  })
                }
                title={label}
              >
                {cat.image_url ? (
                  <img
                    src={cat.image_url}
                    alt={label}
                    className="filter-category-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <span
                  className="filter-icon"
                  style={{ display: cat.image_url ? "none" : "flex" }}
                >
                  {icon}
                </span>
                <span className="filter-text">{label}</span>
              </button>
            );
          })}

        {!isLoading && (!categories || categories.length === 0) && (
          <div className="text-[#F5F5F5] text-sm opacity-75">
            لا توجد تصنيفات متاحة
          </div>
        )}
      </div>
    </section>
  );
}
