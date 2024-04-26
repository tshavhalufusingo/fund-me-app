"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from "../../../page.module.css";


export default function FundManagerHome() {
  const [formData, setFormData] = useState({
    companyName: '',
    postContent: '',
    status: 'pending',
  });

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
        status: 'pending',
      });
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <>
      <h1>Funding Manager Home</h1>

      <h2>Submit a New Post</h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={styles.inputField}
          />
        </>
        <>
          <label htmlFor="postContent">Post Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={formData.postContent}
            onChange={handleChange}
            className={styles.textareaField}
          ></textarea>
        </>
        <button type="submit">Submit</button>
      </form>

      <h2 className={styles.reviewPosts}>Review Posts</h2>
      <Link href="/posts" passHref>
        <button>Review All Posts</button>
      </Link>
    </>
  );
}







