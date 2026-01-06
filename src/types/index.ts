export type ReactionType = 'hungry' | 'excited' | 'happy' | 'curious' | 'neutral';

// ==================== Product Types ====================
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'food' | 'toy' | 'accessory' | 'brush';
  images: string[];
  reactionType: ReactionType;
  stock: number;
  // Firestore 額外欄位
  salesCount?: number;
  viewCount?: number;
  rating?: number;
  isActive?: boolean;
  createdAt?: Date | any;
  updatedAt?: Date | any;
}

// ==================== Cart Types ====================
export interface CartItem {
  product: Product;
  quantity: number;
  addedAt?: Date | any;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Firestore 購物車格式（存儲完整商品資料）
export interface FirestoreCartItem {
  productId: string;
  productName: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
  addedAt: any; // Firestore Timestamp
}

export interface FirestoreCart {
  userId: string;
  items: FirestoreCartItem[];
  updatedAt: any; // Firestore Timestamp
}

// ==================== Pet Types ====================
export interface PetState {
  happiness: number;
  hunger: number;
  energy: number;
  currentAnimation: string;
}

export interface UserPet {
  userId: string;
  petName?: string;
  happiness: number;
  hunger: number;
  energy: number;
  totalInteractions: number;
  lastFedAt?: any; // Firestore Timestamp
  lastPlayedAt?: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

// ==================== User Types ====================
export interface Address {
  fullName: string;
  phone: string;
  postalCode?: string;
  city?: string;
  district?: string;
  address: string;  // 詳細地址
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phone?: string;
  address?: Address;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
  lastLoginAt: any; // Firestore Timestamp
  totalOrders: number;
  totalSpent: number;
}

// ==================== Order Types ====================
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
  category: 'food' | 'toy' | 'accessory' | 'brush';
  imageUrl?: string;
}

export interface Order {
  orderId: string;
  userId: string;
  orderNumber: string; // 例如：ORD-20231218-001
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
  completedAt?: any; // Firestore Timestamp
  notes?: string;
  paymentMethod?: string;
}

// ==================== Helper Types ====================
export interface CreateOrderData {
  items: CartItem[];
  shippingAddress: Address;
  notes?: string;
  paymentMethod?: string;
}
