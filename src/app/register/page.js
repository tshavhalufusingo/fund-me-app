"use client";
import styles from "../page.module.css";
import "../styles.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Handle form submission for user registration
  const handleRegister = async (event) => {
    event.preventDefault();

    // Get form values
    const userFirstName = document.getElementById("firstname").value;
    const userLastName = document.getElementById("lastname").value;
    const useremail = document.getElementById("email").value;
    const userRole = document.getElementById("role").value;
    const userpassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validate password and confirm password
    if (userpassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Prepare input data for API request
    const inputData = {
      email: useremail,
      password: userpassword,
      lastname: userLastName,
      firstname: userFirstName,
      role: userRole,
    };

    try {
      // Send API request to register the user
      const resp = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (resp.ok) {
        // Navigate to the home page on successful registration
        router.push("/");
      } else {
        const errorData = await resp.json();
        throw new Error(errorData.message || "Failed to register user");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register user. Please try again.");
    }
  };

  // Navigate to login page
  const goToLoginPage = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <main className={styles.main}>
      <form id="registerForm" className="form" onSubmit={handleRegister}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <div className="flex">
          <label>
            <input id="firstname" className="input" type="text" required />
            <span>Firstname</span>
          </label>
          <label>
            <input id="lastname" className="input" type="text" required />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input id="email" className="input" type="email" required />
          <span>Email</span>
        </label>
        <label>
          <select id="role" className="input" name="role" required>
            <option value="Applicant">Applicant</option>
            <option value="FundManager">Fund Manager</option>
          </select>
          <span>Role</span>
        </label>
        <label>
          <input id="password" className="input" type="password" required />
          <span>Password</span>
        </label>
        <label>
          <input id="confirmPassword" className="input" type="password" required />
          <span>Confirm password</span>
        </label>
        <button className="submit" type="submit">
          Register
        </button>

        <p className="signin">
          Already have an account?{" "}
          <a href="#" onClick={goToLoginPage}>
            Sign in
          </a>
        </p>
      </form>
    </main>
  );
}
