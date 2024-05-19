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

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    let poolConnection = await sql.connect(config);

    const res = await poolConnection
      .request()
      .input('userId', sql.Int, userId)
      .query(`SELECT * FROM [dbo].[Notifications] WHERE userId = @userId OR userId IS NULL ORDER BY createdAt DESC;`);
    poolConnection.close();

    const notifications = res.recordset;
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    console.error("Error fetching notifications: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  const { notificationId } = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    await poolConnection
      .request()
      .input('notificationId', sql.Int, notificationId)
      .query(`UPDATE Notifications SET isRead = 1 WHERE id = @notificationId;`);
    poolConnection.close();

    return NextResponse.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error("Error updating notification: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
