import { useTranslations, useLocale } from "next-intl";

export default function MenuItem({ item, onOpenDetails, hidePrice }) {
  const t = useTranslations("");
  const locale = useLocale();

  if (!item || !item.name) return null;

  const displayName = locale === "ar" ? item.name : item.name_en || item.name;
  const displayDescription =
    locale === "ar"
      ? item.description
      : item.description_en || item.description;

  const hasOfferPrice = item.fullData?.sizes?.some((size) => size.offer_price);
  const firstSize = item.fullData?.sizes?.[0];

  return (
    <div className="menu-card">
      {/* صورة المنتج */}
      <img
        src={item.image || "/images/food.jpg"}
        alt={displayName}
        onError={(e) => (e.target.src = "/images/food.jpg")}
        className="w-40 h-40 object-cover rounded-full border-2 border-[#FFD166] shadow-md mt-4"
      />

      {/* اسم المنتج */}
      <h3 className="mt-4 text-lg font-bold text-[#FFD166] text-center force-font">
        {displayName}
      </h3>

      {/* الوصف */}
      <p className="mt-2 text-sm text-[#F5F5F5] text-center line-clamp-2">
        {displayDescription || ""}
      </p>

      {/* السعر */}
      {!hidePrice && (item.price || firstSize?.price) && (
        <div className="mt-3 text-center">
          {hasOfferPrice && firstSize?.offer_price && (
            <div className="text-[#FFD166] font-semibold text-lg">
              {firstSize.offer_price} {t("currency")}
            </div>
          )}
          <div className="text-[#F5F5F5]">
            {t("priceLabel")}: {firstSize?.price || item.price} {t("currency")}
          </div>
        </div>
      )}

      {/* زر التفاصيل */}
      <button
        onClick={() => onOpenDetails(item)}
        className="mt-4 bg-[#045242] text-white px-5 py-2 rounded-full shadow hover:bg-[#012921] transition"
      >
        {t("detailsbtn")}
      </button>
    </div>
  );
}
