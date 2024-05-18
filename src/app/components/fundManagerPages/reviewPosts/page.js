'use client'
import styles from './../../../page.module.css'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ReviewP() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState([]);
  const [statusMap, setStatusMap] = useState({}); // State to track status for each application

  const handleStatusChange = async (index, status, appid) => {
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

      console.log(`Changed status of application at index ${index} to ${status}, with application id ${appid}`);
      // Optionally, you can refresh the data or navigate to another page
      // router.push("/");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          const response = await fetch(`/api/applicationform`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch applications");
          }

          const data = await response.json();
          setApplications(data.filter(application => application.postId > 0));
          console.log(data); // Log the fetched data instead of applications
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchData();
  }, [session]);

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

      {
        applications.map((application, index) => (
          <div className={styles.application} key={application.applicationId}>
            <p className={styles.detail}>Status: {getStatusLabel(application.statusId)}</p>

            <select
              className={styles.select}
              value={statusMap[index] || application.statusId || ''} // Handle initial value
              onChange={(e) => handleStatusChange(index, e.target.value, application.applicationId)}
            >
              <option value="">Select Status</option>
              <option value="1">Pending</option>
              <option value="2">Approved</option>
              <option value="3">Rejected</option>
            </select>

            <button
              className={styles.button}
              onClick={() => handleStatusChange(index, statusMap[index] || application.statusId, application.applicationId)}
            >
              Change Status
            </button>
          </div>
        ))
      }
    </main>
  );
}
  