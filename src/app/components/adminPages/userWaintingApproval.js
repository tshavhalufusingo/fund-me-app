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
          Users awaiting approval
        </h2>
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
        
        {data?.map((userdata) => {
          return (
            <tr key={userdata.userId}>
              <td>{userdata.userId}</td>
              <td>{userdata.firstname}</td>
              <td>{userdata.lastname}</td>
              <td>{userdata.userEmail}</td>
              <td>{userdata.userRole == 'FundManager' ? 'Fund Manager' : 'Applicant'}</td>
              <td>{userdata.statusId == 1 ? 'Pending' : userdata.statusId == 2 ? 'Approved' : 'Rejected'}</td>
              <td><button id={userdata.userId} key={userdata.userId}>Review</button></td>
            </tr>
          );
        })}

      </table>
        
    </div>
  );
}
