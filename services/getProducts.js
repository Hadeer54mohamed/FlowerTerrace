import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
        *,
        category:categories(
          id,
          name_ar,
          name_en
        ),
        types:product_types(
          *,
          sizes:product_sizes(*)
        )
      `
    )
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("فشل في جلب المنيو:", error.message);
    throw new Error("فشل في تحميل المنيو");
  }

  // تحويل البيانات لتتوافق مع الكود الحالي
  const transformedData = data.map((product) => {
    // الحصول على أول نوع وأول حجم
    const firstType =
      product.types && product.types.length > 0 ? product.types[0] : null;
    const firstSize =
      firstType && firstType.sizes && firstType.sizes.length > 0
        ? firstType.sizes[0]
        : null;

    return {
      id: product.id,
      name: product.title_ar, // استخدام العنوان العربي
      name_en: product.title_en,
      description: product.description_ar, // استخدام الوصف العربي
      description_en: product.description_en,
      image: product.image_url,
      price: firstSize ? firstSize.price : null,
      size: firstSize ? firstSize.size_ar : null,
      size_en: firstSize ? firstSize.size_en : null,
      type: firstType ? firstType.name_ar : null,
      type_en: firstType ? firstType.name_en : null,
      category: product.category
        ? {
            id: product.category.id,
            name_ar: product.category.name_ar,
            name_en: product.category.name_en,
          }
        : null,
      created_at: product.created_at,
      // حفظ البيانات الكاملة للاستخدام في النافذة المنبثقة
      fullData: {
        types: product.types,
        sizes: firstType ? firstType.sizes : [],
      },
    };
  });

  return transformedData;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      id,
      name_ar,
      name_en,
      image_url
    `
    )
    .order("name_ar");

  if (error) {
    console.error("فشل في جلب الفئات:", error.message);
    throw new Error("فشل في تحميل الفئات");
  }

  return data;
}
