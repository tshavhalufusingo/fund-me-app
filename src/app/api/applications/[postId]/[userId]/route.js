
import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../../../database/dbconnection");

// Fetches distinct post applications and user details for a specific postId, returning the result as JSON
export async function GET(req, context) {
  const { params } = context;

  const id = params.postId;
  let poolConnection = await sql.connect(config);

  const res = await poolConnection
    .request()
    .query(
      `SELECT distinct ap.postId,ap.userId,CONCAT(u.firstname,' ',u.lastname) as username, p.companyName as postname FROM [dbo].[postApplication] ap,[dbo].[post] p,[dbo].[user] u WHERE ap.postId = p.postId and p.userId = ${id} and u.userId = ap.userId ;`
    );
  poolConnection.close();
  const post = res.recordset;
  return NextResponse.json(post);
}

// Inserts a new application record into the postApplication table and returns the result as JSON
export async function POST(req) {
  const data = await req.json();

  console.log("data on api: ", data);

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

// Updates the statusId of a post application based on the provided userId and postId, returning the result as JSON
export async function PUT(req, context) {
  const { params } = context;

  const data = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `UPDATE [dbo].[postApplication]  SET  statusId = ${data.status} WHERE userId=${params.userId} and postId=${params.postId};`
      );
    poolConnection.close();

    return NextResponse.json(res);
  } catch (error) {
    console.error("error is: ", error.message);
  }
}
