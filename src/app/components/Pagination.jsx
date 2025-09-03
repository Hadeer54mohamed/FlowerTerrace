"use client";

import { useTranslations, useLocale } from "next-intl";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) {
  const t = useTranslations("");
  const locale = useLocale();
  const isRTL = locale === "ar";

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    // إذا كان العدد الكلي للصفحات أقل من أو يساوي 5، أظهر كل الصفحات
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // إظهار الصفحة الأولى دائماً
      pages.push(1);

      // إضافة ... إذا كانت الصفحة الحالية بعيدة عن البداية
      if (currentPage > 3) {
        pages.push("...");
      }

      // إضافة الصفحات المحيطة بالصفحة الحالية
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      // إضافة ... إذا كانت الصفحة الحالية بعيدة عن النهاية
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // إظهار الصفحة الأخيرة دائماً
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="pagination-wrapper">
      {/* معلومات النتائج */}
      <div className="pagination-info">
        <span>
          {t("Pagination.showing")} {startItem} - {endItem} {t("Pagination.of")}{" "}
          {totalItems} {t("Pagination.items")}
        </span>
      </div>

      {/* أزرار التنقل */}
      <div className="pagination-nav">
        {/* زر السابق */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`pagination-btn prev ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          {isRTL ? "→" : "←"}
          <span>{t("Pagination.previous")}</span>
        </button>

        {/* أرقام الصفحات */}
        <div className="pagination-numbers">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => page !== "..." && onPageChange(page)}
              disabled={page === "..."}
              className={`pagination-number ${
                page === currentPage ? "active" : ""
              } ${page === "..." ? "dots" : ""}`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* زر التالي */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`pagination-btn next ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <span>{t("Pagination.next")}</span>
          {isRTL ? "←" : "→"}
        </button>
      </div>
    </div>
  );
}

