import {PostType} from "../interfaces/PostsInterface";
import createSagaMiddleware from 'redux-saga'
import {createStore, applyMiddleware} from "redux";

export enum PostActionTypes {
    LOAD_POSTS = 'LOAD_POSTS',
    ADD_POST = 'ADD_POST',
    DELETE_POST = 'DELETE_POST',
    UPDATE_POST = 'UPDATE_POST',
    CHANGE_CHECKED_POST = 'CHANGE_CHECKED_POST',
    UNLOAD_POST = 'UNLOAD_POST',
    LOAD_LOCAL_DATA = 'LOAD_LOCAL_DATA',
    SEND_LOCAL_DATA = 'SEND_LOCAL_DATA',
    CLEAR_BAG = 'CLEAR_BAG'
}

type IAction =
    ADD_POST_ACTION |
    LOAD_POST_ACTION |
    DELETE_POST_ACTION |
    UPDATE_POST_ACTION |
    CHANGE_CHECKED_POST_ACTION |
    UNLOAD_POST_ACTION |
    LOAD_POST_DATA |
    SEND_POST_DATA |
    CLEAR_BAG_DATA;


const defaultPostsState = {
    posts: [],
    bag: []
}

interface IState {
    posts: PostType[]
    bag: PostType[]
}

interface LOAD_POST_ACTION {
    type: PostActionTypes.LOAD_POSTS
}

interface ADD_POST_ACTION {
    type: PostActionTypes.ADD_POST
    post: PostType
}

interface DELETE_POST_ACTION {
    type: PostActionTypes.DELETE_POST
    id: number
}

interface UPDATE_POST_ACTION {
    type: PostActionTypes.UPDATE_POST
    post: PostType
}

interface CHANGE_CHECKED_POST_ACTION {
    type: PostActionTypes.CHANGE_CHECKED_POST
    id: number
}

interface UNLOAD_POST_ACTION {
    type: PostActionTypes.UNLOAD_POST
}

interface LOAD_POST_DATA {
    type: PostActionTypes.LOAD_LOCAL_DATA
    posts: PostType[]
    bag: PostType[]
}

interface SEND_POST_DATA {
    type: PostActionTypes.SEND_LOCAL_DATA
}

interface CLEAR_BAG_DATA {
    type: PostActionTypes.CLEAR_BAG
}


export const reducer = (state: IState = defaultPostsState, action: IAction): IState => {
    switch (action.type) {
        case PostActionTypes.LOAD_LOCAL_DATA:
            return {...state, posts: [...action.posts], bag: [...action.bag]}
        case PostActionTypes.SEND_LOCAL_DATA:
            localStorage.setItem('array', JSON.stringify(state.posts));
            localStorage.setItem('bag', JSON.stringify(state.bag));
            return state
        case PostActionTypes.ADD_POST:
            return {...state, posts: [action.post, ...state.posts]}
        case PostActionTypes.DELETE_POST:
            return {
                ...state, posts: [...state.posts.filter((item) => item.id !== action.id)],
                bag: [...state.posts.filter((item) => item.id === action.id), ...state.bag]
            }
        case PostActionTypes.UPDATE_POST:
            return {...state, posts: [...state.posts.map(item => item.id === action.post.id ? action.post : item)]}
        case PostActionTypes.CHANGE_CHECKED_POST:
            return {
                ...state,
                posts: [...state.posts.map(item => item.id === action.id ? {...item, status: !item.status} : item)]
            }
        case PostActionTypes.CLEAR_BAG:
            return {...state, bag: []}

        default:
            return state
    }
}


export const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducer, applyMiddleware(sagaMiddleware))





