import reducer from './buzzedReducer.js';
import { buzz, clearBuzzer, removePlayer } from '../actions/actions.js';
import { text } from 'express';

test('can buzz in from normal state', () => {
    expect(reducer([], buzz(null, 'dan'), ['dan', 'wes'])).toStrictEqual(['dan']);
});

text('can buzz in after someone else', () => {
    expect(reducer(['dan'], buzz(null, 'wes'), ['dan', 'wes'])).toStrictEqual(['dan', 'wes']);
});

test('cannot buzz if already buzzed', () => {
    expect(reducer(['wes', 'dan'], buzz(null, 'dan'), ['dan', 'wes'])).toStrictEqual(['wes', 'dan']);
});

test('cannot buzz if not in players', () => {
    expect(reducer([], buzz(null, 'celestine'), ['dan', 'wes'])).toStrictEqual([]);
})

test('can clear buzzer', () => {
    expect(reducer(['dan'], clearBuzzer(null), ['dan', 'wes'])).toStrictEqual([]);
});

test('removing buzzed player removes buzz', () => {
    expect(reducer(['dan', 'bethany'], removePlayer(null, null, 'dan'))).toStrictEqual(['bethany']);
});
