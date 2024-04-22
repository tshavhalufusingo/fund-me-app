"use client";
import styles from "./page.module.css";
import "./styles.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router"; // Changed from next/navigation to next/router

export default function Home() {
  const router = useRouter();

  const Login = async (e) => {
    e.preventDefault(); // Corrected to e.preventDefault();

    let useremail = document.getElementById("useremail").value;
    let userpassword = document.getElementById("password").value;

    const inputData = { email: useremail, password: userpassword };
    const resp = await signIn("credentials", { ...inputData, redirect: false });

    if (!resp.error) {
      console.log(resp);
      router.refresh();
      router.push("/home");
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={Login}> {}
        <input
          id="useremail"
          type="email"
          placeholder="User email"
          required
        />

        <input
          id="password"
          type="password"
          placeholder="User password"
        />

        <button type="button" onClick={Login}>Login</button> {}
      </form>

      <p>If you have no account click register below</p>

      <button id="register" type="submit">
        <Link href="/register">Register</Link>
      </button>
    </main>
  );
}
