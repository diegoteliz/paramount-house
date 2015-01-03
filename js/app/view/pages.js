define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    'use strict';

    var PageView = Backbone.View.extend({

        el: '#dinamic-content',

        render: function(url) {
            
            var $el = this.$el,
                preloader = $('#preloader');

            preloader.fadeIn(50);

            $el.fadeOut(100, function() {
                $.ajax({
                    url: '/template/'+url+'.html'
                })
                .done(function(data) {
                    $el.html(data);
                    $el.show();
                    preloader.fadeOut(100);
                })
                .fail(function() {
                    preloader.fadeIn(100);
                    $el.fadeOut(400, function() {
                        $.ajax({
                            url: '/template/404.html'
                        })
                        .done(function(data) {
                            $(document).attr('title', 'Oops! | Paramount House');
                            $el.html(data);
                        })
                        .fail(function() {
                            alert('Oops! An error occurred :(');
                        });
                    });
                });
            });
        }

    });

    return PageView;
    
});