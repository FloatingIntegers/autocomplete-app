    const shot = require('shot');
    const tape = require('tape');

    const handler = require('../src/handler.js')


    tape('test get request to the / endpoint', t => {
        shot.inject(handler, { method: 'get', url: '/' }, (res) => {
            t.equal(res.statusCode, 200, '/ has status code of 200');
            console.log(typeof res.payload)
            t.ok(res.payload.includes('<!DOCTYPE'), 'finds index.html file');
            t.equal(res.headers['Content-type'], 'text/html', 'response type is html')
            t.end();
        });
    });

        tape(`If requesting a file we're not handling throw 404`, t => {
            shot.inject(handler, { method: 'get', url: '/jashdjashjd' }, (res) => {
                t.equal(res.statusCode, 404, '/jashdjashjd has status code of 404');
                t.end();
            });
        });
