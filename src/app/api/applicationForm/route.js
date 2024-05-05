// api/applicationForm.js
import { NextResponse } from "next/server";
import sql from "mssql";
import config from "../../database/dbconnection";

export async function POST(req) {

  const { postId } = router.query; // Get postId from query object

  console.log(postId);

  try {
    const data = await req.json();
    let pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("name", sql.NVarChar, data.name)
      .input("phoneNum", sql.NVarChar, data.phone_number)
      .input("motivation", sql.NVarChar, data.motivation)
      .input("userid", sql.NVarChar, data.id)
      .input("postId", sql.NVarChar, data.id)

      .query(
        "INSERT INTO [dbo].[ApplicationForm] (userId, statusId, columnName) VALUES (@id, @phoneNum, @name);"
      );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error inserting data:", error.message);  
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
