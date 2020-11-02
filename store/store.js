import { createStore } from 'redux'
// import thunk from 'redux-thunk';
// import Unsplash, { toJson } from 'unsplash-js'

function fetchData(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_DATA':
            return state
        default:
            return state
    }
}
let initialState = {
    imgs: "IMAGES"
}
const store = createStore(fetchData, initialState)

store.dispatch({
    type: 'LOAD_DATA'
})

export default fetchData

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