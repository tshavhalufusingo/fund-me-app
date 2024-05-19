"use client";
import styles from "./../../../page.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ReviewP() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [updatedStatus, setUpdatedStatus] = useState({});

  const userId = session?.user?.id;

  const handleStatusChange = async (index, status, appid, postId) => {
    const updatedStatusMap = { ...statusMap, [index]: status };
    setStatusMap(updatedStatusMap);

    const inputData = {
      applicationId: appid,
      status: status,
    };

    try {
      const resp = await fetch("/api/updateStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      console.log(
        `Changed status of application at index ${index} to ${status}, with application id ${appid}`
      );

      // Update funds only if status update was successful
      const inputData2 = {
        postId: postId,
        fundingused: 10000,
      };

      console.log("Sending data to update funds:", inputData2);

      const resp2 = await fetch("/api/updatefunds", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData2),
      });

      if (!resp2.ok) {
        const errorData = await resp2.json();
        throw new Error(errorData.error || "Failed to update funds");
      }

      console.log("Funds updated successfully");

      // Update the updatedStatus state to disable dropdown and button
      setUpdatedStatus((prev) => ({ ...prev, [appid]: true }));
    } catch (error) {
      console.error("Error updating status or funds:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `/api/applicationform?userId=${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch applications");
          }

          const data = await response.json();
          setApplications(data);
          console.log("appication data", data); // Log the fetched data instead of applications
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchData();
  }, [userId]);

  const getStatusLabel = (statusId) => {
    switch (statusId) {
      case 1:
        return "Pending";
      case 2:
        return "Approved";
      case 3:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Review Applications</h1>
      {applications.map((application, index) => (
        <div className={styles.application} key={application.applicationId}>
          <p className={styles.detail}>
            Funding opportunity: {application.postContent}
          </p>
          <p className={styles.detail}>
            Applicant Name: {application.firstname}
          </p>
          <p className={styles.detail}>
            Current Status: {getStatusLabel(application.statusId)}
          </p>
          <p className={styles.detail}>
            Application Date: {application.applicationDate}
          </p>

          <select
            className={styles.select}
            value={statusMap[index] || application.statusId}
            onChange={(e) =>
              handleStatusChange(
                index,
                e.target.value,
                application.applicationId,
                application.postId
              )
            }
            disabled={updatedStatus[application.applicationId]} // Disable if status updated
          >
            <option value="">Select Status</option>
            <option value="1">Pending</option>
            <option value="2">Approved</option>
            <option value="3">Rejected</option>
          </select>

          <button
            className={styles.button}
            onClick={() =>
              handleStatusChange(
                index,
                statusMap[index] || application.statusId,
                application.applicationId,
                application.postId
              )
            }
            disabled={updatedStatus[application.applicationId]} // Disable if status updated
          >
            Change Status
          </button>
          <Link href={`/user/${application.userId[1]}/review`}>
            <button id={application.userId} key={application.userId}>
              Review applicant profile
            </button>
          </Link>
        </div>
      ))}
    </main>
  );
}
