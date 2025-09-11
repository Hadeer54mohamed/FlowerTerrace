"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";

const QRModal = ({ isOpen, onClose }) => {
  const t = useTranslations("QRModal");

  if (!isOpen) return null;

  return (
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="qr-modal-header">
          <h3>{t("title")}</h3>
          <button className="qr-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="qr-modal-body">
          <Image
            src="/images/qr.jpg"
            alt={t("qrAlt")}
            width={300}
            height={300}
            className="qr-image"
          />
          <p className="qr-description">{t("description")}</p>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
