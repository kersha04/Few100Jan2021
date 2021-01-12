const webpack = require('./webpack.test.config');
webpack.mode = 'development';
module.exports = (config) => {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],

        files: [
            { pattern: 'spec/*.spec.js', watched: false },
            { pattern: 'spec/**/*.spec.js', watched: false },
            { pattern: 'spec/*.spec.ts', watched: false },
            { pattern: 'spec/**/*.spec.ts', watched: false }
        ],

        preprocessors: {
            'spec/*.spec.js': ['webpack', 'sourcemap'],
            'spec/**/*.spec.js': ['webpack', 'sourcemap'],
            'spec/*.spec.ts': ['webpack', 'sourcemap'],
            'spec/**/*.spec.ts': ['webpack', 'sourcemap']
        },

        webpack,

        reporters: ['progress', 'karma-typescript', 'kjhtml'],
        //set to Chrome which has a headless version ie does not open a browser
        browsers: ['ChromeHeadless'], // or just 'ChromeHeadless', 'Chrome', 'ie', 'firefox', etc. can run these tests in numerous browsers in the array. 


    });
};