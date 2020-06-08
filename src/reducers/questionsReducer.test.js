import reducer from './questionsReducer.js';
import { addQuestion } from '../actions/actions.js';

test('adds to an initial empty state', () => {
    const state = [];
    const action = addQuestion(null, null, 'questionText');
    const expected = [{ text: 'questionText' }];

    expect(reducer(state, action)).toStrictEqual(expected);
});

test('adds to the end if no index given', () => {
    const state = [{ text: 'question1' }];
    const action = addQuestion(null, null, 'question2');
    const expected = [{ text: 'question1' }, { text: 'question2' }];

    expect(reducer(state, action)).toStrictEqual(expected);
});

test('inserts in middle if index given', () => {
    const state = [{ text: 'question1' }, { text: 'question2' }];
    const action = addQuestion(null, null, 'question1.5', 1);
    const expected = [{ text: 'question1' }, { text: 'question1.5' }, { text: 'question2' }];

    expect(reducer(state, action)).toStrictEqual(expected);
});

test('inserts at end if index below zero', () => {
    const state = [{ text: 'question1' }];
    const action = addQuestion(null, null, 'questionNeg1', -1);
    const expected = [{ text: 'question1' }, { text: 'questionNeg1' }];

    expect(reducer(state, action)).toStrictEqual(expected);
});
