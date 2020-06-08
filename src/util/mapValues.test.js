import mapValues from './mapValues.js';

test('maps values', () => {
    expect(mapValues({ a: 1, b: 2 }, n => n * 2)).toStrictEqual({ a: 2, b: 4 });
});

test('does not touch original', () => {
    const input = { a: 1, b: 2 };
    mapValues(input, n => n * 2);
    expect(input).toStrictEqual({ a: 1, b: 2 });
});

test('maps with key', () => {
    const input = { a: 1, b: 2 };
    const mapper = (value, key) => [value, key];
    const output = { a: [1, 'a'], b: [2, 'b'] };
    expect(mapValues(input, mapper)).toStrictEqual(output);
});
