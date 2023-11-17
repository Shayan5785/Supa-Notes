"use client"

import supabase from '@/app/utils/utils'
import React, { MouseEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
    const { refresh } = useRouter()

    const [error, seterror] = useState("")
    const handleLogOut = async () => {
        const { error } = await supabase.auth.signOut()
        return error
    }

    const handleSubmit: MouseEventHandler<HTMLButtonElement> = () => {
        handleLogOut()
        .then(() => {
            refresh()
            console.log('Logged out')
        })
        .catch( error => seterror(error))
    }

  return (
    <div>
        <button 
        className='bg-red-500 text-white p-2 rounded-md'
        onClick={handleSubmit}
        >
            Logout
        </button>
        <p>{error}</p>
    </div>

  )
}

export default LogoutButton