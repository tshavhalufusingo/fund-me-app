import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");

export async function GET() {
  let poolConnection = await sql.connect(config);

  const res = await poolConnection
    .request()
    .query(`SELECT * FROM [dbo].[postApplication] WHERE;`);
  poolConnection.close();
  const post = res.recordset;
  return NextResponse.json(post);
}

export async function POST(req) {
  const data = await req.json();

  console.log("data on api: ",data)

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `INSERT INTO [dbo].[postApplication]  VALUES (${data.postId},${data.userId},1);`
      );
    poolConnection.close();

    return NextResponse.json(res);
  } catch (error) {
    console.error("error is: ", error.message);
  }
}


