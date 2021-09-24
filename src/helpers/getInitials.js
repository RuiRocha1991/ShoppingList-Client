export default (name = '') => {
    const key = name
    .replace(/\s+/, ' ')
    .split(' ')

    if(key.length > 1) {
        return key.map(v => v && v[0].toUpperCase()).join('');
    } else if(key.length === 1) {
        return key[0].slice(0,2).toLocaleUpperCase();
    }
    return '';
}
