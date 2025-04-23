import React, { useContext, useState } from 'react';
import { YglobalAppContext } from '../../context/AppContext';
import { filterAppContext } from '../../context/FilterContext';

function Color() {
    const { handleFiltering, isSelected } = useContext(filterAppContext);
    const [isOpen, setIsOpen] = useState(true);
    const { products } = useContext(YglobalAppContext);
    let uniqueColors = new Set();

    if (products) {
        products.forEach(product => {
            if (product.color) {
                const normalizedColor = product.color.trim().toLowerCase();
                uniqueColors.add(normalizedColor);
            }
        });
    }

    uniqueColors = Array.from(uniqueColors);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="YshopLeftSections">
            <div className={isOpen ? 'accordionHeading activeAcc' : 'accordionHeading'} onClick={toggleAccordion}>
                <h3 >Colors</h3>
                <i class={`fa-solid ${isOpen ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
            </div>
            <ul
                className={`accordion-content ${isOpen ? 'expandedAcc' : 'collapseAcc'}`}
            >
                {uniqueColors.map((color, index) => (
                    <li key={index} className="YshopLeftColorFlex YglobalFlex">
                        <div
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: color,
                                border: '1px solid rgba(193, 193, 193, 0.365)',
                                marginRight: '10px',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleFiltering(null, color)}
                        ></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Color;
