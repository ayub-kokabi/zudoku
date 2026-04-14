export type TranslationKey =
  | "navigation.information"
  | "navigation.endpoints"
  | "navigation.otherEndpoints"
  | "navigation.schemas"
  | "schemaInfo.contact"
  | "schemaInfo.servers"
  | "schemaInfo.tags"
  | "schemaInfo.schemas"
  | "schemaInfo.webhooks"
  | "schema.download"
  | "schema.openInNewTab"
  | "schema.copyToClipboard"
  | "ai.useInClaude"
  | "ai.useInChatGPT"
  | "openApi.endpoint"
  | "ui.poweredBy"
  | "ui.zudoku"
  | "ui.zuplo"
  | "playground.send"
  | "playground.cancel"
  | "playground.resultPanel.send"
  | "playground.hotkeyPrefix"
  | "playground.hotkeySuffix"
  | "schemaInfo.schemas.description"
  | "schemaInfo.schemas.noSchemas"
  | "toc.title"
  | "markdown.copyPage"
  | "markdown.copyLinkToPage"
  | "markdown.openMarkDownInNewTab"
  | "operation.requestBody"
  | "operation.responses"
  | "requestBody.example"
  | "response.examples"
  | "response.generatedExample"
  | "openApi.parameters.query"
  | "openApi.parameters.header"
  | "openApi.parameters.path"
  | "openApi.parameters.cookie"
  | "markdown.lastModified"
  | "search.title"
  | "search.empty"
  | "search.placeholder"
  | "search.indexing"
  | "search.navigate"
  | "search.select"
  | "search.close"
  | "search.indexing.building"
  | "search.indexing.complete"
  | "search.indexing.failed"
  | "search.indexing.title"
  | "search.indexing.success"
  | "search.indexing.error.connection"
  | "search.indexing.closeReload"
  | "search.indexing.retry"
  | "playground.BodyPanel.bodyMode.text"
  | "playground.BodyPanel.bodyMode.file"
  | "playground.BodyPanel.bodyMode.multipart"
  | "playground.BodyPanel.example.useExample"
  | "playground.authentication"
  | "playground.welcome"
  | "playground.desc"
  | "playground.dontShowMessage"
  | "playground.skip"
  | "playground.signUp"
  | "playground.login"
  | "playground.resultPanel.longRunning"
  | "playground.resultPanel.binaryContent"
  | "playground.resultPanel.responseBody"
  | "playground.resultPanel.responseHeaders"
  | "playground.resultPanel.requestHeaders"
  | "playground.resultPanel.showMore"
  | "playground.resultPanel.hideHeaders"
  | "playground.resultPanel.binaryTitle"
  | "playground.resultPanel.downloadFile"
  | "playground.resultPanel.view.formatted"
  | "playground.resultPanel.view.raw"
  | "playground.resultPanel.view.types"
  | "playground.resultPanel.audio";

type Dictionary = Record<TranslationKey, string>;

