"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../../../services/getProducts";

export default function FilterBar({ filter, setFilter }) {
  const t = useTranslations("FilterBar");
  const locale = useLocale();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

      <button
        type="button"
        className="filterToggleBtn"
        onClick={() => setIsFilterOpen((prev) => !prev)}
      >
        ☰
      </button>

      <div className={`filterButtonsContainer ${isFilterOpen ? "show" : ""}`}>
        <button
          type="button"
          className={`filterButton ${
            filter === "all" ? "filterButtonActive" : "filterButtonInactive"
          }`}
          onClick={() => setFilter("all")}
        >
          {t("all")}
        </button>
  
        {isLoading && (
          <button
            type="button"
            className="filterButton filterButtonInactive"
            disabled
          >
            ...
          </button>
        )}
  
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
                className={`filterButton filterButtonInactive`}
                onClick={() =>
                  setFilter({
                    id: cat.id,
                    name_ar: cat.name_ar,
                    name_en: cat.name_en,
                  })
                }
              >
                {label}
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
