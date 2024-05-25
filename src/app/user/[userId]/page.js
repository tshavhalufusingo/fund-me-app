"use client";
import styles from "../../page.module.css";
import { useParams, useRouter } from "next/navigation"; // Import both hooks from 'next/navigation'
import { useState, useEffect } from "react";

export default function ReviewUser() {
  const params = useParams();
  const router = useRouter();

  const id = params.userId;

  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data); // Update state with fetched data
      });
  }, [id]); // Include 'id' in the dependency array to re-fetch data when 'id' changes

  // Use optional chaining (?.) to avoid errors if 'document.getElementById' returns null
  useEffect(() => {
    if (data) {
      document.getElementById("permission")?.checked = !data.userPermission;
      document.getElementById("blockAccount")?.checked = data.userBlock;
    }
  }, [data]); // Re-run this effect when 'data' changes

  const updateUser = async (event) => {
    event.preventDefault();

    // Get values from form inputs
    const approvalStatus = document.getElementById("approvalStatus").value;
    const permission = document.getElementById("permission").checked;
    const blockAccount = document.getElementById("blockAccount").checked;

    // Prepare input data for API request
    const inputData = {
      userId: id,
      userApproval: approvalStatus,
      userPermited: permission ? "0" : "1", // Use ternary operator to convert boolean to string
      userAccess: blockAccount ? "1" : "0", // Use ternary operator to convert boolean to string
    };

    try {
      const resp = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (resp.ok) {
        router.push("/home");
      } else {
        const errorData = await resp.json();
        throw new Error(errorData.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <main className={styles.main}>
      <section id="UserProfile">
        <p>First name: {data?.firstname}</p>
        <p>
          Current status:{" "}
          {data?.statusId === 1
            ? "Pending"
            : data?.statusId === 2
            ? "Approved"
            : "Rejected"}
        </p>
        <div>
          <p>Account status:</p>
          <select name="approvalStatus" id="approvalStatus" defaultValue={data?.statusId}>
            <option value="1">Pending</option>
            <option value="2">Approve</option>
            <option value="3">Reject</option>
          </select>
        </div>

        <div>
          <input type="checkbox" id="permission" name="permission" defaultChecked={!data?.userPermission} />
          <label htmlFor="permission">
            {data?.userRole === "FundManager"
              ? "Disable fund manager from creating fund advertisement"
              : "Disable applicant from applying for opportunity"}
          </label>
        </div>
        <div>
          <input type="checkbox" id="blockAccount" name="blockAccount" defaultChecked={data?.userBlock} />
          <label htmlFor="blockAccount">Block account</label>
        </div>
        <button onClick={updateUser}>Save changes</button>
      </section>
    </main>
  );
}
