import redux from 'redux';
import lobbyReducer from './reducers/lobbyReducer.js';

import checkRoomId from './middleware/checkRoomId.js';
import checkPasscode from './middleware/checkPasscode.js';

import rest from './rest.js';
import realtime from './realtime.js';

import process from 'process';
const { PORT } = process.env;

const store = redux.createStore(lobbyReducer, {}, redux.applyMiddleware(checkRoomId, checkPasscode));

const server = rest({ port: PORT, store });
realtime({ server, store });
