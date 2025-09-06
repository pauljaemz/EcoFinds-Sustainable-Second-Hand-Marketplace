import React, { createContext, useContext, useState, ReactNode } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<User, "name">>) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const storedUser = JSON.parse(localStorage.getItem("users") || "[]").find((u: any) => u.email === email);
    if (!storedUser) throw new Error("User not found");
    setUser(storedUser);
    localStorage.setItem("currentUser", JSON.stringify(storedUser));
  };

  const signup = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u: any) => u.email === email)) throw new Error("Email already exists");
    const newUser = { id: Date.now(), name, email };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const updateProfile = (updates: Partial<Pick<User, "name">>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) => (u.id === user.id ? updatedUser : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
