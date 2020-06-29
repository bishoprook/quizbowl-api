import reducer from './playersReducer.js';
import { addPlayer, removePlayer } from '../actions/actions.js';

test('adds new player to empty room', () => {
    const state = {};
    const action = addPlayer(null, 'dan', 'redTeam');
    const expected = { dan: 'redTeam' };
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('adds new player to existing room', () => {
    const state = { dan: 'redTeam' };
    const action = addPlayer(null, 'wes', 'goldTeam');
    const expected = { dan: 'redTeam', wes: 'goldTeam' };
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('does not add already existing player', () => {
    const state = { dan: 'redTeam', wes: 'goldTeam' };
    const action = addPlayer(null, 'wes', 'goldTeam');
    const expected = state;
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('does not allow team change', () => {
    const state = { dan: 'redTeam', wes: 'goldTeam' };
    const action = addPlayer(null, 'wes', 'redTeam');
    const expected = state;
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('remove player that is not there is no op', () => {
    const state = { dan: 'redTeam', wes: 'goldTeam' };
    const action = removePlayer(null, null, 'thandor');
    const expected = state;
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('removes player that is there', () => {
    const state = { dan: 'redTeam', wes: 'goldTeam' };
    const action = removePlayer(null, null, 'wes');
    const expected = { dan: 'redTeam' };
    expect(reducer(state, action)).toStrictEqual(expected);
});
