"use client";
import styles from "../../../page.module.css";
import "../../../styles.css";
import { useSession } from "next-auth/react";
import { useParams, } from "next/navigation";

export default function ApplicationForm() {
  const params = useParams();
  const { data: session, status } = useSession();
  const attachmentUrl = ""; // Add URL to the uploaded file here

  const handlefile = async(event)=>{

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
       const pdf = {
        attachment : fileReader.result,
        postId: params.postId,
        type : 'id',
        userId: session?.user.id,

       }

       setTimeout(() => {
        const response = fetch("/api/attachments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pdf),
        });
      }, 3000);
      

        alert("file upload successful");
      }
    })
  }




  const handleApplication = async (e) => {
  e.preventDefault();
  const columnName = document.getElementById('name').value;
  const phoneNumber = document.getElementById('email').value;
  const motivation = document.getElementById('amount').value;
  const documentType = document.getElementById('documentType').value;


  

  const inputData = {
    postId: params.postId,
    userId: session?.user.id,
    columnName,
    phoneNumber,
    motivation,
    statusId:1,
  };

  

    console.log( params.postId);
    console.log(inputData);
    const response = await fetch("/api/applicationform", {
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
        <input type="Phone Number" id="email" name="email" required />

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
