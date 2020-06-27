import reducer from './questionsReducer.js';
import { addQuestion, removeQuestion } from '../actions/actions.js';

test('adds to an initial empty state', () => {
    const state = [];
    const action = addQuestion(null, null, 'subject', 'text');
    const expected = [{ subject: 'subject', text: 'text' }];

    expect(reducer(state, action)).toStrictEqual(expected);
});

test('adds to the end if no index given', () => {
    const state = [{ subject: 'subject1', text: 'text1' }];
    const action = addQuestion(null, null, 'subject2', 'text2');
    const expected = [
        { subject: 'subject1', text: 'text1' },
        { subject: 'subject2', text: 'text2' }
    ];

    expect(reducer(state, action)).toStrictEqual(expected);
});

test('inserts in middle if index given', () => {
    const state = [
        { subject: 'subject1', text: 'text1' },
        { subject: 'subject2', text: 'text2' }
    ];
    const action = addQuestion(null, null, 'subject1.5', 'text1.5', 1);
    const expected = [
        { subject: 'subject1', text: 'text1' },
        { subject: 'subject1.5', text: 'text1.5' },
        { subject: 'subject2', text: 'text2' }
    ];

    expect(reducer(state, action)).toStrictEqual(expected);
});

test('inserts at end if index below zero', () => {
    const state = [{ subject: 'subject1', text: 'text1' }];
    const action = addQuestion(null, null, 'subjectNeg1', 'textNeg1', -1);
    const expected = [
        { subject: 'subject1', text: 'text1' },
        { subject: 'subjectNeg1', text: 'textNeg1' }
    ];

    expect(reducer(state, action)).toStrictEqual(expected);
});

test('removes if index given', () => {
    const state = [
        { subject: 'subject1', text: 'text1' },
        { subject: 'subject2', text: 'text2' }
    ];
    const action = removeQuestion(null, null, 1);
    const expected = [{ subject: 'subject1', text: 'text1' }];
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('removes nothing if idx below zero', () => {
    const state = [
        { subject: 'subject1', text: 'text1' },
        { subject: 'subject2', text: 'text2' }
    ];
    const action = removeQuestion(null, null, -1);
    const expected = state;
    expect(reducer(state, action)).toStrictEqual(expected);
});

test('removes nothing if idx out of bounds', () => {
    const state = [
        { subject: 'subject1', text: 'text1' },
        { subject: 'subject2', text: 'text2' }
    ];
    const action = removeQuestion(null, null, 5);
    const expected = state;
});
