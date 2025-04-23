import React, { useContext } from 'react'
import { YglobalAppContext } from '../context/AppContext'
import YShopRightProducts from './YShopRightProducts'
import { filterAppContext } from '../context/FilterContext'
import Sort from './Sort'
import RemoveSorting from './RemoveSorting'

function DShopRight() {
    const { products } = useContext(YglobalAppContext)
    const { filter_products } = useContext(filterAppContext)
    console.log(products, 'products from context')

    let approvedProducts = filter_products.map((p) => p).filter((a) => a.status === "Approved")

    return (
        <div className='YShopRight'>
            <div className='YrightShopBanner'>
                <img src="/images/shopbanner.jpg" alt="" />
            </div>
            <div className='YrightShopProducts'>
                <div className='YrightShopProductsTop YglobalFlex'>
                    <div>
                        <h3>Products</h3>
                        <p>Total Products: <span>{approvedProducts.length}</span></p>
                    </div>
                    <div className='yShopRightTopBtnFlex YglobalFlex'>
                        <Sort />
                        <RemoveSorting />
                    </div>
                </div>

                <YShopRightProducts filter_products={approvedProducts} />
            </div>
        </div>
    )
}

export default DShopRight