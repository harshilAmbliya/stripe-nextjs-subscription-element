import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          client_id: process.env.GOOGLE_ID!,
          max_age: 7,
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),


  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email && profile.email.endsWith("@gmail.com")) {
        return true; // Allow sign-in for Google accounts with Gmail addresses
      }
      return false; // Deny sign-in for other cases
    },
  }
  

};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
