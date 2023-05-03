import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongoose.js";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "0536d06235f570b6a90d",
      clientSecret: "e486aae2864df52b1d531369431dbe557012db3a",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};
export default NextAuth(authOptions);
