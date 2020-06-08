import { actionTypes } from '../actions/actions.js';
import roomReducer from './roomReducer.js';
import mapValues from '../util/mapValues.js';

const lobbyReducer = (state = {}, action) => {
    const { room: roomId, passcode } = action;
    switch (action.type) {
        case actionTypes.CREATE:
            return { [roomId]: roomReducer({ id: roomId, passcode }, action), ...state };
        default:
            return mapValues(state, room => roomReducer(room, action));
    }
}

export default lobbyReducer;
