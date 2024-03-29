! function (M) {
    Berserk.behaviors.background_particleground_init = {
        attach: function (t, i) {
            var e = M(".brk-particles-standart:not(.rendered)", t),
                s = M(".brk-particles-fluid:not(.rendered)", t);
            if (e.length || s.length) {
                if (void 0 === M.fn.particleground) return console.log("Waiting for the particleground library"), void setTimeout(Berserk.behaviors.background_particleground_init.attach, i.timeout_delay, t, i);
                e.each(function () {
                    e.particleground({
                        minSpeedX: .6,
                        minSpeedY: .6,
                        dotColor: "rgba(255, 255, 255, .3)",
                        lineColor: "rgba(255, 255, 255, .12)",
                        density: 1e4,
                        particleRadius: 8,
                        parallaxMultiplier: 5.2,
                        proximity: 80
                    }), M(this).addClass("rendered")
                }), s.each(function () {
                    M(this).length && M(this).particleground({
                        minSpeedX: .6,
                        minSpeedY: .6,
                        dotColor: "#ffffff",
                        lineColor: "#ffffff",
                        density: 3e3,
                        particleRadius: 4,
                        parallaxMultiplier: 5.2,
                        proximity: 0
                    })
                }).addClass("rendered")
            }
        }
    }, Berserk.behaviors.background_metaballs_and_dots_init = {
        attach: function (t, i) {
            if (M("#brk-metaballs:not(.rendered)").length) {
                M("#brk-metaballs:not(.rendered)").addClass("rendered");
                var l = l || {
                    screen: {
                        elem: null,
                        callback: null,
                        ctx: null,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0,
                        init: function (t, i, e) {
                            return this.elem = document.getElementById(t), this.callback = i || null, "CANVAS" == this.elem.tagName && (this.ctx = this.elem.getContext("2d")), window.addEventListener("resize", function () {
                                this.resize()
                            }.bind(this), !1), this.elem.onselectstart = function () {
                                return !1
                            }, this.elem.ondrag = function () {
                                return !1
                            }, e && this.resize(), this
                        },
                        resize: function () {
                            var t = this.elem;
                            for (this.width = t.offsetWidth, this.height = t.offsetHeight, this.left = 0, this.top = 0; null != t; t = t.offsetParent) this.left += t.offsetLeft, this.top += t.offsetTop;
                            this.ctx && (this.elem.width = this.width, this.elem.height = this.height), this.callback && this.callback()
                        },
                        pointer: {
                            screen: null,
                            elem: null,
                            callback: null,
                            pos: {
                                x: 0,
                                y: 0
                            },
                            mov: {
                                x: 0,
                                y: 0
                            },
                            drag: {
                                x: 0,
                                y: 0
                            },
                            start: {
                                x: 0,
                                y: 0
                            },
                            end: {
                                x: 0,
                                y: 0
                            },
                            active: !1,
                            touch: !1,
                            down: function (t, i) {
                                this.touch = i, t.preventDefault();
                                var e = i ? t.touches[0] : t;
                                !i && document.setCapture && document.setCapture(), this.pos.x = this.start.x = e.clientX - this.screen.left, this.pos.y = this.start.y = e.clientY - this.screen.top, this.active = !0, this.callback.down && this.callback.down()
                            },
                            up: function (t, i) {
                                this.touch = i, t.preventDefault(), !i && document.releaseCapture && document.releaseCapture(), this.end.x = this.drag.x, this.end.y = this.drag.y, this.active = !1, this.callback.up && this.callback.up()
                            },
                            move: function (t, i) {
                                this.touch = i, t.preventDefault();
                                var e = i ? t.touches[0] : t;
                                this.mov.x = e.clientX - this.screen.left, this.mov.y = e.clientY - this.screen.top, this.active && (this.pos.x = this.mov.x, this.pos.y = this.mov.y, this.drag.x = this.end.x - (this.pos.x - this.start.x), this.drag.y = this.end.y - (this.pos.y - this.start.y), this.callback.move && this.callback.move())
                            },
                            init: function (t) {
                                return this.screen = l.screen, this.elem = this.screen.elem, this.callback = t || {}, "ontouchstart" in window && (this.elem.ontouchstart = function (t) {
                                    this.down(t, !0)
                                }.bind(this), this.elem.ontouchmove = function (t) {
                                    this.move(t, !0)
                                }.bind(this), this.elem.ontouchend = function (t) {
                                    this.up(t, !0)
                                }.bind(this), this.elem.ontouchcancel = function (t) {
                                    this.up(t, !0)
                                }.bind(this)), document.addEventListener("mousedown", function (t) {
                                    this.down(t, !1)
                                }.bind(this), !0), document.addEventListener("mousemove", function (t) {
                                    this.move(t, !1)
                                }.bind(this), !0), document.addEventListener("mouseup", function (t) {
                                    this.up(t, !1)
                                }.bind(this), !0), this
                            }
                        },
                        loadImages: function (t) {
                            var n, h = document.getElementById(t),
                                a = document.createElement("canvas"),
                                o = !1,
                                r = !1,
                                l = document.images.length;

                            function d(t, i, e) {
                                n.beginPath(), n.moveTo(50, 50), n.arc(50, 50, e, 0, i), n.fillStyle = t, n.fill(), n.closePath()
                            }
                            setTimeout(function t() {
                                if (r) a.style.display = "none";
                                else {
                                    for (var i = 0, e = 32, s = 0; s < l; s++) i += document.images[s].complete ? 1 : 0;
                                    i < l ? (o || (o = !0, a.style.width = a.style.height = "100px", a.width = a.height = 100, a.style.position = "fixed", a.style.left = a.style.top = "50%", a.style.marginTop = a.style.marginLeft = "-50px", a.style.zIndex = 1e4, n = a.getContext("2d"), d("rgba(64,64,64, .1)", 2 * Math.PI, 48), h.appendChild(a)), d("rgb(255,255,255)", i / l * 2 * Math.PI, 50)) : (o && (d("rgb(255,255,255)", 2 * Math.PI, 50), e = 300), r = !0), setTimeout(t, e)
                                }
                            }, 32)
                        }
                    }
                };
                ! function () {
                    "use strict";
                    var t, i, a = function (t, i) {
                        this.x = t, this.y = i, this.magnitude = t * t + i * i, this.computed = 0, this.force = 0
                    };
                    a.prototype.add = function (t) {
                        return new a(this.x + t.x, this.y + t.y)
                    };
                    var o = function (t) {
                        this.vel = new a((.5 < Math.random() ? 1 : -1) * (.2 + .25 * Math.random()), (.5 < Math.random() ? 1 : -1) * (.2 + 1 * Math.random())), this.pos = new a(0 * t.width + Math.random() * t.width * .5, 0 * t.height + Math.random() * t.height * .5), this.size = t.wh / 25 + Math.random() * (t.wh / 30), this.width = t.width, this.height = t.height
                    };
                    o.prototype.move = function () {
                        if (h.active) {
                            var t = h.pos.x - this.pos.x,
                                i = h.pos.y - this.pos.y,
                                e = Math.atan2(i, t),
                                s = -Math.min(10, 500 / Math.sqrt(t * t + i * i));
                            this.pos = this.pos.add(new a(Math.cos(e) * s, Math.sin(e) * s))
                        }
                        this.pos.x >= this.width - this.size ? (0 < this.vel.x && (this.vel.x = -this.vel.x), this.pos.x = this.width - this.size) : this.pos.x <= this.size && (this.vel.x < 0 && (this.vel.x = -this.vel.x), this.pos.x = this.size), this.pos.y >= this.height - this.size ? (0 < this.vel.y && (this.vel.y = -this.vel.y), this.pos.y = this.height - this.size) : this.pos.y <= this.size && (this.vel.y < 0 && (this.vel.y = -this.vel.y), this.pos.y = this.size), this.pos = this.pos.add(this.vel)
                    };
                    var e = function (t, i, e, s, n) {
                        this.step = 5, this.width = t, this.height = i, this.wh = Math.min(t, i), this.sx = Math.floor(this.width / this.step), this.sy = Math.floor(this.height / this.step), this.paint = !1, this.metaFill = r(t, i, t, s, n), this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0], this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1], this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0], this.ix = [1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1], this.grid = [], this.balls = [], this.iter = 0, this.sign = 1;
                        for (var h = 0; h < (this.sx + 2) * (this.sy + 2) ; h++) this.grid[h] = new a(h % (this.sx + 2) * this.step, Math.floor(h / (this.sx + 2)) * this.step);
                        for (h = 0; h < e; h++) this.balls[h] = new o(this)
                    };
                    e.prototype.computeForce = function (t, i, e) {
                        var s = e || t + i * (this.sx + 2);
                        if (0 === t || 0 === i || t === this.sx || i === this.sy) var n = .6 * this.sign;
                        else {
                            for (var h, a = this.grid[s], o = (n = 0, 0) ; h = this.balls[o++];) n += h.size * h.size / (-2 * a.x * h.pos.x - 2 * a.y * h.pos.y + h.pos.magnitude + a.magnitude);
                            n *= this.sign
                        }
                        return this.grid[s].force = n
                    }, e.prototype.marchingSquares = function (t) {
                        var i = t[0],
                            e = t[1],
                            s = t[2],
                            n = i + e * (this.sx + 2);
                        if (this.grid[n].computed === this.iter) return !1;
                        for (var h, a = 0, o = 0; o < 4; o++) {
                            var r = i + this.ix[o + 12] + (e + this.ix[o + 16]) * (this.sx + 2),
                                l = this.grid[r].force;
                            (0 < l && this.sign < 0 || l < 0 && 0 < this.sign || !l) && (l = this.computeForce(i + this.ix[o + 12], e + this.ix[o + 16], r)), 1 < Math.abs(l) && (a += Math.pow(2, o))
                        }
                        if (15 === a) return [i, e - 1, !1];
                        5 === a ? h = 2 === s ? 3 : 1 : 10 === a ? h = 3 === s ? 0 : 2 : (h = this.mscases[a], this.grid[n].computed = this.iter);
                        var d = this.step / (Math.abs(Math.abs(this.grid[i + this.plx[4 * h + 2] + (e + this.ply[4 * h + 2]) * (this.sx + 2)].force) - 1) / Math.abs(Math.abs(this.grid[i + this.plx[4 * h + 3] + (e + this.ply[4 * h + 3]) * (this.sx + 2)].force) - 1) + 1);
                        return c.lineTo(this.grid[i + this.plx[4 * h + 0] + (e + this.ply[4 * h + 0]) * (this.sx + 2)].x + this.ix[h] * d, this.grid[i + this.plx[4 * h + 1] + (e + this.ply[4 * h + 1]) * (this.sx + 2)].y + this.ix[h + 4] * d), this.paint = !0, [i + this.ix[h + 4], e + this.ix[h + 8], h]
                    }, e.prototype.renderMetaballs = function () {
                        for (var t, i = 0; t = this.balls[i++];) t.move();
                        for (this.iter++, this.sign = -this.sign, this.paint = !1, c.fillStyle = this.metaFill, c.beginPath(), i = 0, c.shadowBlur = 15, c.shadowColor = "rgba(0, 0, 0, .2)"; t = this.balls[i++];) {
                            for (var e = [Math.round(t.pos.x / this.step), Math.round(t.pos.y / this.step), !1]; e = this.marchingSquares(e) ;);
                            this.paint && (c.fill(), c.closePath(), c.beginPath(), this.paint = !1)
                        }
                    };
                    var r = function (t, i, e, s, n) {
                        var h = c.createRadialGradient(t / 2, i / 2, 0, t / 2, i / 2, e);
                        return h.addColorStop(0, s), h.addColorStop(1, n), h
                    },
                        s = function () {
                            requestAnimationFrame(s), c.clearRect(0, 0, n.width, n.height), t.renderMetaballs(), i.renderMetaballs()
                        },
                        n = l.screen.init("brk-metaballs", null, !0),
                        c = n.ctx,
                        h = n.pointer.init();
                    n.resize(), t = new e(n.width, n.height, 10, "rgba(133, 21, 130, .8)", "rgba(241, 79, 107, .8)"), i = new e(n.width, n.height, 10, "rgba(133, 21, 130, .8)", "rgba(241, 79, 107, .8)"), s()
                }()
            }
            M(".brk-animated-dot:not(.rendered)", t).each(function () {
                var u = M(this).find(".brk-animated-dot__figure");
                ! function t() {
                    var i, e, s, n, h, a, o, r, l = (i = u.parent(), e = (i = i || M(window)).height() - 50, s = i.width() - 50, [Math.floor(Math.random() * e), Math.floor(Math.random() * s)]),
                        d = u.offset(),
                        c = (n = [d.top, d.left], h = l, a = Math.abs(n[1] - h[1]), o = Math.abs(n[0] - h[0]), r = o < a ? a : o, Math.ceil(r / 1));
                    u.animate({
                        top: l[0],
                        left: l[1]
                    }, c, function () {
                        t()
                    })
                }(), M(this).addClass("rendered")
            }).addClass("rendered")
        }
    }, Berserk.behaviors.background_skrollr_init = {
        attach: function (t, i) {
            if (M("[data-skrollr]:not(.rendered)").length) {
                if ("undefined" == typeof skrollr) return console.log("Waiting for the skrollr library"), void setTimeout(Berserk.behaviors.background_skrollr_init.attach, i.timeout_delay, t, i);
                M("[data-skrollr]:not(.rendered)").addClass("rendered");
                skrollr.init()
            }
        }
    }, Berserk.behaviors.background_paper_init = {
        attach: function (t, i) {
            if ("" != M("#brk-backgrounds__canvas-1:not(.rendered)").length && "" != M("#brk-backgrounds__canvas-2:not(.rendered)").length) {
                if ("undefined" == typeof paper) return console.log("Waiting for the paper library"), void setTimeout(Berserk.behaviors.background_paper_init.attach, i.timeout_delay, t, i);
                M("#brk-backgrounds__canvas-1:not(.rendered)").addClass("rendered"), M("#brk-backgrounds__canvas-2:not(.rendered)").addClass("rendered"),
                    function () {
                        var e, h, a;
                        paper.install(window), paper.setup("brk-backgrounds__canvas-1");
                        var o = new paper.Path({
                            fillColor: "rgba(255,117,69,.98)"
                        }),
                            r = view.center,
                            l = r.y / 2;

                        function i() {
                            a = view.center, e = view.size.width, h = view.size.height / 1.1, o.segments = [], o.add(view.bounds.bottomLeft);
                            for (var t = 1; t < 7; t++) {
                                var i = new paper.Point(e / 7 * t, a.y);
                                o.add(i)
                            }
                            o.add(view.bounds.bottomRight), o.fullySelected = !1
                        }
                        i(), view.onFrame = function (t) {
                            l += (a.y - r.y - l) / 10;
                            for (var i = 1; i < 7; i++) {
                                var e = t.count + 100 * (i + i % 10),
                                    s = Math.sin(e / 200) * l,
                                    n = Math.sin(e / 100) * s + h;
                                o.segments[i].point.y = n
                            }
                            o.smooth({
                                type: "continuous"
                            })
                        }, view.onMouseMove = function (t) {
                            r = t.point
                        }, view.onResize = function (t) {
                            i()
                        }
                    }(),
                    function () {
                        var e, h, a;
                        paper.install(window), paper.setup("brk-backgrounds__canvas-2");
                        var o = new paper.Path({
                            fillColor: "rgba(92,202,229,.96)"
                        }),
                            r = view.center,
                            l = r.y / 2;

                        function i() {
                            a = view.center, e = view.size.width, h = view.size.height / 6, o.segments = [], o.add(view.bounds.topLeft);
                            for (var t = 1; t < 6; t++) {
                                var i = new paper.Point(e / 6 * t, a.y);
                                o.add(i)
                            }
                            o.add(view.bounds.topRight), o.fullySelected = !1
                        }
                        i(), view.onFrame = function (t) {
                            l += (a.y - r.y - l) / 10;
                            for (var i = 1; i < 6; i++) {
                                var e = t.count + 100 * (i + i % 10),
                                    s = Math.sin(e / 200) * l,
                                    n = Math.sin(e / 100) * s + h;
                                o.segments[i].point.y = n
                            }
                            o.smooth({
                                type: "continuous"
                            })
                        }, view.onMouseMove = function (t) {
                            r = t.point
                        }, view.onResize = function (t) {
                            i()
                        }
                    }()
            }
        }
    }, Berserk.behaviors.background_hexagons_init = {
        attach: function (t, i) {
            if (M(".brk-playing-hexagons:not(.rendered)").length && M(".brk-playing-hexagons:not(.rendered)").each(function (l) {
                    var d, c, t = M(this),
                        i = t.data("hexagon-radius"),
                        e = t.data("hexagon-max-speed"),
                        s = t.data("hexagon-between"),
                        n = t.data("hexagon-line-width"),
                        h = t.data("hexagon-color"),
                        u = i || 50,
                        f = e || .1,
                        p = s || 2,
                        g = n || 1,
                        a = h || "cyan",
                        m = [],
                        v = Math.sqrt(3);

                    function y() {
                        requestAnimFrame(y), c.clearRect(0, 0, d.width, d.height), c.fillStyle = "black", c.fillRect(0, 0, d.width, d.height), c.beginPath();
                        for (var t = 0; t < m.length; t++) o(t);
                        c.shadowColor = a, c.shadowBlur = 20, c.strokeStyle = a, c.stroke()
            }

                    function o(t) {
                        var i = m[t];
                        c.moveTo(i.x + Math.cos(Math.PI / 3 * i.sl) * u + Math.cos(Math.PI / 3 * (i.sl + 2)) * u * i.p, i.y + Math.sin(Math.PI / 3 * i.sl) * u + Math.sin(Math.PI / 3 * (i.sl + 2)) * u * i.p), c.lineTo(i.x + Math.cos(Math.PI / 3 * (i.sl + 1)) * u, i.y + Math.sin(Math.PI / 3 * (i.sl + 1)) * u), c.lineTo(i.x + Math.cos(Math.PI / 3 * (i.sl + 2)) * u, i.y + Math.sin(Math.PI / 3 * (i.sl + 2)) * u), c.lineTo(i.x + Math.cos(Math.PI / 3 * (i.sl + 3)) * u, i.y + Math.sin(Math.PI / 3 * (i.sl + 3)) * u), c.lineTo(i.x + Math.cos(Math.PI / 3 * (i.sl + 3)) * u + Math.cos(Math.PI / 3 * (i.sl + 5)) * u * i.p, i.y + Math.sin(Math.PI / 3 * (i.sl + 3)) * u + Math.sin(Math.PI / 3 * (i.sl + 5)) * u * i.p), i.p += i.speed, (1 < i.p || i.p < 0) && (i.p = i.speed < 0 ? 1 : 0, i.sl += i.speed < 0 ? -1 : 1, i.sl = i.sl % 6, i.sl = i.sl < 0 ? 4 - i.sl : i.sl), m[t] = i
            }
                    t.attr("id", "brk-playing-hexagons-" + l), window.onload = function () {
                        ! function () {
                            (d = document.getElementById("brk-playing-hexagons-" + l)).width = window.innerWidth, d.height = window.innerHeight, d.style.width = d.width + "px", d.style.height = d.height + "px", (c = d.getContext("2d")).globalCompositeOperation = "source-over";
                            for (var t = Math.ceil(d.width / (1.5 * u + 2 * p)) + 1, i = Math.ceil(d.height / (v * u + 2 * p)) + 1, e = 0; e < t; e++)
                                for (var s = 0; s < i; s++) n = u + p + (1.5 * u + 2 * p) * e, h = v * u / 2 + p + (v * u + 2 * p) * s - (e % 2 ? v * u / 2 : 0), a = {
                l: 0
            }, void 0, void 0, o = Math.floor(6 * Math.random()), r = Math.random(), a || (a = {}), m.push({
                sl: a.l || 0 === a.l ? a.l : o,
                p: a.p || 0 === a.p ? a.p : r,
                x: n,
                y: h,
                speed: a.speed || 0 === a.speed ? a.speed : Math.random() * f * 2 - f
            });
                            var n, h, a, o, r;
                            c.lineWidth = g, y()
            }()
            }, window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (t) {
                        window.setTimeout(t, 1e3 / 60)
            }
            }).addClass("rendered"), M("#hexagon-glow:not(.rendered)").length) {
                M("#hexagon-glow:not(.rendered)").addClass("rendered"), Object.getOwnPropertyNames(Math).map(function (t) {
                    window[t] = Math[t]
                });
                var n, h, a, o = 96 + 4 * sqrt(3),
                    r = 32 * sqrt(3) * .5 + 2,
                    l = 48 + 4 * sqrt(3) * .5,
                    d = ["#cb3301", "#ff0066", "#ff6666", "#feff99", "#ffff67", "#ccff66", "#99fe00", "#fe99ff", "#ff99cb", "#fe349a", "#cc99fe", "#6599ff", "#00ccff", "#ffffff"].map(function (t) {
                        var i = parseInt(t.replace("#", ""), 16);
                        return {
                            r: i >> 16 & 255,
                            g: i >> 8 & 255,
                            b: 255 & i
                        }
                    }),
                    c = d.length,
                    u = 0,
                    f = document.getElementById("hexagon-glow").querySelectorAll("canvas"),
                    p = f.length,
                    g = [],
                    m = null,
                    v = 0,
                    y = function (t, i) {
                        this.x = t || 0, this.y = i || 0, this.points = {
                            hex: [],
                            hl: []
                        }, this.init = function () {
                            for (var t, i, e, s = PI / 3, n = 0; n < 6; n++) e = n * s, t = this.x + 32 * cos(e), i = this.y + 32 * sin(e), this.points.hex.push({
                                x: t,
                                y: i
                            }), 2 < n && (t = this.x + 31 * cos(e), i = this.y + 31 * sin(e), this.points.hl.push({
                                x: t,
                                y: i
                            }))
                        }, this.draw = function (t) {
                            for (var i = 0; i < 6; i++) t[(0 === i ? "move" : "line") + "To"](this.points.hex[i].x, this.points.hex[i].y)
                        }, this.highlight = function (t) {
                            for (var i = 0; i < 3; i++) t[(0 === i ? "move" : "line") + "To"](this.points.hl[i].x, this.points.hl[i].y)
                        }, this.init()
                    },
                    b = function (t, i) {
                        this.cols = i || 16, this.rows = t || 16, this.items = [], this.n = this.items.length, this.init = function () {
                            for (var t, i, e = 0; e < this.rows; e++) {
                                i = e * r;
                                for (var s = 0; s < this.cols; s++) t = (e % 2 == 0 ? 0 : l) + s * o, this.items.push(new y(t, i))
                            }
                            this.n = this.items.length
                        }, this.draw = function (t) {
                            t.fillStyle = "#171717", t.beginPath();
                            for (var i = 0; i < this.n; i++) this.items[i].draw(t);
                            t.closePath(), t.fill(), t.strokeStyle = "#2a2a2a", t.beginPath();
                            for (i = 0; i < this.n; i++) this.items[i].highlight(t);
                            t.closePath(), t.stroke()
                        }, this.init()
                    },
                    e = function () {
                        var t, i, e = getComputedStyle(f[0]);
                        n = ~~e.width.split("px")[0], h = ~~e.height.split("px")[0], a = .75 * min(n, h), t = 2 + ~~(h / r), i = 2 + ~~(n / o);
                        for (var s = 0; s < p; s++) f[s].width = n, f[s].height = h, g[s] = f[s].getContext("2d");
                        new b(t, i).draw(g[1]), m || (m = {
                            x: ~~(n / 2),
                            y: ~~(h / 2)
                        }), x()
                    },
                    x = function () {
                        var t, i = v % 80 * (1 / 80),
                            e = "rgb(" + ~~(d[u].r * (1 - i) + d[(u + 1) % c].r * i) + "," + ~~(d[u].g * (1 - i) + d[(u + 1) % c].g * i) + "," + ~~(d[u].b * (1 - i) + d[(u + 1) % c].b * i) + ")",
                            s = g[0].createRadialGradient(m.x, m.y, 0, m.x, m.y, .875 * a);
                        t = .5 - .5 * sin(7 * v * (1 / 80)) * cos(5 * v * (1 / 80)) * sin(3 * v * (1 / 80)), s.addColorStop(0, e), s.addColorStop(t, "rgba(0,0,0,.03)"), w("rgba(0,0,0,.02)"), w(s), ++v % 80 == 0 && ++u === c && (v = u = 0), requestAnimationFrame(x)
                    },
                    w = function (t) {
                        g[0].fillStyle = t, g[0].beginPath(), g[0].rect(0, 0, n, h), g[0].closePath(), g[0].fill()
                    };
                e(), addEventListener("resize", e, !1), addEventListener("mousemove", function (t) {
                    m = {
                        x: t.clientX,
                        y: t.clientY
                    }
                }, !1)
            }
        }
    }
}(jQuery);