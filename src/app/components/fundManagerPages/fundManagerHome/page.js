"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

export default function Dashboard_home() {
  //const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState([]); 

  useEffect(() => {
    // Simulate fetching notifications from an API
    const fetchedNotifications = [
      { id: 1, message: "New funding request submitted" },
      { id: 2, message: "Your post has been approved" }
    ];
    setNotifications(fetchedNotifications);
  }, []);

  const router = useRouter();

  function gotoUpload(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/fundManagerPages/submitPost"); // Use router.push() to navigate to the desired page
  }

  function goReviewPost(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/fundManagerPages/reviewPosts");
  }
  function gotoBudget(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/fundManagerPages/budgetReport");
  }
  function goReviewOpp(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/fundManagerPages/reviewopp");
  }

// <<<<<<< singoV2
  return (
    <div className="dashboard">
      <div className="option">
        <a href="#" onClick={gotoUpload}>
          Create opportunity
        </a>
      </div>
      <div className="option">
        <a href="/profile">Profile</a>
      </div>
      <div className="option">
        <a href="#" onClick={goReviewOpp}>
          Review existing opportunities
        </a>
      </div>
      <div className="option">
        <a href="#" onClick={goReviewPost}>
          Review Applications
        </a>
      </div>

      <div className="option">
        <a href="#" onClick={gotoBudget}>
          Budget and Report
        </a>
      </div>
    </div>
// =======
  


//   return(

//       <div className="dashboard">
//           <div className="option">
//               <a href="#" onClick={gotoUpload}>Submit a New Post</a>
//           </div>
//           <div className="option">
//               <a href="/profile">Profile</a>
//           </div>
//           <div className="option">
//               <a href="#" onClick={goReviewPost}>Review Posts</a>
//           </div>
       
//           <div className="option">
//               <a href="#" onClick={gotoBudget}>Budget and Report</a>
//           </div>


//          </div>
          

// >>>>>>> master
  );
}
