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
                // if (state.data.length >= 20) {
                //     return {
                //         isLoading: false,
                //         data: state.data
                //     }
                // } else {
                let filterData = new Array(20)
                filterData = state.data.concat(action.payload)
                filterData.filter((thing, index, self) =>
                    index === self.findIndex((t) => (
                        t.place === thing.place && t.name === thing.name
                    )))
                return {
                    isLoading: false,
                    data: filterData
                }
                // }
            }
        default:
            return state
    }
}