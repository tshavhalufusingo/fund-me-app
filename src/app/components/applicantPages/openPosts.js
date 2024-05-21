"use client"; // Indicates that this file should be rendered on the client side

import styles from "../../page.module.css"; // Import CSS module for styling
import { useSession } from "next-auth/react"; // Import useSession hook from next-auth/react
import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import "../../styles.css"; // Import global styles
import "../../../styles.css"; // Import additional global styles

// Define the OpenPosts component
export default function OpenPosts() {
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

  // Function to handle applying for a post
  const handleApply = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const inputData = { // Create application data object
      postId: e.target.id, // Get post ID from the button ID
      userId: session?.user.id, // Get user ID from session data
    };

    const response = await fetch("/api/applications", { // Send POST request to submit application
      method: "POST", // Use POST method
      headers: {
        "Content-Type": "application/json", // Set content type header to JSON
      },
      body: JSON.stringify(inputData), // Convert application data object to JSON and send in the request body
    });
  };

  return (
    <section className={styles.main}> {/* Main content section with styling */}
      {data?.map((postData) => { // Map through post data and render each post
        return (
          <div key={postData.postId} className="postDiv"> {/* Post container */}
            <h1>{postData.companyName}</h1> {/* Company name */}
            <p>{postData.postContent}</p> {/* Post content */}
            <button
              className="submit" // Button styling class
              key={postData.postId} // Key for React reconciliation
              id={postData.postId} // ID for identifying the post
              onClick={handleApply} // Event handler for applying to the post
            >
              Apply {/* Apply button */}
            </button>
          </div>
        );
      })}
    </section>
  );
}
