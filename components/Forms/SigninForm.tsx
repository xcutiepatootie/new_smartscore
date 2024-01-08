"use client"
import { signIn } from 'next-auth/react'
import React, { FormEvent, useRef, useState } from 'react'


const SigininForm = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [userRole, setUserRole] = useState<'faculty' | 'student' | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await signIn('credentials', {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            userRole: userRole,

            callbackUrl: '/dashboard'
        })
    }

    return (
        <div className="flex justify-center items-center h-screen">

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <label className="block text-gray-700 text-sm font-bold mb-4 border-b-2 border-zinc-300" htmlFor="SigninTag">
                    Sign-In
                </label>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        ref={emailRef}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        ref={passwordRef}
                        required
                    />

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userType">
                        Role
                    </label>
                    <div className="flex items-center">
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="userType"
                                value="faculty"
                                onChange={() => { setUserRole('faculty') }}
                                required
                            />
                            <span className="ml-2">Faculty</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="userType"
                                value="student"
                                onChange={() => { setUserRole('student') }}
                                required
                            />
                            <span className="ml-2">Student</span>
                        </label>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SigininForm