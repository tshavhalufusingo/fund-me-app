const sql = require('mssql');

// Configuration for your SQL Server connection
const config = {
  user: 'fundmeadmin',
  password: 'Admin@123',
  server: 'fundmeapp.database.windows.net',
  database: 'fundMeApp',
  options: {
    encrypt: true, // If you're connecting to Azure SQL Database, set to true
    trustServerCertificate: false // If you're connecting to Azure SQL Database, set to false
  }
};

export default function Home(){


  async function connectToDatabase() {
    try {
      // Create a new connection pool
      const pool = await sql.connect(config);
      console.log('Connected to SQL Server');
  
      // You can now execute SQL queries using the pool
  
      // Example query
      const result = await pool.request().query('SELECT * FROM YourTable');
      console.log(result.recordset);
  
      // Don't forget to close the connection pool when done
      await pool.close();
      console.log('Connection to SQL Server closed');
    } catch (err) {
      console.error('Error connecting to SQL Server:', err);
    }
  }
  
  // Call the function to connect to the database
  connectToDatabase();
  

  return (
    <main className={styles.main}>
      <form action={Login}>

        <input
          id="useremail"
          type="email"
          placeholder="User email"
          required
        ></input>

        <input
          id="password"
          type="password"
          placeholder="User password"
        ></input>

        <button type="submit">Login</button>

      </form>

      <p>If you have no account click register below</p>

      
      <button id="register" type="submit">
        <Link href="/register">Register</Link>
      </button>
    </main>
  );
  

}
