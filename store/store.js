import { createStore } from 'redux'
import Unsplash, { toJson } from 'unsplash-js'

function fetchData(state, action) {
    switch (action.type) {
        case 'LOAD_DATA':
            return (() => {
                useEffect(() => {
                    const unsplash = new Unsplash({
                        accessKey: "7SI75r0Sdp9V-rT7tOLGF4AdEs7j4764GpQn_4VpMk4"
                    });
                    unsplash.photos.listPhotos(1, 30)
                        .then(toJson)
                        .then(data => {
                            state.data = data
                        })
                        .catch(error => console.error(error))
                        .finally(() => state.isLoading = false)
                }, [])
            })
        default:
            return state

    }
}
let initialData = {
    data: [],
    isLoading: true
}
let store = createStore(fetchData, initialData)

store.dispatch({
    type: 'LOAD_DATA'
})

console.log(initialData)