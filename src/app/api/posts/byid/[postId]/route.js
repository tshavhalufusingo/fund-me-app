import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../../../database/dbconnection");

// Fetches post details for a specific postId from the post table and returns the result as JSON
export async function GET(req, context) {
  const { params } = context;
  console.log(params);

  const id = params.postId;
  let poolConnection = await sql.connect(config);

  const res = await poolConnection
    .request()
    .query(`SELECT * FROM [dbo].[post] WHERE postId = ${id};`);
  poolConnection.close();

  const post = res.recordset;
  return NextResponse.json(post);
}
