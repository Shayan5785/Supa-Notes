"use client"

import React, { FormEventHandler, useState, useTransition } from 'react'
import supabase from '../utils/utils'
import { useRouter } from 'next/navigation'
import Spinner from '@/svg/spinner'

const Signup = () => {
    const [isPending, startTransition] = useTransition()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState<string>()

    const { push } = useRouter()

    async function signUpNewUser() {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:3000/auth/callback'
            }
        })
        return { data, error }
    }


    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        signUpNewUser()
            .then(() => startTransition(() => push('/')))
            .catch(error => setFormError(error))
    }

    return (
        <div className="page create">
            <h1 className='text-3xl text-center mb-8'>Register yourself on Supa Notes</h1>
            <form onSubmit={handleSubmit}>
                {/* email  */}
                <label htmlFor="title">Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* password */}
                <label htmlFor="title">Password</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isPending ? <Spinner /> : <button>Create new account</button>}
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}

export default Signup