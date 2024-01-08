"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
    children?: React.ReactNode;
    pageProps?: any
};

export const NextAuthProvider = ({ children, pageProps }: Props) => {
    return <SessionProvider >{children}</SessionProvider>;
};
