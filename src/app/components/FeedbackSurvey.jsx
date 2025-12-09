"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";
import { createRating } from "../../../services/apiRatings.js";
import toast from "react-hot-toast";

const FeedbackSurvey = () => {
  const t = useTranslations("Feedback");
  const locale = useLocale();
  const [ratings, setRatings] = useState({
    question1: 0,
    question2: 0,
    question3: 0,
  });
  const [hoveredQuestion, setHoveredQuestion] = useState({
    question1: 0,
    question2: 0,
    question3: 0,
  });
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      id: "question1",
      key: "question1",
      ar: "كيف تقيم جودة الطعام؟",
      en: "How do you rate the food quality?",
    },
    {
      id: "question2",
      key: "question2",
      ar: "كيف تقيم جودة الخدمة؟",
      en: "How do you rate the service quality?",
    },
    {
      id: "question3",
      key: "question3",
      ar: "كيف تقيم الجو العام؟",
      en: "How do you rate the overall atmosphere?",
    },
  ];

  const handleRatingClick = (questionKey, value) => {
    setRatings((prev) => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  const handleStarHover = (questionKey, value) => {
    setHoveredQuestion((prev) => ({
      ...prev,
      [questionKey]: value,
    }));
  };

  const handleStarLeave = (questionKey) => {
    setHoveredQuestion((prev) => ({
      ...prev,
      [questionKey]: 0,
    }));
  };

  const renderStars = (questionKey) => {
    const currentRating = ratings[questionKey];
    const hovered = hoveredQuestion[questionKey];

    return (
      <div className="flex justify-center gap-2 md:gap-3">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          const isActive = starValue <= (hovered || currentRating);

          return (
            <div
              key={starValue}
              type="button"
              onClick={() => handleRatingClick(questionKey, starValue)}
              onMouseEnter={() => handleStarHover(questionKey, starValue)}
              onMouseLeave={() => handleStarLeave(questionKey)}
              className="focus:outline-none transition-all duration-300 hover:scale-125 active:scale-110"
              aria-label={`${starValue} ${t("stars") || "نجوم"}`}
            >
              <FaStar
                className={`text-3xl md:text-5xl transition-all duration-300 ${
                  isActive
                    ? "text-yellow-400 scale-110"
                    : "text-white/90 hover:text-white"
                }`}
                style={{
                  filter: isActive
                    ? "drop-shadow(0 0 10px rgba(251, 191, 36, 0.7)) drop-shadow(0 0 5px rgba(251, 191, 36, 0.5))"
                    : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allRated = Object.values(ratings).every((rating) => rating > 0);
    if (!allRated) {
      toast.error(t("allQuestionsRequired") || "الرجاء تقييم جميع الأسئلة");
      return;
    }

    if (!customerName.trim()) {
      toast.error(t("nameRequired") || "الرجاء إدخال الاسم");
      return;
    }

    if (!phoneNumber.trim()) {
      toast.error(t("phoneRequired") || "الرجاء إدخال رقم الهاتف");
      return;
    }

    setIsSubmitting(true);

    try {
      await createRating({
        question1_rating: ratings.question1,
        question2_rating: ratings.question2,
        question3_rating: ratings.question3,
        customer_name: customerName.trim(),
        phone_number: phoneNumber.trim(),
        email: email.trim() || null,
        notes: notes.trim() || null,
      });

      toast.success(t("success") || "شكراً لك! تم إرسال استطلاعك بنجاح");

      setRatings({
        question1: 0,
        question2: 0,
        question3: 0,
      });
      setCustomerName("");
      setPhoneNumber("");
      setEmail("");
      setNotes("");
    } catch (error) {
      toast.error(t("error") || "حدث خطأ أثناء إرسال الاستطلاع");
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl relative z-10 custom-margin-top ">
        {/* Main Card */}
        <div className="rounded-2xl p-6 md:p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{
                color: "var(--secondary-color)",
                textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              {t("title") || "استطلاع رضا العملاء"}
            </h1>
            <p
              className="text-lg"
              style={{ color: "var(--text-light)", opacity: 0.9 }}
            >
              {t("subtitle") || "شاركنا رأيك لتحسين تجربتك"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Questions */}
            <div className="mt-5 mb-5">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="rounded-xl transition-all duration-300 flex  items-center justify-between gap-4 p-4 mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0, 56, 36, 0.15), rgba(0, 56, 36, 0.08))",
                    border:
                      ratings[question.key] > 0
                        ? "2px solid rgba(251, 191, 36, 0.3)"
                        : "2px solid rgba(255, 255, 255, 0.2)",
                    boxShadow:
                      ratings[question.key] > 0
                        ? "0 0 20px rgba(251, 191, 36, 0.2)"
                        : "0 4px 15px rgba(0, 56, 36, 0.1)",
                  }}
                >
                  <label
                    className="block font-semibold text-base md:text-lg flex-shrink-0"
                    style={{
                      color: "var(--text-light)",
                      textAlign: locale === "ar" ? "right" : "left",
                    }}
                  >
                    {index + 1}. {locale === "ar" ? question.ar : question.en}
                    <span className="text-red-400 mr-1">*</span>
                  </label>

                  <div className="flex flex-col items-center gap-2">
                    {renderStars(question.key)}
                    {ratings[question.key] > 0 && (
                      <p
                        className="text-center text-sm font-semibold px-3 py-1 rounded-full"
                        style={{
                          color: "var(--secondary-color)",
                          background: "rgba(251, 191, 36, 0.2)",
                          border: "1px solid rgba(251, 191, 36, 0.4)",
                        }}
                      >
                        {ratings[question.key]} {t("stars") || "نجوم"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Information */}
            <div className="rounded-xl p-6 space-y-5">
              <h3
                className="text-xl font-semibold mb-5"
                style={{
                  color: "var(--secondary-color)",
                  textAlign: locale === "ar" ? "right" : "left",
                }}
              >
                {t("customerInfo") || "معلوماتك"}
              </h3>
              <div className="flex items-center justify-between gap-2">
                <div className="w-full">
                  <label
                    htmlFor="customerName"
                    className="block font-semibold mb-2"
                    style={{
                      color: "var(--text-light)",
                      textAlign: locale === "ar" ? "right" : "left",
                    }}
                  >
                    {t("yourName") || "الاسم"}{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:scale-[1.01]"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      color: "var(--text-light)",
                      textAlign: locale === "ar" ? "right" : "left",
                      outline: "none",
                    }}
                    placeholder={t("namePlaceholder") || "أدخل اسمك"}
                    required
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--secondary-color)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255, 255, 255, 0.2)")
                    }
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="phoneNumber"
                    className="block font-semibold mb-2"
                    style={{
                      color: "var(--text-light)",
                      textAlign: locale === "ar" ? "right" : "left",
                    }}
                  >
                    {t("phoneNumber") || "رقم الهاتف"}{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:scale-[1.01]"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      color: "var(--text-light)",
                      textAlign: locale === "ar" ? "right" : "left",
                      outline: "none",
                    }}
                    placeholder={t("phonePlaceholder") || "أدخل رقم هاتفك"}
                    required
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--secondary-color)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "rgba(255, 255, 255, 0.2)")
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-semibold mb-2"
                  style={{
                    color: "var(--text-light)",
                    textAlign: locale === "ar" ? "right" : "left",
                  }}
                >
                  {t("email") || "البريد الإلكتروني"}{" "}
                  <span className="text-sm opacity-60">
                    ({t("optional") || "اختياري"})
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:scale-[1.01]"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    color: "var(--text-light)",
                    textAlign: locale === "ar" ? "right" : "left",
                    outline: "none",
                  }}
                  placeholder={
                    t("emailPlaceholder") || "أدخل بريدك الإلكتروني (اختياري)"
                  }
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--secondary-color)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255, 255, 255, 0.2)")
                  }
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block font-semibold mb-2"
                style={{
                  color: "var(--text-light)",
                  textAlign: locale === "ar" ? "right" : "left",
                }}
              >
                {t("notes") || "ملاحظات"}{" "}
                <span className="text-sm opacity-60">
                  ({t("optional") || "اختياري"})
                </span>
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:scale-[1.01] resize-none"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  color: "var(--text-light)",
                  textAlign: locale === "ar" ? "right" : "left",
                  outline: "none",
                }}
                placeholder={
                  t("notesPlaceholder") ||
                  "شاركنا أي ملاحظات أو اقتراحات إضافية..."
                }
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--secondary-color)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255, 255, 255, 0.2)")
                }
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-semibold text-white mt-2 py-4 px-6 rounded-full text-lg transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-color), var(--accent-color))",

                border: "2px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 25px rgba(0, 56, 36, 0.4)",
              }}
            >
              {isSubmitting
                ? t("submitting") || "جاري الإرسال..."
                : t("submit") || "إرسال الاستطلاع"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSurvey;
