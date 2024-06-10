import axios from "axios";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import prisma from "./prisma";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your Password",
        },
        // role: { label: "Role", type: "radio", options: [{ value: "faculty", label: "Faculty" }, { value: "student", label: "Student" }] }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const reqBody = await req;
        console.log("Test: ", reqBody.body);

        //const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        try {
          const response = await axios.post(
            `${process.env.API_TS_URL}/api/signin-user`,
            {
              email: credentials?.email,
              password: credentials?.password,
              //role: credentials?.role,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          const user = await response.data;

          if (user.role === "student") {
            try {
              const userSection = await prisma.student.findFirst({
                where: { studentId: user.id },
                select: { section: true },
              });

              console.log(userSection);
              user.userSection = userSection?.section;
            } catch (error) {}
          }

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            console.log("Inserting Token: ", user);
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/signout",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      if (user) {
        token.userSection = user.userSection;
        token.role = user.role;
        token.username = user.username;
        token.initialLogin = user.initialLogin;
        token.department = user.department;
        // console.log("token: ", user, token);
      }

      //console.log('new token: ', token)
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      //console.log('I am in session')
      session.user.id = token.sub!;
      session.user.role = token.role;
      session.user.username = token.username;
      session.user.userSection = token.userSection;
      session.user.initialLogin = token.initialLogin;
      session.user.department = token.department;
      console.log(session);

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs

      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
