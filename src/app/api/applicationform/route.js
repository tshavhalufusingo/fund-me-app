import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");

export async function GET() {
  try {
    let poolConnection = await sql.connect(config);
    const res = await poolConnection
      .request()
      .query(`SELECT * FROM [dbo].[postApplication];`);
    poolConnection.close();
    const user = res.recordset;
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error retrieving data: ", error.message);
    return NextResponse.error("Failed to retrieve data", { status: 500 });
  }
}

export async function POST(req) {
  const data = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    // Using parameterized query to prevent SQL injection

    console.log(data);
    const res = await poolConnection
      .request()
      .input('userId', sql.Int, data.userId)
      .input('phoneNumber', sql.NVarChar(50), data.phoneNumber)
      .input('motivation', sql.Text(100), data.motivation)
      .input('postId', sql.Int, data.postId)
      .input('statusId', sql.Int, data.statusId)
      .input('columnName', sql.NVarChar(50), data.columnName)
      .query(
        `INSERT INTO [dbo].[ApplicationForm] (userId, phoneNumber, motivation, postId, statusId, columnName) VALUES (@userId, @phoneNumber, @motivation, @postId, @statusId, @columnName);`
      );
    poolConnection.close(); 

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error inserting data: ", error.message);
    return NextResponse.error("Failed to insert data", { status: 500 });
  }
}
