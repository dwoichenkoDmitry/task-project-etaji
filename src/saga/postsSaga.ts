import {put, call, takeEvery} from 'redux-saga/effects'
import {LOAD_LOCAL_DATA, SEND_LOCAL_DATA} from "./AsyncActions";
import {PostType} from "../interfaces/PostsInterface";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

function LoadPosts(): PostType[] {
    return localStorage.getItem("array") ? JSON.parse(localStorage.getItem("array") || '') : []
}

function LoadBag(): PostType[] {
    return localStorage.getItem("bag") ? JSON.parse(localStorage.getItem("bag") || '') : []
}

function* storageLoadWorker() {
    yield delay(500)
    const posts: PostType[] = yield call(LoadPosts)
    const bag: PostType[] = yield call(LoadBag)
    yield put({type: LOAD_LOCAL_DATA, posts: posts, bag: bag})
}

function* storageSendWorker() {
    yield delay(500)
    yield put({type: SEND_LOCAL_DATA})
}

export function* postsWatcher() {
    yield takeEvery('ASYNC_LOAD', storageLoadWorker)
    yield takeEvery('ASYNC_SEND', storageSendWorker)
}