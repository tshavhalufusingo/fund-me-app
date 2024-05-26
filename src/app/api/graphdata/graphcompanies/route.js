import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../../database/dbconnection");

// Fetches all records from the post table and returns the result as JSON
export async function GET() {
  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(`SELECT * FROM [dbo].[post];`);
    poolConnection.close();
    const posts = res.recordset;
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
