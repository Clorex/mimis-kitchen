// ============ MEALS ============
export interface PortionOption {
  name: string;
  weight: string;
  price: number;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  categories: string[];
  images: string[];
  spiceLevel: number;
  portions: PortionOption[];
  proteinsEnabled: boolean;
  isSoldOut: boolean;
  stockQuantity: number;
  trackStock: boolean;
  availableDays: string[];
  startTime: string;
  endTime: string;
  archived: boolean;
  createdAt: Date;
}

// ============ PROTEINS ============
export interface Protein {
  id: string;
  name: string;
  price: number;
  trackStock: boolean;
  stockQuantity: number;
  isAvailable: boolean;
  createdAt: Date;
}

// ============ SPECIALS ============
export type SpecialType = "daily" | "weekly" | "bundle";

export interface Special {
  id: string;
  title: string;
  description: string;
  type: SpecialType;
  mealIds: string[];
  oldPrice: number;
  newPrice: number;
  quantityLimit: number;
  quantityRemaining: number;
  startDate: Date;
  endDate: Date;
  hasCountdown: boolean;
  isActive: boolean;
  createdAt: Date;
}

// ============ ORDERS ============
export type PaymentStatus = "waiting_for_payment" | "payment_uploaded" | "payment_confirmed" | "rejected";
export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled";

export interface OrderItem {
  mealId: string;
  mealName: string;
  portion: string;
  price: number;
  quantity: number;
  proteins: { name: string; price: number }[];
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryType: "pickup" | "delivery";
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: "bank_transfer";
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  proofOfPaymentURL: string;
  adminNote: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderLog {
  action: string;
  timestamp: Date;
  adminUID: string;
}

// ============ ANALYTICS ============
export interface DailyAnalytics {
  date: string;
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  topMeal: string;
  topProtein: string;
}

// ============ HOMEPAGE CONFIG ============
export interface HomepageConfig {
  featuredMealIds: string[];
  specialSectionEnabled: boolean;
  instagramSectionEnabled: boolean;
  bannerText: string;
  bannerActive: boolean;
}

// ============ CART ============
export interface SelectedProtein {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  mealId: string;
  mealName: string;
  portion: string;
  price: number;
  quantity: number;
  image: string;
  proteins?: SelectedProtein[];
}

// ============ REVIEWS ============
export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}
