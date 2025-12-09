"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { createRating } from "../../../services/apiRatings.js";
import toast from "react-hot-toast";

const RatingForm = () => {
  const t = useTranslations("Rating");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error(t("ratingRequired") || "الرجاء اختيار تقييم");
      return;
    }

    if (!customerName.trim()) {
      toast.error(t("nameRequired") || "الرجاء إدخال الاسم");
      return;
    }

    setIsSubmitting(true);

    try {
      await createRating({
        rating,
        message: message.trim() || null,
        customer_name: customerName.trim(),
      });

      toast.success(t("success") || "شكراً لك! تم إرسال تقييمك بنجاح");
      
      // إعادة تعيين النموذج
      setRating(0);
      setCustomerName("");
      setMessage("");
    } catch (error) {
      toast.error(t("error") || "حدث خطأ أثناء إرسال التقييم");
      console.error("Error submitting rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rating" className="ratingSection py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          {t("title") || "قيم تجربتك معنا"}
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          {t("subtitle") || "نقدر رأيك ونسعى دائماً لتحسين خدماتنا"}
        </p>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3 text-right">
                {t("yourRating") || "تقييمك:"}
              </label>
              <div className="flex justify-center gap-2">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                      className="focus:outline-none transition-transform hover:scale-110"
                      aria-label={`${starValue} ${t("stars") || "نجوم"}`}
                    >
                      <FaStar
                        className={`text-4xl ${
                          starValue <= (hover || rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  );
                })}
              </div>
              {rating > 0 && (
                <p className="text-center mt-2 text-gray-600">
                  {rating} {t("stars") || "نجوم"}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="customerName"
                className="block text-gray-700 font-semibold mb-2 text-right"
              >
                {t("yourName") || "اسمك:"} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-right"
                placeholder={t("namePlaceholder") || "أدخل اسمك"}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2 text-right"
              >
                {t("yourMessage") || "رسالتك (اختياري):"}
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-right resize-none"
                placeholder={t("messagePlaceholder") || "شاركنا رأيك أو اقتراحاتك..."}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? t("submitting") || "جاري الإرسال..."
                : t("submit") || "إرسال التقييم"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RatingForm;

