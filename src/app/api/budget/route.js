import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");
import { useSession } from "next-auth/react";

// Fetches all records from the post table and returns the result as JSON
export async function GET() {
  let poolConnection = await sql.connect(config);

  const res = await poolConnection
    .request()
    .query(`select * from [dbo].[post];`);
  poolConnection.close();
  const user = res.recordset;
  return NextResponse.json(user);
}
