"use client";
import styles from "../page.module.css";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  if (session?.user) {
    const id = session?.user.id;

    const handleRegister = async (event) => {
      event.preventDefault();

      let userFirstName = document.getElementById("firstname").value;
      let userLastName = document.getElementById("lastname").value;
      let useremail = document.getElementById("email").value;
      let userRole = document.getElementById("role").value;
      let status = 0;

      if (userRole === "Applicant") {
        status = 2;
      } else {
        if (
          session?.user?.role == "FundManager" &&
          userRole === "FundManager"
        ) {
          status = 2;
        } else {
          status = 1;
        }
      }

      const inputData = {
        email: useremail,
        userId: id,
        lastname: userLastName,
        firstname: userFirstName,
        newStatus: status,
        role: userRole,
      };

      const resp = await fetch(`/api/users/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });
    };

    return (
      <main className={styles.main} onSubmit={handleRegister}>
        <form id="registerForm" className="form">
          <div class="flex">
            <label>
              <input
                id="firstname"
                className="input"
                type="text"
                name="firstname"
                defaultValue={session?.user.firstName}
              />
              <span>Firstname</span>
            </label>
            <label>
              <input
                id="lastname"
                className="input"
                type="text"
                defaultValue={session?.user.lastName}
                required
              />
              <span>Lastname</span>
            </label>
          </div>
          <label>
            <input
              id="email"
              className="input"
              type="email"
              defaultValue={session?.user?.email}
              required
            />
            <span>Email</span>
          </label>
          <label>
            <select id="role" className="input" name="role" required>
              <option
                selected={session?.user?.role == "Applicant"}
                value="Applicant"
              >
                Applicant
              </option>
              <option
                selected={session?.user?.role == "FundManager"}
                value="FundManager"
              >
                Fund Manager
              </option>
            </select>
            <span>Role</span>
          </label>
          <button class="submit" type="submit">
            Update profile
          </button>
        </form>
      </main>
    );
    r;
  }
  return (
    <main className={styles.main}>
      <div>Please login</div>
    </main>
  );
}
