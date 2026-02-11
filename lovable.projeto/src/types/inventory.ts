export type ProductStatus = 'ok' | 'low' | 'empty' | 'expired';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  quantity: number;
  minQuantity: number;
  costPrice: number;
  salePrice: number;
  supplier: string;
  entryDate: string;
  expirationDate?: string;
  location: string;
  status: ProductStatus;
}

export interface Movement {
  id: string;
  productId: string;
  productName: string;
  type: 'entry' | 'exit';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  user: string;
  date: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  productCount: number;
}

export interface Supplier {
  id: string;
  name: string;
  contact?: string;
  email?: string;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  expiredCount: number;
  expiringCount: number;
  totalValue: number;
  entriesThisMonth: number;
  exitsThisMonth: number;
}
