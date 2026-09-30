import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "km";

const LANGUAGE_STORAGE_KEY = "selltify.language";

const khmer: Record<string, string> = {
  "Product": "ផលិតផល",
  "How it works": "របៀបដំណើរការ",
  "Pricing": "តម្លៃ",
  "FAQ": "សំណួរញឹកញាប់",
  "Sign in": "ចូលគណនី",
  "Start trial": "សាកល្បងឥតគិតថ្លៃ",
  "Built for local businesses in Cambodia": "បង្កើតឡើងសម្រាប់អាជីវកម្មក្នុងស្រុកនៅកម្ពុជា",
  "Your complete selling workflow,": "ប្រព័ន្ធលក់ពេញលេញរបស់អ្នក",
  "ready in minutes.": "រួចរាល់ក្នុងរយៈពេលតែប៉ុន្មាននាទី។",
  "Publish a branded mobile storefront, accept guest orders, manage stock and fulfillment, and stay updated through Telegram—all from one dashboard.": "បង្កើតហាងអនឡាញតាមម៉ាករបស់អ្នក ទទួលការបញ្ជាទិញ គ្រប់គ្រងស្តុក និងតាមដានព័ត៌មានតាម Telegram ទាំងអស់ពីផ្ទាំងគ្រប់គ្រងតែមួយ។",
  "Start 30-day free trial": "សាកល្បងឥតគិតថ្លៃ ៣០ ថ្ងៃ",
  "See what is included": "មើលមុខងារដែលមាន",
  "No card required · Plans from $3/month after your trial": "មិនត្រូវការកាត · គម្រោងចាប់ពី $3/ខែ បន្ទាប់ពីសាកល្បង",
  "Orders": "ការបញ្ជាទិញ",
  "Products": "ផលិតផល",
  "Analytics": "របាយការណ៍",
  "Businesses": "អាជីវកម្ម",
  "Staff": "បុគ្គលិក",
  "Simple setup": "រៀបចំងាយស្រួល",
  "Go from idea to taking orders in three steps.": "ចាប់ផ្តើមពីគំនិតរហូតដល់ទទួលការបញ្ជាទិញក្នុង ៣ ជំហាន។",
  "Create your space": "បង្កើតហាងរបស់អ្នក",
  "Add your business details, brand, products, and prices.": "បន្ថែមព័ត៌មានអាជីវកម្ម ម៉ាក ផលិតផល និងតម្លៃ។",
  "Publish and share": "ផ្សព្វផ្សាយ និងចែករំលែក",
  "Share your storefront link or restaurant table QR codes.": "ចែករំលែកតំណហាង ឬ QR Code តុភោជនីយដ្ឋាន។",
  "Manage every order": "គ្រប់គ្រងរាល់ការបញ្ជាទិញ",
  "Track payment, fulfillment, inventory, and customer updates.": "តាមដានការទូទាត់ ការរៀបចំទំនិញ ស្តុក និងព័ត៌មានអតិថិជន។",
  "One connected workflow": "ប្រព័ន្ធការងារតែមួយ",
  "Everything you need to sell online.": "អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវការសម្រាប់លក់អនឡាញ។",
  "Simple tools for the customer-facing store and the day-to-day work behind every order.": "ឧបករណ៍ងាយស្រួលសម្រាប់ហាង និងការងារប្រចាំថ្ងៃនៅពីក្រោយរាល់ការបញ្ជាទិញ។",
  "Mobile storefront": "ហាងអនឡាញលើទូរស័ព្ទ",
  "Guest ordering": "បញ្ជាទិញដោយមិនចាំបាច់ចុះឈ្មោះ",
  "Telegram workflow": "ការងារជាមួយ Telegram",
  "Catalog & inventory": "កាតាឡុក និងស្តុក",
  "Restaurant table QR": "QR Code សម្រាប់តុភោជនីយដ្ឋាន",
  "Business analytics": "របាយការណ៍អាជីវកម្ម",
  "Publish a branded store customers can open from any link and shop without creating an account.": "បង្កើតហាងតាមម៉ាកដែលអតិថិជនអាចបើកពីតំណណាមួយ និងទិញដោយមិនបង្កើតគណនី។",
  "Let customers browse, add items, and place orders from mobile in a few simple steps.": "អនុញ្ញាតឱ្យអតិថិជនមើល បន្ថែមទំនិញ និងបញ្ជាទិញតាមទូរស័ព្ទយ៉ាងងាយស្រួល។",
  "Receive new-order alerts and keep customers updated as order and payment statuses change.": "ទទួលដំណឹងការបញ្ជាទិញថ្មី និងជូនដំណឹងអតិថិជនពេលស្ថានភាពប្រែប្រួល។",
  "Keep products, categories, variants, add-ons, availability, and stock connected.": "គ្រប់គ្រងផលិតផល ប្រភេទ ជម្រើស ផ្នែកបន្ថែម និងស្តុកនៅកន្លែងតែមួយ។",
  "Give every table a QR code that opens the right menu and table ordering experience.": "ផ្តល់ QR Code សម្រាប់រាល់តុ ដើម្បីបើកម៉ឺនុយ និងបញ្ជាទិញតាមតុ។",
  "See revenue, orders, product performance, and low-stock activity in one place.": "មើលចំណូល ការបញ្ជាទិញ ប្រសិទ្ធភាពផលិតផល និងស្តុកទាបនៅកន្លែងតែមួយ។",
  "Customer to fulfillment": "ពីអតិថិជនដល់ការបំពេញការបញ្ជាទិញ",
  "Unlock productivity with smart sales tools.": "បង្កើនប្រសិទ្ធភាពជាមួយឧបករណ៍លក់ឆ្លាតវៃ។",
  "Selltify removes repetitive work between a customer discovering an item and your team completing the order.": "Selltify កាត់បន្ថយការងារដដែលៗ ចាប់ពីអតិថិជនរកឃើញផលិតផល រហូតដល់ក្រុមការងារបំពេញការបញ្ជាទិញ។",
  "Branded storefront": "ហាងតាមម៉ាករបស់អ្នក",
  "A fast, mobile-first catalog with guest checkout.": "កាតាឡុកលឿនសម្រាប់ទូរស័ព្ទ ជាមួយការទូទាត់ដោយមិនចាំបាច់ចុះឈ្មោះ។",
  "A familiar shopping experience inside Telegram.": "បទពិសោធន៍ទិញទំនិញងាយស្រួលក្នុង Telegram។",
  "Order automation": "ស្វ័យប្រវត្តិកម្មការបញ្ជាទិញ",
  "Clear statuses and notifications for every step.": "ស្ថានភាព និងការជូនដំណឹងច្បាស់លាស់នៅគ្រប់ជំហាន។",
  "Inventory awareness": "តាមដានស្តុក",
  "Availability and stock stay connected to orders.": "ទំនិញដែលមាន និងស្តុកភ្ជាប់ជាមួយការបញ្ជាទិញជានិច្ច។",
  "Simple reporting": "របាយការណ៍ងាយស្រួល",
  "Know what is selling and what needs attention.": "ដឹងថាអ្វីកំពុងលក់ដាច់ និងអ្វីត្រូវយកចិត្តទុកដាក់។",
  "A storefront that feels effortless on web and Telegram.": "ហាងអនឡាញងាយស្រួលទាំងលើវេប និង Telegram។",
  "Customers can browse and order without a Selltify account. Your catalog, stock, and order queue stay consistent across every entry point.": "អតិថិជនអាចមើល និងបញ្ជាទិញដោយមិនចាំបាច់មានគណនី Selltify។ កាតាឡុក ស្តុក និងជួរការបញ្ជាទិញត្រូវបានធ្វើសមកាលកម្មគ្រប់ទីកន្លែង។",
  "Explore Selltify": "ស្វែងយល់ពី Selltify",
  "Connected by design": "ភ្ជាប់គ្នាតាំងពីការរចនា",
  "Your essential selling tools, working together.": "ឧបករណ៍លក់សំខាន់ៗរបស់អ្នក ធ្វើការរួមគ្នា។",
  "Storefront, customer communication, operations, and reporting stay in one Selltify workflow.": "ហាង ការទំនាក់ទំនងអតិថិជន ប្រតិបត្តិការ និងរបាយការណ៍ ស្ថិតក្នុងប្រព័ន្ធ Selltify តែមួយ។",
  "Customer stories": "រឿងរ៉ាវអតិថិជន",
  "Built for real local businesses.": "បង្កើតឡើងសម្រាប់អាជីវកម្មក្នុងស្រុកពិតប្រាកដ។",
  "How sellers use Selltify to make everyday work simpler.": "របៀបដែលអ្នកលក់ប្រើ Selltify ដើម្បីធ្វើឱ្យការងារប្រចាំថ្ងៃកាន់តែងាយស្រួល។",
  "Frequently asked questions": "សំណួរដែលសួរញឹកញាប់",
  "Getting started, answered.": "ចម្លើយសម្រាប់ការចាប់ផ្តើម។",
  "Everything you need to know before opening your first Selltify store.": "អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវដឹង មុនបើកហាង Selltify ដំបូង។",
  "How do customers place an order?": "តើអតិថិជនបញ្ជាទិញដោយរបៀបណា?",
  "What happens after the 30-day trial?": "តើមានអ្វីកើតឡើងបន្ទាប់ពីសាកល្បង ៣០ ថ្ងៃ?",
  "How do Telegram notifications work?": "តើការជូនដំណឹង Telegram ដំណើរការយ៉ាងដូចម្តេច?",
  "Can I use Selltify for a restaurant?": "តើខ្ញុំអាចប្រើ Selltify សម្រាប់ភោជនីយដ្ឋានបានទេ?",
  "Do customers need a Selltify account?": "តើអតិថិជនត្រូវការគណនី Selltify ដែរឬទេ?",
  "Share your public store link. Customers can browse, add items to their cart, and check out from their phone without creating an account.": "ចែករំលែកតំណហាងរបស់អ្នក។ អតិថិជនអាចមើល បន្ថែមទំនិញក្នុងកន្ត្រក និងទូទាត់តាមទូរស័ព្ទដោយមិនបង្កើតគណនី។",
  "Your trial starts with Business features. After 30 days, choose Starter, Business, or Pro based on your catalog, staff, and business needs.": "ការសាកល្បងចាប់ផ្តើមជាមួយមុខងារ Business។ បន្ទាប់ពី ៣០ ថ្ងៃ ជ្រើស Starter, Business ឬ Pro តាមតម្រូវការអាជីវកម្មរបស់អ្នក។",
  "Connect Telegram once to receive new-order alerts and send order or payment-status updates without keeping the dashboard open.": "ភ្ជាប់ Telegram ម្តង ដើម្បីទទួលដំណឹងការបញ្ជាទិញថ្មី និងផ្ញើស្ថានភាពការបញ្ជាទិញ ឬការទូទាត់ដោយមិនចាំបាច់បើកផ្ទាំងគ្រប់គ្រង។",
  "Yes. Business and Pro support menu availability, add-ons, restaurant tables, and table QR ordering alongside the standard storefront.": "បាន។ គម្រោង Business និង Pro គាំទ្រម៉ឺនុយ ជម្រើសបន្ថែម តុភោជនីយដ្ឋាន និងការបញ្ជាទិញតាម QR Code។",
  "No. Selltify supports guest browsing and checkout, so customers can order quickly from the web or Telegram Mini App.": "មិនចាំបាច់ទេ។ Selltify អនុញ្ញាតឱ្យអតិថិជនមើល និងទូទាត់ដោយមិនមានគណនី តាមវេប ឬ Telegram Mini App។",
  "30-day Business trial": "សាកល្បង Business ៣០ ថ្ងៃ",
  "Simple pricing.": "តម្លៃងាយយល់។",
  "Built to grow with you.": "រីកចម្រើនជាមួយអ្នក។",
  "Explore every Business feature for 30 days. No card required, no setup fee, and your business data stays yours.": "សាកល្បងមុខងារ Business ទាំងអស់រយៈពេល ៣០ ថ្ងៃ។ មិនត្រូវការកាត មិនមានថ្លៃរៀបចំ ហើយទិន្នន័យជាកម្មសិទ្ធិរបស់អ្នក។",
  "Monthly": "ប្រចាំខែ",
  "Yearly": "ប្រចាំឆ្នាំ",
  "Save 17%": "សន្សំ ១៧%",
  "Most popular": "ពេញនិយមបំផុត",
  "Refresh live pricing": "ផ្ទុកតម្លៃឡើងវិញ",
  "No card required": "មិនត្រូវការកាត",
  "Cancel anytime": "បោះបង់បានគ្រប់ពេល",
  "Data preserved after expiry": "រក្សាទុកទិន្នន័យក្រោយផុតកំណត់",
  "Your trial begins with": "ការសាកល្បងរបស់អ្នកចាប់ផ្តើមជាមួយ",
  "After 30 days, select Starter, Business, or Pro to keep full access.": "បន្ទាប់ពី ៣០ ថ្ងៃ ជ្រើស Starter, Business ឬ Pro ដើម្បីបន្តប្រើមុខងារពេញលេញ។",
  "Your first 30 days are on us": "៣០ ថ្ងៃដំបូង ឥតគិតថ្លៃ",
  "Put your store online and start taking orders.": "បើកហាងអនឡាញ និងចាប់ផ្តើមទទួលការបញ្ជាទិញ។",
  "Launch a branded storefront, share your link, and manage customer orders from one simple workspace.": "បើកហាងតាមម៉ាក ចែករំលែកតំណ និងគ្រប់គ្រងការបញ្ជាទិញពីកន្លែងតែមួយ។",
  "Storefront, orders, inventory, and Telegram workflows for modern local businesses.": "ហាងអនឡាញ ការបញ្ជាទិញ ស្តុក និង Telegram សម្រាប់អាជីវកម្មទំនើបក្នុងស្រុក។",
  "Features": "មុខងារ",
  "All rights reserved.": "រក្សាសិទ្ធិគ្រប់យ៉ាង។",
  "Built for modern businesses in Cambodia.": "បង្កើតសម្រាប់អាជីវកម្មទំនើបនៅកម្ពុជា។",
  "English": "អង់គ្លេស",
  "Khmer": "ខ្មែរ",
  "Switch language": "ប្តូរភាសា",
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "en" || saved === "km") return saved;
    return window.navigator.language.toLowerCase().startsWith("km") ? "km" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language === "km" ? "km" : "en";
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    t: (text) => language === "km" ? khmer[text] ?? text : text,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// Context hooks intentionally live beside the provider to keep the language API cohesive.
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
