"use client";
import Link from "next/link";
import "../styles.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaBell } from "react-icons/fa";
import { useState, useEffect } from "react";

// Navbar component for displaying the navigation bar
export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const logosource = "https://scontent.xx.fbcdn.net/v/t1.15752-9/440589588_1416138286453095_6091461302783876786_n.jpg?stp=dst-jpg_p403x403&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kgKvlL23V2QQ7kNvgGGhxLo&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QEhAF5fEM4BOLJJ1JzTk6lmN2rNL_M7yw-Ho885MyDcqA&oe=66558C68";

  // Function to handle user logout
  const LogOut = (e) => {
    e.preventDefault();
    signOut({ callbackUrl: "/" });
  };

  // Function to navigate to the home page based on user session
  const gotoHome = async (e) => {
    e.preventDefault();
    if (session?.user) {
      router.push("/home");
    } else {
      router.push("/");
    }
  };

  // Fetch notifications if the user is logged in and not an admin
  useEffect(() => {
    if (session?.user && session?.user.role !== "Admin") {
      fetchNotifications();
    }
  }, [session]);

  // Function to fetch notifications from the server
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/admin?userId=${session.user.id}`);
      const data = await response.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // Function to toggle the display of notifications
  const toggleNotifications = async () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      await fetchNotifications();
      await markNotificationsAsRead();
    }
  };

  // Function to mark notifications as read
  const markNotificationsAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.isRead);
      for (const notification of unreadNotifications) {
        await fetch(`/api/admin`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notificationId: notification.id }),
        });
      }
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  // Render the navbar based on user session
  if (session?.user) {
    return (
      <>
        <nav className="navbar">
          <div className="headerx">
            <img
              src={logosource}
              className="mylogo"
              onClick={gotoHome}
              style={{ width: "60px", height: "60px" }}
            ></img>

            <header>
              <h1>
                <Link href="/home"> Fund ME</Link>
              </h1>
            </header>
          </div>
          <ul>
            {session?.user.role === "Admin" ? (
              <li>
                <p> hi {session?.user.email}</p>
              </li>
            ) : (
              <>
                <div className="notification" onClick={toggleNotifications}>
                  <FaBell size={20} />
                  {unreadCount > 0 && (
                    <span className="badge">{unreadCount}</span>
                  )}
                  {showNotifications && (
                    <div className="dropdownn">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="notification-item"
                        >
                          {notification.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            <li>
              <button onClick={LogOut}> Sign out </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }

  // Render the navbar for non-logged-in users
  return (
    <nav className="navbar">
      <div className="headerx">
        <img
          src={logosource}
          className="mylogo"
          onClick={gotoHome}
          style={{ width: "60px", height: "60px" }}
        ></img>

        <header>
          <h1>Fund ME</h1>
        </header>
      </div>
    </nav>
  );
}
