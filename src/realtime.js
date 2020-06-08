import http from 'http';
import ws from 'ws';

import mapValues from './util/mapValues.js';
import filterValues from './util/filterValues.js';

const realtime = ({ store, host = '0.0.0.0', port = '8081' }) => {
    // Realtime API
    const rt = http.createServer();
    const wss = new ws.Server({ server: rt });

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

    rt.listen(port, host);
    console.log(`Realtime API listening on ws://${host}:${port}`);
}

export default realtime;
