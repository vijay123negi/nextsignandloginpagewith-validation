"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const Authlayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const auth = localStorage.getItem("authenticated");
    if (auth === "true") {
      setAuthenticated(true);
    } else {
      router.push("/login");
    }
    setLoading(false);
  });
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    authenticated ? <>{children}</> : null
  );

};
export default Authlayout;
