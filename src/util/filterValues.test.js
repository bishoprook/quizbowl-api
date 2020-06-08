import filterValues from './filterValues.js';

test('filters matching values', () => {
    const input = { a: 1, b: 2, c: 3 };
    const predicate = v => v % 2 === 0;
    const expected = { b: 2 };

    expect(filterValues(input, predicate)).toStrictEqual(expected);
});
