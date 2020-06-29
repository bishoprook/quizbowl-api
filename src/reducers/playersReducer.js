import { actionTypes } from '../actions/actions.js';
import filterValues from '../util/filterValues.js';

const playersReducer = (state = {}, { type, name, teamName }) => {
    switch (type) {
        case actionTypes.ADD_PLAYER:
            return state.hasOwnProperty(name) ? state : { ...state, [name]: teamName };
        case actionTypes.REMOVE_PLAYER:
            return filterValues(state, (_, member) => member !== name);
        default:
            return state;
    }
};

export default playersReducer;
