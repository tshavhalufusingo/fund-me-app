import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");

// Fetches active posts from the post table and returns the result as JSON
export async function GET() {
  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(`SELECT * FROM [dbo].[post] WHERE activeStatus = '1';`);
    poolConnection.close();

    const posts = res.recordset;
    console.table(posts);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}

// Inserts a new post record into the post table and returns the result as JSON
export async function POST(req) {
  const data = await req.json();

  console.log("data on api: ", data);

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `INSERT INTO [dbo].[post]  VALUES (${data.id},'${data.companyName}','${
          data.postContent
        }',${1},${1},${data.fundingAmount},'${data.opportunityType}','${
          data.applicationDeadline
        }', 0, ${data.indivisualFund});`
      );
    poolConnection.close();

    return NextResponse.json(res);
  } catch (error) {
    console.error("error is: ", error.message);
  }
}

// Updates a post record in the post table and returns the result as JSON
export async function PUT(req) {
  const data = await req.json();

  console.log("data on api: ", data);

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `UPDATE [dbo].[post]  SET companyName = '${data.companyName}', fundingAmount = ${data.fundingAmount}, opportunityType = '${data.opportunityType}' ,applicationDeadline = '${data.applicationDeadline}', postContent = '${data.postContent}'WHERE postId = ${data.id};`
      );
    poolConnection.close();

    return NextResponse.json(res);
  } catch (error) {
    console.error("error is: ", error.message);
  }
}
