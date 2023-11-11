import NotesCard from "@/components/SmoothieCard";
import supabase from "./utils/utils"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { data: notes, error } = await supabase.from("notes").select();
  return (
    <main className="page home">
      {error && <p>Unable to fetch data from db.</p>}
      {notes &&
        <div className="smoothies">
          <div className="smoothie-grid">
            {notes.map(note => (
              <NotesCard key={note.id} title={note.title} id={note.id} />
            ))}
          </div>
        </div>}
    </main>
  )
}
