import redux from 'redux'
import { legacy_createStore as createStore } from 'redux';

const initalState = {
    name: 'Rafah',
    address: {
        street: '123 Main St',
        city: 'Gaza',
        state: 'Palestine'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

const updateStreet = (street) => { // action creator
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

const StreetReducer = (state = initalState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            return {
                ...state,
                address: {
                    ...state.address,
                    street: action.payload
                },
            }
        default:
            return state
    }
}


const store = createStore(StreetReducer); // it took only one reducer
console.log("Initial state", store.getState());

const unSubscribe = store.subscribe(() => console.log('update state', store.getState()));

store.dispatch(updateStreet('400 Main st'));

unSubscribe();


