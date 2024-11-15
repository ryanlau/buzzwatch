import { betterAuth } from "better-auth";
import { dialect } from "@/lib/db";

export const auth = betterAuth({
  database: {
    dialect,
    type: "sqlite",
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
