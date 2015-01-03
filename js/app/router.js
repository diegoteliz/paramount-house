define([
    'jquery',
    'underscore',
    'backbone',
    'app/view/pages'
], function($, _, Backbone, PageView, Tracking) {

    'use strict';

    var AppRouter = Backbone.Router.extend({

        routes: {
            '*url': 'renderPage'
        },

        renderPage: function(url) {
            var page = new PageView();
            if (url) {
                page.render(url);
            } else {
                page.render('index');
            }
        }
    });

    //Initialize the Router
    var Router = new AppRouter();

    // Navigation
    $('a').not('.static').click(function(event) {
        event.preventDefault();
        Router.navigate($(this).attr('href'), {
            trigger: true
        });
    });

    // Activate Backbone history
    Backbone.history.start({
        pushState: true
    });

    return Router;

});