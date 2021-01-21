import Unsplash, { toJson } from 'unsplash-js'

const ACTION_LOAD_DATA = 'ACTION_LOAD_DATA'
const ACTION_LOAD_ELEMENTS = 'ACTION_LOAD_ELEMENTS'

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
    console.log(num)
    return (dispatch) => {
        unsplash.photos.listPhotos(num, 10)
            .then(toJson)
            .then(data => {
                console.log(data)
                dispatch(actionLoadElements(data))
            })
            .catch(error => console.error(error))
    }
}
export function searchPic(text) {
    console.log(text)
    return (dispatch) => {
        console.log("in dispatch")
        unsplash.search.photos(text, 10)
            .then(toJson)
            .then(data => {
                console.log(data)
                dispatch(actionLoadData(data.results))
            })
            .catch(error => console.error(error))
    }
}