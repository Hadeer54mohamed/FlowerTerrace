"use client";

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaQrcode,
  FaTiktok,و
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
            <a
              href="/qrcode.jpg"
              className="footerSocialIcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaQrcode />
            </a>
            <a
              href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fsearch.google.com%2Flocal%2Fwritereview%3Fplaceid%3DChIJ3_yQ7WwDLz4RD9dd-rQR-GE%26source%3Dg.page.m.ia._%26utm_source%3Dgbp%26laa%3Dnmx-review-solicitation-ia2&ifkv=AdBytiNtrrBMGu7c2tSyBOaSVPBB_zPdOF3RBkO6P5t7zi6HvdSSuhlsMO3ImLX9u78FuR1R-LOQ4g&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S337171168%3A1757592058379880"
              className="footerSocialIcon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGoogle  />
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
