"use client";

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
} from "react-icons/fa";
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
            <a
              href="https://www.facebook.com/share/1E749fA751/"
              className="footerSocialIcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/flowerterrace_cafe?igsh=Z3ByejFraHBvb3ow"
              className="footerSocialIcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.snapchat.com/add/flowerterrace?share_id=nTbgRWSBkFc&locale=ar-AE"
              className="footerSocialIcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSnapchatGhost />
            </a>
            <a
              href="https://www.tiktok.com/@flowerterracecafe?_t=ZS-8yckLdImuHA&_r=1"
              className="footerSocialIcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok />
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
