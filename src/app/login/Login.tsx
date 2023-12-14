"use client"

import React, { FormEventHandler, useState, useTransition } from 'react'
import supabase from '../utils/utils'
import { useRouter } from 'next/navigation'
import Spinner from '@/svg/spinner';


const Login = () => {
    // Hooks for Component optimization 
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    // Nessesary states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState<string | null>()


    // handling signing up 
    async function signInWithEmail() {
        const { data, error } =
            await supabase.auth.signInWithPassword({ email, password })
        return { data, error }
    }

    // handling form submission
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        signInWithEmail()
            .then(({ data, error }) => {
                if (data.user) {
                    startTransition(() => {
                        router.refresh()
                        router.push('/')
                    })
                } else {
                    setFormError(error?.message)
                }
            })
    }

    return (
        <div className="page create">
            <h1 className='text-3xl text-center mb-8'>Welcome back</h1>
            <form onSubmit={handleSubmit}>
                {/* email  */}
                <label htmlFor="title">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* password */}
                <label htmlFor="title">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {isPending ? <Spinner className='h-screen w-screen absolute z-30 bg-black opacity-70 top-0 left-0 flex justify-center items-center' /> : <button>Log in</button>}

                {/* Populating Errors if there's any */}
                {formError && <p className="error pt-3 text-red-500">{formError}</p>}
            </form>
        </div>
    )
}

export default Login