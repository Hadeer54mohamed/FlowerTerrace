"use client";

import { useState, useEffect, useMemo } from "react";
import FilterBar from "./FilterBar";
import MenuGrid from "./MenuGrid";
import Pagination from "./Pagination";
import { useTranslations, useLocale } from "next-intl";

function ImageModal({ imageUrl, imageName, onClose }) {
  useEffect(() => {
    if (!imageUrl) return;

    const onEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [imageUrl, onClose]);

  if (!imageUrl) return null;

  return (
    <div
      className="image-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="image-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="image-modal-close-btn"
          aria-label="إغلاق"
        >
          &times;
        </button>

        <div className="image-modal-content">
          <img
            src={imageUrl}
            alt={imageName || "صورة"}
            className="image-modal-image"
            onError={(e) => {
              e.currentTarget.src = "/images/food.jpg";
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ItemDetailsModal({ item, onClose, onImageClick }) {
  const t = useTranslations("");
  const locale = useLocale();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = useMemo(() => {
    if (!item) return [];
    const list = [];
    if (item.image) {
      list.push({
        url: item.image,
        name: locale === "ar" ? item.name : item.name_en || item.name,
      });
    }
    if (item.fullData?.types?.length) {
      item.fullData.types.forEach((type) => {
        if (type.image_url) {
          list.push({
            url: type.image_url,
            name: locale === "ar" ? type.name_ar : type.name_en || type.name_ar,
          });
        }
      });
    }
    return list;
  }, [item, locale]);

  useEffect(() => {
    if (!item) return;
    setCurrentImageIndex(0);

    const onEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [item, onClose]);

  if (!item) return null;

  const displayName = locale === "ar" ? item.name : item.name_en || item.name;
  const displayDescription =
    locale === "ar"
      ? item.description
      : item.description_en || item.description;
  const displayType = locale === "ar" ? item.type : item.type_en || item.type;

  function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  }

  const goPrev = () => {
    if (!images.length) return;
    setCurrentImageIndex((idx) => (idx - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (!images.length) return;
    setCurrentImageIndex((idx) => (idx + 1) % images.length);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label={locale === "ar" ? "إغلاق" : "Close"}
          className="modal-close-btn"
        >
          &times;
        </button>

        <div className="modal-image-section">
          {images.length > 0 && (
            <img
              src={images[currentImageIndex]?.url || "/images/food.jpg"}
              alt={images[currentImageIndex]?.name || displayName}
              className="modal-image"
              onError={(e) => {
                e.currentTarget.src = "/images/food.jpg";
              }}
            />
          )}
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="modal-nav-btn left"
                onClick={goPrev}
                aria-label={locale === "ar" ? "السابق" : "Previous"}
              >
                {locale === "ar" ? "❮" : "❮"}
              </button>
              <button
                type="button"
                className="modal-nav-btn right"
                onClick={goNext}
                aria-label={locale === "ar" ? "التالي" : "Next"}
              >
                {locale === "ar" ? "❯" : "❯"}
              </button>
            </>
          )}
        </div>
        <div className="modal-content">
          <div className="modal-details">
            <h2 className="modal-title">{displayName}</h2>

            {item.category && (
              <p className="modal-type">
                {locale === "ar" ? "التصنيف:" : "Category:"}{" "}
                {locale === "ar"
                  ? item.category.name_ar
                  : item.category.name_en || item.category.name_ar}
              </p>
            )}

            {displayType && (
              <p className="modal-type">
                {locale === "ar" ? "النوع:" : "Type:"} {displayType}
              </p>
            )}

            {displayDescription && (
              <div
                dangerouslySetInnerHTML={{ __html: displayDescription }}
                className="modal-description"
              ></div>
            )}

            {item.fullData?.types?.length > 0 && (
              <div className="modal-types-list">
                {item.fullData.types.map((type, typeIndex) => (
                  <div key={typeIndex} className="modal-type-block">
                    <div className="modal-type-header">
                      <h3 className="modal-type-title">
                        {locale === "ar"
                          ? type.name_ar
                          : type.name_en || type.name_ar}
                      </h3>
                    </div>

                    {type.sizes?.map((size, sizeIndex) => (
                      <div key={sizeIndex} className="modal-size-item">
                        <div className="modal-size-info">
                          <span className="modal-size-name">
                            {locale === "ar"
                              ? size.size_ar
                              : size.size_en || size.size_ar}
                          </span>
                        </div>
                        <div className="modal-price-group">
                          {size.offer_price && (
                            <span className="modal-offer-price">
                              {size.offer_price} {t("currency")}
                            </span>
                          )}
                          <span
                            className={`modal-price ${
                              size.offer_price ? "modal-price-old" : ""
                            }`}
                          >
                            {size.price} {t("currency")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {item.price && !item.fullData?.sizes && (
              <div className="modal-single-price">
                {item.price} {t("currency")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MainContent() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 12;

  const openDetails = (item) => {
    setSelectedItem(item);
  };

  const closeDetails = () => {
    setSelectedItem(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTotalItemsChange = (count) => {
    setTotalItems(count);
    const totalPages = Math.ceil(count / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <main className="min-h-screen  mx-auto ">
        <FilterBar filter={filter} setFilter={setFilter} />
        <MenuGrid
          onOpenDetails={openDetails}
          hidePriceOnCard={true}
          activeFilter={filter}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onTotalItemsChange={handleTotalItemsChange}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        )}
      </main>
      <ItemDetailsModal
        item={selectedItem}
        onClose={closeDetails}
        onImageClick={setSelectedImage}
      />
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          imageName={selectedImage.name}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
