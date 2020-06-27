import reducer from './roomReducer.js';
import * as actions from '../actions/actions.js';

test('add player to empty room', () => {
    const state = { id: 'BAZZ', passcode: 'pass' };
    const action = actions.addPlayer('BAZZ', 'celestine');
    const expected = {
        id: 'BAZZ',
        passcode: 'pass',
        players: ['celestine'],
        buzzed: [],
        scores: { celestine: 0 },
        questions: [],
        showing: [null, false],
        lastAction: action
    };
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('add player with wrong ID is no-op', () => {
    const state = { id: 'BAZZ', passcode: 'pass' };
    expect(reducer(state, actions.addPlayer('FLIM', 'celestine'))).toStrictEqual(state);
});
