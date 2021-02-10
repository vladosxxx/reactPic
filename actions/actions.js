import Unsplash, { toJson } from 'unsplash-js'

const ACTION_LOAD_DATA = 'ACTION_LOAD_DATA'
const ACTION_LOAD_ELEMENTS = 'ACTION_LOAD_ELEMENTS'
const CLEAR_DATA = 'CLEAR_DATA'

const unsplash = new Unsplash({
    accessKey: "7SI75r0Sdp9V-rT7tOLGF4AdEs7j4764GpQn_4VpMk4"
});

function actionLoadData(data) {
    return {
        type: ACTION_LOAD_DATA,
        payload: data
    }
}

function actionLoadElements(data) {
    return {
        type: ACTION_LOAD_ELEMENTS,
        payload: data
    }
}

export function actoinClearData() {
    return {
        type: CLEAR_DATA,
        payload: []
    }
}

export function fetcRandomPics(num) {
    return (dispatch) => {
        unsplash.photos.listPhotos(num, 10)
            .then(toJson)
            .then(data => {
                dispatch(actionLoadData(data))
            })
            .catch(error => console.error(error))
    }
}
export function fetcRandomElements(num) {
    return (dispatch) => {
        unsplash.photos.listPhotos(num, 10)
            .then(toJson)
            .then(data => {
                dispatch(actionLoadElements(data))
            })
            .catch(error => console.error(error))
    }
}
export function searchPicPage(text, num) {
    return (dispatch) => {
        unsplash.search.photos(text, num, 10)
            .then(toJson)
            .then(data => {
                dispatch(actionLoadElements(data.results))
            })
            .catch(error => console.error(error))
    }
}
export function searchPic(text, num) {
    return (dispatch) => {
        unsplash.search.photos(text, num, 10)
            .then(toJson)
            .then(data => {
                dispatch(actionLoadData(data.results))
            })
            .catch(error => console.error(error))
    }
}