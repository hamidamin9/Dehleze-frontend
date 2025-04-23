import React, { useContext } from 'react'
import { filterAppContext } from '../context/FilterContext'
import { YglobalAppContext } from '../context/AppContext';

function PaginationBtns({ totalProducts, productsperpage, currentpagenumber }) {
    const { setPageNumber } = useContext(YglobalAppContext)
    let ShopPageNumbers = totalProducts ? Math.ceil(totalProducts / productsperpage) : 0;
    console.log(ShopPageNumbers, 'ShopPageNumbers checking...')

    let renderPagination = (totalPages, currentPage, setPageNum) => {
        let pages = [];

        // Render First page 

        if (totalPages > 0) {
            pages.push(
                <button className={currentPage === 1 ? 'activePaginationBtn' : ''} onClick={() => setPageNum(1)}>1</button>
            )
        }

        // Render dots before current page 

        if (currentPage > 2) {
            pages.push(
                <span>...</span>
            )
        }

        // Render current page 

        if (currentPage > 1 && currentPage < totalPages) {
            pages.push(
                <button className={currentPage ? 'activePaginationBtn' : ''} onClick={() => setPageNum(currentPage)}>{currentPage}</button>
            )
        }

        // Render dots after current page 

        if (currentPage < totalPages - 1) {
            pages.push(
                <span>...</span>
            )
        }

        if (totalPages > 1) {
            pages.push(
                <button className={currentPage === totalPages ? 'activePaginationBtn' : ''} onClick={() => setPageNum(totalPages)}>{totalPages}</button>
            )
        }
        return pages
    }


    return (
        <>
            <div className='YpaginationBtn YglobalFlex'>
                <button id='previousBtn' onClick={() => {
                    if (totalProducts) {
                        setPageNumber(currentpagenumber - 1)
                    }
                }} disabled={currentpagenumber <= 1} className={currentpagenumber <= 1 ? "disablePaginationButton" : ''}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                {totalProducts && renderPagination(ShopPageNumbers, currentpagenumber, setPageNumber)}

                <button id='nextBtn' onClick={() => {
                    if (totalProducts) {
                        setPageNumber(currentpagenumber + 1)
                    }
                }} disabled={currentpagenumber === ShopPageNumbers} className={currentpagenumber === ShopPageNumbers ? "disablePaginationButton" : ''}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </>
    )
}

export default PaginationBtns