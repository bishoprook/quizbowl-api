import reducer from './showingReducer.js';
import { showQuestion } from '../actions/actions.js';

const questions = [
    { subject: 'subject1', text: 'text1' },
    { subject: 'subject2', text: 'text2' },
    { subject: 'subject3', text: 'text3' }
];

test('sets showing based on input', () => {
    expect(reducer(null, showQuestion(null, null, 1, true), questions)).toStrictEqual([1, true]);
});

test('does not set index above bounds', () => {
    expect(reducer([2, false], showQuestion(null, null, 5, true), questions)).toStrictEqual([2, false]);
});

test('does not set index below bounds', () => {
    expect(reducer([2, false], showQuestion(null, null, -1, true), questions)).toStrictEqual([2, false]);
});

test('allows setting index to null, forces reveal to false', () => {
    expect(reducer([2, true], showQuestion(null, null, null, true), questions)).toStrictEqual([null, false]);
});