import express from 'express';
import filterValues from './util/filterValues.js';

import ApiError from './errors/ApiError.js';

const rest = ({ store, host = '0.0.0.0', port = '8080' }) => {
    const api = express();
    api.use(express.json());

    const redact = room => filterValues(room, (v, key) => !['passcode'].includes(key));

    // Don't need CORS setup because the client is always using the realtime API via WS

    api.post('/api/action', (req, res) => {
        const { room: roomId } = req.body;
        store.dispatch(req.body);
        res.send(redact(store.getState()[roomId]));
    });
    api.get('/api/state/:room', (req, res) => {
        const { room: roomId } = req.params;
        const room = store.getState()[roomId];
        if (room == null) {
            throw new ApiError(404, `No such room ${roomId}`);
        }
        res.send(redact(room));
    });
    api.use((err, req, res, next) => {
        if (err instanceof ApiError) {
            console.error(err.stack);
            res.status(err.statusCode).send(err.body);
        }
        else {
            next(err);
        }
    });
    const server = api.listen(port, host);

    console.log(`REST API listening on http://${host}:${port}`);

    return server;
}

export default rest;
