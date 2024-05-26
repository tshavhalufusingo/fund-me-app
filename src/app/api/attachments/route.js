import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");

// Inserts a new attachment record into the ApplicationAttachments table and returns the result as JSON
export async function POST(req) {
  const data = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `INSERT INTO [dbo].[ApplicationAttachments] (applicationId, type, attachment) VALUES (${data.applicationId}, '${data.type}', '${data.attachment}');`
      );
    poolConnection.close();

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.error("Failed to insert data", { status: 500 });
  }
}
