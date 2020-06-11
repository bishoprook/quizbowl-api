import { actionTypes } from '../actions/actions.js';

const questionsReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_QUESTION:
            const { subject, pages, index } = action;

            return index == null || index < 0 || index >= state.length ?
                [...state, { subject, pages }] :
                [...state.slice(0, index), { subject, pages }, ...state.slice(index)];
        default:
            return state;
    }
};

export default questionsReducer;
