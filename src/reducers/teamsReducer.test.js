import reducer from './teamsReducer.js';
import { addPlayer, removePlayer } from '../actions/actions.js';

test('adds new team to empty room', () => {
    const state = {};
    const action = addPlayer(null, 'dan', 'redTeam');
    const expected = { redTeam: ['dan'] };
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('adds new team to end of existing room', () => {
    const state = { redTeam: ['dan'] };
    const action = addPlayer(null, 'wes', 'goldTeam');
    const expected = { redTeam: ['dan'], goldTeam: ['wes'] };
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('adds member to already existing team', () => {
    const state = { redTeam: ['dan'], goldTeam: ['wes'] };
    const action = addPlayer(null, 'thandor', 'goldTeam');
    const expected = { redTeam: ['dan'], goldTeam: ['wes', 'thandor'] };
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('does not add existing member to existing team', () => {
    const state = { redTeam: ['dan'], goldTeam: ['wes'] };
    const action = addPlayer(null, 'wes', 'goldTeam');
    const expected = { redTeam: ['dan'], goldTeam: ['wes'] };
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('does not allow team switching', () => {
    const state = { redTeam: ['dan'], goldTeam: ['wes'] };
    const action = addPlayer(null, 'wes', 'redTeam');
    const expected = { redTeam: ['dan'], goldTeam: ['wes'] };
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('remove player from team', () => {
    const state = { redTeam: ['dan'], goldTeam: ['wes'] };
    const action = removePlayer(null, null, 'wes');
    const expected = { redTeam: ['dan'], goldTeam: [] };
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('remove nonexistent player is no op', () => {
    const state = { redTeam: ['dan'], goldTeam: ['wes'] };
    const action = removePlayer(null, null, 'thandor');
    const expected = { redTeam: ['dan'], goldTeam: ['wes'] };
    expect(reducer(state, action)).toStrictEqual(expected);
});