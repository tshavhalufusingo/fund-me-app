"use client";
import styles from "../../../page.module.css";
import { useParams, useRouter } from "next/navigation"; // Import both hooks from 'next/navigation'
import { useState, useEffect } from "react";

export default function ReviewUser() {
  const params = useParams();
  const router = useRouter();
  const id = params.userId;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        setError(error.message); // Set error state if fetch fails
      }
    };
    fetchData();
  }, [id]); // Include 'id' in the dependency array

  return (
    <main className={styles.main}>
      <section id="UserProfile">
        {error ? ( // Render error message if there's an error
          <p>Error: {error}</p>
        ) : (
          <>
            <p>First name: {data?.firstname}</p>
            <p>Last name: {data?.lastname}</p>
          </>
        )}
      </section>
    </main>
  );
}
