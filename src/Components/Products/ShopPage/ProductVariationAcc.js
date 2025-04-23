import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { filterAppContext } from '../../Yasir/context/FilterContext';

function ProductVariation() {
    const { handleFiltering, isSelected } = useContext(filterAppContext);
    const [variations, setVariations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVariations = async () => {
            try {
                const response = await axios.get('http://39.61.51.195:8004/productvariation/');
                const filteredVariations = response.data.map(item => {
                    return Object.entries(item).reduce((acc, [key, value]) => {
                        if (value !== null) {
                            acc[key] = value;
                        }
                        return acc;
                    }, {});
                });
                setVariations(filteredVariations);
            } catch (error) {
                console.error('Error fetching product variations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVariations();
    }, []);

    return (
        <div className="YshopLeftSections">
            <div className='accordionHeading activeAcc'>
                <h3>Product Variations</h3>
            </div>
            <ul className='accordion-content expandedAcc'>
                {variations.map((variation, index) => (
                    <li key={index}>
                        <ul>
                            {Object.entries(variation)
                                .filter(([key, value]) => !key.toLowerCase().includes("image"))
                                .map(([key, value]) => (
                                    <li key={key}>
                                        <strong>{key}:</strong> {String(value)}
                                    </li>
                                ))
                            }
                        </ul>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default ProductVariation;
