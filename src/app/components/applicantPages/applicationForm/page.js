'use client'
import { useSession } from "next-auth/react";
import styles from "./../../../page.module.css";
import { useRouter } from "next/router";
import "../../../styles.css"

export default function Home ( {postId }) {
  //const router = useRouter();

const { data: session } = useSession();
const handleRegister = async (event) => {

   
        console.log(postId);
        console.log(postId);
        console.log(postId);
        console.log(postId);
        console.log(postId);


    
    event.preventDefault();
    const name = document.getElementById("Name").value;
    const phoneNum = document.getElementById("PhoneNum").value;
    const motiv = document.getElementById("Motivation").value;
    try {
      const resp = await fetch("/api/applicationForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phoneNum , motiv,}),
      });

      if (resp.ok) {
        // Handle success
      } else {
        console.error("Error:", resp.statusText);
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle network error
    }
  };

  const goToLoginPage = (e) => {
    e.preventDefault();
 //   router.push("/");
  };

  return (
    <main className={styles.main}>
      <div>
        <input id="Name" type="text" placeholder="Name" required />
        <input id="PhoneNum" type="text" placeholder="Phone Number" required />
        <input id="Motivation" type="text" placeholder="Motivation" required/>
        <button onClick={handleRegister}>APPLY</button>
      </div>
    </main>
  );
}
