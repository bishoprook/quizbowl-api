import reducer from './scoresReducer.js';
import { addPlayer, removePlayer, addPoints, removePoints, setScore } from '../actions/actions.js';

test('tracks newly added players', () => {
    expect(reducer({}, addPlayer(null, 'dan'))).toStrictEqual({ dan: 0 });
});

test('does not overwrite score for re-added player', () => {
    expect(reducer({ dan: 10 }, addPlayer(null, 'dan'))).toStrictEqual({ dan: 10 });
});

test('adds 1 point to player by default', () => {
    expect(reducer({ dan: 3, wes: 5 }, addPoints(null, null, 'wes'))).toStrictEqual({ dan: 3, wes: 6 });
});

test('adds 5 points to player', () => {
    expect(reducer({ dan: 3, wes: 5 }, addPoints(null, null, 'wes', 5))).toStrictEqual({ dan: 3, wes: 10 });
});

test('does not add points for nonexistent player', () => {
    expect(reducer({ dan: 3, wes: 5 }, addPoints(null, null, 'thandor', 10))).toStrictEqual({ dan: 3, wes: 5 });
});

test('removes 1 point by default', () => {
    expect(reducer({ dan: 3, wes: 5 }, removePoints(null, null, 'wes'))).toStrictEqual({ dan: 3, wes: 4 });
});

test('removes 5 points from player', () => {
    expect(reducer({ dan: 3, wes: 10 }, removePoints(null, null, 'wes', 5))).toStrictEqual({ dan: 3, wes: 5 });
});

test('does not remove points for nonexistent player', () => {
    expect(reducer({ dan: 3, wes: 5 }, removePoints(null, null, 'thandor', 10))).toStrictEqual({ dan: 3, wes: 5 });
});

test('sets player score', () => {
    expect(reducer({ dan: 3, wes: 5 }, setScore(null, null, 'dan', 7))).toStrictEqual({ dan: 7, wes: 5 });
});

test('does not set score for nonexistent player', () => {
    expect(reducer({ dan: 3, wes: 5 }, setScore(null, null, 'thandor', 3))).toStrictEqual({ dan: 3, wes: 5 });
});

test('removes existing player from scores', () => {
    expect(reducer({ dan: 3, wes: 5 }, removePlayer(null, null, 'dan'))).toStrictEqual({ wes: 5 });
});

test('remove is a no op if non existent', () => {
    expect(reducer({ dan: 5 }, removePlayer(null, null, 'wes'))).toStrictEqual({ dan: 5 });
});
