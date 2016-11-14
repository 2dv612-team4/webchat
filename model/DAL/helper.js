'use strict';

const mongoose = require('mongoose');

const initilize = () => {
    const db = mongoose.connection;

    db.on('error', function(){
        console.log('db error');
    });

    db.once('open', function(){
        console.log('db open');
    });

    process.on('SIGINT', function() {
        db.close(function() {
            console.log(' Mongoose connection disconnected app termination.');
            process.exit(0);
        });
    });

    mongoose.connect('mongodb://localhost/WebChat');
};

module.exports = initilize();