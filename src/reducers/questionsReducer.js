import { actionTypes } from '../actions/actions.js';

const questionsReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_QUESTION:
            const { text, index } = action;

            return index == null || index < 0 || index >= state.length ?
                [...state, { text }] :
                [...state.slice(0, index), { text }, ...state.slice(index)];
        default:
            return state;
    }
};

export default questionsReducer;
