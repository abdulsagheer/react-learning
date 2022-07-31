const redux = require("redux");
const createStore = redux.createStore();
const bindActionCreators = redux.bindActionCreators()
// Action constants
const CAKE_ORDERED = "CAKE_ORDERED";

// Action Creator is a function that return a Action object
function orderCake() {
  // Action is an object with type property
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCK,
    payload: qty,
  };
}
// Global State
const initialState = {
  numberOfCakes: 10,
  anotherProperty: 21,
};
// Reducer
//  (previousState, action) => newState
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state, // COPY of the state object by spreading it.
        numberOfCakes: state.numberOfCakes - 1,
      };
    case CAKE_RESTOCK:
      return {
        ...state, // COPY of the state object by spreading it.
        numberOfCakes: state.numberOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial state ", store.getState());

const unsubscribe = store.subscribe(() => {
  "Updated state", store.getState();
});

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake());
// store.dispatch(restockCake());
// store.dispatch(restockCake());

const actions = bindActionCreators({orderCake, restockCake}, store.dispatch);
actions.orderCake()
actions.orderCake();
actions.orderCake();
actions.restockCake();

unsubscribe();
