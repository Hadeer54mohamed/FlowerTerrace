import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();

  return (
    <section className="heroImageSection">
      <div className="container heroContainer textCenter">
        <h2 className="heroTitle">{t("heroTitle")}</h2>
        <p className="heroDescription">{t("heroDec")}</p>
        <Link href="#menu" className="heroButton">
          {t("herobtn")}
        </Link>
      </div>
    </section>
  );
}
