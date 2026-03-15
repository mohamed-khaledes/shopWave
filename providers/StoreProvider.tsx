"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { restoreAuth } from "@/store/authSlice";
import { getToken, getCachedUser } from "@/lib/auth";
import type { User } from "@/types";

/** Restores auth state from cookies/localStorage on mount */
function AuthRestorer() {
  useEffect(() => {
    const token = getToken();
    const user = getCachedUser() as User | null;
    if (token && user) {
      store.dispatch(restoreAuth({ user, token }));
    }
  }, []);
  return null;
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthRestorer />
      {children}
    </Provider>
  );
}
