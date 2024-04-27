"use client";
import { useState, useEffect } from "react";
export default function OpenPosts() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <section>
      {data?.map((postData) => {
        return (
          <div key={postData.postId}>
            <p>{postData.companyName}</p>
            <p>{postData.postContent}</p>
            <button>Apply</button>
          </div>
        );
      })}
    </section>
  );
}
