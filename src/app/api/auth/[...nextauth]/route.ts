import NextAuth, { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { JWT } from "next-auth/jwt"; // Import JWT from next-auth/jwt

// Configure PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Define User type to avoid 'any'
interface User {
  id: string;
  email: string;
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Received credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          throw new Error("Missing email or password");
        }

        const client = await pool.connect();
        try {
          // Query the database for the user
          const query = `
            SELECT id, email, hashed_password
            FROM users
            WHERE email = $1
          `;
          const result = await client.query(query, [credentials.email]);
          console.log("Database result:", result.rows);

          if (result.rows.length === 0) {
            console.error("No user found with the provided email");
            throw new Error("No user found with the provided email");
          }

          const user = result.rows[0];

          // Validate the password
          const isPasswordValid = bcrypt.compareSync(credentials.password, user.hashed_password);
          console.log("Password validation result:", isPasswordValid);

          if (!isPasswordValid) {
            console.error("Invalid password");
            throw new Error("Invalid password");
          }

          // Return the user object for the session
          return { id: user.id, email: user.email };
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error during authorization:", error.message);
          } else {
            console.error("Unknown error during authorization");
          }
          throw new Error("Authentication failed");
        } finally {
          client.release();
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // JWT session strategy
    maxAge: 24 * 60 * 60, // 1 day session lifetime
  },
  callbacks: {
    // Explicit types for session and token
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session before:", session);
      session.user = {
        id: token.sub as string, // Typecast `sub` to string
        email: token.email as string, // Typecast `email` to string
      };
      console.log("Session after:", session);
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        console.log("User added to token:", user);
        token.sub = user.id;
        token.email = user.email;
      }
      console.log("JWT Token:", token);
      return token;
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
