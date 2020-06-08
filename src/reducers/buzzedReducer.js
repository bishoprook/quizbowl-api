import { actionTypes } from '../actions/actions.js';

const buzzedReducer = (state = null, { type, name }, players = []) => {
    switch (type) {
        case actionTypes.BUZZ:
            return state == null && players.includes(name) ? name : state;
        case actionTypes.CLEAR_BUZZER:
            return null;
        case actionTypes.REMOVE_PLAYER:
            return state === name ? null : state;
        default:
            return state;
    }
};

export default buzzedReducer;
