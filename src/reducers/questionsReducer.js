import { actionTypes } from '../actions/actions.js';

const questionsReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_QUESTION:
            return addQuestion(state, action);
        case actionTypes.REMOVE_QUESTION:
            return removeQuestion(state, action);
        default:
            return state;
    }
};

const removeQuestion = (state = [], { index }) => (
    index == null || index < 0 || index >= state.length ?
        state :
        [...state.slice(0, index), ...state.slice(index + 1)]
);

const addQuestion = (state = [], { subject, text, index }) => (
    index == null || index < 0 || index >= state.length ?
        [...state, { subject, text }] :
        [...state.slice(0, index), { subject, text }, ...state.slice(index)]
);

export default questionsReducer;
