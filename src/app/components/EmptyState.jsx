"use client";

import React from "react";
import { useTranslations } from "next-intl";

const EmptyState = () => {
  const t = useTranslations("EmptyState");

  return (
    <div id="empty-state" className="emptyStateContainer">
      <img
        src="images/test.jpg"
        alt={t("alt")}
        className="emptyStateImage"
      />
      <h3 className="emptyStateTitle">{t("title")}</h3>
      <p className="emptyStateText">{t("description")}</p>
    </div>
  );
};

export default EmptyState;
