const fs = require('fs-then-native');
const faketml = fs.readFileSync('./test/data/index.html', 'utf8');
const urlHelper = require('../lib/urlhelper');

describe('URL Helper', () => {

    it('should extract links', () => {
        expect(urlHelper.getLinks(faketml).length).toBe(9);
    });

    it('should properly check urls', () => {
        const baseUrl = 'https://www.philpalmieri.me';
        const seedLinks = [
            { url: '/foobar.js', expected: false },
            { url: '/foobar', expected: `${baseUrl}/foobar` },
            { url: '/foobar/baz', expected: `${baseUrl}/foobar/baz` },
            { url: '/#', expected: false },
            { url: '#', expected: false },
            { url: 'home', expected: `${baseUrl}/home` },
            { url: 'https://google.com/foo', expected: false },
            { url: '/foobar/baz/bug.gif', expected: false },
            { url: '/foobar/baz/bug', expected: `${baseUrl}/foobar/baz/bug` }
        ];

        seedLinks.forEach((test) => {
            expect(urlHelper.cleanUrl(test.url, baseUrl)).toBe(test.expected);
        });
    });

});