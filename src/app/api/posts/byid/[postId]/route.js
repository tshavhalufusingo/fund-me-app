import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../../../database/dbconnection");

export async function GET(req,context) {
  const { params } = context;
  console.log(params)

  const id = params.postId;
  let poolConnection = await sql.connect(config);

  const res = await poolConnection
    .request()
    .query(`SELECT * FROM [dbo].[post] WHERE postId = ${id};`);
  poolConnection.close();

  const post = res.recordset;
  return NextResponse.json(post);
}