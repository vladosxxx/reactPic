import { createStore } from 'redux'
// import thunk from 'redux-thunk';
import Unsplash, { toJson } from 'unsplash-js'

const initialState = {
    title: "Loading data...",

}

function fetchData(state = initialState, action) {
    return state
}
const store = createStore(fetchData)


const ACTION_LOAD_DATA = 'ACTION_LOAD_DATA'

const actionLoadData = {
    type: ACTION_LOAD_DATA,
    payload: null
}

export default fetchData

// store.getState()
// async() => {
//     await useEffect(() => {
//         const unsplash = new Unsplash({
//             accessKey: "7SI75r0Sdp9V-rT7tOLGF4AdEs7j4764GpQn_4VpMk4"
//         });
//         unsplash.photos.listPhotos(1, 30)
//             .then(toJson)
//             .then(data => {
//                 state.data = data
//             })
//             .catch(error => console.error(error))
//             .finally(() => state.isLoading = false)
//     }, [])
// }