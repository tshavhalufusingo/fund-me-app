import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");

export async function POST(req) {
  const data = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    // Using parameterized query to prevent SQL injection

    console.log(data);
    const res = await poolConnection
      .request()
    //   .input('userId', sql.Int, data.userId)
    //   .input('postId', sql.Int, data.postId)
    //   .input('attachment', sql.text, data.attachment)
    //   .input('type', sql.VarChar(50), data.type)
      .query(
        `INSERT INTO [dbo].[attachments] (userId, postId, type, attachment) VALUES ('${data.userId}', ${data.postId}, '${data.type}', '${data.attachment}');`
      );
    poolConnection.close(); 

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error inserting data: ", error.message);
    return NextResponse.error("Failed to insert data", { status: 500 });
  }
}
