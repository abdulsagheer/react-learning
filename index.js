const redux = require("redux");
const { default: logger } = require("redux-logger");
const createStore = redux.createStore();
const bindActionCreators = redux.bindActionCreators();
const combineReducers = redux.combineReducers();
const reduxLogger = require('redux-logger').createLogger();
const applyMiddleware = redux.applyMiddleware()

// Action constants
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCK = "CAKE_RESTOCK";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCK = "ICECREAM_RESTOCK";

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

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: CAKE_RESTOCK,
    payload: qty,
  };
}

// Global State
// const initialState = {
//   numberOfCakes: 10,
//   numberOfIce: 21,
// };

const initialCakeState = {
  numberOfCakes: 10,
};

const initialIceCreamState = {
  numberOfIce: 21,
};

// Reducer
//  (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_RESTOCK:
      return {
        ...state, // COPY of the state object by spreading it.
        numberOfCakes: state.numberOfCakes + action.payload,
      };
    case CAKE_ORDERED:
      return {
        ...state, // COPY of the state object by spreading it.
        numberOfIce: state.numberOfIce - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state, // COPY of the state object by spreading it.
        numberOfCakes: state.numberOfCakes - 1,
      };
    case ICECREAM_RESTOCK:
      return {
        ...state, // COPY of the state object by spreading it.
        numberOfIce: state.numberOfIce + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({cake: cakeReducer, ice: iceCreamReducer});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state ", store.getState());

const unsubscribe = store.subscribe(() => { });

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake());
// store.dispatch(restockCake());
// store.dispatch(restockCake());

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);


actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

unsubscribe();
