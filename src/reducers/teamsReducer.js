import { actionTypes } from '../actions/actions.js';
import mapValues from '../util/mapValues.js';

const teamsReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLAYER:
            return addPlayerReducer(state, action);
        case actionTypes.REMOVE_PLAYER:
            return removePlayerReducer(state, action);
        default:
            return state;
    }
};

const addPlayerReducer = (state = {}, { name, teamName }) => {
    // No op if this player already has a team assignment. Not allowed to switch teams.
    const teamAlreadyAssigned = Object.values(state).filter(members => members.includes(name)).length > 0;
    const members = state[teamName] || [];
    return teamAlreadyAssigned ? state : {...state, [teamName]: [...members, name] };
};

const removePlayerReducer = (state = {}, { name, teamName }) => {
    return mapValues(state, v => v.filter(m => m !== name));
};

export default teamsReducer;
