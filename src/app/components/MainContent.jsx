"use client";

import { useState, useEffect } from "react";
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
  );
}

function ItemDetailsModal({ item, onClose, onImageClick }) {
  const t = useTranslations("");
  const locale = useLocale();

  useEffect(() => {
    if (!item) return;

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
          <img
            src={item.image || "/images/food.jpg"}
            alt={displayName}
            className="modal-image"
            onError={(e) => {
              e.currentTarget.src = "/images/food.jpg";
            }}
          />
        </div>

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
            <p className="modal-description">{stripHtml(displayDescription)}</p>
          )}

          {item.fullData?.sizes?.length > 0 && (
            <div className="modal-sizes-list">
              {item.fullData.sizes.map((size, index) => (
                <div key={index} className="modal-size-item ">
                  <div className="modal-size-info">
                    {item.fullData?.types?.[0]?.image_url && (
                      <img
                        src={item.fullData.types[0].image_url}
                        alt={
                          locale === "ar"
                            ? item.fullData.types[0].name_ar
                            : item.fullData.types[0].name_en ||
                              item.fullData.types[0].name_ar
                        }
                        className="modal-size-type-image"
                        onClick={() =>
                          onImageClick({
                            url: item.fullData.types[0].image_url,
                            name:
                              locale === "ar"
                                ? item.fullData.types[0].name_ar
                                : item.fullData.types[0].name_en ||
                                  item.fullData.types[0].name_ar,
                          })
                        }
                        onError={(e) => {
                          e.currentTarget.src = "/images/food.jpg";
                        }}
                      />
                    )}
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
          )}

          {item.price && !item.fullData?.sizes && (
            <div className="modal-single-price">
              {item.price} {t("currency")}
            </div>
          )}
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
  const itemsPerPage = 9; 

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
      <main className="min-h-screen container mx-auto ">
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
