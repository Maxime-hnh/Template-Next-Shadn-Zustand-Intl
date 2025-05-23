import { toast } from "sonner";
import { useAuthStore } from "@/_stores/auth.store";
import { retryOriginalRequest } from "./helpers";
import { authService } from "@/_services/auth.service";

export class ApiError extends Error {
  errorCode: number;
  timestamp: string;

  constructor(errorCode: number, message: string, timestamp: string) {
    super(message);
    this.errorCode = errorCode;
    this.timestamp = timestamp;
    this.name = 'ApiError';

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
export async function handleResponse<TData = any>(
  response: Response,
  url?: RequestInfo,
  originalInit?: RequestInit
): Promise<TData> {

  const text: string = await response.text();
  let data = text && JSON.parse(text);

  if (!response.ok) {
    if (response.status === 401) {
      console.log("error 401 " + response.statusText, response);
      try {
        const loggedUser = useAuthStore.getState().loggedUser;
        if (loggedUser && loggedUser.refreshToken) {
          const newLoggedUser = await authService.refreshToken()
          if (newLoggedUser && url && originalInit) {
            return await retryOriginalRequest(url, originalInit, newLoggedUser.accessToken);
          } else {
            useAuthStore.getState().logout();
            window.location.reload();
          }
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        useAuthStore.getState().logout();
        window.location.reload();
        return Promise.reject("Session expired. Please log in again.");
      }
    }
    if (response.status === 403) {
      console.log("error 403 " + response.statusText, response);
      toast.error("Erreur de connexion", {
        description: "You do not have permission to access this resource.",
      })
    }
    if ([500].indexOf(response.status) !== -1) {
      console.log("error 500 " + response.statusText, response);
      toast.error("Erreur de connexion", {
        description: `${(data && data.message) || response.statusText}`,
      })
    }
    const errorCode = response.status;
    const errorMessage = (data && data.message) || response.statusText;
    const timestamp = new Date().toISOString();
    const error = new ApiError(errorCode, errorMessage, timestamp);
    return Promise.reject(error);
  }
  return data;
}
