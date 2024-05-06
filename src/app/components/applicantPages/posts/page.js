'use client'

"use client";
import styles from "../../../page.module.css";
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "../../../page.module.css";

export default function OpenPosts() {
  const router = useRouter();

  const handleApplication = (e) => {
    e.preventDefault();
    const postId = e.target.id;
    router.push(`/apply/${postId}`);
  };

  const { data: session } = useSession();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  const handleApplication = (e, postId) => {
    e.preventDefault();
    const route = `/components/applicantPages/applicationForm?postId=${postId}`;
    router.push(route);
  };
    

  return (
    <main className={styles.customDis}>
      <section>

        {data?.map((postData) => (
          <div key={postData.postId} className="postDiv">
            <p> Company : {postData.companyName}</p>
            <p> Information : {postData.postContent}</p>
            <p>Closing date :</p>
            <button
              className="postButtons"
              onClick={(e) => handleApplication(e, postData.postId)} // Pass a function reference to onClick
              key={postData.postId}
              id={postData.postId}
            >
              Apply
            </button>
          </div>
        ))}
        {data?.map((postData) => {
          return (
            <div key={postData.postId} className="postDiv">
              <h1>{postData.companyName}</h1>
              <p>{postData.postContent}</p>
              <p>Funding Type : {postData.opportunityType}</p>
              <p>Closing date : {postData.applicationDeadline.split("T")[0]}</p>
              <button
                className="postButtons"
                onClick={handleApplication} // Event handler defined within the component
                key={postData.postId}
                id={postData.postId}
              >
                Apply
              </button>
            </div>
          );
        })}
      </section>
    </main>
  );
}
