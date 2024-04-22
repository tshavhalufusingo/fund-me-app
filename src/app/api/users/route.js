import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");

export async function GET() {
  return NextResponse.json(data);
}

export async function POST(req) {
  const data = await req.json();

  try {
    var poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
      //  `INSERT INTO [dbo].[user] VALUES ('${data.email}','${data.password}','${data.firstname}','${data.lastname}','${data.role}');`
        'SELECT * FROM [dbo].[user]'
      );
    poolConnection.close();

    console.log("res = ");
    console.log(res);
    return res;
  } catch (error) {
    console.error("error is: ", error.message);
  }
}
