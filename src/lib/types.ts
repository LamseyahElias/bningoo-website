export interface Company {
  id: string
  name: string
  slug: string
  logo_url: string | null
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name: string | null
  company_id: string | null
  role: 'admin' | 'manager' | 'staff'
  created_at: string
}

export interface Product {
  id: string
  company_id: string
  name: string
  description: string | null
  price: number
  category: string | null
  image_url: string | null
  is_available: boolean
  created_at: string
}

export interface Order {
  id: string
  company_id: string
  user_id: string
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  total: number
  notes: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
}

export interface InventoryItem {
  id: string
  company_id: string
  name: string
  quantity: number
  unit: string
  min_stock: number
  category: string | null
  created_at: string
}
