import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "../../../page.module.css";
import { useSession } from "next-auth/react";

export default function FundManagerHome() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    companyName: '',
    postContent: '',
    id: session?.user.id,
  });
  const [isReviewing, setIsReviewing] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (isReviewing) {
      // Fetch user posts when isReviewing becomes true
      fetchUserPosts();
    }
  }, [isReviewing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit post');
      }

      setFormData({
        companyName: '',
        postContent: '',
        id: session?.user.id,
      });
      alert('Post submitted successfully!');
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to submit post. Please try again later.');
    }
  };

  const handleReviewClick = () => {
    setIsReviewing(true);
  };
  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`/api/posts?userId=${session?.user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user posts');
      }
      const postData = await response.json();
      // Filter posts based on the current user ID
      const currentUserPosts = postData.filter(post => post.userId === session?.user.id);
      setUserPosts(currentUserPosts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };
  
  useEffect(() => {
    fetchUserPosts();
  }, [session]);

  return (
    <>
      <h1>Funding Manager Home</h1>

      {isReviewing && <h2>All your Posts</h2>}

      {!isReviewing ? (
        <>
          <h2>Submit a New Post</h2>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={styles.inputField}
            />
            <label htmlFor="postContent">Post Content:</label>
            <textarea
              id="postContent"
              name="postContent"
              value={formData.postContent}
              onChange={handleChange}
              className={styles.textareaField}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
          <button onClick={handleReviewClick}>Review Posts</button>
        </>
      ) : (
        <>
         <table>
        <thead>
          <tr>
            <th>Funding opportunity</th>
            <th>Number of applications</th>
          </tr>
        </thead>

        <tbody>
  {userPosts.map((post) => {
    return (
      <tr key={post.companyName}>
        <td>{post.companyName}</td>
        <td>{post.numberOfApplications}</td>
      </tr>
    );
  })}
</tbody>
       
      </table>
      








          <Link href="/FundManagerHome" passHref>
            <button>Back to Home</button>
          </Link>
        </>
      )}
    </>
  );
}









