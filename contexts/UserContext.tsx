import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface User {
  username: string;
  email: string;
}

// definimos os tipos de contexto
interface UserContextType {
  user: User | null;
  setUserData: (user: User, token: string) => void;
  clearUser: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

// criamos o contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");
      if (storedToken && storedUser) {
        setUserState(JSON.parse(storedUser));
        setTokenState(storedToken);
      }
    };
    loadUserData();
  }, []);

  const setUserData = async (user: User, token: string) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("token", token);
    setUserState(user);
    setTokenState(token);
  };

  const clearUser = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    setUserState(null);
    setTokenState(null);
  };

  const setToken = (token: string | null) => {
    if (token) {
      AsyncStorage.setItem("token", token);
    } else {
      AsyncStorage.removeItem("token");
    }
    setTokenState(token);
  };

  return (
    <UserContext.Provider value={{ user, token, setUserData, setToken, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
