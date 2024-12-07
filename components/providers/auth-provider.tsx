"use client";
import { useUser } from "@clerk/nextjs";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoaded } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setCurrentUser(user);
      setLoading(false);
    }
  }, [isLoaded, user]);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext için context alınamadı");
  }
  return context;
};
