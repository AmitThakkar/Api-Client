/**
 * Created by Amit Thakkar on 10/17/15.
 */
((global, require, process) => {
    'use strict';
    // Requiring Dependencies
    const express = require('express');
    const net = require('net');
    const CONFIG = global.config = require('./server/config');
    require('./server/proxies');
    const PORT = process.env.API_PORT || CONFIG.API_PORT;
    const HOST = CONFIG.API_HOST;
    const logger = global.logger = require('tracer').colorConsole({
        level: config.logLevel,
        format: [config.logFormat],
        dateformat: config.dateFormat
    });
    const client = net.connect({port: PORT, host: HOST}, () => {
        logger.info('Connected to API Server!');
        client.write('world!\r\n');
    });
    client.on('data', (data) => {
        logger.info(data.toString());
        client.end();
    });
    client.on('end', () => {
        logger.info('Disconnected from API Server');
    });
})(global, require, process);