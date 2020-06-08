import reducer from './buzzedReducer.js';
import { buzz, clearBuzzer, removePlayer } from '../actions/actions.js';

test('can buzz in from normal state', () => {
    expect(reducer(null, buzz(null, 'dan'), ['dan', 'wes'])).toStrictEqual('dan');
});

test('cannot buzz if already buzzed', () => {
    expect(reducer('dan', buzz(null, 'wes'), ['dan', 'wes'])).toStrictEqual('dan');
});

test('cannot buzz if not in players', () => {
    expect(reducer(null, buzz(null, 'celestine'), ['dan', 'wes'])).toStrictEqual(null);
})

test('can clear buzzer', () => {
    expect(reducer('dan', clearBuzzer(null), ['dan', 'wes'])).toStrictEqual(null);
});

test('removing buzzed player removes buzz', () => {
    expect(reducer('katie', removePlayer(null, null, 'katie'))).toStrictEqual(null);
});
