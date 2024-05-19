import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");


export async function GET() {

  
  let poolConnection = await sql.connect(config);

  const res = await poolConnection
    .request()
    .query(`SELECT * FROM [dbo].[user];`);
  poolConnection.close();
  const user = res.recordset;
  return NextResponse.json(user);
}

export async function POST(req) {
  const data = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(
        `INSERT INTO [dbo].[user]  VALUES ('${data.email}','${data.password}','${data.firstname}','${data.lastname}','${data.role}',0,1,${data.role == 'Applicant'? 2: 1 });`
      );
    poolConnection.close();

    return NextResponse.json(res);
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
        `UPDATE [dbo].[user]  SET  userEmail = '${data.email}','${data.password}',firstname = '${data.firstname}',lastname = userRole = '${data.lastname}','${data.role}',statusId = ${data.newStatus} WHERE userId='${data.userId};`
      );
    poolConnection.close();

    return NextResponse.json(res);
  } catch (error) {
    console.error("error is: ", error.message);
  }
}


