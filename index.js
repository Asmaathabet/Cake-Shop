import redux, { bindActionCreators } from 'redux'
import { legacy_createStore as createStore } from 'redux';

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

function orderCake() { // action creator
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qty = 1) { // action creator
    return {
        type: CAKE_RESTOCKED,
        payload: qty
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
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
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

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake(3));

const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

unSubscribe();


/** if I used  :
 store.dispatch({
        type: CAKE_ORDERED,
        quantity: 1
    })
    instead of action creator , this will not give advantage 
*/