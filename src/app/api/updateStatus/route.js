import { NextResponse } from "next/server";
const sql = require("mssql");
const config = require("../../database/dbconnection");

export async function PUT(req) {
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0]; // Format to 'YYYY-MM-DD'

  try {
    // Parse the request body to get the input data
    const { applicationId, status } = await req.json();

    // Validate input data
    if (!applicationId || !status) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    // Connect to the database
    let poolConnection = await sql.connect(config);
    console.log(req);
    // Perform the update query
    const query = `
    UPDATE [dbo].[postApplication]
    SET statusId = @status,
    approvalDate = '${formattedDate}'
    WHERE applicationId = @applicationId
  `;
    const result = await poolConnection
      .request()
      .input("status", sql.Int, status)
      .input("applicationId", sql.Int, applicationId)
      .query(query);

    poolConnection.close();

    // Check if any rows were affected
    if (result.rowsAffected[0] === 0) {
      return NextResponse.json(
        { error: "Application not found or no change made" },
        { status: 404 }
      );
    }

    // Return a success response
    return NextResponse.json({ message: "Status updated successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}