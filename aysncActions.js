import redux, { bindActionCreators, combineReducers, applyMiddleware } from 'redux'
import { legacy_createStore as createStore } from 'redux';
import axios from 'axios';
import ThunkMiddleware from 'redux-thunk';

const initalState = {
    loading: true,
    users: [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest());
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                // response.data is the users
                const users = response.data.map((user) => user.id);
                dispatch(fetchUserSuccess(users));
            })
            .catch(function (error) {
                dispatch(fetchUserFailure(error.message))
            })
        //   (
        //     // error.message is the error message
        //     dispatch(fetchUserFailure(error.message))
        // )
    }
}

const store = createStore(reducer, applyMiddleware(ThunkMiddleware.default));

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(fetchUsers())