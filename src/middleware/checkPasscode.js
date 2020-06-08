import ApiError from '../errors/ApiError.js';

import { needsRoomPermission } from '../actions/actions.js';

const checkPasscode = ({ getState }) => next => action => {
    const { type, passcode, room: roomId } = action;

    if (needsRoomPermission.has(type)) {
        if (getState()[roomId].passcode !== passcode) {
            throw new ApiError(403, `Incorrect passcode for room ${roomId}`);
        }
    }

    next(action);
}

export default checkPasscode;