const en: Dictionary = {
  "navigation.information": "Information",
  "navigation.endpoints": "Endpoints",
  "navigation.otherEndpoints": "Other endpoints",
  "navigation.schemas": "Schemas",
  "schemaInfo.contact": "Contact",
  "schemaInfo.servers": "Servers",
  "schemaInfo.tags": "Tags",
  "schemaInfo.schemas": "Schemas",
  "schemaInfo.webhooks": "Webhooks",
  "schema.download": "Download schema",
  "schema.openInNewTab": "Open in new tab",
  "schema.copyToClipboard": "Copy to clipboard",
  "ai.useInClaude": "Use in Claude",
  "ai.useInChatGPT": "Use in ChatGPT",
  "openApi.endpoint": "Endpoint",
  "ui.poweredBy": "powered by",
  "ui.zudoku": "Zudoku",
  "ui.zuplo": "Zuplo",
  "playground.send": "Send",
  "playground.cancel": "Cancel",
  "playground.resultPanel.send": "Send your first request",
  "playground.hotkeyPrefix": "Press",
  "playground.hotkeySuffix": "to send a request",
  "schemaInfo.schemas.description": "List of schemas used by the API.",
  "schemaInfo.schemas.noSchemas": "No schemas found",
  "toc.title": "On this page",
  "markdown.copyPage": "Copy page",
  "markdown.copyLinkToPage": "Copy link to page",
  "markdown.openMarkDownInNewTab": "Open markdown page",
  "operation.requestBody": "Request Body",
  "operation.responses": "Responses",
  "requestBody.example": "Example Request Body",
  "response.examples": "Example Responses",
  "response.generatedExample": "This example is auto-generated from the schema",
  "openApi.parameters.query": "Query Parameters",
  "openApi.parameters.header": "Headers",
  "openApi.parameters.path": "Path Parameters",
  "openApi.parameters.cookie": "Cookie Parameters",
  "markdown.lastModified": "Last modified on",
  "search.title": "Search",
  "search.empty": "Start typing to search",
  "search.placeholder": "Search...",
  "search.indexing": "Build Search Index",
  "search.navigate": "Navigate",
  "search.select": "Select",
  "search.close": "Close dialog",
  "search.indexing.building": "Building Search Index",
  "search.indexing.complete": "Indexing Complete",
  "search.indexing.failed": "Indexing Failed",
  "search.indexing.title": "Build Search Index",
  "search.indexing.success": "Successfully indexed {count} pages.",
  "search.indexing.error.connection": "Connection lost during indexing",
  "search.indexing.closeReload": "Close and reload",
  "search.indexing.retry": "Retry",
  "playground.login": "Login",
  "playground.BodyPanel.bodyMode.text": "Text",
  "playground.BodyPanel.bodyMode.file": "File",
  "playground.BodyPanel.bodyMode.multipart": "Multipart",
  "playground.BodyPanel.example.useExample": "Use Example",
  "playground.authentication": "Authentication",
  "playground.welcome": "Welcome to the Playground!",
  "playground.desc":
    "The Playground is a tool for developers to test and explore our APIs. To use the Playground, you need to login.",
  "playground.dontShowMessage": "Don't show this message again",
  "playground.skip": "Skip",
  "playground.signUp": "Sign Up",
  "playground.resultPanel.longRunning":
    "Looks like the request is taking longer than expected.",
  "playground.resultPanel.binaryContent":
    "This response contains binary data that cannot be displayed as text.",
  "playground.resultPanel.responseBody": "Response Body",
  "playground.resultPanel.responseHeaders": "Response Headers",
  "playground.resultPanel.requestHeaders": "Request Headers",
  "playground.resultPanel.showMore": "Show {count} more headers",
  "playground.resultPanel.hideHeaders": "Hide headers",
  "playground.resultPanel.binaryTitle": "Binary Content",
  "playground.resultPanel.downloadFile": "Download {fileName} ({size})",
  "playground.resultPanel.view.formatted": "Formatted",
  "playground.resultPanel.view.raw": "Raw",
  "playground.resultPanel.view.types": "Types",
  "playground.resultPanel.audio": "audio",
};

