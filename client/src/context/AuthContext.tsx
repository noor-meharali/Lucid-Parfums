import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { authService } from '@/services/authService';
import type { User } from '@/types/user';
import type { LoginInput, RegisterInput } from '@/types/auth';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await authService.me();
      setUser(response.data);
    } catch {
      // A 401 here just means "not signed in" — expected on first
      // load for guests, not a failure worth surfacing.
      setUser(null);
    }
  }, []);

  // Restore session on first load (the httpOnly cookie, if any, is
  // sent automatically — this just asks the server who it belongs to).
  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = useCallback(async (input: LoginInput) => {
    const response = await authService.login(input);
    setUser(response.data);
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const response = await authService.register(input);
    setUser(response.data);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, isAuthenticated: user !== null, login, register, logout, refreshUser }),
    [user, isLoading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
