export type Language = 'en' | 'vi' | 'de';

export interface MenuItem {
  id: string;
  name: {
    en: string;
    vi: string;
    de: string;
  };
  description: {
    en: string;
    vi: string;
    de: string;
  };
  price: number;
  category: 'starters' | 'soups' | 'wok' | 'sushi' | 'drinks' | 'desserts';
  image: string;
  tags: string[];
  customizable?: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  locationId: string;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  createdAt?: string;
}

export interface LocationDetails {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: {
    en: string;
    vi: string;
    de: string;
  };
  gmapsLink: string;
}

export interface RestaurantEvent {
  id: string;
  title: {
    en: string;
    vi: string;
    de: string;
  };
  description: {
    en: string;
    vi: string;
    de: string;
  };
  date: string;
  image: string;
  active: boolean;
}

export interface CareerOpportunity {
  id: string;
  title: {
    en: string;
    vi: string;
    de: string;
  };
  type: {
    en: string;
    vi: string;
    de: string;
  };
  salary: {
    en: string;
    vi: string;
    de: string;
  };
  requirements: {
    en: string[];
    vi: string[];
    de: string[];
  };
  description: {
    en: string;
    vi: string;
    de: string;
  };
  active: boolean;
}

export interface GuestReview {
  id: string;
  name: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  reply?: string;
  status: 'pending' | 'approved';
}

export interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  positionId: string;
  positionTitle: string;
  experience: string;
  notes?: string;
  createdAt: string;
}

export interface MenuIndexSection {
  id: string;
  labelVi: string;
  labelDe: string;
  targetId?: string;
  pageNumber?: number;
  navigationMode?: 'auto' | 'html' | 'pdf';
}

