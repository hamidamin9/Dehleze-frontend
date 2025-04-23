import React, { useContext, useState, useEffect } from 'react';
import { filterAppContext } from '../../context/FilterContext';
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

function Size() {
    const { handleFiltering, isSelected } = useContext(filterAppContext);
    const [sizes, setsizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        // Fetch sizes from the API
        const fetchSizes = async () => {
            try {
                const response = await axios.get(
                    'http://39.61.51.195:8004/product-create/'
                );
                setsizes(response.data);
            } catch (error) {
                console.error('Error fetching sizes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSizes();
    }, []);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    // Filter unique sizes
    let uniqueSizes = new Set(sizes.map(size => size.size).filter(Boolean));

    if (sizes) {
        uniqueSizes = Array.from(uniqueSizes);
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="YshopLeftSections">
            <div className={isOpen ? 'accordionHeading activeAcc' : 'accordionHeading'} onClick={toggleAccordion}>
                <h3 >Sizes</h3>
                <i class={`fa-solid ${isOpen ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
            </div>
            <ul
                className={`accordion-content ${isOpen ? 'expandedAcc' : 'collapseAcc'}`}
            >
                {uniqueSizes.map((size, index) => (
                    <li
                        key={index}
                        className={isSelected === size ? 'selectedCategory' : ''}
                        onClick={() => handleFiltering(null, null, size)}
                    >
                        <p>{size ? size.charAt(0).toUpperCase() + size.slice(1) : null}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Size;
