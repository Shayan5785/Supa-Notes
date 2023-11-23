import NotesCard from "@/components/SmoothieCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic'
const supabase = createServerComponentClient({ cookies });

export default async function Home() {

  const { data: notes, error } = await supabase.from("notes").select();
  console.log(notes)
  return (
    <main className="page home">
      {error && <p>Unable to fetch data from db.</p>}
      {notes != null ?
        <div className="smoothies">
          <div className="smoothie-grid">
            {notes?.map(note => (
              <NotesCard key={note.id} title={note.title} id={note.id} user={note.user_id} />
            ))}
          </div>
        </div> :
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
