function AppReducer(state, action) {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "GET_ALL_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                isLoading: false,
            }
        case "SET_ERROR":
            return {
                ...state,
                isError: true
            }

        case "SET_PAGE_NUMBER":
            return {
                ...state,
                currentpagenumber: action.payload
            }
        case "RESET_PAGE_NUMBER":
            return {
                ...state,
                currentpagenumber: action.payload
            }

        default:
            return state
    }
}

export default AppReducer