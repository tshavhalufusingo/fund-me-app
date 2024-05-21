"use client"; // Indicates that this file should be rendered on the client side
import { useState } from "react"; // Import the useState hook from React

export default function SendNotification() { // Define a default export function component
  const [message, setMessage] = useState(""); // Declare a state variable 'message' with an initial value of an empty string

  const sendNotification = async (e) => { // Define an asynchronous function 'sendNotification' that handles form submission
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('/api/admin', { // Send a POST request to the '/api/admin' endpoint
        method: 'POST', // Use the POST method
        headers: {
          'Content-Type': 'application/json', // Set the request content type to JSON
        },
        body: JSON.stringify({ userId: null, message }), // Send the 'message' state and a null 'userId' in the request body
      });

      if (response.ok) { // Check if the response status is OK (status code 200-299)
        setMessage(""); // Clear the 'message' state
        alert("Notification sent successfully"); // Show a success alert
      } else {
        alert("Failed to send notification"); // Show a failure alert if response is not OK
      }
    } catch (error) {
      console.error("Error sending notification:", error); // Log any errors that occur during the fetch request
    }
  };

  return (
    <div>
      <h2>Send Notification</h2> {/* Render a heading */}
      <form onSubmit={sendNotification}> {/* Attach the 'sendNotification' function to the form's onSubmit event */}
        <textarea
          value={message} // Bind the textarea value to the 'message' state
          onChange={(e) => setMessage(e.target.value)} // Update the 'message' state when the textarea value changes
          placeholder="Enter your message" // Display a placeholder in the textarea
          rows="4" // Set the number of rows in the textarea
          cols="50" // Set the number of columns in the textarea
        ></textarea>
        <br />
        <button type="submit">Send</button> {/* Render a submit button */}
      </form>
    </div>
  );
}
