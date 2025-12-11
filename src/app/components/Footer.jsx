"use client";

import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaQrcode,
  FaTiktok,
} from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useTranslations } from "next-intl";
import QRModal from "./QRModal";

const Footer = () => {
  const t = useTranslations("Footer");
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleQRClick = () => {
    setIsQRModalOpen(true);
  };

  const handleCloseQRModal = () => {
    setIsQRModalOpen(false);
  };

  return (
    <footer className="footerSection">
      <div className="container mx-auto px-4">
        <div className="footerTop">
          <div className="footerCopyright">
            <p>
              {t("copyright")}
             
            </p>
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
            <button
              onClick={handleQRClick}
              className="footerSocialIcon"
              type="button"
            >
              <FaQrcode />
            </button>
          </div>
        </div>

        <div className="footerBottom">
        <span className="developerCredit" dir="rtl">
                &nbsp;&nbsp; تصميم وبرمجة &nbsp;
                <a
                  href="https://www.facebook.com/ENSEGYPTEG"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ENS
                </a>
              </span>        </div>
        
      </div>

      <QRModal isOpen={isQRModalOpen} onClose={handleCloseQRModal} />
      
    </footer>
  );
};

export default Footer;
