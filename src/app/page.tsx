import NotesCard from "@/components/SmoothieCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'
const supabase = createServerComponentClient({cookies});

export default async function Home() {

  const { data: notes, error } = await supabase.from("notes").select();
  console.log(notes)
  return (
    <main className="page home">
      {error && <p>Unable to fetch data from db.</p>}
      {notes &&
        <div className="smoothies">
          <div className="smoothie-grid">
            {notes.map(note => (
              <NotesCard key={note.id} title={note.title} id={note.id} user={note.user_id} />
            ))}
          </div>
        </div>}
    </main>
  )
}
