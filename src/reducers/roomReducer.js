import playersReducer from './playersReducer.js';
import buzzedReducer from './buzzedReducer.js';
import scoresReducer from './scoresReducer.js';
import questionsReducer from './questionsReducer.js';
import showingReducer from './showingReducer.js';
import lastActionReducer from './lastActionReducer.js';
import { needsRoomPermission } from '../actions/actions.js';

const roomReducer = (state, action) => {
    if (state.id !== action.room) {
        return state;
    }

    if (needsRoomPermission.has(action.type) && action.passcode !== state.passcode) {
        return state;
    }

    return {
        id: state.id,
        passcode: state.passcode,
        players: playersReducer(state.players, action),
        buzzed: buzzedReducer(state.buzzed, action, state.players),
        scores: scoresReducer(state.scores, action),
        questions: questionsReducer(state.questions, action),
        showing: showingReducer(state.showing, action, state.questions),
        lastAction: lastActionReducer(state.lastAction, action)
    };
};

export default roomReducer;
