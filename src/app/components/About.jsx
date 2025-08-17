"use client";

import React from "react";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("About");

  return (
    <section id="about" className="aboutSection">
      <div className="container mx-auto px-4">
        <h2 className="aboutTitle text-center">{t("title")}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="images/test.jpg"
              alt="صورة داخلية للمطعم"
              className="aboutImage"
            />
          </div>
          <div className="aboutTextContainer">
            <p className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🍽️</span>
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
