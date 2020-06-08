import redux from 'redux';
import lobbyReducer from './reducers/lobbyReducer.js';

import checkRoomId from './middleware/checkRoomId.js';
import checkPasscode from './middleware/checkPasscode.js';

import rest from './rest.js';
import realtime from './realtime.js';

const store = redux.createStore(lobbyReducer, {}, redux.applyMiddleware(checkRoomId, checkPasscode));

rest({ store });
realtime({ store });
