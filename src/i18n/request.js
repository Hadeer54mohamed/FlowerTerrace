import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;

  // Validate that the requested locale is in our supported locales
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Additional safety check - only load valid locale files
  if (!routing.locales.includes(locale)) {
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../../messages/${routing.defaultLocale}.json`))
        .default,
    };
  }

  try {
    return {
      locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // Fallback to default locale if message file doesn't exist
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../../messages/${routing.defaultLocale}.json`))
        .default,
    };
  }
});
