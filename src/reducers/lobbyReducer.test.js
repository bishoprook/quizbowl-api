import reducer from './lobbyReducer.js';
import * as actions from '../actions/actions.js';

test('create adds a new empty room', () => {
    expect(reducer({}, actions.create('IXVY', 'password'))).toStrictEqual({
        IXVY: {
            id: 'IXVY',
            passcode: 'password',
            players: [],
            buzzed: null,
            scores: {},
            questions: [],
            showing: null
        }
    });
});

test('addPlayer on nonexistent room does nothing', () => {
    expect(reducer({}, actions.addPlayer('AMMO', 'sean'))).toStrictEqual({});
});

test('addPlayer on a real room adds player', () => {
    const state = {
        MANA: {
            id: 'MANA',
            passcode: 'password',
            players: [],
            buzzed: null,
            scores: {},
            questions: [],
            showing: null
        }
    }

    const action = actions.addPlayer('MANA', 'celestine');

    const expected = {
        MANA: {
            id: 'MANA',
            passcode: 'password',
            players: ['celestine'],
            buzzed: null,
            scores: { celestine: 0 },
            questions: [],
            showing: null
        }
    };

    expect(reducer(state, action)).toStrictEqual(expected);
});
