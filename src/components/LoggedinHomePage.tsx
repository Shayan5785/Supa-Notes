import React from 'react'
import NotesCard from "@/components/SmoothieCard";

const LoggedinHomePage = ({ notes, user }: any) => {
    return (
        <div>
            <p>{user.user_metadata.userName}</p>
            {/* render the notes if there's any else render the 'Create your first note' */}
            {notes && notes.length > 0 ?
                <div className="smoothies">
                    <div className="smoothie-grid">
                        {notes?.map((note: any) => (
                            <NotesCard key={note.id} title={note.title} id={note.id} user={note.user_id} />
                        ))}
                    </div>
                </div> :
                <p>Create your first note 📝</p>}
        </div>
    )
}

export default LoggedinHomePage