"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import SendNotification from "./sendNotification";

export default function UserWaitingApproval() {
  // Declare state variables to hold data, unapproved users, and approved users
  const [data, setData] = useState(null);
  const [unapprovedData, setUnapproved] = useState(null);
  const [approvedData, setApproved] = useState(null);

  // Fetch user data from the API and categorize users into unapproved and approved
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data); // Store all user data
        setUnapproved(
          data?.filter(
            (user) => user.statusId === 1 || user.statusId === 3
          )
        ); // Filter and store unapproved users
        setApproved(
          data?.filter(
            (user) => user.statusId === 2
          )
        ); // Filter and store approved users
      });

    console.log(unapprovedData);
  }, []);

  return (
    <div>
      <SendNotification />
      <header>
        <h2>Users awaiting approval</h2>
      </header>
      {unapprovedData?.length > 0 ? (
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
            {unapprovedData?.map((userdata) => {
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
      ) : (
        <p>no account is waiting for approval</p>
      )}

      <header>
        <h2>All system users</h2>
      </header>
      {approvedData?.length > 0 ? (
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
            {approvedData?.map((userdata) => {
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
      ) : (
        <p>no one is approved to use the system yet</p>
      )}
    </div>
  );
}
