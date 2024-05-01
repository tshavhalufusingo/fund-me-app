"use client";
import styles from "../page.module.css";
import { useSession } from "next-auth/react";
import AdminHome from "./../components/adminPages/adminHome/page";
import FundManagerHome from "./../components/fundManagerPages/fundManagerHome/page";
import ApplicantHome from "./../components/applicantPages/applicantHome/page";
import graph from "./../components/graphs/page"
import Graph from "./../components/graphs/page";

export default function Page() {
  const { data: session, status } = useSession();
  if (session?.user) {
    if (session?.user.statusId != 2) {
      return (
        <>
          <main className={styles.main}>
            <p>Your account is not approved</p>
          </main>
        </>
      );
    }

    if (session?.user.userBlock) {
      return (
        <>
          <main className={styles.main}>
            <p>Your account is blocked</p>
            <p>conatct admin at help@fundmeapp.com</p>
          </main>
        </>
      );
    }

    if (session?.user.role == "Admin") {
      return (
        <>
          <main className={styles.main}>
            <AdminHome />
          </main>
        </>
      );
    } else if (session?.user.role == "FundManager") {
      return (
        <>
          <main className={styles.main}>
            <FundManagerHome />
          </main>
        </>
      );
    } else if (session?.user.role == "Applicant") {
      return (
        <>
          <main className={styles.main}>
            <ApplicantHome />
          </main>
        </>
      );
    }
  }

  return (
    <main className={styles.main}>
      <div>Please login</div>
    </main>
  );
}
