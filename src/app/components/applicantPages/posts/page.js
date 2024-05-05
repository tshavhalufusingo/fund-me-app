"use client";
import styles from "../../../page.module.css"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OpenPosts() {
  const router = useRouter();

  const handleApplication = (e) => {
    e.preventDefault();
    router.push("/components/applicantPages/applicationForm");
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

  return (
    <main className={styles.customDis}>

    <section>
      {data?.map((postData) => {
        return (
          <div key={postData.postId} className="postDiv">
            <h1>{postData.companyName}</h1>
            <p>{postData.postContent}</p>
            <p>Funding Type : {postData.opportunityType}</p>
            <p>Closing date : {postData.applicationDeadline.split('T')[0]}</p>
            <button
              className="postButtons"
              onClick={handleApplication}  // Event handler defined within the component
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
