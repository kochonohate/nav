(function(e) {
    let n = e.performance;
    function c(L) {
        n && n.mark && n.mark(L)
    }
    function r(L, t) {
        n && n.measure && n.measure(L, t)
    }
    c("Zone");
    let a = e.__Zone_symbol_prefix || "__zone_symbol__";
    function l(L) {
        return a + L
    }
    let y = e[l("forceDuplicateZoneCheck")] === !0;
    if (e.Zone) {
        if (y || typeof e.Zone.__symbol__ != "function")
            throw new Error("Zone already loaded.");
        return e.Zone
    }
    let oe = class oe {
        static assertZonePatched() {
            if (e.Promise !== re.ZoneAwarePromise)
                throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")
        }
        static get root() {
            let t = oe.current;
            for (; t.parent; )
                t = t.parent;
            return t
        }
        static get current() {
            return U.zone
        }
        static get currentTask() {
            return te
        }
        static __load_patch(t, s, o=!1) {
            if (re.hasOwnProperty(t)) {
                if (!o && y)
                    throw Error("Already loaded patch: " + t)
            } else if (!e["__Zone_disable_" + t]) {
                let v = "Zone:" + t;
                c(v),
                re[t] = s(e, oe, z),
                r(v, v)
            }
        }
        get parent() {
            return this._parent
        }
        get name() {
            return this._name
        }
        constructor(t, s) {
            this._parent = t,
            this._name = s ? s.name || "unnamed" : "<root>",
            this._properties = s && s.properties || {},
            this._zoneDelegate = new k(this,this._parent && this._parent._zoneDelegate,s)
        }
        get(t) {
            let s = this.getZoneWith(t);
            if (s)
                return s._properties[t]
        }
        getZoneWith(t) {
            let s = this;
            for (; s; ) {
                if (s._properties.hasOwnProperty(t))
                    return s;
                s = s._parent
            }
            return null
        }
        fork(t) {
            if (!t)
                throw new Error("ZoneSpec required!");
            return this._zoneDelegate.fork(this, t)
        }
        wrap(t, s) {
            if (typeof t != "function")
                throw new Error("Expecting function got: " + t);
            let o = this._zoneDelegate.intercept(this, t, s)
              , v = this;
            return function() {
                return v.runGuarded(o, this, arguments, s)
            }
        }
        run(t, s, o, v) {
            U = {
                parent: U,
                zone: this
            };
            try {
                return this._zoneDelegate.invoke(this, t, s, o, v)
            } finally {
                U = U.parent
            }
        }
        runGuarded(t, s=null, o, v) {
            U = {
                parent: U,
                zone: this
            };
            try {
                try {
                    return this._zoneDelegate.invoke(this, t, s, o, v)
                } catch (F) {
                    if (this._zoneDelegate.handleError(this, F))
                        throw F
                }
            } finally {
                U = U.parent
            }
        }
        runTask(t, s, o) {
            if (t.zone != this)
                throw new Error("A task can only be run in the zone of creation! (Creation: " + (t.zone || $).name + "; Execution: " + this.name + ")");
            if (t.state === H && (t.type === K || t.type === P))
                return;
            let v = t.state != T;
            v && t._transitionTo(T, M),
            t.runCount++;
            let F = te;
            te = t,
            U = {
                parent: U,
                zone: this
            };
            try {
                t.type == P && t.data && !t.data.isPeriodic && (t.cancelFn = void 0);
                try {
                    return this._zoneDelegate.invokeTask(this, t, s, o)
                } catch (u) {
                    if (this._zoneDelegate.handleError(this, u))
                        throw u
                }
            } finally {
                t.state !== H && t.state !== d && (t.type == K || t.data && t.data.isPeriodic ? v && t._transitionTo(M, T) : (t.runCount = 0,
                this._updateTaskCount(t, -1),
                v && t._transitionTo(H, T, H))),
                U = U.parent,
                te = F
            }
        }
        scheduleTask(t) {
            if (t.zone && t.zone !== this) {
                let o = this;
                for (; o; ) {
                    if (o === t.zone)
                        throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${t.zone.name}`);
                    o = o.parent
                }
            }
            t._transitionTo(X, H);
            let s = [];
            t._zoneDelegates = s,
            t._zone = this;
            try {
                t = this._zoneDelegate.scheduleTask(this, t)
            } catch (o) {
                throw t._transitionTo(d, X, H),
                this._zoneDelegate.handleError(this, o),
                o
            }
            return t._zoneDelegates === s && this._updateTaskCount(t, 1),
            t.state == X && t._transitionTo(M, X),
            t
        }
        scheduleMicroTask(t, s, o, v) {
            return this.scheduleTask(new m(N,t,s,o,v,void 0))
        }
        scheduleMacroTask(t, s, o, v, F) {
            return this.scheduleTask(new m(P,t,s,o,v,F))
        }
        scheduleEventTask(t, s, o, v, F) {
            return this.scheduleTask(new m(K,t,s,o,v,F))
        }
        cancelTask(t) {
            if (t.zone != this)
                throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (t.zone || $).name + "; Execution: " + this.name + ")");
            if (!(t.state !== M && t.state !== T)) {
                t._transitionTo(x, M, T);
                try {
                    this._zoneDelegate.cancelTask(this, t)
                } catch (s) {
                    throw t._transitionTo(d, x),
                    this._zoneDelegate.handleError(this, s),
                    s
                }
                return this._updateTaskCount(t, -1),
                t._transitionTo(H, x),
                t.runCount = 0,
                t
            }
        }
        _updateTaskCount(t, s) {
            let o = t._zoneDelegates;
            s == -1 && (t._zoneDelegates = null);
            for (let v = 0; v < o.length; v++)
                o[v]._updateTaskCount(t.type, s)
        }
    }
    ;
    oe.__symbol__ = l;
    let _ = oe
      , b = {
        name: "",
        onHasTask: (L, t, s, o) => L.hasTask(s, o),
        onScheduleTask: (L, t, s, o) => L.scheduleTask(s, o),
        onInvokeTask: (L, t, s, o, v, F) => L.invokeTask(s, o, v, F),
        onCancelTask: (L, t, s, o) => L.cancelTask(s, o)
    };
    class k {
        constructor(t, s, o) {
            this._taskCounts = {
                microTask: 0,
                macroTask: 0,
                eventTask: 0
            },
            this.zone = t,
            this._parentDelegate = s,
            this._forkZS = o && (o && o.onFork ? o : s._forkZS),
            this._forkDlgt = o && (o.onFork ? s : s._forkDlgt),
            this._forkCurrZone = o && (o.onFork ? this.zone : s._forkCurrZone),
            this._interceptZS = o && (o.onIntercept ? o : s._interceptZS),
            this._interceptDlgt = o && (o.onIntercept ? s : s._interceptDlgt),
            this._interceptCurrZone = o && (o.onIntercept ? this.zone : s._interceptCurrZone),
            this._invokeZS = o && (o.onInvoke ? o : s._invokeZS),
            this._invokeDlgt = o && (o.onInvoke ? s : s._invokeDlgt),
            this._invokeCurrZone = o && (o.onInvoke ? this.zone : s._invokeCurrZone),
            this._handleErrorZS = o && (o.onHandleError ? o : s._handleErrorZS),
            this._handleErrorDlgt = o && (o.onHandleError ? s : s._handleErrorDlgt),
            this._handleErrorCurrZone = o && (o.onHandleError ? this.zone : s._handleErrorCurrZone),
            this._scheduleTaskZS = o && (o.onScheduleTask ? o : s._scheduleTaskZS),
            this._scheduleTaskDlgt = o && (o.onScheduleTask ? s : s._scheduleTaskDlgt),
            this._scheduleTaskCurrZone = o && (o.onScheduleTask ? this.zone : s._scheduleTaskCurrZone),
            this._invokeTaskZS = o && (o.onInvokeTask ? o : s._invokeTaskZS),
            this._invokeTaskDlgt = o && (o.onInvokeTask ? s : s._invokeTaskDlgt),
            this._invokeTaskCurrZone = o && (o.onInvokeTask ? this.zone : s._invokeTaskCurrZone),
            this._cancelTaskZS = o && (o.onCancelTask ? o : s._cancelTaskZS),
            this._cancelTaskDlgt = o && (o.onCancelTask ? s : s._cancelTaskDlgt),
            this._cancelTaskCurrZone = o && (o.onCancelTask ? this.zone : s._cancelTaskCurrZone),
            this._hasTaskZS = null,
            this._hasTaskDlgt = null,
            this._hasTaskDlgtOwner = null,
            this._hasTaskCurrZone = null;
            let v = o && o.onHasTask
              , F = s && s._hasTaskZS;
            (v || F) && (this._hasTaskZS = v ? o : b,
            this._hasTaskDlgt = s,
            this._hasTaskDlgtOwner = this,
            this._hasTaskCurrZone = t,
            o.onScheduleTask || (this._scheduleTaskZS = b,
            this._scheduleTaskDlgt = s,
            this._scheduleTaskCurrZone = this.zone),
            o.onInvokeTask || (this._invokeTaskZS = b,
            this._invokeTaskDlgt = s,
            this._invokeTaskCurrZone = this.zone),
            o.onCancelTask || (this._cancelTaskZS = b,
            this._cancelTaskDlgt = s,
            this._cancelTaskCurrZone = this.zone))
        }
        fork(t, s) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, t, s) : new _(t,s)
        }
        intercept(t, s, o) {
            return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, t, s, o) : s
        }
        invoke(t, s, o, v, F) {
            return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, t, s, o, v, F) : s.apply(o, v)
        }
        handleError(t, s) {
            return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, t, s) : !0
        }
        scheduleTask(t, s) {
            let o = s;
            if (this._scheduleTaskZS)
                this._hasTaskZS && o._zoneDelegates.push(this._hasTaskDlgtOwner),
                o = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, t, s),
                o || (o = s);
            else if (s.scheduleFn)
                s.scheduleFn(s);
            else if (s.type == N)
                R(s);
            else
                throw new Error("Task is missing scheduleFn.");
            return o
        }
        invokeTask(t, s, o, v) {
            return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, t, s, o, v) : s.callback.apply(o, v)
        }
        cancelTask(t, s) {
            let o;
            if (this._cancelTaskZS)
                o = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, t, s);
            else {
                if (!s.cancelFn)
                    throw Error("Task is not cancelable");
                o = s.cancelFn(s)
            }
            return o
        }
        hasTask(t, s) {
            try {
                this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, t, s)
            } catch (o) {
                this.handleError(t, o)
            }
        }
        _updateTaskCount(t, s) {
            let o = this._taskCounts
              , v = o[t]
              , F = o[t] = v + s;
            if (F < 0)
                throw new Error("More tasks executed then were scheduled.");
            if (v == 0 || F == 0) {
                let u = {
                    microTask: o.microTask > 0,
                    macroTask: o.macroTask > 0,
                    eventTask: o.eventTask > 0,
                    change: t
                };
                this.hasTask(this.zone, u)
            }
        }
    }
    class m {
        constructor(t, s, o, v, F, u) {
            if (this._zone = null,
            this.runCount = 0,
            this._zoneDelegates = null,
            this._state = "notScheduled",
            this.type = t,
            this.source = s,
            this.data = v,
            this.scheduleFn = F,
            this.cancelFn = u,
            !o)
                throw new Error("callback is not defined");
            this.callback = o;
            let f = this;
            t === K && v && v.useG ? this.invoke = m.invokeTask : this.invoke = function() {
                return m.invokeTask.call(e, f, this, arguments)
            }
        }
        static invokeTask(t, s, o) {
            t || (t = this),
            Q++;
            try {
                return t.runCount++,
                t.zone.runTask(t, s, o)
            } finally {
                Q == 1 && E(),
                Q--
            }
        }
        get zone() {
            return this._zone
        }
        get state() {
            return this._state
        }
        cancelScheduleRequest() {
            this._transitionTo(H, X)
        }
        _transitionTo(t, s, o) {
            if (this._state === s || this._state === o)
                this._state = t,
                t == H && (this._zoneDelegates = null);
            else
                throw new Error(`${this.type} '${this.source}': can not transition to '${t}', expecting state '${s}'${o ? " or '" + o + "'" : ""}, was '${this._state}'.`)
        }
        toString() {
            return this.data && typeof this.data.handleId < "u" ? this.data.handleId.toString() : Object.prototype.toString.call(this)
        }
        toJSON() {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
            }
        }
    }
    let I = l("setTimeout"), Z = l("Promise"), O = l("then"), B = [], A = !1, J;
    function q(L) {
        if (J || e[Z] && (J = e[Z].resolve(0)),
        J) {
            let t = J[O];
            t || (t = J.then),
            t.call(J, L)
        } else
            e[I](L, 0)
    }
    function R(L) {
        Q === 0 && B.length === 0 && q(E),
        L && B.push(L)
    }
    function E() {
        if (!A) {
            for (A = !0; B.length; ) {
                let L = B;
                B = [];
                for (let t = 0; t < L.length; t++) {
                    let s = L[t];
                    try {
                        s.zone.runTask(s, null, null)
                    } catch (o) {
                        z.onUnhandledError(o)
                    }
                }
            }
            z.microtaskDrainDone(),
            A = !1
        }
    }
    let $ = {
        name: "NO ZONE"
    }
      , H = "notScheduled"
      , X = "scheduling"
      , M = "scheduled"
      , T = "running"
      , x = "canceling"
      , d = "unknown"
      , N = "microTask"
      , P = "macroTask"
      , K = "eventTask"
      , re = {}
      , z = {
        symbol: l,
        currentZoneFrame: () => U,
        onUnhandledError: W,
        microtaskDrainDone: W,
        scheduleMicroTask: R,
        showUncaughtError: () => !_[l("ignoreConsoleErrorUncaughtError")],
        patchEventTarget: () => [],
        patchOnProperties: W,
        patchMethod: () => W,
        bindArguments: () => [],
        patchThen: () => W,
        patchMacroTask: () => W,
        patchEventPrototype: () => W,
        isIEOrEdge: () => !1,
        getGlobalObjects: () => {}
        ,
        ObjectDefineProperty: () => W,
        ObjectGetOwnPropertyDescriptor: () => {}
        ,
        ObjectCreate: () => {}
        ,
        ArraySlice: () => [],
        patchClass: () => W,
        wrapWithCurrentZone: () => W,
        filterProperties: () => [],
        attachOriginToPatched: () => W,
        _redefineProperty: () => W,
        patchCallbacks: () => W,
        nativeScheduleMicroTask: q
    }
      , U = {
        parent: null,
        zone: new _(null,null)
    }
      , te = null
      , Q = 0;
    function W() {}
    return r("Zone", "Zone"),
    e.Zone = _
}
)(globalThis);
var me = Object.getOwnPropertyDescriptor
  , Ne = Object.defineProperty
  , Ie = Object.getPrototypeOf
  , it = Object.create
  , ct = Array.prototype.slice
  , Me = "addEventListener"
  , Le = "removeEventListener"
  , Se = Zone.__symbol__(Me)
  , De = Zone.__symbol__(Le)
  , ie = "true"
  , ce = "false"
  , pe = Zone.__symbol__("");
function Ae(e, n) {
    return Zone.current.wrap(e, n)
}
function je(e, n, c, r, a) {
    return Zone.current.scheduleMacroTask(e, n, c, r, a)
}
var j = Zone.__symbol__
  , Pe = typeof window < "u"
  , Te = Pe ? window : void 0
  , Y = Pe && Te || globalThis
  , at = "removeAttribute";
function He(e, n) {
    for (let c = e.length - 1; c >= 0; c--)
        typeof e[c] == "function" && (e[c] = Ae(e[c], n + "_" + c));
    return e
}
function lt(e, n) {
    let c = e.constructor.name;
    for (let r = 0; r < n.length; r++) {
        let a = n[r]
          , l = e[a];
        if (l) {
            let y = me(e, a);
            if (!Ye(y))
                continue;
            e[a] = (_ => {
                let b = function() {
                    return _.apply(this, He(arguments, c + "." + a))
                };
                return ae(b, _),
                b
            }
            )(l)
        }
    }
}
function Ye(e) {
    return e ? e.writable === !1 ? !1 : !(typeof e.get == "function" && typeof e.set > "u") : !0
}
var $e = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope
  , we = !("nw"in Y) && typeof Y.process < "u" && {}.toString.call(Y.process) === "[object process]"
  , xe = !we && !$e && !!(Pe && Te.HTMLElement)
  , Je = typeof Y.process < "u" && {}.toString.call(Y.process) === "[object process]" && !$e && !!(Pe && Te.HTMLElement)
  , be = {}
  , We = function(e) {
    if (e = e || Y.event,
    !e)
        return;
    let n = be[e.type];
    n || (n = be[e.type] = j("ON_PROPERTY" + e.type));
    let c = this || e.target || Y, r = c[n], a;
    if (xe && c === Te && e.type === "error") {
        let l = e;
        a = r && r.call(this, l.message, l.filename, l.lineno, l.colno, l.error),
        a === !0 && e.preventDefault()
    } else
        a = r && r.apply(this, arguments),
        a != null && !a && e.preventDefault();
    return a
};
function qe(e, n, c) {
    let r = me(e, n);
    if (!r && c && me(c, n) && (r = {
        enumerable: !0,
        configurable: !0
    }),
    !r || !r.configurable)
        return;
    let a = j("on" + n + "patched");
    if (e.hasOwnProperty(a) && e[a])
        return;
    delete r.writable,
    delete r.value;
    let l = r.get
      , y = r.set
      , _ = n.slice(2)
      , b = be[_];
    b || (b = be[_] = j("ON_PROPERTY" + _)),
    r.set = function(k) {
        let m = this;
        if (!m && e === Y && (m = Y),
        !m)
            return;
        typeof m[b] == "function" && m.removeEventListener(_, We),
        y && y.call(m, null),
        m[b] = k,
        typeof k == "function" && m.addEventListener(_, We, !1)
    }
    ,
    r.get = function() {
        let k = this;
        if (!k && e === Y && (k = Y),
        !k)
            return null;
        let m = k[b];
        if (m)
            return m;
        if (l) {
            let I = l.call(this);
            if (I)
                return r.set.call(this, I),
                typeof k[at] == "function" && k.removeAttribute(n),
                I
        }
        return null
    }
    ,
    Ne(e, n, r),
    e[a] = !0
}
function Ke(e, n, c) {
    if (n)
        for (let r = 0; r < n.length; r++)
            qe(e, "on" + n[r], c);
    else {
        let r = [];
        for (let a in e)
            a.slice(0, 2) == "on" && r.push(a);
        for (let a = 0; a < r.length; a++)
            qe(e, r[a], c)
    }
}
var ne = j("originalInstance");
function ge(e) {
    let n = Y[e];
    if (!n)
        return;
    Y[j(e)] = n,
    Y[e] = function() {
        let a = He(arguments, e);
        switch (a.length) {
        case 0:
            this[ne] = new n;
            break;
        case 1:
            this[ne] = new n(a[0]);
            break;
        case 2:
            this[ne] = new n(a[0],a[1]);
            break;
        case 3:
            this[ne] = new n(a[0],a[1],a[2]);
            break;
        case 4:
            this[ne] = new n(a[0],a[1],a[2],a[3]);
            break;
        default:
            throw new Error("Arg list too long.")
        }
    }
    ,
    ae(Y[e], n);
    let c = new n(function() {}
    ), r;
    for (r in c)
        e === "XMLHttpRequest" && r === "responseBlob" || function(a) {
            typeof c[a] == "function" ? Y[e].prototype[a] = function() {
                return this[ne][a].apply(this[ne], arguments)
            }
            : Ne(Y[e].prototype, a, {
                set: function(l) {
                    typeof l == "function" ? (this[ne][a] = Ae(l, e + "." + a),
                    ae(this[ne][a], l)) : this[ne][a] = l
                },
                get: function() {
                    return this[ne][a]
                }
            })
        }(r);
    for (r in n)
        r !== "prototype" && n.hasOwnProperty(r) && (Y[e][r] = n[r])
}
function le(e, n, c) {
    let r = e;
    for (; r && !r.hasOwnProperty(n); )
        r = Ie(r);
    !r && e[n] && (r = e);
    let a = j(n)
      , l = null;
    if (r && (!(l = r[a]) || !r.hasOwnProperty(a))) {
        l = r[a] = r[n];
        let y = r && me(r, n);
        if (Ye(y)) {
            let _ = c(l, a, n);
            r[n] = function() {
                return _(this, arguments)
            }
            ,
            ae(r[n], l)
        }
    }
    return l
}
function ut(e, n, c) {
    let r = null;
    function a(l) {
        let y = l.data;
        return y.args[y.cbIdx] = function() {
            l.invoke.apply(this, arguments)
        }
        ,
        r.apply(y.target, y.args),
        l
    }
    r = le(e, n, l => function(y, _) {
        let b = c(y, _);
        return b.cbIdx >= 0 && typeof _[b.cbIdx] == "function" ? je(b.name, _[b.cbIdx], b, a) : l.apply(y, _)
    }
    )
}
function ae(e, n) {
    e[j("OriginalDelegate")] = n
}
var Xe = !1
  , Ze = !1;
function ft() {
    try {
        let e = Te.navigator.userAgent;
        if (e.indexOf("MSIE ") !== -1 || e.indexOf("Trident/") !== -1)
            return !0
    } catch {}
    return !1
}
function ht() {
    if (Xe)
        return Ze;
    Xe = !0;
    try {
        let e = Te.navigator.userAgent;
        (e.indexOf("MSIE ") !== -1 || e.indexOf("Trident/") !== -1 || e.indexOf("Edge/") !== -1) && (Ze = !0)
    } catch {}
    return Ze
}
Zone.__load_patch("ZoneAwarePromise", (e, n, c) => {
    let r = Object.getOwnPropertyDescriptor
      , a = Object.defineProperty;
    function l(u) {
        if (u && u.toString === Object.prototype.toString) {
            let f = u.constructor && u.constructor.name;
            return (f || "") + ": " + JSON.stringify(u)
        }
        return u ? u.toString() : Object.prototype.toString.call(u)
    }
    let y = c.symbol
      , _ = []
      , b = e[y("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== !1
      , k = y("Promise")
      , m = y("then")
      , I = "__creationTrace__";
    c.onUnhandledError = u => {
        if (c.showUncaughtError()) {
            let f = u && u.rejection;
            f ? console.error("Unhandled Promise rejection:", f instanceof Error ? f.message : f, "; Zone:", u.zone.name, "; Task:", u.task && u.task.source, "; Value:", f, f instanceof Error ? f.stack : void 0) : console.error(u)
        }
    }
    ,
    c.microtaskDrainDone = () => {
        for (; _.length; ) {
            let u = _.shift();
            try {
                u.zone.runGuarded( () => {
                    throw u.throwOriginal ? u.rejection : u
                }
                )
            } catch (f) {
                O(f)
            }
        }
    }
    ;
    let Z = y("unhandledPromiseRejectionHandler");
    function O(u) {
        c.onUnhandledError(u);
        try {
            let f = n[Z];
            typeof f == "function" && f.call(this, u)
        } catch {}
    }
    function B(u) {
        return u && u.then
    }
    function A(u) {
        return u
    }
    function J(u) {
        return t.reject(u)
    }
    let q = y("state")
      , R = y("value")
      , E = y("finally")
      , $ = y("parentPromiseValue")
      , H = y("parentPromiseState")
      , X = "Promise.then"
      , M = null
      , T = !0
      , x = !1
      , d = 0;
    function N(u, f) {
        return i => {
            try {
                z(u, f, i)
            } catch (h) {
                z(u, !1, h)
            }
        }
    }
    let P = function() {
        let u = !1;
        return function(i) {
            return function() {
                u || (u = !0,
                i.apply(null, arguments))
            }
        }
    }
      , K = "Promise resolved with itself"
      , re = y("currentTaskTrace");
    function z(u, f, i) {
        let h = P();
        if (u === i)
            throw new TypeError(K);
        if (u[q] === M) {
            let g = null;
            try {
                (typeof i == "object" || typeof i == "function") && (g = i && i.then)
            } catch (w) {
                return h( () => {
                    z(u, !1, w)
                }
                )(),
                u
            }
            if (f !== x && i instanceof t && i.hasOwnProperty(q) && i.hasOwnProperty(R) && i[q] !== M)
                te(i),
                z(u, i[q], i[R]);
            else if (f !== x && typeof g == "function")
                try {
                    g.call(i, h(N(u, f)), h(N(u, !1)))
                } catch (w) {
                    h( () => {
                        z(u, !1, w)
                    }
                    )()
                }
            else {
                u[q] = f;
                let w = u[R];
                if (u[R] = i,
                u[E] === E && f === T && (u[q] = u[H],
                u[R] = u[$]),
                f === x && i instanceof Error) {
                    let p = n.currentTask && n.currentTask.data && n.currentTask.data[I];
                    p && a(i, re, {
                        configurable: !0,
                        enumerable: !1,
                        writable: !0,
                        value: p
                    })
                }
                for (let p = 0; p < w.length; )
                    Q(u, w[p++], w[p++], w[p++], w[p++]);
                if (w.length == 0 && f == x) {
                    u[q] = d;
                    let p = i;
                    try {
                        throw new Error("Uncaught (in promise): " + l(i) + (i && i.stack ? `
` + i.stack : ""))
                    } catch (C) {
                        p = C
                    }
                    b && (p.throwOriginal = !0),
                    p.rejection = i,
                    p.promise = u,
                    p.zone = n.current,
                    p.task = n.currentTask,
                    _.push(p),
                    c.scheduleMicroTask()
                }
            }
        }
        return u
    }
    let U = y("rejectionHandledHandler");
    function te(u) {
        if (u[q] === d) {
            try {
                let f = n[U];
                f && typeof f == "function" && f.call(this, {
                    rejection: u[R],
                    promise: u
                })
            } catch {}
            u[q] = x;
            for (let f = 0; f < _.length; f++)
                u === _[f].promise && _.splice(f, 1)
        }
    }
    function Q(u, f, i, h, g) {
        te(u);
        let w = u[q]
          , p = w ? typeof h == "function" ? h : A : typeof g == "function" ? g : J;
        f.scheduleMicroTask(X, () => {
            try {
                let C = u[R]
                  , S = !!i && E === i[E];
                S && (i[$] = C,
                i[H] = w);
                let D = f.run(p, void 0, S && p !== J && p !== A ? [] : [C]);
                z(i, !0, D)
            } catch (C) {
                z(i, !1, C)
            }
        }
        , i)
    }
    let W = "function ZoneAwarePromise() { [native code] }"
      , oe = function() {}
      , L = e.AggregateError;
    class t {
        static toString() {
            return W
        }
        static resolve(f) {
            return z(new this(null), T, f)
        }
        static reject(f) {
            return z(new this(null), x, f)
        }
        static any(f) {
            if (!f || typeof f[Symbol.iterator] != "function")
                return Promise.reject(new L([],"All promises were rejected"));
            let i = []
              , h = 0;
            try {
                for (let p of f)
                    h++,
                    i.push(t.resolve(p))
            } catch {
                return Promise.reject(new L([],"All promises were rejected"))
            }
            if (h === 0)
                return Promise.reject(new L([],"All promises were rejected"));
            let g = !1
              , w = [];
            return new t( (p, C) => {
                for (let S = 0; S < i.length; S++)
                    i[S].then(D => {
                        g || (g = !0,
                        p(D))
                    }
                    , D => {
                        w.push(D),
                        h--,
                        h === 0 && (g = !0,
                        C(new L(w,"All promises were rejected")))
                    }
                    )
            }
            )
        }
        static race(f) {
            let i, h, g = new this( (C, S) => {
                i = C,
                h = S
            }
            );
            function w(C) {
                i(C)
            }
            function p(C) {
                h(C)
            }
            for (let C of f)
                B(C) || (C = this.resolve(C)),
                C.then(w, p);
            return g
        }
        static all(f) {
            return t.allWithCallback(f)
        }
        static allSettled(f) {
            return (this && this.prototype instanceof t ? this : t).allWithCallback(f, {
                thenCallback: h => ({
                    status: "fulfilled",
                    value: h
                }),
                errorCallback: h => ({
                    status: "rejected",
                    reason: h
                })
            })
        }
        static allWithCallback(f, i) {
            let h, g, w = new this( (D, G) => {
                h = D,
                g = G
            }
            ), p = 2, C = 0, S = [];
            for (let D of f) {
                B(D) || (D = this.resolve(D));
                let G = C;
                try {
                    D.then(V => {
                        S[G] = i ? i.thenCallback(V) : V,
                        p--,
                        p === 0 && h(S)
                    }
                    , V => {
                        i ? (S[G] = i.errorCallback(V),
                        p--,
                        p === 0 && h(S)) : g(V)
                    }
                    )
                } catch (V) {
                    g(V)
                }
                p++,
                C++
            }
            return p -= 2,
            p === 0 && h(S),
            w
        }
        constructor(f) {
            let i = this;
            if (!(i instanceof t))
                throw new Error("Must be an instanceof Promise.");
            i[q] = M,
            i[R] = [];
            try {
                let h = P();
                f && f(h(N(i, T)), h(N(i, x)))
            } catch (h) {
                z(i, !1, h)
            }
        }
        get[Symbol.toStringTag]() {
            return "Promise"
        }
        get[Symbol.species]() {
            return t
        }
        then(f, i) {
            let h = this.constructor?.[Symbol.species];
            (!h || typeof h != "function") && (h = this.constructor || t);
            let g = new h(oe)
              , w = n.current;
            return this[q] == M ? this[R].push(w, g, f, i) : Q(this, w, g, f, i),
            g
        }
        catch(f) {
            return this.then(null, f)
        }
        finally(f) {
            let i = this.constructor?.[Symbol.species];
            (!i || typeof i != "function") && (i = t);
            let h = new i(oe);
            h[E] = E;
            let g = n.current;
            return this[q] == M ? this[R].push(g, h, f, f) : Q(this, g, h, f, f),
            h
        }
    }
    t.resolve = t.resolve,
    t.reject = t.reject,
    t.race = t.race,
    t.all = t.all;
    let s = e[k] = e.Promise;
    e.Promise = t;
    let o = y("thenPatched");
    function v(u) {
        let f = u.prototype
          , i = r(f, "then");
        if (i && (i.writable === !1 || !i.configurable))
            return;
        let h = f.then;
        f[m] = h,
        u.prototype.then = function(g, w) {
            return new t( (C, S) => {
                h.call(this, C, S)
            }
            ).then(g, w)
        }
        ,
        u[o] = !0
    }
    c.patchThen = v;
    function F(u) {
        return function(f, i) {
            let h = u.apply(f, i);
            if (h instanceof t)
                return h;
            let g = h.constructor;
            return g[o] || v(g),
            h
        }
    }
    return s && (v(s),
    le(e, "fetch", u => F(u))),
    Promise[n.__symbol__("uncaughtPromiseErrors")] = _,
    t
}
);
Zone.__load_patch("toString", e => {
    let n = Function.prototype.toString
      , c = j("OriginalDelegate")
      , r = j("Promise")
      , a = j("Error")
      , l = function() {
        if (typeof this == "function") {
            let k = this[c];
            if (k)
                return typeof k == "function" ? n.call(k) : Object.prototype.toString.call(k);
            if (this === Promise) {
                let m = e[r];
                if (m)
                    return n.call(m)
            }
            if (this === Error) {
                let m = e[a];
                if (m)
                    return n.call(m)
            }
        }
        return n.call(this)
    };
    l[c] = n,
    Function.prototype.toString = l;
    let y = Object.prototype.toString
      , _ = "[object Promise]";
    Object.prototype.toString = function() {
        return typeof Promise == "function" && this instanceof Promise ? _ : y.call(this)
    }
}
);
var _e = !1;
if (typeof window < "u")
    try {
        let e = Object.defineProperty({}, "passive", {
            get: function() {
                _e = !0
            }
        });
        window.addEventListener("test", e, e),
        window.removeEventListener("test", e, e)
    } catch {
        _e = !1
    }
var dt = {
    useG: !0
}
  , ee = {}
  , Qe = {}
  , et = new RegExp("^" + pe + "(\\w+)(true|false)$")
  , tt = j("propagationStopped");
function nt(e, n) {
    let c = (n ? n(e) : e) + ce
      , r = (n ? n(e) : e) + ie
      , a = pe + c
      , l = pe + r;
    ee[e] = {},
    ee[e][ce] = a,
    ee[e][ie] = l
}
function _t(e, n, c, r) {
    let a = r && r.add || Me
      , l = r && r.rm || Le
      , y = r && r.listeners || "eventListeners"
      , _ = r && r.rmAll || "removeAllListeners"
      , b = j(a)
      , k = "." + a + ":"
      , m = "prependListener"
      , I = "." + m + ":"
      , Z = function(R, E, $) {
        if (R.isRemoved)
            return;
        let H = R.callback;
        typeof H == "object" && H.handleEvent && (R.callback = T => H.handleEvent(T),
        R.originalDelegate = H);
        let X;
        try {
            R.invoke(R, E, [$])
        } catch (T) {
            X = T
        }
        let M = R.options;
        if (M && typeof M == "object" && M.once) {
            let T = R.originalDelegate ? R.originalDelegate : R.callback;
            E[l].call(E, $.type, T, M)
        }
        return X
    };
    function O(R, E, $) {
        if (E = E || e.event,
        !E)
            return;
        let H = R || E.target || e
          , X = H[ee[E.type][$ ? ie : ce]];
        if (X) {
            let M = [];
            if (X.length === 1) {
                let T = Z(X[0], H, E);
                T && M.push(T)
            } else {
                let T = X.slice();
                for (let x = 0; x < T.length && !(E && E[tt] === !0); x++) {
                    let d = Z(T[x], H, E);
                    d && M.push(d)
                }
            }
            if (M.length === 1)
                throw M[0];
            for (let T = 0; T < M.length; T++) {
                let x = M[T];
                n.nativeScheduleMicroTask( () => {
                    throw x
                }
                )
            }
        }
    }
    let B = function(R) {
        return O(this, R, !1)
    }
      , A = function(R) {
        return O(this, R, !0)
    };
    function J(R, E) {
        if (!R)
            return !1;
        let $ = !0;
        E && E.useG !== void 0 && ($ = E.useG);
        let H = E && E.vh
          , X = !0;
        E && E.chkDup !== void 0 && (X = E.chkDup);
        let M = !1;
        E && E.rt !== void 0 && (M = E.rt);
        let T = R;
        for (; T && !T.hasOwnProperty(a); )
            T = Ie(T);
        if (!T && R[a] && (T = R),
        !T || T[b])
            return !1;
        let x = E && E.eventNameToString, d = {}, N = T[b] = T[a], P = T[j(l)] = T[l], K = T[j(y)] = T[y], re = T[j(_)] = T[_], z;
        E && E.prepend && (z = T[j(E.prepend)] = T[E.prepend]);
        function U(i, h) {
            return !_e && typeof i == "object" && i ? !!i.capture : !_e || !h ? i : typeof i == "boolean" ? {
                capture: i,
                passive: !0
            } : i ? typeof i == "object" && i.passive !== !1 ? {
                ...i,
                passive: !0
            } : i : {
                passive: !0
            }
        }
        let te = function(i) {
            if (!d.isExisting)
                return N.call(d.target, d.eventName, d.capture ? A : B, d.options)
        }
          , Q = function(i) {
            if (!i.isRemoved) {
                let h = ee[i.eventName], g;
                h && (g = h[i.capture ? ie : ce]);
                let w = g && i.target[g];
                if (w) {
                    for (let p = 0; p < w.length; p++)
                        if (w[p] === i) {
                            w.splice(p, 1),
                            i.isRemoved = !0,
                            w.length === 0 && (i.allRemoved = !0,
                            i.target[g] = null);
                            break
                        }
                }
            }
            if (i.allRemoved)
                return P.call(i.target, i.eventName, i.capture ? A : B, i.options)
        }
          , W = function(i) {
            return N.call(d.target, d.eventName, i.invoke, d.options)
        }
          , oe = function(i) {
            return z.call(d.target, d.eventName, i.invoke, d.options)
        }
          , L = function(i) {
            return P.call(i.target, i.eventName, i.invoke, i.options)
        }
          , t = $ ? te : W
          , s = $ ? Q : L
          , o = function(i, h) {
            let g = typeof h;
            return g === "function" && i.callback === h || g === "object" && i.originalDelegate === h
        }
          , v = E && E.diff ? E.diff : o
          , F = Zone[j("UNPATCHED_EVENTS")]
          , u = e[j("PASSIVE_EVENTS")]
          , f = function(i, h, g, w, p=!1, C=!1) {
            return function() {
                let S = this || e
                  , D = arguments[0];
                E && E.transferEventName && (D = E.transferEventName(D));
                let G = arguments[1];
                if (!G)
                    return i.apply(this, arguments);
                if (we && D === "uncaughtException")
                    return i.apply(this, arguments);
                let V = !1;
                if (typeof G != "function") {
                    if (!G.handleEvent)
                        return i.apply(this, arguments);
                    V = !0
                }
                if (H && !H(i, G, S, arguments))
                    return;
                let ue = _e && !!u && u.indexOf(D) !== -1
                  , se = U(arguments[2], ue);
                if (F) {
                    for (let he = 0; he < F.length; he++)
                        if (D === F[he])
                            return ue ? i.call(S, D, G, se) : i.apply(this, arguments)
                }
                let Re = se ? typeof se == "boolean" ? !0 : se.capture : !1
                  , Ge = se && typeof se == "object" ? se.once : !1
                  , st = Zone.current
                  , Ce = ee[D];
                Ce || (nt(D, x),
                Ce = ee[D]);
                let Ve = Ce[Re ? ie : ce]
                  , de = S[Ve]
                  , Fe = !1;
                if (de) {
                    if (Fe = !0,
                    X) {
                        for (let he = 0; he < de.length; he++)
                            if (v(de[he], G))
                                return
                    }
                } else
                    de = S[Ve] = [];
                let ke, Be = S.constructor.name, Ue = Qe[Be];
                Ue && (ke = Ue[D]),
                ke || (ke = Be + h + (x ? x(D) : D)),
                d.options = se,
                Ge && (d.options.once = !1),
                d.target = S,
                d.capture = Re,
                d.eventName = D,
                d.isExisting = Fe;
                let ye = $ ? dt : void 0;
                ye && (ye.taskData = d);
                let fe = st.scheduleEventTask(ke, G, ye, g, w);
                if (d.target = null,
                ye && (ye.taskData = null),
                Ge && (se.once = !0),
                !_e && typeof fe.options == "boolean" || (fe.options = se),
                fe.target = S,
                fe.capture = Re,
                fe.eventName = D,
                V && (fe.originalDelegate = G),
                C ? de.unshift(fe) : de.push(fe),
                p)
                    return S
            }
        };
        return T[a] = f(N, k, t, s, M),
        z && (T[m] = f(z, I, oe, s, M, !0)),
        T[l] = function() {
            let i = this || e
              , h = arguments[0];
            E && E.transferEventName && (h = E.transferEventName(h));
            let g = arguments[2]
              , w = g ? typeof g == "boolean" ? !0 : g.capture : !1
              , p = arguments[1];
            if (!p)
                return P.apply(this, arguments);
            if (H && !H(P, p, i, arguments))
                return;
            let C = ee[h], S;
            C && (S = C[w ? ie : ce]);
            let D = S && i[S];
            if (D)
                for (let G = 0; G < D.length; G++) {
                    let V = D[G];
                    if (v(V, p)) {
                        if (D.splice(G, 1),
                        V.isRemoved = !0,
                        D.length === 0 && (V.allRemoved = !0,
                        i[S] = null,
                        typeof h == "string")) {
                            let ue = pe + "ON_PROPERTY" + h;
                            i[ue] = null
                        }
                        return V.zone.cancelTask(V),
                        M ? i : void 0
                    }
                }
            return P.apply(this, arguments)
        }
        ,
        T[y] = function() {
            let i = this || e
              , h = arguments[0];
            E && E.transferEventName && (h = E.transferEventName(h));
            let g = []
              , w = rt(i, x ? x(h) : h);
            for (let p = 0; p < w.length; p++) {
                let C = w[p]
                  , S = C.originalDelegate ? C.originalDelegate : C.callback;
                g.push(S)
            }
            return g
        }
        ,
        T[_] = function() {
            let i = this || e
              , h = arguments[0];
            if (h) {
                E && E.transferEventName && (h = E.transferEventName(h));
                let g = ee[h];
                if (g) {
                    let w = g[ce]
                      , p = g[ie]
                      , C = i[w]
                      , S = i[p];
                    if (C) {
                        let D = C.slice();
                        for (let G = 0; G < D.length; G++) {
                            let V = D[G]
                              , ue = V.originalDelegate ? V.originalDelegate : V.callback;
                            this[l].call(this, h, ue, V.options)
                        }
                    }
                    if (S) {
                        let D = S.slice();
                        for (let G = 0; G < D.length; G++) {
                            let V = D[G]
                              , ue = V.originalDelegate ? V.originalDelegate : V.callback;
                            this[l].call(this, h, ue, V.options)
                        }
                    }
                }
            } else {
                let g = Object.keys(i);
                for (let w = 0; w < g.length; w++) {
                    let p = g[w]
                      , C = et.exec(p)
                      , S = C && C[1];
                    S && S !== "removeListener" && this[_].call(this, S)
                }
                this[_].call(this, "removeListener")
            }
            if (M)
                return this
        }
        ,
        ae(T[a], N),
        ae(T[l], P),
        re && ae(T[_], re),
        K && ae(T[y], K),
        !0
    }
    let q = [];
    for (let R = 0; R < c.length; R++)
        q[R] = J(c[R], r);
    return q
}
function rt(e, n) {
    if (!n) {
        let l = [];
        for (let y in e) {
            let _ = et.exec(y)
              , b = _ && _[1];
            if (b && (!n || b === n)) {
                let k = e[y];
                if (k)
                    for (let m = 0; m < k.length; m++)
                        l.push(k[m])
            }
        }
        return l
    }
    let c = ee[n];
    c || (nt(n),
    c = ee[n]);
    let r = e[c[ce]]
      , a = e[c[ie]];
    return r ? a ? r.concat(a) : r.slice() : a ? a.slice() : []
}
function Et(e, n) {
    let c = e.Event;
    c && c.prototype && n.patchMethod(c.prototype, "stopImmediatePropagation", r => function(a, l) {
        a[tt] = !0,
        r && r.apply(a, l)
    }
    )
}
function Tt(e, n, c, r, a) {
    let l = Zone.__symbol__(r);
    if (n[l])
        return;
    let y = n[l] = n[r];
    n[r] = function(_, b, k) {
        return b && b.prototype && a.forEach(function(m) {
            let I = `${c}.${r}::` + m
              , Z = b.prototype;
            try {
                if (Z.hasOwnProperty(m)) {
                    let O = e.ObjectGetOwnPropertyDescriptor(Z, m);
                    O && O.value ? (O.value = e.wrapWithCurrentZone(O.value, I),
                    e._redefineProperty(b.prototype, m, O)) : Z[m] && (Z[m] = e.wrapWithCurrentZone(Z[m], I))
                } else
                    Z[m] && (Z[m] = e.wrapWithCurrentZone(Z[m], I))
            } catch {}
        }),
        y.call(n, _, b, k)
    }
    ,
    e.attachOriginToPatched(n[r], y)
}
function ot(e, n, c) {
    if (!c || c.length === 0)
        return n;
    let r = c.filter(l => l.target === e);
    if (!r || r.length === 0)
        return n;
    let a = r[0].ignoreProperties;
    return n.filter(l => a.indexOf(l) === -1)
}
function ze(e, n, c, r) {
    if (!e)
        return;
    let a = ot(e, n, c);
    Ke(e, a, r)
}
function Oe(e) {
    return Object.getOwnPropertyNames(e).filter(n => n.startsWith("on") && n.length > 2).map(n => n.substring(2))
}
function yt(e, n) {
    if (we && !Je || Zone[e.symbol("patchEvents")])
        return;
    let c = n.__Zone_ignore_on_properties
      , r = [];
    if (xe) {
        let a = window;
        r = r.concat(["Document", "SVGElement", "Element", "HTMLElement", "HTMLBodyElement", "HTMLMediaElement", "HTMLFrameSetElement", "HTMLFrameElement", "HTMLIFrameElement", "HTMLMarqueeElement", "Worker"]);
        let l = ft() ? [{
            target: a,
            ignoreProperties: ["error"]
        }] : [];
        ze(a, Oe(a), c && c.concat(l), Ie(a))
    }
    r = r.concat(["XMLHttpRequest", "XMLHttpRequestEventTarget", "IDBIndex", "IDBRequest", "IDBOpenDBRequest", "IDBDatabase", "IDBTransaction", "IDBCursor", "WebSocket"]);
    for (let a = 0; a < r.length; a++) {
        let l = n[r[a]];
        l && l.prototype && ze(l.prototype, Oe(l.prototype), c)
    }
}
Zone.__load_patch("util", (e, n, c) => {
    let r = Oe(e);
    c.patchOnProperties = Ke,
    c.patchMethod = le,
    c.bindArguments = He,
    c.patchMacroTask = ut;
    let a = n.__symbol__("BLACK_LISTED_EVENTS")
      , l = n.__symbol__("UNPATCHED_EVENTS");
    e[l] && (e[a] = e[l]),
    e[a] && (n[a] = n[l] = e[a]),
    c.patchEventPrototype = Et,
    c.patchEventTarget = _t,
    c.isIEOrEdge = ht,
    c.ObjectDefineProperty = Ne,
    c.ObjectGetOwnPropertyDescriptor = me,
    c.ObjectCreate = it,
    c.ArraySlice = ct,
    c.patchClass = ge,
    c.wrapWithCurrentZone = Ae,
    c.filterProperties = ot,
    c.attachOriginToPatched = ae,
    c._redefineProperty = Object.defineProperty,
    c.patchCallbacks = Tt,
    c.getGlobalObjects = () => ({
        globalSources: Qe,
        zoneSymbolEventNames: ee,
        eventNames: r,
        isBrowser: xe,
        isMix: Je,
        isNode: we,
        TRUE_STR: ie,
        FALSE_STR: ce,
        ZONE_SYMBOL_PREFIX: pe,
        ADD_EVENT_LISTENER_STR: Me,
        REMOVE_EVENT_LISTENER_STR: Le
    })
}
);
function mt(e, n) {
    n.patchMethod(e, "queueMicrotask", c => function(r, a) {
        Zone.current.scheduleMicroTask("queueMicrotask", a[0])
    }
    )
}
var ve = j("zoneTask");
function Ee(e, n, c, r) {
    let a = null
      , l = null;
    n += r,
    c += r;
    let y = {};
    function _(k) {
        let m = k.data;
        return m.args[0] = function() {
            return k.invoke.apply(this, arguments)
        }
        ,
        m.handleId = a.apply(e, m.args),
        k
    }
    function b(k) {
        return l.call(e, k.data.handleId)
    }
    a = le(e, n, k => function(m, I) {
        if (typeof I[0] == "function") {
            let Z = {
                isPeriodic: r === "Interval",
                delay: r === "Timeout" || r === "Interval" ? I[1] || 0 : void 0,
                args: I
            }
              , O = I[0];
            I[0] = function() {
                try {
                    return O.apply(this, arguments)
                } finally {
                    Z.isPeriodic || (typeof Z.handleId == "number" ? delete y[Z.handleId] : Z.handleId && (Z.handleId[ve] = null))
                }
            }
            ;
            let B = je(n, I[0], Z, _, b);
            if (!B)
                return B;
            let A = B.data.handleId;
            return typeof A == "number" ? y[A] = B : A && (A[ve] = B),
            A && A.ref && A.unref && typeof A.ref == "function" && typeof A.unref == "function" && (B.ref = A.ref.bind(A),
            B.unref = A.unref.bind(A)),
            typeof A == "number" || A ? A : B
        } else
            return k.apply(e, I)
    }
    ),
    l = le(e, c, k => function(m, I) {
        let Z = I[0], O;
        typeof Z == "number" ? O = y[Z] : (O = Z && Z[ve],
        O || (O = Z)),
        O && typeof O.type == "string" ? O.state !== "notScheduled" && (O.cancelFn && O.data.isPeriodic || O.runCount === 0) && (typeof Z == "number" ? delete y[Z] : Z && (Z[ve] = null),
        O.zone.cancelTask(O)) : k.apply(e, I)
    }
    )
}
function pt(e, n) {
    let {isBrowser: c, isMix: r} = n.getGlobalObjects();
    if (!c && !r || !e.customElements || !("customElements"in e))
        return;
    let a = ["connectedCallback", "disconnectedCallback", "adoptedCallback", "attributeChangedCallback"];
    n.patchCallbacks(n, e.customElements, "customElements", "define", a)
}
function gt(e, n) {
    if (Zone[n.symbol("patchEventTarget")])
        return;
    let {eventNames: c, zoneSymbolEventNames: r, TRUE_STR: a, FALSE_STR: l, ZONE_SYMBOL_PREFIX: y} = n.getGlobalObjects();
    for (let b = 0; b < c.length; b++) {
        let k = c[b]
          , m = k + l
          , I = k + a
          , Z = y + m
          , O = y + I;
        r[k] = {},
        r[k][l] = Z,
        r[k][a] = O
    }
    let _ = e.EventTarget;
    if (!(!_ || !_.prototype))
        return n.patchEventTarget(e, n, [_ && _.prototype]),
        !0
}
function kt(e, n) {
    n.patchEventPrototype(e, n)
}
Zone.__load_patch("legacy", e => {
    let n = e[Zone.__symbol__("legacyPatch")];
    n && n()
}
);
Zone.__load_patch("timers", e => {
    let n = "set"
      , c = "clear";
    Ee(e, n, c, "Timeout"),
    Ee(e, n, c, "Interval"),
    Ee(e, n, c, "Immediate")
}
);
Zone.__load_patch("requestAnimationFrame", e => {
    Ee(e, "request", "cancel", "AnimationFrame"),
    Ee(e, "mozRequest", "mozCancel", "AnimationFrame"),
    Ee(e, "webkitRequest", "webkitCancel", "AnimationFrame")
}
);
Zone.__load_patch("blocking", (e, n) => {
    let c = ["alert", "prompt", "confirm"];
    for (let r = 0; r < c.length; r++) {
        let a = c[r];
        le(e, a, (l, y, _) => function(b, k) {
            return n.current.run(l, e, k, _)
        }
        )
    }
}
);
Zone.__load_patch("EventTarget", (e, n, c) => {
    kt(e, c),
    gt(e, c);
    let r = e.XMLHttpRequestEventTarget;
    r && r.prototype && c.patchEventTarget(e, c, [r.prototype])
}
);
Zone.__load_patch("MutationObserver", (e, n, c) => {
    ge("MutationObserver"),
    ge("WebKitMutationObserver")
}
);
Zone.__load_patch("IntersectionObserver", (e, n, c) => {
    ge("IntersectionObserver")
}
);
Zone.__load_patch("FileReader", (e, n, c) => {
    ge("FileReader")
}
);
Zone.__load_patch("on_property", (e, n, c) => {
    yt(c, e)
}
);
Zone.__load_patch("customElements", (e, n, c) => {
    pt(e, c)
}
);
Zone.__load_patch("XHR", (e, n) => {
    b(e);
    let c = j("xhrTask")
      , r = j("xhrSync")
      , a = j("xhrListener")
      , l = j("xhrScheduled")
      , y = j("xhrURL")
      , _ = j("xhrErrorBeforeScheduled");
    function b(k) {
        let m = k.XMLHttpRequest;
        if (!m)
            return;
        let I = m.prototype;
        function Z(d) {
            return d[c]
        }
        let O = I[Se]
          , B = I[De];
        if (!O) {
            let d = k.XMLHttpRequestEventTarget;
            if (d) {
                let N = d.prototype;
                O = N[Se],
                B = N[De]
            }
        }
        let A = "readystatechange"
          , J = "scheduled";
        function q(d) {
            let N = d.data
              , P = N.target;
            P[l] = !1,
            P[_] = !1;
            let K = P[a];
            O || (O = P[Se],
            B = P[De]),
            K && B.call(P, A, K);
            let re = P[a] = () => {
                if (P.readyState === P.DONE)
                    if (!N.aborted && P[l] && d.state === J) {
                        let U = P[n.__symbol__("loadfalse")];
                        if (P.status !== 0 && U && U.length > 0) {
                            let te = d.invoke;
                            d.invoke = function() {
                                let Q = P[n.__symbol__("loadfalse")];
                                for (let W = 0; W < Q.length; W++)
                                    Q[W] === d && Q.splice(W, 1);
                                !N.aborted && d.state === J && te.call(d)
                            }
                            ,
                            U.push(d)
                        } else
                            d.invoke()
                    } else
                        !N.aborted && P[l] === !1 && (P[_] = !0)
            }
            ;
            return O.call(P, A, re),
            P[c] || (P[c] = d),
            T.apply(P, N.args),
            P[l] = !0,
            d
        }
        function R() {}
        function E(d) {
            let N = d.data;
            return N.aborted = !0,
            x.apply(N.target, N.args)
        }
        let $ = le(I, "open", () => function(d, N) {
            return d[r] = N[2] == !1,
            d[y] = N[1],
            $.apply(d, N)
        }
        )
          , H = "XMLHttpRequest.send"
          , X = j("fetchTaskAborting")
          , M = j("fetchTaskScheduling")
          , T = le(I, "send", () => function(d, N) {
            if (n.current[M] === !0 || d[r])
                return T.apply(d, N);
            {
                let P = {
                    target: d,
                    url: d[y],
                    isPeriodic: !1,
                    args: N,
                    aborted: !1
                }
                  , K = je(H, R, P, q, E);
                d && d[_] === !0 && !P.aborted && K.state === J && K.invoke()
            }
        }
        )
          , x = le(I, "abort", () => function(d, N) {
            let P = Z(d);
            if (P && typeof P.type == "string") {
                if (P.cancelFn == null || P.data && P.data.aborted)
                    return;
                P.zone.cancelTask(P)
            } else if (n.current[X] === !0)
                return x.apply(d, N)
        }
        )
    }
}
);
Zone.__load_patch("geolocation", e => {
    e.navigator && e.navigator.geolocation && lt(e.navigator.geolocation, ["getCurrentPosition", "watchPosition"])
}
);
Zone.__load_patch("PromiseRejectionEvent", (e, n) => {
    function c(r) {
        return function(a) {
            rt(e, r).forEach(y => {
                let _ = e.PromiseRejectionEvent;
                if (_) {
                    let b = new _(r,{
                        promise: a.promise,
                        reason: a.rejection
                    });
                    y.invoke(b)
                }
            }
            )
        }
    }
    e.PromiseRejectionEvent && (n[j("unhandledPromiseRejectionHandler")] = c("unhandledrejection"),
    n[j("rejectionHandledHandler")] = c("rejectionhandled"))
}
);
Zone.__load_patch("queueMicrotask", (e, n, c) => {
    mt(e, c)
}
);
