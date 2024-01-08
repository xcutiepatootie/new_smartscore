

import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { NextAuthProvider } from '../providers';
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] })


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            {children}
        </>











    )
}
