import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "admin" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const MOCK_USERS: { email: string; password: string; user: User }[] = [
  {
    email: "admin@exampro.com",
    password: "admin123",
    user: { id: "1", name: "System Admin", email: "admin@exampro.com", role: "admin" },
  },
  {
    email: "student@exampro.com",
    password: "student123",
    user: { id: "2", name: "John Student", email: "student@exampro.com", role: "student" },
  },
];

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("exampro_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((email: string, password: string) => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found.user);
      localStorage.setItem("exampro_user", JSON.stringify(found.user));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("exampro_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
