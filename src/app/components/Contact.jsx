"use client";

import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="contactSection">
      <div className="container mx-auto px-4">
        <h2 className="contactTitle text-center">{t("title")}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <FaMapMarkerAlt className="contactIcon" />
            <h3 className="contactSubtitle">{t("adressT")}</h3>
            <p>{t("address")}</p>
          </div>

          <div className="text-center">
            <FaPhoneAlt className="contactIcon" />
            <h3 className="contactSubtitle">{t("phoneT")}</h3>
            <p>{t("phone")}</p>
          </div>

          <div className="text-center">
            <FaEnvelope className="contactIcon" />
            <h3 className="contactSubtitle">{t("emailT")}</h3>
            <p>{t("email")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
