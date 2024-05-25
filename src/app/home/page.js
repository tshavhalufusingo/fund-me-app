"use client";

import styles from "../page.module.css";
import { useSession } from "next-auth/react";
import AdminHome from "./../components/adminPages/adminHome/page";
import FundManagerHome from "./../components/fundManagerPages/fundManagerHome/page";
import ApplicantHome from "./../components/applicantPages/applicantHome/page";

export default function Page() {
  const { data: session, status } = useSession(); // Get session data and status

  if (status === "loading") {
    // Show loading state while session data is being fetched
    return (
      <main className={styles.main}>
        <p>Loading...</p>
      </main>
    );
  }

  if (session?.user) {
    // Check if the user's account is approved
    if (session.user.statusId !== 2) {
      return (
        <main className={styles.main}>
          <p>Your account is not approved</p>
        </main>
      );
    }

    // Check if the user's account is blocked
    if (session.user.userBlock) {
      return (
        <main className={styles.main}>
          <p>Your account is blocked</p>
          <p>Contact admin at help@fundmeapp.com</p>
        </main>
      );
    }

    // Render home page based on the user's role
    switch (session.user.role) {
      case "Admin":
        return (
          <main className={styles.main}>
            <AdminHome />
          </main>
        );
      case "FundManager":
        return (
          <main className={styles.main}>
            <FundManagerHome />
          </main>
        );
      case "Applicant":
        return (
          <main className={styles.main}>
            <ApplicantHome />
          </main>
        );
      default:
        return (
          <main className={styles.main}>
            <p>Unknown role</p>
          </main>
        );
    }
  }

  // If no session is found, prompt the user to log in
  return (
    <main className={styles.main}>
      <div>Please login</div>
    </main>
  );
}
