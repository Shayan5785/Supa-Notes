import Link from 'next/link'
import React from 'react'
import LogoutButton from './LogoutButton'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const Header = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)

    return (
        <nav>
            <h1>Supa Notes</h1>
            <Link href="/">Home</Link>
            {user ?
                <>
                    <Link href="/create">Create New Note</Link>
                    <LogoutButton />
                </>
                :
                <>
                    <Link href="/signup">Sign up</Link>
                    <Link href="/login">Log in</Link>
                </>
            }
        </nav>
    )
}

export default Header