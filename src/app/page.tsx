"use client"

import supabase from "./utils/utils"
import { useEffect, useState } from "react";
import SmoothieCardContainer from "@/components/SmoothieCardContainer";

export default function Home() {
  const [notes, setNotes]: any = useState()
  const [error, setError]: any = useState()

  useEffect(() => {
    const fetchRes = async () => {
      const { data: notes, error } = await supabase.from("notes").select();
      setNotes(notes)
      setError(error)
    }
    fetchRes()
  }, [notes])

  return (
    <main className="page home">
      {error && <p>Unable to fetch data from db.</p>}
      {notes && <SmoothieCardContainer notes={notes} />}
    </main>
  )
}
