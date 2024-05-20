import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../../database/dbconnection");

export async function GET(req, context) {
  const { params } = context;
  const id = params.postId;
  let poolConnection = await sql.connect(config);

  const res = await poolConnection
    .request()
    .query(
      `SELECT distinct ap.postId,ap.statusId,ap.userId,CONCAT(u.firstname,' ',u.lastname) as username, p.companyName as postname FROM [dbo].[postApplication] ap,[dbo].[post] p,[dbo].[user] u WHERE ap.postId = p.postId and p.userId = ${id} and u.userId = ap.userId ;`
    );
  poolConnection.close();
  const post = res.recordset;
  return NextResponse.json(post);
}

export async function POST(req) {
  const data = await req.json();
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0]; // Format to 'YYYY-MM-DD'

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `INSERT INTO [dbo].[postApplication](postId, userId, statusId, applicationDate) OUTPUT Inserted.applicationId  VALUES (${data.postId},${data.userId},${data.statusId},${formattedDate});`
      );
    poolConnection.close();

    return NextResponse.json(res.recordset[0]);
  } catch (error) {
    console.error("error is: ", error.message);
  }
}

export async function PUT(req) {
  const data = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `UPDATE [dbo].[postApplication]  SET  statusId = '${data.userApproval}' WHERE userId='${data.userId}';`
      );
    poolConnection.close();

    return NextResponse.json(res);
  } catch (error) {
    console.error("error is: ", error.message);
  }
}
