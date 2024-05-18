import { NextResponse } from 'next/server';
const sql = require('mssql');
const config = require('../../database/dbconnection');

export async function POST(req) {
  const { userId, message } = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    await poolConnection
      .request()
      .input('userId', sql.Int, userId)
      .input('message', sql.NVarChar, message)
      .query('INSERT INTO Notifications (userId, message, isRead, createdAt) VALUES (@userId, @message, 0, GETDATE());');

    poolConnection.close();

    return NextResponse.json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error is: ', error.message);
    return NextResponse.error('Failed to send notification', { status: 500 });
  }
}



export async function GET() {
  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .query(`SELECT * FROM [dbo].[Notifications] WHERE isRead = '0';`);
    poolConnection.close();

    const Notifications = res.recordset;
    console.table(Notifications);
    return NextResponse.json(Notifications);
  } catch (error) {
    console.error("Error fetching notifications: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
