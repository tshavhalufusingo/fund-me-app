"use client";
import Image from "next/image";
import styles from "../page.module.css";
import "../styles.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault;

    let userFirstName = document.getElementById("firstname").value;
    let userLastName = document.getElementById("password").value;
    let useremail = document.getElementById("email").value;
    let userRole = document.getElementById("role").value;
    let userpassword = document.getElementById("password").value;

    const inputData = {
      email: useremail,
      password: userpassword,
      lastname: userLastName,
      firstname: userFirstName,
      role: userRole,
    };

    console.log(inputData);

    const resp = await fetch("api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    if (!resp.error) {
      router.push("/");
    }
  };
  return (
    <main className={styles.main}>
      <form action={handleRegister}>
        <input
          id="firstname"
          type="firstname"
          placeholder="User firstname"
          required
        ></input>

        <input
          id="lastname"
          type="lastname"
          placeholder="User lastname"
          required
        ></input>

        <input id="email" type="email" placeholder="User email"></input>
        <select name="role" id="role">
          <option value="Applicant">Applicant</option>
          <option value="FundManager">Fund Manager</option>
        </select>

        <input
          id="password"
          type="password"
          placeholder="Password"
          required
        ></input>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          required
        ></input>
        <button type="submit">Register</button>
      </form>
      <p>If you already have an account click login below</p>
      <button id="register" type="submit">
        <Link href="/">Login</Link>
      </button>
    </main>
  );
}
