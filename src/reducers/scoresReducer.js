import { actionTypes } from '../actions/actions.js';
import filterValues from '../util/filterValues.js';

const scoresReducer = (state = {}, { type, teamName, amount, score }) => {
    switch (type) {
        case actionTypes.ADD_PLAYER:
            return state.hasOwnProperty(teamName) ? state : { [teamName]: 0, ...state };
        case actionTypes.ADD_POINTS:
            return state.hasOwnProperty(teamName) ? { ...state, [teamName]: state[teamName] + amount } : state;
        case actionTypes.REMOVE_POINTS:
            return state.hasOwnProperty(teamName) ? { ...state, [teamName]: state[teamName] - amount } : state;
        case actionTypes.SET_SCORE:
            return state.hasOwnProperty(teamName) ? { ...state, [teamName]: score } : state;
        default:
            return state;
    }
};

export default scoresReducer;
