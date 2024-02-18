! function (k) {
    "use strict";
    Berserk.behaviors.google_maps = {
        attach: function (e, t) {
            if ("undefined" == typeof google) return console.log("Waiting for the google library"), void setTimeout(Berserk.behaviors.google_maps.attach, t.timeout_delay, e, t);
            var v = [{
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#e9e9e9"
                }, {
                    lightness: 17
                }]
            }, {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{
                    color: "#f5f5f5"
                }, {
                    lightness: 20
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 17
                }]
            }, {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 29
                }, {
                    weight: .2
                }]
            }, {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 18
                }]
            }, {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{
                    color: "#ffffff"
                }, {
                    lightness: 16
                }]
            }, {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{
                    color: "#f5f5f5"
                }, {
                    lightness: 21
                }]
            }, {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#dedede"
                }, {
                    lightness: 21
                }]
            }, {
                elementType: "labels.text.stroke",
                stylers: [{
                    visibility: "on"
                }, {
                    color: "#ffffff"
                }, {
                    lightness: 16
                }]
            }, {
                elementType: "labels.text.fill",
                stylers: [{
                    saturation: 36
                }, {
                    color: "#333333"
                }, {
                    lightness: 40
                }]
            }, {
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    color: "#f2f2f2"
                }, {
                    lightness: 19
                }]
            }, {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{
                    color: "#fefefe"
                }, {
                    lightness: 20
                }]
            }, {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#fefefe"
                }, {
                    lightness: 17
                }, {
                    weight: 1.2
                }]
            }],
                w = [{
                    featureType: "all",
                    elementType: "labels.text.fill",
                    stylers: [{
                        saturation: 36
                    }, {
                        color: "#000000"
                    }, {
                        lightness: 40
                    }]
                }, {
                    featureType: "all",
                    elementType: "labels.text.stroke",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#000000"
                    }, {
                        lightness: 16
                    }]
                }, {
                    featureType: "all",
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 20
                    }]
                }, {
                    featureType: "administrative",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 17
                    }, {
                        weight: 1.2
                    }]
                }, {
                    featureType: "landscape",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 20
                    }]
                }, {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 21
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 17
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 29
                    }, {
                        weight: .2
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 18
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 16
                    }]
                }, {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 19
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{
                        color: "#000000"
                    }, {
                        lightness: 17
                    }]
                }],
                l = k(".brk-map:not(.rendered)", e).addClass("rendered");
            l.length && l.each(function (e, t) {
                var n = k(this),
                    l = n.data("height"),
                    o = n.find(".brk-map__opener"),
                    s = n.find(".brk-map__canvas"),
                    i = "brk-map-" + e;
                s.css("height", l), o.length && (n.css("height", 100), o.on("click", function () {
                    n.toggleClass("map-opened");
                    var e = n.hasClass("map-opened") ? l : 100;
                    n.css("height", e)
                })), s.attr("id", i);
                var y = s.data("address"),
                    r = parseFloat(s.data("lat")),
                    a = parseFloat(s.data("lng")),
                    f = s.data("zoom"),
                    g = s.data("type"),
                    p = s.data("marker"),
                    m = s.data("offset-lat"),
                    d = s.data("offset-lng"),
                    c = s.data("style"),
                    h = s.data("info-window");
                f = f || 14, g = g || "roadmap", m = m || 0, d = d || 0;
                var T = "";

                function u(e, t) {
                    var l = {
                        zoom: f,
                        center: {
                            lat: e,
                            lng: t
                        },
                        panControl: !1,
                        zoomControl: !0,
                        zoomControlOptions: {
                            position: google.maps.ControlPosition.LEFT_CENTER
                        },
                        mapTypeControl: !1,
                        streetViewControl: !1,
                        fullscreenControl: !1,
                        mapTypeId: google.maps.MapTypeId[g],
                        scrollwheel: !1,
                        tilt: 45,
                        styles: T
                    },
                        o = new google.maps.Map(document.getElementById(i), l),
                        s = new google.maps.Marker({
                            position: {
                                lat: e + m,
                                lng: t + d
                            },
                            map: o,
                            icon: p,
                            title: y
                        });
                    if (n.find(h).length) {
                        n.find(h).css("display", "none");
                        var r = n.find(h).html(),
                            a = new google.maps.InfoWindow({
                                content: r,
                                maxWidth: 220
                            });
                        google.maps.event.addListener(s, "click", function () {
                            a.open(o, s)
                        })
                    }
                } ("silver" === c ? T = v : "dark" === c && (T = w), r || a) ? u(r, a) : (new google.maps.Geocoder).geocode({
                    address: y
                }, function (e, t) {
                    if (e)
                        if (e[0]) {
                            var l = e[0].geometry.location.lat(),
                                o = e[0].geometry.location.lng();
                            "OK" == t ? u(l, o) : alert("Geocode was not successful for the following reason: " + t)
                        } else alert("Google Maps wrong address!")
                })
            })
        }
    }
}(jQuery);