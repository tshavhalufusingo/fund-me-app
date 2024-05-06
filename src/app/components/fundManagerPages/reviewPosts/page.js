'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../../page.module.css";
import { useSession } from "next-auth/react";
import { Main } from "next/document";

export default function ReviewPage() {
  const { data: session } = useSession();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`/api/applications/${session?.user.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user posts");
      }
      const currentUserPosts = await response.json();
      setUserPosts(currentUserPosts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  return (
    <main style={styles.main}>
      <h2>Application Review</h2>
      <table>
        <thead>
          <tr>
            <th>Funding opportunity</th>
            <th>Applicant name</th>
            <th>Latest status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userPosts.map((post) => (
            <tr key={post.postId}>
              <td>{post.postname}</td>
              <td>{post.username}</td>
              <td>
                {post.statusId === "1"
                  ? "Pending"
                  : post.statusId === "2"
                  ? "Approved"
                  : "Rejected"}
              </td>
              <td>
                <button
                  onClick={() => {
                    fetch(`/api/applications/${post.postId}/${post.userId}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ status: 3 }),
                    });
                  }}
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    fetch(`/api/applications/${post.postId}/${post.userId}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ status: 2 }),
                    });
                  }}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/" passHref>
        <button>Back to Home</button>
      </Link>
    </main>
  );
}
