"use client";
import styles from "./page.module.css"; 
import "./styles.css"; 
import { signIn } from "next-auth/react"; // Importing signIn function from next-auth
import { useRouter } from "next/navigation"; // Importing useRouter hook from next/navigation
import { useState } from "react";
import { useSession } from "next-auth/react"; 

// Home component for the login page
export default function Home() {
  // Using useSession hook to access session data
  const { data: session } = useSession();
  const router = useRouter(); // Using useRouter hook to handle navigation
  const [Loading, setLoading] = useState(false); // State to manage loading state
  const [showError, setShowError] = useState(false); // State to manage error display

  // Redirecting to home page if user is already logged in
  if (session?.user) {
    router.push("/home");
  }

  // Function to handle login
  const Login = async (e) => {
    e.preventDefault; // Preventing default form submission behavior

    // Retrieving user input
    let useremail = document.getElementById("useremail").value;
    let userpassword = document.getElementById("password").value;

    const inputData = { email: useremail, password: userpassword };
    setLoading(true); // Show loading animation

    // Signing in with credentials
    const resp = await signIn("credentials", { ...inputData, redirect: false });

    setLoading(false); // Hide loading animation

    // Handling response status
    if (!resp.error) {
      setLoading(false);
      router.refresh();
      router.push("/home"); // Redirecting to home page on successful login
    }

    // Handling authentication errors
    if (resp.status == 401) {
      setLoading(false);
      setShowError(true); // Displaying error message
      setTimeout(() => setShowError(false), 5000); // Hiding error message after 5 seconds
    }
  };

  // Function to navigate to registration page
  const goToRegisterPage = async (e) => {
    e.preventDefault();
    router.push("/register");
  };

  // Rendering login form
  return (
    <main className={styles.main}>
      <form action={Login} className="form">
        <p className="title">Signin</p>
        <label>
          <input className="input" id="useremail" type="email" required />
          <span>Email</span>
        </label>
        <label>
          <input className="input" id="password" type="password" />
          <span>Password</span>
        </label>
        <button className="submit" type="submit">
          Login
        </button>
        {showError && (
          <div className="error-bubble">
            Either username or password is wrong. Please try again
          </div>
        )}
        {Loading && <div className="Loading-bubble">Signing in</div>}
        <p>If you have no account click register below</p>
        <button className="submit" onClick={goToRegisterPage}>
          Register
        </button>
      </form>
    </main>
  );
}
