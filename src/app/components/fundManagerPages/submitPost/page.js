"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import styles from "../../../page.module.css";
import { useSession } from "next-auth/react";
import "../../../styles.css";

// Component for submitting a new post
export default function SubmitPost() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    companyName: "",
    postContent: "",
    id: session?.user.id,
    opportunityType: "",
    fundingAmount: "",
    indivisualFund: "",
    applicationDeadline: "",
  });

  const [validationMessage, setValidationMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.opportunityType) {
      setValidationMessage("Please choose the opportunity type.");
      return;
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit post");
      }

      setFormData({
        companyName: "",
        postContent: "",
        id: session?.user.id,
        opportunityType: "",
        fundingAmount: "",
        indivisualFund: "",
        applicationDeadline: "",
      });
      setValidationMessage("");
      alert("Post submitted successfully!");
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post. Please try again later.");
    }
  };

  return (
    <main className={styles.main}>
      {session?.user.userPermission && (
        <>
          <h2>Submit a New Post</h2>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <label htmlFor="companyName">Title:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={styles.inputField}
            />

            <label htmlFor="opportunityType">Opportunity Type:</label>
            <select
              id="opportunityType"
              name="opportunityType"
              value={formData.opportunityType}
              onChange={handleChange}
              className={styles.selectField}
            >
              <option value="">Select an opportunity type</option>
              <option value="educational">Educational</option>
              <option value="business">Business</option>
              <option value="events">Events</option>
            </select>

            <label htmlFor="postContent">Description:</label>
            <textarea
              id="postContent"
              name="postContent"
              value={formData.postContent}
              onChange={handleChange}
              className={styles.textareaField}
            ></textarea>

            <label htmlFor="fundingAmount">Funding Amount:</label>
            <input
              type="number"
              id="fundingAmount"
              name="fundingAmount"
              value={formData.fundingAmount}
              onChange={handleChange}
              className={styles.inputField}
            />

            <label htmlFor="indivisualFund">Funding for each individual:</label>
            <input
              type="number"
              id="indivisualFund"
              name="indivisualFund"
              value={formData.indivisualFund}
              onChange={handleChange}
              className={styles.inputField}
            />

            <label htmlFor="applicationDeadline">Application Deadline:</label>
            <input
              type="date"
              id="applicationDeadline"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className={styles.inputField}
            />

            {validationMessage && (
              <p className={styles.validationMessage}>{validationMessage}</p>
            )}

            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        </>
      )}
    </main>
  );
}
