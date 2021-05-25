const express = require('express');
const fs = require('fs');
const app = express();

function get(_app, _route, _path) {
    _app.get(_route, (req, res) => {
        fs.readFileSync(_path, 'utf-8');
    });
}

function listen(_app, _hostname, _port) {
    _app.listen(_port, _hostname, (err) => {
        if (!err)
            console.log('No error found');
        else console.log(`Error : ${err}`);
    });
}

function use(_app, _express, _path, _extansions) {
    _app.use(_express.static(`public/${_path}`, {
        extensions : _extansions,
        dotfiles : 'ignore'
    }));
}

/* Static files */
use(app, express, 'src', 'html');
use(app, express, 'styles', 'css');
use(app, express, 'scripts', 'js');

/* Responding requests */
get(app, '/', 'src/index.html');
get(app, '/style', 'styles/style.css');
get(app, '/gameOfLife', 'scripts/gameOfLife.js');

/* Listening on the port */
listen(app, 'localhost', 5000);