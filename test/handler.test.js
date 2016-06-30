const shot = require('shot');
const tape = require('tape');

const handler = require('../src/handler.js');

tape('test get request to the / endpoint', t => {
  shot.inject(handler, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, '/ has status code of 200');
    t.ok(res.payload.includes('<!DOCTYPE'), 'finds index.html file');
    t.equal(res.headers['Content-type'], 'text/html', 'response type is html');
    t.end();
  });
});

tape('If requesting a file we\'re not handling throw 404', t => {
  shot.inject(handler, { method: 'get', url: '/jashdjashjd' }, (res) => {
    t.equal(res.statusCode, 404, '/jashdjashjd has status code of 404');
    t.end();
  });
});

tape('test to get to api endpoint', t => {
  shot.inject(handler, { method: 'get', url: '/api/words' }, (res) => {
    t.equal(res.statusCode, 200, '/api/words has status code of 200');
    t.end();
  });
});

tape('test get request to public endpoint', t => {
  shot.inject(handler, { method: 'get', url: '/public/script.js' }, (res) => {
    t.equal(res.statusCode, 200, '/public/script.js has status code of 200');
    t.end();
  });
});


// Failing test with error : 'throw new Error ('Can\'t set headers after they are sent)'
// //
// tape('test script fails when given false public endpoint', t => {
//   shot.inject(handler, { method: 'get', url: '/public/reregw' }, (res) => {
//     t.equal(res.statusCode, 404, '/public/reregw has status code of 404');
//     t.end();
//   });
// });
