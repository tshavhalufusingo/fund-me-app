"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../../../page.module.css";
import Link from "next/link";

export default function page() {
  const { data: session } = useSession();
  const [opportunities, setOpportunities] = useState(null);

  // Fetch opportunities data on component mount
  useEffect(() => {
    // Fetch opportunities data for the logged-in user
    const fetchOpportunities = async () => {
      try {
        const response = await fetch(`/api/posts/${session?.user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch opportunities data");
        }
        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        console.error("Error fetching opportunities:", error.message);
      }
    };

    if (session) {
      fetchOpportunities();
    }
  }, [session]);

  return (
    <main className={styles.main}>
      <header>
        <h2>Users awaiting approval</h2>
      </header>
      {opportunities?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Title</th>
              <th>Deadline</th>
              <th>Total</th>
              <th>Allocated</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((data) => (
              <tr key={data.postId}>
                <td>{data.postId}</td>
                <td>{data.companyName}</td>
                <td>{data.applicationDeadline.split("T")[0]}</td>
                <td>{data.fundingAmount}</td>
                <td>{data.fundingused}</td>
                <td>
                  <Link href={`/components/fundManagerPages/reviewopp/${data.postId}`}>
                    <button id={data.postId} key={data.postId}>
                      Review
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No existing opportunities</p>
      )}
    </main>
  );
}
