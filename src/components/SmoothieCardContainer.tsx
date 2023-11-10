import React from 'react'
import SmoothieCard from './SmoothieCard'
import { smoothieProps } from '@/app/types/types'

const SmoothieCardContainer = ({notes} : {notes: smoothieProps[]}) => {
    return (
        <div className="smoothies">
            {/* order-by buttons */}
            <div className="smoothie-grid">
                {notes.map(smoothie => (
                    <SmoothieCard title={smoothie.title} id={smoothie.id} />
                ))}
            </div>
        </div>
    )
}

export default SmoothieCardContainer