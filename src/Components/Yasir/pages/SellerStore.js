import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
const SellerStore = () => {
    const [product, setProduct] = useState([])
    const [selectedImage, setSelectedImage] = useState([])
    const [sellerInfo, setsellerInfo] = useState([])

    const productsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(product.length / productsPerPage);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const { sellerId } = useParams();
    console.log(sellerId, "seller id checking...");

    const API = `http://39.61.51.195:8004/product-create/`
    useEffect(() => {
        fetch(API)
            .then((response) => response.json())
            .then((data) => {
                const filteredProducts = data.filter((f) => f.seller_id.toString() === sellerId);
                setProduct(filteredProducts);
                console.log(filteredProducts, 'seller products checking...');
            })
            .catch((error) => console.error("Error fetching product details:", error));

        fetch('http://39.61.51.195:8004/account/store/')
            .then((response) => response.json())
            .then((data) => {
                const filteredProducts = data.filter((f) => f.seller.toString() === sellerId);
                console.log(filteredProducts, 'seller console info')
                setsellerInfo(filteredProducts);
                console.log(filteredProducts, 'seller information...');
            })
            .catch((error) => console.error("Error fetching product details:", error));
    }, [sellerId]);


    return (
        <div className="seller-store">
            {/* Seller Info */}
            {
                sellerInfo.length > 0 ? sellerInfo.map((i) => {
                    return <>
                        <div className="seller-header">
                            <img src={i.banner} alt={i.store_name} className="seller-img" />
                            <div className="seller-details">
                                <div className="seller-details-left">
                                    <h2>{i.store_name}</h2>
                                    <p className="store-name">{i.phone_number ? i.phone_number : 'Phone Number -'}</p>
                                    <p className="store-name">{i.email ? i.email : 'Email -'}</p>
                                </div>
                                <div className="seller-details-right">
                                    <p className="store-name"><span>Opening hour -</span> {i.opening_hour ? i.opening_hour : ''}</p>
                                    <p className="store-name"><span>Closing hour -</span> {i.closing_hour ? i.closing_hour : ' -'}</p>
                                </div>
                            </div>
                        </div>
                    </>
                }) : <div className="seller-header">
                    <img alt='store name' className="seller-img" />
                    <div className="seller-details">
                        <div className="seller-details-left">
                            <h2>Store name</h2>
                            <p className="store-name">Store Phone Number</p>
                            <p className="store-name">Store Email</p>
                        </div>
                        <div className="seller-details-right">
                            <p className="store-name"><span>Opening hour -</span></p>
                            <p className="store-name"><span>Closing hour -</span></p>
                        </div>
                    </div>
                </div>
            }

            <div className="products-section">
                <h2>Products</h2>
                <div className="product-grid">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="product-card seller-product-card">
                            <img src={product.color_image} alt={product.name} className="product-img" />
                            <h3>{product.name}</h3>
                            <p className="price">Rs {product.price}</p>
                            <NavLink
                                style={{ textDecoration: "none" }}
                                to={`/product-details/${product.id}`}
                                className="YaddToCartBtn"
                            >
                                View Details
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>


            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    &laquo; Prev
                </button>
                <button className="currPageBtn">
                    Page {currentPage} of {totalPages}
                </button>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Next &raquo;
                </button>
            </div>
        </div>
    );
};

export default SellerStore;
