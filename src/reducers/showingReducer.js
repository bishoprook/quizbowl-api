import { actionTypes } from '../actions/actions.js';

const showingReducer = (state = [null, false], { type, index, reveal = false }, questions = []) => {
    switch (type) {
        case actionTypes.SHOW_QUESTION:
            // Always reset reveal to false when index is set to null
            if (index == null) {
                return [null, false];
            }

            // Bounds checks
            if (index < 0 || index > questions.length) {
                return state;
            }

            return [index, reveal];
            
        default:
            return state;
    }
};

export default showingReducer;
