import Cookies from "js-cookie";

const TOKEN_KEY = "shopwave_token";
const USER_KEY = "shopwave_user";

/** Store JWT token in cookie (7 days) */
export function setToken(token: string): void {
  Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: "strict" });
}

/** Retrieve JWT token from cookie */
export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

/** Remove token from cookie (logout) */
export function removeToken(): void {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
}

/** Check if user is authenticated */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/** Cache user data in localStorage */
export function cacheUser(user: object): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

/** Retrieve cached user data */
export function getCachedUser(): object | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

/** Clear cached user */
export function clearCachedUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
  }
}
