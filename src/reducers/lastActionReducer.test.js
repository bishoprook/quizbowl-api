import reducer from './lastActionReducer.js';
import * as actions from '../actions/actions.js';

test('Sets to last action when state is empty', () => {
    const action = actions.addPlayer('room', 'name');
    expect(reducer(null, action)).toStrictEqual(action);
});

test('Overwrites last action on update', () => {
    const oldAction = actions.addPlayer('room', 'name');
    const newAction = actions.clearBuzzer('room', 'passcode');
    expect(reducer(oldAction, newAction)).toStrictEqual(newAction);
});