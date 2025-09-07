export interface Property {
  id: string
  title: string
  description: string
  price: number
  currency: string
  propertyType: PropertyType
  status: PropertyStatus
  bedrooms?: number
  bathrooms?: number
  area: number
  landArea?: number
  yearBuilt?: number
  address: string
  city: string
  state: string
  country: string
  postalCode?: string
  latitude?: number
  longitude?: number
  featured: boolean
  views: number
  createdAt: string
  updatedAt: string
  owner: {
    id: string
    name?: string
    email: string
    phone?: string
    avatar?: string
  }
  images: PropertyImage[]
  features: PropertyFeature[]
  _count?: {
    reviews: number
    messages: number
  }
}

export interface PropertyImage {
  id: string
  url: string
  alt?: string
  isPrimary: boolean
  order: number
  createdAt: string
}

export interface PropertyFeature {
  id: string
  name: string
  value?: string
  createdAt: string
}

export interface PropertyFilters {
  search?: string
  propertyType?: PropertyType
  minPrice?: number
  maxPrice?: number
  minBedrooms?: number
  minBathrooms?: number
  minArea?: number
  maxArea?: number
  city?: string
  state?: string
  country?: string
  featured?: boolean
  status?: PropertyStatus
  page?: number
  limit?: number
  sortBy?: 'price' | 'createdAt' | 'views' | 'area'
  sortOrder?: 'asc' | 'desc'
}

export enum PropertyType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  CONDO = 'CONDO',
  TOWNHOUSE = 'TOWNHOUSE',
  VILLA = 'VILLA',
  LAND = 'LAND',
  COMMERCIAL = 'COMMERCIAL',
  OFFICE = 'OFFICE',
  RETAIL = 'RETAIL',
  WAREHOUSE = 'WAREHOUSE'
}

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  PENDING = 'PENDING',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
  OFF_MARKET = 'OFF_MARKET'
}

export enum UserRole {
  USER = 'USER',
  AGENT = 'AGENT',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  avatar?: string
  role: UserRole
  bio?: string
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  subject?: string
  content: string
  status: MessageStatus
  createdAt: string
  senderId: string
  propertyId?: string
  sender: User
  property?: Property
}

export interface Review {
  id: string
  rating: number
  comment?: string
  createdAt: string
  userId: string
  propertyId: string
  user: User
}

export enum MessageStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
  REPLIED = 'REPLIED',
  ARCHIVED = 'ARCHIVED'
}