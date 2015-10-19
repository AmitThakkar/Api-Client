/**
 * Created by Amit Thakkar on 10/17/15.
 */
((global, require, process) => {
    'use strict';
    // Requiring Dependencies
    const express = require('express');
    global.config = require('./server/config');
    global.logger = require('tracer').colorConsole({
        level: config.logLevel,
        format: [config.logFormat],
        dateformat: config.dateFormat
    });
    require('./server/proxy-server');
})(global, require, process);