"use client";
import styles from "../page.module.css";
import { useSession } from "next-auth/react";
import AdminHome from "./../components/adminPages/adminHome/page"
import FundManagerHome from "./../components/fundManagerPages/fundManagerHome/page"
import ApplicantHome from "./../components/applicantPages/applicantHome/page"
// import AdminHome from "../../components/adminPages/adminHome";

export default function Page() {
  const { data: session, status } = useSession();
  if (session?.user) {

    if(session?.user.role == 'Admin'){
      return(<>
      <main className={styles.main}>
      <AdminHome />
      </main>
      </>)
    }
    else if(session?.user.role == 'FundManager'){
      return(<>
      <main className={styles.main}>
      <FundManagerHome />
      </main>
      </>)
    }
    else if(session?.user.role == 'Applicant'){
      return(<>
      <main className={styles.main}>
      <ApplicantHome />
      </main>
      </>)
    }
  }

  return (
    <main className={styles.main}>
      <div>Please login</div>
    </main>
  );
}
