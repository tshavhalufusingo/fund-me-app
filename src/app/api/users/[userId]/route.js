import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../../database/dbconnection");

// Fetches user details for a specific userId from the user table and returns the result as JSON
export async function GET(req, context) {
  const { params } = context;

  const id = params.userId;
  let poolConnection = await sql.connect(config);

  const res = await poolConnection
    .request()
    .query(`SELECT * FROM [dbo].[user] WHERE userId = ${id};`);
  poolConnection.close();
  if (res.recordset.length == 0) {
    console.log("no data available");
  }
  const user = res.recordset;
  return NextResponse.json(user);
}

// Inserts a new user record into the user table
export async function POST(req) {
  const data = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `INSERT INTO [dbo].[user] VALUES ('${data.email}','${data.password}','${data.firstname}','${data.lastname}','${data.role}');`
      );
    poolConnection.close();

    return res;
  } catch (error) {
    console.error("error is: ", error.message);
  }
}

// Updates a user record in the user table and returns the result as JSON
export async function PUT(req) {
  const data = await req.json();
  console.log(data);

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `UPDATE [dbo].[user]  SET  statusId = '${data.userApproval}', userPermission = '${data.userPermited}', userBlock = '${data.userAccess}' WHERE userId='${data.userId}';`
      );
    poolConnection.close();

    return NextResponse.json(res);
  } catch (error) {
    console.error("error is: ", error.message);
  }
}
