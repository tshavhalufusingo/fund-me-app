import { NextResponse } from 'next/server';
const sql = require('mssql');
const config = require("../../database/dbconnection");

export async function POST(req) {
  const { userId, message } = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .input('userId', sql.Int, userId)
      .input('message', sql.NVarChar, message)
      .query(`INSERT INTO Notifications (userId, message) VALUES (@userId, @message);`);

    poolConnection.close();

    return NextResponse.json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error("Error is: ", error.message);
    return NextResponse.error("Failed to send notification", { status: 500 });
  }
}
