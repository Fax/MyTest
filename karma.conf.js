// Karma configuration
// Generated on Sun Apr 03 2016 23:05:01 GMT+0100 (GMT Summer Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
      'http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js',
      'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular-mocks.js',
      'http://maps.googleapis.com/maps/api/js?libraries=geometry,places',
      'http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.14.3/ui-bootstrap.min.js',
      'http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.14.3/ui-bootstrap-tpls.min.js',
      'http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.1/moment.min.js',
      'dist/scripts/**/*.js',
      'dist/vendor/**/*.js',
      'dist/templates/**/*.html',
      'tests/karma/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // '**/*.html': ['ng-html2js']
    },
/*
 ngHtml2JsPreprocessor: {
      stripPrefix: 'dist',
      moduleName: 'templates'
    },
*/

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','html'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    autoWatchBatchDelay: 500,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
