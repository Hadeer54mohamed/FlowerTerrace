# كيفية استخدام أنماط الهيدر في Main Branch
## دليل سريع للتطبيق

---

## الخطوات:

### 1. نسخ ملف Header.jsx
```bash
# انسخ محتوى Header-backup.jsx إلى:
src/app/components/Header.jsx
```

### 2. إضافة أنماط CSS
لديك خياران:

#### الخيار الأول: نسخ الأنماط إلى globals.css
انسخ محتوى `header-styles.css` وأضفه إلى ملف `src/app/globals.css`

#### الخيار الثاني: استيراد ملف CSS منفصل
أضف في بداية ملف `Header.jsx`:
```jsx
import "./header-styles.css";
```
ثم انقل `header-styles.css` إلى `src/app/components/`

### 3. التأكد من المتغيرات CSS
تأكد من وجود هذه المتغيرات في `globals.css`:
```css
:root {
  --primary-color: #003824;
  --secondary-color: #ffffff;
  --accent-color: #012921;
  --accent-dark: #002011;
  --highlight-color: #003824;
  --text-light: #f5f5f5;
}
```

### 4. التأكد من الملفات المطلوبة
- ✅ `/public/images/headerbg.png` - صورة خلفية الهيدر
- ✅ `/public/images/xxxxx.mp4` - فيديو اللوجو

### 5. التأكد من المكتبات المطلوبة
```bash
npm install framer-motion react-icons
```

---

## ملاحظات مهمة:

1. **الكلاسات المستخدمة:**
   - `header-bg` - للهيدر الرئيسي
   - `logo` - لحاوية اللوجو
   - `logo-img` - للفيديو/الصورة
   - `mobile-menu` - للقائمة المحمولة
   - `overlay-bg` - للخلفية الشفافة

2. **الحركات:**
   - يستخدم `framer-motion` للانتقالات
   - القائمة المحمولة تظهر من الجانب حسب اللغة

3. **Media Queries:**
   - على الجوال: ارتفاع الهيدر 150px
   - اللوجو بحد أقصى 250px

---

## ✅ جاهز للاستخدام!

بعد تطبيق الخطوات أعلاه، الهيدر سيعمل بنفس الطريقة في main branch.

