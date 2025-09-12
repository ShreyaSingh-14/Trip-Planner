import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AppSplashScreen from "./../components/AppSplashScreen";
import AuthScreen from "./../components/Login";
import { auth } from "./../configs/FirebaseConfig"; // your initialized auth (getAuth(app))
import type { User } from "firebase/auth";              // import the type only
import { onAuthStateChanged } from "firebase/auth";    // modular listener
import { Redirect } from "expo-router";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null); // <- explicit type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // subscribe using modular API
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // currentUser has type User | null
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSplashFinish = () => setShowSplash(false);

  if (showSplash) return <AppSplashScreen onFinish={handleSplashFinish} />;
  if (loading) return <View style={{ flex: 1, backgroundColor: "#fff" }} />;

  return <View style={{ flex: 1 }}>{user ? <Redirect href="/mytrip" /> : <AuthScreen />}</View>;
}
