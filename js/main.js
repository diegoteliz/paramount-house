require.config({
    paths: {
        jquery: [
            '//code.jquery.com/jquery-2.1.3.min',
            'vendor/jquery-2.1.3',
        ],
        underscore: [
            '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
            'vendor/underscore'
        ],
        backbone: [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
            'vendor/backbone'
        ]
    }
});

require(['app/app'], function(App) {

    'use strict';

    App.initialize();
});