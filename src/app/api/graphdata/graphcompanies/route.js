import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../../database/dbconnection");




export async function GET() {
  let poolConnection = await sql.connect(config);

  const res = await poolConnection
    .request()
    .query(`SELECT * FROM [dbo].[post];`);
  poolConnection.close();
  const user = res.recordset;
  return NextResponse.json(user);
}




