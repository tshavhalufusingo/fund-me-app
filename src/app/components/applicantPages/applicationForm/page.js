"use client"; // Indicates that this file should be rendered on the client side
import styles from "../../../page.module.css"; // Import CSS module for styling
import "../../../styles.css"; // Import global styles
import { useSession } from "next-auth/react"; // Import useSession hook from next-auth/react
import { useParams } from "next/navigation"; // Import useParams hook from next/navigation
import { useState } from "react"; // Import useState hook from React

// Get current date for application
const date = new Date();
const applicationDate = date.toISOString().split("T")[0]; 

// Define the ApplicationForm component
export default function ApplicationForm() {
  const params = useParams(); // Get parameters from the URL
  const { data: session, status } = useSession(); // Get session data using the useSession hook
  const [documents, setDocuments] = useState([]); // State variable for storing uploaded documents
  const [loading, setLoading] = useState(false); // State variable for loading state
  const [error, setError] = useState(null); // State variable for error handling

  // Function to handle file upload
  const handleFile = (event) => {
    const documentType = document.getElementById("documentType").value; // Get selected document type
    const file = event.target.files[0]; // Get the uploaded file

    if (!file) return; // Return if no file is selected

    const allowedExt = /\.(pdf|txt)$/i; // Define allowed file extensions
    if (!allowedExt.test(file.name)) { // Check if file extension is allowed
      alert("Invalid type, only PDF and TXT files are allowed"); // Show alert for invalid file type
      return;
    }

    const fileReader = new FileReader(); // Create a FileReader object
    fileReader.readAsDataURL(file); // Read the file as a data URL
    fileReader.onloadend = () => { // Execute when file reading is completed
      const base64data = fileReader.result; // Get the base64 representation of the file
      setDocuments((prev) => [...prev, { type: documentType, content: base64data, name: file.name }]); // Update the documents state with the new file
    };
  };

  // Function to handle application submission
  const handleApplication = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true
    setError(null); // Reset error state

    console.log("the date is ", applicationDate); // Log the application date

    try {
      const inputData = { // Create application data object
        postId: parseInt(params.postId), // Get post ID from URL parameters
        userId: session?.user.id, // Get user ID from session data
        statusId: 1, // Set initial status ID for the application
        date: date.toISOString().split("T")[0], // Get current date for the application
      };

      const response = await fetch(`/api/applications/${params.postId}`, { // Send POST request to submit application
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json", // Set content type header to JSON
        },
        body: JSON.stringify(inputData), // Convert application data object to JSON and send in the request body
      });

      if (!response.ok) throw new Error("Failed to submit application"); // Throw error if response is not OK

      const applicationData = await response.json(); // Parse response JSON

      for (const document of documents) { // Iterate through uploaded documents
        const pdf = { // Create PDF object for attachment
          attachment: document.content, // Set attachment content
          type: document.type, // Set document type
          applicationId: applicationData.applicationId, // Set application ID
        };

        await fetch("/api/attachments", { // Send POST request to save attachment
          method: "POST", // Use POST method
          headers: {
            "Content-Type": "application/json", // Set content type header to JSON
          },
          body: JSON.stringify(pdf), // Convert PDF object to JSON and send in the request body
        });
      }

      alert("Application submitted successfully"); // Show success message
    } catch (err) {
      setError(err.message); // Set error state if an error occurs
    } finally {
      setLoading(false); // Set loading state to false after submission
    }
  };

  return (
    <main className={styles.main}> {/* Main content container with styling */}
      <form className="applicationForm" onSubmit={handleApplication}> {/* Application form with submit handler */}
        <label htmlFor="attachment">Attachments:</label> {/* Label for file input */}
        <input type="file" id="attachment" onChange={handleFile} name="attachment" required /> {/* File input for attachments */}

        <label htmlFor="documentType">Document Type:</label> {/* Label for document type selection */}
        <select id="documentType" name="documentType" required> {/* Dropdown for selecting document type */}
          <option value="Identity Document">ID</option> {/* Option for identity document */}
          <option value="CV">CV</option> {/* Option for CV */}
          <option value="Motivation">Motivation</option> {/* Option for motivation letter */}
          <option value="Other">Other</option> {/* Option for other documents */}
        </select>

        <div className="documentsDiv" id="documentsDiv"> {/* Container for displaying uploaded documents */}
          {documents.map((doc, index) => ( // Map through uploaded documents and display them
            <div key={index}> {/* Display document name and type */}
              <a href={doc.content} download={doc.name}>{doc.name}</a> - {doc.type}
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}> {/* Submit button */}
          {loading ? "Submitting..." : "Submit"} {/* Display different text based on loading state */}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if an error occurs */}
      </form>
    </main>
  );
}
