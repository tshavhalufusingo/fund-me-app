'use client'
import styles from './../../../page.module.css'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ReviewP() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');



  const handleStatusChange = (index, sta) => {
    
    console.log(sta);


    console.log(`Changed status of application at index ${index} to ${selectedStatus}`);
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
          setApplications(data.filter(application => application.postId === 2));
          console.log(applications);
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
      {applications.map((application, index) => (
        <div className={styles.application} key={index}>
          <p className={styles.detail}>Applicant name: {application.columnName}</p>
          <p className={styles.detail}>Status: {getStatusLabel(application.statusId)}</p>
          <p className={styles.detail}>Phone number: {application.phoneNumber}</p>
          <p className={styles.detail}>Motivation: {application.motivation}</p>
          
          <select
            className={styles.select}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)} 
          >
            <option value="">Select Status</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>

          <button className={styles.button} onClick={() => handleStatusChange(index,application.statusId)}>Change Status</button>
        </div>
      ))}
    </main>
  );
}
