'use client'
import styles from "../../../page.module.css";
import "../../../styles.css"


export default function applicationForm(){


    const attachmentUrl = ""; // Add URL to the uploaded file here


        const handleApplication = async (e) => {
            e.preventDefault;
        
            
            const inputData = {
              postId: e.target.id,
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
            <input type="file" id="attachment" name="attachment" required />

            {attachmentUrl && (
                <div>
                    <label>Attachment:</label>
                    <a href={attachmentUrl} download>Download Attachment</a>
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
