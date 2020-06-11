import { createStore } from 'redux';
import lobbyReducer from './reducers/lobbyReducer.js';

import * as actions from './actions/actions.js';

test('starts with empty state', () => {
    const store = createStore(lobbyReducer);
    expect(store.getState()).toStrictEqual({});
});

test('action sequence', () => {
    const store = createStore(lobbyReducer);

    [
        actions.create('BOBA', 'pass'),
        actions.addQuestion('BOBA', 'pass', 'what rolls down stairs'),
        actions.showQuestion('BOBA', 'pass', 1),
        actions.addQuestion('BOBA', 'pass', 'rolls over your neighbors dog'),
        actions.addPlayer('BOBA', 'katie'),
        actions.addQuestion('BOBA', 'pass', 'alone or in pairs', 1),
        actions.showQuestion('BOBA', 'pass', 2),
        actions.addPlayer('BOBA', 'dan'),
        actions.buzz('BOBA', 'katie'),
        actions.buzz('BOBA', 'dan'),
        actions.addPoints('BOBA', 'pass', 'dan', 3)
    ].forEach(a => store.dispatch(a));

    const expected = {
        BOBA: {
            id: 'BOBA',
            passcode: 'pass',
            players: ['katie', 'dan'],
            buzzed: 'katie',
            scores: { katie: 0, dan: 3 },
            questions: [
                { text: 'what rolls down stairs' },
                { text: 'alone or in pairs' },
                { text: 'rolls over your neighbors dog' }
            ],
            showing: 2,
            lastAction: actions.addPoints('BOBA', 'pass', 'dan', 3)
        }
    };

    expect(store.getState()).toStrictEqual(expected);
});
