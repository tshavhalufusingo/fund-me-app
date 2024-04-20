"use client";
import Link from "next/link";
import "../styles.css";
import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // const LogOut = (e) => {
  //   e.preventDefault;
  //   signOut();
  //   session.destroy();
  //   router.push("/");
  // };
  const LogOut = (e) => {
    e.preventDefault();
    signOut(); // Use signOut from next-auth/react
    router.push("/");
  };
  

  if (session?.user) {
    return (
      <>
        <nav className="navbar">
          <header>
            <h1>
              <Link href="/home"> Fund ME</Link>
            </h1>
          </header>

          <ul>
            <li>
              <Link href="/register">Profile</Link>
            </li>
            <li>
              <button onClick={LogOut}> Sing out </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
  return (
    <nav className="navbar">
      <header>
        <h1>Fund ME</h1>
      </header>

      <ul>
        <li>
          <Link href="/">Sign In</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}
