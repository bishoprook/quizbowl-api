import { actionTypes } from '../actions/actions.js';

const showingReducer = (state = null, action, questions = []) => {
    switch (action.type) {
        case actionTypes.SHOW_QUESTION:
            const { index } = action;
            return index >= 0 && questions.length > index ? index : state;
        default:
            return state;
    }
};

export default showingReducer;
