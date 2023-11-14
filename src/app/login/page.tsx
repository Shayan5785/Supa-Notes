"use client"

import React, { FormEventHandler, useState, useTransition } from 'react'
import supabase from '../utils/utils'
import { useRouter } from 'next/navigation'
import { AuthError } from '@supabase/supabase-js'


const page = () => {
    // Hooks for Component optimization 
    const [isPending, startTransition] = useTransition()
    const { push } = useRouter()

    // Nessesary states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState<AuthError>()


    // handling signing up 
    async function signInWithEmail() {
        const { data, error } = 
        await supabase.auth.signInWithPassword({email,password})
        return {data, error}
    }

    // handling form submission
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        signInWithEmail()
            .then(data => console.log(data))
            .catch(error => setFormError(error))
        startTransition(() => push('/'))
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
                <button> {isPending ? 'loading...' : "Create Notes"} </button>
                
                {/* Populating Errors if there's any */}
                {formError && <p className="error">{formError.message}</p>}  
            </form>
        </div>
    )
}

export default page