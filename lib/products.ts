export interface Product {
  id: string
  name: { en: string; ar: string }
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  category: "interior" | "exterior" | "decorative" | "tools"
  brand: string
  colors: string[]
  coverage?: string
  finish: { en: string; ar: string }
  features: { en: string[]; ar: string[] }
  description: { en: string; ar: string }
  specifications: { en: Record<string, string>; ar: Record<string, string> }
  images: string[]
  inStock: boolean
}

export const products: Product[] = [
  {
    id: "premium-white-interior",
    name: { en: "Premium White Interior Paint", ar: "دهان داخلي أبيض فاخر" },
    price: 45.99,
    originalPrice: 52.99,
    rating: 4.8,
    reviews: 124,
    category: "interior",
    brand: "PaintPro",
    colors: ["#FFFFFF", "#F8F8FF", "#F5F5F5", "#FFFAFA"],
    coverage: "400 sq ft",
    finish: { en: "Matte", ar: "مطفي" },
    features: {
      en: ["Low VOC", "Easy Application", "Washable", "Quick Dry"],
      ar: ["منخفض المركبات العضوية", "سهل التطبيق", "قابل للغسيل", "سريع الجفاف"],
    },
    description: {
      en: "Our premium white interior paint delivers exceptional coverage and durability. Perfect for living rooms, bedrooms, and any interior space requiring a clean, fresh look.",
      ar: "يوفر دهاننا الداخلي الأبيض الفاخر تغطية استثنائية ومتانة. مثالي لغرف المعيشة وغرف النوم وأي مساحة داخلية تتطلب مظهراً نظيفاً ومنعشاً.",
    },
    specifications: {
      en: {
        Base: "Water-based",
        Coverage: "400 sq ft per gallon",
        "Dry Time": "2-4 hours",
        "Recoat Time": "4-6 hours",
        Cleanup: "Soap and water",
      },
      ar: {
        القاعدة: "مائي",
        التغطية: "400 قدم مربع لكل جالون",
        "وقت الجفاف": "2-4 ساعات",
        "وقت إعادة الطلاء": "4-6 ساعات",
        التنظيف: "صابون وماء",
      },
    },
    images: ["/paint-can-interior-premium-white.png", "/modern-living-room-with-beautiful-paint-colors--in.png"],
    inStock: true,
  },
  {
    id: "weather-resistant-blue",
    name: { en: "Weather Resistant Blue Exterior", ar: "دهان خارجي أزرق مقاوم للطقس" },
    price: 58.99,
    rating: 4.6,
    reviews: 89,
    category: "exterior",
    brand: "WeatherShield",
    colors: ["#4A90E2", "#2E5BBA", "#1E3A8A", "#3B82F6"],
    coverage: "350 sq ft",
    finish: { en: "Semi-Gloss", ar: "نصف لامع" },
    features: {
      en: ["UV Protection", "Fade Resistant", "All Weather", "10 Year Warranty"],
      ar: ["حماية من الأشعة فوق البنفسجية", "مقاوم للبهتان", "جميع الأحوال الجوية", "ضمان 10 سنوات"],
    },
    description: {
      en: "Professional-grade exterior paint designed to withstand harsh weather conditions while maintaining vibrant color for years.",
      ar: "دهان خارجي بجودة احترافية مصمم لتحمل الظروف الجوية القاسية مع الحفاظ على اللون النابض بالحياة لسنوات.",
    },
    specifications: {
      en: {
        Base: "Acrylic",
        Coverage: "350 sq ft per gallon",
        "Dry Time": "4-6 hours",
        "Recoat Time": "6-8 hours",
        "Temperature Range": "50-85°F",
      },
      ar: {
        القاعدة: "أكريليك",
        التغطية: "350 قدم مربع لكل جالون",
        "وقت الجفاف": "4-6 ساعات",
        "وقت إعادة الطلاء": "6-8 ساعات",
        "نطاق درجة الحرارة": "50-85 فهرنهايت",
      },
    },
    images: [
      "/exterior-paint-can-weather-resistant-blue.png",
      "/modern-living-room-with-beautiful-paint-colors--in.png",
    ],
    inStock: true,
  },
  {
    id: "metallic-gold-decorative",
    name: { en: "Metallic Gold Decorative Finish", ar: "طلاء ذهبي معدني ديكوري" },
    price: 78.99,
    rating: 4.9,
    reviews: 56,
    category: "decorative",
    brand: "LuxFinish",
    colors: ["#FFD700", "#FFA500", "#DAA520", "#B8860B"],
    coverage: "200 sq ft",
    finish: { en: "Metallic", ar: "معدني" },
    features: {
      en: ["Luxury Finish", "Easy Application", "Durable", "Unique Texture"],
      ar: ["لمسة فاخرة", "سهل التطبيق", "متين", "ملمس فريد"],
    },
    description: {
      en: "Create stunning accent walls and decorative features with our premium metallic gold finish that adds elegance to any space.",
      ar: "اصنع جدران مميزة وعناصر ديكورية مذهلة مع طلاءنا الذهبي المعدني الفاخر الذي يضيف الأناقة لأي مساحة.",
    },
    specifications: {
      en: {
        Base: "Specialty Metallic",
        Coverage: "200 sq ft per gallon",
        "Dry Time": "3-4 hours",
        "Recoat Time": "4-6 hours",
        Application: "Brush or Roller",
      },
      ar: {
        القاعدة: "معدني خاص",
        التغطية: "200 قدم مربع لكل جالون",
        "وقت الجفاف": "3-4 ساعات",
        "وقت إعادة الطلاء": "4-6 ساعات",
        التطبيق: "فرشاة أو رولر",
      },
    },
    images: ["/metallic-paint-finish-gold-decorative.png", "/modern-living-room-with-beautiful-paint-colors--in.png"],
    inStock: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function searchProducts(query: string, locale = "en"): Product[] {
  const searchTerm = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name[locale as keyof typeof product.name].toLowerCase().includes(searchTerm) ||
      product.description[locale as keyof typeof product.description].toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm),
  )
}
