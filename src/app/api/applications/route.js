import { NextResponse } from "next/server";
import sql from "mssql";
import config from "../../database/dbconnection";

export async function GET() {
  try {
    const poolConnection = await sql.connect(config);
    const res = await poolConnection.request().query("SELECT a.applicationId,a.postId,a.userId,a.statusId,a.applicationDate,a.approvalDate,p.companyName FROM [dbo].[postApplication] a ,  [dbo].[post] p where p.postId = a.postId;");    poolConnection.close();
    return NextResponse.json(res.recordset);
  } catch (error) {
    console.error("Error fetching data: ", error.message);
    return NextResponse.error();
  }
}

export async function POST(req) {
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0]; 
  try {
    const data = await req.json();
    const { postId, userId, statusId, applicationDate } = data;


    console.log("application dats is ", applicationDate);
    const poolConnection = await sql.connect(config);
    const res = await poolConnection
      .request()
      .input('postId', sql.Int, postId)
      .input('userId', sql.Int, userId)
      .input('statusId', sql.Int, statusId)
      .input('applicationDate', sql.NVarChar, applicationDate)

      .query(
        `INSERT INTO [dbo].[postApplication] (postId, userId, statusId, applicationDate) 
         VALUES (@postId, @userId, @statusId, '${date.toISOString().split("T")[0]}');
         SELECT SCOPE_IDENTITY() AS applicationId;`
      );
    poolConnection.close();

    const applicationId = res.recordset[0].applicationId;
    return NextResponse.json({ applicationId });
  } catch (error) {
    console.error("Error inserting data: ", error.message);
    return NextResponse.error();
  }
}
