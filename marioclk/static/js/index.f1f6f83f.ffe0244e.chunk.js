(this["webpackJsonpmy-app"] = this["webpackJsonpmy-app"] || []).push([[0], {
    112: function(t, e, a) {
        t.exports = a(220)
    },
    19: function(t, e, a) {
        t.exports = {
            canvas: "clock_canvas__2wWCz",
            welcome: "clock_welcome__3VRYC",
            welcomeModal: "clock_welcomeModal__3j08j",
            title: "clock_title__mhREr",
            content: "clock_content__2JhKw",
            button: "clock_button__3XtQp",
            warn: "clock_warn__25WM2",
            alert: "clock_alert__1t2Hy",
            alertModal: "clock_alertModal__37i7z"
        }
    },
    220: function(t, e, a) {
        "use strict";
        a.r(e);
        a(113);
        var n = a(18)
          , r = a(105)
          , c = a.n(r)
          , i = a(23)
          , s = a.n(i)
          , o = a(29)
          , h = a(41)
          , l = a(106)
          , u = a.n(l)
          , d = /Mozilla\/\d.\d \(X11/g.test(navigator.userAgent)
          , m = document.documentElement.clientWidth
          , g = document.documentElement.clientHeight
          , v = u.a.parse(window.location.search)
          , f = +v.dt || 0
          , p = 0 === f || 2 === f ? m : g
          , w = 0 === f || 2 === f ? g : m
          , b = (0 === f || 2 === f ? m : g) / 1440;
        console.log("url query", v);
        var j = "timor-welcome-v0"
          , y = a(50)
          , k = a(51)
          , x = a(109)
          , O = a(108)
          , _ = a(107)
          , M = a.n(_);
        function I(t) {
            return B.apply(this, arguments)
        }
        function B() {
            return B = Object(o.a)(s.a.mark((function t(e) {
                var a, n, r, c = arguments;
                return s.a.wrap((function(t) {
                    for (; ; )
                        switch (t.prev = t.next) {
                        case 0:
                            return a = c.length > 1 && void 0 !== c[1] ? c[1] : {},
                            n = a.scale,
                            r = void 0 === n ? 1 : n,
                            t.abrupt("return", new Promise((function(t, a) {
                                var n = new Image;
                                n.onload = function() {
                                    t("number" === typeof r ? S(n, r) : n)
                                }
                                ,
                                n.src = e
                            }
                            )));
                        case 3:
                        case "end":
                            return t.stop()
                        }
                }
                ), t)
            }
            ))),
            B.apply(this, arguments)
        }
        function S(t, e) {
            return t.scaled || (t.scaled = !0,
            t._width = t.width,
            t._height = t.height,
            t.width = Math.floor(t.width * e),
            t.height = Math.floor(t.height * e)),
            t
        }
        var G = {
            0: [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]],
            1: [[0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]],
            2: [[1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 0], [1, 1, 1]],
            3: [[1, 1, 1], [0, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
            4: [[1, 0, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [0, 0, 1]],
            5: [[1, 1, 1], [1, 0, 0], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
            6: [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
            7: [[1, 1, 1], [1, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]],
            8: [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
            9: [[1, 1, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
            ":": [[0, 0, 0], [0, 1, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]],
            "-": [[0, 0, 0], [0, 0, 0], [1, 1, 1], [0, 0, 0], [0, 0, 0]],
            " ": [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
        }
          , N = a(71)
          , C = a.n(N);
        function H(t, e) {
            var a = t
              , n = e;
            if ("string" === typeof a) {
                var r = +a.replace("%", "");
                a = Math.floor(r / 100 * p)
            }
            if ("string" === typeof n && C()(n, "%")) {
                var c = +n.replace("%", "");
                n = Math.floor(c / 100 * p)
            } else if ("string" === typeof n && C()(n, "vh")) {
                var i = +n.replace("vh", "");
                n = Math.floor(i / 100 * w)
            }
            return {
                x: a,
                y: w - n
            }
        }
        var L = function(t) {
            Object(x.a)(a, t);
            var e = Object(O.a)(a);
            function a(t) {
                var n;
                return Object(y.a)(this, a),
                (n = e.call(this, t)).loadResource(),
                n
            }
            return Object(k.a)(a, [{
                key: "emit",
                value: function(t) {
                    var e = this.event[t];
                    if (e) {
                        for (var a = arguments.length, n = new Array(a > 1 ? a - 1 : 0), r = 1; r < a; r++)
                            n[r - 1] = arguments[r];
                        e.apply(void 0, n)
                    }
                }
            }, {
                key: "loadResource",
                value: function() {
                    var t = Object(o.a)(s.a.mark((function t() {
                        var e, a, n, r, c, i = this;
                        return s.a.wrap((function(t) {
                            for (; ; )
                                switch (t.prev = t.next) {
                                case 0:
                                    return e = this.config.time,
                                    a = e.scale,
                                    t.next = 4,
                                    I("./img/brick-bg.png", {
                                        scale: b
                                    });
                                case 4:
                                    return this.brickBG = t.sent,
                                    this.emit("onLoad", {
                                        name: "./img/brick-bg.png",
                                        count: 7,
                                        current: 1
                                    }),
                                    t.next = 8,
                                    I("./img/hill.png", {
                                        scale: b
                                    });
                                case 8:
                                    return n = t.sent,
                                    this.emit("onLoad", {
                                        name: "./img/hill.png",
                                        count: 7,
                                        current: 2
                                    }),
                                    t.next = 12,
                                    I("./img/grass-m.png", {
                                        scale: b
                                    });
                                case 12:
                                    return r = t.sent,
                                    this.emit("onLoad", {
                                        name: "./img/grass-m.png",
                                        count: 7,
                                        current: 3
                                    }),
                                    t.next = 16,
                                    I("./img/pipe.png", {
                                        scale: b
                                    });
                                case 16:
                                    return c = t.sent,
                                    this.emit("onLoad", {
                                        name: "./img/pipe.png",
                                        count: 7,
                                        current: 4
                                    }),
                                    t.next = 20,
                                    I("./img/brick.png", {
                                        scale: +a || b
                                    });
                                case 20:
                                    return this.fontBG = t.sent,
                                    this.emit("onLoad", {
                                        name: "./img/brick.png",
                                        count: 7,
                                        current: 5
                                    }),
                                    t.next = 24,
                                    I("./img/cloud-m.png", {
                                        scale: b
                                    });
                                case 24:
                                    return this.cloudBG = t.sent,
                                    this.emit("onLoad", {
                                        name: "./img/cloud-m.png",
                                        count: 7,
                                        current: 6
                                    }),
                                    t.next = 28,
                                    I("./img/mario.png");
                                case 28:
                                    this.marioStopBG = t.sent,
                                    setTimeout((function() {
                                        i.emit("onLoad", {
                                            name: "./img/mario.png",
                                            count: 7,
                                            current: 7
                                        })
                                    }
                                    ), 2e3),
                                    this.hillBG = {
                                        hill: n,
                                        grass: r,
                                        pipe: c
                                    },
                                    this.start();
                                case 32:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t, this)
                    }
                    )));
                    return function() {
                        return t.apply(this, arguments)
                    }
                }()
            }, {
                key: "start",
                value: function() {
                    var t = this;
                    this.timer = setInterval((function() {
                        t.clearCanvas(),
                        t.drawBottom(),
                        t.drawHill(),
                        t.drawSky(),
                        t.drawMario(),
                        t.drawTime()
                    }
                    ), 1e3)
                }
            }, {
                key: "drawBottom",
                value: function() {
                    for (var t = this.config.bottom.row, e = this.brickBG, a = Math.ceil(p / e.width), n = 0; n < t; n++)
                        for (var r = 0; r < a; r++) {
                            var c = H(r * e.width, (n + 1) * e.height);
                            this.drawImage(e, c.x, c.y)
                        }
                }
            }, {
                key: "drawHill",
                value: function() {
                    var t = this.hillBG
                      , e = t.hill
                      , a = t.grass
                      , n = t.pipe
                      , r = this.config.bottom
                      , c = this.brickBG
                      , i = r.row
                      , s = H("10%", i * c.height + e.height)
                      , o = H("40%", i * c.height + a.height)
                      , h = H("80%", i * c.height + n.height);
                    this.drawImage(e, s.x, s.y),
                    this.drawImage(a, o.x, o.y),
                    this.drawImage(n, h.x, h.y)
                }
            }, {
                key: "drawSky",
                value: function() {
                    var t = this.cloudBG
                      , e = H("12%", "98vh")
                      , a = H("60%", "90vh")
                      , n = H("80%", "94vh");
                    this.drawImage(t, e.x, e.y),
                    this.drawImage(t, a.x, a.y),
                    this.drawImage(t, n.x, n.y)
                }
            }, {
                key: "drawMario",
                value: function() {
                    var t = this.config.bottom
                      , e = this.brickBG
                      , a = t.row
                      , n = this.marioStopBG
                      , r = H("4%", a * e.height + n.height);
                    this.drawImage(n, r.x, r.y)
                }
            }, {
                key: "drawChar",
                value: function(t, e, a, n) {
                    var r = H(a, n)
                      , c = r.x
                      , i = r.y
                      , s = G[e];
                    if (void 0 === s)
                        return !1;
                    for (var o = 0; o < s.length; o++) {
                        i = r.y + o * t.height;
                        for (var h = 0; h < s[o].length; h++) {
                            var l = s[o][h];
                            c = r.x + h * t.width,
                            l && this.drawImage(t, c, i)
                        }
                    }
                }
            }, {
                key: "drawTime",
                value: function() {
                    var t = this
                      , e = this.config.time
                      , a = e.format || "HH:mm"
                      , n = this.fontBG
                      , r = e.alignX
                      , c = e.alignY
                      , i = n.width * G[0][0].length
                      , s = n.height * G[0].length
                      , o = n.width
                      , h = M()();
                    d && (h = h.add(8, "h"));
                    var l = h.format(a)
                      , u = 0;
                    if ("center" === r) {
                        var m = (i + o) * l.length;
                        u = Math.floor((p - m) / 2)
                    }
                    "center" === c && (c = Math.floor((w + s) / 2)),
                    l.split("").forEach((function(e, a) {
                        t.drawChar(n, e, u + (i + o) * a, c)
                    }
                    ))
                }
            }]),
            a
        }(function() {
            function t(e) {
                Object(y.a)(this, t),
                this.$canvas = e.canvas,
                this.canvas = e.canvas.getContext("2d"),
                this.config = e.config,
                this.event = e.event || {},
                this.rorateCanvas(f)
            }
            return Object(k.a)(t, [{
                key: "clearCanvas",
                value: function() {
                    this.canvas.fillStyle = "#fff",
                    this.canvas.clearRect(0, 0, p, w),
                    this.canvas.fillRect(0, 0, p, w)
                }
            }, {
                key: "drawImage",
                value: function(t, e, a) {
                    this.canvas.drawImage(t, e, a, t.width, t.height)
                }
            }, {
                key: "rorateCanvas",
                value: function(t) {
                    switch (t) {
                    case 0:
                        this.canvas.rotate(0),
                        this.canvas.translate(0, 0);
                        break;
                    case 1:
                        this.canvas.rotate(90 * Math.PI / 180),
                        this.canvas.translate(0, -m);
                        break;
                    case 2:
                        this.canvas.rotate(180 * Math.PI / 180),
                        this.canvas.translate(-m, -g);
                        break;
                    case 3:
                        this.canvas.rotate(270 * Math.PI / 180),
                        this.canvas.translate(-g, 0)
                    }
                }
            }]),
            t
        }())
          , R = a(19)
          , E = a.n(R)
          , P = a(8);
        function X() {
            var t = Object(n.useState)({
                width: m,
                height: g
            })
              , e = Object(h.a)(t, 1)[0]
              , a = Object(n.useState)(!1)
              , r = Object(h.a)(a, 2)
              , c = r[0]
              , i = r[1]
              , l = Object(n.useRef)(null)
              , u = Object(n.useRef)(null)
              , f = Object(n.useState)("loading")
              , p = Object(h.a)(f, 2)
              , w = p[0]
              , b = p[1]
              , y = Object(n.useState)("\u6b63\u5728\u52a0\u8f7d\u4e2d...")
              , k = Object(h.a)(y, 2)
              , x = k[0]
              , O = k[1];
            Object(n.useEffect)((function() {
                try {
                    if (window.localStorage) {
                        var t = window.localStorage.getItem(j);
                        i("true" !== t || void 0 !== v.wc)
                    }
                } catch (e) {
                    alert("read localStorage error: " + e.message)
                }
            }
            ), []);
            var _ = function(t) {
                O("\u6b63\u5728\u52a0\u8f7d\u8d44\u6e90\u6587\u4ef6[".concat(t.current, ":").concat(t.count, "]: ").concat(t.name)),
                t.current === t.count && b("success")
            };
            Object(n.useEffect)((function() {
                function t() {
                    return (t = Object(o.a)(s.a.mark((function t() {
                        return s.a.wrap((function(t) {
                            for (; ; )
                                switch (t.prev = t.next) {
                                case 0:
                                    u.current = new L({
                                        canvas: l.current,
                                        event: {
                                            onLoad: _
                                        },
                                        config: {
                                            bottom: {
                                                row: 2
                                            },
                                            time: {
                                                format: v.t || "HH:mm:ss",
                                                scale: v.ts,
                                                alignX: "center",
                                                alignY: v.th || (d ? "70vh" : "center")
                                            }
                                        }
                                    });
                                case 1:
                                case "end":
                                    return t.stop()
                                }
                        }
                        ), t)
                    }
                    )))).apply(this, arguments)
                }
                c || l.current && function() {
                    t.apply(this, arguments)
                }()
            }
            ), [l, c]);
            if (c)
                return Object(P.jsx)("div", {
                    className: E.a.welcome,
                    style: {
                        width: "".concat(m, "px")
                    },
                    children: Object(P.jsxs)("div", {
                        className: E.a.welcomeModal,
                        children: [Object(P.jsx)("div", {
                            className: E.a.title,
                            children: "\u6b22\u8fce\u6765\u5230 \u63d0\u83ab\u7684\u795e\u79d8\u5546\u5e97"
                        }), Object(P.jsxs)("div", {
                            className: E.a.content,
                            children: [Object(P.jsxs)("p", {
                                children: ["1. \u5b98\u65b9\u6587\u6863\u6559\u7a0b\uff1a", Object(P.jsx)("a", {
                                    href: "https://timor.tech/project/clock",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    children: "https://timor.tech/project/clock"
                                })]
                            }), Object(P.jsx)("p", {
                                children: "2. \u6b64\u65f6\u949f\u670d\u52a1\u6c38\u4e45\u514d\u8d39\u3001\u65e0\u5e7f\u544a\u3001\u65e0\u4efb\u4f55\u7834\u574f\u6027\u4ee3\u7801"
                            }), Object(P.jsx)("p", {
                                children: "3. \u6b64\u670d\u52a1\u6211\u4f1a\u4e00\u76f4\u66f4\u65b0\u8fed\u4ee3\uff0c\u540e\u7eed\u6709\u5f88\u591a\u5176\u5b83\u73a9\u6cd5\uff0c\u6b22\u8fce\u63d0\u9700\u6c42\u7ed9\u6211\uff0c\u5c3d\u91cf\u5b9e\u73b0"
                            }), Object(P.jsx)("p", {
                                children: "4. \u4ee3\u7801\u5229\u7528\u4e1a\u4f59\u65f6\u95f4\u7f16\u5199\uff0c\u5982\u679c\u89c9\u5f97\u5bf9\u4f60\u6709\u7528\uff0c\u8bf7\u6211\u559d\u4e00\u676f\u5496\u5561\u6216\u5403\u4e00\u5305\u8fa3\u6761"
                            }), Object(P.jsx)("p", {
                                className: E.a.warn,
                                children: "\u58f0\u660e\uff1agame&watch \u521b\u610f\u5f52 Nintendo\u2122 \u6240\u6709\uff0c\u672c\u670d\u52a1\u4ec5\u4f9b\u4ea4\u6d41\u5b66\u4e60\u4f7f\u7528\uff0c\u4e0d\u5f97\u7528\u4e8e\u5546\u4e1a\u7528\u9014\uff0c\u4ee5\u6b64\u4ea7\u751f\u7684\u6240\u6709\u6cd5\u5f8b\u7ea0\u7eb7\uff0c\u4e0e\u672c\u7ad9\u65e0\u5173"
                            }), Object(P.jsx)("p", {
                                children: "\u66f4\u591a\u4fe1\u606f\uff0c\u8bf7\u67e5\u770b\u5b98\u65b9\u6587\u6863"
                            })]
                        }), Object(P.jsx)("div", {
                            className: E.a.button,
                            onClick: function() {
                                i(!1);
                                try {
                                    window.localStorage.setItem(j, "true")
                                } catch (t) {
                                    alert("write localStorage error: " + t.message)
                                }
                            },
                            children: "\u6211\u77e5\u9053\u4e86"
                        })]
                    })
                });
            return Object(P.jsxs)("div", {
                className: E.a.mario,
                children: ["loading" !== w ? null : Object(P.jsx)("div", {
                    className: E.a.alert,
                    children: Object(P.jsx)("div", {
                        className: E.a.alertModal,
                        children: Object(P.jsx)("div", {
                            className: E.a.content,
                            children: x
                        })
                    })
                }), Object(P.jsx)("canvas", {
                    className: E.a.canvas,
                    ref: l,
                    width: e.width,
                    height: e.height
                })]
            })
        }
        c.a.render(Object(P.jsx)(X, {}), document.getElementById("root"))
    }
}, [[112, 2, 4]]]);
