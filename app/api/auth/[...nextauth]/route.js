import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
import User from "@models/user";
// console.log(process.env.GOOGLE_CLIENT_ID);
// console.log(process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //which user is online
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      //serverless route lambdba only when called it will be executed
      try {
        await connectToDb();
        //check user exists
        const userExists = await User.findOne({ email: profile.email });
        //else create user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;

      } catch (error) {
        console.log("Error connecting to database", error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
