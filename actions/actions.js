import Unsplash, { toJson } from 'unsplash-js'

const ACTION_LOAD_DATA = 'ACTION_LOAD_DATA'

export function actionLoadData(data) {
    return {
        type: ACTION_LOAD_DATA,
        payload: data
    }
}
export function errorAfterFiveSeconds() {
    // We return a function instead of an action object
    return (dispatch) => {
        console.log('here2')
        const unsplash = new Unsplash({
            accessKey: "7SI75r0Sdp9V-rT7tOLGF4AdEs7j4764GpQn_4VpMk4"
        });
        unsplash.photos.listPhotos(1, 30)
            .then(toJson)
            .then(data => {
                // console.log(data)
                dispatch(actionLoadData(data))
            })
            .catch(error => console.error(error))
    }
}