"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../../page.module.css";
import { useSession } from "next-auth/react";

export default function FundManagerHome() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    companyName: "",
    postContent: "",
    id: session?.user.id,
    opportunityType: "",
    fundingAmount: "",
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
        applicationDeadline: "",
      });
      alert("Post submitted successfully!");
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post. Please try again later.");
    }
  };

  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch(`/api/applications/${session?.user.id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUserPosts(...currentUserPosts);
  //     });
  // }, []);

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
      <h1>Funding Manager Home</h1>

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

            <label htmlFor="fundingAmount">Funding Amount:</label>
            <input
              type="number"
              id="fundingAmount"
              name="fundingAmount"
              value={formData.fundingAmount}
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

            <button type="submit">Submit</button>
          </form>

          <button onClick={handleReviewClick}>Review Posts</button>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Funding opportunity</th>
                <th>Applicant name</th>
                <th>Action </th>
              </tr>
            </thead>

            <tbody>
              {userPosts.map((post) => {
                return (
                  <tr key={post.postId}>
                    <td>{post.postname}</td>
                    <td>{post.username}</td>
                    <td><button>Review</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Link href="/" passHref>
            <button>Back to Home</button>
          </Link>
        </>
      )}
    </>
  );
}
