const FilterReducer = (state, action) => {
    switch (action.type) {
        case "SET_FILTER_DATA":
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload]
            };
        case "GET_SORT_VALUE":
            return {
                ...state,
                sorting_value: action.payload,
            };

        case "SORTING_PRODUCT":
            // let newSortedData;

            // if (state.filter_products.length > 0) {
            //     newSortedData = state.filter_products;
            // } else {
            //     newSortedData = state.all_products;
            // }

            let newSortedData = state.filter_products.length > 0
                ? [...state.filter_products]
                : [...state.all_products];

            if (state.sorting_value === "az") {
                newSortedData.sort((a, b) => a.name.localeCompare(b.name));
            }
            if (state.sorting_value === "za") {
                newSortedData.sort((a, b) => b.name.localeCompare(a.name));
            }
            if (state.sorting_value === "asc") {
                newSortedData.sort((a, b) => b.price - a.price);
            }
            if (state.sorting_value === "desc") {
                newSortedData.sort((a, b) => a.price - b.price);
            }
            return {
                ...state,
                filter_products: newSortedData,
            };
        case "FILTERING_PRODUCTS": {
            const { category, color, size } = action.payload;

            const filtering_products = state.all_products.filter((product) => {
                const categoryMatch = category
                    ? product.category_Id === category
                    : true;
                const colorMatch = color
                    ? product.color && product.color.toLowerCase() === color.toLowerCase()
                    : true;
                const sizeMatch = size
                    ? product.size && product.size.toLowerCase() === size.toLowerCase()
                    : true;
                return categoryMatch && colorMatch && sizeMatch;
            });

            return {
                ...state,
                filter_products: filtering_products,
            };
        }
        case "SELECTED_CATEGORY":
            return {
                ...state,
                isSelected: action.payload
            };
        case "SELECTED_COLOR":
            return {
                ...state,
                isSelected: action.payload
            };
        case "SELECTED_SIZE":
            return {
                ...state,
                isSelected: action.payload
            };
        case "REMOVE_SORTING":
            return {
                ...state,
                filter_products: state.all_products.slice(),
                isSelected: null
            };
        default:
            return state;
    }
};

export default FilterReducer;
