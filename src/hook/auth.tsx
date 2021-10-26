import React, { createContext, useContext, useCallback, useState } from "react";
import { apiUser } from "../services/data/index";
import api from "../services/api";
import { IAuthState, IAuthContextData } from "../interfaces/User.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<IAuthState>();
  const signIn = useCallback(async ({ email, password }) => {
    const response = await apiUser.login({
      email,
      password,
    });
    const { access_token, user } = response.data.data;
    setAuth({ access_token, user });

    await AsyncStorage.setItem("access_token", access_token);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    api.defaults.headers.common.authorization = `bearer ${access_token}`;
  }, []);

  const removeLocalStorage = async () => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("user");
  };

  const signOut = useCallback(() => {
    setAuth({} as IAuthState);
    removeLocalStorage();
    delete api.defaults.headers.common.authorization;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        access_token: auth?.access_token,
        user: auth?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
export { AuthProvider, useAuth };
