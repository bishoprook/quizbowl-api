import filterValues from './filterValues.js';

test('filters matching values', () => {
    const input = { a: 1, b: 2, c: 3 };
    const predicate = v => v % 2 === 0;
    const expected = { b: 2 };

    expect(filterValues(input, predicate)).toStrictEqual(expected);
});

test('filters based on key', () => {
    const input = { a: 1, b: 2, c: 3 };
    const predicate = (_, k) => k !== 'b';
    const expected = { a: 1, c: 3 };

    expect(filterValues(input, predicate)).toStrictEqual(expected);
});