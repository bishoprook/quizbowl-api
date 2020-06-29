import reducer from './buzzedReducer.js';
import { buzz, nextBuzzer, clearBuzzer, removePlayer } from '../actions/actions.js';

test('can buzz in from normal state', () => {
    const state = [];
    const action = buzz(null, 'dan');
    const players = { dan: 'redTeam' };
    const expected = [['redTeam', 'dan']];
    expect(reducer(state, action, players)).toStrictEqual(expected);
});

test('can buzz in after someone else', () => {
    const state = [['redTeam', 'dan']];
    const action = buzz(null, 'wes');
    const players = { dan: 'redTeam', wes: 'goldTeam' };
    const expected = [['redTeam', 'dan'], ['goldTeam', 'wes']];
    expect(reducer(state, action, players)).toStrictEqual(expected);
});

test('cannot buzz if teammate already buzzed', () => {
    const state = [['redTeam', 'dan']];
    const action = buzz(null, 'thandor');
    const players = { dan: 'redTeam', wes: 'goldTeam', thandor: 'redTeam' };
    const expected = state;
    expect(reducer(state, action, players)).toStrictEqual(expected);
});

test('cannot buzz if not in players', () => {
    const state = [['redTeam', 'dan']];
    const action = buzz(null, 'thandor');
    const players = { dan: 'redTeam', wes: 'goldTeam' };
    const expected = state;
    expect(reducer(state, action, players)).toStrictEqual(expected);
});

test('can go to next buzzer', () => {
    const state = [['redTeam', 'dan'], ['goldTeam', 'wes']];
    const action = nextBuzzer(null, null);
    const players = { dan: 'redTeam', wes: 'goldTeam' };
    const expected = [['goldTeam', 'wes']];
    expect(reducer(state, action, players)).toStrictEqual(expected);
});

test('can clear buzzer', () => {
    const state = [['redTeam', 'dan']];
    const action = clearBuzzer(null, null);
    const players = { dan: 'redTeam', wes: 'goldTeam' };
    const expected = [];
    expect(reducer(state, action, players)).toStrictEqual(expected);
});

test('removing buzzed player removes buzz', () => {
    const state = [['redTeam', 'dan'], ['goldTeam', 'wes']];
    const action = removePlayer(null, null, 'dan');
    const players = { dan: 'redTeam', wes: 'goldTeam' };
    const expected = [['goldTeam', 'wes']];
    expect(reducer(state, action, players)).toStrictEqual(expected);
});
