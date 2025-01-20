import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Replace with your actual user lookup logic
        const user = {
          id: "1", // Replace with actual user ID
          email: credentials.email,
        };

        // Ensure `email` is strictly `string`
        if (!user.email) {
          throw new Error("Invalid email");
        }

        return user; // Return a valid `User` object
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub || "",
        email: token.email || "",
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
