'use client'
import React, { FormEventHandler, useEffect, useState, useTransition } from 'react'
import supabase from '../utils/utils';
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: { id: number } }) => {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function getDocs() {
      const { data } = await supabase.from("notes").select().eq('id', +params.id).single()
      setTitle(data.title)
    }

    getDocs()
  }, [params])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
   await supabase
      .from('notes')
      .update({ "title":  title})
      .eq('id', +params.id )

      startTransition(()=>{
        router.refresh()
        router.push('/')
      })
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

        <button> { isPending ? 'loading...' : "Update Notes"} </button>
      </form>
    </div>
  )
}

export default Page