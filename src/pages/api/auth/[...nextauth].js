import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongoose.js";

export const authOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId:
        "467821500860-8jk5ojo4b7qrekmi19d8t2fkfrdpn93t.apps.googleusercontent.com",
      clientSecret: "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",
    }),

    GithubProvider({
      clientId: "0536d06235f570b6a90d",
      clientSecret: "e486aae2864df52b1d531369431dbe557012db3a",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};
export default NextAuth(authOptions);
