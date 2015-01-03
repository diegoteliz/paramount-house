define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    'use strict';

    var CoreView = Backbone.View.extend({

        el: 'body',

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
            $('#overlay').toggleClass('visible dark');
            $('#overlay').click(function() {
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
            $('#overlay').toggleClass('visible');
            $('#overlay').click(function() {
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
        },

        hideSearch: function(){
            $('#search-field, #search-close-btn').hide();
        },

        keyDownHandler: function(event){
            switch (event.which) {
                // Esc key
                case 27:
                    $('#overlay').trigger('click');
                    this.hideSearch();
                    break;
            }
        }

    });

    return CoreView;
});