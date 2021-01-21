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
                filterData.filter((thing, index, self) =>
                    index === self.findIndex((t) => (
                        t.id === thing.id
                    )))
                return {
                    isLoading: false,
                    data: filterData
                }
            }
        default:
            return state
    }
}