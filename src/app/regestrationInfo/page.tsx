'use client'
import { AuthError } from '@supabase/supabase-js'
import React, { EventHandler, FormEventHandler, useState, useTransition } from 'react'
import supabase from '../utils/utils'
import Spinner from '@/svg/spinner'
import { useRouter } from 'next/navigation'

const RegestrationInfo = () => {
    const [isPending, startTransition] = useTransition()
    const [username, setUsername] = useState("")
    const [formError, setFormError] = useState<AuthError>()
    const { push } = useRouter()

    async function updateUserName() {
        const { data, error } = await supabase.auth.updateUser({
            data: { userName: 'world' }
        })
        return {data,error}
    }
    
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        updateUserName()
            .then(data => startTransition( () => push('/') ))
            .catch(error => setFormError(error))
    }

    return (
        <div className="page create">
            <h1 className='text-3xl text-center mb-8'>Tell us about yourself 😄</h1>
            <form onSubmit={handleSubmit}>
                {/* user name  */}
                <label htmlFor="title">Your name</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                {isPending ? <Spinner /> : <button>Create new account</button>}
                {formError && <p className="error">{formError.message}</p>}
            </form>
        </div>
    )
}

export default RegestrationInfo