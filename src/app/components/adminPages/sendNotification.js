"use client";
import { useState } from "react";

export default function SendNotification() {
  const [message, setMessage] = useState("");

  const sendNotification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: null, message }), // userId: null for broadcasting to all users
      });

      if (response.ok) {
        setMessage("");
        alert("Notification sent successfully");
      } else {
        alert("Failed to send notification");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <form onSubmit={sendNotification}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          rows="4"
          cols="50"
        ></textarea>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
