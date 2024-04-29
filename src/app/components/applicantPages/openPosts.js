"use client";
import "../../styles.css";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
export default function OpenPosts() {


  const { data: session } = useSession();
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const handleApply = async (e) => {
    e.preventDefault;
    

    const inputData = {
      postId: e.target.id,
      userId: session?.user.id,
    };
    
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
  };

  return (
    <section>
      {data?.map((postData) => {
        return (
          <div key={postData.postId} className="postDiv">
            <p>{postData.companyName}</p>
            <p>{postData.postContent}</p>
            <button className="postButtons"  key={postData.postId} id={postData.postId} onClick={handleApply}>Apply</button>
          </div>
        );
      })}
    </section>
  );
}
