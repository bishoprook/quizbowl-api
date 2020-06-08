import ApiError from '../errors/ApiError.js';

import { validWithoutExistingRoom } from '../actions/actions.js';

const checkRoomId = ({ getState }) => next => action => {
    if (action == null) {
        throw new ApiError(400, 'Must provide an action');
    }

    const { type, room } = action;

    if (room == null) {
        throw new ApiError(400, 'Must provide a room ID');
    }

    if (!validWithoutExistingRoom.has(type) && getState()[room] == null) {
        throw new ApiError(404, `Room ${room} does not exist`);
    }

    next(action);
}

export default checkRoomId;
