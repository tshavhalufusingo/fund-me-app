import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    let poolConnection = await sql.connect(config);
    const res = await poolConnection
      .request()
      .input('userId', sql.Int, userId)
      .query(`SELECT * FROM [dbo].[post] WHERE userId = @userId;
  
  `);
    poolConnection.close();
    const user = res.recordset;
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error retrieving data: ", error.message);
    return NextResponse.json({ error: "Failed to retrieve data" }, { status: 500 });
  }
}



