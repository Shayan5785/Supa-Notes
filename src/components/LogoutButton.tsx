"use client"

import supabase from '@/app/utils/utils'
import React, { MouseEventHandler, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '@/svg/spinner'

const LogoutButton = () => {
    const [isPending, startTransition] = useTransition()
    const { refresh } = useRouter()

    const [error, seterror] = useState("")
    const handleLogOut = async () => {
        const { error } = await supabase.auth.signOut()
        return error
    }

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = () => {
        handleLogOut()
            .then(() => {
                startTransition(() => {
                    refresh()
                    console.log('Logged out')
                })
            })
            .catch(error => seterror(error))
    }

    return (
        <div className='inline'>
            {isPending && <Spinner />}
            {isPending && <Spinner />}
            <button
                className='text-white '
                onClick={handleSubmit}
            >
                Logout
            </button>
            <p>{error}</p>
        </div>

    )
}

export default LogoutButton