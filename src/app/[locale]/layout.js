import "../globals.css";
import { Providers } from "../components/Providers";
import { routing } from "../../i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Flower Terrace",
  description: "منيو مطعم ",
};

export default async function RootLayout({ children, params }) {
  const locale = params?.locale ?? routing.defaultLocale;
  const dir = locale === "ar" ? "rtl" : "ltr";

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    messages = (await import(`../../../messages/ar.json`)).default;
  }

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
