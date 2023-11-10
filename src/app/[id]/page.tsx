'use client'
import React, { FormEventHandler, useEffect, useState } from 'react'
import supabase from '../utils/utils';

const Page = ({ params }: { params: { id: number } }) => {
  const [title, setTitle] = useState('')

  useEffect(() => {
    async function getDocs() {
      const { data } = await supabase.from("notes").select().eq('id', +params.id).single()
      setTitle(data.title)
    }

    getDocs()
  }, [params])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async () => {
   await supabase
      .from('notes')
      .update({ "title":  title})
      .eq('id', +params.id )
  }

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>
      </form>
    </div>
  )
}

export default Page