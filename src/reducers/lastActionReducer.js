import redact from '../util/redact.js';

const lastActionReducer = (_, action) => {
    return redact(action);
};

export default lastActionReducer;