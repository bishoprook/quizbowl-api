import filterValues from './filterValues.js';

const redact = room => filterValues(room, (_, key) => !['passcode'].includes(key));

export default redact;