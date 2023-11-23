'use client'

import { smoothieProps } from '@/app/types/types'
import supabase from '@/app/utils/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

const SmoothieCard = ({ title, id, user }: smoothieProps) => {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const handleDelete = async () => {
    await supabase
      .from("notes")
      .delete()
      .eq("id", id)
      .single()
      startTransition(() => refresh())
  }

  return (
    <div className="smoothie-card">
      <h1>{user}</h1>
      <h3>{title}</h3>
      <div className="flex justify-center items-center gap-10">
        <button className='bg-red-500 text-white p-2 rounded-md' onClick={handleDelete}>
          {isPending ? 'deleting...' : "Delete"}
        </button>
        <Link className='bg-yellow-500 text-white p-2 rounded-md' href={`/${[id]}`}>Update</Link>
      </div>
    </div>
  )
}

export default SmoothieCard