import { createStore } from 'redux'
// import thunk from 'redux-thunk';

let initialState = {
    isLoading: "AAAAA",
    data: []
}


export default function fetchData(state = initialState, action) {
    switch (action.type) {
        case 'ACTION_LOAD_DATA':
            {
                return {
                    isLoading: "BBBB",
                    data: [...action.payload]
                } //new todos array 
            }
        default:
            return state
    }
}