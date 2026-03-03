export interface PortionOption {
  label: string;
  price: number;
}

export interface FoodItem {
  id: string;
  title: string;
  description: string;
  category: string;
  images: { url: string; publicId: string }[];
  portionOptions: PortionOption[];
  isAvailable: boolean;
  isSpecial: boolean;
  featured: boolean;
  viewCount: number;
  createdAt: string;
}

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Ready"
  | "Completed"
  | "Cancelled";

export interface CartItem {
  foodId: string;
  title: string;
  portion: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryMethod: "Pickup" | "Delivery";
  customerName: string;
  phone: string;
  address?: string;
  status: OrderStatus;
  paymentProofUrl: string;
  createdAt: string;
}