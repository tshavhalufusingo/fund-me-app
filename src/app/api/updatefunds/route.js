import { NextResponse } from "next/server";
import sql from "mssql";
import config from "../../database/dbconnection";

export async function PUT(req) {
  try {
    // Parse the request body to get the input data
    const { postId, fundingused } = await req.json();

    // Connect to the database
    let poolConnection = await sql.connect(config);

    // Perform the update query
    const query = `
      UPDATE [dbo].[post]
      SET fundingused = fundingused + @fundingused
      WHERE postId = @postId;
    `;

    const result = await poolConnection
      .request()
      .input("postId", sql.Int, postId)
      .input("fundingused", sql.Int, fundingused)
      .query(query);

    // Check if any rows were affected

    // Return a success response
    return NextResponse.json({ message: "Funds updated successfully" });
  } catch (error) {
    // Handle any errors
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    // Ensure the pool connection is closed
    sql.close();
  }
}
