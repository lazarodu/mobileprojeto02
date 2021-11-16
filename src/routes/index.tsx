import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginRoutes from "./login.routes";
import HomeStack from "./home.routes";
import { useAuth } from "../hook/auth";
import api from "../services/api";

export default function Routes() {
  const { access_token } = useAuth();
  api.interceptors.request.use(async (request) => {
    console.log(access_token);
    if (access_token !== "") {
      request.headers = { authorization: `Bearer ${access_token}` };
    }
    return request;
  });
  return (
    <NavigationContainer>
      {access_token ? <HomeStack /> : <LoginRoutes />}
    </NavigationContainer>
  );
}
