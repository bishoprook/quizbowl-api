const mapValues = (source, mapper) => {
    return Object.keys(source)
        .map(key => [key, mapper(source[key], key)])
        .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
};

export default mapValues;
