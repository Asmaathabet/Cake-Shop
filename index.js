import redux from 'redux'
import { legacy_createStore as createStore } from 'redux';

const CAKE_ORDERED = 'CAKE_ORDERED';

function orderCake() { // action creator
    return {
        type: CAKE_ORDERED,
        quantity: 1
    }
}

const initalState = {
    numOfCakes: 10,
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
            break;

        default:
            return state
            break;
    }
}

const store = createStore(reducer);
console.log("Inital state", store.getState());

const unSubscribe = store.subscribe(() => console.log('update state', store.getState()));

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

unSubscribe();


/** if I used  :
 store.dispatch({
        type: CAKE_ORDERED,
        quantity: 1
    })
    instead of action creator , this will not give advantage 
*/