import LoggedinHomePage from "@/components/LoggedinHomePage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

// stop caching automatically
export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser()      // getting logged user data
  const { data: notes, error } = await supabase.from("notes").select();     // getting notes

  return (
    <main className="page home">
      {/* if any error occurs while getting the notes */}
      {error && <p>Unable to fetch data from db.</p>}
      {/* render the page on the basis of user authentication */}
      {user ? <LoggedinHomePage notes={notes} user={user} /> :
        <div>
          <div className="flex justify-center gap-2 items-center mb-3">
            <figure>
              <Image src={'/logo.png'} alt="logo" width={40} height={40} />
            </figure>
            <h1 className='text-3xl text-center inline-block'>Elevate Your Thoughts, Simplify Your Notes.</h1>
          </div>
          <p className='text-center mb-5'>Log In to Unleash Your Ideas, Register to Begin Your Note-Taking Journey with Supanotes.</p>
          <div className="flex justify-center gap-6">
            <Link className='bg-red-500 text-white p-2 rounded-md' href="/signup">Sign up</Link>
            <Link className='bg-primary text-white p-2 rounded-md' href="/login">Log in</Link>
          </div>
        </div>
      }
    </main>
  )
}
