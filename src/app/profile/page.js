"use client";
import styles from "../page.module.css";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession(); // Get session data

  if (session?.user) {
    const id = session.user.id; // Extract user id from session

    // Handle form submission to update profile
    const handleRegister = async (event) => {
      event.preventDefault();

      // Get form values
      const userFirstName = document.getElementById("firstname").value;
      const userLastName = document.getElementById("lastname").value;
      const userEmail = document.getElementById("email").value;
      const userRole = document.getElementById("role").value;
      let status = 0;

      // Determine status based on role
      if (userRole === "Applicant") {
        status = 2;
      } else {
        if (session.user.role === "FundManager" && userRole === "FundManager") {
          status = 2;
        } else {
          status = 1;
        }
      }

      // Prepare input data for API request
      const inputData = {
        email: userEmail,
        userId: id,
        lastname: userLastName,
        firstname: userFirstName,
        newStatus: status,
        role: userRole,
      };

      try {
        // Send API request to update user profile
        const resp = await fetch(`/api/users/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData),
        });

        if (resp.ok) {
          // Handle successful response
          alert("Profile updated successfully!");
        } else {
          // Handle error response
          const errorData = await resp.json();
          throw new Error(errorData.message || "Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    };

    return (
      <main className={styles.main}>
        <form id="registerForm" className="form" onSubmit={handleRegister}>
          <div className="flex">
            <label>
              <input
                id="firstname"
                className="input"
                type="text"
                name="firstname"
                defaultValue={session.user.firstName}
              />
              <span>Firstname</span>
            </label>
            <label>
              <input
                id="lastname"
                className="input"
                type="text"
                defaultValue={session.user.lastName}
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
              defaultValue={session.user.email}
              required
            />
            <span>Email</span>
          </label>
          <label>
            <select id="role" className="input" name="role" required>
              <option
                selected={session.user.role === "Applicant"}
                value="Applicant"
              >
                Applicant
              </option>
              <option
                selected={session.user.role === "FundManager"}
                value="FundManager"
              >
                Fund Manager
              </option>
            </select>
            <span>Role</span>
          </label>
          <button className="submit" type="submit">
            Update profile
          </button>
        </form>
      </main>
    );
  }

  // Display login prompt if no session is found
  return (
    <main className={styles.main}>
      <div>Please login</div>
    </main>
  );
}
