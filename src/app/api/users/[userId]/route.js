import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../../database/dbconnection");

export async function GET(req, context) {
  const { params } = context;

  const id = params.userId;
  let poolConnection = await sql.connect(config);

  const res = await poolConnection
    .request()
    .query(`SELECT * FROM [dbo].[user] WHERE userId = ${id};`);
  poolConnection.close();
  if(res.recordset.length == 0){
    console.log("no data avali")
  }
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
        `INSERT INTO [dbo].[user] VALUES ('${data.email}','${data.password}','${data.firstname}','${data.lastname}','${data.role}');`
      );
    poolConnection.close();

    return res;
  } catch (error) {
    console.error("error is: ", error.message);
  }
}

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
export async function POST(req,context) {
  const data = await req.json();
  console.log("2 params")

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