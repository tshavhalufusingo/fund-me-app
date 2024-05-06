import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");

export async function GET() {
  let poolConnection = await sql.connect(config);

  const res = await poolConnection
    .request()
    .query(`SELECT * FROM [dbo].[user];`);
  poolConnection.close();
  const user = res.recordset;
  return NextResponse.json(user);
}

export async function POST(req) {
  const data = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `INSERT INTO [dbo].[ApplicationForm] (userId,phoneNumber,motivation,postId,statusId,columnName)  VALUES ('5','055','motivation fro','5','2','king);`
      );
    poolConnection.close();

    return NextResponse.json(res);
  } catch (error) {
    console.error("error is: ", error.message);
  }
}


