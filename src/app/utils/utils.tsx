import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// import { createClient } from "@supabase/supabase-js";

// const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClientComponentClient();

export default supabase

interface Note {
    title?: string
    id?: number
    user_id?: number
}

export const GetUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user?.id
}

export const AddNote = async ({ title }: Note) => {
    const user_id = await GetUserId()
    await supabase.from('notes').insert([{ title, user_id }])
}

export const DeleteNote = async ({ id }: Note) => {
    await supabase.from("notes").delete().eq("id", id).single()
}