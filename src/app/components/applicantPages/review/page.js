"use client"; // Indicates that this file should be rendered on the client side
import styles from "./../../../page.module.css"; // Import CSS module for styling
import { useSession } from "next-auth/react"; // Import useSession hook from next-auth/react
import { useEffect, useState } from "react"; // Import useEffect and useState hooks from React // Import useRouter hook from next/navigation
import "../../../styles.css"; // Import global styles

// Define the Review component
export default function Review() {
  const { data: session } = useSession(); // Get session data using the useSession hook
  const [applications, setApplications] = useState([]); // State variable for storing applications
  const [userID, setuserID] = useState(null); // State variable for storing user ID

  useEffect(() => {
    const fetchApplications = async () => {
      // Function to fetch applications from the API
      try {
        const response = await fetch("/api/applications"); // Send GET request to fetch applications
        if (response.ok) {
          // Check if the response is successful
          const data = await response.json(); // Parse response JSON
          setuserID(session?.user.id); // Set the user ID from the session data
          setApplications(data); // Store the fetched applications
        } else {
          console.error("Failed to fetch applications:", response.status); // Log error if fetching fails
        }
      } catch (error) {
        console.error("Error fetching applications:", error); // Log error if an error occurs
      }
    };

    fetchApplications(); // Call the fetchApplications function on component mount
  }, []);

  console.log("user id", userID); // Log the user ID

  // Function to get status text based on status ID
  const getStatusText = (statusId) => {
    switch (statusId) {
      case 1:
        return "Pending";
      case 2:
        return "Approved";
      case 3:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  return (
    <main className={styles.main}>
      {" "}
      {/* Main content container with styling */}
      <h1>Review your applications</h1> {/* Heading */}
      <ul>
        {applications.map(
          (
            application // Map through applications and render each application
          ) =>
            application.userId == userID ? ( // Check if the application belongs to the current user
              <li key={application.applicationId}>
                {" "}
                {/* List item for each application */}
                <div className="applicantsreview">
                  {" "}
                  {/* Container for application details */}
                  <p>Application title: {application.companyName}</p>{" "}
                  {/* Company name */}
                  <p>Application date: {application.applicationDate}</p>{" "}
                  {/* Application date */}
                  <p>Status: {getStatusText(application.statusId)}</p>{" "}
                  {/* Application status */}
                </div>
              </li>
            ) : null // Render null if the application does not belong to the current user
        )}
      </ul>
    </main>
  );
}
