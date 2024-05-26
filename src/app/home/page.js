"use client";
import styles from "../page.module.css";
import { useSession } from "next-auth/react";
import AdminHome from "./../components/adminPages/adminHome/page";
import FundManagerHome from "./../components/fundManagerPages/fundManagerHome/page";
import ApplicantHome from "./../components/applicantPages/applicantHome/page";

// Page component responsible for rendering different home pages based on the user's role
export default function Page() {
  const { data: session, status } = useSession();

  // Check if user session is available
  if (session?.user) {

    // Check if user account is approved
    if (session?.user.statusId != 2) {
      return (
        <>
          <main className={styles.main}>
            <p>Your account is not approved</p>
          </main>
        </>
      );
    }

    // Check if user account is blocked
    if (session?.user.userBlock) {
      return (
        <>
          <main className={styles.main}>
            <p>Your account is blocked</p>
            <p>contact admin at help@fundmeapp.com</p>
          </main>
        </>
      );
    }

    // Render AdminHome if user role is Admin
    if (session?.user.role == "Admin") {
      return (
        <>
          <main className={styles.main}>
            <AdminHome />
          </main>
        </>
      );
    } 
    // Render FundManagerHome if user role is FundManager
    else if (session?.user.role == "FundManager") {
      return (
        <>
          <main className={styles.main}>
            <FundManagerHome />
          </main>
        </>
      );
    } 
    // Render ApplicantHome if user role is Applicant
    else if (session?.user.role == "Applicant") {
      return (
        <>
          <main className={styles.main}>
            <ApplicantHome />
          </main>
        </>
      );
    }
  }

  // Default case when no session is found or user is not logged in
  return (
    <main className={styles.main}>
      <div>Please login</div>
    </main>
  );
}
