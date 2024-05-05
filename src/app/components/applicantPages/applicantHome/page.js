'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Dashboard_home(){
  const router = useRouter();

  function opnePosts(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/applicantPages/posts"); // Use router.push() to navigate to the desired page
  }

  function track(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/applicantPages/trackApplication"); // Use router.push() to navigate to the desired page
  }

    


  return(

      <div className="dashboard">
          <div className="option">
              <a href="#" onClick={opnePosts}>Check available opportunies</a>
          </div>
          <div className="option">
              <a href="/profile">Profile</a>
          </div>
          <div className="option">
              <a href="#" onClick={track}>Review Applications</a>
          </div>
        
      </div>
  );
}
