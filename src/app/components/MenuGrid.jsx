import { useEffect, useRef, useCallback } from "react";
import MenuItem from "./MenuItem";
import EmptyState from "./EmptyState";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/getProducts";
import { useTranslations, useLocale } from "next-intl";

export default function MenuGrid({
  onOpenDetails,
  hidePriceOnCard,
  activeFilter,
  displayedItems = 12,
  onLoadMore,
}) {
  const t = useTranslations("");
  const locale = useLocale();
  const observerRef = useRef();
  const loadingRef = useRef();

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

  // إنشاء Intersection Observer لمراقبة العنصر الأخير
  const lastProductElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          displayedItems < filteredProducts.length
        ) {
          onLoadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, displayedItems, filteredProducts.length, onLoadMore]
  );

  // تنظيف Observer عند إلغاء التحميل
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

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

  // عرض المنتجات حسب العدد المحدد
  const visibleProducts = filteredProducts.slice(0, displayedItems);
  const hasMoreProducts = displayedItems < filteredProducts.length;

  return (
    <div className="menu-grid-container">
      <div className="menu-grid">
        {visibleProducts.map((item, index) => {
          // إضافة المرجع للعنصر الأخير لمراقبة التمرير
          const isLastItem = index === visibleProducts.length - 1;
          return (
            <div
              key={item.id}
              className="menu-grid-item"
              ref={isLastItem ? lastProductElementRef : null}
            >
              <MenuItem
                item={item}
                onOpenDetails={onOpenDetails}
                hidePrice={hidePriceOnCard}
              />
            </div>
          );
        })}
      </div>
      {/* مؤشر التحميل */}
      {hasMoreProducts && (
        <div ref={loadingRef} className="flex justify-center items-center py-8">
          <div className="text-lg text-gray-600">جاري تحميل المزيد...</div>
        </div>
      )}
      {/* رسالة انتهاء المنتجات */}
      {/* {!hasMoreProducts && filteredProducts.length > 0 && (
        <div className="flex justify-center items-center py-8">
          <div className="text-lg text-gray-500">تم عرض جميع المنتجات</div>
        </div>
      )} */}
    </div>
  );
}
