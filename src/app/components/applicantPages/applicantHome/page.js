'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

import "../../../styles.css";


export default function Dashboard_home(){
  const router = useRouter();

  function opnePosts(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/applicantPages/posts"); // Use router.push() to navigate to the desired page
  }

  function rev(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/applicantPages/review"); // Use router.push() to navigate to the desired page
  }

  function openProfile(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/profile"); // Use router.push() to navigate to the desired page
  }

  


  return(

      <div className="dashboard">


              <button className="submit" onClick={opnePosts}>Check available opportunies</button>
              <div className="submit">
        <a href="/profile">Profile</a>

      </div> 
      <button className="submit" onClick={rev}>Track Application</button>



      </div>
  );
}
