import React, { useEffect } from "react";
import { View } from "react-native";
import { useAuth } from "../../hook/auth";

export default function Sair() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, []);

  return <View />;
}
