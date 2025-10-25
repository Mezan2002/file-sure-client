import type { AuthResponse, LoginInput, RegisterInput, User } from "@/types";
import { apiClient, removeAuthToken, setAuthToken } from "./client";

export const authApi = {
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);
    if (response.data.data?.token) {
      setAuthToken(response.data.data.token);
    }
    return response.data;
  },

  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    if (response.data.data?.token) {
      setAuthToken(response.data.data.token);
    }
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<{ success: boolean; data: User }>(
      "/auth/profile"
    );
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
    removeAuthToken();
  },
};
