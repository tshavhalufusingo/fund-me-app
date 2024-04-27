"use client";
import Link from "next/link";
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
        <h2>Users awaiting approval</h2>
      </header>
      <table>
        <thead>
          <tr>
            <th>User id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((userdata) => {
            return (
              <tr key={userdata.userId}>
                <td>{userdata.userId}</td>
                <td>{userdata.firstname}</td>
                <td>{userdata.lastname}</td>
                <td>{userdata.userEmail}</td>
                <td>
                  {userdata.userRole == "FundManager"
                    ? "Fund Manager"
                    : "Applicant"}
                </td>
                <td>
                  {userdata.statusId == 1
                    ? "Pending"
                    : userdata.statusId == 2
                    ? "Approved"
                    : "Rejected"}
                </td>
                <td>
                  <Link href={`/user/${userdata.userId}`}>
                    <button id={userdata.userId} key={userdata.userId}>
                      Review
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
