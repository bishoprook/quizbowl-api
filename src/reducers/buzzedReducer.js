import { actionTypes } from '../actions/actions.js';

const buzzedReducer = (state = [], { type, name }, players = []) => {
    switch (type) {
        case actionTypes.BUZZ:
            return !state.includes(name) && players.includes(name) ? [...state, name] : state;
        case actionTypes.NEXT_BUZZER:
            return [];
        case actionTypes.CLEAR_BUZZER:
            return [];
        case actionTypes.REMOVE_PLAYER:
            return state.filter(n => n !== name);
        default:
            return state;
    }
};

export default buzzedReducer;
