"use client";
import styles from "./page.module.css";
import "./styles.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const mysql = require('mysql');


export default function Home() {
  const router = useRouter();
  const Login = async (e) => {
    e.preventDefault;

    //users
    let useremail = document.getElementById("useremail").value;
    let userpassword = document.getElementById("password").value;


    //start




// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'your-mysql-server-name.mysql.database.azure.com',
  port: '3306',
  user: 'your-username@your-mysql-server-name',
  password: 'your-password',
  database: 'your-database-name'
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL server:', err);
    return;
  }
  console.log('Connected to MySQL server');
  
  // Perform database operations here...
});

// Close the connection when done
connection.end();



    //finish




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
      </form>
      <p>If you have no account click register below</p>
      <button id="register" type="submit">
        <Link href="/register">Register</Link>
      </button>
    </main>
  );
}
