import redux, { bindActionCreators, combineReducers } from 'redux'
import { legacy_createStore as createStore } from 'redux';

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICE_CREAM_ORDERED = 'ICECREAM_ORDERED';
const ICE_CREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

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

function orderIceCream(qty = 1) { // action creator
    return {
        type: ICE_CREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty = 1) { // action creator
    return {
        type: ICE_CREAM_RESTOCKED,
        payload: qty
    }
}

const initalCakeState = {
    numOfCakes: 10
}

const initalIceCreamState = {
    numOfIceCreams: 20
}

const cakeReducer = (state = initalCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = initalIceCreamState, action) => {
    switch (action.type) {
        case ICE_CREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1,
            }
        case ICE_CREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload,
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer); // it took only one reducer
console.log("Initial state", store.getState());

const unSubscribe = store.subscribe(() => console.log('update state', store.getState()));

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake(3));

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);


unSubscribe();


/** if I used  :
 store.dispatch({
        type: CAKE_ORDERED,
        quantity: 1
    })
    instead of action creator , this will not give advantage 
*/