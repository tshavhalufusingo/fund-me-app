"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function page() {
  const { data: session } = useSession();
  const [opportunities, setOpportunities] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${session?.user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOpportunities(data);

      });
  }, []);

  return (
    <main>
    
      <header>
        <h2>Users awaiting approval</h2>
      </header>
      {opportunities?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>post id</th>
              <th>Title</th>
              <th>Deadline</th>
              <th>Total</th>
              
            </tr>
          </thead>
          <tbody>
            {opportunities?.map((data) => {
              return (
                <tr key={data.postId}>
                  <td>{data.postId}</td>
                  <td>{data.companyName}</td>
                  <td>{data.applicationDeadline.split("T")[0]}</td>
                  <td>{data.fundingAmount}</td>
                  <td>
                    <Link href={`/components/fundManagerPages/reviewopp/${data.postId}`}>
                      <button id={data.postId} key={data.postId}>
                        Review
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>no account is waiting for approval</p>
      )}
    </main>
  );
}
