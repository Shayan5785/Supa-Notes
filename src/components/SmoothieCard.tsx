'use client'

import { smoothieProps } from '@/app/types/types'
import supabase from '@/app/utils/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SmoothieCard = ({ title,id }: smoothieProps ) => {

  const { refresh } = useRouter()

  const handleDelete = async () => {
    await supabase
    .from("notes")
    .delete()
    .eq("id", id)
    .single()
    refresh()
  }

  return (
    <div className="smoothie-card">
      <h3>{title}</h3>
      <div className="flex justify-center items-center gap-10">
        <button className='bg-red-500 text-white p-2 rounded-md' onClick={handleDelete}>Delete</button>
        <Link className='bg-yellow-500 text-white p-2 rounded-md' href={`/${[id]}`}>Update</Link>
      </div>
    </div>
  )
}

export default SmoothieCard