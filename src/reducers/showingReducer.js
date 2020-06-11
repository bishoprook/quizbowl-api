import { actionTypes } from '../actions/actions.js';

const showingReducer = (state = null, { type, index, page }, questions = []) => {
    switch (type) {
        case actionTypes.SHOW_QUESTION:
            // Always reset page to null when index is set to null
            if (index == null) {
                return [null, null];
            }

            // Bounds checks
            if (index < 0 || index > questions.length || page < 0 || page > questions[index].pages.length) {
                return state;
            }

            return [index, page];
            
        default:
            return state;
    }
};

export default showingReducer;
