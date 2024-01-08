"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'



export default function Navbar() {
    const { data: session, status } = useSession()
    const pathName = usePathname()
    const signUpActive = pathName?.startsWith('/signup')
    const signInActive = pathName?.startsWith('/signin')

    const isLoggedIn = session !== null && status === "authenticated"
    return (
        <>
            <div className="flex grow items-center justify-between shadow-xl bg-violet-300 h-20">
                <div className="px-4">
                    <Link className="text-2xl font-bold" href="/">SmartScore</Link>
                </div>
                {!isLoggedIn && (
                    <div className="flex">
                        <div className="px-4">
                            <button className={signUpActive ? "bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105" : "bg-sky-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"} >
                                <Link href="/signup" prefetch={true}>Sign Up</Link>
                            </button>
                        </div>

                        <div className="px-4">
                            <button className={signInActive ? "bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105" : "bg-sky-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"}>
                                <Link href="/signin" prefetch={true}>Sign In</Link>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>


    )
}
