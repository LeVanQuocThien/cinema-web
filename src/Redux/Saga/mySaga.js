import { call, put, takeEvery } from 'redux-saga/effects'

//----Get API--------
async function GetAPI(link) {
    let res = await fetch(link)
    let data = await res.json()
    return data
}

function* GetData({ payload }) {
    let dt = yield call(GetAPI, payload.link)
    yield put({
        type: payload.type,
        payload: dt
    })
}

function* mySaga() {
    yield takeEvery('GET_API', GetData)
}

export default mySaga