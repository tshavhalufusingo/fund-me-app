"use client"; // Indicates that this file should be rendered on the client side
import styles from "../../../page.module.css"; // Import CSS module for styling
import { useSession } from "next-auth/react"; // Import useSession hook from next-auth/react
import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import { useRouter } from "next/navigation"; // Import useRouter hook from next/navigation

// Define the OpenPosts component
export default function OpenPosts() {
  const router = useRouter(); // Get router object for navigation

  // Function to handle application button click
  const handleApplication = (e) => {
    e.preventDefault(); // Prevent default form submission
    const postId = e.target.id; // Get the post ID from the button ID
    router.push(`/apply/${postId}`); // Navigate to the apply page with the post ID
  };

  const { data: session } = useSession(); // Get session data using the useSession hook
  const [data, setData] = useState(null); // State variable for storing post data

  // Fetch post data from the API on component mount
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data); // Store the fetched post data
      });
  }, []);

  return (
    <main className={styles.customDis}> {/* Main content container with custom styling */}
      <section>
        {data?.map((postData) => { // Map through post data and render each post
          return (
            <div key={postData.postId} className="postDiv"> {/* Post container */}
              <h1>{postData.companyName}</h1> {/* Company name */}
              <p>{postData.postContent}</p> {/* Post content */}
              <p>Funding Type : {postData.opportunityType}</p> {/* Funding type */}
              <p>Closing date : {postData.applicationDeadline.split("T")[0]}</p> {/* Application deadline */}
              <button
                className="postButtons" // Button styling class
                onClick={handleApplication} // Event handler for applying to the post
                key={postData.postId} // Key for React reconciliation
                id={postData.postId} // ID for identifying the post
              >
                Apply {/* Apply button */}
              </button>
            </div>
          );
        })}
      </section>
    </main>
  );
}
