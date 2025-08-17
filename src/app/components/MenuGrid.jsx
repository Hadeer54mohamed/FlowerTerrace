import MenuItem from "./MenuItem";
import EmptyState from "./EmptyState";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/getProducts";
import { useTranslations, useLocale } from "next-intl";

export default function MenuGrid({
  onOpenDetails,
  hidePriceOnCard,
  activeFilter,
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

  const filteredProducts = (products || []).filter((p) => {
    if (!activeFilter || activeFilter === "all") return true;

    if (typeof activeFilter === "object") {
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

  if (!filteredProducts || filteredProducts.length === 0) {
    return <EmptyState />;
  }

  return (<div className="container text-center">
  <div className="row">
    {filteredProducts.map((item) => (
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
