define("app/view/pages",["jquery","underscore","backbone"],function(e,n,t){var r=t.View.extend({el:"#dinamic-content",render:function(n){var t=this.$el,r=e("#preloader");r.fadeIn(50),t.fadeOut(100,function(){e.ajax({url:"/template/"+n+".html"}).done(function(e){t.html(e),t.show(),r.fadeOut(100)}).fail(function(){r.fadeIn(100),t.fadeOut(400,function(){e.ajax({url:"/template/404.html"}).done(function(n){e(document).attr("title","Oops! | Paramount House"),t.html(n)}).fail(function(){alert("Oops! An error occurred :(")})})})})}});return r}),define("app/router",["jquery","underscore","backbone","app/view/pages"],function(e,n,t,r){var i=t.Router.extend({routes:{"*url":"renderPage"},renderPage:function(e){var n=new r;n.render(e?e:"index")}}),o=new i;return e("a").not(".static").click(function(n){n.preventDefault(),o.navigate(e(this).attr("href"),{trigger:!0})}),t.history.start({pushState:!0}),o}),define("app/view/core",["jquery","underscore","backbone"],function(e,n,t){var r=t.View.extend({el:"body",overlay:e("#overlay"),events:{"click #menu-btn":"toggleMenu","click .main-nav-item a":"mainMenuItem","click #options-btn":"toggleOptionsMenu","click .option-item":"optionItem","click #search-btn":"showSearch","click #search-close-btn":"hideSearch",keydown:"keyDownHandler"},toggleMenu:function(n){n&&n.preventDefault(),e("#menu-btn").toggleClass("selected"),e("#main-nav-wrapper").toggleClass("opened"),this.overlay.toggleClass("visible dark"),this.overlay.click(function(){e("#menu-btn").trigger("click")})},mainMenuItem:function(){this.toggleMenu()},toggleOptionsMenu:function(n){n.preventDefault();var t=e(n.currentTarget);t.toggleClass("selected"),e("#options-wrapper").toggleClass("opened"),this.overlay.toggleClass("visible"),this.overlay.click(function(){e("#options-btn").trigger("click")})},optionItem:function(n){n.preventDefault();var t=e(n.currentTarget);t.toggleClass("checked")},showSearch:function(){e("#search-field, #search-close-btn").show(),e("#search-field").focus(),this.overlay.addClass("visible dark"),this.overlay.click(function(){e("#search-close-btn").trigger("click")})},hideSearch:function(){e("#search-field, #search-close-btn").hide(),this.overlay.removeClass("visible dark")},keyDownHandler:function(e){switch(e.which){case 27:this.overlay.trigger("click")}}});return r}),define("app/app",["jquery","underscore","backbone","app/router","app/view/core"],function(e,n,t,r,i){var o=function(){r.initialize();new i};return{initialize:o}}),require.config({paths:{jquery:["//code.jquery.com/jquery-2.1.3.min","vendor/jquery-2.1.3"],underscore:["//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min","vendor/underscore"],backbone:["//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min","vendor/backbone"]}}),require(["app/app"],function(e){e.initialize()}),define("main",function(){});