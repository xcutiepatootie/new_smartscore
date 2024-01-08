import React from 'react'
import SigninForm from '@/components/Forms/SigninForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function page() {
    const session = await getServerSession()
    if(session){
        redirect('/dashboard')
    }
    return (
        <div>
            <SigninForm />
        </div>
    )
}
