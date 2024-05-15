"use client";
import Image from "next/image";
import styles from "../page.module.css";
import "../styles.css";
import Link from "next/link";
import { useRouter } from "next/navigation";




export default function Home() {
  const router = useRouter();
  const handleRegister = async (event) => {
    event.preventDefault;

    let userFirstName = document.getElementById("firstname").value;
    let userLastName = document.getElementById("lastname").value;
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

  const goToLoginPage = async (e) => {
    e.preventDefault;
      router.push("/");
  };
  return (
    <main className={styles.main}>
<form id="registerForm" className="form" onSubmit={handleRegister}>
    <p class="title">Register</p>
    <p class="message">Signup now and get full access to our app.</p>
    <div class="flex">
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
        <input id="password" className="input" type="password"  required />
        <span>Password</span>
    </label>
    <label> 
        <input id="confirmPassword" className="input" type="password" required />
        <span>Confirm password</span>
    </label>
    <button class="submit" type="submit">Register</button>

    <p class="signin">Already have an acount ? <a href="#" onClick={goToLoginPage}>Signin</a> </p>

</form>

      
    </main>
  );
}
