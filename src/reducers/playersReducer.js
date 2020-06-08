import { actionTypes } from '../actions/actions.js';

const playersReducer = (state = [], { type, name }) => {
    switch (type) {
        case actionTypes.ADD_PLAYER:
            return state.includes(name) ? state : [...state, name];
        case actionTypes.REMOVE_PLAYER:
            return state.filter(player => player !== name);
        default:
            return state;
    }
};

export default playersReducer;
