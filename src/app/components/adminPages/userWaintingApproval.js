"use client";

import { useState, useEffect } from "react";
export default function UserWaintingApproval() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      <header>
        <h2>
          Users awaitimg approval
        </h2>
      </header>
      <table>
        <tr>
          <th>User id</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
        </tr>
      </table>
      <p>
        {data?.map((userdata) => {
          return (
            <tr key={userdata.userId}>
              <td>{userdata.userId}</td>
              <td>{userdata.firstname}</td>
              <td>{userdata.lastname}</td>
              <td>{userdata.userEmail}</td>
            </tr>
          );
        })}{" "}
      </p>{" "}
    </div>
  );
}
