import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../../database/dbconnection");

// Fetches all records from the postApplication table and returns the result as JSON
export async function GET() {
  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(`SELECT * FROM [dbo].[postApplication];`);
    poolConnection.close();
    const applications = res.recordset;
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
