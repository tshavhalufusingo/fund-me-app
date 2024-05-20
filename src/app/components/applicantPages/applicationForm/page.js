"use client";
import styles from "../../../page.module.css";
import "../../../styles.css";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";

const date = new Date();
const applicationDate = date.toISOString().split("T")[0]; 


export default function ApplicationForm() {
  const params = useParams();
  const { data: session, status } = useSession();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const date = new Date();
  const applicationDate = date.toISOString().split("T")[0]; 

  const handleFile = (event) => {
    const documentType = document.getElementById("documentType").value;
    const file = event.target.files[0];

    if (!file) return;

    const allowedExt = /\.(pdf|txt)$/i;
    if (!allowedExt.test(file.name)) {
      alert("Invalid type, only PDF and TXT files are allowed");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      const base64data = fileReader.result;
      setDocuments((prev) => [...prev, { type: documentType, content: base64data, name: file.name }]);
    };
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("the date is ", applicationDate);

    try {
      const inputData = {
        postId: parseInt(params.postId),
        userId: session?.user.id,
        statusId: 1,
        date : date.toISOString().split("T")[0],
      };

      const response = await fetch(`/api/applications/${params.postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) throw new Error("Failed to submit application");

      const applicationData = await response.json();

      for (const document of documents) {
        const pdf = {
          attachment: document.content,
          type: document.type,
          applicationId: applicationData.applicationId,
        };

        await fetch("/api/attachments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pdf),
        });
      }

      alert("Application submitted successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <form className="applicationForm" onSubmit={handleApplication}>
        <label htmlFor="attachment">Attachments:</label>
        <input type="file" id="attachment" onChange={handleFile} name="attachment" required />

        <label htmlFor="documentType">Document Type:</label>
        <select id="documentType" name="documentType" required>
          <option value="Identity Document">ID</option>
          <option value="CV">CV</option>
          <option value="Motivation">Motivation</option>
          <option value="Other">Other</option>
        </select>

        <div className="documentsDiv" id="documentsDiv">
          {documents.map((doc, index) => (
            <div key={index}>
              <a href={doc.content} download={doc.name}>{doc.name}</a> - {doc.type}
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </main>
  );
}
