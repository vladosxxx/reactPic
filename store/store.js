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
        case 'ACTION_LOAD_ELEMENTS':
            {

                let filterData = state.data.concat(action.payload)
                const table = {};
                const res = filterData.filter(({ id }) => (!table[id] && (table[id] = 1)));
                return {
                    isLoading: false,
                    data: res
                }
            }
        default:
            return state
    }
}