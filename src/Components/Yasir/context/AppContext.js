import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { createContext } from "react";
import reducer from '../reducer/AppReducer'

export const YglobalAppContext = createContext()

function AppContext({ children }) {
    let initialState = {
        isLoading: false,
        isError: false,
        products: [],
        currentpagenumber: 1,
        productsperpage: 8,
        paginatedbtns: []
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    let API = "http://39.61.51.195:8004/product-create/"

    useEffect(() => {
        YFetchAllProducts(API)
    }, [API])

    const YFetchAllProducts = async (url) => {
        dispatch({ type: "SET_LOADING" })
        try {
            let fetchAllProducts = await axios.get(url)
            let response = await fetchAllProducts.data
            dispatch({ type: "GET_ALL_PRODUCTS", payload: response })
            console.log(response, 'api data')
        } catch (error) {
            dispatch({ type: "SET_ERROR" })
            console.log(error.message)
        }
    }

    const setPageNumber = (page) => {
        dispatch({ type: "SET_PAGE_NUMBER", payload: page })
    }

    return (
        <YglobalAppContext.Provider value={{ ...state, setPageNumber, dispatch }}>{children}</YglobalAppContext.Provider>
    )
}

export default AppContext