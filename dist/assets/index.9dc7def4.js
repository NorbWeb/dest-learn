(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) i(r);
  new MutationObserver((r) => {
    for (const s of r)
      if (s.type === "childList")
        for (const l of s.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && i(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const s = {};
    return (
      r.integrity && (s.integrity = r.integrity),
      r.referrerpolicy && (s.referrerPolicy = r.referrerpolicy),
      r.crossorigin === "use-credentials"
        ? (s.credentials = "include")
        : r.crossorigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function i(r) {
    if (r.ep) return;
    r.ep = !0;
    const s = n(r);
    fetch(r.href, s);
  }
})();
const j = {};
function Bt(e) {
  j.context = e;
}
const qt = (e, t) => e === t,
  W = Symbol("solid-proxy"),
  qe = Symbol("solid-track"),
  we = { equals: qt };
let st = ft;
const Y = 1,
  Ae = 2,
  lt = { owned: null, cleanups: null, context: null, owner: null };
var w = null;
let ne = null,
  S = null,
  B = null,
  M = null,
  ze = 0;
function ce(e, t) {
  const n = S,
    i = w,
    r = e.length === 0,
    s = r ? lt : { owned: null, cleanups: null, context: null, owner: t || i },
    l = r ? e : () => e(() => K(() => Qe(s)));
  (w = s), (S = null);
  try {
    return X(l, !0);
  } finally {
    (S = n), (w = i);
  }
}
function D(e, t) {
  t = t ? Object.assign({}, we, t) : we;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    i = (r) => (typeof r == "function" && (r = r(n.value)), dt(n, r));
  return [ct.bind(n), i];
}
function $(e, t, n) {
  const i = We(e, t, !1, Y);
  pe(i);
}
function ot(e, t, n) {
  st = Ht;
  const i = We(e, t, !1, Y);
  (i.user = !0), M ? M.push(i) : pe(i);
}
function N(e, t, n) {
  n = n ? Object.assign({}, we, n) : we;
  const i = We(e, t, !0, 0);
  return (
    (i.observers = null),
    (i.observerSlots = null),
    (i.comparator = n.equals || void 0),
    pe(i),
    ct.bind(i)
  );
}
function It(e) {
  return X(e, !1);
}
function K(e) {
  const t = S;
  S = null;
  try {
    return e();
  } finally {
    S = t;
  }
}
function at(e, t, n) {
  const i = Array.isArray(e);
  let r,
    s = n && n.defer;
  return (l) => {
    let o;
    if (i) {
      o = Array(e.length);
      for (let u = 0; u < e.length; u++) o[u] = e[u]();
    } else o = e();
    if (s) {
      s = !1;
      return;
    }
    const c = K(() => t(o, r, l));
    return (r = o), c;
  };
}
function He(e) {
  return (
    w === null ||
      (w.cleanups === null ? (w.cleanups = [e]) : w.cleanups.push(e)),
    e
  );
}
function ut() {
  return S;
}
function Rt() {
  return w;
}
function Tt(e, t) {
  const n = w;
  w = e;
  try {
    return X(t, !0);
  } finally {
    w = n;
  }
}
function Ft(e) {
  const t = S,
    n = w;
  return Promise.resolve().then(() => {
    (S = t), (w = n);
    let i;
    return X(e, !1), (S = w = null), i ? i.done : void 0;
  });
}
function me(e, t) {
  const n = Symbol("context");
  return { id: n, Provider: Wt(n), defaultValue: e };
}
function ae(e) {
  let t;
  return (t = mt(w, e.id)) !== void 0 ? t : e.defaultValue;
}
function je(e) {
  const t = N(e),
    n = N(() => Ie(t()));
  return (
    (n.toArray = () => {
      const i = n();
      return Array.isArray(i) ? i : i != null ? [i] : [];
    }),
    n
  );
}
function ct() {
  const e = ne;
  if (this.sources && (this.state || e))
    if (this.state === Y || e) pe(this);
    else {
      const t = B;
      (B = null), X(() => Ce(this), !1), (B = t);
    }
  if (S) {
    const t = this.observers ? this.observers.length : 0;
    S.sources
      ? (S.sources.push(this), S.sourceSlots.push(t))
      : ((S.sources = [this]), (S.sourceSlots = [t])),
      this.observers
        ? (this.observers.push(S),
          this.observerSlots.push(S.sources.length - 1))
        : ((this.observers = [S]),
          (this.observerSlots = [S.sources.length - 1]));
  }
  return this.value;
}
function dt(e, t, n) {
  let i = e.value;
  return (
    (!e.comparator || !e.comparator(i, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        X(() => {
          for (let r = 0; r < e.observers.length; r += 1) {
            const s = e.observers[r],
              l = ne && ne.running;
            l && ne.disposed.has(s),
              ((l && !s.tState) || (!l && !s.state)) &&
                (s.pure ? B.push(s) : M.push(s), s.observers && gt(s)),
              l || (s.state = Y);
          }
          if (B.length > 1e6) throw ((B = []), new Error());
        }, !1)),
    t
  );
}
function pe(e) {
  if (!e.fn) return;
  Qe(e);
  const t = w,
    n = S,
    i = ze;
  (S = w = e), Vt(e, e.value, i), (S = n), (w = t);
}
function Vt(e, t, n) {
  let i;
  try {
    i = e.fn(t);
  } catch (r) {
    e.pure && (e.state = Y), ht(r);
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e ? dt(e, i) : (e.value = i),
    (e.updatedAt = n));
}
function We(e, t, n, i = Y, r) {
  const s = {
    fn: e,
    state: i,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: w,
    context: null,
    pure: n,
  };
  return (
    w === null || (w !== lt && (w.owned ? w.owned.push(s) : (w.owned = [s]))), s
  );
}
function Se(e) {
  const t = ne;
  if (e.state === 0 || t) return;
  if (e.state === Ae || t) return Ce(e);
  if (e.suspense && K(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < ze); )
    (e.state || t) && n.push(e);
  for (let i = n.length - 1; i >= 0; i--)
    if (((e = n[i]), e.state === Y || t)) pe(e);
    else if (e.state === Ae || t) {
      const r = B;
      (B = null), X(() => Ce(e, n[0]), !1), (B = r);
    }
}
function X(e, t) {
  if (B) return e();
  let n = !1;
  t || (B = []), M ? (n = !0) : (M = []), ze++;
  try {
    const i = e();
    return zt(n), i;
  } catch (i) {
    B || (M = null), ht(i);
  }
}
function zt(e) {
  if ((B && (ft(B), (B = null)), e)) return;
  const t = M;
  (M = null), t.length && X(() => st(t), !1);
}
function ft(e) {
  for (let t = 0; t < e.length; t++) Se(e[t]);
}
function Ht(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const i = e[t];
    i.user ? (e[n++] = i) : Se(i);
  }
  for (j.context && Bt(), t = 0; t < n; t++) Se(e[t]);
}
function Ce(e, t) {
  const n = ne;
  e.state = 0;
  for (let i = 0; i < e.sources.length; i += 1) {
    const r = e.sources[i];
    r.sources &&
      (r.state === Y || n
        ? r !== t && Se(r)
        : (r.state === Ae || n) && Ce(r, t));
  }
}
function gt(e) {
  const t = ne;
  for (let n = 0; n < e.observers.length; n += 1) {
    const i = e.observers[n];
    (!i.state || t) &&
      ((i.state = Ae), i.pure ? B.push(i) : M.push(i), i.observers && gt(i));
  }
}
function Qe(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        i = e.sourceSlots.pop(),
        r = n.observers;
      if (r && r.length) {
        const s = r.pop(),
          l = n.observerSlots.pop();
        i < r.length &&
          ((s.sourceSlots[l] = i), (r[i] = s), (n.observerSlots[i] = l));
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++) Qe(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++) e.cleanups[t]();
    e.cleanups = null;
  }
  (e.state = 0), (e.context = null);
}
function jt(e) {
  return e instanceof Error || typeof e == "string"
    ? e
    : new Error("Unknown error");
}
function ht(e) {
  throw ((e = jt(e)), e);
}
function mt(e, t) {
  return e
    ? e.context && e.context[t] !== void 0
      ? e.context[t]
      : mt(e.owner, t)
    : void 0;
}
function Ie(e) {
  if (typeof e == "function" && !e.length) return Ie(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const i = Ie(e[n]);
      Array.isArray(i) ? t.push.apply(t, i) : t.push(i);
    }
    return t;
  }
  return e;
}
function Wt(e, t) {
  return function (i) {
    let r;
    return (
      $(
        () =>
          (r = K(() => ((w.context = { [e]: i.value }), je(() => i.children)))),
        void 0
      ),
      r
    );
  };
}
const Qt = Symbol("fallback");
function Ue(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function Mt(e, t, n = {}) {
  let i = [],
    r = [],
    s = [],
    l = 0,
    o = t.length > 1 ? [] : null;
  return (
    He(() => Ue(s)),
    () => {
      let c = e() || [],
        u,
        a;
      return (
        c[qe],
        K(() => {
          let g = c.length,
            p,
            b,
            A,
            P,
            E,
            _,
            L,
            C,
            O;
          if (g === 0)
            l !== 0 &&
              (Ue(s), (s = []), (i = []), (r = []), (l = 0), o && (o = [])),
              n.fallback &&
                ((i = [Qt]),
                (r[0] = ce((V) => ((s[0] = V), n.fallback()))),
                (l = 1));
          else if (l === 0) {
            for (r = new Array(g), a = 0; a < g; a++)
              (i[a] = c[a]), (r[a] = ce(f));
            l = g;
          } else {
            for (
              A = new Array(g),
                P = new Array(g),
                o && (E = new Array(g)),
                _ = 0,
                L = Math.min(l, g);
              _ < L && i[_] === c[_];
              _++
            );
            for (
              L = l - 1, C = g - 1;
              L >= _ && C >= _ && i[L] === c[C];
              L--, C--
            )
              (A[C] = r[L]), (P[C] = s[L]), o && (E[C] = o[L]);
            for (p = new Map(), b = new Array(C + 1), a = C; a >= _; a--)
              (O = c[a]),
                (u = p.get(O)),
                (b[a] = u === void 0 ? -1 : u),
                p.set(O, a);
            for (u = _; u <= L; u++)
              (O = i[u]),
                (a = p.get(O)),
                a !== void 0 && a !== -1
                  ? ((A[a] = r[u]),
                    (P[a] = s[u]),
                    o && (E[a] = o[u]),
                    (a = b[a]),
                    p.set(O, a))
                  : s[u]();
            for (a = _; a < g; a++)
              a in A
                ? ((r[a] = A[a]), (s[a] = P[a]), o && ((o[a] = E[a]), o[a](a)))
                : (r[a] = ce(f));
            (r = r.slice(0, (l = g))), (i = c.slice(0));
          }
          return r;
        })
      );
      function f(g) {
        if (((s[a] = g), o)) {
          const [p, b] = D(a);
          return (o[a] = b), t(c[a], p);
        }
        return t(c[a]);
      }
    }
  );
}
function d(e, t) {
  return K(() => e(t || {}));
}
function ve() {
  return !0;
}
const pt = {
  get(e, t, n) {
    return t === W ? n : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: ve,
  deleteProperty: ve,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: ve,
      deleteProperty: ve,
    };
  },
  ownKeys(e) {
    return e.keys();
  },
};
function Be(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function de(...e) {
  let t = !1;
  for (let i = 0; i < e.length; i++) {
    const r = e[i];
    (t = t || (!!r && W in r)),
      (e[i] = typeof r == "function" ? ((t = !0), N(r)) : r);
  }
  if (t)
    return new Proxy(
      {
        get(i) {
          for (let r = e.length - 1; r >= 0; r--) {
            const s = Be(e[r])[i];
            if (s !== void 0) return s;
          }
        },
        has(i) {
          for (let r = e.length - 1; r >= 0; r--) if (i in Be(e[r])) return !0;
          return !1;
        },
        keys() {
          const i = [];
          for (let r = 0; r < e.length; r++) i.push(...Object.keys(Be(e[r])));
          return [...new Set(i)];
        },
      },
      pt
    );
  const n = {};
  for (let i = e.length - 1; i >= 0; i--)
    if (e[i]) {
      const r = Object.getOwnPropertyDescriptors(e[i]);
      for (const s in r)
        s in n ||
          Object.defineProperty(n, s, {
            enumerable: !0,
            get() {
              for (let l = e.length - 1; l >= 0; l--) {
                const o = (e[l] || {})[s];
                if (o !== void 0) return o;
              }
            },
          });
    }
  return n;
}
function Kt(e, ...t) {
  const n = new Set(t.flat()),
    i = Object.getOwnPropertyDescriptors(e),
    r = W in e;
  r || t.push(Object.keys(i).filter((l) => !n.has(l)));
  const s = t.map((l) => {
    const o = {};
    for (let c = 0; c < l.length; c++) {
      const u = l[c];
      (!r && !(u in e)) ||
        Object.defineProperty(
          o,
          u,
          i[u]
            ? i[u]
            : {
                get() {
                  return e[u];
                },
                set() {
                  return !0;
                },
                enumerable: !0,
              }
        );
    }
    return o;
  });
  return (
    r &&
      s.push(
        new Proxy(
          {
            get(l) {
              return n.has(l) ? void 0 : e[l];
            },
            has(l) {
              return n.has(l) ? !1 : l in e;
            },
            keys() {
              return Object.keys(e).filter((l) => !n.has(l));
            },
          },
          pt
        )
      ),
    s
  );
}
function T(e) {
  const t = "fallback" in e && { fallback: () => e.fallback };
  return N(Mt(() => e.each, e.children, t || void 0));
}
function q(e) {
  let t = !1;
  const n = e.keyed,
    i = N(() => e.when, void 0, { equals: (r, s) => (t ? r === s : !r == !s) });
  return N(
    () => {
      const r = i();
      if (r) {
        const s = e.children,
          l = typeof s == "function" && s.length > 0;
        return (t = n || l), l ? K(() => s(r)) : s;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
const Ut = [
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
  ],
  Gt = new Set([
    "className",
    "value",
    "readOnly",
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    ...Ut,
  ]),
  Yt = new Set(["innerHTML", "textContent", "innerText", "children"]),
  Xt = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for",
  }),
  Ge = Object.assign(Object.create(null), {
    class: "className",
    formnovalidate: "formNoValidate",
    ismap: "isMap",
    nomodule: "noModule",
    playsinline: "playsInline",
    readonly: "readOnly",
  }),
  Jt = new Set([
    "beforeinput",
    "click",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart",
  ]),
  Zt = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
  };
function en(e, t, n) {
  let i = n.length,
    r = t.length,
    s = i,
    l = 0,
    o = 0,
    c = t[r - 1].nextSibling,
    u = null;
  for (; l < r || o < s; ) {
    if (t[l] === n[o]) {
      l++, o++;
      continue;
    }
    for (; t[r - 1] === n[s - 1]; ) r--, s--;
    if (r === l) {
      const a = s < i ? (o ? n[o - 1].nextSibling : n[s - o]) : c;
      for (; o < s; ) e.insertBefore(n[o++], a);
    } else if (s === o)
      for (; l < r; ) (!u || !u.has(t[l])) && t[l].remove(), l++;
    else if (t[l] === n[s - 1] && n[o] === t[r - 1]) {
      const a = t[--r].nextSibling;
      e.insertBefore(n[o++], t[l++].nextSibling),
        e.insertBefore(n[--s], a),
        (t[r] = n[s]);
    } else {
      if (!u) {
        u = new Map();
        let f = o;
        for (; f < s; ) u.set(n[f], f++);
      }
      const a = u.get(t[l]);
      if (a != null)
        if (o < a && a < s) {
          let f = l,
            g = 1,
            p;
          for (
            ;
            ++f < r && f < s && !((p = u.get(t[f])) == null || p !== a + g);

          )
            g++;
          if (g > a - o) {
            const b = t[l];
            for (; o < a; ) e.insertBefore(n[o++], b);
          } else e.replaceChild(n[o++], t[l++]);
        } else l++;
      else t[l++].remove();
    }
  }
}
const Ye = "_$DX_DELEGATE";
function tn(e, t, n, i = {}) {
  let r;
  return (
    ce((s) => {
      (r = s),
        t === document ? e() : h(t, e(), t.firstChild ? null : void 0, n);
    }, i.owner),
    () => {
      r(), (t.textContent = "");
    }
  );
}
function m(e, t, n) {
  const i = document.createElement("template");
  i.innerHTML = e;
  let r = i.content.firstChild;
  return n && (r = r.firstChild), r;
}
function J(e, t = window.document) {
  const n = t[Ye] || (t[Ye] = new Set());
  for (let i = 0, r = e.length; i < r; i++) {
    const s = e[i];
    n.has(s) || (n.add(s), t.addEventListener(s, cn));
  }
}
function I(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function nn(e, t, n, i) {
  i == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, i);
}
function rn(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function xe(e, t, n, i) {
  if (i)
    Array.isArray(n)
      ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
      : (e[`$$${t}`] = n);
  else if (Array.isArray(n)) {
    const r = n[0];
    e.addEventListener(t, (n[0] = (s) => r.call(e, n[1], s)));
  } else e.addEventListener(t, n);
}
function sn(e, t, n = {}) {
  const i = Object.keys(t || {}),
    r = Object.keys(n);
  let s, l;
  for (s = 0, l = r.length; s < l; s++) {
    const o = r[s];
    !o || o === "undefined" || t[o] || (Xe(e, o, !1), delete n[o]);
  }
  for (s = 0, l = i.length; s < l; s++) {
    const o = i[s],
      c = !!t[o];
    !o || o === "undefined" || n[o] === c || !c || (Xe(e, o, !0), (n[o] = c));
  }
  return n;
}
function ln(e, t, n) {
  if (!t) return n ? I(e, "style") : t;
  const i = e.style;
  if (typeof t == "string") return (i.cssText = t);
  typeof n == "string" && (i.cssText = n = void 0),
    n || (n = {}),
    t || (t = {});
  let r, s;
  for (s in n) t[s] == null && i.removeProperty(s), delete n[s];
  for (s in t) (r = t[s]), r !== n[s] && (i.setProperty(s, r), (n[s] = r));
  return n;
}
function on(e, t = {}, n, i) {
  const r = {};
  return (
    i || $(() => (r.children = oe(e, t.children, r.children))),
    $(() => t.ref && t.ref(e)),
    $(() => an(e, t, n, !0, r, !0)),
    r
  );
}
function h(e, t, n, i) {
  if ((n !== void 0 && !i && (i = []), typeof t != "function"))
    return oe(e, t, i, n);
  $((r) => oe(e, t(), r, n), i);
}
function an(e, t, n, i, r = {}, s = !1) {
  t || (t = {});
  for (const l in r)
    if (!(l in t)) {
      if (l === "children") continue;
      r[l] = Je(e, l, null, r[l], n, s);
    }
  for (const l in t) {
    if (l === "children") {
      i || oe(e, t.children);
      continue;
    }
    const o = t[l];
    r[l] = Je(e, l, o, r[l], n, s);
  }
}
function un(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase());
}
function Xe(e, t, n) {
  const i = t.trim().split(/\s+/);
  for (let r = 0, s = i.length; r < s; r++) e.classList.toggle(i[r], n);
}
function Je(e, t, n, i, r, s) {
  let l, o, c;
  if (t === "style") return ln(e, n, i);
  if (t === "classList") return sn(e, n, i);
  if (n === i) return i;
  if (t === "ref") s || n(e);
  else if (t.slice(0, 3) === "on:") {
    const u = t.slice(3);
    i && e.removeEventListener(u, i), n && e.addEventListener(u, n);
  } else if (t.slice(0, 10) === "oncapture:") {
    const u = t.slice(10);
    i && e.removeEventListener(u, i, !0), n && e.addEventListener(u, n, !0);
  } else if (t.slice(0, 2) === "on") {
    const u = t.slice(2).toLowerCase(),
      a = Jt.has(u);
    if (!a && i) {
      const f = Array.isArray(i) ? i[0] : i;
      e.removeEventListener(u, f);
    }
    (a || n) && (xe(e, u, n, a), a && J([u]));
  } else if (
    (c = Yt.has(t)) ||
    (!r && (Ge[t] || (o = Gt.has(t)))) ||
    (l = e.nodeName.includes("-"))
  )
    t === "class" || t === "className"
      ? rn(e, n)
      : l && !o && !c
      ? (e[un(t)] = n)
      : (e[Ge[t] || t] = n);
  else {
    const u = r && t.indexOf(":") > -1 && Zt[t.split(":")[0]];
    u ? nn(e, u, t, n) : I(e, Xt[t] || t, n);
  }
  return n;
}
function cn(e) {
  const t = `$$${e.type}`;
  let n = (e.composedPath && e.composedPath()[0]) || e.target;
  for (
    e.target !== n &&
      Object.defineProperty(e, "target", { configurable: !0, value: n }),
      Object.defineProperty(e, "currentTarget", {
        configurable: !0,
        get() {
          return n || document;
        },
      }),
      j.registry &&
        !j.done &&
        ((j.done = !0),
        document.querySelectorAll("[id^=pl-]").forEach((i) => i.remove()));
    n;

  ) {
    const i = n[t];
    if (i && !n.disabled) {
      const r = n[`${t}Data`];
      if ((r !== void 0 ? i.call(n, r, e) : i.call(n, e), e.cancelBubble))
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function oe(e, t, n, i, r) {
  for (j.context && !n && (n = [...e.childNodes]); typeof n == "function"; )
    n = n();
  if (t === n) return n;
  const s = typeof t,
    l = i !== void 0;
  if (
    ((e = (l && n[0] && n[0].parentNode) || e),
    s === "string" || s === "number")
  ) {
    if (j.context) return n;
    if ((s === "number" && (t = t.toString()), l)) {
      let o = n[0];
      o && o.nodeType === 3 ? (o.data = t) : (o = document.createTextNode(t)),
        (n = se(e, n, i, o));
    } else
      n !== "" && typeof n == "string"
        ? (n = e.firstChild.data = t)
        : (n = e.textContent = t);
  } else if (t == null || s === "boolean") {
    if (j.context) return n;
    n = se(e, n, i);
  } else {
    if (s === "function")
      return (
        $(() => {
          let o = t();
          for (; typeof o == "function"; ) o = o();
          n = oe(e, o, n, i);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const o = [],
        c = n && Array.isArray(n);
      if (Re(o, t, n, r)) return $(() => (n = oe(e, o, n, i, !0))), () => n;
      if (j.context) {
        if (!o.length) return n;
        for (let u = 0; u < o.length; u++) if (o[u].parentNode) return (n = o);
      }
      if (o.length === 0) {
        if (((n = se(e, n, i)), l)) return n;
      } else
        c
          ? n.length === 0
            ? Ze(e, o, i)
            : en(e, n, o)
          : (n && se(e), Ze(e, o));
      n = o;
    } else if (t instanceof Node) {
      if (j.context && t.parentNode) return (n = l ? [t] : t);
      if (Array.isArray(n)) {
        if (l) return (n = se(e, n, i, t));
        se(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function Re(e, t, n, i) {
  let r = !1;
  for (let s = 0, l = t.length; s < l; s++) {
    let o = t[s],
      c = n && n[s];
    if (o instanceof Node) e.push(o);
    else if (!(o == null || o === !0 || o === !1))
      if (Array.isArray(o)) r = Re(e, o, c) || r;
      else if (typeof o == "function")
        if (i) {
          for (; typeof o == "function"; ) o = o();
          r =
            Re(e, Array.isArray(o) ? o : [o], Array.isArray(c) ? c : [c]) || r;
        } else e.push(o), (r = !0);
      else {
        const u = String(o);
        c && c.nodeType === 3 && c.data === u
          ? e.push(c)
          : e.push(document.createTextNode(u));
      }
  }
  return r;
}
function Ze(e, t, n = null) {
  for (let i = 0, r = t.length; i < r; i++) e.insertBefore(t[i], n);
}
function se(e, t, n, i) {
  if (n === void 0) return (e.textContent = "");
  const r = i || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let l = t.length - 1; l >= 0; l--) {
      const o = t[l];
      if (r !== o) {
        const c = o.parentNode === e;
        !s && !l
          ? c
            ? e.replaceChild(r, o)
            : e.insertBefore(r, n)
          : c && o.remove();
      } else s = !0;
    }
  } else e.insertBefore(r, n);
  return [r];
}
const dn = !1;
function fn(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function gn([e, t], n, i) {
  return [n ? () => n(e()) : e, i ? (r) => t(i(r)) : t];
}
function hn(e) {
  try {
    return document.querySelector(e);
  } catch {
    return null;
  }
}
function mn(e, t) {
  const n = hn(`#${e}`);
  n ? n.scrollIntoView() : t && window.scrollTo(0, 0);
}
function pn(e, t, n, i) {
  let r = !1;
  const s = (o) => (typeof o == "string" ? { value: o } : o),
    l = gn(
      D(s(e()), { equals: (o, c) => o.value === c.value }),
      void 0,
      (o) => (!r && t(o), o)
    );
  return (
    n &&
      He(
        n((o = e()) => {
          (r = !0), l[1](s(o)), (r = !1);
        })
      ),
    { signal: l, utils: i }
  );
}
function bn(e) {
  if (e) {
    if (Array.isArray(e)) return { signal: e };
  } else return { signal: D({ value: "" }) };
  return e;
}
function vn() {
  return pn(
    () => ({
      value:
        window.location.pathname +
        window.location.search +
        window.location.hash,
      state: history.state,
    }),
    ({ value: e, replace: t, scroll: n, state: i }) => {
      t
        ? window.history.replaceState(i, "", e)
        : window.history.pushState(i, "", e),
        mn(window.location.hash.slice(1), n);
    },
    (e) => fn(window, "popstate", () => e()),
    { go: (e) => window.history.go(e) }
  );
}
function yn() {
  let e = new Set();
  function t(r) {
    return e.add(r), () => e.delete(r);
  }
  let n = !1;
  function i(r, s) {
    if (n) return !(n = !1);
    const l = {
      to: r,
      options: s,
      defaultPrevented: !1,
      preventDefault: () => (l.defaultPrevented = !0),
    };
    for (const o of e)
      o.listener({
        ...l,
        from: o.location,
        retry: (c) => {
          c && (n = !0), o.navigate(r, s);
        },
      });
    return !l.defaultPrevented;
  }
  return { subscribe: t, confirm: i };
}
const $n = /^(?:[a-z0-9]+:)?\/\//i,
  wn = /^\/+|\/+$/g;
function ie(e, t = !1) {
  const n = e.replace(wn, "");
  return n ? (t || /^[?#]/.test(n) ? n : "/" + n) : "";
}
function ye(e, t, n) {
  if ($n.test(t)) return;
  const i = ie(e),
    r = n && ie(n);
  let s = "";
  return (
    !r || t.startsWith("/")
      ? (s = i)
      : r.toLowerCase().indexOf(i.toLowerCase()) !== 0
      ? (s = i + r)
      : (s = r),
    (s || "/") + ie(t, !s)
  );
}
function An(e, t) {
  if (e == null) throw new Error(t);
  return e;
}
function bt(e, t) {
  return ie(e).replace(/\/*(\*.*)?$/g, "") + ie(t);
}
function Sn(e) {
  const t = {};
  return (
    e.searchParams.forEach((n, i) => {
      t[i] = n;
    }),
    t
  );
}
function $e(e, t) {
  return decodeURIComponent(t ? e.replace(/\+/g, " ") : e);
}
function Cn(e, t) {
  const [n, i] = e.split("/*", 2),
    r = n.split("/").filter(Boolean),
    s = r.length;
  return (l) => {
    const o = l.split("/").filter(Boolean),
      c = o.length - s;
    if (c < 0 || (c > 0 && i === void 0 && !t)) return null;
    const u = { path: s ? "" : "/", params: {} };
    for (let a = 0; a < s; a++) {
      const f = r[a],
        g = o[a];
      if (f[0] === ":") u.params[f.slice(1)] = g;
      else if (f.localeCompare(g, void 0, { sensitivity: "base" }) !== 0)
        return null;
      u.path += `/${g}`;
    }
    return i && (u.params[i] = c ? o.slice(-c).join("/") : ""), u;
  };
}
function _n(e) {
  const [t, n] = e.pattern.split("/*", 2),
    i = t.split("/").filter(Boolean);
  return i.reduce(
    (r, s) => r + (s.startsWith(":") ? 2 : 3),
    i.length - (n === void 0 ? 0 : 1)
  );
}
function vt(e) {
  const t = new Map(),
    n = Rt();
  return new Proxy(
    {},
    {
      get(i, r) {
        return (
          t.has(r) ||
            Tt(n, () =>
              t.set(
                r,
                N(() => e()[r])
              )
            ),
          t.get(r)()
        );
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 };
      },
      ownKeys() {
        return Reflect.ownKeys(e());
      },
    }
  );
}
function yt(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let n = e.slice(0, t.index),
    i = e.slice(t.index + t[0].length);
  const r = [n, (n += t[1])];
  for (; (t = /^(\/\:[^\/]+)\?/.exec(i)); )
    r.push((n += t[1])), (i = i.slice(t[0].length));
  return yt(i).reduce((s, l) => [...s, ...r.map((o) => o + l)], []);
}
const kn = 100,
  $t = me(),
  Ne = me(),
  be = () => An(ae($t), "Make sure your app is wrapped in a <Router />");
let fe;
const Pe = () => fe || ae(Ne) || be().base,
  xn = (e) => {
    const t = Pe();
    return N(() => t.resolvePath(e()));
  },
  Nn = (e) => {
    const t = be();
    return N(() => {
      const n = e();
      return n !== void 0 ? t.renderPath(n) : n;
    });
  },
  Pn = () => be().navigatorFactory(),
  wt = () => be().location,
  Ln = () => Pe().params;
function On(e, t = "", n) {
  const { component: i, data: r, children: s } = e,
    l = !s || (Array.isArray(s) && !s.length),
    o = {
      key: e,
      element: i
        ? () => d(i, {})
        : () => {
            const { element: c } = e;
            return c === void 0 && n ? d(n, {}) : c;
          },
      preload: e.component ? i.preload : e.preload,
      data: r,
    };
  return At(e.path).reduce((c, u) => {
    for (const a of yt(u)) {
      const f = bt(t, a),
        g = l ? f : f.split("/*", 1)[0];
      c.push({ ...o, originalPath: a, pattern: g, matcher: Cn(g, !l) });
    }
    return c;
  }, []);
}
function En(e, t = 0) {
  return {
    routes: e,
    score: _n(e[e.length - 1]) * 1e4 - t,
    matcher(n) {
      const i = [];
      for (let r = e.length - 1; r >= 0; r--) {
        const s = e[r],
          l = s.matcher(n);
        if (!l) return null;
        i.unshift({ ...l, route: s });
      }
      return i;
    },
  };
}
function At(e) {
  return Array.isArray(e) ? e : [e];
}
function St(e, t = "", n, i = [], r = []) {
  const s = At(e);
  for (let l = 0, o = s.length; l < o; l++) {
    const c = s[l];
    if (c && typeof c == "object" && c.hasOwnProperty("path")) {
      const u = On(c, t, n);
      for (const a of u) {
        i.push(a);
        const f = Array.isArray(c.children) && c.children.length === 0;
        if (c.children && !f) St(c.children, a.pattern, n, i, r);
        else {
          const g = En([...i], r.length);
          r.push(g);
        }
        i.pop();
      }
    }
  }
  return i.length ? r : r.sort((l, o) => o.score - l.score);
}
function Dn(e, t) {
  for (let n = 0, i = e.length; n < i; n++) {
    const r = e[n].matcher(t);
    if (r) return r;
  }
  return [];
}
function Bn(e, t) {
  const n = new URL("http://sar"),
    i = N(
      (c) => {
        const u = e();
        try {
          return new URL(u, n);
        } catch {
          return console.error(`Invalid path ${u}`), c;
        }
      },
      n,
      { equals: (c, u) => c.href === u.href }
    ),
    r = N(() => $e(i().pathname)),
    s = N(() => $e(i().search, !0)),
    l = N(() => $e(i().hash)),
    o = N(() => "");
  return {
    get pathname() {
      return r();
    },
    get search() {
      return s();
    },
    get hash() {
      return l();
    },
    get state() {
      return t();
    },
    get key() {
      return o();
    },
    query: vt(at(s, () => Sn(i()))),
  };
}
function qn(e, t = "", n, i) {
  const {
      signal: [r, s],
      utils: l = {},
    } = bn(e),
    o = l.parsePath || ((v) => v),
    c = l.renderPath || ((v) => v),
    u = l.beforeLeave || yn(),
    a = ye("", t),
    f = void 0;
  if (a === void 0) throw new Error(`${a} is not a valid base path`);
  a && !r().value && s({ value: a, replace: !0, scroll: !1 });
  const [g, p] = D(!1),
    b = async (v) => {
      p(!0);
      try {
        await Ft(v);
      } finally {
        p(!1);
      }
    },
    [A, P] = D(r().value),
    [E, _] = D(r().state),
    L = Bn(A, E),
    C = [],
    O = {
      pattern: a,
      params: {},
      path: () => a,
      outlet: () => null,
      resolvePath(v) {
        return ye(a, v);
      },
    };
  if (n)
    try {
      (fe = O),
        (O.data = n({ data: void 0, params: {}, location: L, navigate: U(O) }));
    } finally {
      fe = void 0;
    }
  function V(v, y, k) {
    K(() => {
      if (typeof y == "number") {
        y &&
          (l.go
            ? u.confirm(y, k) && l.go(y)
            : console.warn(
                "Router integration does not support relative routing"
              ));
        return;
      }
      const {
          replace: ee,
          resolve: G,
          scroll: z,
          state: H,
        } = { replace: !1, resolve: !0, scroll: !0, ...k },
        Q = G ? v.resolvePath(y) : ye("", y);
      if (Q === void 0) throw new Error(`Path '${y}' is not a routable path`);
      if (C.length >= kn) throw new Error("Too many redirects");
      const te = A();
      if ((Q !== te || H !== E()) && !dn) {
        if (u.confirm(Q, k)) {
          const R = C.push({ value: te, replace: ee, scroll: z, state: E() });
          b(() => {
            P(Q), _(H);
          }).then(() => {
            C.length === R && Z({ value: Q, state: H });
          });
        }
      }
    });
  }
  function U(v) {
    return (v = v || ae(Ne) || O), (y, k) => V(v, y, k);
  }
  function Z(v) {
    const y = C[0];
    y &&
      ((v.value !== y.value || v.state !== y.state) &&
        s({ ...v, replace: y.replace, scroll: y.scroll }),
      (C.length = 0));
  }
  $(() => {
    const { value: v, state: y } = r();
    K(() => {
      v !== A() &&
        b(() => {
          P(v), _(y);
        });
    });
  });
  {
    let v = function (y) {
      if (
        y.defaultPrevented ||
        y.button !== 0 ||
        y.metaKey ||
        y.altKey ||
        y.ctrlKey ||
        y.shiftKey
      )
        return;
      const k = y
        .composedPath()
        .find((R) => R instanceof Node && R.nodeName.toUpperCase() === "A");
      if (!k || !k.hasAttribute("link")) return;
      const ee = k.href;
      if (k.target || (!ee && !k.hasAttribute("state"))) return;
      const G = (k.getAttribute("rel") || "").split(/\s+/);
      if (k.hasAttribute("download") || (G && G.includes("external"))) return;
      const z = new URL(ee),
        H = $e(z.pathname);
      if (
        z.origin !== window.location.origin ||
        (a && H && !H.toLowerCase().startsWith(a.toLowerCase()))
      )
        return;
      const Q = o(z.pathname + z.search + z.hash),
        te = k.getAttribute("state");
      y.preventDefault(),
        V(O, Q, {
          resolve: !1,
          replace: k.hasAttribute("replace"),
          scroll: !k.hasAttribute("noscroll"),
          state: te && JSON.parse(te),
        });
    };
    var F = v;
    J(["click"]),
      document.addEventListener("click", v),
      He(() => document.removeEventListener("click", v));
  }
  return {
    base: O,
    out: f,
    location: L,
    isRouting: g,
    renderPath: c,
    parsePath: o,
    navigatorFactory: U,
    beforeLeave: u,
  };
}
function In(e, t, n, i) {
  const { base: r, location: s, navigatorFactory: l } = e,
    { pattern: o, element: c, preload: u, data: a } = i().route,
    f = N(() => i().path),
    g = vt(() => i().params);
  u && u();
  const p = {
    parent: t,
    pattern: o,
    get child() {
      return n();
    },
    path: f,
    params: g,
    data: t.data,
    outlet: c,
    resolvePath(b) {
      return ye(r.path(), b, f());
    },
  };
  if (a)
    try {
      (fe = p),
        (p.data = a({ data: t.data, params: g, location: s, navigate: l(p) }));
    } finally {
      fe = void 0;
    }
  return p;
}
const Rn = m("<a link></a>"),
  Tn = (e) => {
    const { source: t, url: n, base: i, data: r, out: s } = e,
      l = t || vn(),
      o = qn(l, i, r);
    return d($t.Provider, {
      value: o,
      get children() {
        return e.children;
      },
    });
  },
  Fn = (e) => {
    const t = be(),
      n = Pe(),
      i = je(() => e.children),
      r = N(() => St(i(), bt(n.pattern, e.base || ""), re)),
      s = N(() => Dn(r(), t.location.pathname));
    t.out &&
      t.out.matches.push(
        s().map(({ route: u, path: a, params: f }) => ({
          originalPath: u.originalPath,
          pattern: u.pattern,
          path: a,
          params: f,
        }))
      );
    const l = [];
    let o;
    const c = N(
      at(s, (u, a, f) => {
        let g = a && u.length === a.length;
        const p = [];
        for (let b = 0, A = u.length; b < A; b++) {
          const P = a && a[b],
            E = u[b];
          f && P && E.route.key === P.route.key
            ? (p[b] = f[b])
            : ((g = !1),
              l[b] && l[b](),
              ce((_) => {
                (l[b] = _),
                  (p[b] = In(
                    t,
                    p[b - 1] || n,
                    () => c()[b + 1],
                    () => s()[b]
                  ));
              }));
        }
        return (
          l.splice(u.length).forEach((b) => b()), f && g ? f : ((o = p[0]), p)
        );
      })
    );
    return d(q, {
      get when() {
        return c() && o;
      },
      children: (u) =>
        d(Ne.Provider, {
          value: u,
          get children() {
            return u.outlet();
          },
        }),
    });
  },
  x = (e) => {
    const t = je(() => e.children);
    return de(e, {
      get children() {
        return t();
      },
    });
  },
  re = () => {
    const e = Pe();
    return d(q, {
      get when() {
        return e.child;
      },
      children: (t) =>
        d(Ne.Provider, {
          value: t,
          get children() {
            return t.outlet();
          },
        }),
    });
  };
function le(e) {
  e = de({ inactiveClass: "inactive", activeClass: "active" }, e);
  const [, t] = Kt(e, [
      "href",
      "state",
      "class",
      "activeClass",
      "inactiveClass",
      "end",
    ]),
    n = xn(() => e.href),
    i = Nn(n),
    r = wt(),
    s = N(() => {
      const l = n();
      if (l === void 0) return !1;
      const o = ie(l.split(/[?#]/, 1)[0]).toLowerCase(),
        c = ie(r.pathname).toLowerCase();
      return e.end ? o === c : c.startsWith(o);
    });
  return (() => {
    const l = Rn.cloneNode(!0);
    return (
      on(
        l,
        de(t, {
          get href() {
            return i() || e.href;
          },
          get state() {
            return JSON.stringify(e.state);
          },
          get classList() {
            return {
              ...(e.class && { [e.class]: !0 }),
              [e.inactiveClass]: !s(),
              [e.activeClass]: s(),
              ...t.classList,
            };
          },
          get ["aria-current"]() {
            return s() ? "page" : void 0;
          },
        }),
        !1,
        !1
      ),
      l
    );
  })();
}
function Vn(e) {
  const t = Pn(),
    n = wt(),
    { href: i, state: r } = e,
    s = typeof i == "function" ? i({ navigate: t, location: n }) : i;
  return t(s, { replace: !0, state: r }), null;
}
const Ct =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAALXUlEQVR4nO1cbWwcxRl+3t27c/xBjOOzIcQlgENBbQRUhRiq0kKCBCFJpQBGVQOoP4oj0dIv0f5tVfUPUlVEK6QQWqlqS1vUqlQyIrQqCVURJKRpgwQIKA6B2EDjOI7ti+372Hn6475293bv9nb3fHdhH+l0M7vvzjvzPDPv7OzOHRAhQoQIESJEiBAhQoSPG6TZFWgXzN06uk00PA6QBMZ69/1pXxjlxsIopJXw5wuGBxPgVVT4tACriscV5YwGUIELmmg5UC1CR5oAxZAzAKBisqxRWwKATEybS6QW1WLivOzd06+nROMeEOvypfFxABeHUd9zQoADuCm2MHDiHg34GhU+R4gAAE02Ivm8QEAwf0Dlz7EQB8QgCAMAEM8YYCKOTixjfGC4VBhJAPhEWHVvewGeGbj0xhROPCHAFaxt7hsF4ou50MrVQiupCRgfHP4+oR0AcMWKOCQLn/CKbFsBxgc3/BDEwwD0FXFYHAE0pUNAW4ag8eRlu0D+YEWdhki6GW03Ap5Lrl8Lkcea4TsfgWibD4Kh7UZAVmI/AtC70n4tpH9c54BnL9wwAOCepjgvxn4SYSrQViNA5bgTUl5c1cACBH8A8b6A2aALsTPYeALEEACAPBFWm9pKAApu8Wg6ocXUlm0fvvteWL6FaoyQvSBoEGOhlRtWQSuB8YHhVwFcVctOA7Zum554bgWqFBhtNQcAWO/FSHrlQKMrEhbaRoBnN2zogMe7n9Q7HY18KhEq2kYAY1E7z6tt50XZ1Y2sS5hoGwFoiGcBcirT08i6hIn2EYAZzwIk6H20NBttI4AOzXOvJr2PlmajbQRQimu8G7OvgVUJFW0jgKZp53u1JeDZttloGwHAOnq1SDQCQgfr6tXRCAgb1OidVIkECB/UvIcVRiGoAfA+AliHbbPRRgLAc6+WOmybjTYSoK5e3TYjoG1eyCwTydJWthogJOnXz/SmW7aJ4PHyNsR8iSAmNXJszb/2h7IntIi2EeAsjXpIHfDrRyB7QK4rkA6g8EUOGSHuCS2i5QTg1q0dZxZlNylfAbARQHfFnhzbDgXCvmOBq2ZwZeEwzwJ4jcSTs3363sv37UtXr4AyFWP366NBNdBSc8CpzdvXzS5qh0h5FOAIyO6KHWmFfHF/Dos9tbRt0JTPn+smOQLwZ2tO5w6eumHzOhf3AABFjpGcLPstlXuCZGjvgotomXfC3Lq1Y3ZROwTFq60naEta4oLJznqO1kQpLcDR06fj11/+TvWRMD4wbOnvO6YnGsJVy4yAMwuyu0S+rTeXd6OZjjv0fMvONYsdSwKRvKbv/PT9TWuoDS0jAIBdTqRXhhg4k24jupqtEtnV1Jaa0DKTMMFPVW7/M4cba55O5yxb+Gk6bT0nSm0MreIB0ToCmHtv6aApXyWuWy6w3jqaHZgNvS0oVgCtE4LIN/zGdVdby5wBkx3faFo7bWgZAaj42yBxnQ5Eu9kCeLJZ7bSjZQTo79P3QvEoXYg251mYA5xJt9nCfheFowPp6b3V6sLK23M6GoaAlhFA9u1LUzO2C3nUQqQ5xABl0u0CASY7U2+32h7VqG+X11/PVKvLH4eG7Duwl8NvcR4tIwAAJF/eP7Um1TcCqAfnl5dgKFVPXLeRnv8YSmEhkwbIBweyMyPJV/dP1apHp+rqth06G35r82iZlbAdv+5fz7BuVTQA982857mtT194ySUxQ3+3dEDw/o6TE542BteLlrkNtaNLdOtDtgCQOvtZXOkX2ZYUJ0OpiANaVoAOETRrgCrF9SIW3+83yldLzQGtAk20S615hvZLGzuaOgJSt49eaACbNcgIwCtJXAagH0CP0yqXtrhggSlPhxX1GWzMQJCCwgyAYxT1pkYcTCvjwOALz35k83SNrar/9dvGWljxMT6/c2c/0/FdAt4L4FoAVR8teCU9n3V5jGHLk5aDAHEYxG/0WOx3q59/emY8OXwcUv41DhU3fWnm2GGPTawLKybA4tY7hgyJPwSo+wl0eSbd5SFbOeubdKf82ZxhPPnvY8fGMtlc0SDb022svvn48YasBRouAD87Fp+/YPYBEfwYCqYt5lZiK359XoVYpxDjRiyrCO3mX1Fh8tQMpmZOQ5GHd0xPbKrayABo6Bwwf9voFQva7FNCXF1e1ZotgsV1T6Tbz3vwr0FwcX8S/T09mDh5siGhp4iGjYCF2+++k+SvAPY0Ka6X835CHFF83rQIyj3Jl5972t7GMNAQAeZvG/0qwCdQGmErHdcrfVQPcXS2K4thCPGNNQf/ugchI3QBFm67azeBPUBrxfVK/26k2/3SVKz6ZvLg33+OEBGqAAu33nknBU+Rpj9RCjuux4COG7uQuK4D2lodAKE+yCJzKI30i8tATrmHOFv5tBPtZlOuiwHyruQrz/+lGg/1IDQB5m4d3QCoIwBWNyqua706ur/eC31dnvjS09FC2pjMIfVYCmrOqBrXK/zWEsY6ylIw9OuSR/72pjsb3hGKABwdTSzMG6+QKO/pCUA6AWSUgkFVvi4m6PlOL/S1WvkimwBAXoSFRxeBLEsN1ADENYEGsYhhJd2SsKZJ0yUEgP8kOTciR45kvXLkhlBuQ+fm1HcFplvNAvyEGIJYyhlYUjlkFaGgAALx61aB3VlgvpL0chrAamLxGoXMS3luNBHEoaFTE3TqOqQirruQ7maT9/OZU+j9FoCf+CLMhMAjYHHz6LqsbrwFsBsIMJkWvtJKIWVkcDa1hI+mp2FakfpCIhbD4Jo+dHd2okfX0SGaPa47pl1tWDqbEjE+OXDknx8GqV/gp6FZPfc9gN22964ov7Uy5WF7c1XsuSZ7QylkDYZCPgBkcjlMn55FRhnIFUOa5VP2bX37Bheb0tu5HqW0h4LWL5AA81t29pO8v6LCDiKU3yKaG2XLo0CAddYLjNIgrEJopTCsaSOKuyc3bekPUrdAAhDYBaLLSjoqSLdWvHClKW9uoC6COASDySQS8eBTVCIWw2Df+YhDoBfqVhS5PtJRISDJ7sRS9stB6heohYS610tcLyUsHdv5kURcgE7Rgc5OdAytg1J5shI36OjaHkN+U5tppMEUzgo+lsYV0i/ni9VAxCU/CcdF3Fa6tvpXHi/Fflt7SN4HwPffaPqehM/eeMfabDw3BUB8k24/b7rdSxsGDLJMSAxY/e0Yim9rraSX07kpYuERAXLlgnUCCU3LN9ZBgFqku9qUqptbe8Frh/7nQlVV+B4BuZhxM1kUsJJoy41QtYWZKW226xAp/+U5CCiAvyQ6HgBiQ7AJV6jTpCD1Cw1dCijcb5rqU5pkype4rAkcR7NTmvn/YYfEbgLwFHzAtwAKaiRs0h2JMHU0Y5aYfxhY9XkicS0Lo4EwpoD0YcHyiwSylT4cSbf5KB6oSbrZppy4HistABWuFPEW1wunYCbXx3OYfDoLLB8glvcDgFgugctKt9647pR2tCkcFPr/93bfAgi4obIBtgoCzr29Funm4w5lVfbk0ON6qSya0hX+Ctco4HL4hP8RQNsPpz2FGDfSLQlruh7Sq/iwkl7dX1XSnW18/zA8yG1ojzvpQNXeV4t0N5sVjeuVaWdhAIC+/yLNvwBkIrS4bktbbeDYq+sKMbVIdxXZc5s64BNBBCh8eSTdfNyBXE8hph7Sq/irGmIK19CUdvNXYeMDvgV46a23jxO4xLfncwgCHPd7bZBnQS8EuPZcg28ufAuggH/4vfZcQxAufAtg6EY0AgoIwkWgN2LPDAy/+3GfBwQ4vn164tLals4I+D6Avw9y/TmCQD95DfZKMh77KRq4d74N8HYmEX8kSAGBBNjxwdunNBhfgOAJAJNBymozTFKwV4PxxTum3pxpdmUiRIgQIUKECBEiRIjQXvg/HlAqZlSGodEAAAAASUVORK5CYII=",
  _t = me();
function zn(e) {
  const [t, n] = D(e.loggedIn || !1),
    i = [
      t,
      {
        logIn() {
          n(() => !0), localStorage.setItem("userLoggedIn", "true");
        },
        logOut() {
          n(() => !1), localStorage.removeItem("userLoggedIn");
        },
      },
    ];
  return d(_t.Provider, {
    value: i,
    get children() {
      return e.children;
    },
  });
}
function Le() {
  return ae(_t);
}
const Hn = m('<button class="btn warn log-btn">Log Out</button>'),
  jn = m('<button class="btn success log-btn">Log In</button>'),
  Wn = () => {
    const [e, { logIn: t, logOut: n }] = Le();
    return d(q, {
      get when() {
        return e();
      },
      get fallback() {
        return (() => {
          const i = jn.cloneNode(!0);
          return (i.$$click = () => t("user")), i;
        })();
      },
      get children() {
        const i = Hn.cloneNode(!0);
        return xe(i, "click", n, !0), i;
      },
    });
  };
J(["click"]);
const Qn = m('<img alt="Logo" id="logo">'),
  Mn = m('<nav id="navbar" class="container"><ul></ul></nav>'),
  et = m("<li></li>"),
  Kn = () => {
    const [e, t] = D([
        { name: "Dokumentation", href: "/dokumentation", auth: !1 },
        { name: "\xDCber uns", href: "/about", auth: !1 },
        { name: "User", href: "/user", auth: !0 },
        { name: "Admin", href: "/admin", auth: !0 },
      ]),
      [n, { logOut: i }] = Le();
    return (() => {
      const r = Mn.cloneNode(!0),
        s = r.firstChild;
      return (
        h(
          r,
          d(le, {
            href: "/",
            activeClass: !1,
            className: "no-style",
            get children() {
              const l = Qn.cloneNode(!0);
              return I(l, "src", Ct), l;
            },
          }),
          s
        ),
        h(
          s,
          d(T, {
            get each() {
              return e();
            },
            children: (l) =>
              d(q, {
                get when() {
                  return n();
                },
                get fallback() {
                  return d(q, {
                    get when() {
                      return !l.auth;
                    },
                    get children() {
                      const o = et.cloneNode(!0);
                      return (
                        h(
                          o,
                          d(le, {
                            get href() {
                              return l.href;
                            },
                            end: !1,
                            get children() {
                              return l.name;
                            },
                          })
                        ),
                        o
                      );
                    },
                  });
                },
                get children() {
                  const o = et.cloneNode(!0);
                  return (
                    h(
                      o,
                      d(le, {
                        get href() {
                          return l.href;
                        },
                        end: !1,
                        get children() {
                          return l.name;
                        },
                      })
                    ),
                    o
                  );
                },
              }),
          })
        ),
        h(r, d(Wn, {}), null),
        r
      );
    })();
  };
const Un = m('<header id="header" class="primary mode shadow"></header>'),
  Gn = m(
    '<footer id="footer" class="secondary mode"><div class="container">Footer</div></footer>'
  ),
  Yn = () => [
    (() => {
      const e = Un.cloneNode(!0);
      return h(e, d(Kn, {})), e;
    })(),
    d(re, {}),
    Gn.cloneNode(!0),
  ];
const Xn = m(
    '<aside class="sidebar bg mode"><div class="offcanvas-body"><nav><ul></ul></nav></div></aside>'
  ),
  Jn = m(
    '<li class="menu-block"><strong class="links-heading"><img alt="icon"></strong><ul></ul></li>'
  ),
  Zn = m("<li></li>"),
  ei = () => {
    const [e, t] = D([
      { name: "Technologie", navItems: ["Destillation", "Test", "Item 3"] },
      { name: "Mathematik", navItems: ["Einheiten", "Item 2", "Item 3"] },
      { name: "Drogenkunde", navItems: ["Sammlung", "Lernen", "Item 3"] },
      { name: "Spirituosen", navItems: ["Verordnung", "Item 2", "Item 3"] },
    ]);
    return (() => {
      const n = Xn.cloneNode(!0),
        i = n.firstChild,
        r = i.firstChild,
        s = r.firstChild;
      return (
        h(
          s,
          d(T, {
            get each() {
              return e();
            },
            children: (l) =>
              (() => {
                const o = Jn.cloneNode(!0),
                  c = o.firstChild,
                  u = c.firstChild,
                  a = c.nextSibling;
                return (
                  I(u, "src", Ct),
                  h(c, () => l.name, null),
                  h(
                    a,
                    d(T, {
                      get each() {
                        return l.navItems;
                      },
                      children: (f) =>
                        (() => {
                          const g = Zn.cloneNode(!0);
                          return (
                            h(
                              g,
                              d(le, {
                                get href() {
                                  return `/dokumentation/${l.name.toLocaleLowerCase()}/${f.toLocaleLowerCase()}`;
                                },
                                activeClass: "sidebar-active",
                                children: f,
                              })
                            ),
                            g
                          );
                        })(),
                    })
                  ),
                  o
                );
              })(),
          })
        ),
        n
      );
    })();
  };
const ti = m(
    '<div class="container sidebar-main-grid"><div class="main"></div></div>'
  ),
  ni = () =>
    (() => {
      const e = ti.cloneNode(!0),
        t = e.firstChild;
      return h(e, d(ei, {}), t), h(t, d(re, {})), e;
    })();
const ii = m('<div id="user" class="container">User</div>'),
  ri = () => (Le(), ii.cloneNode(!0));
const si = m("<div><h1>404</h1><p>Page not found.</p></div>"),
  tt = () => si.cloneNode(!0),
  li = m('<div class="intro"><h1></h1></div>'),
  oi = m("<br>"),
  ai = m('<div class="content"></div>'),
  ui = m(
    '<div class="toc"><h3>Auf dieser Seite</h3><div class="divider"></div><nav id="TableOfContents"><ul></ul></nav></div>'
  ),
  ci = m('<div><h2 class="headline"></h2><p></p><br></div>'),
  di = m('<div><h2 class="headline"></h2><code></code><p></p><br></div>'),
  fi = m("<li><a></a></li>"),
  Oe = (e) => {
    let t = e;
    return [
      (() => {
        const n = li.cloneNode(!0),
          i = n.firstChild;
        return h(i, () => t.title), h(n, () => t.subtitle, null), n;
      })(),
      oi.cloneNode(!0),
      (() => {
        const n = ai.cloneNode(!0);
        return (
          h(
            n,
            d(T, {
              get each() {
                return t.headline;
              },
              children: (i) =>
                i.type === "text"
                  ? (() => {
                      const r = ci.cloneNode(!0),
                        s = r.firstChild,
                        l = s.nextSibling;
                      return (
                        h(s, () => i.name),
                        h(l, () => i.content),
                        $(() => I(s, "id", i.name)),
                        r
                      );
                    })()
                  : i.type === "math"
                  ? (() => {
                      const r = di.cloneNode(!0),
                        s = r.firstChild,
                        l = s.nextSibling,
                        o = l.nextSibling;
                      return (
                        h(s, () => i.name),
                        h(l, () => i.formula),
                        h(o, () => i.content),
                        $(() => I(s, "id", i.name)),
                        r
                      );
                    })()
                  : null,
            })
          ),
          n
        );
      })(),
      (() => {
        const n = ui.cloneNode(!0),
          i = n.firstChild,
          r = i.nextSibling,
          s = r.nextSibling,
          l = s.firstChild;
        return (
          h(
            l,
            d(T, {
              get each() {
                return t.headline;
              },
              children: (o) =>
                (() => {
                  const c = fi.cloneNode(!0),
                    u = c.firstChild;
                  return (
                    h(u, () => o.name), $(() => I(u, "href", `#${o.name}`)), c
                  );
                })(),
            })
          ),
          n
        );
      })(),
    ];
  },
  gi = () =>
    d(Oe, {
      title: "Destillation",
      subtitle:
        "Hier lernst du alles rund ums Destillieren. Wir gehen auf das Prinzip, die Wirkmechanismen und den grundlegenden Aufbau einer Destillieranlage ein.",
      headline: [
        {
          type: "text",
          id: 1,
          name: "Prinzip",
          content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus. Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.",
        },
        {
          type: "text",
          id: 2,
          name: "Gegenstrom",
          content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus. Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.",
        },
      ],
    }),
  hi = () =>
    d(Oe, {
      title: "Test",
      subtitle:
        "Hier lernst du alles rund ums Destillieren. Wir gehen auf das Prinzip, die Wirkmechanismen und den grundlegenden Aufbau einer Destillieranlage ein.",
      headline: [
        {
          type: "text",
          id: 1,
          name: "Item1",
          content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus. Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.",
        },
        {
          type: "math",
          id: 2,
          name: "Zylinder",
          formula: "V = \u03C0 \xB7 r2 \xB7 h",
          content: "Some explanation text for your majesty.",
        },
      ],
    }),
  mi = () => d(re, {}),
  pi = () => [
    d(x, { path: "destillation", element: gi }),
    d(x, { path: "test", element: hi }),
  ],
  bi = () =>
    d(Oe, {
      title: "Einheiten",
      subtitle:
        "Hier lernst du alles rund ums Destillieren. Wir gehen auf das Prinzip, die Wirkmechanismen und den grundlegenden Aufbau einer Destillieranlage ein.",
      headline: [
        {
          type: "text",
          id: 1,
          name: "Headline1",
          content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus. Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.",
        },
        {
          type: "text",
          id: 2,
          name: "Headline2",
          content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus. Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.",
        },
      ],
    }),
  vi = () => d(re, {}),
  yi = () => d(x, { path: "einheiten", element: bi });
let kt = [
  {
    id: 1,
    name: "Enzianwurzel",
    type: "Wurzel",
    category: "Wurzeln",
    family: "Enziangew\xE4chse",
    origin: "Hochgebirge Europas",
    ingredients: [
      "bis 30% Gentianose (verg\xE4. Dreifachzucker)",
      "Gentin (gelber Farbstoff)",
      "Gentiopikrin (Bitterstoff)",
      "Amarogentin (Bitterstoff)",
      "Pektine",
      "6% fettes \xD6l",
    ],
    treatment: "Extraktionsverfahren",
    use: [
      "Alpenkr\xE4uterlik\xF6r",
      "Abteilik\xF6r",
      "Boonekamp",
      "Feinbitter",
      "Halb und Halb",
    ],
    note: "Eine typische Bitterstoffdroge, die magenberuhigend und verdauungsf\xF6rdernd wirkt. Wurde fr\xFCher als Fiebermittel eingesetz.",
    img: "enzianwurzel.png",
  },
  {
    id: 2,
    name: "Angelikawurzel",
    type: "Wurzel",
    category: "Wurzeln",
    family: "Doldengew\xE4chse",
    origin: "Europa, China, Ru\xDFland",
    ingredients: [
      "1% \xE4therisches \xD6l (Angelika\xF6l)",
      "Bitterstoffe",
      "Gerbstoffe",
      "bis 6% Harz",
      "S\xE4uren (Baldrians\xE4ure, Angelikas\xE4ure)",
      "bis 24% Zucker",
      "Wachse",
    ],
    treatment: ["Extraktionsverfahren", "Destillation (wird feiner)"],
    use: [
      "Altbitter",
      "Alpenkr\xE4uterlik\xF6r",
      "Angostura",
      "Boonekamp",
      "Stonsdorfer",
    ],
    note: "Fr\xFCher eines der wichtigsten Heilkr\xE4uter. Ein Magenmittel bei Koliken. Wirkt gegen Flatulenzen.",
    img: "angelikawurzel.png",
  },
  {
    id: 3,
    name: "S\xFC\xDFholzwurzel",
    type: "Wurzel",
    category: "Wurzeln",
    family: "H\xFClsenfruchtgew\xE4chse",
    origin: "S\xFCdeuropa, Nordafrika, S\xFCdasien",
    ingredients: [
      "7% Glycyrrhizins\xE4ure (stark s\xFC\xDF)",
      "St\xE4rke",
      "Bitterstoffe",
      "bis 23% Zucker",
      "Mannit",
      "Farbstoff (gelb)",
      "Cumarin",
    ],
    treatment: ["Extraktionsverfahren"],
    use: [
      "Alpenkr\xE4uterlik\xF6r",
      "Angostura",
      "Boonekamp",
      "Pastis",
      "Stonsdorfer",
    ],
    note: `Der eingedickte Saft wird zu Lakritz gepresst. Beschleunig die Heilung bei Magengeschw\xFCren. Durch Zugabe von Ammoniumchlorid ensteht Salmiak. 
Kennzeichnung auf Spirituosen: 
 - 10 bis 290 mg/l -> 'Enth\xE4lt S\xFC\xDFholz' 
 - ab 300 mg/l -> 'Enth\xE4lt S\xFC\xDFholz - bei hohem Blutdruck sollte ein \xFCberm\xE4\xDFiger Verzehr dieses Erzeugnisses vermieden werden'`,
    img: "suessholzwurzel.png",
  },
  {
    id: 4,
    name: "Chinarinde",
    type: "Rinde",
    category: "Rinden",
    family: "R\xF6tegew\xE4chse",
    origin: "Ostindien, Java, Sri Lanka, Jamaika",
    ingredients: [
      "\xE4therisches \xD6l",
      "3 - 18% Alkaloide: Chinin (bis 13%), Chinidrin (bis 4%), Chinchonin bis 8%",
      "Chinas\xE4ure",
      "Gerbs\xE4uren",
      "Chinovin",
      "Harze",
    ],
    treatment: ["Extraktionsverfahren"],
    use: [
      "Alpenkr\xE4uterlik\xF6r",
      "Angostura",
      "Chinabitter",
      "Halb und Halb",
      "Stonsdorfer",
    ],
    note: "Wurde fr\xFCher gegen Malaria und Wadenkr\xE4mpfe verwendet. Ist eine typische Bitterstoffdroge und wirkt verdauungsf\xF6rdernd und appetitanregend.",
    img: "chinarinde.png",
  },
];
const xt = me();
function $i(e) {
  const [t, n] = D(kt),
    i = [
      t,
      {
        getRandom() {
          let r = [];
          if (t())
            return (
              (r = [...t()].sort(function (l, o) {
                return 0.5 - Math.random();
              })),
              r
            );
        },
        getCategories() {
          let r = t();
          const s = [];
          if (t()) {
            for (let l = 0; l < r.length; l++)
              s.includes(r[l].category) || s.push(r[l].category);
            return s.sort();
          }
        },
        addNewDrug(r) {
          n([...t(), r]);
        },
      },
    ];
  return d(xt.Provider, {
    value: i,
    get children() {
      return e.children;
    },
  });
}
function Ee() {
  return ae(xt);
}
const wi = m(
    '<div id="drug-detail"><div class="wrapper align-base justify-between"><h1 class="card-title"></h1><div class="btn-group"><button class="btn icon-btn primary"><i class="bi-printer"></i></button><button class="btn primary" onclick="history.back()">back</button></div></div><div class="divider"></div><div class="wrapper"><div><p class="card-note"></p><p><span class="bold">Art: </span></p><p><span class="bold">Familie: </span></p><p><span class="bold">Herkunft: </span></p><div class="list-box"><label for="list-ingredients"><span class="bold">Inhaltsstoffe: </span></label><ul name="list-ingredients"></ul></div><p><span class="bold">Verarbeitung: </span></p><div class="list-box"><label for="list-use"><span class="bold">Verwendung: </span></label><ul name="list-use"></ul></div></div><img class="card-img"></div></div>'
  ),
  nt = m("<li></li>"),
  Ai = () => {
    const e = Ln().id,
      [t] = Ee();
    let i = t().filter((s) => s.name.toLowerCase() === e)[0];
    function r() {
      (document.title = `Steckbrief ${i.name}`), window.print();
    }
    return (() => {
      const s = wi.cloneNode(!0),
        l = s.firstChild,
        o = l.firstChild,
        c = o.nextSibling,
        u = c.firstChild,
        a = l.nextSibling,
        f = a.nextSibling,
        g = f.firstChild,
        p = g.firstChild,
        b = p.nextSibling;
      b.firstChild;
      const A = b.nextSibling;
      A.firstChild;
      const P = A.nextSibling;
      P.firstChild;
      const E = P.nextSibling,
        _ = E.firstChild,
        L = _.nextSibling,
        C = E.nextSibling;
      C.firstChild;
      const O = C.nextSibling,
        V = O.firstChild,
        U = V.nextSibling,
        Z = g.nextSibling;
      return (
        h(o, () => i.name),
        (u.$$click = r),
        h(p, () => i.note),
        h(b, () => i.type, null),
        h(A, () => i.family, null),
        h(P, () => i.origin, null),
        h(
          L,
          d(T, {
            get each() {
              return i.ingredients;
            },
            children: (F) =>
              (() => {
                const v = nt.cloneNode(!0);
                return h(v, F), v;
              })(),
          })
        ),
        h(C, () => i.treatment, null),
        h(
          U,
          d(T, {
            get each() {
              return i.use;
            },
            children: (F) =>
              (() => {
                const v = nt.cloneNode(!0);
                return h(v, F), v;
              })(),
          })
        ),
        $(
          (F) => {
            const v = i.img,
              y = i.name;
            return (
              v !== F._v$ && I(Z, "src", (F._v$ = v)),
              y !== F._v$2 && I(Z, "alt", (F._v$2 = y)),
              F
            );
          },
          { _v$: void 0, _v$2: void 0 }
        ),
        s
      );
    })();
  };
J(["click"]);
const it = "/assets/placeholder.a89b4425.svg",
  Si = m('<button class="btn info btn-sm view-btn"></button>'),
  Ci = m(
    '<div name="DrugCard" class="card simple"><img class="card-img"><div class="card-body"><h4></h4></div></div>'
  ),
  _i = m('<img class="card-img">'),
  ki = m(
    '<div class="card-body"><h4 class="card-title"></h4><div class="card-note"></div></div>'
  ),
  xi = m('<div name="DrugCard" class="card"></div>'),
  Nt = (e) => {
    const t = e,
      [n, i] = D(!1),
      [r, s] = D(!1);
    function l() {
      i(!n()), setTimeout(() => i(!n()), 1500);
    }
    function o(c) {
      c.stopPropagation(), s(!r()), setTimeout(() => s(!1), 5e3);
    }
    return d(q, {
      get when() {
        return e.simple;
      },
      get fallback() {
        return (() => {
          const c = xi.cloneNode(!0);
          return (
            h(
              c,
              d(le, {
                get href() {
                  return t.name.toLowerCase();
                },
                get children() {
                  return [
                    (() => {
                      const u = _i.cloneNode(!0);
                      return (
                        $(
                          (a) => {
                            const f = t.img ? `/public/${t.img}` : it,
                              g = t.name;
                            return (
                              f !== a._v$5 && I(u, "src", (a._v$5 = f)),
                              g !== a._v$6 && I(u, "alt", (a._v$6 = g)),
                              a
                            );
                          },
                          { _v$5: void 0, _v$6: void 0 }
                        ),
                        u
                      );
                    })(),
                    (() => {
                      const u = ki.cloneNode(!0),
                        a = u.firstChild,
                        f = a.nextSibling;
                      return h(a, () => t.name), h(f, () => t.note), u;
                    })(),
                  ];
                },
              })
            ),
            c
          );
        })();
      },
      get children() {
        const c = Ci.cloneNode(!0),
          u = c.firstChild,
          a = u.nextSibling,
          f = a.firstChild;
        return (
          xe(c, "click", n() ? "" : l, !0),
          h(
            c,
            d(q, {
              get when() {
                return !n();
              },
              get children() {
                const g = Si.cloneNode(!0);
                return (g.$$click = o), h(g, () => (r() ? "small" : "big")), g;
              },
            }),
            a
          ),
          h(f, () => (n() ? t.name : "?")),
          $(
            (g) => {
              const p = !r(),
                b = t.img ? `/public/${t.img}` : it,
                A = t.name,
                P = n() ? "card-title ani" : "card-title";
              return (
                p !== g._v$ && c.classList.toggle("small", (g._v$ = p)),
                b !== g._v$2 && I(u, "src", (g._v$2 = b)),
                A !== g._v$3 && I(u, "alt", (g._v$3 = A)),
                P !== g._v$4 && (f.className = g._v$4 = P),
                g
              );
            },
            { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
          ),
          c
        );
      },
    });
  };
J(["click"]);
const Pt = me();
function Ni(e) {
  const [t, n] = D(kt),
    i = [
      t,
      {
        getRandom() {
          let r = [];
          t() &&
            ((r = [...t()].sort(function (l, o) {
              return 0.5 - Math.random();
            })),
            n(r));
        },
      },
    ];
  return d(Pt.Provider, {
    value: i,
    get children() {
      return e.children;
    },
  });
}
function Pi() {
  return ae(Pt);
}
const Li = m('<div class="intro"><h1>Teste dein Wissen</h1>Some text.</div>'),
  Oi = m("<br>"),
  Ei = m(
    '<div id="drug-learn" class="content wrapper gap-1 flex-wrap "></div>'
  ),
  Di = m(
    '<div class="toc"><h3>Einstellungen</h3><div class="divider"></div><ul><li><button class="btn primary">Mischen</button></li></ul></div>'
  ),
  Bi = m("<div>loading...</div>"),
  qi = () => {
    const [e, { getRandom: t }] = Pi();
    return [
      Li.cloneNode(!0),
      Oi.cloneNode(!0),
      (() => {
        const n = Ei.cloneNode(!0);
        return (
          h(
            n,
            d(q, {
              get when() {
                return e();
              },
              get fallback() {
                return Bi.cloneNode(!0);
              },
              get children() {
                return d(T, {
                  get each() {
                    return e();
                  },
                  children: (i) =>
                    d(
                      Nt,
                      de({ simple: !0 }, i, {
                        get children() {
                          return props.children;
                        },
                      })
                    ),
                });
              },
            })
          ),
          n
        );
      })(),
      (() => {
        const n = Di.cloneNode(!0),
          i = n.firstChild,
          r = i.nextSibling,
          s = r.nextSibling,
          l = s.firstChild,
          o = l.firstChild;
        return xe(o, "click", t, !0), n;
      })(),
    ];
  };
J(["click"]);
const Ii = m('<div class="category-box"><h3 class="headline"></h3></div>'),
  Ri = m('<div class="drug-content-tile"></div>'),
  Ti = m("<ul></ul>"),
  Fi = m('<li class="list"></li>'),
  rt = (e) => {
    const [t, { getCategories: n }] = Ee(),
      i = de(e),
      r = i.view,
      s = i.setView,
      l = i.viewOptions;
    localStorage.getItem("drugViewPreference")
      ? s(localStorage.getItem("drugViewPreference"))
      : s(l[0]);
    function o(u) {
      let a = document.getElementsByClassName("card");
      for (let f = 0; f < a.length; f++) a.item(f).className = `card ${u}`;
    }
    ot(() => {
      localStorage.setItem("drugViewPreference", `${r()}`), o(r());
    });
    function c(u) {
      return t().filter((a) => a.category === u);
    }
    return d(T, {
      get each() {
        return n();
      },
      children: (u) =>
        (() => {
          const a = Ii.cloneNode(!0),
            f = a.firstChild;
          return (
            I(f, "id", u),
            h(f, u),
            h(
              a,
              (() => {
                const g = N(() => r() != "list");
                return () =>
                  g()
                    ? (() => {
                        const p = Ri.cloneNode(!0);
                        return (
                          h(
                            p,
                            d(T, {
                              get each() {
                                return c(u);
                              },
                              children: (b) => d(Nt, b),
                            })
                          ),
                          p
                        );
                      })()
                    : (() => {
                        const p = Ti.cloneNode(!0);
                        return (
                          h(
                            p,
                            d(T, {
                              get each() {
                                return c(u);
                              },
                              children: (b) =>
                                (() => {
                                  const A = Fi.cloneNode(!0);
                                  return (
                                    h(
                                      A,
                                      d(le, {
                                        get href() {
                                          return `/dokumentation/drogenkunde/sammlung/${b.name.toLowerCase()}`;
                                        },
                                        get children() {
                                          return b.name;
                                        },
                                      })
                                    ),
                                    A
                                  );
                                })(),
                            })
                          ),
                          p
                        );
                      })();
              })(),
              null
            ),
            a
          );
        })(),
    });
  };
const Te = Symbol("store-raw"),
  ge = Symbol("store-node"),
  Vi = Symbol("store-name");
function Lt(e, t) {
  let n = e[W];
  if (
    !n &&
    (Object.defineProperty(e, W, { value: (n = new Proxy(e, ji)) }),
    !Array.isArray(e))
  ) {
    const i = Object.keys(e),
      r = Object.getOwnPropertyDescriptors(e);
    for (let s = 0, l = i.length; s < l; s++) {
      const o = i[s];
      if (r[o].get) {
        const c = r[o].get.bind(n);
        Object.defineProperty(e, o, { enumerable: r[o].enumerable, get: c });
      }
    }
  }
  return n;
}
function _e(e) {
  let t;
  return (
    e != null &&
    typeof e == "object" &&
    (e[W] ||
      !(t = Object.getPrototypeOf(e)) ||
      t === Object.prototype ||
      Array.isArray(e))
  );
}
function he(e, t = new Set()) {
  let n, i, r, s;
  if ((n = e != null && e[Te])) return n;
  if (!_e(e) || t.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? (e = e.slice(0)) : t.add(e);
    for (let l = 0, o = e.length; l < o; l++)
      (r = e[l]), (i = he(r, t)) !== r && (e[l] = i);
  } else {
    Object.isFrozen(e) ? (e = Object.assign({}, e)) : t.add(e);
    const l = Object.keys(e),
      o = Object.getOwnPropertyDescriptors(e);
    for (let c = 0, u = l.length; c < u; c++)
      (s = l[c]), !o[s].get && ((r = e[s]), (i = he(r, t)) !== r && (e[s] = i));
  }
  return e;
}
function Me(e) {
  let t = e[ge];
  return t || Object.defineProperty(e, ge, { value: (t = {}) }), t;
}
function Fe(e, t, n) {
  return e[t] || (e[t] = Et(n));
}
function zi(e, t) {
  const n = Reflect.getOwnPropertyDescriptor(e, t);
  return (
    !n ||
      n.get ||
      !n.configurable ||
      t === W ||
      t === ge ||
      t === Vi ||
      (delete n.value, delete n.writable, (n.get = () => e[W][t])),
    n
  );
}
function Ot(e) {
  if (ut()) {
    const t = Me(e);
    (t._ || (t._ = Et()))();
  }
}
function Hi(e) {
  return Ot(e), Reflect.ownKeys(e);
}
function Et(e) {
  const [t, n] = D(e, { equals: !1, internal: !0 });
  return (t.$ = n), t;
}
const ji = {
  get(e, t, n) {
    if (t === Te) return e;
    if (t === W) return n;
    if (t === qe) return Ot(e), n;
    const i = Me(e),
      r = i.hasOwnProperty(t);
    let s = r ? i[t]() : e[t];
    if (t === ge || t === "__proto__") return s;
    if (!r) {
      const l = Object.getOwnPropertyDescriptor(e, t);
      ut() &&
        (typeof s != "function" || e.hasOwnProperty(t)) &&
        !(l && l.get) &&
        (s = Fe(i, t, s)());
    }
    return _e(s) ? Lt(s) : s;
  },
  has(e, t) {
    return t === Te || t === W || t === qe || t === ge || t === "__proto__"
      ? !0
      : (this.get(e, t, e), t in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Hi,
  getOwnPropertyDescriptor: zi,
};
function ke(e, t, n, i = !1) {
  if (!i && e[t] === n) return;
  const r = e[t],
    s = e.length;
  n === void 0 ? delete e[t] : (e[t] = n);
  let l = Me(e),
    o;
  (o = Fe(l, t, r)) && o.$(() => n),
    Array.isArray(e) &&
      e.length !== s &&
      (o = Fe(l, "length", s)) &&
      o.$(e.length),
    (o = l._) && o.$();
}
function Dt(e, t) {
  const n = Object.keys(t);
  for (let i = 0; i < n.length; i += 1) {
    const r = n[i];
    ke(e, r, t[r]);
  }
}
function Wi(e, t) {
  if ((typeof t == "function" && (t = t(e)), (t = he(t)), Array.isArray(t))) {
    if (e === t) return;
    let n = 0,
      i = t.length;
    for (; n < i; n++) {
      const r = t[n];
      e[n] !== r && ke(e, n, r);
    }
    ke(e, "length", i);
  } else Dt(e, t);
}
function ue(e, t, n = []) {
  let i,
    r = e;
  if (t.length > 1) {
    i = t.shift();
    const l = typeof i,
      o = Array.isArray(e);
    if (Array.isArray(i)) {
      for (let c = 0; c < i.length; c++) ue(e, [i[c]].concat(t), n);
      return;
    } else if (o && l === "function") {
      for (let c = 0; c < e.length; c++) i(e[c], c) && ue(e, [c].concat(t), n);
      return;
    } else if (o && l === "object") {
      const { from: c = 0, to: u = e.length - 1, by: a = 1 } = i;
      for (let f = c; f <= u; f += a) ue(e, [f].concat(t), n);
      return;
    } else if (t.length > 1) {
      ue(e[i], t, [i].concat(n));
      return;
    }
    (r = e[i]), (n = [i].concat(n));
  }
  let s = t[0];
  (typeof s == "function" && ((s = s(r, n)), s === r)) ||
    (i === void 0 && s == null) ||
    ((s = he(s)),
    i === void 0 || (_e(r) && _e(s) && !Array.isArray(s))
      ? Dt(r, s)
      : ke(e, i, s));
}
function Qi(...[e, t]) {
  const n = he(e || {}),
    i = Array.isArray(n),
    r = Lt(n);
  function s(...l) {
    It(() => {
      i && l.length === 1 ? Wi(n, l[0]) : ue(n, l);
    });
  }
  return [r, s];
}
const Mi = m(
    '<select name="category"><option value="">Kategorie</option></select>'
  ),
  Ki = m(
    '<div id="add-drug" class=""><div class="wrapper align-center gap-1"></div><div id="drug-detail"><div class="wrapper align-base justify-between"></div><div class="divider mb-1"></div><form class="wrapper col gap-1"><input autofocus name="name" type="text" placeholder="Name"><input name="type" type="text" placeholder="Art"><div class="wrapper gap-1"><div class="wrapper align-center"><input type="checkbox" name="new-category" id="new-category"><label for="new-category">Neue Kategorie?</label></div></div><input name="family" type="text" placeholder="Familie"><input name="origin" type="text" placeholder="Herkunft"><div class="wrapper gap-1"><input name="ingredients" id="ingredients" type="text" placeholder="Inhaltsstoffe"><button type="button" class="btn primary btn-sm">Add</button><div>Inhaltsstoffe </div></div><input name="treatment" type="text" placeholder="Verarbeitung"><div class="wrapper gap-1"><input name="use" type="text" placeholder="Verwendung"><div>Verwendung </div></div><textarea name="note" type="text" placeholder="Notiz"></textarea><input name="drug-img" type="file" placeholder="Bild"><button class="btn primary" type="button">submit</button></form></div></div>'
  ),
  Ui = m('<input name="category" type="text" placeholder="Kategorie">'),
  Gi = m("<option></option>"),
  Yi = () => {
    const [e, { getCategories: t, addNewDrug: n }] = Ee(),
      [i, r] = D(!1),
      [s, l] = Qi({
        id: "",
        name: "",
        type: "",
        category: "",
        family: "",
        origin: "",
        ingredients: [],
        treatment: "",
        use: [],
        note: "",
        img: "",
      });
    ot(() => {
      t();
    });
    const o = (f) => {
      f.preventDefault(), l([f.target.name], f.currentTarget.value);
    };
    function c() {
      let f = document.getElementById("ingredients").value;
      l("ingredients", [...s.ingredients, f]),
        (document.getElementById("ingredients").value = "");
    }
    function u(f) {
      f.target.checked ? r(!0) : r(!1);
    }
    function a(f) {
      f.preventDefault(), n(s), alert("New drug added");
    }
    return (() => {
      const f = Ki.cloneNode(!0),
        g = f.firstChild,
        p = g.nextSibling,
        b = p.firstChild,
        A = b.nextSibling,
        P = A.nextSibling,
        E = P.firstChild,
        _ = E.nextSibling,
        L = _.nextSibling,
        C = L.firstChild,
        O = C.firstChild,
        V = L.nextSibling,
        U = V.nextSibling,
        Z = U.nextSibling,
        F = Z.firstChild,
        v = F.nextSibling,
        y = v.nextSibling;
      y.firstChild;
      const k = Z.nextSibling,
        ee = k.nextSibling,
        G = ee.firstChild,
        z = G.nextSibling;
      z.firstChild;
      const H = ee.nextSibling,
        Q = H.nextSibling,
        te = Q.nextSibling;
      return (
        (E.$$input = o),
        (_.$$input = o),
        h(
          L,
          d(q, {
            get when() {
              return i() === !1;
            },
            get fallback() {
              return (() => {
                const R = Ui.cloneNode(!0);
                return (R.$$input = o), $(() => (R.value = s.category)), R;
              })();
            },
            get children() {
              const R = Mi.cloneNode(!0);
              return (
                R.firstChild,
                (R.$$input = o),
                h(
                  R,
                  d(T, {
                    get each() {
                      return t();
                    },
                    children: (Ke) =>
                      (() => {
                        const De = Gi.cloneNode(!0);
                        return (De.value = Ke), h(De, Ke), De;
                      })(),
                  }),
                  null
                ),
                $(() => (R.value = s.category)),
                R
              );
            },
          }),
          C
        ),
        (O.$$click = u),
        (V.$$input = o),
        (U.$$input = o),
        (v.$$click = c),
        h(y, () => s.ingredients, null),
        (k.$$input = o),
        (G.$$input = o),
        h(z, () => s.use, null),
        (H.$$input = o),
        (te.$$click = a),
        $(() => (E.value = s.name)),
        $(() => (_.value = s.type)),
        $(() => (O.checked = i())),
        $(() => (V.value = s.family)),
        $(() => (U.value = s.origin)),
        $(() => (k.value = s.treatment)),
        $(() => (G.value = s.use)),
        $(() => (H.value = s.note)),
        f
      );
    })();
  };
J(["input", "click"]);
const Xi = m("<h1>Drogensammlung</h1>"),
  Ji = m('<div class="button-group"></div>'),
  Zi = m(
    '<div id="drug-overview" class="intro"><div class="drug-intro-title"></div></div>'
  ),
  er = m('<button class="btn secondary mb-1">Back</button>'),
  tr = m('<div id="drug-content" class="content"></div>'),
  nr = m("<h3>Auf dieser Seite</h3>"),
  ir = m('<div class="divider"></div>'),
  rr = m('<nav id="TableOfContents"><ul></ul></nav>'),
  sr = m('<div class="toc"></div>'),
  lr = m("<h1>Neue Droge anlegen</h1>"),
  or = m('<button class="btn primary"></button>'),
  ar = m("<div>loading drugs...</div>"),
  ur = m('<button class="btn secondary mb-1">Add new drug</button>'),
  cr = m("<li><a></a></li>"),
  dr = () => {
    const [e, t] = D(),
      [n, i] = D(!1),
      r = ["tile", "small", "list"],
      s = { view: e, setView: t, viewOptions: r },
      [l] = Le(),
      [o, { getCategories: c }] = Ee();
    return [
      (() => {
        const u = Zi.cloneNode(!0),
          a = u.firstChild;
        return (
          h(
            a,
            d(q, {
              get when() {
                return !n();
              },
              get fallback() {
                return lr.cloneNode(!0);
              },
              get children() {
                return [
                  Xi.cloneNode(!0),
                  "Eine Sammlung typischer und weniger typischer Drogen, die Verwendung in Spirituosen finden.",
                ];
              },
            })
          ),
          h(
            u,
            d(q, {
              get when() {
                return !n();
              },
              get children() {
                const f = Ji.cloneNode(!0);
                return (
                  h(
                    f,
                    d(T, {
                      each: r,
                      children: (g) =>
                        (() => {
                          const p = or.cloneNode(!0);
                          return (
                            (p.$$click = () => t(g)),
                            h(p, g),
                            $(() => p.classList.toggle("active", g === e())),
                            p
                          );
                        })(),
                    })
                  ),
                  f
                );
              },
            }),
            null
          ),
          u
        );
      })(),
      (() => {
        const u = tr.cloneNode(!0);
        return (
          h(
            u,
            d(q, {
              get when() {
                return o();
              },
              get fallback() {
                return ar.cloneNode(!0);
              },
              get children() {
                return d(q, {
                  get when() {
                    return l();
                  },
                  get fallback() {
                    return d(rt, s);
                  },
                  get children() {
                    return d(q, {
                      get when() {
                        return n();
                      },
                      get fallback() {
                        return [
                          (() => {
                            const a = ur.cloneNode(!0);
                            return (a.$$click = () => i(!n())), a;
                          })(),
                          d(rt, s),
                        ];
                      },
                      get children() {
                        return [
                          (() => {
                            const a = er.cloneNode(!0);
                            return (a.$$click = () => i(!n())), a;
                          })(),
                          d(Yi, {}),
                        ];
                      },
                    });
                  },
                });
              },
            })
          ),
          u
        );
      })(),
      (() => {
        const u = sr.cloneNode(!0);
        return (
          h(
            u,
            d(q, {
              get when() {
                return !n();
              },
              get children() {
                return [
                  nr.cloneNode(!0),
                  ir.cloneNode(!0),
                  (() => {
                    const a = rr.cloneNode(!0),
                      f = a.firstChild;
                    return (
                      h(
                        f,
                        d(T, {
                          get each() {
                            return c();
                          },
                          children: (g) =>
                            (() => {
                              const p = cr.cloneNode(!0),
                                b = p.firstChild;
                              return I(b, "href", `#${g}`), h(b, g), p;
                            })(),
                        })
                      ),
                      a
                    );
                  })(),
                ];
              },
            })
          ),
          u
        );
      })(),
    ];
  };
J(["click"]);
const fr = () => d(re, {}),
  gr = () => [
    d(x, { path: "sammlung", element: dr }),
    d(x, { path: "sammlung/:id", element: Ai }),
    d(x, { path: "lernen", element: qi }),
  ],
  hr = () =>
    d(Oe, {
      title: "Verordnung",
      subtitle:
        "Hier lernst du alles rund ums Destillieren. Wir gehen auf das Prinzip, die Wirkmechanismen und den grundlegenden Aufbau einer Destillieranlage ein.",
      headline: [
        {
          type: "text",
          id: 1,
          name: "Headline1",
          content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus. Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.",
        },
        {
          type: "text",
          id: 2,
          name: "Headline2",
          content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus. Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula.",
        },
      ],
    }),
  mr = () => d(re, {}),
  pr = () => d(x, { path: "verordnung", element: hr });
const br = m(
    '<div id="home" class="container"><h1>Willkommen bei Extrakt</h1><h4>der Seite rund ums Lernen f\xFCr Profi- und Hobbydestillateure</h4></div>'
  ),
  vr = () => br.cloneNode(!0);
const yr = m(
    '<div id="about" class="container"><section id="about-me"><h1>\xDCber mich</h1><div class="wrapper align-center"><div><p>Hi, ich bin Norbert!</p><p>Als Destillateur-Anf\xE4nger, war ich schockiert dar\xFCber, wie alt und wie schlecht die Arbeitsmaterialien sind, mit denen wir lernen sollten. Sp\xE4ter, als Ausbilder, machte ich die Erfahrung, dass sich daran nichts ge\xE4ndert hatte. Meine Azubis berichteten mir \xFCber wechselnde Lehrer*innen und Probleme im Verst\xE4ndnis.</p><p>Das dieser Beruf so Stiefm\xFCtterlich behandelt wird, liegt meiner Ansicht nach daran, dass es niemanden so richtig interessiert - denn wir sind klein. Alleine in der Stadt Dortmund gibt es mehr B\xE4cker, als Brennereien in ganz Deutschland.</p><p>Also m\xFCssen wir uns selber helfen, das haben wir immer schon getan. Und schon damals, 2014, entschloss ich mich, etwas zu tun. Aber <span>was</span> kann ich machen? Nun, ich kann meine Programmierkenntnisse dazu nutzen, das vorhandenen Wissen zu Sammeln, aufzubereiten und ins 21. Jhd. zu bef\xF6rdern. Wissen sollte barrierefrei, einfach, verst\xE4ndlich und allen zug\xE4nglich sein. Ich hoffe hier mit einen Beitrag leisten zu k\xF6nnen, dass dieser Beruf nicht in Vergessenheit ger\xE4t.</p></div><img src="/src/assets/placeholder.svg" alt="Bild von Norbert"></div></section></div>'
  ),
  $r = () => yr.cloneNode(!0),
  wr = m('<div class="container">Admin</div>');
function Ar() {
  return d(Fn, {
    get children() {
      return d(x, {
        path: "/",
        component: Yn,
        get children() {
          return [
            d(x, { path: "/", component: vr }),
            d(x, {
              path: "/dokumentation",
              get element() {
                return d(Vn, {
                  href: "/dokumentation/technologie/destillation",
                });
              },
            }),
            d(x, {
              path: "dokumentation",
              component: ni,
              get children() {
                return [
                  d(x, {
                    path: "technologie",
                    component: mi,
                    get children() {
                      return d(pi, {});
                    },
                  }),
                  d(x, {
                    path: "mathematik",
                    component: vi,
                    get children() {
                      return d(yi, {});
                    },
                  }),
                  d(x, {
                    path: "drogenkunde",
                    component: fr,
                    get children() {
                      return d(gr, {});
                    },
                  }),
                  d(x, {
                    path: "spirituosen",
                    component: mr,
                    get children() {
                      return d(pr, {});
                    },
                  }),
                  d(x, { path: "*", component: tt }),
                ];
              },
            }),
            d(x, { path: "user", component: ri }),
            d(x, {
              path: "admin",
              get element() {
                return wr.cloneNode(!0);
              },
            }),
            d(x, { path: "about", component: $r }),
            d(x, { path: "*", component: tt }),
          ];
        },
      });
    },
  });
}
let Ve = "";
localStorage.getItem("userLoggedIn") ? (Ve = !0) : (Ve = !1);
tn(
  () =>
    d(zn, {
      loggedIn: Ve,
      get children() {
        return d($i, {
          get children() {
            return d(Ni, {
              get children() {
                return d(Tn, {
                  get children() {
                    return d(Ar, {});
                  },
                });
              },
            });
          },
        });
      },
    }),
  document.getElementById("root")
);
