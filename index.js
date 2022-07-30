// Action constants
const CAKE_ORDERED = "CAKE_ORDERED";

// Action Creater is a function that return a Action object
function orderCake() {
    // Action is an object with type property
    return { 
        type: CAKE_ORDERED,
        quantity: 1
    }
}

// Global State
const initialState = {
    numberOfCakes: 10
}
// Reducer
//  (previousState, action) => newState
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                numberOfCakes: state.numberOfCakes - 1
            }
        default:
            return state;
    }
}