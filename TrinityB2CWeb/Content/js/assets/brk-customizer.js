!function(c){var t=c(".brk-theme-options"),a=t.find(".panel-open"),e=t.find(".panel-close");a.on("click",function(e){e.preventDefault(),c(this).toggleClass("checked"),t.toggleClass("active")}),e.on("click",function(){a.removeClass("checked"),t.removeClass("active")}),c(document).on("click",function(e){t.is(e.target)||0!==t.has(e.target).length||(a.removeClass("checked"),t.removeClass("active"))});var o=c("[data-brk-bg-check]");a.on("click",function(e){e.preventDefault();c(this);o.each(function(){var e=c(this),t=e.data("brk-bg-check");e.attr("style","background-image: url("+t+")")})});var r=c(".brk-theme-options__color").find(".brk-theme-options__color-radio"),n=c("#brk-skin-color"),i=c("html").data("brk-skin");r.each(function(){var e=c(this),t=e.data("skin");i.indexOf(t)+1&&e.addClass("checked"),e.on("click",function(){n.attr("href","css/skins/"+t+".css"),r.removeClass("checked"),e.addClass("checked"),c("html").data("brk-skin",t+".css")})});var s=c("[data-brk-direction]"),d=s.find(".brk-theme-options__check");s.each(function(){var e=c(this),t=e.data("brk-direction"),a=e.find(".brk-theme-options__check");t===c("html").attr("dir")&&(d.removeClass("brk-theme-options__check_active"),a.addClass("brk-theme-options__check_active"))});var k=c("[data-brk-options-border]"),h=k.find(".brk-theme-options__check");k.each(function(){var a=c(this),o=a.find(".brk-theme-options__check");a.on("click",function(e){e.preventDefault();var t=a.data("brk-options-border");h.removeClass("brk-theme-options__check_active"),o.addClass("brk-theme-options__check_active"),0!==t?c("body").addClass("brk-bordered-theme").attr("data-border",t):c("body").removeClass("brk-bordered-theme").removeAttr("data-border"),Berserk.behaviors.border_theme_init.attach(c(document))})});var b=c("[data-brk-layout]"),l=b.find(".brk-theme-options__check");b.each(function(){var a=c(this),o=a.find(".brk-theme-options__check");a.on("click",function(e){e.preventDefault();var t=a.data("brk-layout");l.removeClass("brk-theme-options__check_active"),o.addClass("brk-theme-options__check_active"),"boxed"===t?c("body").addClass("brk-boxed"):c("body").removeClass("brk-boxed")})});var v=c(".brk-theme-options-pathname"),_=window.location.pathname.replace(/\//g,"");v.each(function(){var e=c(this),t=e.attr("href").replace(/\//g,""),a=e.find(".brk-theme-options__check");t===_&&a.addClass("brk-theme-options__check_active")})}(jQuery);