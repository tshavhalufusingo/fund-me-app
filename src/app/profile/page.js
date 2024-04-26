"use client";
import styles from "../page.module.css";
import { useSession } from "next-auth/react";
export default function Profile() {
  const { data: session, status } = useSession();
  if (session?.user) {

    return (<><main className={styles.main} ><div>{session?.user.role}</div></main></>)
  }
  return (
    <main className={styles.main} ><div>Please login</div></main>
    
  )
}
