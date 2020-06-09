import redux from 'redux';
import lobbyReducer from './reducers/lobbyReducer.js';

import appendAction from './middleware/appendAction.js';
import checkRoomId from './middleware/checkRoomId.js';
import checkPasscode from './middleware/checkPasscode.js';

import rest from './rest.js';
import realtime from './realtime.js';

import Firestore from '@google-cloud/firestore';

import process from 'process';
const { PORT, GOOGLE_APPLICATION_CREDENTIALS } = process.env;

console.log(`Reading Firebase credentials from ${GOOGLE_APPLICATION_CREDENTIALS}`);
const db = new Firestore({ projectId: 'quizbowl-api' });

const store = redux.createStore(lobbyReducer, {}, redux.applyMiddleware(checkRoomId, checkPasscode, appendAction(db)));

// Rehydrate existing actions
db.collection('actions').orderBy('time').get()
    .then(snapshot => {
        if (!snapshot.empty) {
            snapshot.forEach(action => {
                console.log(`Rehydrating action: ${JSON.stringify(action.data(), null, 2)}`);
                store.dispatch(action.data());
            });
        }
    })
    .catch(err => {
        console.error('Error getting actions', err);
    });

const server = rest({ port: PORT, store });
realtime({ server, store });
