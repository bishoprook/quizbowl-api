import ws from 'ws';

import mapValues from './util/mapValues.js';
import filterValues from './util/filterValues.js';
import redact from './util/redact.js';

const realtime = ({ server, store }) => {
    // Realtime API
    const wss = new ws.Server({ server: server });

    wss.on('connection', (socket, req) => {
        socket.room = req.url.slice(1);
        console.log('Someone listening for ', socket.room);
        socket.on('message', payload => {
            if (payload === '__ping__') {
                socket.send('__pong__');
                return;
            }

            const action = JSON.parse(payload);
            console.log('Got action: ', action);
            try {
                store.dispatch(action);
            }
            catch (err) {
                // Send the error to the offending client?
                console.error(err);
            }
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
