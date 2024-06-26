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
      { id: 2, message: "Your post has been approved" },
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

  function goToProfile(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push("/profile");
  }
  return (
    <div className="dashboard">
      <button onClick={gotoUpload}>Create opportunity</button>

      <button onClick={goToProfile}>Profile</button>
      <button onClick={goReviewOpp}>Review existing opportunities</button>
      <button onClick={goReviewPost}>Review Applications</button>
      <button onClick={gotoBudget}>Budget and Report</button>
    </div>
  );
}
