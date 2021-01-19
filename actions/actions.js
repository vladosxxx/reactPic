import Unsplash, { toJson } from 'unsplash-js'

const ACTION_LOAD_DATA = 'ACTION_LOAD_DATA'

const unsplash = new Unsplash({
    accessKey: "7SI75r0Sdp9V-rT7tOLGF4AdEs7j4764GpQn_4VpMk4"
});
export function actionLoadData(data) {
    return {
        type: ACTION_LOAD_DATA,
        payload: data
    }
}

export function fetcRandomPics(a) {
    // We return a function instead of an action object
    return (dispatch) => {
        console.log('here1')

        unsplash.photos.listPhotos(1, 30)
            .then(toJson)
            .then(data => {
                dispatch(actionLoadData(data))
            })
            .catch(error => console.error(error))
    }
}
export function searchPic(text) {
    return (dispatch) => {
        console.log('here2')
        unsplash.search.photos(text, 1, 30)
            .then(toJson)
            .then(data => {
                dispatch(actionLoadData(data.results))
            })
            .catch(error => console.error(error))
    }

}