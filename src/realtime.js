import http from 'http';
import ws from 'ws';

import mapValues from './util/mapValues.js';
import filterValues from './util/filterValues.js';

const realtime = ({ server, store }) => {
    // Realtime API
    const wss = new ws.Server({ server: server });

    const redact = room => filterValues(room, (v, key) => !['passcode'].includes(key));

    wss.on('connection', (socket, req) => {
        socket.room = req.url.slice(1);
        console.log('Someone listening for ', socket.room);
        socket.on('message', payload => {
            const action = JSON.parse(payload);
            console.log('Got action: ', action);
            store.dispatch(action);
        });
        // Send initial state
        const state = store.getState();
        if (state.hasOwnProperty(socket.room)) {
            socket.send(JSON.stringify(redact(state[socket.room])));
        }
    });

    let prevState = {};
    store.subscribe(() => {
        const state = store.getState();
        const changed = filterValues(state, (newState, key) => prevState[key] !== newState);
        const updates = mapValues(changed, s => JSON.stringify(redact(s)));
        prevState = state;
        wss.clients.forEach(socket => {
            if (updates.hasOwnProperty(socket.room)) {
                socket.send(updates[socket.room]);
            }
        });
    });

    /*server.on('upgrade', (req, socket, head) => {
        wss.handleUpgrade(req, socket, head, upgraded => {
            wss.emit('connection', upgraded, req);
        });
    });*/

    console.log(`Realtime API listening`);
}

export default realtime;
