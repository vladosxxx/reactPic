import { createStore } from 'redux'
// import thunk from 'redux-thunk';

const initialState = {
    id: [0],
    urls: ["Loading..."]
}

export default function fetchData(state = initialState, action) {
    switch (action.type) {
        case 'ACTION_LOAD_DATA': {
            console.log(action.payload[0].id)
            console.log(action.payload[0].links.html)
            return {
                ...state,
                id: [...action.payload.id],
                urls: [...action.payload.links]
            }
        }
        default:
            return state
    }
}