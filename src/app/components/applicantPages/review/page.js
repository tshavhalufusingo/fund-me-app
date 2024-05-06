'use client'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../../../page.module.css";

export default function MyComponent() {
    const { session } = useSession();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                const userId = session.user.id;
                try {
                    const response = await fetch('/api/applications');
                    if (response.ok) {
                        const data = await response.json();
                        // Filter applications based on userId
                        const userApplications = data.filter(app => app.userId === userId);
                        setApplications(userApplications);
                        console.log(userApplications.length); // Log filtered applications length
                    } else {
                        console.error('Failed to fetch applications:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching applications:', error);
                }
            }
        };

        fetchData();
    }, [session]);

    return (
        <main className={styles.main}>
            <div>
                <h1> My Applications</h1>
                <ul>
                    {applications.map(app => (
                        <li key={app.applicationId}>    
                            Application ID: {app.applicationId}, Status ID: {app.statusId}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
