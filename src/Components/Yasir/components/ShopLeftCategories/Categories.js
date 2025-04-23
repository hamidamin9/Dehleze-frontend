import React, { useContext, useState, useEffect } from 'react';
// import { YglobalAppContext } from '../../context/AppContext';
import { filterAppContext } from '../../context/FilterContext';
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

function Categories() {
    const { handleFiltering, isSelected } = useContext(filterAppContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    'http://39.61.51.195:8004/account/category/'
                );
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="YshopLeftSections">
            <div className={isOpen ? 'accordionHeading activeAcc' : 'accordionHeading'} onClick={toggleAccordion}>
                <h3 >Categories</h3>
                <i class={`fa-solid ${isOpen ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
            </div>
            <ul
                className={`accordion-content ${isOpen ? 'expandedAcc' : 'collapseAcc'}`}
            >
                {categories.map((category) => (
                    <li
                        key={category.category_id || category.name}
                        className={isSelected === category.category_id ? 'selectedCategory' : ''}
                        onClick={() => handleFiltering(category.category_id)}
                    >
                        <p>{category.name ? category.name.charAt(0).toUpperCase() + category.name.slice(1) : null}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
