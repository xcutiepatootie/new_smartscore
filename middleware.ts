import { withAuth } from "next-auth/middleware"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
       /*  console.log("hays",req.nextauth.token) */
    },
    {
        callbacks: {
           authorized: ({ token }) => !(!token),
        },
    }
)

export const config = { matcher: ["/dashboard", "/dashboard/:path*", "/quizzes"] }