export interface User {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  credits: number;
  hasPurchased: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface DashboardStats {
  totalReferredUsers: number;
  convertedUsers: number;
  totalCreditsEarned: number;
  currentCredits: number;
  referralLink: string;
}

export interface Referral {
  id: string;
  userName: string;
  userEmail: string;
  status: "pending" | "converted";
  hasPurchased: boolean;
  joinedAt: string;
}

export interface Purchase {
  id: string;
  productName: string;
  amount: number;
  isFirstPurchase: boolean;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  referralCode?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreatePurchaseInput {
  productId: string;
  productName: string;
  amount: number;
}
