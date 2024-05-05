'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "../../../page.module.css";

export default function OpenPosts() {
  const router = useRouter();
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
      </section>
    </main>
  );
}