const fa: Dictionary = {
  "navigation.information": "اطلاعات",
  "navigation.endpoints": "سرویس‌ها",
  "navigation.otherEndpoints": "سایر سرویس‌ها",
  "navigation.schemas": "اسکیماها",
  "schemaInfo.contact": "تماس با ما",
  "schemaInfo.servers": "سرورها",
  "schemaInfo.tags": "تگ‌ها",
  "schemaInfo.schemas": "اسکیماها",
  "schemaInfo.webhooks": "وب‌هوک‌ها",
  "schema.download": "دانلود اسکیما",
  "schema.openInNewTab": "باز کردن در تب جدید",
  "schema.copyToClipboard": "کپی در کلیپ‌بورد",
  "ai.useInClaude": "استفاده در کلاود",
  "ai.useInChatGPT": "استفاده در چت جی‌بی‌تی",
  "openApi.endpoint": "اندپوینت",
  "ui.poweredBy": "قدرت گرفته از",
  "ui.zudoku": "زودوکو",
  "ui.zuplo": "زوپلو",
  "playground.send": "ارسال",
  "playground.cancel": "لغو",
  "playground.resultPanel.send": "اولین درخواست خود را ارسال کنید",
  "playground.hotkeyPrefix": "برای ارسال ریکوئست کلید",
  "playground.hotkeySuffix": "را فشار دهید",
  "schemaInfo.schemas.description": "لیست اسکیماهای مورد استفاده توسط ای‌پی‌آی.",
  "schemaInfo.schemas.noSchemas": "هیچ اسکیمایی یافت نشد",
  "toc.title": "در این صفحه",
  "markdown.copyPage": "کپی صفحه",
  "markdown.copyLinkToPage": "کپی لینک به صفحه",
  "markdown.openMarkDownInNewTab": "باز کردن صفحه مارک‌داون",
  "operation.requestBody": "بدنه درخواست",
  "operation.responses": "پاسخ‌ها",
  "requestBody.example": "درخواست نمونه",
  "response.examples": "پاسخ‌های نمونه",
  "response.generatedExample":
    "این مثال به صورت خودکار از اسکیمای تعریف شده ساخته شده است",
  "openApi.parameters.query": "پارامترهای کوئری",
  "openApi.parameters.header": "هدرها",
  "openApi.parameters.path": "پارامترهای مسیر",
  "openApi.parameters.cookie": "پارامترهای کوکی",
  "markdown.lastModified": "آخرین تغییر در تاریخ",
  "search.title": "جستجو",
  "search.empty": "برای جستجو شروع به تایپ کنید",
  "search.placeholder": "جستجو...",
  "search.indexing": "ساخت ایندکس جستجو",
  "search.navigate": "ناوبری",
  "search.select": "انتخاب",
  "search.close": "بستن دیالوگ",
  "search.indexing.building": "در حال ساخت ایندکس جستجو",
  "search.indexing.complete": "ایندکس‌سازی تکمیل شد",
  "search.indexing.failed": "ایندکس‌سازی با خطا مواجه شد",
  "search.indexing.title": "ساخت ایندکس جستجو",
  "search.indexing.success": "تعداد {count} صفحه با موفقیت ایندکس شد.",
  "search.indexing.error.connection": "اتصال در حین ایندکس‌سازی قطع شد",
  "search.indexing.closeReload": "بستن و بارگذاری مجدد",
  "search.indexing.retry": "تلاش مجدد",
  "playground.BodyPanel.bodyMode.text": "متن",
  "playground.BodyPanel.bodyMode.file": "فایل",
  "playground.BodyPanel.bodyMode.multipart": "چند بخشی",
  "playground.BodyPanel.example.useExample": "استفاده از مثال",
  "playground.authentication": "احراز هویت",
  "playground.welcome": "به پلی‌گراند خوش آمدید!",
  "playground.desc":
    "پلی‌گراند ابزاری برای توسعه‌دهندگان است تا به کمک آن ای‌پی‌آی های ما را تست و کاوش کنند. برای استفاده از پلی‌گراند، ابتدا باید وارد شوید.",
  "playground.dontShowMessage": "این پیام را دوباره نشان نده",
  "playground.skip": "صرف‌نظر کردن",
  "playground.signUp": "ثبت‌نام",
  "playground.login": "ورود",
  "playground.resultPanel.longRunning": "مثل اینکه زیاد طول کشید",
  "playground.resultPanel.binaryContent":
    "این پاسخ شامل داده‌های باینری است که نمی‌توان در قالب متن نشان داد.",
  "playground.resultPanel.responseBody": "بدنه پاسخ",
  "playground.resultPanel.responseHeaders": "هدرهای پاسخ",
  "playground.resultPanel.requestHeaders": "هدرهای درخواست",
  "playground.resultPanel.showMore": "نمایش {count} هدر دیگر",
  "playground.resultPanel.hideHeaders": "مخفی کردن هدرها",
  "playground.resultPanel.binaryTitle": "محتوای باینری",
  "playground.resultPanel.downloadFile": "دانلود {fileName} ({size})",
  "playground.resultPanel.view.formatted": "قالب‌بندی شده",
  "playground.resultPanel.view.raw": "خام",
  "playground.resultPanel.view.types": "تایپ‌ها",
  "playground.resultPanel.audio": "صدا",
};

const translations: Record<string, Dictionary> = {
  en,
  fa,
};

const RTL_LANGUAGES = ["fa", "ar", "he", "ur"];

export const getDirection = (lang?: string): "rtl" | "ltr" => {
  return lang && RTL_LANGUAGES.includes(lang) ? "rtl" : "ltr";
};

export const t = (
  lang: string | undefined,
  key: TranslationKey,
  fallback: string,
): string => {
  const currentLang = lang ?? "en";
  const dictionary = translations[currentLang] ?? translations.en;
  const enDictionary = translations.en as Dictionary;
  return dictionary?.[key] ?? enDictionary[key] ?? fallback;
};
