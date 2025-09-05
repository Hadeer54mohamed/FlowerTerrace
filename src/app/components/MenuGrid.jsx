import { useEffect } from "react";
import MenuItem from "./MenuItem";
import EmptyState from "./EmptyState";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/getProducts";
import { useTranslations, useLocale } from "next-intl";

export default function MenuGrid({
  onOpenDetails,
  hidePriceOnCard,
  activeFilter,
  currentPage = 1,
  itemsPerPage = 9,
  onTotalItemsChange,
}) {
  const t = useTranslations("");
  const locale = useLocale();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const filteredProducts = (products || []).filter((p) => {
    if (!activeFilter || activeFilter === "all") return true;

    if (typeof activeFilter === "object") {
      if (p.category) {
        if (activeFilter.id && p.category.id === activeFilter.id) {
          return true;
        }
        const byAr = p.category.name_ar === activeFilter.name_ar;
        const byEn = p.category.name_en === activeFilter.name_en;
        return byAr || byEn;
      }

      const byAr =
        p.description &&
        activeFilter.name_ar &&
        p.description === activeFilter.name_ar;
      const byEn =
        p.description_en &&
        activeFilter.name_en &&
        p.description_en === activeFilter.name_en;
      return Boolean(byAr || byEn);
    }

    const desc = (p.description || "").toLowerCase();
    return desc === String(activeFilter).toLowerCase();
  });

  useEffect(() => {
    if (onTotalItemsChange) {
      onTotalItemsChange(filteredProducts.length);
    }
  }, [filteredProducts, onTotalItemsChange]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">جاري التحميل...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">
          حدث خطأ في تحميل المنتجات: {error.message}
        </div>
      </div>
    );
  }

  if (!filteredProducts || filteredProducts.length === 0) {
    return <EmptyState />;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="container text-center">
      <div className="row">
        {paginatedProducts.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <MenuItem
              item={item}
              onOpenDetails={onOpenDetails}
              hidePrice={hidePriceOnCard}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
