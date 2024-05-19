"use client";
import styles from "../page.module.css";
import { useSession } from "next-auth/react";
export default function Profile() {
  const { data: session, status } = useSession();
  const id = session?.user.id;

  if (session?.user) {
    const handleUpdateProfile = async (event) => {

      event.preventDefault()

      let userFirstName = document.getElementById("firstname").value;
      let userLastName = document.getElementById("lastname").value;
      let useremail = document.getElementById("email").value;
      let userRole = document.getElementById("role").value;
      // let userpassword = document.getElementById("password").value;
      let ustatus = 0;

      if (userRole === "Applicant") {
        ustatus = 2;
      } 
      else {
        if (
          session?.user?.role == "FundManager" &&
          userRole === "FundManager"
        ) {
          ustatus = 2;
        } else {
          ustatus = 1;
        }
      }

      const inputData = {
        email: useremail,
        userId: id,
        lastname: userLastName,
        firstname: userFirstName,
        newStatus: ustatus,
        role: userRole,
      };

      console.log(inputData);

      const resp = await fetch(`/api/users/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });
    };

    return (
      <main className={styles.main}>
        <form id="registerForm" className="form" >
          <div className="flex">
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
              <option value="Applicant" selected={session?.user?.role == 'Applicant'}>Applicant</option>
              <option value="FundManager" selected={session?.user?.role == 'FundManager'}>Fund Manager</option>
            </select>
            <span>Role</span>
          </label>
          <button className="submit"  onClick={handleUpdateProfile}>
            Update profile
          </button>
        </form>
      </main>
    );
  }
  else{ (
    <main className={styles.main}>
      <div>Please login</div>
    </main>
  );
}
}
