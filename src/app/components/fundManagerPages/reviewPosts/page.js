"use client";
import styles from "./../../../page.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "../../../styles.css";

// Main component for reviewing applications
export default function ReviewP() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [updatedStatus, setUpdatedStatus] = useState({});
  const [indivisualAmnt, setIndivisualAmt] = useState(0);
  const userId = session?.user?.id;

  // Function to handle status change for an application
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      const inputData2 = { postId: postId, fundingused: 10000 };

      const resp2 = await fetch("/api/updatefunds", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData2),
      });

      if (!resp2.ok) {
        const errorData = await resp2.json();
        throw new Error(errorData.error || "Failed to update funds");
      }

      setUpdatedStatus((prev) => ({ ...prev, [appid]: true }));
    } catch (error) {
      console.error("Error updating status or funds:", error);
    }
  };

  // Effect to fetch application data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `/api/applicationform?userId=${userId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch applications");
          }

          const data = await response.json();
          setIndivisualAmt(data[0].indivisualFund);
          console.log("Fetched Data:", data);
          setApplications(data);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchData();
  }, [userId]);

  // Function to get status label from status ID
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

  // Function to create a blob URL from base64 data
  const createBlobUrl = (base64Data) => {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    return URL.createObjectURL(blob);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Review Applications</h1>
      {applications.length > 0 ? (
        applications.map((application, index) => (
          <div className={styles.application} key={application.applicationId[0]}>
            <p className={styles.detail}>
              Funding opportunity: {application.postContent}
            </p>
            <p className={styles.detail}>
              Applicant Name: {application.firstname}
            </p>
            <p className={styles.detail}>
              Current Status: {getStatusLabel(application.statusId[1])}
            </p>
            <p className={styles.detail}>
              Application Date: {application.applicationDate}
            </p>

            <div className="Documents">
              {application.attachment && (
                <div className="DocumentBorder">
                  <a
                    className="documentAnchor"
                    href={createBlobUrl(application.attachment)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download {application.type}
                  </a>
                </div>
              )}
            </div>

            <select
              className={styles.select}
              value={statusMap[index] || application.statusId}
              onChange={(e) =>
                handleStatusChange(
                  index,
                  e.target.value,
                  application.applicationId[0],
                  application.postId[0]
                )
              }
              disabled={updatedStatus[application.applicationId]}
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
                  application.applicationId[0],
                  application.postId[0]
                )
              }
              disabled={updatedStatus[application.applicationId]}
            >
              Change Status
            </button>
          </div>
        ))
      ) : (
        <p>You have no applications</p>
      )}
    </main>
  );
}
