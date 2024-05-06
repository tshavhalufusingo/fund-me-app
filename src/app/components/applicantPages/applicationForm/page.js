"use client";
import styles from "../../../page.module.css";
import "../../../styles.css";
import { useSession } from "next-auth/react";
import { useParams, } from "next/navigation";

export default function ApplicationForm() {
  const params = useParams();
  const { data: session, status } = useSession();
  const attachmentUrl = ""; // Add URL to the uploaded file here

  const handlefile =(event)=>{

    const fileReader = new FileReader()
    const file =  event.target.files[0];

    if(!file){
      return;
    }

    const allowedExt = /\.(pdf|txt)$/i;

    if(!allowedExt.test(file.name)){
      alert("Invalid type only pdf allowed")
      
    }

    fileReader.readAsDataURL(file);
    fileReader.addEventListener('loadend',()=>{
      if(fileReader.result != null){
        console.log(fileReader.result)
      }
    })
  }

  const handleApplication = async (e) => {
    e.preventDefault;
    const inputData = {
      postId: params.postId,
      userId: session?.user.id,
    };

    const response = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
  };

  return (
    <main className={styles.main}>
      <form className="applicationForm">
        <label htmlFor="name">Full name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="amount">Motivation</label>
        <input type="text" id="amount" name="amount" required />

        <label htmlFor="attachment">Attachments:</label>
        <input type="file" id="attachment" onChange={handlefile} name="attachment" required />

        {attachmentUrl && (
          <div>
            <label>Attachment:</label>
            <a href={attachmentUrl} download>
              Download Attachment
            </a>
          </div>
        )}

        <label htmlFor="documentType">Document Type:</label>
        <select id="documentType" name="documentType" required>
          <option value="Identity Document">ID</option>
          <option value="2">CV</option>
          <option value="other">Other</option>
        </select>

        <button onClick={handleApplication}>Submit</button>
      </form>
    </main>
  );
}