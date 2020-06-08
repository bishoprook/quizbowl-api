import reducer from './playersReducer.js';
import { addPlayer, removePlayer } from '../actions/actions.js';

test('adds new player to empty room', () => {
    expect(reducer([], addPlayer(null, 'dan'))).toStrictEqual(['dan']);
});

test('adds new player to end of existing room', () => {
    expect(reducer(['katie'], addPlayer(null, 'dan'))).toStrictEqual(['katie', 'dan']);
});

test('does not add already existing player', () => {
    expect(reducer(['katie', 'dan'], addPlayer(null, 'katie'))).toStrictEqual(['katie', 'dan']);
});

test('remove player that is not there is no op', () => {
    expect(reducer(['katie'], removePlayer(null, null, 'dan'))).toStrictEqual(['katie']);
});

test('removes player that is there', () => {
    expect(reducer(['katie', 'dan'], removePlayer(null, null, 'dan'))).toStrictEqual(['katie']);
});
