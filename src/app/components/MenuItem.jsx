import { useTranslations, useLocale } from "next-intl";

function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

function sanitizeHtmlKeepBold(html) {
  if (!html) return "";
  let result = String(html);
  // Decode non-breaking space to normal space
  result = result.replace(/&nbsp;/gi, " ");
  // Remove all tags except <b> and <strong>
  // 1) Temporarily protect <b> and <strong>
  result = result
    .replace(/<\s*strong\s*>/gi, "__STRONG_OPEN__")
    .replace(/<\s*\/\s*strong\s*>/gi, "__STRONG_CLOSE__")
    .replace(/<\s*b\s*>/gi, "__B_OPEN__")
    .replace(/<\s*\/\s*b\s*>/gi, "__B_CLOSE__");
  // 2) Strip all remaining tags
  result = result.replace(/<[^>]*>/g, "");
  // 3) Restore bold tags in minimal form
  result = result
    .replace(/__STRONG_OPEN__/g, "<b>")
    .replace(/__STRONG_CLOSE__/g, "</b>")
    .replace(/__B_OPEN__/g, "<b>")
    .replace(/__B_CLOSE__/g, "</b>");
  // Collapse excessive whitespace
  result = result.replace(/\s+/g, " ").trim();
  return result;
}

export default function MenuItem({ item, onOpenDetails, hidePrice }) {
  const t = useTranslations("");
  const locale = useLocale();

  if (!item || !item.name) return null;

  const displayName = locale === "ar" ? item.name : item.name_en || item.name;
  const displayDescription =
    locale === "ar"
      ? item.description
      : item.description_en || item.description;
  const safeDescription = sanitizeHtmlKeepBold(displayDescription);

  const hasOfferPrice = item.fullData?.sizes?.some((size) => size.offer_price);
  const firstSize = item.fullData?.sizes?.[0];

  return (
    <div className="menu-item">
      <img
        src={item.image || "/images/food.jpg"}
        alt={displayName}
        onError={(e) => (e.target.src = "/images/food.jpg")}
        className="menu-item-image"
      />

      <h3 className="menu-item-title">{displayName}</h3>

      {item.category && (
        <p className="menu-item-category">
          {locale === "ar"
            ? item.category.name_ar
            : item.category.name_en || item.category.name_ar}
        </p>
      )}

      <div
        className="menu-item-description"
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      ></div>

      {!hidePrice && (item.price || firstSize?.price) && (
        <div className="menu-item-price-container">
          {hasOfferPrice && firstSize?.offer_price && (
            <div className="menu-item-offer-price">
              {firstSize.offer_price} {t("currency")}
            </div>
          )}
          <div
            className={`menu-item-price ${
              hasOfferPrice ? "menu-price-old" : ""
            }`}
          >
            {t("priceLabel")}: {firstSize?.price || item.price} {t("currency")}
          </div>
        </div>
      )}

      <div className="menu-item-spacer"></div>

      <button onClick={() => onOpenDetails(item)} className="menu-item-button">
        {t("detailsbtn")}
      </button>
    </div>
  );
}
