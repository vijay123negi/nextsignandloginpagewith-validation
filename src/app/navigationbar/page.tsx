import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NavBar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem("authenticated");
    router.push("/login");
  };

  return (
    <nav className="navbar">
        <Link href="/home/about">About</Link>
        <Link href="/home/help">Help</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavBar;
