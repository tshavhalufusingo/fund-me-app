"use client";
import styles from "../../page.module.css";
import { useParams, } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ReviewUser() {
  const params = useParams();
  const router = useRouter();


  const id = params.userId;

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(...data);
      });
  }, []);
  if(document.getElementById("permission") != null){
    document.getElementById("permission").checked = !data?.userPermission;
  }
  if(document.getElementById("blockAccount") != null){
    document.getElementById("blockAccount").checked = data?.userBlock;
  }

  const updateUser = async (event) => {
    event.preventDefault();

    let approvalStatus = document.getElementById("approvalStatus").value;
    let permission = document.getElementById("permission");
    let blockAccount = document.getElementById("blockAccount");

    if (permission.checked) {
      console.log(permission.checked);
    }

    const inputData = {
      userId: id,
      userApproval: approvalStatus,
      userPermited: permission.checked == true ? permission.value : "1",
      userAccess: blockAccount.checked == true ? blockAccount.value : "0",
    };

    const resp = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    if (!resp.error) {
      router.push("/home");
    }
  };

  return (
    <>
      <main className={styles.main}>
        <section id="UserProfile">
          <p>First name: {data?.firstname}</p>
          <p>
            Current status:{" "}
            {data?.statusId == 1
              ? "Pending"
              : data?.statusId == 2
              ? "Approved"
              : "Rejected"}
          </p>
          <div>
            <p>Account status:</p>
            <select name="approvalStatus" id="approvalStatus">
              <option value="1" selected={data?.statusId === 1}>Pending</option>
              <option value="2" selected={data?.statusId === 2}>Approve</option>
              <option value="3" selected={data?.statusId === 3}>Reject</option>
            </select>
          </div>

          <div>
            <input
              type="checkbox"
              id="permission"
              name="permission"
              value="0"
            />
            <label htmlFor="permission">
              {data?.userRole == "FundManager"
                ? "Disable fund manager from creating fund advertisement"
                : "Disable applicant from applying for opportunity"}
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="blockAccount"
              name="blockAccount"
              value="1"
            />
            <label htmlFor="blockAccount">Block account</label>
          </div>
          <button onClick={updateUser}>Save changes</button>
        </section>
      </main>
    </>
  );
}
