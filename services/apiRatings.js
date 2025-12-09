import supabase from "./supabase.js";

/**
 * إنشاء تقييم جديد (نظام الاستطلاع - 3 أسئلة)
 * @param {Object} ratingData - بيانات التقييم
 * @param {number} ratingData.question1_rating - جودة الطعام (1-5)
 * @param {number} ratingData.question2_rating - جودة الخدمة (1-5)
 * @param {number} ratingData.question3_rating - الجو العام (1-5)
 * @param {string} ratingData.customer_name - اسم العميل (مطلوب)
 * @param {string} ratingData.phone_number - رقم الهاتف (مطلوب)
 * @param {string} ratingData.email - البريد الإلكتروني (اختياري)
 * @param {string} ratingData.notes - الملاحظات (اختياري)
 * @returns {Promise<Object>} التقييم المُنشأ
 */
export async function createRating(ratingData) {
  const { data, error } = await supabase
    .from("ratings")
    .insert([ratingData])
    .select()
    .single();

  if (error) {
    console.error("خطأ في إنشاء التقييم:", error);
    throw new Error("تعذر حفظ التقييم");
  }

  return data;
}

/**
 * الحصول على جميع التقييمات
 * @returns {Promise<Array>} قائمة التقييمات
 */
export async function getRatings() {
  const { data, error } = await supabase
    .from("ratings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("خطأ في جلب التقييمات:", error);
    throw new Error("تعذر جلب التقييمات");
  }

  return data;
}

