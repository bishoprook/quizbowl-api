import reducer from './questionsReducer.js';
import { addQuestion } from '../actions/actions.js';

test('adds to an initial empty state', () => {
    const state = [];
    const action = addQuestion(null, null, 'subject', ['page1', 'page2']);
    const expected = [{ subject: 'subject', pages: ['page1', 'page2'] }];

    expect(reducer(state, action)).toStrictEqual(expected);
});

test('adds to the end if no index given', () => {
    const state = [{ subject: 'subject1', pages: ['page1', 'page2'] }];
    const action = addQuestion(null, null, 'subject2', ['page3', 'page4']);
    const expected = [
        { subject: 'subject1', pages: ['page1', 'page2'] },
        { subject: 'subject2', pages: ['page3', 'page4'] }
    ];

    expect(reducer(state, action)).toStrictEqual(expected);
});

test('inserts in middle if index given', () => {
    const state = [
        { subject: 'subject1', pages: ['page1'] },
        { subject: 'subject2', pages: ['page4'] }
    ];
    const action = addQuestion(null, null, 'subject1.5', ['page2', 'page3'], 1);
    const expected = [
        { subject: 'subject1', pages: ['page1'] },
        { subject: 'subject1.5', pages: ['page2', 'page3'] },
        { subject: 'subject2', pages: ['page4'] }
    ];

    expect(reducer(state, action)).toStrictEqual(expected);
});

test('inserts at end if index below zero', () => {
    const state = [{ subject: 'subject1', pages: ['page1', 'page2'] }];
    const action = addQuestion(null, null, 'subjectNeg1', ['page-1'], -1);
    const expected = [
        { subject: 'subject1', pages: ['page1', 'page2'] },
        { subject: 'subjectNeg1', pages: ['page-1'] }
    ];

    expect(reducer(state, action)).toStrictEqual(expected);
});
