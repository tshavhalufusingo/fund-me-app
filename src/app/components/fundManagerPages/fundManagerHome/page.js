import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Dashboard_home(){
  const router = useRouter();

  function gotoUpload(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/fundManagerPages/submitPost"); // Use router.push() to navigate to the desired page
  }

  function goReviewPost(event){

    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/fundManagerPages/reviewPosts"); 
    

  }
  function gotoProfile(event){

    event.preventDefault(); // Prevent the default behavior of the anchor tag
    router.push(".//../components/profile"); 
    
    
  }

  


  return(

      <div className="dashboard">
          <div className="option">
              <a href="#" onClick={gotoUpload}>Submit a New Post</a>
          </div>
          <div className="option">
              <a href="/profile">Profile</a>
          </div>
          <div className="option">
              <a href="#" onClick={goReviewPost}>Review Posts</a>
          </div>
          <div className="option">
              <a href="/metrics">Metrics</a>
          </div>
          <div className="option">
              <a href="/budget">Budget</a>
          </div>
      </div>
  );
}
