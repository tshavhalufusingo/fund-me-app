import { NextResponse } from 'next/server';
const sql = require('mssql');
const config = require('../../database/dbconnection');

export async function POST(req) {
  const { userId, message } = await req.json();

  try {
    let poolConnection = await sql.connect(config);

    // Insert the notification into the Notifications table
    const result = await poolConnection
      .request()
      .input('message', sql.NVarChar, message)
      .query('INSERT INTO [dbo].[Notifications] (message, createdAt) OUTPUT INSERTED.id VALUES (@message, GETDATE());');

    const notificationId = result.recordset[0].id;

    // Insert into UserNotifications table for the specific user
    if (userId) {
      await poolConnection
        .request()
        .input('userId', sql.Int, userId)
        .input('notificationId', sql.Int, notificationId)
        .query('INSERT INTO [dbo].[UserNotifications] (userId, notificationId, isRead) VALUES (@userId, @notificationId, 0);');
    }

    poolConnection.close();

    return NextResponse.json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
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
      .query(`SELECT n.*, un.isRead FROM [dbo].[Notifications] n
              LEFT JOIN [dbo].[UserNotifications] un ON n.id = un.notificationId
              WHERE un.userId = @userId OR un.userId IS NULL
              ORDER BY n.createdAt DESC;`);

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
      .query(`UPDATE [dbo].[UserNotifications] SET isRead = 1 WHERE notificationId = @notificationId;`);
    poolConnection.close();

    return NextResponse.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error("Error updating notification: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

