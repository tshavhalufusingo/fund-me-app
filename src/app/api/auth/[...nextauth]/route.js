import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const sql = require("mssql");
const config = require("../../../database/dbconnection");

const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        var poolConnection = await sql.connect(config);
        let userRecord = await poolConnection
          .request()
          .query(
            `SELECT * FROM [dbo].[user] WHERE userEmail = '${credentials.email}' AND userPassword = '${credentials.password}';`
          );

        if (userRecord.recordset.length == 1) {
          // Any object returned will be saved in `user` property of the JWT
          const user = userRecord.recordset[0];
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
        poolConnection.close();
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
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
