import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { createClient } from "@supabase/supabase-js";

// const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClientComponentClient();

export default supabase