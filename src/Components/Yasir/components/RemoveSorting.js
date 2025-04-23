import React, { useContext } from 'react'
import { filterAppContext } from '../context/FilterContext'

function RemoveSorting() {
    const { removeSorting } = useContext(filterAppContext)
    return (
        <>
            <div className='YsortingBox yRemoveSorting' onClick={removeSorting}>
                Remove Sorting
            </div>
        </>
    )
}

export default RemoveSorting