import { createContext, useContext, useEffect, useReducer } from "react";
import { YglobalAppContext } from "./AppContext";
import reducer from '../reducer/FilterReducer'
export const filterAppContext = createContext()

function FilterContext({ children }) {
    const { products, dispatch: addDispatch } = useContext(YglobalAppContext)
    let initialState = {
        all_products: [],
        filter_products: [],
        sorting_value: "lowest",
        isSelected: null,
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({ type: "SET_FILTER_DATA", payload: products })
    }, [products])

    // for sorting 
    let sorting = (event) => {
        let sorted_value = event.target.value;
        console.log(sorted_value, 'sorted value checking...')
        dispatch({ type: "GET_SORT_VALUE", payload: sorted_value });
        dispatch({ type: "SORTING_PRODUCT" })
    }

    let handleFiltering = (category, color, size) => {
        const payload = {};
        if (category) payload.category = category;
        if (color) payload.color = color;
        if (size) payload.size = size;

        dispatch({ type: "FILTERING_PRODUCTS", payload });
        if (category) {
            dispatch({ type: "SELECTED_CATEGORY", payload: category });
        }
        if (color) {
            dispatch({ type: "SELECTED_COLOR", payload: color });
        }
        if (size) {
            dispatch({ type: "SELECTED_SIZE", payload: size });
        }
        addDispatch({ type: "RESET_PAGE_NUMBER", payload: 1 })
    };

    let removeSorting = () => {
        dispatch({ type: "REMOVE_SORTING" })
        addDispatch({ type: "RESET_PAGE_NUMBER", payload: 1 })
    }

    return (
        <filterAppContext.Provider value={{ ...state, sorting, handleFiltering, removeSorting }}>{children}</filterAppContext.Provider>
    )
}

export default FilterContext