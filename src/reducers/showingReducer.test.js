import reducer from './showingReducer.js';
import { showQuestion } from '../actions/actions.js';

const questions = [
    { text: 'question1' },
    { text: 'question2' },
    { text: 'question3' }
];

test('sets showing based on input', () => {
    expect(reducer(null, showQuestion(null, null, 1), questions)).toStrictEqual(1);
});

test('does not set showing above bounds', () => {
    expect(reducer(2, showQuestion(null, null, 5), questions)).toStrictEqual(2);
});

test('does not set showing below bounds', () => {
    expect(reducer(2, showQuestion(null, null, -1), questions)).toStrictEqual(2);
});
