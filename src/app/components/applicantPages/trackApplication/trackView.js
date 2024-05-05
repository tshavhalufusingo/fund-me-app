'use client'
import styles from "./../../../page.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "./../../../styles.css"

export default function Status() {
  const { data: session } = useSession();
  const userID = session?.user.id;

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("../../api/applicationStatus");
        const jsonData = await response.json();
        const userApplications = jsonData.filter(app => app.userId === userID);

        console.log(userApplications)

        if(userApplications.length == 0){
            return(

                <h1>
                    No current applications
                </h1>

            );
        }
        setApplications(userApplications);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [userID]);




  return (
    <main className={styles.main}>
      <div>
        <h1>Application Status</h1>
        <ul>
          {applications.map((app, index) => (

            <div className="MyApplications">
            <li key={index}>
              <div>
              Status: {app.statusId === 1 ? "Pending" : app.statusId === 2 ? "Accepted" : app.statusId === 3 ? "Rejected" : ""}
              </div>
              <div> Company: {app.application_data}</div>
            </li>

            </div>
          ))}
        </ul>
      </div>
    </main>
  );
}
