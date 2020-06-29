export const actionTypes = {
    CREATE: 'create',
    ADD_QUESTION: 'addQuestion',
    REMOVE_QUESTION: 'removeQuestion',
    SHOW_QUESTION: 'showQuestion',
    ADD_PLAYER: 'addPlayer',
    REMOVE_PLAYER: 'removePlayer',
    BUZZ: 'buzz',
    NEXT_BUZZER: 'nextBuzzer',
    CLEAR_BUZZER: 'clearBuzzer',
    ADD_POINTS: 'addPoints',
    REMOVE_POINTS: 'removePoints',
    SET_SCORE: 'setScore'
};

export const needsRoomPermission = new Set([
    actionTypes.ADD_QUESTION,
    actionTypes.REMOVE_QUESTION,
    actionTypes.SHOW_QUESTION,
    actionTypes.NEXT_BUZZER,
    actionTypes.CLEAR_BUZZER,
    actionTypes.ADD_POINTS,
    actionTypes.REMOVE_POINTS,
    actionTypes.SET_SCORE,
    actionTypes.REMOVE_PLAYER
]);

export const validWithoutExistingRoom = new Set([
    actionTypes.CREATE
]);

export function create(room, passcode) {
    return { type: actionTypes.CREATE, room, passcode };
};

export function addQuestion(room, passcode, subject, text, index = undefined) {
    return { type: actionTypes.ADD_QUESTION, room, passcode, subject, text, index };
};

export function removeQuestion(room, passcode, index) {
    return { type: actionTypes.REMOVE_QUESTION, room, passcode, index };
};

export function showQuestion(room, passcode, index, reveal) {
    return { type: actionTypes.SHOW_QUESTION, room, passcode, index, reveal };
};

export function addPlayer(room, name, teamName) {
    return { type: actionTypes.ADD_PLAYER, room, name, teamName };
};

export function removePlayer(room, passcode, name) {
    return { type: actionTypes.REMOVE_PLAYER, room, passcode, name };
}

export function buzz(room, name) {
    return { type: actionTypes.BUZZ, room, name };
};

export function nextBuzzer(room, passcode) {
    return { type: actionTypes.NEXT_BUZZER, room, passcode };
};

export function clearBuzzer(room, passcode) {
    return { type: actionTypes.CLEAR_BUZZER, room, passcode };
};

export function addPoints(room, passcode, teamName, amount = 1) {
    return { type: actionTypes.ADD_POINTS, room, passcode, teamName, amount };
};

export function removePoints(room, passcode, teamName, amount = 1) {
    return { type: actionTypes.REMOVE_POINTS, room, passcode, teamName, amount };
};

export function setScore(room, passcode, teamName, score) {
    return { type: actionTypes.SET_SCORE, room, passcode, teamName, score };
};
