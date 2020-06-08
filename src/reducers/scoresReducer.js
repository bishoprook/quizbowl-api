import { actionTypes } from '../actions/actions.js';
import filterValues from '../util/filterValues.js';

const scoresReducer = (state = {}, { type, name, amount, score }) => {
    switch (type) {
        case actionTypes.ADD_PLAYER:
            return state.hasOwnProperty(name) ? state : { [name]: 0, ...state };
        case actionTypes.REMOVE_PLAYER:
            return filterValues(state, (_, key) => key !== name);
        case actionTypes.ADD_POINTS:
            return state.hasOwnProperty(name) ? { ...state, [name]: state[name] + amount } : state;
        case actionTypes.REMOVE_POINTS:
            return state.hasOwnProperty(name) ? { ...state, [name]: state[name] - amount } : state;
        case actionTypes.SET_SCORE:
            return state.hasOwnProperty(name) ? { ...state, [name]: score } : state;
        default:
            return state;
    }
};

export default scoresReducer;
