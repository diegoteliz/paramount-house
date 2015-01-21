define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    'use strict';

    var CoreView = Backbone.View.extend({

        el: 'body',
        overlay: $('#overlay'),

        events: {
            'click #menu-btn': 'toggleMenu',
            'click .main-nav-item a': 'mainMenuItem',
            'click #options-btn': 'toggleOptionsMenu',
            'click .option-item': 'optionItem',
            'click #search-btn': 'showSearch',
            'click #search-close-btn': 'hideSearch',
            'keydown': 'keyDownHandler'
        },

        toggleMenu: function(event) {
            if(event){
                event.preventDefault();
            }
            $('#menu-btn').toggleClass('selected');
            $('#main-nav-wrapper').toggleClass('opened');
            this.overlay.toggleClass('visible dark');
            this.overlay.click(function() {
                $('#menu-btn').trigger('click');
            });
        },

        mainMenuItem: function() {
            this.toggleMenu();
        },

        toggleOptionsMenu: function(event) {
            event.preventDefault();
            var $this = $(event.currentTarget);
            $this.toggleClass('selected');
            $('#options-wrapper').toggleClass('opened');
            this.overlay.toggleClass('visible');
            this.overlay.click(function() {
                $('#options-btn').trigger('click');
            });
        },

        optionItem: function(event) {
            event.preventDefault();
            var $this = $(event.currentTarget);
            $this.toggleClass('checked');
        },

        showSearch: function() {
            $('#search-field, #search-close-btn').show();
            $('#search-field').focus();
            this.overlay.addClass('visible dark');
            this.overlay.click(function() {
                $('#search-close-btn').trigger('click');
            });
        },

        hideSearch: function(){
            $('#search-field, #search-close-btn').hide();
            this.overlay.removeClass('visible dark');
        },

        keyDownHandler: function(event){
            switch (event.which) {
                // Esc key
                case 27:
                    this.overlay.trigger('click');
                    break;
            }
        }

    });

    return CoreView;
});