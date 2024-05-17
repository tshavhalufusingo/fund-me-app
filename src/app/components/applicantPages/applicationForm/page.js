"use client";
import styles from "../../../page.module.css";
import "../../../styles.css";
import { useSession } from "next-auth/react";
import { useParams, } from "next/navigation";

export default function ApplicationForm() {
  const params = useParams();
  const { data: session, status } = useSession();
  const attachmentUrl = ""; // Add URL to the uploaded file here

  let documentsObj = [];

  const handlefile = async(event)=>{

    const documentType = document.getElementById('documentType').value;
    const documentDocDiv = document.getElementById('documentsDiv');

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
       let base64data = fileReader.result;

      documentsObj.push({type: documentType, content: base64data});

      var element = document.createElement('a');
      element.setAttribute('href',base64data)
      element.innerText = file.name
      element.setAttribute('download',"download")

      documentDocDiv.appendChild(element)
        alert("file upload successful");
      }
    })
  }




  const handleApplication = async (e) => {
  e.preventDefault();
    const inputData = {
    postId: params.postId,
    userId: session?.user.id,
    statusId:1,
  };


    console.log( params.postId);
    console.log(inputData);
    const response = await fetch(`/api/applications/${params.postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    }).then((data) => data).then((r) => r);

    const res1 =await response.json();

    

    for(let i = 0;i < documentsObj.length;i++){

      const pdf = {
        attachment : documentsObj[i].content,
        type : documentsObj[i].type,
        applicationId: res1.applicationId,

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
    }
    
  };

  return (
    <main className={styles.main}>
      <form className="applicationForm">

        {/* <label htmlFor="amount">Motivation</label>
        <textarea type="text" id="amount" name="amount" required /> */}

        <label htmlFor="attachment">Attachments:</label>
        <input type="file" id="attachment" onChange={handlefile} name="attachment" required />

        <label htmlFor="documentType">Document Type:</label>
        <select id="documentType" name="documentType" required>
          <option value="Identity Document">ID</option>
          <option value="CV">CV</option>
          <option value="Motivation">ID</option>
          <option value="other">Other</option>
        </select>

        <div className="documentsDiv" id="documentsDiv">
            <label>Attachment:</label>
            {/* <a href={attachmentUrl} download>
              Download Attachment
            </a> */}
          </div>

        <button onClick={handleApplication}>Submit</button>
      </form>
    </main>
  );
}
