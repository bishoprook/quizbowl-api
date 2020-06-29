import reducer from './lobbyReducer.js';
import * as actions from '../actions/actions.js';
import redact from '../util/redact.js';

test('create adds a new empty room', () => {
    const action = actions.create('IXVY', 'password');
    expect(reducer({}, action)).toStrictEqual({
        IXVY: {
            id: 'IXVY',
            passcode: 'password',
            players: {},
            teams: {},
            buzzed: [],
            scores: {},
            questions: [],
            showing: [null, false],
            lastAction: redact(action)
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
            players: {},
            teams: {},
            buzzed: [],
            scores: {},
            questions: [],
            showing: [null, false]
        }
    }

    const action = actions.addPlayer('MANA', 'celestine', 'redTeam');

    const expected = {
        MANA: {
            id: 'MANA',
            passcode: 'password',
            players: { celestine: 'redTeam' },
            teams: { redTeam: ['celestine'] },
            buzzed: [],
            scores: { redTeam: 0 },
            questions: [],
            showing: [null, false],
            lastAction: action
        }
    };

    expect(reducer(state, action)).toStrictEqual(expected);
});

test('lastAction is specific to a given room', () => {
    const state = {
        BOBA: {
            id: 'BOBA',
            passcode: 'password',
            players: {},
            teams: {},
            buzzed: [],
            scores: {},
            questions: [],
            showing: [null, false],
            lastAction: null
        },
        FETT: {
            id: 'FETT',
            passcode: 'password',
            players: {},
            teams: {},
            buzzed: [],
            scores: {},
            questions: [],
            showing: [null, false],
            lastAction: null
        }
    };

    const action = actions.addPlayer('BOBA', 'celestine', 'redTeam');
    const reduced = reducer(state, action);

    expect(reduced.BOBA.lastAction).toStrictEqual(redact(action));
    expect(reduced.FETT.lastAction).toBeNull();
});