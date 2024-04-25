"use client";
import styles from "../page.module.css";
import { useSession } from "next-auth/react";
import AdminHome from "./../components/adminPages/adminHome/page"
import FundManagerHome from "./../components/fundManagerPages/fundManagerHome/page"
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
  }

  return (
    <main className={styles.main}>
      <div>{session?.user?.role}</div>
    </main>
  );
}
