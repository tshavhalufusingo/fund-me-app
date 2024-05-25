"use client";

import { useState, useEffect, Fragment } from "react";
import styles from "../../../../page.module.css";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import "../../../../styles.css";

export default function submit_post() {
  const { data: session } = useSession();
  const [userPost, setUserPost] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`/api/posts/byid/${params.postId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("single post for review", data);
        setUserPost(...data);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let companyName = document.getElementById("companyName").value;
    let postContent = document.getElementById("postContent").value;
    let opportunityType = document.getElementById("opportunityType").value;
    let fundingAmount = document.getElementById("fundingAmount").value;
    let applicationDeadline = document.getElementById(
      "applicationDeadline"
    ).value;

    const formData = {
      companyName: companyName,
      postContent: postContent,
      id: params.postId,
      opportunityType: opportunityType,
      fundingAmount: fundingAmount,
      applicationDeadline: applicationDeadline,
    };

    console.log(formData);

    try {
      const response = await fetch("/api/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit post");
      }

      alert("Post updated successfully!");
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post. Please try again later.");
    }
  };

  return (
    <>
      <main className={styles.main}>
        <div className="newpostbody">
          <h1 className="homeheader">Review Opportunity post</h1>

          {session?.user.userPermission ? (
            <>
              <h2>Submit a New Post</h2>
              <p>{userPost.companyName}</p>
              <form onSubmit={handleSubmit} className={styles.formContainer}>
                <label htmlFor="companyName">Title:</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  defaultValue={userPost.companyName}
                  className={styles.inputField}
                />

                <label htmlFor="opportunityType">Opportunity Type:</label>
                <select
                  id="opportunityType"
                  name="opportunityType"
                  className={styles.selectField}
                >
                  <option
                    value="educational"
                    selected={userPost.opportunityType == "educational"}
                  >
                    Educational
                  </option>
                  <option
                    value="business"
                    selected={userPost.opportunityType == "business"}
                  >
                    Business
                  </option>
                  <option
                    value="events"
                    selected={userPost.opportunityType == "events"}
                  >
                    Events
                  </option>
                </select>

                <label htmlFor="postContent">Description:</label>
                <textarea
                  id="postContent"
                  name="postContent"
                  defaultValue={userPost.postContent}
                  className={styles.textareaField}
                ></textarea>

                <label htmlFor="fundingAmount">Funding Amount:</label>
                <input
                  type="number"
                  id="fundingAmount"
                  name="fundingAmount"
                  defaultValue={userPost.fundingAmount}
                  className={styles.inputField}
                />

                <label htmlFor="applicationDeadline">
                  Application Deadline:
                </label>
                <input
                  type="date"
                  id="applicationDeadline"
                  name="applicationDeadline"
                  defaultValue={userPost.applicationDeadline?.split("T")[0]}
                  className={styles.inputField}
                />
                <button type="submit">Update</button>
              </form>
            </>
          ) : (
            <>
              <h1>This post no longer exist</h1>
            </>
          )}
        </div>
      </main>
    </>
  );
}
