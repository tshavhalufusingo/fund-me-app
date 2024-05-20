'use client'
import styles from './../../../page.module.css';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import './../../../styles.css'
export default function Review() {
    const { data: session } = useSession();
    const [applications, setApplications] = useState([]);
    const [userID, setuserID] = useState(null);

    const router = useRouter();

    const openApplicationForm = (e) =>{
        e.preventDefault();
        const postId = e.target.id;
        router.push(`/apply/${postId}`)
    }

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('/api/applications');
                if (response.ok) {
                    const data = await response.json();
                
                    setuserID(session?.user.id)

                    setApplications(data);
                } else {
                    console.error('Failed to fetch applications:', response.status);
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    console.log('user id',userID)


    const getStatusText = (statusId) => {
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

            <h1>Review your applications</h1>
            <ul>
                {applications.map(application => (
                    application.userId == userID ? (
                        <li key={application.applicationId}>
                            <div className='applicantsreview'>
                                <p>Application title: {application.companyName}</p>
                                <p>App;ication date: {application.applicationDate}</p>
                                <p>Status: {getStatusText(application.statusId)}</p>
                            </div>
                        </li>
                    ) : null
                ))}
            </ul>
 
        </main>
    );
}