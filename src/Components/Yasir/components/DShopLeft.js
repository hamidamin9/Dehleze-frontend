import React from 'react'
import Categories from './ShopLeftCategories/Categories'
import Color from './ShopLeftCategories/Color'
import Size from './ShopLeftCategories/Size'
// import ProductVariation from './ShopLeftCategories/ProductVariation'

function DShopLeft() {
    return (
        <div className='YShopLeft'>
            <Categories />
            <Color />
            <Size/>
            {/* <ProductVariation/> */}
        </div>
    )
}

export default DShopLeft