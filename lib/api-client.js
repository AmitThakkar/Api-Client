/**
 * Created by Amit Thakkar on 10/23/15.
 */
((global, require, process) => {
    'use strict';
    // Requiring Dependencies
    const express = require('express');
    const responseTime = require('response-time');
    const CONFIG = global.CONFIG = require('./config');
    const logger = global.logger = require('tracer').colorConsole({
        level: CONFIG.logLevel,
        format: [CONFIG.logFormat],
        dateformat: CONFIG.dateFormat
    });
    require('./proxy-server');
    let app = express();
    app.use((req, res, next) => {
        logger.trace(req.method, '=>', req.url);
        let startTime = Date.now();
        res.on('finish', function () {
            let responseTime = Date.now() - startTime;
            logger.trace(req.method, '=>', req.url, 'Response Time:', responseTime);
        });
        next();
    });
    app.use(responseTime());
    require('./route-mapping')(app);
    const PORT = process.env.PORT || CONFIG.PORT;
    app.listen(PORT, () => {
        logger.info('Dynamic Schema app listening at http://%s:%s', CONFIG.HOST, PORT);
    });
})(global, require, process);