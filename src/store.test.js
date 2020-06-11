import { createStore } from 'redux';
import lobbyReducer from './reducers/lobbyReducer.js';

import * as actions from './actions/actions.js';
import redact from './util/redact.js';

test('starts with empty state', () => {
    const store = createStore(lobbyReducer);
    expect(store.getState()).toStrictEqual({});
});

test('action sequence', () => {
    const store = createStore(lobbyReducer);

    const actionSequence = [
        actions.create('BOBA', 'pass'),
        actions.addQuestion('BOBA', 'pass', 'Ren & Stimpy', [
            'what rolls down stairs',
            'alone or in pairs',
            'rolls over your neighbor`s dog'
        ]),
        actions.showQuestion('BOBA', 'pass', 0, 0),
        actions.addPlayer('BOBA', 'katie'),
        actions.addQuestion('BOBA', 'pass', 'Brooklyn 99', [
            'I`ve only had Arlo for a day and a half',
            'but if anything happened to him',
            'I would kill everyone in this room and then myself'
        ]),
        actions.showQuestion('BOBA', 'pass', 1, null),
        actions.addPlayer('BOBA', 'dan'),
        actions.buzz('BOBA', 'katie'),
        actions.buzz('BOBA', 'dan'),
        actions.addPoints('BOBA', 'pass', 'dan', 3)
    ];
    
    actionSequence.forEach(a => store.dispatch(a));

    const expected = {
        BOBA: {
            id: 'BOBA',
            passcode: 'pass',
            players: ['katie', 'dan'],
            buzzed: 'katie',
            scores: { katie: 0, dan: 3 },
            questions: [
                { subject: 'Ren & Stimpy', pages: [
                    'what rolls down stairs',
                    'alone or in pairs',
                    'rolls over your neighbor`s dog'
                ]},
                { subject: 'Brooklyn 99', pages: [
                    'I`ve only had Arlo for a day and a half',
                    'but if anything happened to him',
                    'I would kill everyone in this room and then myself'
                ]}
            ],
            showing: [1, null],
            lastAction: redact(actionSequence[actionSequence.length - 1])
        }
    };

    expect(store.getState()).toStrictEqual(expected);
});
