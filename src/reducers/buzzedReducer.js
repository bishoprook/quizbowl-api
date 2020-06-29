import { actionTypes } from '../actions/actions.js';

const buzzedReducer = (state = [], { type, name }, players = {}) => {
    switch (type) {
        case actionTypes.BUZZ:
            return eligible(state, name, players) ? [...state, [players[name], name]] : state;
        case actionTypes.NEXT_BUZZER:
            return state.slice(1);
        case actionTypes.CLEAR_BUZZER:
            return [];
        case actionTypes.REMOVE_PLAYER:
            return state.filter(([_, player]) => player !== name);
        default:
            return state;
    }
};

const eligible = (state = [], name, players) => (
    // Eligible to buzz in if they are a real player...
    players.hasOwnProperty(name) &&
        // ...and nobody from their team is currently buzzed in.
        state.filter(([team, _]) => team === players[name]).length === 0
);

export default buzzedReducer;
