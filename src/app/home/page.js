"use client";
import styles from "../page.module.css";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  if (session?.user) {
    return (
      <>
        <main className={styles.main}>
          <p>
            I am {session?.user.lastName + " " + session?.user.firstName} with a
            role of {session?.user?.role}
          </p>
        </main>
        ;
      </>
    );
  }

  return (
    <main className={styles.main}>
      <div>{session?.user?.role}</div>
    </main>
  );
}
