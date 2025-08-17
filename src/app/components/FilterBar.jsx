"use client";

import { useTranslations, useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../../../services/getProducts";

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
console.log( "categories" + categories)
  return (
    <section id="menu" className="filterBarSection">
      <div className="filterButtonsContainer">
        {/* زر الكل */}
        <button
          type="button"
          className={`filterButton ${
            filter === "all" ? "filterButtonActive" : "filterButtonInactive"
          }`}
          onClick={() => setFilter("all")}
        >
          {t("all")}
        </button>

        {/* زر التحميل أثناء الفتش */}
        {isLoading && (
          <button
            type="button"
            className="filterButton filterButtonInactive"
            disabled
          >
            ...
          </button>
        )}

        {/* التصنيفات */}
        {!isLoading &&
          categories?.map((cat, idx) => {
            const label =
              locale === "ar" ? cat.name_ar : cat.name_en || cat.name_ar;
            const isActive =
              typeof filter === "object" &&
              filter?.name_ar === cat.name_ar &&
              filter?.name_en === cat.name_en;

            return (
              <button
                key={`${idx}-${label}`}
                type="button"
                className={`filterButton ${
                  isActive ? "filterButtonActive" : "filterButtonInactive"
                }`}
                onClick={() =>
                  setFilter({ 
                    id: cat.id,
                    name_ar: cat.name_ar, 
                    name_en: cat.name_en 
                  })
                }
              >
                {label}
              </button>
            );
          })}

        {/* رسالة عندما لا توجد تصنيفات */}
        {!isLoading && (!categories || categories.length === 0) && (
          <div className="text-[#F5F5F5] text-sm opacity-75">
            لا توجد تصنيفات متاحة
          </div>
        )}
      </div>
    </section>
  );
}
