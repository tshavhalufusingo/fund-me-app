"use client";
import Link from "next/link";
import "../styles.css";
import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const logosource =
    "https://scontent.xx.fbcdn.net/v/t1.15752-9/440589588_1416138286453095_6091461302783876786_n.jpg?stp=dst-jpg_p403x403&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kgKvlL23V2QQ7kNvgGGhxLo&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QEhAF5fEM4BOLJJ1JzTk6lmN2rNL_M7yw-Ho885MyDcqA&oe=66558C68";

  const LogOut = (e) => {
    e.preventDefault();
    signOut({ callbackUrl: "/" }); // Use signOut from next-auth/react
  };

  const gotoSendMessage = async (e) => {
    e.preventDefault;
    router.push("/components/contactUs");
  };

  if (session?.user) {
  }
  const gotoHome = async (e) => {
    if (session?.user) {
      e.preventDefault;
      router.push("/home");
    } else {
      e.preventDefault;
      router.push("/");
    }
  };

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
            {session?.user.role == "Admin" ? (
              <>
                <li>
                  <Link href="/home">Dashboard</Link>
                </li>
              </>
            ) : null}
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={LogOut}> Sign out </button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
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

      <div className="navRight">
        <button className="contactUsButton" onClick={gotoSendMessage}>
          Contact Us
        </button>

        <div className="dropdown">
          <div className="default">Learn About ▼</div>
          <div className="dropdown-content">
            <a href="#">Our Staff</a>
            <a href="#">Our Services</a>
            <a href="#">Company Profile</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
