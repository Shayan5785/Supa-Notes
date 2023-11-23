"use client"

import { FormEventHandler, useState, useTransition } from "react"
import { useRouter } from 'next/navigation'
import supabase, { AddNote } from "../utils/utils"

const Create = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [formError, setFormError] = useState<string | null>(null)


  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (!title) {
      setFormError('Please fill in all the fields correctly.')
      return
    }
    AddNote({title})
    startTransition(() => {
      router.refresh()
      router.push('/')
    })
  }

  return (
    <div className="page create">
      <h1 className='text-3xl text-center mb-8'>Build your thought here</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button> {isPending ? 'loading...' : "Create Notes"} </button>


        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create