"use client";
import React, { useState } from "react";
import LoginPage from "@/components/Login";
import MainDashboard from "@/components/MainDashboard";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return <MainDashboard />;
}
