"use client"

import { FormEventHandler, useState } from "react"
import { useRouter } from 'next/navigation'
import supabase from "../utils/utils"

const Create = () => {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (!title) {
      setFormError('Please fill in all the fields correctly.')
      return
    }
    await supabase.from('notes').insert([{ title }])
    router.push('/')
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create