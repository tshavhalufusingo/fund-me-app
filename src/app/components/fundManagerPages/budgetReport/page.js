'use client'
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import styles from "./../../../page.module.css"
import { useSession } from "next-auth/react";

export default function getAmountUsed() {
  const { data: session } = useSession(); // Destructure the data property from useSession

  // State to hold the fetched data
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("../../api/graphdata/graphcompanies");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setJsonData(jsonData); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [session]); // Include session in the dependency array


  console.log(jsonData);
  return (
    <main className={styles.main}>
      <h1>
        Budget
      </h1>
     
    </main>
  );
}
