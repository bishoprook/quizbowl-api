import reducer from './showingReducer.js';
import { showQuestion } from '../actions/actions.js';

const questions = [
    { subject: 'subject1', pages: ['page1'] },
    { subject: 'subject2', pages: ['page1', 'page2'] },
    { subject: 'subject3', pages: ['page1', 'page2', 'page3'] }
];

test('sets showing based on input', () => {
    expect(reducer(null, showQuestion(null, null, 1, 0), questions)).toStrictEqual([1, 0]);
});

test('does not set index above bounds', () => {
    expect(reducer([2, 1], showQuestion(null, null, 5, 0), questions)).toStrictEqual([2, 1]);
});

test('does not set index below bounds', () => {
    expect(reducer([2, 1], showQuestion(null, null, -1, 0), questions)).toStrictEqual([2, 1]);
});

test('does not set page above bounds', () => {
    expect(reducer([2, 1], showQuestion(null, null, 1, 4), questions)).toStrictEqual([2, 1]);
});

test('does not set page below bounds', () => {
    expect(reducer([2, 1], showQuestion(null, null, 1, -1), questions)).toStrictEqual([2, 1]);
});

test('allows setting page to null', () => {
    expect(reducer([2, 1], showQuestion(null, null, 1, null), questions)).toStrictEqual([1, null]);
});

test('allows setting index to null', () => {
    expect(reducer([2, 1], showQuestion(null, null, null, null), questions)).toStrictEqual([null, null]);
});

test('forces page to null if index is null', () => {
    expect(reducer([2, 1], showQuestion(null, null, null, 2), questions)).toStrictEqual([null, null]);
});