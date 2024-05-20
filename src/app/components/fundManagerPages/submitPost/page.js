"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import styles from "../../../page.module.css"
import { useSession } from "next-auth/react";
import "../../../styles.css";

export default function submit_post() {
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
  const [isReviewing, setIsReviewing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (isReviewing) {
      // Fetch user posts when isReviewing becomes true
      fetchUserPosts();
    }
  }, [isReviewing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      alert("Post submitted successfully!");
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post. Please try again later.");
    }
  };

  const [data, setData] = useState(null);

  const handleReviewClick = () => {
    setIsReviewing(true);
  };
  const fetchUserPosts = async () => {
    try {
      // const response = await fetch(`/api/posts?userId=${session?.user.id}`);
      const response = await fetch(`/api/applications/${session?.user.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user posts");
      }
      const currentUserPosts = await response.json();
      // Filter posts based on the current user ID
      // const currentUserPosts = postData.filter(
      //   (post) => post.userId === session?.user.id
      // );
      console.log(currentUserPosts);
      setUserPosts(currentUserPosts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [session]);

  return (
    <>


          {session?.user.userPermission ? (
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


      <h1 className="homeheader">Funding Manager Home</h1>

      {isReviewing && <h2>Application Review</h2>}

      {!isReviewing && session?.user.userPermission ? (
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
            </>
          ) : 
          (
            <>
              <h1>This account is not permited to creat new opportunities</h1>
            </>
          )}
        </div>
      </main>
    </>
  );
}
