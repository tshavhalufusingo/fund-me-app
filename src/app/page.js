"use client";
import styles from "./page.module.css";
import "./styles.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Import the useState hook
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [Loading, setLoading] = useState(false); // Use useState hook correctly
  const [showError, setShowError] = useState(false);

  if (session?.user) {
    router.push("/home");
  }

  const Login = async (e) => {
    e.preventDefault;

    //users
    let useremail = document.getElementById("useremail").value;
    let userpassword = document.getElementById("password").value;

    const inputData = { email: useremail, password: userpassword };
    setLoading(true); // Show loading animation

    const resp = await signIn("credentials", { ...inputData, redirect: false });

    setLoading(true);
    console.log("the response is ", resp.status);
    if (!resp.error) {
      setLoading(false);
      router.refresh();
      router.push("/home");
    }

    if (resp.status == 401) {
      setLoading(false);
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }

    setLoading(false); // Hide loading animation
  };

  const goToRegisterPage = async (e) => {
    e.preventDefault;
    router.push("/register");
  };
  return (
    <main className={styles.main}>
      <form action={Login}>
        <input
          id="useremail"
          type="email"
          placeholder="User email"
          required
        ></input>
        <input
          id="password"
          type="password"
          placeholder="User password"
        ></input>
        <button type="submit">Login</button>
        {showError && (
          <div className="error-bubble">
            Either username or password is wrong. Please try again
          </div>
        )}

        {Loading && <div className="Loading-bubble">Signing in</div>}
      </form>
      <p>If you have no account click register below</p>
      <button id="register" onClick={goToRegisterPage} type="submit">
        Register
      </button>
    </main>
  );
}
