import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");

// Fetches all records from the user table and returns the result as JSON
export async function GET() {
  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(`SELECT * FROM [dbo].[user];`);
    poolConnection.close();
    const users = res.recordset;
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users: ", error.message);
    return NextResponse.error();
  }
}

// Inserts a new user record into the user table and returns the result as JSON
export async function POST(req) {
  const data = await req.json();
  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `INSERT INTO [dbo].[user]  VALUES ('${data.email}','${
          data.password
        }','${data.firstname}','${data.lastname}','${data.role}',0,1,${
          data.role == "Applicant" ? 2 : 1
        });`
      );
    poolConnection.close();

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error inserting user: ", error.message);
    return NextResponse.error();
  }
}

// Updates a user record in the user table and returns the result as JSON
export async function PUT(req) {
  const data = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `UPDATE [dbo].[user]  SET  userEmail = '${data.email}',firstname = '${data.firstname}',lastname = '${data.lastname}',userRole = '${data.role}',statusId = ${data.newStatus} WHERE userId='${data.userId}';`
      );
    poolConnection.close();

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error updating user: ", error.message);
    return NextResponse.error();
  }
}
