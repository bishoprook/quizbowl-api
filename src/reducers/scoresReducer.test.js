import reducer from './scoresReducer.js';
import { addPlayer, addPoints, removePoints, setScore } from '../actions/actions.js';

test('tracks newly added teams', () => {
    expect(reducer({}, addPlayer(null, 'dan', 'redTeam'))).toStrictEqual({ redTeam: 0 });
});

test('does not overwrite score for re-added team', () => {
    expect(reducer({ redTeam: 10 }, addPlayer(null, 'dan', 'redTeam'))).toStrictEqual({ redTeam: 10 });
});

test('adds 1 point to team by default', () => {
    expect(reducer({ redTeam: 3, goldTeam: 5 }, addPoints(null, null, 'goldTeam'))).toStrictEqual({ redTeam: 3, goldTeam: 6 });
});

test('adds 5 points to team', () => {
    expect(reducer({ redTeam: 3, goldTeam: 5 }, addPoints(null, null, 'goldTeam', 5))).toStrictEqual({ redTeam: 3, goldTeam: 10 });
});

test('does not add points for nonexistent team', () => {
    expect(reducer({ redTeam: 3, goldTeam: 5 }, addPoints(null, null, 'blueTeam', 10))).toStrictEqual({ redTeam: 3, goldTeam: 5 });
});

test('removes 1 point by default', () => {
    expect(reducer({ redTeam: 3, goldTeam: 5 }, removePoints(null, null, 'goldTeam'))).toStrictEqual({ redTeam: 3, goldTeam: 4 });
});

test('removes 5 points from team', () => {
    expect(reducer({ redTeam: 3, goldTeam: 10 }, removePoints(null, null, 'goldTeam', 5))).toStrictEqual({ redTeam: 3, goldTeam: 5 });
});

test('does not remove points for nonexistent team', () => {
    expect(reducer({ redTeam: 3, goldTeam: 5 }, removePoints(null, null, 'blueTeam', 10))).toStrictEqual({ redTeam: 3, goldTeam: 5 });
});

test('sets team score', () => {
    expect(reducer({ redTeam: 3, goldTeam: 5 }, setScore(null, null, 'redTeam', 7))).toStrictEqual({ redTeam: 7, goldTeam: 5 });
});

test('does not set score for nonexistent team', () => {
    expect(reducer({ redTeam: 3, goldTeam: 5 }, setScore(null, null, 'blueTeam', 3))).toStrictEqual({ redTeam: 3, goldTeam: 5 });
});