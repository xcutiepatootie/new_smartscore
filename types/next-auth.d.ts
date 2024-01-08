import NextAuth, { DefaultSession, DefaultUser, DefaultJWT, Account } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string,
            name: string,
            email: string,
            username: string,
            role: string,

        } & DefaultSession["user"]

    }


    interface User {
        id: string,
        name: string,
        email: string,
        username: string,
        role: string,

    }


}


declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends DefaultJWT
    {

        id: string,
        name: string,
        username: string,
        email: string,
        role: string,

    } 
}