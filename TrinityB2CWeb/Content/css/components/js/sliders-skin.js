! function (r) {
    Berserk.behaviors.slick_init = {
        attach: function (e, i) {
            if (void 0 === r.fn.slick) return console.log("Waiting for the slick library"), void setTimeout(Berserk.behaviors.slick_init.attach, i.timeout_delay, e, i);
            window.addEventListener("load", function () {
                r(".slick-slider").each(function () {
                    r(this).slick("setPosition", 0)
                })
            });
            var t = "rtl" === r("html").attr("dir");

            function d(e, i) {
                setTimeout(function () {
                    r(e).removeClass("prev-slid-index next-slid-index"), r(i).prev().removeClass("next-slid-index").addClass("prev-slid-index"), r(i).next().removeClass("prev-slid-index").addClass("next-slid-index")
                }, 100)
            }
            r(e).parent().find(".rotation-slider:not(.rendered)").addClass("rendered").each(function () {
                var e = r(this);
                e.slick({
                    dots: !1,
                    arrows: !1,
                    infinite: !1,
                    speed: 800,
                    adaptiveHeight: !0,
                    focusOnSelect: !0,
                    centerMode: !0,
                    centerPadding: "75px",
                    initialSlide: 1,
                    swipeToSlide: !0,
                    rtl: t,
                    responsive: [{
                        breakpoint: 576,
                        settings: {
                            focusOnSelect: !1,
                            centerMode: !1,
                            centerPadding: "0"
                        }
                    }]
                });
                var n = r(this).find(".slick-slide"),
                    i = r(this).find(".slick-current");
                d(n, i), r(this).on("beforeChange", function (e, i, s, t) {
                    d(n, i.$slides[t])
                }), window.addEventListener("load", function () {
                    e.slick("reinit")
                })
            }), r(e).parent().find(".rotation-slider-min:not(.rendered)").addClass("rendered").each(function () {
                r(this).slick({
                    dots: !1,
                    arrows: !1,
                    infinite: !0,
                    speed: 800,
                    swipeToSlide: !0,
                    adaptiveHeight: !0,
                    rtl: t
                })
            }), r(e).parent().find("div.slider-dark:not(.rendered)").addClass("rendered").each(function () {
                r(this).slick({
                    dots: !1,
                    arrows: !1,
                    infinite: !0,
                    speed: 800,
                    swipeToSlide: !0,
                    adaptiveHeight: !0,
                    rtl: t
                })
            }), r(e).parent().find("div.tiled-slider:not(.rendered)").addClass("rendered").each(function () {
                r(this).slick({
                    dots: !1,
                    arrows: !1,
                    infinite: !0,
                    speed: 800,
                    swipeToSlide: !0,
                    adaptiveHeight: !0,
                    swipe: !1,
                    rtl: t,
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3
                        }
                    }, {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2
                        }
                    }]
                })
            }), r(e).parent().find("div.triple-slider:not(.rendered)").addClass("rendered").each(function () {
                r(this).slick({
                    slidesToShow: 3,
                    dots: !1,
                    arrows: !0,
                    infinite: !0,
                    speed: 800,
                    swipeToSlide: !0,
                    rtl: t,
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }]
                })
            }), r(e).parent().find("div.slider-thumbnailed:not(.rendered)").addClass("rendered").each(function (e, i) {
                r(i).addClass("sthumb-" + e);
                var s = ".sthumb-" + e;
                r(s + " .slider-thumbnailed-for").on("init", function (e, i) {
                    r(s).removeClass("slick-loading")
                }), r(s + " .slider-thumbnailed-for").slick({
                    dots: !1,
                    arrows: !1,
                    adaptiveHeight: !0,
                    rtl: t,
                    asNavFor: s + " .slider-thumbnailed-nav"
                }), r(s + " .slider-thumbnailed-nav").slick({
                    asNavFor: s + " .slider-thumbnailed-for",
                    focusOnSelect: !0,
                    arrows: !1,
                    swipeToSlide: !0,
                    rtl: t,
                    responsive: [{
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 5
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 4
                        }
                    }, {
                        breakpoint: 375,
                        settings: {
                            slidesToShow: 3
                        }
                    }]
                })
            }), r(e).parent().find("div.slider-thumbnailed-full:not(.rendered)").addClass("rendered").each(function (e, i) {
                r(i).addClass("forNav-" + e);
                var s = ".forNav-" + e;
                r(s + " .slider-thumbnailed-full-for").on("init", function (e, i) {
                    r(s).removeClass("slick-loading")
                }), r(s + " .slider-thumbnailed-full-for").slick({
                    dots: !1,
                    arrows: !1,
                    adaptiveHeight: !0,
                    prevArrow: '<button type="button" class="slick-prev">Prev</button>',
                    nextArrow: '<button type="button" class="slick-next">Next</button>',
                    asNavFor: s + " .slider-thumbnailed-full-nav",
                    rtl: t,
                    responsive: [{
                        breakpoint: 768,
                        settings: {
                            arrows: !1
                        }
                    }]
                }), r(s + " .slider-thumbnailed-full-nav").slick({
                    asNavFor: s + " .slider-thumbnailed-full-for",
                    focusOnSelect: !0,
                    arrows: !1,
                    swipeToSlide: !0,
                    rtl: t,
                    responsive: [{
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 5
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 4
                        }
                    }, {
                        breakpoint: 375,
                        settings: {
                            slidesToShow: 3
                        }
                    }]
                })
            }), r(e).parent().find(".default-slider:not(.rendered)").addClass("rendered").each(function () {
                r(this).slick({
                    dots: !1,
                    arrows: !1,
                    infinite: !0,
                    speed: 800,
                    swipeToSlide: !0,
                    adaptiveHeight: !0,
                    rtl: t
                })
            }), r(e).parent().find(".post-angle-slider:not(.rendered)").addClass("rendered").each(function () {
                r(this).slick({
                    dots: !1,
                    arrows: !1,
                    infinite: !0,
                    speed: 800,
                    swipeToSlide: !0,
                    adaptiveHeight: !0,
                    autoplay: !0,
                    autoplaySpeed: 1e3,
                    pauseOnHover: !0,
                    rtl: t
                })
            }), r(e).parent().find("div.landscape-slider:not(.rendered)").addClass("rendered").each(function (e, i) {
                r(i).addClass("landscape-" + e);
                var s = ".landscape-" + e;
                r(s + " .landscape-slider-for").on("init", function (e, i) {
                    r(s).removeClass("slick-loading")
                }), r(s + " .landscape-slider-for").slick({
                    dots: !1,
                    arrows: !1,
                    adaptiveHeight: !0,
                    asNavFor: s + " .landscape-slider-nav",
                    rtl: t
                }), r(s + " .landscape-slider-nav").slick({
                    asNavFor: s + " .landscape-slider-for",
                    focusOnSelect: !0,
                    arrows: !1,
                    rtl: t
                })
            }), r(e).parent().find(".brk-brand-slider:not(.rendered)").addClass("rendered").each(function (e, i) {
                r(this).on("init beforeChange afterChange", function (e, i) {
                    var s = 0;
                    i.$slideTrack.children().each(function () {
                        r(this).find("img").height() > s && (s = r(this).height())
                    }), i.$slideTrack.children().each(function () {
                        r(this).css("min-height", s)
                    })
                }), r(this).slick({
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    arrows: !1,
                    draggable: !0,
                    swipeToSlide: !0,
                    infinite: !0,
                    autoplay: !0,
                    autoplaySpeed: 3e3,
                    accessibility: !1,
                    rtl: t,
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 4
                        }
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2
                        }
                    }]
                })
            }), r(e).parent().find(".brk-slider-team:not(.rendered)").addClass("rendered").each(function () {
                r(this).slick({
                    slidesToShow: 8,
                    slidesToScroll: 1,
                    arrows: !1,
                    draggable: !0,
                    swipeToSlide: !0,
                    infinite: !0,
                    autoplay: !0,
                    autoplaySpeed: 5e3,
                    accessibility: !1,
                    rtl: t,
                    responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 5
                        }
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 3
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2
                        }
                    }]
                });
                var i = r(this).find(".brk-img-zoom");
                i.each(function (e) {
                    r(this).on("mouseenter", function () {
                        var e = r(this);
                        i.each(function () {
                            r(this).addClass("brk-img-zoom_not-hovered"), e.removeClass("brk-img-zoom_not-hovered")
                        })
                    }), r(this).on("mouseleave", function () {
                        i.each(function () {
                            r(this).removeClass("brk-img-zoom_not-hovered")
                        })
                    })
                })
            }), r(e).parent().find(".brk-services-slider__items:not(.rendered)").addClass("rendered").each(function () {
                r(this).slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    swipeToSlide: !0,
                    infinite: !0,
                    accessibility: !1,
                    autoplay: !0,
                    autoplaySpeed: 3e3,
                    arrows: !1,
                    dots: !0,
                    draggable: !0,
                    pauseOnHover: !0,
                    rtl: t,
                    responsive: [{
                        breakpoint: 1230,
                        settings: {
                            slidesToShow: 3
                        }
                    }, {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }]
                })
            }), r(e).parent().find(".brk-slider-shop:not(.rendered)").addClass("rendered").each(function () {
                var e = r(this).find(".brk-slider__nav-prev"),
                    i = r(this).find(".brk-slider__nav-next"),
                    s = r(this).find(".brk-slider__items");
                e.click(function () {
                    s.slick("slickPrev")
                }), i.click(function () {
                    s.slick("slickNext")
                }), s.slick({
                    accessibility: !1,
                    arrows: !1,
                    dots: !1,
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    rtl: t,
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                })
            }), r(e).parent().find(".brk-slider-cards:not(.rendered)").addClass("rendered").each(function () {
                var e = r(this).find(".brk-slider__control-next"),
                    i = r(this).find(".brk-slider__control-prev"),
                    s = r(this).find(".brk-slider__control");
                r(this).find(".brk-slider__items").slick({
                    slidesToShow: 4,
                    infinite: !1,
                    swipeToSlide: !0,
                    arrow: !1,
                    autoplay: !0,
                    autoplaySpeed: 3500,
                    rtl: t,
                    prevArrow: i,
                    nextArrow: e,
                    appendDots: s,
                    dots: !0,
                    dotsClass: "brk-slider__dots",
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3
                        }
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1
                        }
                    }]
                })
            }), r(document).ready(function () {
                setTimeout(function () {
                    r(e).parent().find(".dots-base-skin:not(.dots-rendered), .dots-landscape-skin:not(.dots-rendered)").addClass("dots-rendered").each(function (e, i) {
                        r(i).find(".slick-dots").wrap('<div class="dots-wrap"></div>');
                        var s = r(i).find(".dots-wrap");
                        s.prepend('<button class="l-prev" type="button"><i class="fas fa-angle-left"></i></button>'), s.append('<button class="l-next" type="button"><i class="fas fa-angle-right"></i></button>');
                        var t = s.find(".l-prev"),
                            n = s.find(".l-next");
                        t.on("click", function () {
                            r(i).slick("slickPrev")
                        }), n.on("click", function () {
                            r(i).slick("slickNext")
                        })
                    })
                }, 100)
            })
        }
    }
}(jQuery);