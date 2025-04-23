import React, { useContext, useRef, useState } from 'react'
import { filterAppContext } from '../context/FilterContext'
import { YglobalAppContext } from '../context/AppContext'

function Sort() {
    const [toggleSort, setToggleSort] = useState(false)
    const { dispatch: addDispatch } = useContext(YglobalAppContext)
    const { sorting } = useContext(filterAppContext)
    const sortingRef = useRef()

    let handleToggleSorting = (option) => {
        if (option === "az") {
            sortingRef.current.innerHTML = "A - Z sorting"
        }
        if (option === "za") {
            sortingRef.current.innerHTML = "Z - A sorting"
        }
        if (option === "asc") {
            sortingRef.current.innerHTML = "High to Low"
        }
        if (option === "desc") {
            sortingRef.current.innerHTML = "Low to High"
        }
        setToggleSort(false)
    }

    const handleSortChange = (event) => {
        setToggleSort(!toggleSort)
        const value = event.target.getAttribute('value');
        if (value) {
            // console.log(value, 'sorting value checking....')
            sorting({ target: { value } });
            addDispatch({ type: "RESET_PAGE_NUMBER", payload: 1 })
        }
    };
    return (
        <>
            <div className='YshopSorting' onClick={handleSortChange}>
                <div className={toggleSort ? 'YaftersortingBox YsortingBox' : 'YsortingBox'} ref={sortingRef}>
                    Sort Products
                </div>
                {
                    toggleSort &&
                    <div className='YsortValues'>
                        <ul>
                            <li value="az" onClick={() => handleToggleSorting("az")}>A - Z sorting</li>
                            <li value="za" onClick={() => handleToggleSorting("za")}>Z - A sorting</li>
                            <li value="asc" onClick={() => handleToggleSorting("asc")}>High to Low</li>
                            <li value="desc" onClick={() => handleToggleSorting("desc")}>Low to High</li>
                        </ul>
                    </div>
                }
            </div>
        </>
    )
}

export default Sort