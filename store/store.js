let initialState = {
    isLoading: true,
    data: []
}


export default function fetchData(state = initialState, action) {
    switch (action.type) {
        case 'ACTION_LOAD_DATA':
            {
                return {
                    isLoading: false,
                    data: [...action.payload]
                }
            }
        default:
            return state
    }
}