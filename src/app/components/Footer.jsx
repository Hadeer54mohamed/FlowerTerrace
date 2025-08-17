"use client";

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="footerSection">
      <div className="container mx-auto px-4">
        <div className="footerTop">
          <div className="footerCopyright">
            <p>{t("copyright")}</p>
          </div>

          <div className="footerSocialIcons">
            <a href="#" className="footerSocialIcon">
              <FaFacebookF />
            </a>
            <a href="#" className="footerSocialIcon">
              <FaTwitter />
            </a>
            <a href="#" className="footerSocialIcon">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footerBottom">
          <p>{t("hours")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
