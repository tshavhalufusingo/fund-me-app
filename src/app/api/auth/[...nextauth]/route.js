import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const sql = require("mssql");
const config = require("../../../database/dbconnection");

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        var poolConnection = await sql.connect(config);
        let userRecord = await poolConnection
          .request()
          .query(
            `SELECT * FROM [dbo].[user] WHERE userEmail = '${credentials.email}' AND userPassword = '${credentials.password}';`
          );

        if (userRecord.recordset.length == 1) {
          const user = userRecord.recordset[0];
          return user;
        } else {
          return null;
        }
        poolConnection.close(); // This line is unreachable, move it before the return statement
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.userId;
        token.firstName = user.firstname;
        token.email = user.userEmail;
        token.lastName = user.lastname;
        token.role = user.userRole;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.firstName = token.firstName; // Typo, should be session.user.lastName = token.lastName;
        session.user.lastName = token.lastName;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
