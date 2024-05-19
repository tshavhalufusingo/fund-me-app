"use client";
import styles from "../../../page.module.css";
import { useParams, } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ReviewUser() {
  const params = useParams();
  const router = useRouter();
  const id = params.userId;

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(...data);
      });
  }, []);
  return (
    <>
      <main className={styles.main}>
        <section id="UserProfile">
          <p>First name: {data?.firstname}</p>
          <p>Last name: {data?.lastname}</p>
          <p>First name: {data?.userEmail}</p>
        </section>
      </main>
    </>
  );
}
