(function(a, b) {
    typeof define == "function" && define.amd ? define(function() {
        return b(a)
    }) : b(a)
}
)(this, function(window) {
    var Zepto = function() {
        function _(a, b) {
            b(a);
            for (var c = 0, d = a.childNodes.length; c < d; c++)
                _(a.childNodes[c], b)
        }
        function $(a) {
            try {
                return a ? a == "true" || (a == "false" ? !1 : a == "null" ? null : +a + "" == a ? +a : /^[\[\{]/.test(a) ? c.parseJSON(a) : a) : a
            } catch (b) {
                return a
            }
        }
        function Z(b, c) {
            var d = b.className || ""
              , e = d && d.baseVal !== a;
            if (c === a)
                return e ? d.baseVal : d;
            e ? d.baseVal = c : b.className = c
        }
        function Y(a, b, c) {
            c == null ? a.removeAttribute(b) : a.setAttribute(b, c)
        }
        function X(a, b, c, d) {
            return H(b) ? b.call(a, c, d) : b
        }
        function W(a, b) {
            return b == null ? c(a) : c(a).filter(b)
        }
        function V(c, d, e) {
            for (b in d)
                e && (L(d[b]) || F(d[b])) ? (L(d[b]) && !L(c[b]) && (c[b] = {}),
                F(d[b]) && !F(c[b]) && (c[b] = []),
                V(c[b], d[b], e)) : d[b] !== a && (c[b] = d[b])
        }
        function U(a, b) {
            var c, d = a ? a.length : 0;
            for (c = 0; c < d; c++)
                this[c] = a[c];
            this.length = d,
            this.selector = b || ""
        }
        function T(a) {
            return "children"in a ? h.call(a.children) : c.map(a.childNodes, function(a) {
                if (a.nodeType == 1)
                    return a
            })
        }
        function S(a) {
            var b, c;
            j[a] || (b = i.createElement(a),
            i.body.appendChild(b),
            c = getComputedStyle(b, "").getPropertyValue("display"),
            b.parentNode.removeChild(b),
            c == "none" && (c = "block"),
            j[a] = c);
            return j[a]
        }
        function R(a, b) {
            return typeof b == "number" && !l[P(a)] ? b + "px" : b
        }
        function Q(a) {
            return a in k ? k[a] : k[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
        }
        function P(a) {
            return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }
        function O(a) {
            return a.length > 0 ? c.fn.concat.apply([], a) : a
        }
        function N(a) {
            return g.call(a, function(a) {
                return a != null
            })
        }
        function M(a) {
            var b = !!a && "length"in a && a.length
              , d = c.type(a);
            return "function" != d && !I(a) && ("array" == d || b === 0 || typeof b == "number" && b > 0 && b - 1 in a)
        }
        function L(a) {
            return K(a) && !I(a) && Object.getPrototypeOf(a) == Object.prototype
        }
        function K(a) {
            return G(a) == "object"
        }
        function J(a) {
            return a != null && a.nodeType == a.DOCUMENT_NODE
        }
        function I(a) {
            return a != null && a == a.window
        }
        function H(a) {
            return G(a) == "function"
        }
        function G(a) {
            return a == null ? String(a) : y[z.call(a)] || "object"
        }
        var a, b, c, d, e = [], f = e.concat, g = e.filter, h = e.slice, i = window.document, j = {}, k = {}, l = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        }, m = /^\s*<(\w+|!)[^>]*>/, n = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, o = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, p = /^(?:body|html)$/i, q = /([A-Z])/g, r = ["val", "css", "html", "text", "data", "width", "height", "offset"], s = ["after", "prepend", "before", "append"], t = i.createElement("table"), u = i.createElement("tr"), v = {
            tr: i.createElement("tbody"),
            tbody: t,
            thead: t,
            tfoot: t,
            td: u,
            th: u,
            "*": i.createElement("div")
        }, w = /complete|loaded|interactive/, x = /^[\w-]*$/, y = {}, z = y.toString, A = {}, B, C, D = i.createElement("div"), E = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        }, F = Array.isArray || function(a) {
            return a instanceof Array
        }
        ;
        A.matches = function(a, b) {
            if (!b || !a || a.nodeType !== 1)
                return !1;
            var c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
            if (c)
                return c.call(a, b);
            var d, e = a.parentNode, f = !e;
            f && (e = D).appendChild(a),
            d = ~A.qsa(e, b).indexOf(a),
            f && D.removeChild(a);
            return d
        }
        ,
        B = function(a) {
            return a.replace(/-+(.)?/g, function(a, b) {
                return b ? b.toUpperCase() : ""
            })
        }
        ,
        C = function(a) {
            return g.call(a, function(b, c) {
                return a.indexOf(b) == c
            })
        }
        ,
        A.fragment = function(b, d, e) {
            var f, g, j;
            n.test(b) && (f = c(i.createElement(RegExp.$1))),
            f || (b.replace && (b = b.replace(o, "<$1></$2>")),
            d === a && (d = m.test(b) && RegExp.$1),
            d in v || (d = "*"),
            j = v[d],
            j.innerHTML = "" + b,
            f = c.each(h.call(j.childNodes), function() {
                j.removeChild(this)
            })),
            L(e) && (g = c(f),
            c.each(e, function(a, b) {
                r.indexOf(a) > -1 ? g[a](b) : g.attr(a, b)
            }));
            return f
        }
        ,
        A.Z = function(a, b) {
            return new U(a,b)
        }
        ,
        A.isZ = function(a) {
            return a instanceof A.Z
        }
        ,
        A.init = function(b, d) {
            var e;
            if (!b)
                return A.Z();
            if (typeof b == "string") {
                b = b.trim();
                if (b[0] == "<" && m.test(b))
                    e = A.fragment(b, RegExp.$1, d),
                    b = null;
                else {
                    if (d !== a)
                        return c(d).find(b);
                    e = A.qsa(i, b)
                }
            } else {
                if (H(b))
                    return c(i).ready(b);
                if (A.isZ(b))
                    return b;
                if (F(b))
                    e = N(b);
                else if (K(b))
                    e = [b],
                    b = null;
                else if (m.test(b))
                    e = A.fragment(b.trim(), RegExp.$1, d),
                    b = null;
                else {
                    if (d !== a)
                        return c(d).find(b);
                    e = A.qsa(i, b)
                }
            }
            return A.Z(e, b)
        }
        ,
        c = function(a, b) {
            return A.init(a, b)
        }
        ,
        c.extend = function(a) {
            var b, c = h.call(arguments, 1);
            typeof a == "boolean" && (b = a,
            a = c.shift()),
            c.forEach(function(c) {
                V(a, c, b)
            });
            return a
        }
        ,
        A.qsa = function(a, b) {
            var c, d = b[0] == "#", e = !d && b[0] == ".", f = d || e ? b.slice(1) : b, g = x.test(f);
            return a.getElementById && g && d ? (c = a.getElementById(f)) ? [c] : [] : a.nodeType !== 1 && a.nodeType !== 9 && a.nodeType !== 11 ? [] : h.call(g && !d && a.getElementsByClassName ? e ? a.getElementsByClassName(f) : a.getElementsByTagName(b) : a.querySelectorAll(b))
        }
        ,
        c.contains = i.documentElement.contains ? function(a, b) {
            return a !== b && a.contains(b)
        }
        : function(a, b) {
            while (b && (b = b.parentNode))
                if (b === a)
                    return !0;
            return !1
        }
        ,
        c.type = G,
        c.isFunction = H,
        c.isWindow = I,
        c.isArray = F,
        c.isPlainObject = L,
        c.isEmptyObject = function(a) {
            var b;
            for (b in a)
                return !1;
            return !0
        }
        ,
        c.isNumeric = function(a) {
            var b = Number(a)
              , c = typeof a;
            return a != null && c != "boolean" && (c != "string" || a.length) && !isNaN(b) && isFinite(b) || !1
        }
        ,
        c.inArray = function(a, b, c) {
            return e.indexOf.call(b, a, c)
        }
        ,
        c.camelCase = B,
        c.trim = function(a) {
            return a == null ? "" : String.prototype.trim.call(a)
        }
        ,
        c.uuid = 0,
        c.support = {},
        c.expr = {},
        c.noop = function() {}
        ,
        c.map = function(a, b) {
            var c, d = [], e, f;
            if (M(a))
                for (e = 0; e < a.length; e++)
                    c = b(a[e], e),
                    c != null && d.push(c);
            else
                for (f in a)
                    c = b(a[f], f),
                    c != null && d.push(c);
            return O(d)
        }
        ,
        c.each = function(a, b) {
            var c, d;
            if (M(a)) {
                for (c = 0; c < a.length; c++)
                    if (b.call(a[c], c, a[c]) === !1)
                        return a
            } else
                for (d in a)
                    if (b.call(a[d], d, a[d]) === !1)
                        return a;
            return a
        }
        ,
        c.grep = function(a, b) {
            return g.call(a, b)
        }
        ,
        window.JSON && (c.parseJSON = JSON.parse),
        c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
            y["[object " + b + "]"] = b.toLowerCase()
        }),
        c.fn = {
            constructor: A.Z,
            length: 0,
            forEach: e.forEach,
            reduce: e.reduce,
            push: e.push,
            sort: e.sort,
            splice: e.splice,
            indexOf: e.indexOf,
            concat: function() {
                var a, b, c = [];
                for (a = 0; a < arguments.length; a++)
                    b = arguments[a],
                    c[a] = A.isZ(b) ? b.toArray() : b;
                return f.apply(A.isZ(this) ? this.toArray() : this, c)
            },
            map: function(a) {
                return c(c.map(this, function(b, c) {
                    return a.call(b, c, b)
                }))
            },
            slice: function() {
                return c(h.apply(this, arguments))
            },
            ready: function(a) {
                w.test(i.readyState) && i.body ? a(c) : i.addEventListener("DOMContentLoaded", function() {
                    a(c)
                }, !1);
                return this
            },
            get: function(b) {
                return b === a ? h.call(this) : this[b >= 0 ? b : b + this.length]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    this.parentNode != null && this.parentNode.removeChild(this)
                })
            },
            each: function(a) {
                e.every.call(this, function(b, c) {
                    return a.call(b, c, b) !== !1
                });
                return this
            },
            filter: function(a) {
                if (H(a))
                    return this.not(this.not(a));
                return c(g.call(this, function(b) {
                    return A.matches(b, a)
                }))
            },
            add: function(a, b) {
                return c(C(this.concat(c(a, b))))
            },
            is: function(a) {
                return this.length > 0 && A.matches(this[0], a)
            },
            not: function(b) {
                var d = [];
                if (H(b) && b.call !== a)
                    this.each(function(a) {
                        b.call(this, a) || d.push(this)
                    });
                else {
                    var e = typeof b == "string" ? this.filter(b) : M(b) && H(b.item) ? h.call(b) : c(b);
                    this.forEach(function(a) {
                        e.indexOf(a) < 0 && d.push(a)
                    })
                }
                return c(d)
            },
            has: function(a) {
                return this.filter(function() {
                    return K(a) ? c.contains(this, a) : c(this).find(a).size()
                })
            },
            eq: function(a) {
                return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
            },
            first: function() {
                var a = this[0];
                return a && !K(a) ? a : c(a)
            },
            last: function() {
                var a = this[this.length - 1];
                return a && !K(a) ? a : c(a)
            },
            find: function(a) {
                var b, d = this;
                a ? typeof a == "object" ? b = c(a).filter(function() {
                    var a = this;
                    return e.some.call(d, function(b) {
                        return c.contains(b, a)
                    })
                }) : this.length == 1 ? b = c(A.qsa(this[0], a)) : b = this.map(function() {
                    return A.qsa(this, a)
                }) : b = c();
                return b
            },
            closest: function(a, b) {
                var d = []
                  , e = typeof a == "object" && c(a);
                this.each(function(c, f) {
                    while (f && !(e ? e.indexOf(f) >= 0 : A.matches(f, a)))
                        f = f !== b && !J(f) && f.parentNode;
                    f && d.indexOf(f) < 0 && d.push(f)
                });
                return c(d)
            },
            parents: function(a) {
                var b = []
                  , d = this;
                while (d.length > 0)
                    d = c.map(d, function(a) {
                        if ((a = a.parentNode) && !J(a) && b.indexOf(a) < 0) {
                            b.push(a);
                            return a
                        }
                    });
                return W(b, a)
            },
            parent: function(a) {
                return W(C(this.pluck("parentNode")), a)
            },
            children: function(a) {
                return W(this.map(function() {
                    return T(this)
                }), a)
            },
            contents: function() {
                return this.map(function() {
                    return this.contentDocument || h.call(this.childNodes)
                })
            },
            siblings: function(a) {
                return W(this.map(function(a, b) {
                    return g.call(T(b.parentNode), function(a) {
                        return a !== b
                    })
                }), a)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            pluck: function(a) {
                return c.map(this, function(b) {
                    return b[a]
                })
            },
            show: function() {
                return this.each(function() {
                    this.style.display == "none" && (this.style.display = ""),
                    getComputedStyle(this, "").getPropertyValue("display") == "none" && (this.style.display = S(this.nodeName))
                })
            },
            replaceWith: function(a) {
                return this.before(a).remove()
            },
            wrap: function(a) {
                var b = H(a);
                if (this[0] && !b)
                    var d = c(a).get(0)
                      , e = d.parentNode || this.length > 1;
                return this.each(function(f) {
                    c(this).wrapAll(b ? a.call(this, f) : e ? d.cloneNode(!0) : d)
                })
            },
            wrapAll: function(a) {
                if (this[0]) {
                    c(this[0]).before(a = c(a));
                    var b;
                    while ((b = a.children()).length)
                        a = b.first();
                    c(a).append(this)
                }
                return this
            },
            wrapInner: function(a) {
                var b = H(a);
                return this.each(function(d) {
                    var e = c(this)
                      , f = e.contents()
                      , g = b ? a.call(this, d) : a;
                    f.length ? f.wrapAll(g) : e.append(g)
                })
            },
            unwrap: function() {
                this.parent().each(function() {
                    c(this).replaceWith(c(this).children())
                });
                return this
            },
            clone: function() {
                return this.map(function() {
                    return this.cloneNode(!0)
                })
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(b) {
                return this.each(function() {
                    var d = c(this);
                    (b === a ? d.css("display") == "none" : b) ? d.show() : d.hide()
                })
            },
            prev: function(a) {
                return c(this.pluck("previousElementSibling")).filter(a || "*")
            },
            next: function(a) {
                return c(this.pluck("nextElementSibling")).filter(a || "*")
            },
            html: function(a) {
                return 0 in arguments ? this.each(function(b) {
                    var d = this.innerHTML;
                    c(this).empty().append(X(this, a, b, d))
                }) : 0 in this ? this[0].innerHTML : null
            },
            text: function(a) {
                return 0 in arguments ? this.each(function(b) {
                    var c = X(this, a, b, this.textContent);
                    this.textContent = c == null ? "" : "" + c
                }) : 0 in this ? this.pluck("textContent").join("") : null
            },
            attr: function(c, d) {
                var e;
                return typeof c == "string" && !(1 in arguments) ? 0 in this && this[0].nodeType == 1 && (e = this[0].getAttribute(c)) != null ? e : a : this.each(function(a) {
                    if (this.nodeType === 1)
                        if (K(c))
                            for (b in c)
                                Y(this, b, c[b]);
                        else
                            Y(this, c, X(this, d, a, this.getAttribute(c)))
                })
            },
            removeAttr: function(a) {
                return this.each(function() {
                    this.nodeType === 1 && a.split(" ").forEach(function(a) {
                        Y(this, a)
                    }, this)
                })
            },
            prop: function(a, b) {
                a = E[a] || a;
                return 1 in arguments ? this.each(function(c) {
                    this[a] = X(this, b, c, this[a])
                }) : this[0] && this[0][a]
            },
            removeProp: function(a) {
                a = E[a] || a;
                return this.each(function() {
                    delete this[a]
                })
            },
            data: function(b, c) {
                var d = "data-" + b.replace(q, "-$1").toLowerCase()
                  , e = 1 in arguments ? this.attr(d, c) : this.attr(d);
                return e !== null ? $(e) : a
            },
            val: function(a) {
                if (0 in arguments) {
                    a == null && (a = "");
                    return this.each(function(b) {
                        this.value = X(this, a, b, this.value)
                    })
                }
                return this[0] && (this[0].multiple ? c(this[0]).find("option").filter(function() {
                    return this.selected
                }).pluck("value") : this[0].value)
            },
            offset: function(a) {
                if (a)
                    return this.each(function(b) {
                        var d = c(this)
                          , e = X(this, a, b, d.offset())
                          , f = d.offsetParent().offset()
                          , g = {
                            top: e.top - f.top,
                            left: e.left - f.left
                        };
                        d.css("position") == "static" && (g.position = "relative"),
                        d.css(g)
                    });
                if (!this.length)
                    return null;
                if (i.documentElement !== this[0] && !c.contains(i.documentElement, this[0]))
                    return {
                        top: 0,
                        left: 0
                    };
                var b = this[0].getBoundingClientRect();
                return {
                    left: b.left + window.pageXOffset,
                    top: b.top + window.pageYOffset,
                    width: Math.round(b.width),
                    height: Math.round(b.height)
                }
            },
            css: function(a, d) {
                if (arguments.length < 2) {
                    var e = this[0];
                    if (typeof a == "string") {
                        if (!e)
                            return;
                        return e.style[B(a)] || getComputedStyle(e, "").getPropertyValue(a)
                    }
                    if (F(a)) {
                        if (!e)
                            return;
                        var f = {}
                          , g = getComputedStyle(e, "");
                        c.each(a, function(a, b) {
                            f[b] = e.style[B(b)] || g.getPropertyValue(b)
                        });
                        return f
                    }
                }
                var h = "";
                if (G(a) == "string")
                    !d && d !== 0 ? this.each(function() {
                        this.style.removeProperty(P(a))
                    }) : h = P(a) + ":" + R(a, d);
                else
                    for (b in a)
                        !a[b] && a[b] !== 0 ? this.each(function() {
                            this.style.removeProperty(P(b))
                        }) : h += P(b) + ":" + R(b, a[b]) + ";";
                return this.each(function() {
                    this.style.cssText += ";" + h
                })
            },
            index: function(a) {
                return a ? this.indexOf(c(a)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(a) {
                if (!a)
                    return !1;
                return e.some.call(this, function(a) {
                    return this.test(Z(a))
                }, Q(a))
            },
            addClass: function(a) {
                if (!a)
                    return this;
                return this.each(function(b) {
                    if ("className"in this) {
                        d = [];
                        var e = Z(this)
                          , f = X(this, a, b, e);
                        f.split(/\s+/g).forEach(function(a) {
                            c(this).hasClass(a) || d.push(a)
                        }, this),
                        d.length && Z(this, e + (e ? " " : "") + d.join(" "))
                    }
                })
            },
            removeClass: function(b) {
                return this.each(function(c) {
                    if ("className"in this) {
                        if (b === a)
                            return Z(this, "");
                        d = Z(this),
                        X(this, b, c, d).split(/\s+/g).forEach(function(a) {
                            d = d.replace(Q(a), " ")
                        }),
                        Z(this, d.trim())
                    }
                })
            },
            toggleClass: function(b, d) {
                if (!b)
                    return this;
                return this.each(function(e) {
                    var f = c(this)
                      , g = X(this, b, e, Z(this));
                    g.split(/\s+/g).forEach(function(b) {
                        (d === a ? !f.hasClass(b) : d) ? f.addClass(b) : f.removeClass(b)
                    })
                })
            },
            scrollTop: function(b) {
                if (!!this.length) {
                    var c = "scrollTop"in this[0];
                    if (b === a)
                        return c ? this[0].scrollTop : this[0].pageYOffset;
                    return this.each(c ? function() {
                        this.scrollTop = b
                    }
                    : function() {
                        this.scrollTo(this.scrollX, b)
                    }
                    )
                }
            },
            scrollLeft: function(b) {
                if (!!this.length) {
                    var c = "scrollLeft"in this[0];
                    if (b === a)
                        return c ? this[0].scrollLeft : this[0].pageXOffset;
                    return this.each(c ? function() {
                        this.scrollLeft = b
                    }
                    : function() {
                        this.scrollTo(b, this.scrollY)
                    }
                    )
                }
            },
            position: function() {
                if (!!this.length) {
                    var a = this[0]
                      , b = this.offsetParent()
                      , d = this.offset()
                      , e = p.test(b[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : b.offset();
                    d.top -= parseFloat(c(a).css("margin-top")) || 0,
                    d.left -= parseFloat(c(a).css("margin-left")) || 0,
                    e.top += parseFloat(c(b[0]).css("border-top-width")) || 0,
                    e.left += parseFloat(c(b[0]).css("border-left-width")) || 0;
                    return {
                        top: d.top - e.top,
                        left: d.left - e.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var a = this.offsetParent || i.body;
                    while (a && !p.test(a.nodeName) && c(a).css("position") == "static")
                        a = a.offsetParent;
                    return a
                })
            }
        },
        c.fn.detach = c.fn.remove,
        ["width", "height"].forEach(function(b) {
            var d = b.replace(/./, function(a) {
                return a[0].toUpperCase()
            });
            c.fn[b] = function(e) {
                var f, g = this[0];
                return e === a ? I(g) ? g["inner" + d] : J(g) ? g.documentElement["scroll" + d] : (f = this.offset()) && f[b] : this.each(function(a) {
                    g = c(this),
                    g.css(b, X(this, e, a, g[b]()))
                })
            }
        }),
        s.forEach(function(b, d) {
            var e = d % 2;
            c.fn[b] = function() {
                var b, f = c.map(arguments, function(d) {
                    var e = [];
                    b = G(d);
                    if (b == "array") {
                        d.forEach(function(b) {
                            if (b.nodeType !== a)
                                return e.push(b);
                            if (c.zepto.isZ(b))
                                return e = e.concat(b.get());
                            e = e.concat(A.fragment(b))
                        });
                        return e
                    }
                    return b == "object" || d == null ? d : A.fragment(d)
                }), g, h = this.length > 1;
                if (f.length < 1)
                    return this;
                return this.each(function(a, b) {
                    g = e ? b : b.parentNode,
                    b = d == 0 ? b.nextSibling : d == 1 ? b.firstChild : d == 2 ? b : null;
                    var j = c.contains(i.documentElement, g);
                    f.forEach(function(a) {
                        if (h)
                            a = a.cloneNode(!0);
                        else if (!g)
                            return c(a).remove();
                        g.insertBefore(a, b),
                        j && _(a, function(a) {
                            if (a.nodeName != null && a.nodeName.toUpperCase() === "SCRIPT" && (!a.type || a.type === "text/javascript") && !a.src) {
                                var b = a.ownerDocument ? a.ownerDocument.defaultView : window;
                                b.eval.call(b, a.innerHTML)
                            }
                        })
                    })
                })
            }
            ,
            c.fn[e ? b + "To" : "insert" + (d ? "Before" : "After")] = function(a) {
                c(a)[b](this);
                return this
            }
        }),
        A.Z.prototype = U.prototype = c.fn,
        A.uniq = C,
        A.deserializeValue = $,
        c.zepto = A;
        return c
    }();
    window.Zepto = Zepto,
    window.$ === undefined && (window.$ = Zepto),
    function(a) {
        function y(a) {
            var b, d = {
                originalEvent: a
            };
            for (b in a)
                !v.test(b) && a[b] !== c && (d[b] = a[b]);
            return x(d, a)
        }
        function x(b, d) {
            if (d || !b.isDefaultPrevented) {
                d || (d = b),
                a.each(w, function(a, c) {
                    var e = d[a];
                    b[a] = function() {
                        this[c] = t;
                        return e && e.apply(d, arguments)
                    }
                    ,
                    b[c] = u
                }),
                b.timeStamp || (b.timeStamp = Date.now());
                if (d.defaultPrevented !== c ? d.defaultPrevented : "returnValue"in d ? d.returnValue === !1 : d.getPreventDefault && d.getPreventDefault())
                    b.isDefaultPrevented = t
            }
            return b
        }
        function s(a, b, c, d, e) {
            var f = l(a);
            (b || "").split(/\s/).forEach(function(b) {
                m(a, b, c, d).forEach(function(b) {
                    delete g[f][b.i],
                    "removeEventListener"in a && a.removeEventListener(q(b.e), b.proxy, p(b, e))
                })
            })
        }
        function r(b, d, e, f, h, i, j) {
            var m = l(b)
              , o = g[m] || (g[m] = []);
            d.split(/\s/).forEach(function(d) {
                if (d == "ready")
                    return a(document).ready(e);
                var g = n(d);
                g.fn = e,
                g.sel = h,
                g.e in k && (e = function(b) {
                    var c = b.relatedTarget;
                    if (!c || c !== this && !a.contains(this, c))
                        return g.fn.apply(this, arguments)
                }
                ),
                g.del = i;
                var l = i || e;
                g.proxy = function(a) {
                    a = x(a);
                    if (!a.isImmediatePropagationStopped()) {
                        a.data = f;
                        var d = l.apply(b, a._args == c ? [a] : [a].concat(a._args));
                        d === !1 && (a.preventDefault(),
                        a.stopPropagation());
                        return d
                    }
                }
                ,
                g.i = o.length,
                o.push(g),
                "addEventListener"in b && b.addEventListener(q(g.e), g.proxy, p(g, j))
            })
        }
        function q(a) {
            return k[a] || i && j[a] || a
        }
        function p(a, b) {
            return a.del && !i && a.e in j || !!b
        }
        function o(a) {
            return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
        }
        function n(a) {
            var b = ("" + a).split(".");
            return {
                e: b[0],
                ns: b.slice(1).sort().join(" ")
            }
        }
        function m(a, b, c, d) {
            b = n(b);
            if (b.ns)
                var e = o(b.ns);
            return (g[l(a)] || []).filter(function(a) {
                return a && (!b.e || a.e == b.e) && (!b.ns || e.test(a.ns)) && (!c || l(a.fn) === l(c)) && (!d || a.sel == d)
            })
        }
        function l(a) {
            return a._zid || (a._zid = b++)
        }
        var b = 1, c, d = Array.prototype.slice, e = a.isFunction, f = function(a) {
            return typeof a == "string"
        }, g = {}, h = {}, i = "onfocusin"in window, j = {
            focus: "focusin",
            blur: "focusout"
        }, k = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        h.click = h.mousedown = h.mouseup = h.mousemove = "MouseEvents",
        a.event = {
            add: r,
            remove: s
        },
        a.proxy = function(b, c) {
            var g = 2 in arguments && d.call(arguments, 2);
            if (e(b)) {
                var h = function() {
                    return b.apply(c, g ? g.concat(d.call(arguments)) : arguments)
                };
                h._zid = l(b);
                return h
            }
            if (f(c)) {
                if (g) {
                    g.unshift(b[c], b);
                    return a.proxy.apply(null, g)
                }
                return a.proxy(b[c], b)
            }
            throw new TypeError("expected function")
        }
        ,
        a.fn.bind = function(a, b, c) {
            return this.on(a, b, c)
        }
        ,
        a.fn.unbind = function(a, b) {
            return this.off(a, b)
        }
        ,
        a.fn.one = function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        }
        ;
        var t = function() {
            return !0
        }
          , u = function() {
            return !1
        }
          , v = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/
          , w = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        a.fn.delegate = function(a, b, c) {
            return this.on(b, a, c)
        }
        ,
        a.fn.undelegate = function(a, b, c) {
            return this.off(b, a, c)
        }
        ,
        a.fn.live = function(b, c) {
            a(document.body).delegate(this.selector, b, c);
            return this
        }
        ,
        a.fn.die = function(b, c) {
            a(document.body).undelegate(this.selector, b, c);
            return this
        }
        ,
        a.fn.on = function(b, g, h, i, j) {
            var k, l, m = this;
            if (b && !f(b)) {
                a.each(b, function(a, b) {
                    m.on(a, g, h, b, j)
                });
                return m
            }
            !f(g) && !e(i) && i !== !1 && (i = h,
            h = g,
            g = c);
            if (i === c || h === !1)
                i = h,
                h = c;
            i === !1 && (i = u);
            return m.each(function(c, e) {
                j && (k = function(a) {
                    s(e, a.type, i);
                    return i.apply(this, arguments)
                }
                ),
                g && (l = function(b) {
                    var c, f = a(b.target).closest(g, e).get(0);
                    if (f && f !== e) {
                        c = a.extend(y(b), {
                            currentTarget: f,
                            liveFired: e
                        });
                        return (k || i).apply(f, [c].concat(d.call(arguments, 1)))
                    }
                }
                ),
                r(e, b, i, h, g, l || k)
            })
        }
        ,
        a.fn.off = function(b, d, g) {
            var h = this;
            if (b && !f(b)) {
                a.each(b, function(a, b) {
                    h.off(a, d, b)
                });
                return h
            }
            !f(d) && !e(g) && g !== !1 && (g = d,
            d = c),
            g === !1 && (g = u);
            return h.each(function() {
                s(this, b, g, d)
            })
        }
        ,
        a.fn.trigger = function(b, c) {
            b = f(b) || a.isPlainObject(b) ? a.Event(b) : x(b),
            b._args = c;
            return this.each(function() {
                b.type in j && typeof this[b.type] == "function" ? this[b.type]() : "dispatchEvent"in this ? this.dispatchEvent(b) : a(this).triggerHandler(b, c)
            })
        }
        ,
        a.fn.triggerHandler = function(b, c) {
            var d, e;
            this.each(function(g, h) {
                d = y(f(b) ? a.Event(b) : b),
                d._args = c,
                d.target = h,
                a.each(m(h, b.type || b), function(a, b) {
                    e = b.proxy(d);
                    if (d.isImmediatePropagationStopped())
                        return !1
                })
            });
            return e
        }
        ,
        "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b) {
            a.fn[b] = function(a) {
                return 0 in arguments ? this.bind(b, a) : this.trigger(b)
            }
        }),
        a.Event = function(a, b) {
            f(a) || (b = a,
            a = b.type);
            var c = document.createEvent(h[a] || "Events")
              , d = !0;
            if (b)
                for (var e in b)
                    e == "bubbles" ? d = !!b[e] : c[e] = b[e];
            c.initEvent(a, d, !0);
            return x(c)
        }
    }(Zepto),
    function($) {
        function serialize(a, b, c, d) {
            var e, f = $.isArray(b), g = $.isPlainObject(b);
            $.each(b, function(b, h) {
                e = $.type(h),
                d && (b = c ? d : d + "[" + (g || e == "object" || e == "array" ? b : "") + "]"),
                !d && f ? a.add(h.name, h.value) : e == "array" || !c && e == "object" ? serialize(a, h, c, b) : a.add(b, h)
            })
        }
        function parseArguments(a, b, c, d) {
            $.isFunction(b) && (d = c,
            c = b,
            b = undefined),
            $.isFunction(c) || (d = c,
            c = undefined);
            return {
                url: a,
                data: b,
                success: c,
                dataType: d
            }
        }
        function serializeData(a) {
            a.processData && a.data && $.type(a.data) != "string" && (a.data = $.param(a.data, a.traditional)),
            a.data && (!a.type || a.type.toUpperCase() == "GET" || "jsonp" == a.dataType) && (a.url = appendQuery(a.url, a.data),
            a.data = undefined)
        }
        function appendQuery(a, b) {
            if (b == "")
                return a;
            return (a + "&" + b).replace(/[&?]{1,2}/, "?")
        }
        function mimeToDataType(a) {
            a && (a = a.split(";", 2)[0]);
            return a && (a == htmlType ? "html" : a == jsonType ? "json" : scriptTypeRE.test(a) ? "script" : xmlTypeRE.test(a) && "xml") || "text"
        }
        function empty() {}
        function ajaxDataFilter(a, b, c) {
            if (c.dataFilter == empty)
                return a;
            var d = c.context;
            return c.dataFilter.call(d, a, b)
        }
        function ajaxComplete(a, b, c) {
            var d = c.context;
            c.complete.call(d, b, a),
            triggerGlobal(c, d, "ajaxComplete", [b, c]),
            ajaxStop(c)
        }
        function ajaxError(a, b, c, d, e) {
            var f = d.context;
            d.error.call(f, c, b, a),
            e && e.rejectWith(f, [c, b, a]),
            triggerGlobal(d, f, "ajaxError", [c, d, a || b]),
            ajaxComplete(b, c, d)
        }
        function ajaxSuccess(a, b, c, d) {
            var e = c.context
              , f = "success";
            c.success.call(e, a, f, b),
            d && d.resolveWith(e, [a, f, b]),
            triggerGlobal(c, e, "ajaxSuccess", [b, c, a]),
            ajaxComplete(f, b, c)
        }
        function ajaxBeforeSend(a, b) {
            var c = b.context;
            if (b.beforeSend.call(c, a, b) === !1 || triggerGlobal(b, c, "ajaxBeforeSend", [a, b]) === !1)
                return !1;
            triggerGlobal(b, c, "ajaxSend", [a, b])
        }
        function ajaxStop(a) {
            a.global && !--$.active && triggerGlobal(a, null, "ajaxStop")
        }
        function ajaxStart(a) {
            a.global && $.active++ === 0 && triggerGlobal(a, null, "ajaxStart")
        }
        function triggerGlobal(a, b, c, d) {
            if (a.global)
                return triggerAndReturn(b || document, c, d)
        }
        function triggerAndReturn(a, b, c) {
            var d = $.Event(b);
            $(a).trigger(d, c);
            return !d.isDefaultPrevented()
        }
        var jsonpID = +(new Date), document = window.document, key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, scriptTypeRE = /^(?:text|application)\/javascript/i, xmlTypeRE = /^(?:text|application)\/xml/i, jsonType = "application/json", htmlType = "text/html", blankRE = /^\s*$/, originAnchor = document.createElement("a");
        originAnchor.href = window.location.href,
        $.active = 0,
        $.ajaxJSONP = function(a, b) {
            if (!("type"in a))
                return $.ajax(a);
            var c = a.jsonpCallback, d = ($.isFunction(c) ? c() : c) || "Zepto" + jsonpID++, e = document.createElement("script"), f = window[d], g, h = function(a) {
                $(e).triggerHandler("error", a || "abort")
            }, i = {
                abort: h
            }, j;
            b && b.promise(i),
            $(e).on("load error", function(c, h) {
                clearTimeout(j),
                $(e).off().remove(),
                c.type == "error" || !g ? ajaxError(null, h || "error", i, a, b) : ajaxSuccess(g[0], i, a, b),
                window[d] = f,
                g && $.isFunction(f) && f(g[0]),
                f = g = undefined
            });
            if (ajaxBeforeSend(i, a) === !1) {
                h("abort");
                return i
            }
            window[d] = function() {
                g = arguments
            }
            ,
            e.src = a.url.replace(/\?(.+)=\?/, "?$1=" + d),
            document.head.appendChild(e),
            a.timeout > 0 && (j = setTimeout(function() {
                h("timeout")
            }, a.timeout));
            return i
        }
        ,
        $.ajaxSettings = {
            type: "GET",
            beforeSend: empty,
            success: empty,
            error: empty,
            complete: empty,
            context: null,
            global: !0,
            xhr: function() {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: jsonType,
                xml: "application/xml, text/xml",
                html: htmlType,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0,
            dataFilter: empty
        },
        $.ajax = function(options) {
            var settings = $.extend({}, options || {}), deferred = $.Deferred && $.Deferred(), urlAnchor, hashIndex;
            for (key in $.ajaxSettings)
                settings[key] === undefined && (settings[key] = $.ajaxSettings[key]);
            ajaxStart(settings),
            settings.crossDomain || (urlAnchor = document.createElement("a"),
            urlAnchor.href = settings.url,
            urlAnchor.href = urlAnchor.href,
            settings.crossDomain = originAnchor.protocol + "//" + originAnchor.host != urlAnchor.protocol + "//" + urlAnchor.host),
            settings.url || (settings.url = window.location.toString()),
            (hashIndex = settings.url.indexOf("#")) > -1 && (settings.url = settings.url.slice(0, hashIndex)),
            serializeData(settings);
            var dataType = settings.dataType
              , hasPlaceholder = /\?.+=\?/.test(settings.url);
            hasPlaceholder && (dataType = "jsonp");
            if (settings.cache === !1 || (!options || options.cache !== !0) && ("script" == dataType || "jsonp" == dataType))
                settings.url = appendQuery(settings.url, "_=" + Date.now());
            if ("jsonp" == dataType) {
                hasPlaceholder || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === !1 ? "" : "callback=?"));
                return $.ajaxJSONP(settings, deferred)
            }
            var mime = settings.accepts[dataType], headers = {}, setHeader = function(a, b) {
                headers[a.toLowerCase()] = [a, b]
            }, protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol, xhr = settings.xhr(), nativeSetHeader = xhr.setRequestHeader, abortTimeout;
            deferred && deferred.promise(xhr),
            settings.crossDomain || setHeader("X-Requested-With", "XMLHttpRequest"),
            setHeader("Accept", mime || "*/*");
            if (mime = settings.mimeType || mime)
                mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]),
                xhr.overrideMimeType && xhr.overrideMimeType(mime);
            (settings.contentType || settings.contentType !== !1 && settings.data && settings.type.toUpperCase() != "GET") && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded");
            if (settings.headers)
                for (name in settings.headers)
                    setHeader(name, settings.headers[name]);
            xhr.setRequestHeader = setHeader,
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    xhr.onreadystatechange = empty,
                    clearTimeout(abortTimeout);
                    var result, error = !1;
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
                        dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type"));
                        if (xhr.responseType == "arraybuffer" || xhr.responseType == "blob")
                            result = xhr.response;
                        else {
                            result = xhr.responseText;
                            try {
                                result = ajaxDataFilter(result, dataType, settings),
                                dataType == "script" ? (1,
                                eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : $.parseJSON(result))
                            } catch (e) {
                                error = e
                            }
                            if (error)
                                return ajaxError(error, "parsererror", xhr, settings, deferred)
                        }
                        ajaxSuccess(result, xhr, settings, deferred)
                    } else
                        ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred)
                }
            }
            ;
            if (ajaxBeforeSend(xhr, settings) === !1) {
                xhr.abort(),
                ajaxError(null, "abort", xhr, settings, deferred);
                return xhr
            }
            var async = "async"in settings ? settings.async : !0;
            xhr.open(settings.type, settings.url, async, settings.username, settings.password);
            if (settings.xhrFields)
                for (name in settings.xhrFields)
                    xhr[name] = settings.xhrFields[name];
            for (name in headers)
                nativeSetHeader.apply(xhr, headers[name]);
            settings.timeout > 0 && (abortTimeout = setTimeout(function() {
                xhr.onreadystatechange = empty,
                xhr.abort(),
                ajaxError(null, "timeout", xhr, settings, deferred)
            }, settings.timeout)),
            xhr.send(settings.data ? settings.data : null);
            return xhr
        }
        ,
        $.get = function() {
            return $.ajax(parseArguments.apply(null, arguments))
        }
        ,
        $.post = function() {
            var a = parseArguments.apply(null, arguments);
            a.type = "POST";
            return $.ajax(a)
        }
        ,
        $.getJSON = function() {
            var a = parseArguments.apply(null, arguments);
            a.dataType = "json";
            return $.ajax(a)
        }
        ,
        $.fn.load = function(a, b, c) {
            if (!this.length)
                return this;
            var d = this, e = a.split(/\s/), f, g = parseArguments(a, b, c), h = g.success;
            e.length > 1 && (g.url = e[0],
            f = e[1]),
            g.success = function(a) {
                d.html(f ? $("<div>").html(a.replace(rscript, "")).find(f) : a),
                h && h.apply(d, arguments)
            }
            ,
            $.ajax(g);
            return this
        }
        ;
        var escape = encodeURIComponent;
        $.param = function(a, b) {
            var c = [];
            c.add = function(a, b) {
                $.isFunction(b) && (b = b()),
                b == null && (b = ""),
                this.push(escape(a) + "=" + escape(b))
            }
            ,
            serialize(c, a, b);
            return c.join("&").replace(/%20/g, "+")
        }
    }(Zepto),
    function(a) {
        a.fn.serializeArray = function() {
            var b, c, d = [], e = function(a) {
                if (a.forEach)
                    return a.forEach(e);
                d.push({
                    name: b,
                    value: a
                })
            };
            this[0] && a.each(this[0].elements, function(d, f) {
                c = f.type,
                b = f.name,
                b && f.nodeName.toLowerCase() != "fieldset" && !f.disabled && c != "submit" && c != "reset" && c != "button" && c != "file" && (c != "radio" && c != "checkbox" || f.checked) && e(a(f).val())
            });
            return d
        }
        ,
        a.fn.serialize = function() {
            var a = [];
            this.serializeArray().forEach(function(b) {
                a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value))
            });
            return a.join("&")
        }
        ,
        a.fn.submit = function(b) {
            if (0 in arguments)
                this.bind("submit", b);
            else if (this.length) {
                var c = a.Event("submit");
                this.eq(0).trigger(c),
                c.isDefaultPrevented() || this.get(0).submit()
            }
            return this
        }
    }(Zepto),
    function() {
        try {
            getComputedStyle(undefined)
        } catch (a) {
            var b = getComputedStyle;
            window.getComputedStyle = function(a, c) {
                try {
                    return b(a, c)
                } catch (d) {
                    return null
                }
            }
        }
    }(),
    function(a) {
        function u(u) {
            var v, w, x = 0, y = 0, z, A;
            t(),
            l = u && "down"in u ? u : "ontouchstart"in document ? {
                down: "touchstart",
                up: "touchend",
                move: "touchmove",
                cancel: "touchcancel"
            } : "onpointerdown"in document ? {
                down: "pointerdown",
                up: "pointerup",
                move: "pointermove",
                cancel: "pointercancel"
            } : "onmspointerdown"in document ? {
                down: "MSPointerDown",
                up: "MSPointerUp",
                move: "MSPointerMove",
                cancel: "MSPointerCancel"
            } : !1;
            !l || ("MSGesture"in window && (h = new MSGesture,
            h.target = document.body,
            a(document).bind("MSGestureEnd", function(a) {
                var c = a.velocityX > 1 ? "Right" : a.velocityX < -1 ? "Left" : a.velocityY > 1 ? "Down" : a.velocityY < -1 ? "Up" : null;
                c && (b.el.trigger("swipe"),
                b.el.trigger("swipe" + c))
            })),
            i = function(d) {
                if (!(A = s(d, "down")) || !!r(d))
                    z = A ? d : d.touches[0],
                    d.touches && d.touches.length === 1 && b.x2 && (b.x2 = undefined,
                    b.y2 = undefined),
                    v = Date.now(),
                    w = v - (b.last || v),
                    b.el = a("tagName"in z.target ? z.target : z.target.parentNode),
                    c && clearTimeout(c),
                    b.x1 = z.pageX,
                    b.y1 = z.pageY,
                    w > 0 && w <= 250 && (b.isDoubleTap = !0),
                    b.last = v,
                    f = setTimeout(o, g),
                    h && A && h.addPointer(d.pointerId)
            }
            ,
            k = function(a) {
                if (!(A = s(a, "move")) || !!r(a))
                    z = A ? a : a.touches[0],
                    p(),
                    b.x2 = z.pageX,
                    b.y2 = z.pageY,
                    x += Math.abs(b.x1 - b.x2),
                    y += Math.abs(b.y1 - b.y2)
            }
            ,
            j = function(f) {
                if (!(A = s(f, "up")) || !!r(f))
                    p(),
                    b.x2 && Math.abs(b.x1 - b.x2) > 30 || b.y2 && Math.abs(b.y1 - b.y2) > 30 ? e = setTimeout(function() {
                        b.el && (b.el.trigger("swipe"),
                        b.el.trigger("swipe" + n(b.x1, b.x2, b.y1, b.y2))),
                        b = {}
                    }, 0) : "last"in b && (x < 30 && y < 30 ? d = setTimeout(function() {
                        var d = a.Event("tap");
                        d.cancelTouch = q,
                        b.el && b.el.trigger(d),
                        b.isDoubleTap ? (b.el && b.el.trigger("doubleTap"),
                        b = {}) : c = setTimeout(function() {
                            c = null,
                            b.el && b.el.trigger("singleTap"),
                            b = {}
                        }, 250)
                    }, 0) : b = {}),
                    x = y = 0
            }
            ,
            a(document).on(l.up, j).on(l.down, i).on(l.move, k),
            a(document).on(l.cancel, q),
            a(window).on("scroll", q),
            m = !0)
        }
        function t() {
            !m || (a(document).off(l.down, i).off(l.up, j).off(l.move, k).off(l.cancel, q),
            a(window).off("scroll", q),
            q(),
            m = !1)
        }
        function s(a, b) {
            return a.type == "pointer" + b || a.type.toLowerCase() == "mspointer" + b
        }
        function r(a) {
            return (a.pointerType == "touch" || a.pointerType == a.MSPOINTER_TYPE_TOUCH) && a.isPrimary
        }
        function q() {
            c && clearTimeout(c),
            d && clearTimeout(d),
            e && clearTimeout(e),
            f && clearTimeout(f),
            c = d = e = f = null,
            b = {}
        }
        function p() {
            f && clearTimeout(f),
            f = null
        }
        function o() {
            f = null,
            b.last && (b.el.trigger("longTap"),
            b = {})
        }
        function n(a, b, c, d) {
            return Math.abs(a - b) >= Math.abs(c - d) ? a - b > 0 ? "Left" : "Right" : c - d > 0 ? "Up" : "Down"
        }
        var b = {}, c, d, e, f, g = 750, h, i, j, k, l, m = !1;
        ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(b) {
            a.fn[b] = function(a) {
                return this.on(b, a)
            }
        }),
        a.touch = {
            setup: u
        },
        a(document).ready(u)
    }(Zepto),
    function(a, b) {
        function s(a) {
            return d ? d + a : a.toLowerCase()
        }
        function r(a) {
            return a.replace(/([A-Z])/g, "-$1").toLowerCase()
        }
        var c = "", d, e = {
            Webkit: "webkit",
            Moz: "",
            O: "o"
        }, f = document.createElement("div"), g = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, h, i, j, k, l, m, n, o, p, q = {};
        f.style.transform === b && a.each(e, function(a, e) {
            if (f.style[a + "TransitionProperty"] !== b) {
                c = "-" + a.toLowerCase() + "-",
                d = e;
                return !1
            }
        }),
        h = c + "transform",
        q[i = c + "transition-property"] = q[j = c + "transition-duration"] = q[l = c + "transition-delay"] = q[k = c + "transition-timing-function"] = q[m = c + "animation-name"] = q[n = c + "animation-duration"] = q[p = c + "animation-delay"] = q[o = c + "animation-timing-function"] = "",
        a.fx = {
            off: d === b && f.style.transitionProperty === b,
            speeds: {
                _default: 400,
                fast: 200,
                slow: 600
            },
            cssPrefix: c,
            transitionEnd: s("TransitionEnd"),
            animationEnd: s("AnimationEnd")
        },
        a.fn.animate = function(c, d, e, f, g) {
            a.isFunction(d) && (f = d,
            e = b,
            d = b),
            a.isFunction(e) && (f = e,
            e = b),
            a.isPlainObject(d) && (e = d.easing,
            f = d.complete,
            g = d.delay,
            d = d.duration),
            d && (d = (typeof d == "number" ? d : a.fx.speeds[d] || a.fx.speeds._default) / 1e3),
            g && (g = parseFloat(g) / 1e3);
            return this.anim(c, d, e, f, g)
        }
        ,
        a.fn.anim = function(c, d, e, f, s) {
            var t, u = {}, v, w = "", x = this, y, z = a.fx.transitionEnd, A = !1;
            d === b && (d = a.fx.speeds._default / 1e3),
            s === b && (s = 0),
            a.fx.off && (d = 0);
            if (typeof c == "string")
                u[m] = c,
                u[n] = d + "s",
                u[p] = s + "s",
                u[o] = e || "linear",
                z = a.fx.animationEnd;
            else {
                v = [];
                for (t in c)
                    g.test(t) ? w += t + "(" + c[t] + ") " : (u[t] = c[t],
                    v.push(r(t)));
                w && (u[h] = w,
                v.push(h)),
                d > 0 && typeof c == "object" && (u[i] = v.join(", "),
                u[j] = d + "s",
                u[l] = s + "s",
                u[k] = e || "linear")
            }
            y = function(b) {
                if (typeof b != "undefined") {
                    if (b.target !== b.currentTarget)
                        return;
                    a(b.target).unbind(z, y)
                } else
                    a(this).unbind(z, y);
                A = !0,
                a(this).css(q),
                f && f.call(this)
            }
            ,
            d > 0 && (this.bind(z, y),
            setTimeout(function() {
                A || y.call(x)
            }, (d + s) * 1e3 + 25)),
            this.size() && this.get(0).clientLeft,
            this.css(u),
            d <= 0 && setTimeout(function() {
                x.each(function() {
                    y.call(this)
                })
            }, 0);
            return this
        }
        ,
        f = null
    }(Zepto);
    return Zepto
});
(function() {
    function init_sync() {
        init_type = INIT_SYNC,
        DATracker_master = new DATrackerLib,
        override_mp_init_func(),
        DATracker_master.init(),
        add_dom_loaded_handler();
        return DATracker_master
    }
    function md5(a, b, c) {
        if (!b) {
            if (!c)
                return hexMD5(a);
            return rawMD5(a)
        }
        if (!c)
            return hexHMACMD5(b, a);
        return rawHMACMD5(b, a)
    }
    function hexHMACMD5(a, b) {
        return rstr2hex(rawHMACMD5(a, b))
    }
    function rawHMACMD5(a, b) {
        return rstrHMACMD5(str2rstrUTF8(a), str2rstrUTF8(b))
    }
    function hexMD5(a) {
        return rstr2hex(rawMD5(a))
    }
    function rawMD5(a) {
        return rstrMD5(str2rstrUTF8(a))
    }
    function str2rstrUTF8(a) {
        return unescape(encodeURIComponent(a))
    }
    function rstr2hex(a) {
        var b = "0123456789abcdef", c = "", d, e;
        for (e = 0; e < a.length; e += 1)
            d = a.charCodeAt(e),
            c += b.charAt(d >>> 4 & 15) + b.charAt(d & 15);
        return c
    }
    function rstrHMACMD5(a, b) {
        var c, d = rstr2binl(a), e = [], f = [], g;
        e[15] = f[15] = undefined,
        d.length > 16 && (d = binlMD5(d, a.length * 8));
        for (c = 0; c < 16; c += 1)
            e[c] = d[c] ^ 909522486,
            f[c] = d[c] ^ 1549556828;
        g = binlMD5(e.concat(rstr2binl(b)), 512 + b.length * 8);
        return binl2rstr(binlMD5(f.concat(g), 640))
    }
    function rstrMD5(a) {
        return binl2rstr(binlMD5(rstr2binl(a), a.length * 8))
    }
    function rstr2binl(a) {
        var b, c = [];
        c[(a.length >> 2) - 1] = undefined;
        for (b = 0; b < c.length; b += 1)
            c[b] = 0;
        var d = a.length * 8;
        for (b = 0; b < d; b += 8)
            c[b >> 5] |= (a.charCodeAt(b / 8) & 255) << b % 32;
        return c
    }
    function binl2rstr(a) {
        var b, c = "", d = a.length * 32;
        for (b = 0; b < d; b += 8)
            c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255);
        return c
    }
    function binlMD5(a, b) {
        a[b >> 5] |= 128 << b % 32,
        a[(b + 64 >>> 9 << 4) + 14] = b;
        var c, d, e, f, g, h = 1732584193, i = -271733879, j = -1732584194, k = 271733878;
        for (c = 0; c < a.length; c += 16)
            d = h,
            e = i,
            f = j,
            g = k,
            h = md5ff(h, i, j, k, a[c], 7, -680876936),
            k = md5ff(k, h, i, j, a[c + 1], 12, -389564586),
            j = md5ff(j, k, h, i, a[c + 2], 17, 606105819),
            i = md5ff(i, j, k, h, a[c + 3], 22, -1044525330),
            h = md5ff(h, i, j, k, a[c + 4], 7, -176418897),
            k = md5ff(k, h, i, j, a[c + 5], 12, 1200080426),
            j = md5ff(j, k, h, i, a[c + 6], 17, -1473231341),
            i = md5ff(i, j, k, h, a[c + 7], 22, -45705983),
            h = md5ff(h, i, j, k, a[c + 8], 7, 1770035416),
            k = md5ff(k, h, i, j, a[c + 9], 12, -1958414417),
            j = md5ff(j, k, h, i, a[c + 10], 17, -42063),
            i = md5ff(i, j, k, h, a[c + 11], 22, -1990404162),
            h = md5ff(h, i, j, k, a[c + 12], 7, 1804603682),
            k = md5ff(k, h, i, j, a[c + 13], 12, -40341101),
            j = md5ff(j, k, h, i, a[c + 14], 17, -1502002290),
            i = md5ff(i, j, k, h, a[c + 15], 22, 1236535329),
            h = md5gg(h, i, j, k, a[c + 1], 5, -165796510),
            k = md5gg(k, h, i, j, a[c + 6], 9, -1069501632),
            j = md5gg(j, k, h, i, a[c + 11], 14, 643717713),
            i = md5gg(i, j, k, h, a[c], 20, -373897302),
            h = md5gg(h, i, j, k, a[c + 5], 5, -701558691),
            k = md5gg(k, h, i, j, a[c + 10], 9, 38016083),
            j = md5gg(j, k, h, i, a[c + 15], 14, -660478335),
            i = md5gg(i, j, k, h, a[c + 4], 20, -405537848),
            h = md5gg(h, i, j, k, a[c + 9], 5, 568446438),
            k = md5gg(k, h, i, j, a[c + 14], 9, -1019803690),
            j = md5gg(j, k, h, i, a[c + 3], 14, -187363961),
            i = md5gg(i, j, k, h, a[c + 8], 20, 1163531501),
            h = md5gg(h, i, j, k, a[c + 13], 5, -1444681467),
            k = md5gg(k, h, i, j, a[c + 2], 9, -51403784),
            j = md5gg(j, k, h, i, a[c + 7], 14, 1735328473),
            i = md5gg(i, j, k, h, a[c + 12], 20, -1926607734),
            h = md5hh(h, i, j, k, a[c + 5], 4, -378558),
            k = md5hh(k, h, i, j, a[c + 8], 11, -2022574463),
            j = md5hh(j, k, h, i, a[c + 11], 16, 1839030562),
            i = md5hh(i, j, k, h, a[c + 14], 23, -35309556),
            h = md5hh(h, i, j, k, a[c + 1], 4, -1530992060),
            k = md5hh(k, h, i, j, a[c + 4], 11, 1272893353),
            j = md5hh(j, k, h, i, a[c + 7], 16, -155497632),
            i = md5hh(i, j, k, h, a[c + 10], 23, -1094730640),
            h = md5hh(h, i, j, k, a[c + 13], 4, 681279174),
            k = md5hh(k, h, i, j, a[c], 11, -358537222),
            j = md5hh(j, k, h, i, a[c + 3], 16, -722521979),
            i = md5hh(i, j, k, h, a[c + 6], 23, 76029189),
            h = md5hh(h, i, j, k, a[c + 9], 4, -640364487),
            k = md5hh(k, h, i, j, a[c + 12], 11, -421815835),
            j = md5hh(j, k, h, i, a[c + 15], 16, 530742520),
            i = md5hh(i, j, k, h, a[c + 2], 23, -995338651),
            h = md5ii(h, i, j, k, a[c], 6, -198630844),
            k = md5ii(k, h, i, j, a[c + 7], 10, 1126891415),
            j = md5ii(j, k, h, i, a[c + 14], 15, -1416354905),
            i = md5ii(i, j, k, h, a[c + 5], 21, -57434055),
            h = md5ii(h, i, j, k, a[c + 12], 6, 1700485571),
            k = md5ii(k, h, i, j, a[c + 3], 10, -1894986606),
            j = md5ii(j, k, h, i, a[c + 10], 15, -1051523),
            i = md5ii(i, j, k, h, a[c + 1], 21, -2054922799),
            h = md5ii(h, i, j, k, a[c + 8], 6, 1873313359),
            k = md5ii(k, h, i, j, a[c + 15], 10, -30611744),
            j = md5ii(j, k, h, i, a[c + 6], 15, -1560198380),
            i = md5ii(i, j, k, h, a[c + 13], 21, 1309151649),
            h = md5ii(h, i, j, k, a[c + 4], 6, -145523070),
            k = md5ii(k, h, i, j, a[c + 11], 10, -1120210379),
            j = md5ii(j, k, h, i, a[c + 2], 15, 718787259),
            i = md5ii(i, j, k, h, a[c + 9], 21, -343485551),
            h = safeAdd(h, d),
            i = safeAdd(i, e),
            j = safeAdd(j, f),
            k = safeAdd(k, g);
        return [h, i, j, k]
    }
    function md5ii(a, b, c, d, e, f, g) {
        return md5cmn(c ^ (b | ~d), a, b, e, f, g)
    }
    function md5hh(a, b, c, d, e, f, g) {
        return md5cmn(b ^ c ^ d, a, b, e, f, g)
    }
    function md5gg(a, b, c, d, e, f, g) {
        return md5cmn(b & d | c & ~d, a, b, e, f, g)
    }
    function md5ff(a, b, c, d, e, f, g) {
        return md5cmn(b & c | ~b & d, a, b, e, f, g)
    }
    function md5cmn(a, b, c, d, e, f) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(b, a), safeAdd(d, f)), e), c)
    }
    function bitRotateLeft(a, b) {
        return a << b | a >>> 32 - b
    }
    function safeAdd(a, b) {
        var c = (a & 65535) + (b & 65535)
          , d = (a >> 16) + (b >> 16) + (c >> 16);
        return d << 16 | c & 65535
    }
    function getPath() {
        return location.pathname + location.search
    }
    function on(a, b, c) {
        if (a[b]) {
            var d = a[b];
            a[b] = function() {
                var a = Array.prototype.slice.call(arguments);
                c.apply(this, a),
                d.apply(this, a)
            }
        } else
            a[b] = function() {
                var a = Array.prototype.slice.call(arguments);
                c.apply(this, a)
            }
    }
    function app_js_bridge(a) {
        function h(a) {
            var b = document.createElement("iframe");
            b.setAttribute("src", "hubbledata://trackEvent?event=" + encodeURIComponent(a)),
            document.documentElement.appendChild(b),
            b.parentNode.removeChild(b),
            b = null
        }
        function g() {
            if (/hubbledata-sdk-ios/.test(navigator.userAgent)) {
                d.pageOpenScene = "App";
                var a = document.createElement("iframe");
                a.setAttribute("src", "hubbledata://getAppInfo"),
                document.documentElement.appendChild(a),
                a.parentNode.removeChild(a),
                a = null
            }
        }
        function f() {
            typeof window.HubbleData_APP_JS_Bridge == "object" && window.HubbleData_APP_JS_Bridge.hubbledata_call_app && (d.pageOpenScene = "App",
            b = HubbleData_APP_JS_Bridge.hubbledata_call_app(),
            _.isJSONString(b) && (b = JSON.parse(b)))
        }
        function e(a) {
            b = a,
            _.isJSONString(b) && (b = JSON.parse(b)),
            c && c(b)
        }
        var b = null
          , c = null
          , d = a || {};
        window.hubbledata_app_js_bridge_call_js = function(a) {
            e(a)
        }
        ;
        var i = function(a) {
            g(),
            f();
            if (!a)
                return b;
            b === null ? c = a : a(b)
        }
          , j = function(a, b, c, e) {
            a = _.JSONDecode(a),
            _.include(["da_session_close", "da_session_start", "da_activate", "da_u_login", "da_u_logout", "da_u_signup"], b) ? (typeof e == "function" && e(),
            typeof c == "function" && c()) : typeof window.HubbleData_APP_JS_Bridge == "object" && window.HubbleData_APP_JS_Bridge.hubbledata_track ? (d.pageOpenScene = "App",
            a.pageOpenScene = "App",
            a = _.JSONEncode(a),
            window.HubbleData_APP_JS_Bridge.hubbledata_track(a),
            typeof c == "function" && c()) : /hubbledata-sdk-ios/.test(navigator.userAgent) ? (d.pageOpenScene = "App",
            a.pageOpenScene = "App",
            a = _.JSONEncode(a),
            h(a),
            typeof c == "function" && c()) : (typeof e == "function" && e(),
            typeof c == "function" && c())
        };
        return {
            getAppStatus: i,
            getSendCall: j
        }
    }
    function init(a, b, c, d) {
        var e = na;
        each(b, function(b) {
            var c = detect(b[0], b[1], a);
            if (c) {
                e = c;
                return !1
            }
        }),
        c.call(d, e.name, e.version)
    }
    function detect(a, b, c) {
        var d = isFunction(b) ? b.call(null, c) : b;
        if (!d)
            return null;
        var e = {
            name: a,
            version: NA_VERSION,
            codename: ""
        }
          , f = toString(d);
        if (d === !0)
            return e;
        if (f === "[object String]") {
            if (c.indexOf(d) !== -1)
                return e
        } else {
            if (isObject(d)) {
                d.hasOwnProperty("version") && (e.version = d.version);
                return e
            }
            if (d.exec) {
                var g = d.exec(c);
                if (g) {
                    g.length >= 2 && g[1] ? e.version = g[1].replace(/_/g, ".") : e.version = NA_VERSION;
                    return e
                }
            }
        }
    }
    function IEMode(a) {
        if (!re_msie.test(a))
            return null;
        var b, c, d, e, f;
        if (a.indexOf("trident/") !== -1) {
            b = /\btrident\/([0-9.]+)/.exec(a);
            if (b && b.length >= 2) {
                d = b[1];
                var g = b[1].split(".");
                g[0] = parseInt(g[0], 10) + 4,
                f = g.join(".")
            }
        }
        b = re_msie.exec(a),
        e = b[1];
        var h = b[1].split(".");
        typeof f == "undefined" && (f = e),
        h[0] = parseInt(h[0], 10) - 4,
        c = h.join("."),
        typeof d == "undefined" && (d = c);
        return {
            browserVersion: f,
            browserMode: e,
            engineVersion: d,
            engineMode: c,
            compatible: d !== c
        }
    }
    function checkTW360External(a) {
        if (!!external)
            try {
                var b = external.twGetRunPath.toLowerCase()
                  , c = external.twGetSecurityID(win)
                  , d = external.twGetVersion(c);
                if (b && b.indexOf(a) === -1)
                    return !1;
                if (d)
                    return {
                        version: d
                    }
            } catch (e) {}
    }
    function each(a, b) {
        for (var c = 0, d = a.length; c < d; c++)
            if (b.call(a, a[c], c) === !1)
                break
    }
    function isFunction(a) {
        return toString(a) === "[object Function]"
    }
    function isObject(a) {
        return toString(a) === "[object Object]"
    }
    function toString(a) {
        return Object.prototype.toString.call(a)
    }
    var Config = {
        DEBUG: !1,
        LIB_VERSION: "1.6.7"
    }, _$1 = {
        contains: function(a, b) {
            var c = -1;
            if (Object.prototype.toString.apply(a) !== "[object Array]")
                return c;
            if (!a && !b)
                return c;
            for (var d = 0; d < a.length; d++)
                if (typeof a[d].indexOf == "function" && a[d].indexOf(b) > 0)
                    return d;
            return c
        }
    }, win$1;
    typeof window == "undefined" ? win$1 = {
        navigator: {
            userAgent: ""
        },
        document: {}
    } : win$1 = window;
    var device, previousDevice, find, orientationEvent, document$2 = win$1.document, navigator$2 = win$1.navigator, userAgent$1 = navigator$2.userAgent;
    previousDevice = win$1.device,
    device = {},
    win$1.device = device,
    userAgent$1 = userAgent$1.toLowerCase(),
    device.ios = function() {
        return device.iphone() || device.ipod() || device.ipad()
    }
    ,
    device.iphone = function() {
        return !device.windows() && find("iphone")
    }
    ,
    device.ipod = function() {
        return find("ipod")
    }
    ,
    device.ipad = function() {
        return find("ipad")
    }
    ,
    device.android = function() {
        return !device.windows() && find("android")
    }
    ,
    device.androidPhone = function() {
        return device.android() && find("mobile")
    }
    ,
    device.androidTablet = function() {
        return device.android() && !find("mobile")
    }
    ,
    device.blackberry = function() {
        return find("blackberry") || find("bb10") || find("rim")
    }
    ,
    device.blackberryPhone = function() {
        return device.blackberry() && !find("tablet")
    }
    ,
    device.blackberryTablet = function() {
        return device.blackberry() && find("tablet")
    }
    ,
    device.windows = function() {
        return find("windows")
    }
    ,
    device.windowsPhone = function() {
        return device.windows() && find("phone")
    }
    ,
    device.windowsTablet = function() {
        return device.windows() && find("touch") && !device.windowsPhone()
    }
    ,
    device.fxos = function() {
        return (find("(mobile;") || find("(tablet;")) && find("; rv:")
    }
    ,
    device.fxosPhone = function() {
        return device.fxos() && find("mobile")
    }
    ,
    device.fxosTablet = function() {
        return device.fxos() && find("tablet")
    }
    ,
    device.meego = function() {
        return find("meego")
    }
    ,
    device.cordova = function() {
        return win$1.cordova && location.protocol === "file:"
    }
    ,
    device.nodeWebkit = function() {
        return typeof win$1.process == "object"
    }
    ,
    device.mobile = function() {
        return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego()
    }
    ,
    device.tablet = function() {
        return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet()
    }
    ,
    device.desktop = function() {
        return !device.tablet() && !device.mobile()
    }
    ,
    device.television = function() {
        var a, b = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"];
        a = 0;
        while (a < b.length) {
            if (find(b[a]))
                return !0;
            a++
        }
        return !1
    }
    ,
    device.portrait = function() {
        return win$1.innerHeight / win$1.innerWidth > 1
    }
    ,
    device.landscape = function() {
        return win$1.innerHeight / win$1.innerWidth < 1
    }
    ,
    device.noConflict = function() {
        win$1.device = previousDevice;
        return this
    }
    ,
    find = function(a) {
        return userAgent$1.indexOf(a) !== -1
    }
    ,
    device.devicePlatform = function() {
        var a = "web";
        device.ios() ? device.ipad() ? a = "iPad" : device.iphone() ? a = "iPhone" : device.ipod() && (a = "iPod touch") : device.android() ? device.androidTablet() ? a = "Tablet" : a = "Phone" : device.blackberry() ? device.blackberryTablet() ? a = "Tablet" : a = "Phone" : device.windows() ? device.windowsTablet() ? a = "Tablet" : device.windowsPhone() ? a = "Phone" : a = "web" : device.fxos() ? device.fxosTablet() ? a = "Tablet" : a = "Phone" : device.meego() ? a = "Phone" : a = "web";
        return a
    }
    ,
    device.deviceModel = function() {
        var a = "";
        if (device.android()) {
            var b = win$1.navigator.userAgent.split(";")
              , c = _$1.contains(b, "Build/");
            c > -1 && (a = b[c].substring(0, b[c].indexOf("Build/")))
        } else
            device.ios() && device.iphone() && (a = "iPhone");
        return a
    }
    ,
    Object.prototype.hasOwnProperty.call(win$1, "onorientationchange") ? orientationEvent = "orientationchange" : orientationEvent = "resize";
    var Device = device, win;
    typeof window == "undefined" ? win = {
        navigator: {}
    } : win = window;
    var ArrayProto = Array.prototype
      , FuncProto = Function.prototype
      , ObjProto = Object.prototype
      , slice = ArrayProto.slice
      , hasOwnProperty = ObjProto.hasOwnProperty
      , windowConsole = win.console
      , navigator$1 = win.navigator
      , document$1 = win.document
      , nativeBind = FuncProto.bind
      , nativeForEach = ArrayProto.forEach
      , nativeIndexOf = ArrayProto.indexOf
      , nativeIsArray = Array.isArray
      , breaker = {}
      , _ = {
        trim: function(a) {
            return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        }
    }
      , console = {
        log: function() {
            if (Config.DEBUG && !_.isUndefined(windowConsole) && windowConsole)
                try {
                    windowConsole.log.apply(windowConsole, arguments)
                } catch (a) {
                    _.each(arguments, function(a) {
                        windowConsole.log(a)
                    })
                }
        },
        error: function() {
            if (Config.DEBUG && !_.isUndefined(windowConsole) && windowConsole) {
                var a = ["DATracker error:"].concat(_.toArray(arguments));
                try {
                    windowConsole.error.apply(windowConsole, a)
                } catch (b) {
                    _.each(a, function(a) {
                        windowConsole.error(a)
                    })
                }
            }
        },
        critical: function() {
            if (!_.isUndefined(windowConsole) && windowConsole) {
                var a = ["DATracker error:"].concat(_.toArray(arguments));
                try {
                    windowConsole.error.apply(windowConsole, a)
                } catch (b) {
                    _.each(a, function(a) {
                        windowConsole.error(a)
                    })
                }
            }
        }
    }
      , NA_VERSION = "-1"
      , external = win.external
      , userAgent = win.navigator.userAgent || ""
      , appVersion = win.navigator.appVersion || ""
      , vendor = win.navigator.vendor || ""
      , detector = {}
      , re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/
      , re_blackberry_10 = /\bbb10\b.+?\bversion\/([\d.]+)/
      , re_blackberry_6_7 = /\bblackberry\b.+\bversion\/([\d.]+)/
      , re_blackberry_4_5 = /\bblackberry\d+\/([\d.]+)/
      , DEVICES = [["nokia", function(a) {
        return a.indexOf("nokia ") !== -1 ? /\bnokia ([0-9]+)?/ : /\bnokia([a-z0-9]+)?/
    }
    ], ["samsung", function(a) {
        return a.indexOf("samsung") !== -1 ? /\bsamsung(?:[ \-](?:sgh|gt|sm))?-([a-z0-9]+)/ : /\b(?:sgh|sch|gt|sm)-([a-z0-9]+)/
    }
    ], ["wp", function(a) {
        return a.indexOf("windows phone ") !== -1 || a.indexOf("xblwp") !== -1 || a.indexOf("zunewp") !== -1 || a.indexOf("windows ce") !== -1
    }
    ], ["pc", "windows"], ["ipad", "ipad"], ["ipod", "ipod"], ["iphone", /\biphone\b|\biph(\d)/], ["mac", "macintosh"], ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/], ["hongmi", /\bhm\b|redmi[ \-]?([a-z0-9]+)/], ["aliyun", /\baliyunos\b(?:[\-](\d+))?/], ["meizu", function(a) {
        return a.indexOf("meizu") >= 0 ? /\bmeizu[\/ ]([a-z0-9]+)\b/ : /\bm([0-9cx]{1,4})\b/
    }
    ], ["nexus", /\bnexus ([0-9s.]+)/], ["huawei", function(a) {
        var b = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
        return a.indexOf("huawei-huawei") !== -1 ? /\bhuawei\-huawei\-([a-z0-9\-]+)/ : b.test(a) ? b : /\bhuawei[ _\-]?([a-z0-9]+)/
    }
    ], ["lenovo", function(a) {
        return a.indexOf("lenovo-lenovo") !== -1 ? /\blenovo\-lenovo[ \-]([a-z0-9]+)/ : /\blenovo[ \-]?([a-z0-9]+)/
    }
    ], ["zte", function(a) {
        return /\bzte\-[tu]/.test(a) ? /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/ : /\bzte[ _\-]?([a-su-z0-9\+]+)/
    }
    ], ["vivo", /\bvivo(?: ([a-z0-9]+))?/], ["htc", function(a) {
        return /\bhtc[a-z0-9 _\-]+(?= build\b)/.test(a) ? /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/ : /\bhtc[ _\-]?([a-z0-9 ]+)/
    }
    ], ["oppo", /\boppo[_]([a-z0-9]+)/], ["konka", /\bkonka[_\-]([a-z0-9]+)/], ["sonyericsson", /\bmt([a-z0-9]+)/], ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/], ["lg", /\blg[\-]([a-z0-9]+)/], ["android", /\bandroid\b|\badr\b/], ["blackberry", function(a) {
        if (a.indexOf("blackberry") >= 0)
            return /\bblackberry\s?(\d+)/;
        return "bb10"
    }
    ]]
      , OS = [["wp", function(a) {
        if (a.indexOf("windows phone ") !== -1)
            return /\bwindows phone (?:os )?([0-9.]+)/;
        if (a.indexOf("xblwp") !== -1)
            return /\bxblwp([0-9.]+)/;
        if (a.indexOf("zunewp") !== -1)
            return /\bzunewp([0-9.]+)/;
        return "windows phone"
    }
    ], ["windows", /\bwindows nt ([0-9.]+)/], ["macosx", /\bmac os x ([0-9._]+)/], ["iOS", function(a) {
        return /\bcpu(?: iphone)? os /.test(a) ? /\bcpu(?: iphone)? os ([0-9._]+)/ : a.indexOf("iph os ") !== -1 ? /\biph os ([0-9_]+)/ : /\bios\b/
    }
    ], ["yunos", /\baliyunos ([0-9.]+)/], ["Android", function(a) {
        if (a.indexOf("android") >= 0)
            return /\bandroid[ \/-]?([0-9.x]+)?/;
        if (a.indexOf("adr") >= 0)
            return a.indexOf("mqqbrowser") >= 0 ? /\badr[ ]\(linux; u; ([0-9.]+)?/ : /\badr(?:[ ]([0-9.]+))?/;
        return "android"
    }
    ], ["chromeos", /\bcros i686 ([0-9.]+)/], ["linux", "linux"], ["windowsce", /\bwindows ce(?: ([0-9.]+))?/], ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/], ["blackberry", function(a) {
        var b = a.match(re_blackberry_10) || a.match(re_blackberry_6_7) || a.match(re_blackberry_4_5);
        return b ? {
            version: b[1]
        } : "blackberry"
    }
    ]]
      , ENGINE = [["edgehtml", /edge\/([0-9.]+)/], ["trident", re_msie], ["blink", function() {
        return "chrome"in win && "CSS"in win && /\bapplewebkit[\/]?([0-9.+]+)/
    }
    ], ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/], ["gecko", function(a) {
        var b;
        if (b = a.match(/\brv:([\d\w.]+).*\bgecko\/(\d+)/))
            return {
                version: b[1] + "." + b[2]
            }
    }
    ], ["presto", /\bpresto\/([0-9.]+)/], ["androidwebkit", /\bandroidwebkit\/([0-9.]+)/], ["coolpadwebkit", /\bcoolpadwebkit\/([0-9.]+)/], ["u2", /\bu2\/([0-9.]+)/], ["u3", /\bu3\/([0-9.]+)/]]
      , BROWSER = [["edge", /edge\/([0-9.]+)/], ["sogou", function(a) {
        if (a.indexOf("sogoumobilebrowser") >= 0)
            return /sogoumobilebrowser\/([0-9.]+)/;
        if (a.indexOf("sogoumse") >= 0)
            return !0;
        return / se ([0-9.x]+)/
    }
    ], ["theworld", function() {
        var a = checkTW360External("theworld");
        if (typeof a != "undefined")
            return a;
        return "theworld"
    }
    ], ["360", function(a) {
        var b = checkTW360External("360se");
        if (typeof b != "undefined")
            return b;
        if (a.indexOf("360 aphone browser") !== -1)
            return /\b360 aphone browser \(([^\)]+)\)/;
        return /\b360(?:se|ee|chrome|browser)\b/
    }
    ], ["maxthon", function() {
        try {
            if (external && (external.mxVersion || external.max_version))
                return {
                    version: external.mxVersion || external.max_version
                }
        } catch (a) {}
        return /\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/
    }
    ], ["micromessenger", /\bmicromessenger\/([\d.]+)/], ["qq", /\bm?qqbrowser\/([0-9.]+)/], ["green", "greenbrowser"], ["tt", /\btencenttraveler ([0-9.]+)/], ["liebao", function(a) {
        if (a.indexOf("liebaofast") >= 0)
            return /\bliebaofast\/([0-9.]+)/;
        if (a.indexOf("lbbrowser") === -1)
            return !1;
        var b;
        try {
            external && external.LiebaoGetVersion && (b = external.LiebaoGetVersion())
        } catch (c) {}
        return {
            version: b || NA_VERSION
        }
    }
    ], ["tao", /\btaobrowser\/([0-9.]+)/], ["coolnovo", /\bcoolnovo\/([0-9.]+)/], ["saayaa", "saayaa"], ["baidu", /\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/], ["ie", re_msie], ["mi", /\bmiuibrowser\/([0-9.]+)/], ["opera", function(a) {
        var b = /\bopera.+version\/([0-9.ab]+)/
          , c = /\bopr\/([0-9.]+)/;
        return b.test(a) ? b : c
    }
    ], ["oupeng", /\boupeng\/([0-9.]+)/], ["yandex", /yabrowser\/([0-9.]+)/], ["ali-ap", function(a) {
        return a.indexOf("aliapp") > 0 ? /\baliapp\(ap\/([0-9.]+)\)/ : /\balipayclient\/([0-9.]+)\b/
    }
    ], ["ali-ap-pd", /\baliapp\(ap-pd\/([0-9.]+)\)/], ["ali-am", /\baliapp\(am\/([0-9.]+)\)/], ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/], ["ali-tb-pd", /\baliapp\(tb-pd\/([0-9.]+)\)/], ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/], ["ali-tm-pd", /\baliapp\(tm-pd\/([0-9.]+)\)/], ["uc", function(a) {
        return a.indexOf("ucbrowser/") >= 0 ? /\bucbrowser\/([0-9.]+)/ : a.indexOf("ubrowser/") >= 0 ? /\bubrowser\/([0-9.]+)/ : /\buc\/[0-9]/.test(a) ? /\buc\/([0-9.]+)/ : a.indexOf("ucweb") >= 0 ? /\bucweb([0-9.]+)?/ : /\b(?:ucbrowser|uc)\b/
    }
    ], ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/], ["android", function(a) {
        if (a.indexOf("android") !== -1)
            return /\bversion\/([0-9.]+(?: beta)?)/
    }
    ], ["blackberry", function(a) {
        var b = a.match(re_blackberry_10) || a.match(re_blackberry_6_7) || a.match(re_blackberry_4_5);
        return b ? {
            version: b[1]
        } : "blackberry"
    }
    ], ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//], ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/], ["firefox", /\bfirefox\/([0-9.ab]+)/], ["nokia", /\bnokiabrowser\/([0-9.]+)/]]
      , na = {
        name: "",
        version: ""
    }
      , parse = function(a) {
        a = (a || "").toLowerCase();
        var b = {};
        init(a, DEVICES, function(a, c) {
            var e = parseFloat(c);
            b.device = {
                name: a,
                version: e,
                fullVersion: c
            },
            b.device[a] = e
        }, b),
        init(a, OS, function(a, c) {
            var e = parseFloat(c);
            b.os = {
                name: a,
                version: e,
                fullVersion: c
            },
            b.os[a] = e
        }, b);
        var c = IEMode(a);
        init(a, ENGINE, function(a, e) {
            var f = e;
            c && (e = c.engineVersion || c.engineMode,
            f = c.engineMode);
            var g = parseFloat(e);
            b.engine = {
                name: a,
                version: g,
                fullVersion: e,
                mode: parseFloat(f),
                fullMode: f,
                compatible: c ? c.compatible : !1
            },
            b.engine[a] = g
        }, b),
        init(a, BROWSER, function(a, e) {
            var f = e;
            c && (a === "ie" && (e = c.browserVersion),
            f = c.browserMode);
            var g = parseFloat(e);
            b.browser = {
                name: a,
                version: g,
                fullVersion: e,
                mode: parseFloat(f),
                fullMode: f,
                compatible: c ? c.compatible : !1
            },
            b.browser[a] = g
        }, b);
        return b
    };
    detector = parse(userAgent + " " + appVersion + " " + vendor),
    _.trim = function(a) {
        if (!!a)
            return a.replace(/(^\s*)|(\s*$)/g, "")
    }
    ,
    _.checkTime = function(a) {
        var b = a + ""
          , c = /^(\d{4})-(\d{2})-(\d{2})$/;
        return a ? c.test(a) ? !0 : !1 : !1
    }
    ,
    _.bind = function(a, b) {
        var c, d;
        if (nativeBind && a.bind === nativeBind)
            return nativeBind.apply(a, slice.call(arguments, 1));
        if (!_.isFunction(a))
            throw new TypeError;
        c = slice.call(arguments, 2),
        d = function() {
            if (!(this instanceof d))
                return a.apply(b, c.concat(slice.call(arguments)));
            var e = {};
            e.prototype = a.prototype;
            var f = new e;
            e.prototype = null;
            var g = a.apply(f, c.concat(slice.call(arguments)));
            if (Object(g) === g)
                return g;
            return f
        }
        ;
        return d
    }
    ,
    _.bind_instance_methods = function(a) {
        for (var b in a)
            typeof a[b] == "function" && (a[b] = _.bind(a[b], a))
    }
    ,
    _.each = function(a, b, c) {
        if (a !== null && a !== undefined)
            if (nativeForEach && a.forEach === nativeForEach)
                a.forEach(b, c);
            else if (a.length === +a.length) {
                for (var d = 0, e = a.length; d < e; d++)
                    if (d in a && b.call(c, a[d], d, a) === breaker)
                        return
            } else
                for (var f in a)
                    if (hasOwnProperty.call(a, f) && b.call(c, a[f], f, a) === breaker)
                        return
    }
    ,
    _.escapeHTML = function(a) {
        var b = a;
        b && _.isString(b) && (b = b.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"));
        return b
    }
    ,
    _.extend = function(a) {
        _.each(slice.call(arguments, 1), function(b) {
            for (var c in b)
                b[c] !== void 0 && (a[c] = b[c])
        });
        return a
    }
    ,
    _.deepMerge = function(a, b) {
        var c;
        for (c in b)
            a[c] = a[c] && a[c].toString() === "[object Object]" ? _.deepMerge(a[c], b[c]) : a[c] = b[c];
        return a
    }
    ,
    _.isArray = nativeIsArray || function(a) {
        return Object.prototype.toString.apply(a) === "[object Array]"
    }
    ,
    _.isFunction = function(a) {
        try {
            return /^\s*\bfunction\b/.test(a)
        } catch (b) {
            return !1
        }
    }
    ,
    _.isArguments = function(a) {
        return !!a && !!hasOwnProperty.call(a, "callee")
    }
    ,
    _.toArray = function(a) {
        if (!a)
            return [];
        if (a.toArray)
            return a.toArray();
        if (_.isArray(a))
            return slice.call(a);
        if (_.isArguments(a))
            return slice.call(a);
        return _.values(a)
    }
    ,
    _.values = function(a) {
        var b = [];
        if (a === null)
            return b;
        _.each(a, function(a) {
            b[b.length] = a
        });
        return b
    }
    ,
    _.identity = function(a) {
        return a
    }
    ,
    _.include = function(a, b) {
        var c = !1;
        if (a === null)
            return c;
        if (nativeIndexOf && a.indexOf === nativeIndexOf)
            return a.indexOf(b) != -1;
        _.each(a, function(a) {
            if (c || (c = a === b))
                return breaker
        });
        return c
    }
    ,
    _.includes = function(a, b) {
        return a.indexOf(b) !== -1
    }
    ,
    _.inherit = function(a, b) {
        a.prototype = new b,
        a.prototype.constructor = a,
        a.superclass = b.prototype;
        return a
    }
    ,
    _.isObject = function(a) {
        return a === Object(a) && !_.isArray(a)
    }
    ,
    _.isEmptyObject = function(a) {
        if (_.isObject(a)) {
            for (var b in a)
                if (hasOwnProperty.call(a, b))
                    return !1;
            return !0
        }
        return !1
    }
    ,
    _.isUndefined = function(a) {
        return a === void 0
    }
    ,
    _.isString = function(a) {
        return Object.prototype.toString.call(a) == "[object String]"
    }
    ,
    _.isDate = function(a) {
        return toString.call(a) == "[object Date]"
    }
    ,
    _.isNumber = function(a) {
        return toString.call(a) == "[object Number]"
    }
    ,
    _.isElement = function(a) {
        return !!a && a.nodeType === 1
    }
    ,
    _.encodeDates = function(a) {
        _.each(a, function(b, c) {
            _.isDate(b) ? a[c] = _.formatDate(b) : _.isObject(b) && (a[c] = _.encodeDates(b))
        });
        return a
    }
    ,
    _.timestamp = function() {
        Date.now = Date.now || function() {
            return +(new Date)
        }
        ;
        return Date.now()
    }
    ,
    _.formatDate = function(a) {
        function b(a) {
            return a < 10 ? "0" + a : a
        }
        return a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1) + "-" + b(a.getUTCDate()) + "T" + b(a.getUTCHours()) + ":" + b(a.getUTCMinutes()) + ":" + b(a.getUTCSeconds())
    }
    ,
    _.safewrap = function(a) {
        return function() {
            try {
                return a.apply(this, arguments)
            } catch (b) {
                console.critical("Implementation error. Please contact support@DATracker.com.")
            }
        }
    }
    ,
    _.safewrap_class = function(a, b) {
        for (var c = 0; c < b.length; c++)
            a.prototype[b[c]] = _.safewrap(a.prototype[b[c]])
    }
    ,
    _.safewrap_instance_methods = function(a) {
        for (var b in a)
            typeof a[b] == "function" && (a[b] = _.safewrap(a[b]))
    }
    ,
    _.strip_empty_properties = function(a) {
        var b = {};
        _.each(a, function(a, c) {
            _.isString(a) && a.length > 0 && (b[c] = a)
        });
        return b
    }
    ,
    _.truncate = function(a, b) {
        var c;
        typeof a == "string" ? c = a.slice(0, b) : _.isArray(a) ? (c = [],
        _.each(a, function(a) {
            c.push(_.truncate(a, b))
        })) : _.isObject(a) ? (c = {},
        _.each(a, function(a, d) {
            c[d] = _.truncate(a, b)
        })) : c = a;
        return c
    }
    ,
    _.JSONEncode = function() {
        return function(a) {
            var b = a
              , c = function(a) {
                var b = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
                  , c = {
                    "\b": "\\b",
                    "\t": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                };
                b.lastIndex = 0;
                return b.test(a) ? '"' + a.replace(b, function(a) {
                    var b = c[a];
                    return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + a + '"'
            }
              , d = function(a, b) {
                var e = ""
                  , f = "    "
                  , g = 0
                  , h = ""
                  , i = ""
                  , j = 0
                  , k = e
                  , l = []
                  , m = b[a];
                m && typeof m == "object" && typeof m.toJSON == "function" && (m = m.toJSON(a));
                switch (typeof m) {
                case "string":
                    return c(m);
                case "number":
                    return isFinite(m) ? String(m) : "null";
                case "boolean":
                case "null":
                    return String(m);
                case "object":
                    if (!m)
                        return "null";
                    e += f,
                    l = [];
                    if (toString.apply(m) === "[object Array]") {
                        j = m.length;
                        for (g = 0; g < j; g += 1)
                            l[g] = d(g, m) || "null";
                        i = l.length === 0 ? "[]" : e ? "[\n" + e + l.join(",\n" + e) + "\n" + k + "]" : "[" + l.join(",") + "]",
                        e = k;
                        return i
                    }
                    for (h in m)
                        hasOwnProperty.call(m, h) && (i = d(h, m),
                        i && l.push(c(h) + (e ? ": " : ":") + i));
                    i = l.length === 0 ? "{}" : e ? "{" + l.join(",") + "" + k + "}" : "{" + l.join(",") + "}",
                    e = k;
                    return i
                }
            };
            return d("", {
                "": b
            })
        }
    }(),
    _.JSONDecode = function() {
        var a, b, c = {
            '"': '"',
            "\\": "\\",
            "/": "/",
            b: "\b",
            f: "\f",
            n: "\n",
            r: "\r",
            t: "\t"
        }, d, e = function(b) {
            throw {
                name: "SyntaxError",
                message: b,
                at: a,
                text: d
            }
        }, f = function(c) {
            c && c !== b && e("Expected '" + c + "' instead of '" + b + "'"),
            b = d.charAt(a),
            a += 1;
            return b
        }, g = function() {
            var a, c = "";
            b === "-" && (c = "-",
            f("-"));
            while (b >= "0" && b <= "9")
                c += b,
                f();
            if (b === ".") {
                c += ".";
                while (f() && b >= "0" && b <= "9")
                    c += b
            }
            if (b === "e" || b === "E") {
                c += b,
                f();
                if (b === "-" || b === "+")
                    c += b,
                    f();
                while (b >= "0" && b <= "9")
                    c += b,
                    f()
            }
            a = +c;
            if (!isFinite(a))
                e("Bad number");
            else
                return a
        }, h = function() {
            var a, d, g = "", h;
            if (b === '"')
                while (f()) {
                    if (b === '"') {
                        f();
                        return g
                    }
                    if (b === "\\") {
                        f();
                        if (b === "u") {
                            h = 0;
                            for (d = 0; d < 4; d += 1) {
                                a = parseInt(f(), 16);
                                if (!isFinite(a))
                                    break;
                                h = h * 16 + a
                            }
                            g += String.fromCharCode(h)
                        } else if (typeof c[b] == "string")
                            g += c[b];
                        else
                            break
                    } else
                        g += b
                }
            e("Bad string")
        }, i = function() {
            while (b && b <= " ")
                f()
        }, j = function() {
            switch (b) {
            case "t":
                f("t"),
                f("r"),
                f("u"),
                f("e");
                return !0;
            case "f":
                f("f"),
                f("a"),
                f("l"),
                f("s"),
                f("e");
                return !1;
            case "n":
                f("n"),
                f("u"),
                f("l"),
                f("l");
                return null
            }
            e('Unexpected "' + b + '"')
        }, k, l = function() {
            var a = [];
            if (b === "[") {
                f("["),
                i();
                if (b === "]") {
                    f("]");
                    return a
                }
                while (b) {
                    a.push(k()),
                    i();
                    if (b === "]") {
                        f("]");
                        return a
                    }
                    f(","),
                    i()
                }
            }
            e("Bad array")
        }, m = function() {
            var a, c = {};
            if (b === "{") {
                f("{"),
                i();
                if (b === "}") {
                    f("}");
                    return c
                }
                while (b) {
                    a = h(),
                    i(),
                    f(":"),
                    Object.hasOwnProperty.call(c, a) && e('Duplicate key "' + a + '"'),
                    c[a] = k(),
                    i();
                    if (b === "}") {
                        f("}");
                        return c
                    }
                    f(","),
                    i()
                }
            }
            e("Bad object")
        };
        k = function() {
            i();
            switch (b) {
            case "{":
                return m();
            case "[":
                return l();
            case '"':
                return h();
            case "-":
                return g();
            default:
                return b >= "0" && b <= "9" ? g() : j()
            }
        }
        ;
        return function(c) {
            var f;
            d = c,
            a = 0,
            b = " ",
            f = k(),
            i(),
            b && e("Syntax error");
            return f
        }
    }(),
    _.base64Encode = function(a) {
        var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c, d, e, f, g, h, i, j, k = 0, l = 0, m = "", n = [];
        if (!a)
            return a;
        a = _.utf8Encode(a);
        do
            c = a.charCodeAt(k++),
            d = a.charCodeAt(k++),
            e = a.charCodeAt(k++),
            j = c << 16 | d << 8 | e,
            f = j >> 18 & 63,
            g = j >> 12 & 63,
            h = j >> 6 & 63,
            i = j & 63,
            n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i);
        while (k < a.length);m = n.join("");
        switch (a.length % 3) {
        case 1:
            m = m.slice(0, -2) + "==";
            break;
        case 2:
            m = m.slice(0, -1) + "="
        }
        return m
    }
    ,
    _.utf8Encode = function(a) {
        a = (a + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        var b = "", c, d, e = 0, f;
        c = d = 0,
        e = a.length;
        for (f = 0; f < e; f++) {
            var g = a.charCodeAt(f)
              , h = null;
            g < 128 ? d++ : g > 127 && g < 2048 ? h = String.fromCharCode(g >> 6 | 192, g & 63 | 128) : h = String.fromCharCode(g >> 12 | 224, g >> 6 & 63 | 128, g & 63 | 128),
            h !== null && (d > c && (b += a.substring(c, d)),
            b += h,
            c = d = f + 1)
        }
        d > c && (b += a.substring(c, a.length));
        return b
    }
    ,
    _.sha1 = function(a) {
        function u(a) {
            var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
              , d = "";
            for (var e = 0; e < a.length * 4; e += 3) {
                var f = (a[e >> 2] >> 8 * (3 - e % 4) & 255) << 16 | (a[e + 1 >> 2] >> 8 * (3 - (e + 1) % 4) & 255) << 8 | a[e + 2 >> 2] >> 8 * (3 - (e + 2) % 4) & 255;
                for (var g = 0; g < 4; g++)
                    e * 8 + g * 6 > a.length * 32 ? d += c : d += b.charAt(f >> 6 * (3 - g) & 63)
            }
            return d
        }
        function t(a) {
            var c = b ? "0123456789ABCDEF" : "0123456789abcdef"
              , d = "";
            for (var e = 0; e < a.length * 4; e++)
                d += c.charAt(a[e >> 2] >> (3 - e % 4) * 8 + 4 & 15) + c.charAt(a[e >> 2] >> (3 - e % 4) * 8 & 15);
            return d
        }
        function s(a) {
            var b = ""
              , c = (1 << d) - 1;
            for (var e = 0; e < a.length * 32; e += d)
                b += String.fromCharCode(a[e >> 5] >>> 24 - e % 32 & c);
            return b
        }
        function r(a) {
            var b = []
              , c = (1 << d) - 1;
            for (var e = 0; e < a.length * d; e += d)
                b[e >> 5] |= (a.charCodeAt(e / d) & c) << 24 - e % 32;
            return b
        }
        function q(a, b) {
            return a << b | a >>> 32 - b
        }
        function p(a, b) {
            var c = (a & 65535) + (b & 65535)
              , d = (a >> 16) + (b >> 16) + (c >> 16);
            return d << 16 | c & 65535
        }
        function o(a, b) {
            var c = r(a);
            c.length > 16 && (c = l(c, a.length * d));
            var e = Array(16)
              , f = Array(16);
            for (var g = 0; g < 16; g++)
                e[g] = c[g] ^ 909522486,
                f[g] = c[g] ^ 1549556828;
            var h = l(e.concat(r(b)), 512 + b.length * d);
            return l(f.concat(h), 672)
        }
        function n(a) {
            return a < 20 ? 1518500249 : a < 40 ? 1859775393 : a < 60 ? -1894007588 : -899497514
        }
        function m(a, b, c, d) {
            if (a < 20)
                return b & c | ~b & d;
            if (a < 40)
                return b ^ c ^ d;
            if (a < 60)
                return b & c | b & d | c & d;
            return b ^ c ^ d
        }
        function l(a, b) {
            a[b >> 5] |= 128 << 24 - b % 32,
            a[(b + 64 >> 9 << 4) + 15] = b;
            var c = Array(80)
              , d = 1732584193
              , e = -271733879
              , f = -1732584194
              , g = 271733878
              , h = -1009589776;
            for (var i = 0; i < a.length; i += 16) {
                var j = d
                  , k = e
                  , l = f
                  , o = g
                  , r = h;
                for (var s = 0; s < 80; s++) {
                    s < 16 ? c[s] = a[i + s] : c[s] = q(c[s - 3] ^ c[s - 8] ^ c[s - 14] ^ c[s - 16], 1);
                    var t = p(p(q(d, 5), m(s, e, f, g)), p(p(h, c[s]), n(s)));
                    h = g,
                    g = f,
                    f = q(e, 30),
                    e = d,
                    d = t
                }
                d = p(d, j),
                e = p(e, k),
                f = p(f, l),
                g = p(g, o),
                h = p(h, r)
            }
            return [d, e, f, g, h]
        }
        function k() {
            return e("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d"
        }
        function j(a, b) {
            return s(o(a, b))
        }
        function i(a, b) {
            return u(o(a, b))
        }
        function h(a, b) {
            return t(o(a, b))
        }
        function g(a) {
            return s(l(r(a), a.length * d))
        }
        function f(a) {
            return u(l(r(a), a.length * d))
        }
        function e(a) {
            return t(l(r(a), a.length * d))
        }
        var b = 0
          , c = ""
          , d = 8;
        return e(a)
    }
    ,
    _.UUID = function() {
        var a = function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                var b = Math.random() * 16 | 0
                  , c = a == "x" ? b : b & 3 | 8;
                return c.toString(16)
            })
        };
        return a
    }(),
    _.isBlockedUA = function(a) {
        if (/(google web preview|baiduspider|yandexbot|bingbot|googlebot|yahoo! slurp)/i.test(a))
            return !0;
        return !1
    }
    ,
    _.HTTPBuildQuery = function(a, b) {
        var c, d, e = [];
        _.isUndefined(b) && (b = "&"),
        _.each(a, function(a, b) {
            c = encodeURIComponent(a.toString()),
            d = encodeURIComponent(b),
            e[e.length] = d + "=" + c
        });
        return e.join(b)
    }
    ,
    _.getQueryParam = function(a, b) {
        b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var c = "[\\?&]" + b + "=([^&#]*)"
          , d = new RegExp(c)
          , e = d.exec(a);
        return e === null || e && typeof e[1] != "string" && e[1].length ? "" : decodeURIComponent(e[1]).replace(/\+/g, " ")
    }
    ,
    _.getHashParam = function(a, b) {
        var c = a.match(new RegExp(b + "=([^&]*)"));
        return c ? c[1] : null
    }
    ,
    _.cookie = {
        get: function(a) {
            var b = a + "="
              , c = document$1.cookie.split(";");
            for (var d = 0; d < c.length; d++) {
                var e = c[d];
                while (e.charAt(0) == " ")
                    e = e.substring(1, e.length);
                if (e.indexOf(b) === 0)
                    return decodeURIComponent(e.substring(b.length, e.length))
            }
            return null
        },
        parse: function(a) {
            var b;
            try {
                b = _.JSONDecode(_.cookie.get(a)) || {}
            } catch (c) {}
            return b
        },
        set_seconds: function(a, b, c, d, e) {
            var f = ""
              , g = ""
              , h = "";
            if (d) {
                var i = document$1.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i)
                  , j = i ? i[0] : "";
                f = j ? "; domain=." + j : ""
            }
            if (c) {
                var k = new Date;
                k.setTime(k.getTime() + c * 1e3),
                g = "; expires=" + k.toGMTString()
            }
            e && (h = "; secure"),
            document$1.cookie = a + "=" + encodeURIComponent(b) + g + "; path=/" + f + h
        },
        set: function(a, b, c, d, e) {
            var f = ""
              , g = ""
              , h = "";
            if (d) {
                var i = document$1.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i)
                  , j = i ? i[0] : "";
                f = j ? "; domain=." + j : ""
            }
            if (c) {
                var k = new Date;
                k.setTime(k.getTime() + c * 24 * 60 * 60 * 1e3),
                g = "; expires=" + k.toGMTString()
            }
            e && (h = "; secure");
            var l = a + "=" + encodeURIComponent(b) + g + "; path=/" + f + h;
            document$1.cookie = l;
            return l
        },
        remove: function(a, b) {
            _.cookie.set(a, "", -1, b)
        }
    },
    _.localStorage = {
        error: function(a) {
            console.error("localStorage error: " + a)
        },
        get: function(a) {
            try {
                return window.localStorage.getItem(a)
            } catch (b) {
                _.localStorage.error(b)
            }
            return null
        },
        parse: function(a) {
            try {
                return _.JSONDecode(_.localStorage.get(a)) || {}
            } catch (b) {}
            return null
        },
        set: function(a, b) {
            try {
                window.localStorage.setItem(a, b)
            } catch (c) {
                _.localStorage.error(c)
            }
        },
        remove: function(a) {
            try {
                window.localStorage.removeItem(a)
            } catch (b) {
                _.localStorage.error(b)
            }
        }
    },
    _.register_event = function() {
        function c(a) {
            a && (a.preventDefault = c.preventDefault,
            a.stopPropagation = c.stopPropagation);
            return a
        }
        function b(a, b, d) {
            var e = function(e) {
                e = e || c(window.event);
                if (!e)
                    return undefined;
                var f = !0, g, h;
                _.isFunction(d) && (g = d(e)),
                h = b.call(a, e);
                if (!1 === g || !1 === h)
                    f = !1;
                return f
            };
            return e
        }
        var a = function(a, c, d, e, f) {
            if (!a)
                console.error("No valid element provided to register_event");
            else if (a.addEventListener && !e)
                a.addEventListener(c, d, !!f);
            else {
                var g = "on" + c
                  , h = a[g];
                a[g] = b(a, d, h)
            }
        };
        c.preventDefault = function() {
            this.returnValue = !1
        }
        ,
        c.stopPropagation = function() {
            this.cancelBubble = !0
        }
        ;
        return a
    }(),
    _.register_hash_event = function(a) {
        _.register_event(window, "hashchange", a)
    }
    ,
    _.dom_query = function() {
        function d(b) {
            if (!document$1.getElementsByTagName)
                return [];
            var d = b.split(" "), e, f, g, h, i, j, k, l, m, n, o = [document$1];
            for (j = 0; j < d.length; j++) {
                e = d[j].replace(/^\s+/, "").replace(/\s+$/, "");
                if (e.indexOf("#") > -1) {
                    f = e.split("#"),
                    g = f[0];
                    var p = f[1]
                      , q = document$1.getElementById(p);
                    if (!q || g && q.nodeName.toLowerCase() != g)
                        return [];
                    o = [q];
                    continue
                }
                if (e.indexOf(".") > -1) {
                    f = e.split("."),
                    g = f[0];
                    var r = f[1];
                    g || (g = "*"),
                    h = [],
                    i = 0;
                    for (k = 0; k < o.length; k++) {
                        g == "*" ? m = a(o[k]) : m = o[k].getElementsByTagName(g);
                        for (l = 0; l < m.length; l++)
                            h[i++] = m[l]
                    }
                    o = [],
                    n = 0;
                    for (k = 0; k < h.length; k++)
                        h[k].className && _.isString(h[k].className) && c(h[k], r) && (o[n++] = h[k]);
                    continue
                }
                var s = e.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/);
                if (s) {
                    g = s[1];
                    var t = s[2]
                      , u = s[3]
                      , v = s[4];
                    g || (g = "*"),
                    h = [],
                    i = 0;
                    for (k = 0; k < o.length; k++) {
                        g == "*" ? m = a(o[k]) : m = o[k].getElementsByTagName(g);
                        for (l = 0; l < m.length; l++)
                            h[i++] = m[l]
                    }
                    o = [],
                    n = 0;
                    var w;
                    switch (u) {
                    case "=":
                        w = function(a) {
                            return a.getAttribute(t) == v
                        }
                        ;
                        break;
                    case "~":
                        w = function(a) {
                            return a.getAttribute(t).match(new RegExp("\\b" + v + "\\b"))
                        }
                        ;
                        break;
                    case "|":
                        w = function(a) {
                            return a.getAttribute(t).match(new RegExp("^" + v + "-?"))
                        }
                        ;
                        break;
                    case "^":
                        w = function(a) {
                            return a.getAttribute(t).indexOf(v) === 0
                        }
                        ;
                        break;
                    case "$":
                        w = function(a) {
                            return a.getAttribute(t).lastIndexOf(v) == a.getAttribute(t).length - v.length
                        }
                        ;
                        break;
                    case "*":
                        w = function(a) {
                            return a.getAttribute(t).indexOf(v) > -1
                        }
                        ;
                        break;
                    default:
                        w = function(a) {
                            return a.getAttribute(t)
                        }
                    }
                    o = [],
                    n = 0;
                    for (k = 0; k < h.length; k++)
                        w(h[k]) && (o[n++] = h[k]);
                    continue
                }
                g = e,
                h = [],
                i = 0;
                for (k = 0; k < o.length; k++) {
                    m = o[k].getElementsByTagName(g);
                    for (l = 0; l < m.length; l++)
                        h[i++] = m[l]
                }
                o = h
            }
            return o
        }
        function c(a, c) {
            var d = " " + c + " ";
            return (" " + a.className + " ").replace(b, " ").indexOf(d) >= 0
        }
        function a(a) {
            return a.all ? a.all : a.getElementsByTagName("*")
        }
        var b = /[\t\r\n]/g;
        return function(a) {
            return _.isElement(a) ? [a] : _.isObject(a) && !_.isUndefined(a.length) ? a : d.call(this, a)
        }
    }(),
    _.info = {
        referringDomain: function(a) {
            var b = a.split("/");
            if (b.length >= 3)
                return b[2];
            return ""
        },
        properties: function() {
            var a = {
                "5.0": "Win2000",
                5.1: "WinXP",
                5.2: "Win2003",
                "6.0": "WindowsVista",
                6.1: "Win7",
                6.2: "Win8",
                6.3: "Win8.1",
                "10.0": "Win10"
            }
              , b = Device.devicePlatform() || "web"
              , c = Device.deviceModel()
              , d = Device.windows()
              , e = detector.os.name + " " + detector.os.fullVersion;
            d && a[detector.os.fullVersion] && (e = a[detector.os.fullVersion]);
            return _.extend(_.strip_empty_properties({
                deviceModel: c,
                deviceOs: detector.os.name,
                deviceOsVersion: e,
                browser: detector.browser.name,
                referrer: document$1.referrer,
                referring_domain: _.info.referringDomain(document$1.referrer),
                devicePlatform: b,
                currentDomain: _.info.referringDomain(window.location.href)
            }), {
                current_url: window.location.href,
                title: document$1.title || "",
                url_path: window.location.pathname || "",
                browser_version: detector.browser.fullVersion,
                screen_height: screen.height,
                screen_width: screen.width,
                hb_lib: b,
                lib_version: Config.LIB_VERSION
            })
        }
    },
    _.size = function(a) {
        var b = 0, c;
        for (c in a)
            a.hasOwnProperty(c) && b++;
        return b
    }
    ,
    _.isJSONString = function(a) {
        try {
            JSON.parse(a)
        } catch (b) {
            return !1
        }
        return !0
    }
    ,
    _.get_host = function(a) {
        var b = "";
        if (typeof a == "undefined" || a === null)
            a = window.location.href;
        var c = /.*\:\/\/([^\/]*).*/
          , d = a.match(c);
        typeof d != "undefined" && d !== null && (b = d[1]);
        return b
    }
    ,
    _.sessionStorage = {
        isSupport: function() {
            var a = !0
              , b = "__hubbledatasupport__"
              , c = "testIsSupportStorage";
            try {
                sessionStorage && sessionStorage.setItem ? (sessionStorage.setItem(b, c),
                sessionStorage.removeItem(b, c),
                a = !0) : a = !1
            } catch (d) {
                a = !1
            }
            return a
        }
    },
    _.loadScript = function(a) {
        a = _.extend({
            success: function() {},
            error: function() {},
            appendCall: function(a) {
                document$1.getElementsByTagName("head")[0].appendChild(a)
            }
        }, a);
        var b = null;
        a.type === "css" && (b = document$1.createElement("link"),
        b.rel = "stylesheet",
        b.href = a.url),
        a.type === "js" && (b = document$1.createElement("script"),
        b.async = "async",
        b.setAttribute("charset", "UTF-8"),
        b.src = a.url,
        b.type = "text/javascript"),
        b.onload = b.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")
                a.success(),
                b.onload = b.onreadystatechange = null
        }
        ,
        b.onerror = function() {
            a.error(),
            b.onerror = null
        }
        ,
        a.appendCall(b)
    }
    ,
    _.ry = function(a) {
        return new _.ry.init(a)
    }
    ,
    _.ry.init = function(a) {
        this.ele = a
    }
    ,
    _.ry.init.prototype = {
        addClass: function(a) {
            var b = " " + this.ele.className + " ";
            b.indexOf(" " + a + " ") === -1 && (this.ele.className = this.ele.className + (this.ele.className === "" ? "" : " ") + a);
            return this
        },
        removeClass: function(a) {
            var b = " " + this.ele.className + " ";
            b.indexOf(" " + a + " ") !== -1 && (this.ele.className = b.replace(" " + a + " ", " ").slice(1, -1));
            return this
        },
        hasClass: function(a) {
            var b = " " + this.ele.className + " ";
            return b.indexOf(" " + a + " ") !== -1 ? !0 : !1
        },
        attr: function(a, b) {
            if (typeof a == "string" && _.isUndefined(b))
                return this.ele.getAttribute(a);
            typeof a == "string" && (b = String(b),
            this.ele.setAttribute(a, b));
            return this
        },
        offset: function() {
            var a = this.ele.getBoundingClientRect();
            if (a.width || a.height) {
                var b = this.ele.ownerDocument
                  , c = b.documentElement;
                return {
                    top: a.top + window.pageYOffset - c.clientTop,
                    left: a.left + window.pageXOffset - c.clientLeft
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        getSize: function() {
            if (!window.getComputedStyle)
                return {
                    width: this.ele.offsetWidth,
                    height: this.ele.offsetHeight
                };
            try {
                var a = this.ele.getBoundingClientRect();
                return {
                    width: a.width,
                    height: a.height
                }
            } catch (b) {
                return {
                    width: 0,
                    height: 0
                }
            }
        },
        getStyle: function(a) {
            return this.ele.currentStyle ? this.ele.currentStyle[a] : this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(a)
        },
        wrap: function(a) {
            var b = document$1.createElement(a);
            this.ele.parentNode.insertBefore(b, this.ele),
            b.appendChild(this.ele);
            return _.ry(b)
        },
        getCssStyle: function(a) {
            var b = this.ele.style.getPropertyValue(a);
            if (b)
                return b;
            var c = null;
            typeof window.getMatchedCSSRules == "function" && (c = getMatchedCSSRules(this.ele));
            if (!c || !_.isArray(c))
                return null;
            for (var d = c.length - 1; d >= 0; d--) {
                var e = c[d];
                b = e.style.getPropertyValue(a);
                if (b)
                    return b
            }
        },
        sibling: function(a, b) {
            while ((a = a[b]) && a.nodeType !== 1)
                ;
            return a
        },
        next: function() {
            return this.sibling(this.ele, "nextSibling")
        },
        prev: function(a) {
            return this.sibling(this.ele, "previousSibling")
        },
        siblings: function(a) {
            return this.siblings((this.ele.parentNode || {}).firstChild, this.ele)
        },
        children: function(a) {
            return this.siblings(this.ele.firstChild)
        },
        parent: function() {
            var a = this.ele.parentNode;
            a = a && a.nodeType !== 11 ? a : null;
            return _.ry(a)
        }
    },
    _.addEvent = function() {
        function c(b, c, d) {
            var e = function(e) {
                e = e || a(window.event);
                if (!e)
                    return undefined;
                e.target = e.srcElement;
                var f = !0, g, h;
                typeof d == "function" && (g = d(e)),
                h = c.call(b, e);
                if (!1 === g || !1 === h)
                    f = !1;
                return f
            };
            return e
        }
        function a(b) {
            b && (b.preventDefault = a.preventDefault,
            b.stopPropagation = a.stopPropagation,
            b._getPath = a._getPath);
            return b
        }
        a._getPath = function() {
            var a = this
              , b = function() {
                try {
                    var b = a.target
                      , c = [b];
                    if (b === null || b.parentElement === null)
                        return [];
                    while (b.parentElement !== null)
                        b = b.parentElement,
                        c.unshift(b);
                    return c
                } catch (d) {
                    return []
                }
            };
            return this.path || this.composedPath && this.composedPath() || b()
        }
        ,
        a.preventDefault = function() {
            this.returnValue = !1
        }
        ,
        a.stopPropagation = function() {
            this.cancelBubble = !0
        }
        ;
        var b = function(b, d, e) {
            if (b && b.addEventListener)
                b.addEventListener(d, function(b) {
                    b._getPath = a._getPath,
                    e.call(this, b)
                }, !1);
            else {
                var f = "on" + d
                  , g = b[f];
                b[f] = c(b, e, g)
            }
        };
        b.apply(null, arguments)
    }
    ,
    _.getEleInfo = function(a, b, c) {
        if (!a.target || !b)
            return !1;
        var d = a.target
          , e = d.tagName.toLowerCase()
          , f = {};
        f.type = e;
        var g = "";
        d.textContent ? g = _.trim(d.textContent) : d.innerText && (g = _.trim(d.innerText)),
        g && (g = g.replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255)),
        f.text = g || "",
        e === "input" && (d.type === "button" || d.type === "submit" ? f.text = d.value || "" : b && typeof b.collect_input == "function" && b.collect_input(d, c) && (f.text = d.value || "")),
        f = _.strip_empty_properties(f);
        return f
    }
    ,
    _.ajax = {
        post: function(a, b, c, d) {
            var e = this;
            e.callback = c || function(a) {}
            ;
            try {
                var f = new XMLHttpRequest;
                f.open("POST", a, !0),
                f.setRequestHeader("Content-type", "application/json"),
                f.withCredentials = !0,
                f.ontimeout = function() {
                    e.callback({
                        status: 0,
                        error: !0,
                        message: "request " + a + " time out"
                    })
                }
                ,
                f.onreadystatechange = function() {
                    if (f.readyState === 4)
                        if (f.status === 200)
                            e.callback(_.JSONDecode(f.responseText));
                        else {
                            var a = "Bad HTTP status: " + f.status + " " + f.statusText;
                            e.callback({
                                status: 0,
                                error: !0,
                                message: a
                            })
                        }
                }
                ,
                f.timeout = d || 5e3,
                f.send(_.JSONEncode(b))
            } catch (g) {}
        },
        get: function(a, b) {
            try {
                var c = new XMLHttpRequest;
                c.open("GET", a, !0),
                c.withCredentials = !0,
                c.onreadystatechange = function() {
                    if (c.readyState === 4)
                        if (c.status === 200)
                            b && b(_.JSONDecode(c.responseText));
                        else if (b) {
                            var a = "Bad HTTP status: " + c.status + " " + c.statusText;
                            b({
                                status: 0,
                                error: !0,
                                message: a
                            })
                        }
                }
                ,
                c.send(null)
            } catch (d) {}
        }
    },
    _.innerEvent = {
        on: function(a, b) {
            this._list || (this._list = {}),
            this._list[a] || (this._list[a] = []),
            this._list[a].push(b)
        },
        off: function(a) {
            this._list || (this._list = {});
            !this._list[a] || delete this._list[a]
        },
        trigger: function() {
            var a = Array.prototype.slice.call(arguments)
              , b = a[0]
              , c = this._list && this._list[b];
            if (!!c && c.length !== 0)
                for (var d = 0; d < c.length; d++)
                    typeof c[d] == "function" && c[d].apply(this, a)
        }
    },
    _.toArray = _.toArray,
    _.isObject = _.isObject,
    _.JSONEncode = _.JSONEncode,
    _.JSONDecode = _.JSONDecode,
    _.isBlockedUA = _.isBlockedUA,
    _.isEmptyObject = _.isEmptyObject,
    _.info = _.info,
    _.info.properties = _.info.properties,
    _.sessionStorage = _.sessionStorage,
    _.sessionStorage.isSupport = _.sessionStorage.isSupport,
    _.loadScript = _.loadScript,
    _.ry = _.ry,
    _.addEvent = _.addEvent,
    _.getEleInfo = _.getEleInfo,
    _.ajax = _.ajax;
    var campaign = {
        data: {
            campaign: {
                utm_source: "",
                utm_medium: "",
                utm_campaign: "",
                utm_content: "",
                utm_term: "",
                promotional_id: ""
            },
            isCampaign: !1,
            isAdClick: !1,
            campaignParamsSaved: !1,
            APPKEY: ""
        },
        init: function(a, b) {
            typeof a != "undefined" && (this.data.APPKEY = a,
            this.DATracker = b,
            this.checkCampaign(),
            this.checkAdClick(),
            this.setParams(),
            this.data.isCampaign && this.save())
        },
        campaignParams: function() {
            var a = "utm_source utm_medium utm_campaign utm_content utm_term promotional_id".split(" ")
              , b = ""
              , c = {};
            _.each(a, function(a) {
                b = _.getQueryParam(document.URL, a),
                b.length && (c[a] = b)
            });
            return c
        },
        setParams: function() {
            var a = {};
            if (this.data.isCampaign)
                a = this.campaignParams();
            else {
                var b = _.cookie.get("hb_" + this.data.APPKEY + "_u");
                b && (a = _.JSONDecode(b))
            }
            this.data.campaign = _.extend(this.data.campaign, a)
        },
        getParams: function() {
            this.setParams();
            return this.changeParams()
        },
        checkCampaign: function() {
            var a = this.campaignParams();
            typeof a.utm_source != "undefined" && typeof a.utm_medium != "undefined" && typeof a.utm_campaign != "undefined" && (this.data.isCampaign = !0)
        },
        checkAdClick: function() {
            var a = _.getQueryParam(document.URL, "t_rs");
            this.data.isCampaign && document.referrer && !a && (this.data.isAdClick = !0)
        },
        save: function() {
            this.data.campaignParamsSaved || (_.cookie.set("hb_" + this.data.APPKEY + "_u", _.JSONEncode(this.data.campaign), 30, this.DATracker.get_config("cross_subdomain_cookie")),
            this.data.campaignParamsSaved = !0)
        },
        changeParams: function() {
            var a = this.data.campaign
              , b = {
                utmSource: a.utm_source,
                utmMedium: a.utm_medium,
                promotionalID: a.promotional_id,
                utmCampaign: a.utm_campaign,
                utmContent: a.utm_content,
                utmTerm: a.utm_term
            };
            b.utmSource || delete b.utmSource,
            b.utmMedium || delete b.utmMedium,
            b.promotionalID || delete b.promotionalID,
            b.utmCampaign || delete b.utmCampaign,
            b.utmContent || delete b.utmContent,
            b.utmTerm || delete b.utmTerm;
            return b
        }
    }, single_page = {
        config: {
            mode: "hash",
            track_replace_state: !1,
            callback_fn: function() {}
        },
        init: function(a) {
            this.config = _.extend(this.config, a || {}),
            this.path = getPath(),
            this.event()
        },
        event: function() {
            var a = this;
            if (this.config.mode === "history") {
                if (!history.pushState || !window.addEventListener)
                    return;
                on(history, "pushState", _.bind(this.pushStateOverride, this)),
                on(history, "replaceState", _.bind(this.replaceStateOverride, this)),
                window.addEventListener("popstate", _.bind(this.handlePopState, this))
            } else
                this.config.mode === "hash" && _.register_hash_event(_.bind(this.handleHashState, this))
        },
        pushStateOverride: function() {
            this.handleUrlChange(!0)
        },
        replaceStateOverride: function() {
            this.handleUrlChange(!1)
        },
        handlePopState: function() {
            this.handleUrlChange(!0)
        },
        handleHashState: function() {
            this.handleUrlChange(!0)
        },
        handleUrlChange: function(a) {
            var b = this;
            setTimeout(function() {
                if (b.config.mode === "hash")
                    typeof b.config.callback_fn == "function" && b.config.callback_fn.call();
                else if (b.config.mode === "history") {
                    var c = b.path
                      , d = getPath();
                    c != d && b.shouldTrackUrlChange(d, c) && (b.path = d,
                    (a || b.config.track_replace_state) && typeof b.config.callback_fn == "function" && b.config.callback_fn.call())
                }
            }, 0)
        },
        shouldTrackUrlChange: function(a, b) {
            return !!a && !!b
        }
    }, source = {
        data: {
            secondLevelSource: "",
            outsideReferer: !1,
            APPKEY: ""
        },
        init: function(a) {
            typeof a != "undefined" && (this.data.APPKEY = a,
            this.checkReferer(),
            this.setParams(),
            this.save())
        },
        checkReferer: function() {
            document.referrer && _.get_host(document.referrer) != window.location.host && (this.data.outsideReferer = !0)
        },
        setParams: function() {
            var a = _.cookie.get("hb_" + this.data.APPKEY + "_source");
            a || (a = ""),
            this.data.outsideReferer && (a = _.get_host(document.referrer)),
            this.data.secondLevelSource = a
        },
        save: function() {
            this.data.outsideReferer && _.cookie.set("hb_" + this.data.APPKEY + "_source", this.data.secondLevelSource, 30, !0)
        },
        getParams: function() {
            return {
                secondLevelSource: this.data.secondLevelSource
            }
        }
    }, heatmap = {
        getDomIndex: function(a) {
            var b = [].indexOf;
            if (!a.parentNode)
                return -1;
            var c = a.parentNode.children;
            if (!c)
                return -1;
            var d = c.length;
            if (b)
                return b.call(c, a);
            for (var e = 0; e < d; ++e)
                if (a == c[e])
                    return e;
            return -1
        },
        selector: function(a) {
            var b = a.parentNode && 9 == a.parentNode.nodeType ? -1 : this.getDomIndex(a);
            return a.id ? "#" + a.id : a.tagName.toLowerCase() + (~b ? ":nth-child(" + (b + 1) + ")" : "")
        },
        getDomSelector: function(a, b) {
            if (!a || !a.parentNode || !a.parentNode.children)
                return !1;
            b = b && b.join ? b : [];
            var c = a.nodeName.toLowerCase();
            if (!a || c === "body" || 1 != a.nodeType) {
                b.unshift("body");
                return b.join(" > ")
            }
            b.unshift(this.selector(a));
            if (a.id)
                return b.join(" > ");
            return this.getDomSelector(a.parentNode, b)
        },
        na: function() {
            var a = document.documentElement.scrollLeft || window.pageXOffset;
            return parseInt(isNaN(a) ? 0 : a, 10)
        },
        i: function() {
            var a = 0;
            try {
                a = o.documentElement.scrollTop || m.pageYOffset,
                a = isNaN(a) ? 0 : a
            } catch (b) {
                a = 0
            }
            return parseInt(a, 10)
        },
        getBrowserWidth: function() {
            var a = window.innerWidth || document.body.clientWidth;
            return isNaN(a) ? 0 : parseInt(a, 10)
        },
        getBrowserHeight: function() {
            var a = window.innerHeight || document.body.clientHeight;
            return isNaN(a) ? 0 : parseInt(a, 10)
        },
        getScrollWidth: function() {
            var a = parseInt(document.body.scrollWidth, 10);
            return isNaN(a) ? 0 : a
        },
        W: function(a) {
            var b = parseInt(+a.clientX + +this.na(), 10)
              , a = parseInt(+a.clientY + +this.i(), 10);
            return {
                x: isNaN(b) ? 0 : b,
                y: isNaN(a) ? 0 : a
            }
        },
        start: function(a, b, c) {
            var d = this.DATracker.config.heatmap
              , e = !1;
            if (d && d.collect_element && !d.collect_element(b, this))
                return !1;
            d && d.set_collect_element_path && _.isFunction(d.set_collect_element_path) && (e = !0);
            var f;
            if (e) {
                f = d.set_collect_element_path(b, this);
                if (!f) {
                    console.error("\u65e0\u5143\u7d20path");
                    return !1
                }
            } else
                f = this.getDomSelector(b);
            var g = _.getEleInfo({
                target: b
            }, d, this), h;
            g.path = f ? f : "";
            if (d && d.custom_property) {
                var i = d.custom_property(b);
                _.isObject(i) && (g = _.extend(g, i))
            }
            if (c === "a" && d && d.isTrackLink === !0)
                h = _.sha1(g.path),
                this.trackLink({
                    event: a,
                    target: b
                }, h, g);
            else if (g.path)
                try {
                    h = _.sha1(g.path),
                    this.DATracker.track(h, g, undefined, "auto")
                } catch (j) {}
        },
        trackLink: function(a, b, c) {
            function f(a) {
                function g() {
                    f || (f = !0,
                    location.href = d.href)
                }
                a.stopPropagation(),
                a.preventDefault();
                var f = !1;
                setTimeout(g, 1e3),
                e.DATracker.track(b, c, g, "auto")
            }
            a = a || {};
            var d = null
              , e = this;
            a.ele && (d = a.ele),
            a.event && (a.target ? d = a.target : d = a.event.target),
            c = c || {};
            if (!d || typeof d != "object")
                return !1;
            if (!d.href || /^javascript/.test(d.href) || d.target || d.download || d.onclick) {
                e.DATracker.track(b, c, undefined, "auto");
                return !1
            }
            a.event && f(a.event)
        },
        hasElement: function(a) {
            var b = a._getPath();
            if (_.isArray(b) && b.length > 0)
                for (var c = 0; c < b.length; c++)
                    if (b[c] && b[c].tagName && b[c].tagName.toLowerCase() === "a")
                        return b[c];
            return !1
        },
        trackHeatmap: function(a) {
            if (typeof a == "object" && a.tagName) {
                var b = a.tagName.toLowerCase()
                  , c = a.parentNode.tagName.toLowerCase();
                b !== "button" && b !== "a" && c !== "a" && c !== "button" && b !== "input" && b !== "textarea" && this.start(null, a, b)
            }
        },
        initHeatmap: function() {
            var a = this
              , b = a.DATracker.config.heatmap;
            if (!_.isObject(b) || b.clickmap !== "default")
                return !1;
            if (_.isFunction(b.collect_url) && !b.collect_url())
                return !1;
            b.collect_elements === "all" ? b.collect_elements = "all" : b.collect_elements = "interact",
            b.collect_elements === "all" ? _.addEvent(document, "click", function(b) {
                var c = b || window.event;
                if (!c)
                    return !1;
                var d = c.target || c.srcElement;
                if (typeof d != "object")
                    return !1;
                if (typeof d.tagName != "string")
                    return !1;
                var e = d.tagName.toLowerCase();
                if (e.toLowerCase() === "body" || e.toLowerCase() === "html")
                    return !1;
                if (!d || !d.parentNode || !d.parentNode.children)
                    return !1;
                var f = d.parentNode.tagName.toLowerCase();
                f === "a" || f === "button" ? a.start(c, d.parentNode, d.parentNode.tagName.toLowerCase()) : a.start(c, d, e)
            }) : _.addEvent(document, "click", function(b) {
                var c = b || window.event;
                if (!c)
                    return !1;
                var d = c.target || c.srcElement;
                if (typeof d != "object")
                    return !1;
                if (typeof d.tagName != "string")
                    return !1;
                var e = d.tagName.toLowerCase();
                if (e.toLowerCase() === "body" || e.toLowerCase() === "html")
                    return !1;
                if (!d || !d.parentNode || !d.parentNode.children)
                    return !1;
                var f = d.parentNode;
                if (e === "a" || e === "button" || e === "input" || e === "textarea")
                    a.start(c, d, e);
                else if (f.tagName.toLowerCase() === "button" || f.tagName.toLowerCase() === "a")
                    a.start(c, f, d.parentNode.tagName.toLowerCase());
                else if (e === "area" && f.tagName.toLowerCase() === "map" && _.ry(f).prev().tagName && _.ry(f).prev().tagName.toLowerCase() === "img")
                    a.start(c, _.ry(f).prev(), _.ry(f).prev().tagName.toLowerCase());
                else {
                    var g = a.hasElement(b);
                    g && a.start(c, g, g.tagName.toLowerCase())
                }
            })
        },
        prepare: function(a) {
            function h(a) {
                d ? _.loadScript({
                    success: function() {
                        setTimeout(function() {
                            typeof hubble_jssdk_heatmap_render != "undefined" && hubble_jssdk_heatmap_render(c.DATracker, a, e)
                        }, g || 3e3)
                    },
                    error: function() {},
                    type: "js",
                    url: d + "?_=" + Math.random()
                }) : console.error("\u6ca1\u6709\u6307\u5b9aheatmap_url\u7684\u8def\u5f84")
            }
            var b = location.href.match(/hubble_heatmap_id=([^&#]+)/)
              , c = this
              , d = c.DATracker.config.heatmap_url
              , e = c.DATracker.config.heatmap_getdateUrl
              , f = c.DATracker.config.heatmap
              , g = 3e3;
            _.isObject(f) && (g = f.loadTimeout),
            b && b[0] && b[1] ? (c.DATracker.set_config({
                hubble_render_mode: !0
            }),
            _.sessionStorage.isSupport() && sessionStorage.setItem("hubble_heatmap_id", b[1]),
            h(b[1])) : _.sessionStorage.isSupport() && typeof sessionStorage.getItem("hubble_heatmap_id") == "string" ? (c.DATracker.set_config({
                hubble_render_mode: !0
            }),
            h(sessionStorage.getItem("hubble_heatmap_id"))) : (a(),
            _.isObject(f) && (c.initHeatmap(),
            c.DATracker.track_heatmap = _.bind(c.trackHeatmap, c)))
        },
        init: function(a, b) {
            !!a && !!b && (this.DATracker = a,
            this.DATracker.heatmap = this,
            this.DATracker.track_heatmap = function() {}
            ,
            this.prepare(b))
        }
    }, get8To24Md5 = function(a) {
        a = a.substring(8, 24);
        return a
    }, debug = {
        _queue: [],
        _callbackList: [],
        _loadControlComplete: !1,
        init: function(a) {
            if (!!a) {
                var b = this;
                b.DATracker = a;
                var c = b.DATracker.get_config("abtest") || {};
                b._control = null,
                b._isTestDebug() && (c.interval_mins_abtest = 0,
                b.DATracker.set_config({
                    abtest: c
                }),
                b._loadControlJs(),
                c.enable_abtest ? b._prepare(function() {
                    typeof hubbleData_render_mode_fn == "function" && (b._control = (new hubbleData_render_mode_fn(b.DATracker,{
                        type: "abtest_debug",
                        data: {
                            hubble_abtest_debug_key: b.getDebugKeyData()
                        }
                    })).control,
                    _.each(b._queue, function(a) {
                        b.debugTrack(a)
                    }),
                    b._queue = [])
                }) : b._prepare(function() {
                    typeof hubbleData_render_mode_fn == "function" && new hubbleData_render_mode_fn(b.DATracker,{
                        type: "abtest_debug_but_abtest_disable"
                    })
                }))
            }
        },
        _isTestDebug: function() {
            var a = location.href.match(/hubble_abtest_debug_key=([^&#]+)/)
              , b = !1;
            a && a[0] && a[1] ? (b = !0,
            _.sessionStorage.isSupport() && sessionStorage.setItem("hubble_abtest_debug_key", a[1])) : _.sessionStorage.isSupport() && typeof sessionStorage.getItem("hubble_abtest_debug_key") == "string" && sessionStorage.getItem("hubble_abtest_debug_key") && (b = !0);
            return b
        },
        _loadControlJs: function() {
            var a = this
              , b = a.DATracker.config.control_js_url;
            b ? _.loadScript({
                success: function() {
                    a._loadControlComplete = !0,
                    _.each(a._callbackList, function(b) {
                        b.call(a)
                    }),
                    a._callbackList = []
                },
                error: function() {},
                type: "js",
                url: b + "?_=" + Math.random()
            }) : console.error("\u6ca1\u6709\u6307\u5b9acontrol_js_url\u7684\u8def\u5f84")
        },
        _prepare: function(a) {
            this._loadControlComplete || a && this._callbackList.push(a),
            a && a.call(this)
        },
        getDebugKeyData: function() {
            var a = location.href.match(/hubble_abtest_debug_key=([^&#]+)/)
              , b = "";
            a && a[0] && a[1] ? b = a[1] : _.sessionStorage.isSupport() && typeof sessionStorage.getItem("hubble_abtest_debug_key") == "string" && (b = sessionStorage.getItem("hubble_abtest_debug_key"));
            return b
        },
        debugTrack: function(a) {
            try {
                this._control ? this._control.addEvent(a) : this._queue.push(a)
            } catch (b) {
                console.error(b)
            }
        },
        debugNoData: function() {
            var a = this;
            a._isTestDebug() && a._prepare(function() {
                typeof hubbleData_render_mode_fn == "function" && new hubbleData_render_mode_fn(a.DATracker,{
                    type: "abtest_debug_abtest_no_data"
                })
            })
        }
    }, multilinkAbest = {
        multilinkArr: [],
        isTestDebug: debug._isTestDebug,
        setMultilinkArr: function(a) {
            this.multilinkArr = a || []
        },
        jump: function(a, b) {
            a = a || this.getVariable();
            var c = this.getNowUrl()
              , d = !0
              , e = this.getNowProtocolDommainAndPath();
            a ? (a.type == 1 && (e === a.url || e + "/" === a.url) && (d = !1),
            a.url !== c && a.url !== c + "/" && d ? (this.isTestDebug() && (a.url += a.url.indexOf("?") > -1 ? "&" : "?",
            a.url = a.url + "hubble_abtest_debug_key=" + debug.getDebugKeyData()),
            window.location.href = a.url) : b && b()) : b && b()
        },
        getNowUrl: function() {
            var a = window.location.href, b;
            this.isTestDebug() && (a.indexOf("?hubble_abtest_debug_key=") > -1 ? b = a.match(/\?hubble_abtest_debug_key=([^&#]+)/) : a.indexOf("&hubble_abtest_debug_key=") > -1 && (b = a.match(/\&hubble_abtest_debug_key=([^&#]+)/)),
            b && b[0] && (a = a.replace(b[0], "")));
            return a
        },
        getNowProtocolDommainAndPath: function() {
            var a = "https:" == document.location.protocol ? "https://" : "http://"
              , b = a + _.info.referringDomain(window.location.href) + window.location.pathname;
            return b
        },
        getVariable: function() {
            var a = this.getNowProtocolDommainAndPath()
              , b = this.getNowUrl()
              , c = {
                variable: "",
                url: "",
                type: ""
            }
              , d = get8To24Md5(md5(a))
              , e = get8To24Md5(md5(a + "/"))
              , f = get8To24Md5(md5(b))
              , g = get8To24Md5(md5(b + "/"))
              , h = []
              , i = [];
            for (var j = 0; j < this.multilinkArr.length; j++) {
                var k = this.multilinkArr[j][0].replace(new RegExp("^\\$","g"), "");
                b !== a ? k === f || k === g ? h.push({
                    variable: this.multilinkArr[j][0],
                    url: this.multilinkArr[j][1],
                    type: 0,
                    key: k === f ? b : b + "/"
                }) : (k === d || k === e) && i.push({
                    variable: this.multilinkArr[j][0],
                    url: this.multilinkArr[j][1],
                    type: 1,
                    key: k === d ? a : a + "/"
                }) : (k === d || k === e) && i.push({
                    variable: this.multilinkArr[j][0],
                    url: this.multilinkArr[j][1],
                    type: 1,
                    key: k === d ? a : a + "/"
                })
            }
            h.length ? c = h[0] : i.length ? c = i[0] : c = null;
            return c
        }
    }, visualizationAbest = {
        _visualizationArr: [],
        _settimeNum: 0,
        _loadControlJs: function(a) {
            var b = this
              , c = b.DATracker.config.control_js_url;
            c ? _.loadScript({
                success: function() {
                    typeof a == "function" && a()
                },
                error: function() {},
                type: "js",
                url: c + "?_=" + Math.random()
            }) : console.error("\u6ca1\u6709\u6307\u5b9acontrol_js_url\u7684\u8def\u5f84")
        },
        isEditor: function() {
            var a = location.href.match(/hubble_abtest_editor_key=([^&#]+)/)
              , b = !1;
            a && a[0] && a[1] && (b = !0);
            return b
        },
        _querySelector: function(a, b) {
            try {
                return (b || document).querySelector(a)
            } catch (c) {
                return null
            }
        },
        _getNowUrl: function() {
            var a = window.location.href, b;
            this.isTestDebug() && (a.indexOf("?hubble_abtest_debug_key=") > -1 ? b = a.match(/\?hubble_abtest_debug_key=([^&#]+)/) : a.indexOf("&hubble_abtest_debug_key=") > -1 && (b = a.match(/\&hubble_abtest_debug_key=([^&#]+)/)),
            b && b[0] && (a = a.replace(b[0], "")));
            return a
        },
        _setType: function() {
            console.log(this._visualizationArr);
            try {
                for (var a = 0; a < this._visualizationArr.length; a += 1)
                    if (this._visualizationArr[a][1]) {
                        this._visualizationArr[a][1] = _.JSONDecode(this._visualizationArr[a][1]);
                        if (this._visualizationArr[a][1].pattern) {
                            try {
                                this._visualizationArr[a][1].pattern = _.JSONDecode(this._visualizationArr[a][1].pattern)
                            } catch (b) {
                                console.error(b)
                            }
                            this._visualizationArr[a][2] = 0
                        } else
                            this._visualizationArr[a][2] = 1
                    }
            } catch (b) {
                console.error(b)
            }
        },
        _filtrateElementItem: function(a, b) {
            var c = !0
              , d = a.nodeName;
            d !== b.nodeName.toLocaleUpperCase() && (c = !1);
            return c
        },
        _resetConfig: function(a) {
            var b = [];
            _.each(a, function(a, c) {
                var d = a.variations;
                _.each(d, function(a, c) {
                    b.push(a)
                })
            });
            return b
        },
        init: function(a, b) {
            if (!!a) {
                var c = this;
                c.DATracker = a,
                c.ABTEST = b;
                if (this.isEditor()) {
                    var d = c.DATracker.get_config("abtest") || {}
                      , e = function() {
                        if (typeof hubbleData_render_mode_fn == "function") {
                            d.enable_abtest ? new hubbleData_render_mode_fn(c.DATracker,{
                                type: "abtest_editor"
                            }) : new hubbleData_render_mode_fn(c.DATracker,{
                                type: "abtest_editor_but_abtest_disable"
                            });
                            try {
                                c.ABTEST._showPage()
                            } catch (a) {}
                        }
                    };
                    c._loadControlJs(e)
                }
            }
        },
        isTestDebug: debug._isTestDebug,
        setVisualizationArr: function(a) {
            this._visualizationArr = a || [],
            this._setType()
        },
        _hidePathStyleSet: function(a) {
            var b = "{opacity:0 !important;}"
              , c = "";
            _.each(a, function(a) {
                c += a.selector + b
            });
            var d = document.getElementById("_hb_abtesting_path_hides");
            if (d)
                d.styleSheet ? d.styleSheet.cssText = c : (d.innerText = "",
                d.appendChild(document.createTextNode(c)));
            else {
                var e = document.createElement("style")
                  , f = document.getElementsByTagName("head")[0];
                e.setAttribute("id", "_hb_abtesting_path_hides"),
                e.setAttribute("type", "text/css"),
                e.styleSheet ? e.styleSheet.cssText = c : (e.innerText = "",
                e.appendChild(document.createTextNode(c))),
                f.appendChild(e)
            }
        },
        render: function(a) {
            if (!!a) {
                var b = this;
                clearTimeout(b._settimeNum);
                var c = this._resetConfig(a)
                  , d = []
                  , e = function(a, b) {
                    _.each(b.css, function(b, c) {
                        a.style[c] = b
                    }),
                    _.each(b.attributes, function(b, c) {
                        a.setAttribute(c, b)
                    }),
                    _.each(b, function(b, c) {
                        _.include(["css", "attributes", "nodeName", "selector"], c) || (a[c] = b)
                    })
                };
                try {
                    for (var f = 0; f < c.length; f += 1)
                        if (c[f].selector) {
                            var g = this._querySelector(c[f].selector)
                              , h = c[f];
                            g ? this._filtrateElementItem(h, g) && e(g, h) : d.push(c[f])
                        }
                } catch (i) {
                    console.error(i)
                }
                var j = function() {
                    var a = 0
                      , c = [];
                    b._hidePathStyleSet(d);
                    for (var f = 0; f < d.length; f += 1) {
                        if (d[f].selector) {
                            var g = b._querySelector(d[f].selector)
                              , h = d[f];
                            g ? b._filtrateElementItem(h, g) && e(g, h) : c.push(d[f])
                        }
                        a++
                    }
                    d = c,
                    a > 0 ? b._settimeNum = setTimeout(function() {
                        j()
                    }, 0) : clearTimeout(b._settimeNum),
                    b._hidePathStyleSet(d)
                };
                j()
            }
        },
        getVariables: function() {
            var that = this
              , nowVisualizationVariableArr = []
              , checkSingPagePartIn = function(a) {
                var b = !1;
                if (!a)
                    return b;
                var c = that._getNowUrl()
                  , d = get8To24Md5(md5(c + "/"))
                  , e = get8To24Md5(md5(c))
                  , f = a[0].replace(new RegExp("^\\%","g"), "");
                if (f === e || f === d)
                    b = !0;
                return b
            }
              , checkNotSingPagePartIn = function(notSingPageTest) {
                var bool = !1;
                if (!notSingPageTest)
                    return bool;
                var pattern = notSingPageTest[1].pattern;
                if (pattern) {
                    var conditions = pattern.conditions;
                    if (pattern.relation === "OR" || pattern.relation === "")
                        for (var i = 0; i < conditions.length; i += 1) {
                            var condition = conditions[i] || {}
                              , field = condition.field
                              , func = condition.func
                              , params = condition.params
                              , nowUrl = that._getNowUrl();
                            if (field === "URL") {
                                if (func === "EQUAL")
                                    if (_.include(params, nowUrl) || _.include(params, nowUrl + "/")) {
                                        bool = !0;
                                        break
                                    }
                                if (func === "CONTAIN")
                                    if (nowUrl.indexOf(params[0]) > -1 || (nowUrl + "/").indexOf(params[0]) > -1) {
                                        bool = !0;
                                        break
                                    }
                                if (func === "REG_MATCH")
                                    try {
                                        var eval2 = eval
                                          , reg = eval2(params[0]);
                                        if (reg.test(nowUrl) || reg.test(nowUrl + "/")) {
                                            bool = !0;
                                            break
                                        }
                                    } catch (error) {
                                        console.error(error)
                                    }
                            }
                        }
                }
                return bool
            };
            for (var k = 0; k < that._visualizationArr.length; k += 1) {
                var type = that._visualizationArr[k][2]
                  , bool = !1;
                type === 1 ? bool = checkSingPagePartIn(that._visualizationArr[k]) : type === 0 && (bool = checkNotSingPagePartIn(that._visualizationArr[k])),
                bool && that._visualizationArr[k][1] && nowVisualizationVariableArr.push({
                    variations: that._visualizationArr[k][1].variations,
                    type: 2,
                    variable: that._visualizationArr[k][0]
                })
            }
            return nowVisualizationVariableArr
        }
    }, abtest = {
        data: {
            experiments: [],
            variables: {}
        },
        abtest_config: {
            enable_abtest: !1,
            interval_mins_abtest: 60,
            default_variables: {},
            url: "",
            multilinkTimeOutMs: 300,
            timeoutMs: 500,
            hasCacheRender: !1
        },
        _default_variables: {},
        _getVariableInfoComplete: !1,
        _queue: [],
        _showPage: function() {
            typeof DATrackerABTestingLeadCode != "undefined" && DATrackerABTestingLeadCode && DATrackerABTestingLeadCode.showPage && DATrackerABTestingLeadCode.showPage()
        },
        init: function(a) {
            if (!a)
                return null;
            this.DATracker = a,
            debug.init(this.DATracker),
            visualizationAbest.init(this.DATracker, this),
            this.localStorageName = "hb_" + this.DATracker.get_config("token") + "_abtest";
            var b = visualizationAbest.isEditor()
              , c = this
              , d = function() {
                try {
                    var a = c.DATracker.get_config("abtest") || {};
                    c._default_variables = a.default_variables || {},
                    c.abtest_config = _.deepMerge(c.abtest_config, a);
                    if (c.abtest_config.enable_abtest) {
                        c.data.variables = c.abtest_config.default_variables;
                        if (!b)
                            if (c._checkUpdateTime())
                                c.async_get_variable();
                            else {
                                var d = c._getLocalStorageData();
                                c.data = d.data,
                                c._getVariableInfoComplete = !0,
                                c._dataClass()
                            }
                        else
                            c._getVariableInfoComplete = !0
                    }
                } catch (e) {
                    b ? (c._getVariableInfoComplete = !0,
                    c._showPage()) : c.async_get_variable()
                }
            };
            d(),
            _.innerEvent.on("singlePage:change", function() {
                d()
            })
        },
        debugTrack: function(a) {
            debug.debugTrack(a)
        },
        _dataClass: function() {
            if (!this._getVariableInfoComplete)
                return !1;
            var a = this
              , b = a.data.variables
              , c = []
              , d = [];
            for (var e in b)
                b.hasOwnProperty(e) && (a._getExperimentType(e) === 3 && c.push([e, b[e]]),
                a._getExperimentType(e) === 2 && d.push([e, b[e]]));
            multilinkAbest.setMultilinkArr(c),
            visualizationAbest.setVisualizationArr(d);
            var f = multilinkAbest.getVariable()
              , g = visualizationAbest.getVariables();
            if (f) {
                var h = function() {
                    a.get_variation(function(b) {
                        try {
                            var c = function() {
                                multilinkAbest.jump(f, a._showPage)
                            };
                            setTimeout(c, b.abtest_config.multilinkTimeOutMs),
                            b.get(f.variable, window.location.href, c, {
                                variableObj: f
                            })
                        } catch (d) {
                            a._showPage(),
                            console.error(d)
                        }
                    })
                };
                h()
            } else {
                if (g.length) {
                    var i = function() {
                        a.get_variation(function(a) {
                            try {
                                visualizationAbest.render(g);
                                for (var b = 0; b < g.length; b += 1) {
                                    var c = g[b];
                                    a.get(c.variable, {}, function() {}, {
                                        variableObj: c
                                    })
                                }
                            } catch (d) {
                                console.error(d)
                            }
                        })
                    };
                    i()
                }
                a._showPage()
            }
        },
        isTestDebug: function() {
            return debug._isTestDebug()
        },
        isEditor: function() {
            return visualizationAbest.isEditor()
        },
        getDebugKeyData: function() {
            return debug.getDebugKeyData()
        },
        _saveLocal: function() {
            var a = {
                data: this.data
            };
            try {
                this.abtest_config.interval_mins_abtest && _.localStorage.set(this.localStorageName, JSON.stringify(a))
            } catch (b) {}
        },
        _getLocalStorageData: function() {
            var a;
            try {
                a = JSON.parse(_.localStorage.get(this.localStorageName))
            } catch (b) {
                a = null
            }
            return a
        },
        _checkUpdateTime: function() {
            var a = !0;
            try {
                var b = this.abtest_config.interval_mins_abtest
                  , c = this._getLocalStorageData()
                  , d = c.data.updatedTime / 1e3
                  , e = 1 * (new Date).getTime() / 1e3;
                e <= d + 60 * b && (a = !1)
            } catch (f) {
                a = !0
            }
            return a
        },
        _getExperimentType: function(a) {
            var b = 1;
            try {
                a.indexOf("$") === 0 && (b = 3),
                a.indexOf("%") === 0 && (b = 2)
            } catch (c) {
                console.error(c)
            }
            return b
        },
        _variableToFindExperiment: function(a) {
            var b = {
                $experimentId: [],
                $versionId: [],
                $experimentType: this._getExperimentType(a)
            }, c;
            for (var d = 0; d < this.data.experiments.length; d++) {
                var e = this.data.experiments[d].experimentId
                  , f = this.data.experiments[d].versionId
                  , g = this.data.experiments[d].variables;
                _.include(g, a) && (_.include(b.$experimentId, e) || b.$experimentId.push(e),
                _.include(b.$versionId, f) || b.$versionId.push(f))
            }
            b.$experimentId = b.$experimentId.join(","),
            b.$versionId = b.$versionId.join(","),
            b.$experimentType === 3 ? (c = multilinkAbest.getVariable(),
            c && (b.$source = c.key,
            b.$target = c.url)) : b.$experimentType !== 2 && (b[a] = this.data.variables[a]);
            return b
        },
        _track_abtest: function(a, b) {
            !a || this.DATracker.track("da_abtest", a, b || function() {}
            )
        },
        _getUserId: function() {
            var a = this.DATracker.get_user_id() || this.DATracker.get_distinct_id();
            this.isTestDebug() && (a = this.getDebugKeyData());
            return a
        },
        get: function(a, b, c, d) {
            try {
                if (typeof this.data.variables[a] != "undefined") {
                    var e = this._variableToFindExperiment(a) || {};
                    e.$experimentId && e.$versionId && e.$experimentType ? this._track_abtest(e, c) : typeof c == "function" && c();
                    return this.data.variables[a]
                }
                return b
            } catch (f) {
                return b
            }
        },
        get_variation: function(a) {
            if (!this._getVariableInfoComplete)
                return this._queue.push(arguments),
                !1;
            typeof a == "function" && a(this)
        },
        async_get_variable: function() {
            if (this.isEditor())
                this._getVariableInfoComplete = !0;
            else
                try {
                    var a = this.abtest_config
                      , b = a.enable_abtest;
                    if (b) {
                        var c = this
                          , d = c._getUserId()
                          , e = c.DATracker.get_config("token")
                          , f = function(a) {
                            this._getVariableInfoComplete = !0;
                            if (!a.error) {
                                if (a.code === 200) {
                                    var b = _.JSONDecode(_.JSONEncode(this._default_variables));
                                    this.data.experiments = a.data.experiments,
                                    this.data.variables = _.deepMerge(b, a.data.variables),
                                    this.data.updatedTime = (new Date).getTime(),
                                    this._saveLocal(),
                                    this._dataClass(),
                                    this.isTestDebug() && (a.data.experiments.length || debug.debugNoData())
                                }
                            } else
                                this.isTestDebug() && debug.debugNoData();
                            this._queue.length && (_.each(c._queue, function(a) {
                                c.get_variation.apply(c, Array.prototype.slice.call(a))
                            }),
                            c._queue = [])
                        };
                        c._getVariableInfoComplete = !1;
                        var g = c.DATracker.get_config("api_host") + "/cc/a_exp"
                          , h = 500;
                        try {
                            h = c.abtest_config.timeoutMs
                        } catch (i) {
                            h = 500
                        }
                        a.url && (g = a.url);
                        var j = _.extend({}, _.info.properties(), c.DATracker.persistence.properties());
                        _.ajax.post(g, {
                            userId: d,
                            appKey: e,
                            property: {
                                deviceOs: j.deviceOs,
                                deviceOsVersion: j.deviceOsVersion,
                                screenWidth: j.screen_width,
                                screenHeight: j.screen_height,
                                devicePlatform: j.hb_lib,
                                pageOpenScene: c.DATracker.pageOpenScene
                            }
                        }, _.bind(f, c), h)
                    }
                } catch (i) {}
        },
        is_abtest_debug: debug._isTestDebug,
        get_hubble_abtest_debug_key_str: function() {
            var a = "";
            debug._isTestDebug() && (a = "hubble_abtest_debug_key=" + debug.getDebugKeyData());
            return a
        },
        hasLocalCache: function() {
            return !this._checkUpdateTime()
        }
    }, init_type, DATracker_master, INIT_MODULE = 0, INIT_SNIPPET = 1, INIT_SYNC = 2, SDKTYPE = "js", PRIMARY_INSTANCE_NAME = "DATracker", SET_QUEUE_KEY = "__mps", SET_ONCE_QUEUE_KEY = "__mpso", ADD_QUEUE_KEY = "__mpa", APPEND_QUEUE_KEY = "__mpap", UNION_QUEUE_KEY = "__mpu", SET_ACTION = "attributes", SET_ONCE_ACTION = "attributes", ADD_ACTION = "attributes", APPEND_ACTION = "attributes", UNION_ACTION = "$union", PEOPLE_DISTINCT_ID_KEY = "$people_distinct_id", EVENT_TIMERS_KEY = "costTime", RESERVED_PROPERTIES = [SET_QUEUE_KEY, SET_ONCE_QUEUE_KEY, ADD_QUEUE_KEY, APPEND_QUEUE_KEY, UNION_QUEUE_KEY, PEOPLE_DISTINCT_ID_KEY, EVENT_TIMERS_KEY], USE_XHR = window.XMLHttpRequest && "withCredentials"in new XMLHttpRequest, ENQUEUE_REQUESTS = !USE_XHR && userAgent.indexOf("MSIE") === -1 && userAgent.indexOf("Mozilla") === -1, DEFAULT_CONFIG = {
        api_host: "https://hubble.netease.com",
        app_host: "https://hubble.netease.com",
        autotrack: !1,
        cdn: "https://hubble.netease.com",
        cross_subdomain_cookie: !0,
        persistence: "cookie",
        persistence_name: "",
        cookie_name: "",
        loaded: function() {},
        store_google: !0,
        test: !1,
        verbose: !1,
        img: !1,
        track_pageview: !0,
        debug: !1,
        track_links_timeout: 300,
        cookie_expiration: 730,
        upgrade: !1,
        disable_persistence: !1,
        disable_cookie: !1,
        secure_cookie: !1,
        ip: !0,
        property_blacklist: [],
        session_interval_mins: 30,
        is_single_page: !1,
        single_page_config: {
            mode: "hash",
            track_replace_state: !1
        },
        pageview: !0,
        use_app_track: !1,
        hubble_render_mode: !1,
        heatmap_url: "https://hubble.netease.com/track/w/heatmap/heatmap.js",
        heatmap_getdateUrl: "https://hubble.netease.com/hwi/heatmap/query",
        send_error: !1,
        control_js_url: "https://hubble.netease.com/track/w/control/control.js",
        visualization_editor_js_url: "https://hubble.netease.com/track/w/visualization/visualization.js",
        truncateLength: -1
    }, DATATYPE = "e", DEFAULTEVENTID = {
        da_session_start: {
            dataType: "ie"
        },
        da_session_close: {
            dataType: "ie"
        },
        da_u_login: {
            dataType: "ie"
        },
        da_u_logout: {
            dataType: "ie"
        },
        da_u_signup: {
            dataType: "ie"
        },
        da_user_profile: {
            dataType: "ie"
        },
        da_screen: {
            dataType: "pv"
        },
        da_ad_click: {
            dataType: "ie"
        },
        da_activate: {
            dataType: "ie"
        },
        da_abtest: {
            dataType: "ie"
        },
        da_send_error: {
            dataType: "ie"
        }
    }, DOM_LOADED = !1, DomTracker = function() {};
    DomTracker.prototype.create_properties = function() {}
    ,
    DomTracker.prototype.event_handler = function() {}
    ,
    DomTracker.prototype.after_track_handler = function() {}
    ,
    DomTracker.prototype.init = function(a) {
        this.mp = a;
        return this
    }
    ,
    DomTracker.prototype.track = function(a, b, c, d) {
        var e = this
          , f = _.dom_query(a);
        if (f.length === 0)
            console.error("The DOM query (" + a + ") returned 0 elements");
        else {
            _.each(f, function(a) {
                _.register_event(a, this.override_event, function(a) {
                    var f = {}
                      , g = e.create_properties(c, this)
                      , h = e.mp.get_config("track_links_timeout");
                    e.event_handler(a, this, f),
                    window.setTimeout(e.track_callback(d, g, f, !0), h),
                    e.mp.track(b, g, e.track_callback(d, g, f))
                })
            }, this);
            return !0
        }
    }
    ,
    DomTracker.prototype.track_callback = function(a, b, c, d) {
        d = d || !1;
        var e = this;
        return function() {
            if (!c.callback_fired) {
                c.callback_fired = !0;
                if (a && a(d, b) === !1)
                    return;
                e.after_track_handler(b, c, d)
            }
        }
    }
    ,
    DomTracker.prototype.create_properties = function(a, b) {
        var c;
        typeof a == "function" ? c = a(b) : c = _.extend({}, a);
        return c
    }
    ;
    var LinkTracker = function() {
        this.override_event = "click"
    };
    _.inherit(LinkTracker, DomTracker),
    LinkTracker.prototype.create_properties = function(a, b) {
        var c = LinkTracker.superclass.create_properties.apply(this, arguments);
        b.href && (c.url = b.href);
        return c
    }
    ,
    LinkTracker.prototype.event_handler = function(a, b, c) {
        c.new_tab = a.which === 2 || a.metaKey || a.ctrlKey || b.target === "_blank",
        c.href = b.href,
        c.new_tab || a.preventDefault()
    }
    ,
    LinkTracker.prototype.after_track_handler = function(a, b) {
        b.new_tab || setTimeout(function() {
            window.location = b.href
        }, 0)
    }
    ;
    var DATrackerPersistence = function(a) {
        this.props = {},
        a.persistence_name ? this.name = "mp_" + a.persistence_name : this.name = "mp_" + a.token + "_hubble";
        var b = a.persistence;
        b !== "cookie" && b !== "localStorage" && (console.critical("Unknown persistence type " + b + "; falling back to cookie"),
        b = a.persistence = "cookie");
        var c = function() {
            var a = !0;
            try {
                var b = "__hbssupport__"
                  , c = "xyz";
                _.localStorage.set(b, c),
                _.localStorage.get(b) !== c && (a = !1),
                _.localStorage.remove(b)
            } catch (d) {
                a = !1
            }
            a || console.error("localStorage unsupported; falling back to cookie store");
            return a
        };
        b === "localStorage" && c() ? this.storage = _.localStorage : this.storage = _.cookie,
        this.load(),
        this.update_config(a),
        this.upgrade(a),
        this.save()
    };
    DATrackerPersistence.prototype.properties = function() {
        var a = {};
        _.each(this.props, function(b, c) {
            _.include(RESERVED_PROPERTIES, c) || (a[c] = b)
        });
        return a
    }
    ,
    DATrackerPersistence.prototype.load = function() {
        if (!this.disabled) {
            var a = this.storage.parse(this.name);
            a && (this.props = _.extend({}, a))
        }
    }
    ,
    DATrackerPersistence.prototype.upgrade = function(a) {
        var b = a.upgrade, c, d;
        b && (c = "mp_super_properties",
        typeof b == "string" && (c = b),
        d = this.storage.parse(c),
        this.storage.remove(c),
        this.storage.remove(c, !0),
        d && (this.props = _.extend(this.props, d.all, d.events))),
        !a.cookie_name && a.name !== "DATracker" && (c = "mp_" + a.token + "_" + a.name,
        d = this.storage.parse(c),
        d && (this.storage.remove(c),
        this.storage.remove(c, !0),
        this.register_once(d))),
        this.storage === _.localStorage && (d = _.cookie.parse(this.name),
        _.cookie.remove(this.name),
        _.cookie.remove(this.name, !0),
        d && this.register_once(d))
    }
    ,
    DATrackerPersistence.prototype.save = function() {
        this.disabled || this.storage.set(this.name, _.JSONEncode(this.props), this.expire_days, this.cross_subdomain, this.secure)
    }
    ,
    DATrackerPersistence.prototype.remove = function() {
        this.storage.remove(this.name, !1),
        this.storage.remove(this.name, !0)
    }
    ,
    DATrackerPersistence.prototype.clear = function() {
        this.remove(),
        this.props = {}
    }
    ,
    DATrackerPersistence.prototype.register_once = function(a, b, c) {
        if (_.isObject(a)) {
            typeof b == "undefined" && (b = "None"),
            this.expire_days = typeof c == "undefined" ? this.default_expiry : c,
            _.each(a, function(a, c) {
                if (!this.props[c] || this.props[c] === b)
                    this.props[c] = a
            }, this),
            this.save();
            return !0
        }
        return !1
    }
    ,
    DATrackerPersistence.prototype.register = function(a, b) {
        if (_.isObject(a)) {
            this.expire_days = typeof b == "undefined" ? this.default_expiry : b,
            _.extend(this.props, a),
            this.save();
            return !0
        }
        return !1
    }
    ,
    DATrackerPersistence.prototype.unregister = function(a) {
        a in this.props && (delete this.props[a],
        this.save())
    }
    ,
    DATrackerPersistence.prototype.safe_merge = function(a) {
        _.each(this.props, function(b, c) {
            c in a || (a[c] = b)
        });
        return a
    }
    ,
    DATrackerPersistence.prototype.update_config = function(a) {
        this.default_expiry = this.expire_days = a.cookie_expiration,
        this.set_disabled(a.disable_persistence),
        this.set_cross_subdomain(a.cross_subdomain_cookie),
        this.set_secure(a.secure_cookie)
    }
    ,
    DATrackerPersistence.prototype.set_disabled = function(a) {
        this.disabled = a,
        this.disabled && this.remove()
    }
    ,
    DATrackerPersistence.prototype.set_cross_subdomain = function(a) {
        a !== this.cross_subdomain && (this.cross_subdomain = a,
        this.remove(),
        this.save())
    }
    ,
    DATrackerPersistence.prototype.get_cross_subdomain = function() {
        return this.cross_subdomain
    }
    ,
    DATrackerPersistence.prototype.set_secure = function(a) {
        a !== this.secure && (this.secure = a ? !0 : !1,
        this.remove(),
        this.save())
    }
    ,
    DATrackerPersistence.prototype._add_to_people_queue = function(a, b) {
        var c = this._get_queue_key(a)
          , d = b[a]
          , e = this._get_or_create_queue(SET_ACTION)
          , f = this._get_or_create_queue(SET_ONCE_ACTION)
          , g = this._get_or_create_queue(ADD_ACTION)
          , h = this._get_or_create_queue(UNION_ACTION)
          , i = this._get_or_create_queue(APPEND_ACTION, []);
        c === SET_QUEUE_KEY ? (_.extend(e, d),
        this._pop_from_people_queue(ADD_ACTION, d),
        this._pop_from_people_queue(UNION_ACTION, d)) : c === SET_ONCE_QUEUE_KEY ? _.each(d, function(a, b) {
            b in f || (f[b] = a)
        }) : c === ADD_QUEUE_KEY ? _.each(d, function(a, b) {
            b in e ? e[b] += a : (b in g || (g[b] = 0),
            g[b] += a)
        }, this) : c === UNION_QUEUE_KEY ? _.each(d, function(a, b) {
            _.isArray(a) && (b in h || (h[b] = []),
            h[b] = h[b].concat(a))
        }) : c === APPEND_QUEUE_KEY && i.push(d),
        console.log("\u6253\u5370\u6570\u636e:"),
        console.log(b),
        this.save()
    }
    ,
    DATrackerPersistence.prototype._pop_from_people_queue = function(a, b) {
        var c = this._get_queue(a);
        _.isUndefined(c) || (_.each(b, function(a, b) {
            delete c[b]
        }, this),
        this.save())
    }
    ,
    DATrackerPersistence.prototype._get_queue_key = function(a) {
        if (a === SET_ACTION)
            return SET_QUEUE_KEY;
        if (a === SET_ONCE_ACTION)
            return SET_ONCE_QUEUE_KEY;
        if (a === ADD_ACTION)
            return ADD_QUEUE_KEY;
        if (a === APPEND_ACTION)
            return APPEND_QUEUE_KEY;
        if (a === UNION_ACTION)
            return UNION_QUEUE_KEY;
        console.error("Invalid queue:", a)
    }
    ,
    DATrackerPersistence.prototype._get_queue = function(a) {
        return this.props[this._get_queue_key(a)]
    }
    ,
    DATrackerPersistence.prototype._get_or_create_queue = function(a, b) {
        var c = this._get_queue_key(a);
        b = _.isUndefined(b) ? {} : b;
        return this.props[c] || (this.props[c] = b)
    }
    ,
    DATrackerPersistence.prototype.set_event_timer = function(a, b) {
        var c = this.props[EVENT_TIMERS_KEY] || {};
        c[a] = b,
        this.props[EVENT_TIMERS_KEY] = c,
        this.save()
    }
    ,
    DATrackerPersistence.prototype.remove_event_timer = function(a) {
        var b = this.props[EVENT_TIMERS_KEY] || {}
          , c = b[a];
        _.isUndefined(c) || (delete this.props[EVENT_TIMERS_KEY][a],
        this.save());
        return c
    }
    ;
    var DATrackerLib = function() {}
      , DATrackerPeople = function() {}
      , DATrackerABtest = abtest
      , create_DAlib = function(a, b, c) {
        var d, e = c === PRIMARY_INSTANCE_NAME ? DATracker_master : DATracker_master[c];
        if (e && init_type === INIT_MODULE || e && init_type === INIT_SYNC)
            d = e;
        else {
            if (e && !_.isArray(e)) {
                console.error("You have already initialized " + c);
                return
            }
            d = new DATrackerLib
        }
        d._init(a, b, c),
        d.people = new DATrackerPeople,
        d.people._init(d),
        d.abtest = DATrackerABtest,
        d.abtest.init(d),
        Config.DEBUG = Config.DEBUG || d.get_config("debug"),
        d.__autotrack_enabled = d.get_config("autotrack"),
        !_.isUndefined(e) && _.isArray(e) && (d._execute_array.call(d.people, e.people),
        d._execute_array(e),
        d._execute_array.call(d.abtest, e.abtest));
        return d
    };
    DATrackerLib.prototype.init = function(a, b, c) {
        if (_.isUndefined(c))
            console.error("You must name your new library: init(token, config, name)");
        else {
            if (c === PRIMARY_INSTANCE_NAME) {
                console.error("You must initialize the main DATracker object right after you include the DATracker js snippet");
                return
            }
            var d = create_DAlib(a, b, c);
            DATracker_master[c] = d,
            d._loaded();
            return d
        }
    }
    ,
    DATrackerLib.prototype._init = function(a, b, c) {
        var d = this;
        d.__loaded = !0,
        d.config = {},
        typeof b != "undefined" && typeof b.single_page_config != "undefined" && typeof b.single_page_config.track_replace_state == "undefined" && (b.single_page_config.track_replace_state = DEFAULT_CONFIG.single_page_config.track_replace_state),
        d.pageOpenScene = "Browser",
        d.set_config(_.extend({}, DEFAULT_CONFIG, b, {
            name: c,
            token: a,
            callback_fn: (c === PRIMARY_INSTANCE_NAME ? c : PRIMARY_INSTANCE_NAME + "." + c) + "._jsc"
        })),
        source.init(a),
        campaign.init(a, this),
        d._jsc = function() {}
        ,
        d.__dom_loaded_queue = [],
        d.__request_queue = [],
        d.__disabled_events = [],
        d._flags = {
            disable_all_events: !1
        },
        d.persistence = d.cookie = new DATrackerPersistence(d.config),
        d.cookie.register({
            sessionReferrer: document.referrer
        }),
        d.cookie.register_once({
            updatedTime: 0,
            sessionStartTime: 0
        }),
        d.cookie.register_once({
            sendNumClass: {
                allNum: 0,
                errSendNum: 0
            }
        });
        var e = d.get_config("heatmap");
        _.isObject(e) && (e.clickmap = e.clickmap || "default");
        var f = app_js_bridge(d);
        d.get_appStatus = function(a) {
            var b = function(b) {
                try {
                    typeof a == "function" && a(b)
                } catch (c) {}
            };
            f.getAppStatus(b)
        }
        ,
        d._get_SendCall = function(a, b, c, e) {
            if (d.get_config("hubble_render_mode"))
                return !1;
            f.getSendCall(a, b, c, e)
        }
        ,
        heatmap.init(d, function() {
            DATrackerABtest.isTestDebug() || DATrackerABtest.isEditor() ? d.set_config({
                hubble_render_mode: !0
            }) : d.set_config({
                hubble_render_mode: !1
            }),
            d._loaded(),
            d._send_da_activate(),
            campaign.data.isAdClick && d._ad_click(),
            d.get_config("is_single_page") && (d.cookie.register({
                currentReferrer: location.href
            }),
            d._single_page()),
            d.get_config("track_pageview") ? d.track_pageview() : d._session()
        })
    }
    ,
    DATrackerLib.prototype._sendNativeCall = function(a, b, c, d) {
        this.get_config("use_app_track") && typeof this._get_SendCall == "function" && this._get_SendCall(a, b, c, d)
    }
    ,
    DATrackerLib.prototype._ad_click = function() {
        var a = this.track("da_ad_click");
        return a
    }
    ,
    DATrackerLib.prototype._session = function(a) {
        var b = 1 * this.cookie.props.sessionStartTime / 1e3
          , c = 1 * this.cookie.props.updatedTime / 1e3
          , d = this.cookie.props.sessionUuid
          , e = (new Date).getTime()
          , f = 1 * e / 1e3
          , g = !this._check_referer();
        if (b == 0 || f > c + 60 * this.config.session_interval_mins || g)
            b == 0 ? (this.cookie.register({
                sessionUuid: _.UUID(),
                sessionStartTime: (new Date).getTime()
            }),
            this._track_da_session_start()) : (this._track_da_session_close(),
            this.cookie.register({
                sessionUuid: _.UUID(),
                sessionStartTime: (new Date).getTime()
            }),
            this._track_da_session_start());
        this.cookie.register({
            updatedTime: e
        }),
        typeof a == "function" && a()
    }
    ,
    DATrackerLib.prototype._track_da_session_start = function(a) {
        var b = this.track("da_session_start");
        return b
    }
    ,
    DATrackerLib.prototype._track_da_session_close = function(a) {
        var b = (new Date).getTime() - 1
          , c = this.cookie.props.sessionStartTime;
        this.cookie.props.LASTEVENT && this.cookie.props.LASTEVENT.time && (b = this.cookie.props.LASTEVENT.time + 1);
        var d = b
          , e = d - c
          , f = this.track("da_session_close", {
            sessionCloseTime: d,
            sessionTotalLength: e
        });
        return f
    }
    ,
    DATrackerLib.prototype._check_referer = function() {
        var a = this.cookie.props.sessionReferrer
          , b = !0;
        a ? _.get_host(a) != window.location.host && (b = !1) : b = !0;
        return b
    }
    ,
    DATrackerLib.prototype._single_page = function() {
        var a = this
          , b = location.href
          , c = function() {}
          , d = function() {
            _.innerEvent.trigger("singlePage:change")
        };
        this.get_config("single_page_config").mode === "hash" ? c = function() {
            a.cookie.register({
                sessionReferrer: b
            }),
            a._single_pageview(),
            b = location.href,
            d()
        }
        : this.get_config("single_page_config").mode === "history" && (c = function() {
            a._single_pageview(),
            d()
        }
        ),
        single_page.init({
            mode: this.get_config("single_page_config").mode,
            callback_fn: c,
            track_replace_state: this.get_config("single_page_config").track_replace_state
        })
    }
    ,
    DATrackerLib.prototype._loaded = function() {
        this.get_config("loaded")(this)
    }
    ,
    DATrackerLib.prototype._dom_loaded = function() {
        _.each(this.__dom_loaded_queue, function(a) {
            this._track_dom.apply(this, a)
        }, this),
        _.each(this.__request_queue, function(a) {
            this._send_request.apply(this, a)
        }, this),
        delete this.__dom_loaded_queue,
        delete this.__request_queue
    }
    ,
    DATrackerLib.prototype._track_dom = function(a, b) {
        if (this.get_config("img")) {
            console.error("You can't use DOM tracking functions with img = true.");
            return !1
        }
        if (!DOM_LOADED) {
            this.__dom_loaded_queue.push([a, b]);
            return !1
        }
        var c = (new a).init(this);
        return c.track.apply(c, b)
    }
    ,
    DATrackerLib.prototype._prepare_callback = function(a, b) {
        if (_.isUndefined(a))
            return null;
        if (USE_XHR) {
            var c = function(c) {
                a(c, b)
            };
            return c
        }
        var d = this._jsc
          , e = "" + Math.floor(Math.random() * 1e8)
          , f = this.get_config("callback_fn") + "[" + e + "]";
        d[e] = function(c) {
            delete d[e],
            a(c, b)
        }
        ;
        return f
    }
    ,
    DATrackerLib.prototype._send_request = function(a, b, c, d, e) {
        if (ENQUEUE_REQUESTS)
            this.__request_queue.push(arguments);
        else {
            var f = this.get_config("verbose");
            b.verbose && (f = !0),
            this.get_config("test") && (b.test = 1),
            f && (b.verbose = 1),
            this.get_config("img") && (b.img = 1,
            a += "da.gif");
            if (!USE_XHR)
                if (c)
                    b.callback = c;
                else if (f || this.get_config("test"))
                    b.callback = "(function(){})";
            b._ = (new Date).getTime().toString(),
            a += "?" + _.HTTPBuildQuery(b);
            if ("img"in b) {
                var g = document.createElement("img");
                g.src = a,
                g.width = 1,
                g.height = 1,
                typeof c == "function" && c(0),
                g.onload = function() {
                    this.onload = null
                }
                ,
                g.onerror = function() {
                    this.onerror = null
                }
                ,
                g.onabort = function() {
                    this.onabort = null
                }
            } else if (USE_XHR)
                try {
                    var h = new XMLHttpRequest;
                    h.open("GET", a, !0),
                    h.withCredentials = !1,
                    h.onreadystatechange = function() {
                        if (h.readyState === 4) {
                            e && e();
                            if (h.status === 200)
                                c && (f ? c(_.JSONDecode(h.responseText)) : c(Number(h.responseText)));
                            else {
                                var a = "Bad HTTP status: " + h.status + " " + h.statusText;
                                console.error(a),
                                c && (f ? c({
                                    status: 0,
                                    error: a
                                }) : c(0)),
                                d && d({
                                    state: h.status,
                                    statusText: h.statusText
                                })
                            }
                        }
                    }
                    ,
                    h.send(null)
                } catch (i) {
                    console.error(i),
                    e && e(),
                    d && d({
                        state: "notSend",
                        statusText: i
                    })
                }
            else {
                var j = document.createElement("script");
                j.type = "text/javascript",
                j.async = !0,
                j.defer = !0,
                j.src = a;
                var k = document.getElementsByTagName("script")[0];
                k.parentNode.insertBefore(j, k)
            }
        }
    }
    ,
    DATrackerLib.prototype._execute_array = function(a) {
        var b, c = [], d = [], e = [];
        _.each(a, function(a) {
            a && (b = a[0],
            typeof a == "function" ? a.call(this) : _.isArray(a) && b === "alias" ? c.push(a) : _.isArray(a) && b.indexOf("track") !== -1 && typeof this[b] == "function" ? e.push(a) : d.push(a))
        }, this);
        var f = function(a, b) {
            _.each(a, function(a) {
                _.isFunction(this[a[0]]) && this[a[0]].apply(this, a.slice(1))
            }, b)
        };
        f(c, this),
        f(d, this),
        f(e, this)
    }
    ,
    DATrackerLib.prototype.push = function(a) {
        this._execute_array([a])
    }
    ,
    DATrackerLib.prototype.disable = function(a) {
        typeof a == "undefined" ? this._flags.disable_all_events = !0 : this.__disabled_events = this.__disabled_events.concat(a)
    }
    ,
    DATrackerLib.prototype.track = function(a, b, c, d) {
        typeof c != "function" && (c = function() {}
        );
        if (_.isUndefined(a))
            console.error("No event name provided to DATracker.track");
        else {
            if (this._event_is_disabled(a)) {
                c(0);
                return
            }
            this.cookie.load(),
            b = b || {};
            var e = {}
              , f = _.JSONDecode(_.JSONEncode(b))
              , g = this.persistence.remove_event_timer(a);
            if (!_.isUndefined(g)) {
                var h = (new Date).getTime() - g;
                e[EVENT_TIMERS_KEY] = h
            }
            a == "da_session_close" && (e.sessionCloseTime = f.sessionCloseTime,
            e.sessionTotalLength = f.sessionTotalLength,
            delete f.sessionCloseTime,
            delete f.sessionTotalLength),
            b = _.extend({}, _.info.properties(), this.persistence.properties(), e);
            var i = this.get_config("property_blacklist");
            _.isArray(i) ? _.each(i, function(a) {
                delete b[a]
            }) : console.error("Invalid value for property_blacklist config: " + i);
            var j = DATATYPE;
            DEFAULTEVENTID[a] ? j = DEFAULTEVENTID[a].dataType : d && (j = d),
            _.include(["da_session_start", "da_session_close", "da_activate"], a) || this._session(),
            j === "e" && (this._check_referer() || this.cookie.register({
                sessionReferrer: location.href
            })),
            this.get_config("is_single_page") || _.include(["da_activate", "da_session_close"], a) && this.cookie.register({
                sessionReferrer: location.href
            }),
            this.get_config("is_single_page") && b.sessionReferrer != b.referrer && (b.referrer = b.sessionReferrer,
            b.referring_domain = _.info.referringDomain(b.sessionReferrer));
            var k = (new Date).getTime();
            a == "da_session_close" && (k = b.sessionCloseTime),
            a == "da_session_start" && (k = b.sessionStartTime),
            this.register_once({
                persistedTime: k
            }, "");
            var l = {
                dataType: j,
                sessionUuid: this.cookie.props.sessionUuid,
                userId: this.persistence.props.user_id,
                currentUrl: b.current_url,
                referrer: b.referrer,
                referrerDomain: b.referring_domain,
                sdkVersion: b.lib_version,
                sdkType: SDKTYPE,
                deviceOs: b.deviceOs,
                deviceOsVersion: b.deviceOsVersion,
                devicePlatform: b.hb_lib,
                browser: b.browser,
                browserVersion: b.browser_version,
                screenWidth: b.screen_width,
                screenHeight: b.screen_height,
                sessionTotalLength: b.sessionTotalLength,
                eventId: a,
                appKey: this.get_config("token"),
                time: k,
                persistedTime: this.cookie.props.persistedTime,
                deviceUdid: this.get_distinct_id(),
                deviceModel: _.trim(b.deviceModel),
                pageTitle: b.title,
                urlPath: b.url_path,
                currentDomain: b.currentDomain,
                pageOpenScene: this.pageOpenScene
            }
              , m = campaign.getParams()
              , n = source.getParams();
            l = _.extend(l, m),
            l = _.extend(l, n),
            j === "e" && (f = _.extend({}, this.cookie.props.superProperties || {}, f)),
            j === "pv" && typeof this.pageview_attributes == "object" && (f = _.extend({}, this.pageview_attributes || {}, f)),
            l.attributes = f,
            _.size(l.attributes) || delete l.attributes,
            l.referrer || delete l.referrer,
            l.referrerDomain || delete l.referrerDomain,
            l.pageTitle || delete l.pageTitle,
            l.urlPath || delete l.urlPath,
            l.userId || delete l.userId,
            b[EVENT_TIMERS_KEY] && (l[EVENT_TIMERS_KEY] = b[EVENT_TIMERS_KEY],
            delete b[EVENT_TIMERS_KEY]);
            if (this.get_config("hubble_render_mode")) {
                DATrackerABtest.debugTrack(l);
                return !1
            }
            var o = this.get_config("truncateLength")
              , p = l;
            Object.prototype.toString.call(o) === "[object Number]" && o > 0 && (p = _.truncate(l, o));
            var q = _.JSONEncode(p)
              , r = _.base64Encode(q)
              , s = _.sha1(this.get_config("token"));
            console.log(PRIMARY_INSTANCE_NAME + " REQUEST:"),
            console.log(p);
            var t = this
              , u = function() {
                var b = t.cookie.props.sendNumClass;
                a === "da_session_start" && (b.allNum = 0,
                b.errSendNum = 0),
                a !== "da_send_error" && a !== "da_activate" && (b.allNum += 1),
                t.cookie.register({
                    sendNumClass: b
                })
            }
              , v = function(b) {
                if (a !== "da_send_error" && a !== "da_activate") {
                    var c = t.cookie.props.sendNumClass.errSendNum
                      , d = t.cookie.props.sendNumClass.allNum;
                    a === "da_session_start" && (c = 0),
                    c += 1,
                    t.get_config("send_error") && (b = _.extend({
                        eventId: a,
                        time: k,
                        allNum: t.cookie.props.sendNumClass.allNum,
                        errSendNum: c
                    }, b),
                    t.track("da_send_error", b)),
                    t.cookie.register({
                        sendNumClass: {
                            allNum: t.cookie.props.sendNumClass.allNum,
                            errSendNum: c
                        }
                    })
                }
            }
              , w = function() {
                t._send_request(t.get_config("api_host") + "/track/w/", {
                    data: r,
                    appKey: s
                }, t._prepare_callback(c, p), v, u)
            };
            this.get_config("use_app_track") ? this._sendNativeCall(q, a, c, w) : w(),
            this.get_config("debug") && _.isFunction(this.debug) && (this.get_config("use_app_track") ? _.include(["da_session_close", "da_session_start", "da_activate", "da_u_login", "da_u_logout", "da_u_signup"], a) || this.debug({
                data: r
            }) : this.debug({
                data: r
            })),
            _.include(["da_session_close", "da_session_start"], a) || this.cookie.register({
                LASTEVENT: {
                    eventId: a,
                    time: k
                }
            });
            return p
        }
    }
    ,
    DATrackerLib.prototype.track_pageview = function(a, b, c) {
        _.isUndefined(b) && (b = document.location.href);
        var d = this
          , e = function() {
            var b = d.track("da_screen", _.extend({}, a));
            typeof c == "function" && c(b)
        };
        this._session(e)
    }
    ,
    DATrackerLib.prototype._send_da_activate = function() {
        var a = {};
        this.get_distinct_id() || (this.register_once({
            deviceUdid: _.UUID()
        }, ""),
        a = this.track("da_activate"));
        return a
    }
    ,
    DATrackerLib.prototype.register_attributes = function(a) {
        if (typeof a == "object") {
            var b = this.cookie.props.superProperties || {};
            b = _.extend({}, b, a),
            this.register({
                superProperties: b
            })
        }
    }
    ,
    DATrackerLib.prototype.register_attributes_once = function(a) {
        if (typeof a == "object") {
            var b = this.cookie.props.superProperties || {};
            b = _.extend({}, a, b),
            this.register({
                superProperties: b
            })
        }
    }
    ,
    DATrackerLib.prototype.current_attributes = function(a) {
        typeof a == "function" && a(this.cookie.props.superProperties || {})
    }
    ,
    DATrackerLib.prototype.unregister_attributes = function(a) {
        if (typeof a == "string") {
            var b = this.cookie.props.superProperties || {};
            delete b[a],
            this.register({
                superProperties: b
            })
        }
    }
    ,
    DATrackerLib.prototype.clear_attributes = function() {
        this.register({
            superProperties: {}
        })
    }
    ,
    DATrackerLib.prototype.single_pageview = function() {}
    ,
    DATrackerLib.prototype._single_pageview = function() {
        var a = location.href
          , b = this.cookie.props.currentReferrer || location.href;
        this.get_config("is_single_page") && ((this.get_config("single_page_config").mode === "hash" || this.get_config("single_page_config").mode === "history" || this.get_config("single_page_config").mode === "memoryhistory") && this.cookie.register({
            sessionReferrer: b,
            currentReferrer: a
        }),
        this.track_pageview({}, a))
    }
    ,
    DATrackerLib.prototype.track_links = function() {
        return this._track_dom.call(this, LinkTracker, arguments)
    }
    ,
    DATrackerLib.prototype.time_event = function(a) {
        if (_.isUndefined(a))
            console.error("No event name provided to DATracker.time_event");
        else {
            if (this._event_is_disabled(a))
                return;
            this.persistence.set_event_timer(a, (new Date).getTime())
        }
    }
    ,
    DATrackerLib.prototype.register = function(a, b) {
        this.persistence.register(a, b)
    }
    ,
    DATrackerLib.prototype.register_once = function(a, b, c) {
        this.persistence.register_once(a, b, c)
    }
    ,
    DATrackerLib.prototype.unregister = function(a) {
        this.persistence.unregister(a)
    }
    ,
    DATrackerLib.prototype._register_single = function(a, b) {
        var c = {};
        c[a] = b,
        this.register(c)
    }
    ,
    DATrackerLib.prototype.signup = function(a) {
        var b = this.get_user_id()
          , c = {};
        b = b == undefined ? "" : b;
        if (b != a) {
            this._register_single("user_id", a),
            c = this.track("da_u_signup", {
                oldUserId: b,
                newUserId: a
            });
            return c
        }
    }
    ,
    DATrackerLib.prototype.login = function(a) {
        var b = this.signup(a)
          , c = this.track("da_u_login");
        this._register_single("user_id", a);
        return {
            data_signup: b,
            data_login: c
        }
    }
    ,
    DATrackerLib.prototype.logout = function(a) {
        function c() {
            b || (b = !0,
            typeof a == "function" && a())
        }
        this.unregister("user_id");
        var b = !1;
        setTimeout(c, this.get_config("track_links_timeout"));
        var d = this.track("da_u_logout", {}, c);
        return d
    }
    ,
    DATrackerLib.prototype.set_userId = function(a) {
        this._register_single("user_id", a)
    }
    ,
    DATrackerLib.prototype.reset = function() {
        this.persistence.clear(),
        this.register_once({
            deviceUdid: _.UUID()
        }, "")
    }
    ,
    DATrackerLib.prototype.get_distinct_id = function() {
        return this.get_property("deviceUdid")
    }
    ,
    DATrackerLib.prototype.get_user_id = function() {
        return this.get_property("user_id")
    }
    ,
    DATrackerLib.prototype.set_config = function(a) {
        _.isObject(a) && (_.extend(this.config, a),
        this.get_config("persistence_name") || (this.config.persistence_name = this.config.cookie_name),
        this.get_config("disable_persistence") || (this.config.disable_persistence = this.config.disable_cookie),
        this.persistence && this.persistence.update_config(this.config),
        Config.DEBUG = Config.DEBUG || this.get_config("debug"))
    }
    ,
    DATrackerLib.prototype.get_config = function(a) {
        return this.config[a]
    }
    ,
    DATrackerLib.prototype.get_property = function(a) {
        return this.persistence.props[a]
    }
    ,
    DATrackerLib.prototype.toString = function() {
        var a = this.get_config("name");
        a !== PRIMARY_INSTANCE_NAME && (a = PRIMARY_INSTANCE_NAME + "." + a);
        return a
    }
    ,
    DATrackerLib.prototype._event_is_disabled = function(a) {
        return _.isBlockedUA(userAgent) || this._flags.disable_all_events || _.include(this.__disabled_events, a)
    }
    ,
    DATrackerPeople.prototype._init = function(a) {
        this._DATracker = a
    }
    ,
    DATrackerPeople.prototype.set = function(a, b, c) {
        var d = {}
          , e = {};
        _.isObject(a) ? (_.each(a, function(a, b) {
            this._is_reserved_property(b) || (e[b] = a)
        }, this),
        c = b) : e[a] = b,
        e.$userProfile === undefined && (e.$type = "profile_set",
        e = {
            $userProfile: e
        }),
        d[SET_ACTION] = e;
        return this._send_request(d, c)
    }
    ,
    DATrackerPeople.prototype.set_once = function(a, b, c) {
        var d = {}
          , e = {};
        _.isObject(a) ? (_.each(a, function(a, b) {
            this._is_reserved_property(b) || (e[b] = a)
        }, this),
        c = b) : e[a] = b,
        e.$userProfile === undefined && (e.$type = "profile_set_once",
        e = {
            $userProfile: e
        }),
        d[SET_ONCE_ACTION] = e;
        return this._send_request(d, c)
    }
    ,
    DATrackerPeople.prototype.set_realname = function(a) {
        this.set({
            $realName: a
        })
    }
    ,
    DATrackerPeople.prototype.set_country = function(a) {
        this.set({
            $country: a
        })
    }
    ,
    DATrackerPeople.prototype.set_province = function(a) {
        this.set({
            $region: a
        })
    }
    ,
    DATrackerPeople.prototype.set_region = function(a) {
        this.set({
            $region: a
        })
    }
    ,
    DATrackerPeople.prototype.set_city = function(a) {
        this.set({
            $city: a
        })
    }
    ,
    DATrackerPeople.prototype.set_age = function(a) {
        this.set({
            $age: a
        })
    }
    ,
    DATrackerPeople.prototype.set_gender = function(a) {
        (a == 0 || a == 1 || a == 2) && this.set({
            $gender: a
        })
    }
    ,
    DATrackerPeople.prototype.set_birthday = function(a) {
        !_.checkTime(a) || this.set({
            $birthday: a
        })
    }
    ,
    DATrackerPeople.prototype.set_account = function(a) {
        this.set({
            $account: a
        })
    }
    ,
    DATrackerPeople.prototype.set_populationWithAccount = function(a, b, c, d) {
        if (!(!a || !b || !c || !d)) {
            if (!_.checkTime(c))
                return;
            this.set({
                $account: a,
                $realName: b,
                $birthday: c,
                $gender: d
            })
        }
    }
    ,
    DATrackerPeople.prototype.set_location = function(a, b, c) {
        !a || !b || !c || this.set({
            $country: a,
            $region: b,
            $city: c
        })
    }
    ,
    DATrackerPeople.prototype.append = function(a, b, c) {
        var d = {}
          , e = {};
        _.isObject(a) ? (_.each(a, function(a, b) {
            this._is_reserved_property(b) || (e[b] = a)
        }, this),
        c = b) : e[a] = b,
        e.$userProfile === undefined && (e.$type = "profile_append",
        e = {
            $userProfile: e
        }),
        d[SET_ONCE_ACTION] = e;
        return this._send_request(d, c)
    }
    ,
    DATrackerPeople.prototype.toString = function() {
        return this._DATracker.toString() + ".people"
    }
    ,
    DATrackerPeople.prototype._send_request = function(a, b) {
        if (this._DATracker.cookie.props.hubble_render_mode)
            return !1;
        a.dataType = "ie",
        a.appKey = this._get_config("token"),
        a.deviceUdid = this._DATracker.get_distinct_id(),
        a.userId = this._DATracker.get_user_id(),
        a.time = (new Date).getTime(),
        a.sdkType = SDKTYPE,
        a.eventId = "da_user_profile",
        a.persistedTime = this._DATracker.cookie.props.persistedTime,
        a.pageOpenScene = "Browser";
        var c = campaign.getParams()
          , d = source.getParams();
        a = _.extend(a, c),
        a = _.extend(a, d);
        var e = _.encodeDates(a)
          , f = this._DATracker.get_config("truncateLength")
          , g = e;
        Object.prototype.toString.call(f) === "[object Number]" && f > 0 && (g = _.truncate(e, f));
        var h = _.JSONEncode(e)
          , i = _.base64Encode(h);
        if (!1)
            ;console.log("\u6253\u5370\u6570\u636e:"),
        console.log(g);
        var j = _.sha1(this._DATracker.get_config("token"))
          , k = this
          , l = function() {
            k._DATracker._send_request(k._get_config("api_host") + "/track/w/", {
                data: i,
                appKey: j
            }, k._DATracker._prepare_callback(b, g))
        };
        this._DATracker.get_config("use_app_track") ? this._DATracker._sendNativeCall(h, "$da_user_profile", b, l) : l(),
        this._DATracker.get_config("debug") && _.isFunction(this._DATracker.debug) && this._DATracker.debug({
            data: i
        });
        return g
    }
    ,
    DATrackerPeople.prototype._get_config = function(a) {
        return this._DATracker.get_config(a)
    }
    ,
    DATrackerPeople.prototype._user_logined = function() {
        var a = this._DATracker.get_user_id();
        return a !== undefined
    }
    ,
    DATrackerPeople.prototype._enqueue = function(a) {
        SET_ACTION in a ? this._DATracker.persistence._add_to_people_queue(SET_ACTION, a) : SET_ONCE_ACTION in a ? this._DATracker.persistence._add_to_people_queue(SET_ONCE_ACTION, a) : ADD_ACTION in a ? this._DATracker.persistence._add_to_people_queue(ADD_ACTION, a) : APPEND_ACTION in a ? this._DATracker.persistence._add_to_people_queue(APPEND_ACTION, a) : UNION_ACTION in a ? this._DATracker.persistence._add_to_people_queue(UNION_ACTION, a) : console.error("Invalid call to _enqueue():", a)
    }
    ,
    DATrackerPeople.prototype._is_reserved_property = function(a) {
        return a === "$deviceUdid" || a === "$token"
    }
    ,
    DATrackerLib.prototype.init = DATrackerLib.prototype.init,
    DATrackerLib.prototype.reset = DATrackerLib.prototype.reset,
    DATrackerLib.prototype.disable = DATrackerLib.prototype.disable,
    DATrackerLib.prototype.time_event = DATrackerLib.prototype.time_event,
    DATrackerLib.prototype.track = DATrackerLib.prototype.track,
    DATrackerLib.prototype.track_links = DATrackerLib.prototype.track_links,
    DATrackerLib.prototype.track_pageview = DATrackerLib.prototype.track_pageview,
    DATrackerLib.prototype.register = DATrackerLib.prototype.register,
    DATrackerLib.prototype.register_once = DATrackerLib.prototype.register_once,
    DATrackerLib.prototype.unregister = DATrackerLib.prototype.unregister,
    DATrackerLib.prototype.alias = DATrackerLib.prototype.alias,
    DATrackerLib.prototype.set_config = DATrackerLib.prototype.set_config,
    DATrackerLib.prototype.get_config = DATrackerLib.prototype.get_config,
    DATrackerLib.prototype.get_property = DATrackerLib.prototype.get_property,
    DATrackerLib.prototype.get_distinct_id = DATrackerLib.prototype.get_distinct_id,
    DATrackerLib.prototype.toString = DATrackerLib.prototype.toString,
    DATrackerLib.prototype.login = DATrackerLib.prototype.login,
    DATrackerLib.prototype.logout = DATrackerLib.prototype.logout,
    DATrackerLib.prototype.get_user_id = DATrackerLib.prototype.get_user_id,
    DATrackerLib.prototype.register_attributes = DATrackerLib.prototype.register_attributes,
    DATrackerLib.prototype.register_attributes_once = DATrackerLib.prototype.register_attributes_once,
    DATrackerLib.prototype.clear_attributes = DATrackerLib.prototype.clear_attributes,
    DATrackerLib.prototype.unregister_attributes = DATrackerLib.prototype.unregister_attributes,
    DATrackerLib.prototype.current_attributes = DATrackerLib.prototype.current_attributes,
    DATrackerPersistence.prototype.properties = DATrackerPersistence.prototype.properties,
    DATrackerPersistence.prototype.get_cross_subdomain = DATrackerPersistence.prototype.get_cross_subdomain,
    DATrackerPersistence.prototype.clear = DATrackerPersistence.prototype.clear,
    DATrackerPeople.prototype.set = DATrackerPeople.prototype.set,
    DATrackerPeople.prototype.set_once = DATrackerPeople.prototype.set_once,
    DATrackerPeople.prototype.append = DATrackerPeople.prototype.append,
    DATrackerPeople.prototype.toString = DATrackerPeople.prototype.toString;
    var instances = {}
      , extend_mp = function() {
        _.each(instances, function(a, b) {
            b !== PRIMARY_INSTANCE_NAME && (DATracker_master[b] = a)
        }),
        DATracker_master._ = _
    }
      , override_mp_init_func = function() {
        DATracker_master.init = function(a, b, c) {
            if (c) {
                DATracker_master[c] || (DATracker_master[c] = instances[c] = create_DAlib(a, b, c),
                DATracker_master[c]._loaded());
                return DATracker_master[c]
            }
            var d = DATracker_master;
            instances[PRIMARY_INSTANCE_NAME] ? d = instances[PRIMARY_INSTANCE_NAME] : a && (d = create_DAlib(a, b, PRIMARY_INSTANCE_NAME),
            d._loaded(),
            instances[PRIMARY_INSTANCE_NAME] = d),
            DATracker_master = d;
            if (init_type === INIT_SNIPPET || init_type === INIT_SYNC)
                window[PRIMARY_INSTANCE_NAME] = DATracker_master;
            extend_mp()
        }
    }
      , add_dom_loaded_handler = function() {
        function b() {
            try {
                document.documentElement.doScroll("left")
            } catch (c) {
                setTimeout(b, 1);
                return
            }
            a()
        }
        function a() {
            a.done || (a.done = !0,
            DOM_LOADED = !0,
            ENQUEUE_REQUESTS = !1,
            _.each(instances, function(a) {
                a._dom_loaded()
            }))
        }
        if (document.addEventListener)
            document.readyState === "complete" ? a() : document.addEventListener("DOMContentLoaded", a, !1);
        else if (document.attachEvent) {
            document.attachEvent("onreadystatechange", a);
            var c = !1;
            try {
                c = window.frameElement === null
            } catch (d) {}
            document.documentElement.doScroll && c && b()
        }
        _.register_event(window, "load", a, !0)
    };
    init_sync()
}
)();
(function(a, b) {
    function k(a, b, f) {
        if (d[a])
            throw new Error("Module " + a + " has been defined already.");
        c(b) && (f = b),
        d[a] = {
            factory: f,
            inited: !1
        },
        a === e && j(a)
    }
    function j(a) {
        var e = {}
          , f = d[a];
        if (c(d[a].factory)) {
            var g = d[a].factory.apply(b, [i, e, f]);
            f.ret = g === b ? f.exports : g
        } else
            f.ret = d[a].factory;
        f.inited = !0
    }
    function i(a) {
        if (!d[a])
            throw new Error("Module " + a + " is not defined.");
        var b = d[a];
        b.inited === !1 && j(a);
        return b.ret
    }
    function c(a) {
        return Object.prototype.toString.call(a) === "[object Function]"
    }
    if (!a.define) {
        var d = {}
          , e = null
          , f = document.getElementsByTagName("script");
        for (var g = 0, h = f.length; g < h && !e; g++)
            e = f[g].getAttribute("data-main");
        if (!e)
            throw new Error("No data-main attribute in script tag.");
        a.define = k
    }
}
)(window);
define("task/group/common", function(a, b, c) {
    a("task/widget/openApp"),
    a("task/widget/logger"),
    a("task/widget/initDAStatistic"),
    a("task/widget/downFloatLayer")
});
define("task/widget/openApp", function(a, b, c) {
    "use strict";
    var d = a("lib/zepto")
      , e = a("task/basic/Task")
      , f = a("utils/uaDetect")
      , g = a("utils/Utils")
      , h = a("utils/statistic/userStatistic")
      , i = a("utils/statistic/DAStatistic")
      , j = a("utils/Log");
    (new e("openApp",function() {
        function j(b) {
            b = b || CONFIG.appDownloadUrl,
            a === h.eventName.LOVE_CAFE && h.doStatistic(h.eventName.LOVE_CAFE, h.tagName.DOWNLOAD, "web"),
            f.isWeixin() ? location.href = "//a.app.qq.com/o/simple.jsp?pkgname=com.netease.huatian&g_f=991653" : location.href = b
        }
        function e(b, d, e) {
            d.indexOf("jiaoyou://") === 0 ? f.isMainPlatForm() ? g.goToPage(b, {
                from: a,
                appLink: d,
                action: "openApp",
                downloadLink: e
            }) : c(d, e) : location.href = d
        }
        function c(b, c) {
            location.href = b,
            setTimeout(function() {
                c ? location.href = c : g.goToPage("/3g", {
                    from: a,
                    action: "download"
                })
            }, 1500)
        }
        var a = g.getQueryString("from")
          , b = g.getQueryString("action");
        d("body").delegate(".app-trigger", "click", function(b) {
            b.preventDefault();
            var c = d(b.currentTarget)
              , h = c.attr("data-universal-link") || CONFIG.universalLink
              , k = c.attr("href") || CONFIG.openUrl
              , l = c.attr("data-download-link") || "";
            i.doStatistic(i.eventName.CLICK_OPEN_APP),
            k.indexOf("3g.163.com") >= 0 ? j(k) : f.getIOSVersionNumber() >= 9 ? g.goToPage(h, {
                from: a,
                action: "openApp",
                downloadLink: l
            }) : e(h, k, l)
        })
    }
    )).add()
});
define("lib/zepto", function(a, b, c) {
    "use strict";
    return window.Zepto
});
define("task/basic/Task", function(a, b, c) {
    var d = a("basic/Class")
      , e = d.extend({
        init: function(a, b, c, d) {
            this.name = a,
            d = d || [],
            c = c || null,
            this.func = function() {
                b.apply(c, d)
            }
        },
        run: function() {
            this.func()
        },
        add: function() {
            a("task/basic/TaskManager").add(this)
        }
    });
    return e
});
define("basic/Class", function(a, b, c) {
    function f(a, b) {
        return function() {
            var c = this._super;
            this._super = a;
            var d = b.apply(this, arguments);
            this._super = c;
            return d
        }
    }
    var d = !1
      , e = /xyz/.test(function() {
        xyz
    }) ? /\b_super\b/ : /.*/
      , g = function() {};
    g.extend = function(a) {
        function h() {
            !d && this.init && this.init.apply(this, arguments)
        }
        var b = this.prototype;
        d = !0;
        var c = new this;
        d = !1;
        for (var g in a)
            c[g] = typeof a[g] == "function" && typeof b[g] == "function" && e.test(a[g]) ? f(b[g], a[g]) : a[g];
        h.prototype = c,
        h.constructor = h,
        h.extend = arguments.callee;
        return h
    }
    ;
    return g
});
define("task/basic/TaskManager", function(a, b, c) {
    var d = a("lib/zepto")
      , e = {
        taskResult: {},
        taskList: [],
        add: function(a) {
            this.taskList.push(a)
        },
        run: function() {
            var a = this.taskList.shift();
            if (this.taskList.length > 0) {
                var b = this;
                setTimeout(function() {
                    b.run()
                }, 0)
            }
            var c = new Date
              , d = 0
              , e = null;
            try {
                a.run()
            } catch (f) {
                typeof console != "undefined" && console.error && console.error("error in task ", a.name, ":", f, f.stack),
                e = f
            }
            d = new Date - c,
            this.taskResult[a.name] = {
                duration: d,
                result: e === null ? "success" : e.name + ":" + e.message + "|@|" + e.stack
            },
            this.taskList.length !== 0
        }
    };
    return e
});
define("utils/uaDetect", function(a, b, c) {
    "use strict";
    var d = {
        checkIOSUAVersion: function(a, b) {
            a = a || navigator.userAgent;
            if (a.indexOf("Huatian App iOS") < 0)
                return !1;
            var c = /(\d+\.){2}\d+$/
              , e = c.exec(a);
            if (!e || !e.length)
                return !1;
            return d.compareVersion(e[0], b)
        },
        checkAndroidUAVersion: function(a, b) {
            a = a || navigator.userAgent;
            var c = /v(\d+\.){2}\d+/
              , e = c.exec(a);
            if (!e || !e.length)
                return !1;
            e = e[0].slice(1);
            return d.compareVersion(e, b)
        },
        checkAppUAVersion: function(a, b) {
            if (!CONFIG.isApp)
                return !1;
            if (CONFIG.isIos)
                return d.checkIOSUAVersion(a, b);
            if (CONFIG.isAndroid)
                return d.checkAndroidUAVersion(a, b);
            return !1
        },
        compareVersion: function(a, b) {
            var c = a.split(".")
              , d = b.split(".");
            for (var e = 0; ; ++e) {
                if (e >= d.length)
                    return !0;
                var f = 0
                  , g = 0;
                e < c.length && (f = parseInt(c[e])),
                e < d.length && (g = parseInt(d[e]));
                if (f < g)
                    return !1;
                if (f > g)
                    return !0
            }
        },
        getIOSVersionNumber: function(a) {
            if (!CONFIG.isIos)
                return !1;
            var b = /OS\s(\d+)_(\d+)(_\d+)?\s/;
            a = a || navigator.userAgent;
            var c = b.exec(a);
            return c && c.length ? parseInt(c[1]) : !1
        },
        isWeixin: function(a) {
            a = a || navigator.userAgent;
            return a.toLowerCase().indexOf("micromessenger") >= 0
        },
        isQzone: function(a) {
            a = a || navigator.userAgent;
            return a.toLowerCase().indexOf("qzone") >= 0
        },
        isYixin: function(a) {
            a = a || navigator.userAgent;
            return a.toLowerCase().indexOf("yixin") >= 0
        },
        isQQ: function(a) {
            a = a || navigator.userAgent;
            return a.toLowerCase().match(/qq\/(\d+\.)+\d+/)
        },
        isQQBrowser: function(a) {
            a = a || navigator.userAgent;
            return a.toLowerCase().match(/mqqbrowser/)
        },
        isWeibo: function(a) {
            a = a || navigator.userAgent;
            return a.toLowerCase().indexOf("weibo") >= 0
        },
        isMail: function(a) {
            a = a || navigator.userAgent;
            return a.toLowerCase().indexOf("mail") >= 0
        },
        isUC: function(a) {
            a = a || navigator.userAgent;
            return a.toLowerCase().indexOf("ucbrowser") >= 0
        },
        isMainPlatForm: function(a) {
            a = a || navigator.userAgent;
            return d.isWeixin(a) || d.isQzone(a) || d.isYixin(a) || d.isWeibo(a) || d.isQQ(a) || d.isMail(a)
        }
    };
    return d
});
define("utils/Utils", function(a, b, c) {
    "use strict";
    var d = a("lib/zepto")
      , e = a("utils/OimageUrl")
      , f = window.Utils = {};
    f.cache = {},
    f.EMAIL_REG = /^[a-zA-Z0-9_\-\.]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/,
    f.NICKNAME_REG = /^[\u4e00-\u9fa5\w_]+$/i,
    f.REALNAME_REG = /^[\u4e00-\u9fa5]{2,}$/i,
    f.COMPANY_REG = /^[^<>]+$/i,
    f.SCHOOL_REG = /^[\u4e00-\u9fa5（）()\w ]*$/i,
    f.MOBILE_REG = /^0*(13|14|15|18)\d{9}$/,
    f.MOBILECODE_REG = /^[0-9]{6}$/,
    f.IDCARD_REG = /^(\d{18,18}|\d{17,17}[xX])$/,
    f.VERIFYCODE_REG = /^[\w]{5}$/,
    f.IMG_FILE_REG = /^image\/\w+$/,
    f.URL_REG = /^(http)s?:\/\/(?:[\w-]+\.?)+[\.\/\?%&=#@\[\]\-+_!:*~\w-]+|(www)\.(?:[\w-]+\.?)+[\.\/\?%&=#@\[\]\-+_!:*~\w-]+$/i,
    f.FULLWIDTH_REG = /[\uFE30-\uFFA0\u2E80-\u9FFF\uac00-\ud7ff\u3000‘“”’]/g,
    f.UNIQUE_BROSER_ID = "uniqueBrowserId";
    var g = '<div class="loadingBox-b"><span><em class="icon-loading-b"></em>$TEXT$</span></div>';
    f.LOADING_BIG = function(a) {
        a = a || "\u52a0\u8f7d\u4e2d...";
        return g.replace("$TEXT$", a)
    }
    ;
    var h = '<div class="loadingBox-s"><span><em class="icon-loading-s"></em>$TEXT$</span></div>';
    f.LOADING_SMALL = function(a) {
        a = a || "\u52a0\u8f7d\u4e2d...";
        return h.replace("$TEXT$", a)
    }
    ,
    f.pageWidth = function() {
        return parseFloat(document.documentElement.clientWidth)
    }
    ,
    f.pageHeight = function() {
        return Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
    }
    ,
    f.pageMaxHeight = function() {
        return Math.max(d(window).height(), d(document).height())
    }
    ,
    f.random = function(a) {
        return Math.floor(a * (Math.random() % 1))
    }
    ,
    f.cutChars = function(a, b, c) {
        var d = a.replace(/[\u4e00-\u9fa5\s]/g, "**").length, e;
        if (d <= b)
            return a;
        if (b && c) {
            var e = a.substr(0, b);
            return e + "..."
        }
        return e
    }
    ,
    f.randomOimageUrl = function() {
        var a = {};
        return function(b, c, d, e, g, h) {
            if (typeof b != "string" || b === "")
                throw "Oimage Url is Error!!!";
            var i = b + "|" + c + "|" + d + "|" + e + "|" + h + "|" + g;
            if (!a[i]) {
                b = f.encodeSpecialHtmlChar(b);
                var j = b.lastIndexOf(".");
                j = b.substr(j - 1, 1),
                j < 0 && (j = b.length - 1);
                var k = (new String(j)).charCodeAt() % 2 + 1
                  , l = "http://htimg" + k + ".cache.netease.com/image?" + (typeof c == "number" ? "w=" + c : "") + (typeof d == "number" ? "&h=" + d : "") + "&url=" + encodeURIComponent(b) + "&gif=" + (e ? 0 : 1) + "&quality=" + (g ? g : 85);
                typeof h != "undefined" && (l += "&fill=0"),
                a[i] = l
            }
            return a[i]
        }
    }(),
    f.buildCursor = function(a) {
        return a.timestamp
    }
    ,
    f.parseURL = function(a) {
        var b = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
          , c = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"]
          , d = b.exec(a)
          , e = {};
        for (var f = 0, g = c.length; f < g; f++)
            e[c[f]] = d[f] || "";
        return e
    }
    ,
    f.encodeSpecialHtmlChar = function(a) {
        if (a) {
            a = a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            return a
        }
        return ""
    }
    ,
    f.decodeSpecialHtmlChar = function(a) {
        if (a) {
            var b = ["&quot;", "&amp;", "&lt;", "&gt;"]
              , c = ['"', "&", "<", ">"]
              , d = c.length;
            for (var e = 0; e < d; e++)
                a = a.replace(new RegExp(b[e],"g"), c[e]);
            return a
        }
        return ""
    }
    ,
    f.getLocation = function(b, c) {
        var d = a("utils/data/selectData");
        if (d && typeof b != "undefined" && typeof c != "undefined") {
            var e = d.city.all()[b];
            parseInt(c) !== 0 && (e += d.city.city[b][c]);
            return e
        }
        return "\u672a\u586b"
    }
    ,
    f.getProvince = function(b) {
        var c = a("utils/data/selectData");
        if (c && typeof b != "undefined") {
            var d = c.city.all()[b];
            return d
        }
    }
    ,
    f.getCity = function(b, c) {
        var d = a("utils/data/selectData");
        if (d && typeof b != "undefined" && typeof c != "undefined") {
            var e = d.city.city[b][c];
            return e
        }
        return "\u672a\u586b"
    }
    ,
    f.replaceEmpty = function(a, b, c) {
        var c = c || "";
        return !a || a === "" ? b ? b : "\u672a\u8bbe\u7f6e" : a + c
    }
    ,
    f.educationValue = function(b, c) {
        if (parseInt(b) === 1 && c)
            return "\u5b66\u5386\u4e0d\u9650";
        var d = ""
          , e = a("utils/data/selectData");
        d = e.education[b],
        d = c ? d + "\u53ca\u4ee5\u4e0a" : d;
        return d
    }
    ,
    f.userSexName = function(a) {
        a = parseInt(a);
        if (a === 1)
            return "\u4ed6";
        if (a === 2)
            return "\u5979";
        return ""
    }
    ,
    f.userSexTitle = function(a) {
        a = parseInt(a);
        if (a === 1)
            return "\u7537";
        if (a === 2)
            return "\u5973";
        return ""
    }
    ,
    f.defaultAvatars = {
        1: location.protocol + "//lovepicture.nosdn.127.net/6779716905546231742?imageView",
        2: location.protocol + "//lovepicture.nosdn.127.net/2232358906584406686?imageView"
    },
    f.userAvatar = function(a, b, c, d) {
        var g = "";
        typeof arguments[0] == "object" ? g = a.url ? a.url : f.defaultAvatars[a.sex] || f.defaultAvatars[1] : typeof arguments[0] == "string" && (g = a !== "" ? a : f.defaultAvatars[c] || f.defaultAvatars[1]);
        return e(g, b, b, 1)
    }
    ,
    f.tmpl = function(a, b) {
        var c = /\W\/+/.test(a) ? new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : f.cache[a] = f.cache[a] || f.tmpl(document.getElementById(a).innerHTML);
        return b ? c(b) : c
    }
    ,
    f.commaNumber = function(a) {
        var b = String(a).split(".")
          , c = function(a) {
            return a.length <= 3 ? a : c(a.substr(0, a.length - 3)) + "," + a.substr(a.length - 3)
        };
        b[0] = c(b[0]);
        return b.join(".")
    }
    ,
    f.formatTime = function(a, b) {
        var c = parseInt(a / 3600) % 24
          , d = parseInt(a / 60) % 60
          , e = parseInt(a % 60);
        c = c < 10 ? "0" + c : c,
        d = d < 10 ? "0" + d : d,
        e = e < 10 ? "0" + e : e,
        c = String(c),
        d = String(d),
        e = String(e);
        return {
            hour: c == "NaN" ? "00" : c,
            min: d == "NaN" ? "00" : d,
            second: e == "NaN" ? "00" : e
        }
    }
    ,
    f.format = function(a, b) {
        if (/\d{12}/.test(b))
            b = new Date(b);
        else if (/\d{9}/.test(b))
            b = new Date(b + "000");
        else if (!b)
            return "";
        var c = {
            "M+": b.getMonth() + 1,
            "d+": b.getDate(),
            "h+": b.getHours(),
            "H+": b.getHours(),
            "m+": b.getMinutes(),
            "s+": b.getSeconds(),
            "q+": Math.floor((b.getMonth() + 3) / 3),
            S: b.getMilliseconds()
        };
        /(y+)/.test(a) && (a = a.replace(RegExp.$1, (b.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var d in c)
            (new RegExp("(" + d + ")")).test(a) && (a = a.replace(RegExp.$1, RegExp.$1.length == 1 ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
        return a
    }
    ,
    f.switching = function(a, b) {
        var c = d(a);
        !!c && !!d(b) && c.bind("click", function(a) {
            var c = d(a.target)
              , e = c.parents(b);
            e.hasClass("n-switch-actived") ? e.removeClass("n-switch-actived") : e.addClass("n-switch-actived")
        })
    }
    ,
    f.absolutePath = function(a) {
        return location.protocol + "//" + window.location.host + "/" + a
    }
    ,
    f.openToProfile = function(a, b) {
        var c, d = a.extraStr ? "&" + a.extraStr : "";
        CONFIG.isiPhone ? c = "jiaoyou://profile/" + a.id + "/" + a.sex : CONFIG.isAndroid && b ? c = "jiaoyou://profile/" + a.id + "&" + a.nickName + "&" + a.sex + d : c = location.protocol + "//" + window.location.host + "/" + a.url;
        return c
    }
    ,
    f.isAppInstalled = function() {
        if (CONFIG.isApp)
            return !0;
        var a = {}
          , b = location.search.toLowerCase();
        if (b) {
            b = b.substr(1);
            var c = b.split("&");
            for (var d = 0, e = c.length; d < e; d++) {
                var f = c[d].split("=");
                a[f[0]] = f[1]
            }
        }
        return a.isappinstalled && a.isappinstalled == 1 ? !0 : !1
    }
    ,
    f.commaNumber = function(a) {
        var b = String(a).split(".")
          , c = function(a) {
            return a.length <= 3 ? a : c(a.substr(0, a.length - 3)) + "," + a.substr(a.length - 3)
        };
        b[0] = c(b[0]);
        return b.join(".")
    }
    ,
    f.getQueryString = function(a) {
        var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)")
          , c = window.location.search.substr(1).match(b);
        if (c != null)
            return decodeURIComponent(c[2]);
        return null
    }
    ,
    f.ua = function(a) {
        switch (a) {
        case "huatian":
            return /huatian/i.test(navigator.userAgent);
        case "yixin":
            return /yixin/i.test(navigator.userAgent);
        case "weixin":
            return /micromessenger/i.test(navigator.userAgent);
        case "qzone":
            return /qzone/i.test(navigator.userAgent);
        case "qq":
            return /qq/i.test(navigator.userAgent)
        }
    }
    ,
    f.throttle = function(a, b) {
        var c, d, e, g, h, i, j = f.debounce(function() {
            h = g = !1
        }, b);
        return function() {
            c = this,
            d = arguments;
            var f = function() {
                e = null,
                h && a.apply(c, d),
                j()
            };
            e || (e = setTimeout(f, b)),
            g ? h = !0 : i = a.apply(c, d),
            j(),
            g = !0;
            return i
        }
    }
    ,
    f.debounce = function(a, b, c) {
        var d;
        return function() {
            var e = this
              , f = arguments
              , g = function() {
                d = null,
                a.apply(e, f)
            };
            c && !d && a.apply(e, f),
            clearTimeout(d),
            d = setTimeout(g, b)
        }
    }
    ,
    f.getAge = function(a) {
        a = new Date(a);
        var b = a.getFullYear()
          , c = a.getMonth()
          , d = a.getDate()
          , e = new Date
          , f = e.getFullYear() - b;
        (c < e.getMonth() || c === e.getMonth() && d < e.getDate()) && f--;
        return f > 0 ? f : 0
    }
    ,
    f.randomNum = function(a, b) {
        if (isNaN(a) || isNaN(b))
            return null;
        var c, d;
        if (a > b)
            c = a,
            d = b;
        else if (a < b)
            c = b,
            d = a;
        else
            return a;
        var e = c - d
          , f = Math.random() > 1 / (e + 1);
        e = parseInt(Math.random() * c) % e;
        return f ? e + (d || 0) : c
    }
    ,
    f.randomSortArray = function(a) {
        if (a.sort)
            return a.sort(function() {
                return Math.random() > .5 ? -1 : 1
            })
    }
    ,
    f.randomArrayElem = function(a) {
        if (!a.length)
            return null;
        if (a.length === 1)
            return a[0];
        return a[f.randomNum(0, a.length - 1)]
    }
    ,
    f.setBrowserId = function(a) {
        a = String(a || +(new Date)),
        localStorage.setItem(f.UNIQUE_BROSER_ID, a);
        return a
    }
    ,
    f.getBrowserId = function() {
        return localStorage.getItem(f.UNIQUE_BROSER_ID)
    }
    ,
    f.selectValue = function(b, c, d, e) {
        var f = a("data/selectData")
          , e = e || "";
        if (parseInt(c) === 0 || c === "")
            return typeof d == "undefined" ? "\u672a\u8bbe\u7f6e" : d === !1 ? "" : d;
        if (b === "province")
            return f.city.all()[c];
        if (b === "city") {
            var g = c.split(/[-_~]/)
              , h = g[0]
              , i = g[1]
              , j = "";
            parseInt(i) !== 0 && i !== "" && (j = f.city.city[h][i]);
            return j
        }
        return f[b][c] + e
    }
    ,
    f.getHiddenPrefix = function() {
        if ("hidden"in document)
            return "";
        var a = ["webkit", "moz", "o"];
        for (var b = 0; b < a.length; ++b)
            if (a[b] + "Hidden"in document)
                return a[b];
        return null
    }
    ,
    f.goToPage = function(a, b) {
        var c = a.indexOf("?") >= 0;
        for (var d in b) {
            if (!b.hasOwnProperty(d))
                continue;
            if (!b[d] && b[d] !== 0)
                continue;
            c ? a += "&" + d + "=" + encodeURIComponent(b[d]) : (a += "?" + d + "=" + encodeURIComponent(b[d]),
            c = !0)
        }
        location.href = a
    }
    ,
    f.getQuery = function(a) {
        return a.split("?")[1]
    }
    ,
    f.getCleanUrl = function(a) {
        return a.split("?")[0]
    }
    ,
    f.getUrlParams = function(a) {
        var b = f.getQuery(a);
        if (!b)
            return {};
        var c = {}
          , d = b.split("&");
        for (var e = 0; e < d.length; e++) {
            var g = d[e].split("=");
            c[g[0]] = decodeURIComponent(g[1])
        }
        return c
    }
    ,
    f.getUrlWithParams = function(a, b) {
        if (!b)
            return a;
        var c;
        if (~a.indexOf("#")) {
            var d = a.split("#");
            a = d[0],
            c = d[1]
        }
        var e = [];
        for (var f in b)
            e.push(f + "=" + encodeURIComponent(b[f]));
        var g = e.join("&");
        a += (~a.indexOf("?") ? "&" : "?") + g + (c ? "#" + c : "");
        return a
    }
    ,
    f.getOrigin = function() {
        if (location.origin)
            return location.origin;
        return location.protocol + "//" + location.hostname
    }
    ;
    return f
});
define("utils/OimageUrl", function(a, b, c) {
    "use strict";
    var d = {}
      , e = function(a) {
        if (a) {
            a = a.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            return a
        }
        return ""
    }
      , f = function(a, b, c, e, f) {
        if (typeof a != "string" || a === "")
            throw "Oimage Url is Error!!!";
        if (!c || c === "")
            c = b;
        f = f || 85;
        var e = typeof e == "number" && e === 1 ? 1 : 0
          , g = a + "|" + b + "|" + c + "|" + e + "|" + f;
        d[g] || (d[g] = function() {
            var d = "";
            a.match(/nos.netease.com\//gi) ? d = a + "&quality=" + f + "&thumbnail=" + b + (e === 1 ? "y" : "x") + c : a.match(/lovepicture.nosdn.127.net\//i) ? d = a + "&quality=" + f + "&thumbnail=" + b + (e === 1 ? "y" : "x") + c : (a = a.replace(/#.*?$/, "").replace(/^https/, "http"),
            d = location.protocol + "//imgsize.ph.126.net/?imgurl=" + a + "_" + b + "x" + c + "x" + e + "x" + f + ".jpg");
            return d
        }());
        return d[g]
    };
    return f
});
define("utils/data/selectData", function(a, b, c) {
    var d = a("lib/zepto")
      , e = {
        sex: {
            1: "\u7537",
            2: "\u5973"
        },
        education: {
            1: "\u5927\u4e13\u4ee5\u4e0b",
            2: "\u5927\u4e13",
            3: "\u672c\u79d1",
            4: "\u7855\u58eb",
            5: "\u535a\u58eb"
        },
        industry: {
            1: "\u4e92\u8054\u7f51/IT",
            2: "\u653f\u5e9c\u673a\u6784",
            3: "\u6559\u80b2/\u79d1\u7814",
            4: "\u533b\u7597\u5065\u5eb7",
            6: "\u822a\u7a7a\u822a\u5929",
            7: "\u5de5\u4e1a\u5236\u9020",
            8: "\u670d\u52a1\u884c\u4e1a",
            9: "\u91d1\u878d",
            10: "\u6587\u5316\u4f20\u5a92",
            11: "\u827a\u672f/\u5a31\u4e50",
            12: "\u6cd5\u5f8b",
            14: "\u5efa\u7b51/\u623f\u4ea7",
            15: "\u96f6\u552e/\u8d38\u6613",
            16: "\u9152\u5e97\u65c5\u6e38",
            17: "\u73b0\u4ee3\u519c\u4e1a",
            18: "\u5728\u6821\u5b66\u751f",
            19: "\u4ea4\u901a\u8fd0\u8f93",
            20: "\u9910\u996e",
            21: "\u4f53\u80b2",
            22: "\u54a8\u8be2",
            23: "\u516c\u76ca",
            24: "\u81ea\u7531\u804c\u4e1a"
        },
        marriageStatus: {
            1: "\u672a\u5a5a",
            2: "\u79bb\u5f02",
            3: "\u4e27\u5076",
            4: "\u5df2\u5a5a"
        },
        lookingFor: {
            1: "\u7ed3\u5a5a\u5bf9\u8c61",
            2: "\u604b\u4eba",
            3: "\u666e\u901a\u670b\u53cb",
            4: "\u77e5\u5df1"
        },
        marriageStatusFilter: {
            1: "\u672a\u5a5a\uff0c\u5bfb\u89c5\u4e2d",
            2: "\u79bb\u5f02\uff0c\u5bfb\u89c5\u4e2d",
            3: "\u4e27\u5076\uff0c\u5bfb\u89c5\u4e2d"
        },
        house: {
            1: "\u5df2\u8d2d\u623f",
            2: "\u79df\u623f",
            3: "\u5355\u4f4d\u5bbf\u820d",
            4: "\u548c\u5bb6\u4eba\u540c\u4f4f"
        },
        birthOrder: {
            1: "\u72ec\u751f\u5b50\u5973",
            2: "\u8001\u5927",
            3: "\u8001\u4e8c",
            4: "\u8001\u4e09",
            5: "\u8001\u56db",
            6: "\u8001\u4e94\u53ca\u66f4\u5c0f",
            7: "\u8001\u5e7a"
        },
        childStatus: {
            1: "\u65e0\u5c0f\u5b69",
            2: "\u6709\u5c0f\u5b69\u5f52\u81ea\u5df1",
            3: "\u6709\u5c0f\u5b69\u5f52\u5bf9\u65b9"
        },
        religion: {
            1: "\u65e0\u5b97\u6559\u4fe1\u4ef0",
            2: "\u5927\u4e58\u4f5b\u6559\u663e\u5b97",
            3: "\u5927\u4e58\u4f5b\u6559\u5bc6\u5b97",
            4: "\u5927\u4e58\u4f5b\u6559\u51c0\u5b97",
            5: "\u5c0f\u4e58\u4f5b\u6559",
            6: "\u9053\u6559",
            7: "\u5112\u6559",
            8: "\u57fa\u7763\u6559\u5929\u4e3b\u6559\u6d3e",
            9: "\u57fa\u7763\u6559\u4e1c\u6b63\u6559\u6d3e",
            10: "\u57fa\u7763\u6559\u65b0\u6559\u6d3e",
            11: "\u72b9\u592a\u6559",
            12: "\u4f0a\u65af\u5170\u6559\u4ec0\u53f6\u6d3e",
            13: "\u4f0a\u65af\u5170\u6559\u900a\u5c3c\u6d3e",
            14: "\u5370\u5ea6\u6559",
            15: "\u795e\u9053\u6559",
            16: "\u8428\u6ee1\u6559",
            17: "\u5176\u4ed6\u6559\u6d3e"
        },
        car: {
            1: "\u5df2\u8d2d\u8f66",
            2: "\u672a\u8d2d\u8f66"
        },
        blood: {
            1: "A",
            2: "B",
            3: "AB",
            4: "O"
        },
        nationality: {
            1: "\u6c49",
            2: "\u8499\u53e4",
            3: "\u56de",
            4: "\u85cf",
            5: "\u7ef4\u543e\u5c14",
            6: "\u82d7",
            7: "\u5f5d",
            8: "\u58ee",
            9: "\u5e03\u4f9d",
            10: "\u671d\u9c9c",
            11: "\u6ee1",
            12: "\u4f97",
            13: "\u7476",
            14: "\u767d",
            15: "\u571f\u5bb6",
            16: "\u54c8\u5c3c",
            17: "\u54c8\u8428\u514b",
            18: "\u50a3",
            19: "\u9ece",
            20: "\u5088\u50f3",
            21: "\u4f64",
            22: "\u7572",
            23: "\u9ad8\u5c71",
            24: "\u62c9\u795c",
            25: "\u6c34",
            26: "\u4e1c\u4e61",
            27: "\u7eb3\u897f",
            28: "\u666f\u9887",
            29: "\u67ef\u5c14\u514b\u5b5c",
            30: "\u571f",
            31: "\u8fbe\u65a1\u5c14",
            32: "\u4eeb\u4f6c",
            33: "\u7f8c",
            34: "\u5e03\u6717",
            35: "\u6492\u62c9",
            36: "\u6bdb\u5357",
            37: "\u4ee1\u4f6c",
            38: "\u9521\u4f2f",
            39: "\u963f\u660c",
            40: "\u666e\u7c73",
            41: "\u5854\u5409\u514b",
            42: "\u6012",
            43: "\u4e4c\u5b5c\u522b\u514b",
            44: "\u4fc4\u7f57\u65af",
            45: "\u9102\u6e29\u514b",
            46: "\u5fb7\u6602",
            47: "\u4fdd\u5b89",
            48: "\u88d5\u56fa",
            49: "\u4eac",
            50: "\u5854\u5854\u5c14",
            51: "\u72ec\u9f99",
            52: "\u9102\u4f26\u6625",
            53: "\u8d6b\u54f2",
            54: "\u95e8\u5df4",
            55: "\u73de\u5df4",
            56: "\u57fa\u8bfa"
        },
        position: {
            1: "\u666e\u901a\u804c\u5458",
            2: "\u4e2d\u5c42\u7ba1\u7406\u8005",
            3: "\u9ad8\u5c42\u7ba1\u7406\u8005",
            4: "\u4f01\u4e1a\u4e3b",
            5: "\u5b66\u751f"
        },
        salary: {
            "-1": "2000\u5143\u4ee5\u4e0b",
            1: "2000-4000\u5143",
            2: "4000-6000\u5143",
            3: "6000-10000\u5143",
            4: "10000-15000\u5143",
            5: "15000-20000\u5143",
            6: "20000-50000\u5143",
            7: "50000\u5143\u4ee5\u4e0a"
        },
        salaryArray: [{
            key: -1,
            val: "2000\u5143\u4ee5\u4e0b"
        }, {
            key: 1,
            val: "2000-4000\u5143"
        }, {
            key: 2,
            val: "4000-6000\u5143"
        }, {
            key: 3,
            val: "6000-10000\u5143"
        }, {
            key: 4,
            val: "10000-15000\u5143"
        }, {
            key: 5,
            val: "15000-20000\u5143"
        }, {
            key: 6,
            val: "20000-50000\u5143"
        }, {
            key: 7,
            val: "50000\u5143\u4ee5\u4e0a"
        }],
        status: {
            1: "\u5bfb\u89c5\u5bf9\u8c61\u4e2d",
            3: "\u5df2\u6709\u5bf9\u8c61\uff0c\u4e0d\u518d\u5bfb\u89c5"
        },
        expDegree: {
            1: "\u5927\u4e13\u53ca\u4ee5\u4e0a",
            2: "\u672c\u79d1\u53ca\u4ee5\u4e0a",
            3: "\u7855\u58eb\u53ca\u4ee5\u4e0a",
            4: "\u535a\u58eb\u53ca\u4ee5\u4e0a"
        },
        expSalary: {
            "-1": 2e3,
            1: 4e3,
            2: 6e3,
            3: 1e4,
            4: 2e4,
            5: 5e4
        },
        expSalaryArray: [{
            key: -1,
            val: 2e3
        }, {
            key: 1,
            val: 4e3
        }, {
            key: 2,
            val: 6e3
        }, {
            key: 3,
            val: 1e4
        }, {
            key: 4,
            val: 2e4
        }, {
            key: 5,
            val: 5e4
        }],
        cooking: {
            1: "\u4f1a\u505a\u996d\uff0c\u5e0c\u671b\u5bf9\u65b9\u4e5f\u4f1a",
            2: "\u4f1a\u505a\u996d\uff0c\u5bf9\u53e6\u4e00\u534a\u6ca1\u8981\u6c42",
            3: "\u4e0d\u592a\u4f1a\uff0c\u5bf9\u53e6\u4e00\u534a\u6ca1\u8981\u6c42",
            4: "\u4e0d\u592a\u4f1a\uff0c\u5e0c\u671b\u5bf9\u65b9\u53a8\u827a\u6bd4\u6211\u597d"
        },
        arrangement: {
            1: "\u5de5\u4f5c\u65f6\u95f4\u56fa\u5b9a\uff0c\u4e0d\u63a5\u53d7\u5bf9\u65b9\u51fa\u5dee",
            2: "\u5de5\u4f5c\u65f6\u95f4\u56fa\u5b9a\uff0c\u4e0d\u4ecb\u610f\u5bf9\u65b9\u51fa\u5dee",
            3: "\u5de5\u4f5c\u7ecf\u5e38\u51fa\u5dee",
            4: "\u5de5\u4f5c\u5076\u5c14\u51fa\u5dee"
        },
        smoking: {
            1: "\u4e0d\u5438\u70df\uff0c\u4e14\u5f88\u53cd\u611f\u5438\u70df",
            2: "\u4e0d\u5438\u70df\uff0c\u4f46\u4e5f\u4e0d\u53cd\u611f",
            3: "\u5076\u5c14\u5438\u70df",
            4: "\u7ecf\u5e38\u5438\u70df"
        },
        drink: {
            1: "\u4e0d\u559d\u9152\uff0c\u4e14\u5f88\u53cd\u611f\u559d\u9152",
            2: "\u4e0d\u559d\u9152\uff0c\u4f46\u4e5f\u4e0d\u53cd\u611f",
            3: "\u793e\u4ea4\u9700\u8981\u65f6\u624d\u559d",
            4: "\u7ecf\u5e38\u559d\u9152"
        },
        loveAndMarriage: {
            1: "\u80fd\u63a5\u53d7\u95ea\u5a5a",
            2: "\u4e00\u5e74\u5185",
            3: "\u4e24\u5e74\u5185",
            4: "\u4e09\u5e74\u53ca\u4ee5\u4e0a"
        },
        needChild: {
            1: "\u60f3\u8981\u5b69\u5b50",
            2: "\u4e0d\u60f3\u8981\u5b69\u5b50",
            3: "\u89c6\u60c5\u51b5\u800c\u5b9a"
        },
        withParents: {
            1: "\u4e0d\u4ecb\u610f",
            2: "\u4ecb\u610f"
        },
        housework: {
            1: "\u8fd9\u662f\u59bb\u5b50\u7684\u5206\u5185\u4e8b",
            2: "\u592b\u59bb\u5e73\u5747\u5206\u914d",
            3: "\u8c01\u6709\u65f6\u95f4\u8c01\u505a",
            4: "\u592b\u59bb\u5404\u81ea\u627f\u62c5\u81ea\u5df1\u64c5\u957f\u7684\u5bb6\u52a1"
        },
        financial: {
            1: "\u7531\u592b\u59bb\u5171\u540c\u8ba1\u5212",
            2: "\u592b\u59bb\u5404\u81ea\u652f\u914d\u5404\u81ea\u7684\u6536\u5165",
            3: "\u7531\u59bb\u5b50\u6253\u7406",
            4: "\u7531\u4e08\u592b\u6253\u7406"
        },
        constellation: {
            1: "\u6469\u7faf",
            2: "\u6c34\u74f6",
            3: "\u53cc\u9c7c",
            4: "\u767d\u7f8a",
            5: "\u91d1\u725b",
            6: "\u53cc\u5b50",
            7: "\u5de8\u87f9",
            8: "\u72ee\u5b50",
            9: "\u5904\u5973",
            10: "\u5929\u79e4",
            11: "\u5929\u874e",
            12: "\u5c04\u624b"
        },
        zodiac: {
            1: "\u9f20",
            2: "\u725b",
            3: "\u864e",
            4: "\u5154",
            5: "\u9f99",
            6: "\u86c7",
            7: "\u9a6c",
            8: "\u7f8a",
            9: "\u7334",
            10: "\u9e21",
            11: "\u72d7",
            12: "\u732a"
        },
        height: function(a, b, c) {
            var d = {}
              , e = 1
              , b = b || 150
              , c = c || 210;
            for (var f = b; f <= c; f++)
                d[f] = f,
                e += 1;
            return d
        },
        age: function(a, b, c) {
            var d = {}
              , e = 1
              , b = b || 18
              , c = c || 60;
            for (var f = b; f <= c; f++)
                d[f] = f,
                e += 1;
            return d
        },
        city: {
            all: function() {
                return d.extend(this.mainland, this.overseas)
            },
            mainland: {
                1: "\u5317\u4eac",
                2: "\u4e0a\u6d77",
                3: "\u5929\u6d25",
                4: "\u91cd\u5e86",
                5: "\u6d59\u6c5f",
                6: "\u6c5f\u82cf",
                7: "\u5e7f\u4e1c",
                8: "\u798f\u5efa",
                9: "\u6e56\u5357",
                10: "\u6e56\u5317",
                11: "\u8fbd\u5b81",
                12: "\u5409\u6797",
                13: "\u9ed1\u9f99\u6c5f",
                14: "\u6cb3\u5317",
                15: "\u6cb3\u5357",
                16: "\u5c71\u4e1c",
                17: "\u9655\u897f",
                18: "\u7518\u8083",
                19: "\u9752\u6d77",
                20: "\u65b0\u7586",
                21: "\u5c71\u897f",
                22: "\u56db\u5ddd",
                23: "\u8d35\u5dde",
                24: "\u5b89\u5fbd",
                25: "\u6c5f\u897f",
                26: "\u4e91\u5357",
                27: "\u5185\u8499\u53e4",
                28: "\u5e7f\u897f",
                29: "\u897f\u85cf",
                30: "\u5b81\u590f",
                31: "\u6d77\u5357"
            },
            overseas: {
                32: "\u9999\u6e2f",
                33: "\u6fb3\u95e8",
                34: "\u53f0\u6e7e",
                35: "\u6d77\u5916",
                36: "\u5176\u4ed6\u5730\u533a"
            },
            opened: {
                1: "\u5317\u4eac",
                2: "\u4e0a\u6d77",
                "7-1": "\u5e7f\u5dde",
                "5-1": "\u676d\u5dde",
                "7-3": "\u6df1\u5733"
            },
            specialCity: {
                1: "\u5317\u4eac",
                2: "\u4e0a\u6d77",
                3: "\u5929\u6d25",
                4: "\u91cd\u5e86"
            },
            specialCities: [1, 2, 3, 4, 32, 33, 34, 36],
            city: {
                1: {
                    1: "\u4e1c\u57ce\u533a",
                    2: "\u897f\u57ce\u533a",
                    3: "\u5d07\u6587\u533a",
                    4: "\u5ba3\u6b66\u533a",
                    5: "\u671d\u9633\u533a",
                    6: "\u4e30\u53f0\u533a",
                    7: "\u77f3\u666f\u5c71\u533a",
                    8: "\u6d77\u6dc0\u533a",
                    9: "\u95e8\u5934\u6c9f\u533a",
                    10: "\u623f\u5c71\u533a",
                    11: "\u901a\u5dde\u533a",
                    12: "\u987a\u4e49\u533a",
                    13: "\u660c\u5e73\u533a",
                    14: "\u5927\u5174\u533a",
                    15: "\u6000\u67d4\u533a",
                    16: "\u5e73\u8c37\u533a",
                    17: "\u5bc6\u4e91\u53bf",
                    18: "\u5ef6\u5e86\u53bf"
                },
                2: {
                    1: "\u9ec4\u6d66\u533a",
                    2: "\u5362\u6e7e\u533a",
                    3: "\u5f90\u6c47\u533a",
                    4: "\u957f\u5b81\u533a",
                    5: "\u9759\u5b89\u533a",
                    6: "\u666e\u9640\u533a",
                    7: "\u95f8\u5317\u533a",
                    8: "\u8679\u53e3\u533a",
                    9: "\u6768\u6d66\u533a",
                    10: "\u95f5\u884c\u533a",
                    11: "\u5b9d\u5c71\u533a",
                    12: "\u5609\u5b9a\u533a",
                    13: "\u6d66\u4e1c\u65b0\u533a",
                    14: "\u91d1\u5c71\u533a",
                    15: "\u677e\u6c5f\u533a",
                    16: "\u9752\u6d66\u533a",
                    17: "\u5357\u6c47\u533a",
                    18: "\u5949\u8d24\u533a",
                    19: "\u5d07\u660e\u53bf"
                },
                3: {
                    1: "\u548c\u5e73\u533a",
                    2: "\u6cb3\u4e1c\u533a",
                    3: "\u6cb3\u897f\u533a",
                    4: "\u5357\u5f00\u533a",
                    5: "\u6cb3\u5317\u533a",
                    6: "\u7ea2\u6865\u533a",
                    7: "\u5858\u6cbd\u533a",
                    8: "\u6c49\u6cbd\u533a",
                    9: "\u5927\u6e2f\u533a",
                    10: "\u4e1c\u4e3d\u533a",
                    11: "\u897f\u9752\u533a",
                    12: "\u6d25\u5357\u533a",
                    13: "\u5317\u8fb0\u533a",
                    14: "\u6b66\u6e05\u533a",
                    15: "\u5b9d\u577b\u533a",
                    16: "\u5b81\u6cb3\u53bf",
                    17: "\u9759\u6d77\u53bf",
                    18: "\u84df\u53bf"
                },
                4: {
                    1: "\u4e07\u5dde\u533a",
                    2: "\u6daa\u9675\u533a",
                    3: "\u6e1d\u4e2d\u533a",
                    4: "\u5927\u6e21\u53e3\u533a",
                    5: "\u6c5f\u5317\u533a",
                    6: "\u6c99\u576a\u575d\u533a",
                    7: "\u4e5d\u9f99\u5761\u533a",
                    8: "\u5357\u5cb8\u533a",
                    9: "\u5317\u789a\u533a",
                    10: "\u4e07\u76db\u533a",
                    11: "\u53cc\u6865\u533a",
                    12: "\u6e1d\u5317\u533a",
                    13: "\u5df4\u5357\u533a",
                    14: "\u9ed4\u6c5f\u533a",
                    15: "\u957f\u5bff\u533a",
                    16: "\u7da6\u6c5f\u53bf",
                    17: "\u6f7c\u5357\u53bf",
                    18: "\u94dc\u6881\u53bf",
                    19: "\u5927\u8db3\u53bf",
                    20: "\u8363\u660c\u53bf",
                    21: "\u74a7\u5c71\u53bf",
                    22: "\u6881\u5e73\u53bf",
                    23: "\u57ce\u53e3\u53bf",
                    24: "\u4e30\u90fd\u53bf",
                    25: "\u57ab\u6c5f\u53bf",
                    26: "\u6b66\u9686\u53bf",
                    27: "\u5fe0\u53bf",
                    28: "\u5f00\u53bf",
                    29: "\u4e91\u9633\u53bf",
                    30: "\u5949\u8282\u53bf",
                    31: "\u5deb\u5c71\u53bf",
                    32: "\u5deb\u6eaa\u53bf",
                    33: "\u77f3\u67f1\u53bf",
                    34: "\u79c0\u5c71\u53bf",
                    35: "\u9149\u9633\u53bf",
                    36: "\u5f6d\u6c34\u53bf",
                    37: "\u6c5f\u6d25\u5e02",
                    38: "\u5408\u5ddd\u5e02",
                    39: "\u6c38\u5ddd\u5e02",
                    40: "\u5357\u5ddd\u5e02"
                },
                5: {
                    1: "\u676d\u5dde",
                    2: "\u5b81\u6ce2",
                    3: "\u6e29\u5dde",
                    4: "\u5609\u5174",
                    5: "\u6e56\u5dde",
                    6: "\u7ecd\u5174",
                    7: "\u91d1\u534e",
                    8: "\u8862\u5dde",
                    9: "\u821f\u5c71",
                    10: "\u53f0\u5dde",
                    11: "\u4e3d\u6c34"
                },
                6: {
                    1: "\u5357\u4eac",
                    2: "\u65e0\u9521",
                    3: "\u5f90\u5dde",
                    4: "\u5e38\u5dde",
                    5: "\u82cf\u5dde",
                    6: "\u5357\u901a",
                    7: "\u8fde\u4e91\u6e2f",
                    8: "\u6dee\u5b89",
                    9: "\u76d0\u57ce",
                    10: "\u626c\u5dde",
                    11: "\u9547\u6c5f",
                    12: "\u6cf0\u5dde",
                    13: "\u5bbf\u8fc1"
                },
                7: {
                    1: "\u5e7f\u5dde",
                    2: "\u97f6\u5173",
                    3: "\u6df1\u5733",
                    4: "\u73e0\u6d77",
                    5: "\u6c55\u5934",
                    6: "\u4f5b\u5c71",
                    7: "\u6c5f\u95e8",
                    8: "\u6e5b\u6c5f",
                    9: "\u8302\u540d",
                    10: "\u8087\u5e86",
                    11: "\u60e0\u5dde",
                    12: "\u6885\u5dde",
                    13: "\u6c55\u5c3e",
                    14: "\u6cb3\u6e90",
                    15: "\u9633\u6c5f",
                    16: "\u6e05\u8fdc",
                    17: "\u4e1c\u839e",
                    18: "\u4e2d\u5c71",
                    19: "\u6f6e\u5dde",
                    20: "\u63ed\u9633",
                    21: "\u4e91\u6d6e"
                },
                8: {
                    1: "\u798f\u5dde",
                    2: "\u53a6\u95e8",
                    3: "\u8386\u7530",
                    4: "\u4e09\u660e",
                    5: "\u6cc9\u5dde",
                    6: "\u6f33\u5dde",
                    7: "\u5357\u5e73",
                    8: "\u9f99\u5ca9",
                    9: "\u5b81\u5fb7"
                },
                9: {
                    1: "\u957f\u6c99",
                    2: "\u682a\u6d32",
                    3: "\u6e58\u6f6d",
                    4: "\u8861\u9633",
                    5: "\u90b5\u9633",
                    6: "\u5cb3\u9633",
                    7: "\u5e38\u5fb7",
                    8: "\u5f20\u5bb6\u754c",
                    9: "\u76ca\u9633",
                    10: "\u90f4\u5dde",
                    11: "\u6c38\u5dde",
                    12: "\u6000\u5316",
                    13: "\u5a04\u5e95",
                    14: "\u6e58\u897f"
                },
                10: {
                    1: "\u6b66\u6c49",
                    2: "\u9ec4\u77f3",
                    3: "\u5341\u5830",
                    4: "\u5b9c\u660c",
                    5: "\u8944\u6a0a",
                    6: "\u9102\u5dde",
                    7: "\u8346\u95e8",
                    8: "\u5b5d\u611f",
                    9: "\u8346\u5dde",
                    10: "\u9ec4\u5188",
                    11: "\u54b8\u5b81",
                    12: "\u968f\u5dde",
                    13: "\u6069\u65bd",
                    14: "\u4ed9\u6843",
                    15: "\u6f5c\u6c5f",
                    16: "\u5929\u95e8",
                    17: "\u795e\u519c\u67b6"
                },
                11: {
                    1: "\u6c88\u9633",
                    2: "\u5927\u8fde",
                    3: "\u978d\u5c71",
                    4: "\u629a\u987a",
                    5: "\u672c\u6eaa",
                    6: "\u4e39\u4e1c",
                    7: "\u9526\u5dde",
                    8: "\u8425\u53e3",
                    9: "\u961c\u65b0",
                    10: "\u8fbd\u9633",
                    11: "\u76d8\u9526",
                    12: "\u94c1\u5cad",
                    13: "\u671d\u9633",
                    14: "\u846b\u82a6\u5c9b"
                },
                12: {
                    1: "\u957f\u6625",
                    2: "\u5409\u6797",
                    3: "\u56db\u5e73",
                    4: "\u8fbd\u6e90",
                    5: "\u901a\u5316",
                    6: "\u767d\u5c71",
                    7: "\u677e\u539f",
                    8: "\u767d\u57ce",
                    9: "\u5ef6\u8fb9"
                },
                13: {
                    1: "\u54c8\u5c14\u6ee8",
                    2: "\u9f50\u9f50\u54c8\u5c14",
                    3: "\u9e21\u897f",
                    4: "\u9e64\u5c97",
                    5: "\u53cc\u9e2d\u5c71",
                    6: "\u5927\u5e86",
                    7: "\u4f0a\u6625",
                    8: "\u4f73\u6728\u65af",
                    9: "\u4e03\u53f0\u6cb3",
                    10: "\u7261\u4e39\u6c5f",
                    11: "\u9ed1\u6cb3",
                    12: "\u7ee5\u5316",
                    13: "\u5927\u5174\u5b89\u5cad"
                },
                14: {
                    1: "\u77f3\u5bb6\u5e84",
                    2: "\u5510\u5c71",
                    3: "\u79e6\u7687\u5c9b",
                    4: "\u90af\u90f8",
                    5: "\u90a2\u53f0",
                    6: "\u4fdd\u5b9a",
                    7: "\u5f20\u5bb6\u53e3",
                    8: "\u627f\u5fb7",
                    9: "\u6ca7\u5dde",
                    10: "\u5eca\u574a",
                    11: "\u8861\u6c34"
                },
                15: {
                    1: "\u90d1\u5dde",
                    2: "\u5f00\u5c01",
                    3: "\u6d1b\u9633",
                    4: "\u5e73\u9876\u5c71",
                    5: "\u5b89\u9633",
                    6: "\u9e64\u58c1",
                    7: "\u65b0\u4e61",
                    8: "\u7126\u4f5c",
                    9: "\u6fee\u9633",
                    10: "\u8bb8\u660c",
                    11: "\u6f2f\u6cb3",
                    12: "\u4e09\u95e8\u5ce1",
                    13: "\u5357\u9633",
                    14: "\u5546\u4e18",
                    15: "\u4fe1\u9633",
                    16: "\u5468\u53e3",
                    17: "\u9a7b\u9a6c\u5e97",
                    18: "\u6d4e\u6e90"
                },
                16: {
                    1: "\u6d4e\u5357",
                    2: "\u9752\u5c9b",
                    3: "\u6dc4\u535a",
                    4: "\u67a3\u5e84",
                    5: "\u4e1c\u8425",
                    6: "\u70df\u53f0",
                    7: "\u6f4d\u574a",
                    8: "\u6d4e\u5b81",
                    9: "\u6cf0\u5b89",
                    10: "\u5a01\u6d77",
                    11: "\u65e5\u7167",
                    12: "\u83b1\u829c",
                    13: "\u4e34\u6c82",
                    14: "\u5fb7\u5dde",
                    15: "\u804a\u57ce",
                    16: "\u6ee8\u5dde",
                    17: "\u83cf\u6cfd"
                },
                17: {
                    1: "\u897f\u5b89",
                    2: "\u94dc\u5ddd",
                    3: "\u5b9d\u9e21",
                    4: "\u54b8\u9633",
                    5: "\u6e2d\u5357",
                    6: "\u5ef6\u5b89",
                    7: "\u6c49\u4e2d",
                    8: "\u6986\u6797",
                    9: "\u5b89\u5eb7",
                    10: "\u5546\u6d1b"
                },
                18: {
                    1: "\u5170\u5dde",
                    2: "\u5609\u5cea\u5173",
                    3: "\u91d1\u660c",
                    4: "\u767d\u94f6",
                    5: "\u5929\u6c34",
                    6: "\u6b66\u5a01",
                    7: "\u5f20\u6396",
                    8: "\u5e73\u51c9",
                    9: "\u9152\u6cc9",
                    10: "\u5e86\u9633",
                    11: "\u5b9a\u897f",
                    12: "\u9647\u5357",
                    13: "\u4e34\u590f",
                    14: "\u7518\u5357"
                },
                19: {
                    1: "\u897f\u5b81",
                    2: "\u6d77\u4e1c",
                    3: "\u6d77\u5317",
                    4: "\u9ec4\u5357",
                    5: "\u6d77\u5357",
                    6: "\u679c\u6d1b",
                    7: "\u7389\u6811",
                    8: "\u6d77\u897f"
                },
                20: {
                    1: "\u4e4c\u9c81\u6728\u9f50",
                    2: "\u514b\u62c9\u739b\u4f9d",
                    3: "\u5410\u9c81\u756a",
                    4: "\u54c8\u5bc6",
                    5: "\u660c\u5409",
                    6: "\u535a\u5c14\u5854\u62c9",
                    7: "\u5df4\u97f3\u90ed\u695e",
                    8: "\u963f\u514b\u82cf",
                    9: "\u514b\u5b5c\u52d2\u82cf",
                    10: "\u5580\u4ec0",
                    11: "\u548c\u7530",
                    12: "\u4f0a\u7281",
                    13: "\u5854\u57ce",
                    14: "\u963f\u52d2\u6cf0",
                    15: "\u77f3\u6cb3\u5b50",
                    16: "\u963f\u62c9\u5c14",
                    17: "\u56fe\u6728\u8212\u514b",
                    18: "\u4e94\u5bb6\u6e20"
                },
                21: {
                    1: "\u592a\u539f",
                    2: "\u5927\u540c",
                    3: "\u9633\u6cc9",
                    4: "\u957f\u6cbb",
                    5: "\u664b\u57ce",
                    6: "\u6714\u5dde",
                    7: "\u664b\u4e2d",
                    8: "\u8fd0\u57ce",
                    9: "\u5ffb\u5dde",
                    10: "\u4e34\u6c7e",
                    11: "\u5415\u6881"
                },
                22: {
                    1: "\u6210\u90fd",
                    2: "\u81ea\u8d21",
                    3: "\u6500\u679d\u82b1",
                    4: "\u6cf8\u5dde",
                    5: "\u5fb7\u9633",
                    6: "\u7ef5\u9633",
                    7: "\u5e7f\u5143",
                    8: "\u9042\u5b81",
                    9: "\u5185\u6c5f",
                    10: "\u4e50\u5c71",
                    11: "\u5357\u5145",
                    12: "\u7709\u5c71",
                    13: "\u5b9c\u5bbe",
                    14: "\u5e7f\u5b89",
                    15: "\u8fbe\u5dde",
                    16: "\u96c5\u5b89",
                    17: "\u5df4\u4e2d",
                    18: "\u8d44\u9633",
                    19: "\u963f\u575d",
                    20: "\u7518\u5b5c",
                    21: "\u51c9\u5c71"
                },
                23: {
                    1: "\u8d35\u9633",
                    2: "\u516d\u76d8\u6c34",
                    3: "\u9075\u4e49",
                    4: "\u5b89\u987a",
                    5: "\u94dc\u4ec1",
                    6: "\u9ed4\u897f\u5357",
                    7: "\u6bd5\u8282",
                    8: "\u9ed4\u4e1c\u5357",
                    9: "\u9ed4\u5357"
                },
                24: {
                    1: "\u5408\u80a5",
                    2: "\u829c\u6e56",
                    3: "\u868c\u57e0",
                    4: "\u6dee\u5357",
                    5: "\u9a6c\u978d\u5c71",
                    6: "\u6dee\u5317",
                    7: "\u94dc\u9675",
                    8: "\u5b89\u5e86",
                    9: "\u9ec4\u5c71",
                    10: "\u6ec1\u5dde",
                    11: "\u961c\u9633",
                    12: "\u5bbf\u5dde",
                    13: "\u5de2\u6e56",
                    14: "\u516d\u5b89",
                    15: "\u4eb3\u5dde",
                    16: "\u6c60\u5dde",
                    17: "\u5ba3\u57ce"
                },
                25: {
                    1: "\u5357\u660c",
                    2: "\u666f\u5fb7\u9547",
                    3: "\u840d\u4e61",
                    4: "\u4e5d\u6c5f",
                    5: "\u65b0\u4f59",
                    6: "\u9e70\u6f6d",
                    7: "\u8d63\u5dde",
                    8: "\u5409\u5b89",
                    9: "\u5b9c\u6625",
                    10: "\u629a\u5dde",
                    11: "\u4e0a\u9976"
                },
                26: {
                    1: "\u6606\u660e",
                    2: "\u66f2\u9756",
                    3: "\u7389\u6eaa",
                    4: "\u4fdd\u5c71",
                    5: "\u662d\u901a",
                    6: "\u4e3d\u6c5f",
                    7: "\u666e\u6d31",
                    8: "\u4e34\u6ca7",
                    9: "\u695a\u96c4",
                    10: "\u7ea2\u6cb3",
                    11: "\u6587\u5c71",
                    12: "\u897f\u53cc\u7248\u7eb3",
                    13: "\u5927\u7406",
                    14: "\u5fb7\u5b8f",
                    15: "\u6012\u6c5f",
                    16: "\u8fea\u5e86"
                },
                27: {
                    1: "\u547c\u548c\u6d69\u7279",
                    2: "\u5305\u5934",
                    3: "\u4e4c\u6d77",
                    4: "\u8d64\u5cf0",
                    5: "\u901a\u8fbd",
                    6: "\u9102\u5c14\u591a\u65af",
                    7: "\u547c\u4f26\u8d1d\u5c14",
                    8: "\u5df4\u5f66\u6dd6\u5c14",
                    9: "\u4e4c\u5170\u5bdf\u5e03\u76df",
                    10: "\u5174\u5b89\u76df",
                    11: "\u9521\u6797\u90ed\u52d2\u76df",
                    12: "\u963f\u62c9\u5584\u76df"
                },
                28: {
                    1: "\u5357\u5b81",
                    2: "\u67f3\u5dde",
                    3: "\u6842\u6797",
                    4: "\u68a7\u5dde",
                    5: "\u5317\u6d77",
                    6: "\u9632\u57ce\u6e2f",
                    7: "\u94a6\u5dde",
                    8: "\u8d35\u6e2f",
                    9: "\u7389\u6797",
                    10: "\u767e\u8272",
                    11: "\u8d3a\u5dde",
                    12: "\u6cb3\u6c60",
                    13: "\u6765\u5bbe",
                    14: "\u5d07\u5de6"
                },
                29: {
                    1: "\u62c9\u8428",
                    2: "\u660c\u90fd",
                    3: "\u5c71\u5357",
                    4: "\u65e5\u5580\u5219",
                    5: "\u90a3\u66f2",
                    6: "\u963f\u91cc",
                    7: "\u6797\u829d"
                },
                30: {
                    1: "\u94f6\u5ddd",
                    2: "\u77f3\u5634\u5c71",
                    3: "\u5434\u5fe0",
                    4: "\u56fa\u539f",
                    5: "\u4e2d\u536b"
                },
                31: {
                    1: "\u6d77\u53e3",
                    2: "\u4e09\u4e9a",
                    3: "\u4e94\u6307\u5c71",
                    4: "\u743c\u6d77",
                    5: "\u510b\u5dde",
                    6: "\u6587\u660c",
                    7: "\u4e07\u5b81",
                    8: "\u4e1c\u65b9",
                    9: "\u5b9a\u5b89",
                    10: "\u5c6f\u660c",
                    11: "\u6f84\u8fc8",
                    12: "\u4e34\u9ad8",
                    13: "\u767d\u6c99",
                    14: "\u660c\u6c5f",
                    15: "\u4e50\u4e1c",
                    16: "\u9675\u6c34",
                    17: "\u4fdd\u4ead",
                    18: "\u743c\u4e2d",
                    19: "\u897f\u6c99\u7fa4\u5c9b",
                    20: "\u5357\u6c99\u7fa4\u5c9b",
                    21: "\u4e2d\u6c99\u7fa4\u5c9b"
                },
                32: {
                    1: "\u4e2d\u897f\u533a",
                    2: "\u4e1c\u533a",
                    3: "\u4e5d\u9f99\u57ce\u533a",
                    4: "\u89c2\u5858\u533a",
                    5: "\u5357\u533a",
                    6: "\u6df1\u6c34\u57d7\u533a",
                    7: "\u9ec4\u5927\u4ed9\u533a",
                    8: "\u6e7e\u4ed4\u533a",
                    9: "\u6cb9\u5c16\u65fa\u533a",
                    10: "\u79bb\u5c9b\u533a",
                    11: "\u8475\u9752\u533a",
                    12: "\u5317\u533a",
                    13: "\u897f\u8d21\u533a",
                    14: "\u6c99\u7530\u533a",
                    15: "\u5c6f\u95e8\u533a",
                    16: "\u5927\u57d4\u533a",
                    17: "\u8343\u6e7e\u533a",
                    18: "\u5143\u6717\u533a"
                },
                33: {
                    1: "\u6fb3\u95e8"
                },
                34: {
                    1: "\u53f0\u5317\u5e02",
                    2: "\u9ad8\u96c4\u5e02",
                    3: "\u57fa\u9686\u5e02",
                    4: "\u53f0\u4e2d\u5e02",
                    5: "\u53f0\u5357\u5e02",
                    6: "\u65b0\u7af9\u5e02",
                    7: "\u5609\u4e49\u5e02",
                    9: "\u53f0\u5317\u53bf",
                    10: "\u5b9c\u5170\u53bf",
                    11: "\u6843\u56ed\u53bf",
                    12: "\u65b0\u7af9\u53bf",
                    13: "\u82d7\u6817\u53bf",
                    14: "\u53f0\u4e2d\u53bf",
                    15: "\u5f70\u5316\u53bf",
                    16: "\u5357\u6295\u53bf",
                    17: "\u4e91\u6797\u53bf",
                    18: "\u5609\u4e49\u53bf",
                    19: "\u53f0\u5357\u53bf",
                    20: "\u9ad8\u96c4\u53bf",
                    21: "\u5c4f\u4e1c\u53bf",
                    22: "\u6f8e\u6e56\u53bf",
                    23: "\u53f0\u4e1c\u53bf",
                    24: "\u82b1\u83b2\u53bf"
                },
                35: {
                    1: "\u7f8e\u56fd",
                    2: "\u52a0\u62ff\u5927",
                    3: "\u6fb3\u5927\u5229\u4e9a",
                    4: "\u65b0\u897f\u5170",
                    5: "\u82f1\u56fd",
                    6: "\u6cd5\u56fd",
                    7: "\u5fb7\u56fd",
                    8: "\u6377\u514b",
                    9: "\u8377\u5170",
                    10: "\u745e\u58eb",
                    11: "\u5e0c\u814a",
                    12: "\u632a\u5a01",
                    13: "\u745e\u5178",
                    14: "\u4e39\u9ea6",
                    15: "\u82ac\u5170",
                    16: "\u7231\u5c14\u5170",
                    17: "\u5965\u5730\u5229",
                    18: "\u610f\u5927\u5229",
                    19: "\u4e4c\u514b\u5170",
                    20: "\u4fc4\u7f57\u65af",
                    21: "\u897f\u73ed\u7259",
                    22: "\u97e9\u56fd",
                    23: "\u65b0\u52a0\u5761",
                    24: "\u9a6c\u6765\u897f\u4e9a",
                    25: "\u5370\u5ea6",
                    26: "\u6cf0\u56fd",
                    27: "\u65e5\u672c",
                    28: "\u5df4\u897f",
                    29: "\u963f\u6839\u5ef7",
                    30: "\u5357\u975e",
                    31: "\u57c3\u53ca"
                },
                36: {
                    1: "\u5176\u4ed6\u5730\u533a"
                }
            }
        },
        mobileNation: {
            "0086": "\u4e2d\u56fd\u5927\u9646",
            "00852": "\u4e2d\u56fd\u9999\u6e2f",
            "00853": "\u4e2d\u56fd\u6fb3\u95e8",
            "00886": "\u4e2d\u56fd\u53f0\u6e7e",
            "001": "\u7f8e\u56fd/\u52a0\u62ff\u5927",
            "0060": "\u9a6c\u6765\u897f\u4e9a",
            "0061": "\u6fb3\u5927\u5229\u4e9a",
            "0081": "\u65e5\u672c",
            "0082": "\u97e9\u56fd",
            "0065": "\u65b0\u52a0\u5761",
            "0044": "\u82f1\u56fd",
            "0033": "\u6cd5\u56fd",
            "007": "\u4fc4\u7f57\u65af",
            "0066": "\u6cf0\u56fd",
            "0049": "\u5fb7\u56fd",
            "0064": "\u65b0\u897f\u5170",
            "0091": "\u5370\u5ea6"
        }
    };
    return e
});
define("data/selectData", function(a, b, c) {
    var d = a("lib/zepto")
      , e = {
        sex: {
            1: "\u7537",
            2: "\u5973"
        },
        openedCity: {
            "1-0": "\u5317\u4eac",
            "2-0": "\u4e0a\u6d77",
            "7-1": "\u5e7f\u5dde",
            "5-1": "\u676d\u5dde",
            "7-3": "\u6df1\u5733",
            "3-0": "\u5929\u6d25",
            "4-0": "\u91cd\u5e86",
            "5-0": "\u6d59\u6c5f",
            "6-0": "\u6c5f\u82cf",
            "7-0": "\u5e7f\u4e1c",
            "8-0": "\u798f\u5efa",
            "9-0": "\u6e56\u5357",
            "10-0": "\u6e56\u5317",
            "11-0": "\u8fbd\u5b81",
            "12-0": "\u5409\u6797",
            "13-0": "\u9ed1\u9f99\u6c5f",
            "14-0": "\u6cb3\u5317",
            "15-0": "\u6cb3\u5357",
            "16-0": "\u5c71\u4e1c",
            "17-0": "\u9655\u897f",
            "18-0": "\u7518\u8083",
            "19-0": "\u9752\u6d77",
            "20-0": "\u65b0\u7586",
            "21-0": "\u5c71\u897f",
            "22-0": "\u56db\u5ddd",
            "23-0": "\u8d35\u5dde",
            "24-0": "\u5b89\u5fbd",
            "25-0": "\u6c5f\u897f",
            "26-0": "\u4e91\u5357",
            "27-0": "\u5185\u8499\u53e4",
            "28-0": "\u5e7f\u897f",
            "29-0": "\u897f\u85cf",
            "30-0": "\u5b81\u590f",
            "31-0": "\u6d77\u5357",
            "32-0": "\u9999\u6e2f",
            "33-0": "\u6fb3\u95e8",
            "34-0": "\u53f0\u6e7e",
            "35-0": "\u6d77\u5916",
            "36-0": "\u5176\u4ed6"
        },
        education: {
            1: "\u5927\u4e13\u4ee5\u4e0b",
            2: "\u5927\u4e13",
            3: "\u672c\u79d1",
            4: "\u7855\u58eb",
            5: "\u535a\u58eb"
        },
        industry: {
            1: "\u4e92\u8054\u7f51/IT",
            2: "\u653f\u5e9c\u673a\u6784",
            3: "\u6559\u80b2/\u79d1\u7814",
            4: "\u533b\u7597\u5065\u5eb7",
            6: "\u822a\u7a7a\u822a\u5929",
            7: "\u5de5\u4e1a\u5236\u9020",
            8: "\u670d\u52a1\u884c\u4e1a",
            9: "\u91d1\u878d",
            10: "\u6587\u5316\u4f20\u5a92",
            11: "\u827a\u672f/\u5a31\u4e50",
            12: "\u6cd5\u5f8b",
            14: "\u5efa\u7b51/\u623f\u4ea7",
            15: "\u96f6\u552e/\u8d38\u6613",
            16: "\u9152\u5e97\u65c5\u6e38",
            17: "\u73b0\u4ee3\u519c\u4e1a",
            18: "\u5728\u6821\u5b66\u751f",
            19: "\u4ea4\u901a\u8fd0\u8f93",
            20: "\u9910\u996e",
            21: "\u4f53\u80b2",
            22: "\u54a8\u8be2",
            23: "\u516c\u76ca",
            24: "\u81ea\u7531\u804c\u4e1a"
        },
        marriageStatus: {
            1: "\u672a\u5a5a",
            2: "\u79bb\u5f02",
            3: "\u4e27\u5076",
            4: "\u5df2\u5a5a"
        },
        marriageStatusFilter: {
            1: "\u672a\u5a5a",
            2: "\u79bb\u5f02",
            3: "\u4e27\u5076"
        },
        lookingFor: {
            1: "\u7ed3\u5a5a\u5bf9\u8c61",
            2: "\u604b\u4eba",
            3: "\u666e\u901a\u670b\u53cb",
            4: "\u77e5\u5df1"
        },
        house: {
            1: "\u5df2\u8d2d\u623f",
            2: "\u79df\u623f",
            3: "\u5355\u4f4d\u5bbf\u820d",
            4: "\u548c\u5bb6\u4eba\u540c\u4f4f"
        },
        birthOrder: {
            1: "\u72ec\u751f\u5b50\u5973",
            2: "\u8001\u5927",
            3: "\u8001\u4e8c",
            4: "\u8001\u4e09",
            5: "\u8001\u56db",
            6: "\u8001\u4e94\u53ca\u66f4\u5c0f",
            7: "\u8001\u5e7a"
        },
        childStatus: {
            1: "\u65e0\u5c0f\u5b69",
            2: "\u6709\u5c0f\u5b69\u5f52\u81ea\u5df1",
            3: "\u6709\u5c0f\u5b69\u5f52\u5bf9\u65b9"
        },
        religion: {
            1: "\u65e0\u5b97\u6559\u4fe1\u4ef0",
            2: "\u5927\u4e58\u4f5b\u6559\u663e\u5b97",
            3: "\u5927\u4e58\u4f5b\u6559\u5bc6\u5b97",
            4: "\u5927\u4e58\u4f5b\u6559\u51c0\u5b97",
            5: "\u5c0f\u4e58\u4f5b\u6559",
            6: "\u9053\u6559",
            7: "\u5112\u6559",
            8: "\u57fa\u7763\u6559\u5929\u4e3b\u6559\u6d3e",
            9: "\u57fa\u7763\u6559\u4e1c\u6b63\u6559\u6d3e",
            10: "\u57fa\u7763\u6559\u65b0\u6559\u6d3e",
            11: "\u72b9\u592a\u6559",
            12: "\u4f0a\u65af\u5170\u6559\u4ec0\u53f6\u6d3e",
            13: "\u4f0a\u65af\u5170\u6559\u900a\u5c3c\u6d3e",
            14: "\u5370\u5ea6\u6559",
            15: "\u795e\u9053\u6559",
            16: "\u8428\u6ee1\u6559",
            17: "\u5176\u4ed6\u6559\u6d3e"
        },
        car: {
            1: "\u5df2\u8d2d\u8f66",
            2: "\u672a\u8d2d\u8f66"
        },
        blood: {
            1: "A",
            2: "B",
            3: "AB",
            4: "O"
        },
        nationality: {
            1: "\u6c49",
            2: "\u8499\u53e4",
            3: "\u56de",
            4: "\u85cf",
            5: "\u7ef4\u543e\u5c14",
            6: "\u82d7",
            7: "\u5f5d",
            8: "\u58ee",
            9: "\u5e03\u4f9d",
            10: "\u671d\u9c9c",
            11: "\u6ee1",
            12: "\u4f97",
            13: "\u7476",
            14: "\u767d",
            15: "\u571f\u5bb6",
            16: "\u54c8\u5c3c",
            17: "\u54c8\u8428\u514b",
            18: "\u50a3",
            19: "\u9ece",
            20: "\u5088\u50f3",
            21: "\u4f64",
            22: "\u7572",
            23: "\u9ad8\u5c71",
            24: "\u62c9\u795c",
            25: "\u6c34",
            26: "\u4e1c\u4e61",
            27: "\u7eb3\u897f",
            28: "\u666f\u9887",
            29: "\u67ef\u5c14\u514b\u5b5c",
            30: "\u571f",
            31: "\u8fbe\u65a1\u5c14",
            32: "\u4eeb\u4f6c",
            33: "\u7f8c",
            34: "\u5e03\u6717",
            35: "\u6492\u62c9",
            36: "\u6bdb\u5357",
            37: "\u4ee1\u4f6c",
            38: "\u9521\u4f2f",
            39: "\u963f\u660c",
            40: "\u666e\u7c73",
            41: "\u5854\u5409\u514b",
            42: "\u6012",
            43: "\u4e4c\u5b5c\u522b\u514b",
            44: "\u4fc4\u7f57\u65af",
            45: "\u9102\u6e29\u514b",
            46: "\u5fb7\u6602",
            47: "\u4fdd\u5b89",
            48: "\u88d5\u56fa",
            49: "\u4eac",
            50: "\u5854\u5854\u5c14",
            51: "\u72ec\u9f99",
            52: "\u9102\u4f26\u6625",
            53: "\u8d6b\u54f2",
            54: "\u95e8\u5df4",
            55: "\u73de\u5df4",
            56: "\u57fa\u8bfa"
        },
        position: {
            1: "\u666e\u901a\u804c\u5458",
            2: "\u4e2d\u5c42\u7ba1\u7406\u8005",
            3: "\u9ad8\u5c42\u7ba1\u7406\u8005",
            4: "\u4f01\u4e1a\u4e3b",
            5: "\u5b66\u751f"
        },
        salary: {
            "-1": "2000\u5143\u4ee5\u4e0b",
            1: "2000-4000\u5143",
            2: "4000-6000\u5143",
            3: "6000-10000\u5143",
            4: "10000-15000\u5143",
            5: "15000-20000\u5143",
            6: "20000-50000\u5143",
            7: "50000\u5143\u4ee5\u4e0a"
        },
        salaryArray: [{
            key: -1,
            val: "2000\u5143\u4ee5\u4e0b"
        }, {
            key: 1,
            val: "2000-4000\u5143"
        }, {
            key: 2,
            val: "4000-6000\u5143"
        }, {
            key: 3,
            val: "6000-10000\u5143"
        }, {
            key: 4,
            val: "10000-15000\u5143"
        }, {
            key: 5,
            val: "15000-20000\u5143"
        }, {
            key: 6,
            val: "20000-50000\u5143"
        }, {
            key: 7,
            val: "50000\u5143\u4ee5\u4e0a"
        }],
        searchSalaryArray: [{
            key: -1,
            val: "2000\u5143\u4ee5\u4e0b"
        }, {
            key: 1,
            val: "2000\u5143\u4ee5\u4e0a"
        }, {
            key: 2,
            val: "4000\u5143\u4ee5\u4e0a"
        }, {
            key: 3,
            val: "6000\u5143\u4ee5\u4e0a"
        }, {
            key: 4,
            val: "10000\u5143\u4ee5\u4e0a"
        }, {
            key: 5,
            val: "15000\u5143\u4ee5\u4e0a"
        }, {
            key: 6,
            val: "20000\u5143\u4ee5\u4e0a"
        }, {
            key: 7,
            val: "50000\u5143\u4ee5\u4e0a"
        }],
        status: {
            1: "\u5bfb\u89c5\u5bf9\u8c61\u4e2d",
            3: "\u5df2\u6709\u5bf9\u8c61\uff0c\u4e0d\u518d\u5bfb\u89c5"
        },
        expDegree: {
            1: "\u5927\u4e13\u53ca\u4ee5\u4e0a",
            2: "\u672c\u79d1\u53ca\u4ee5\u4e0a",
            3: "\u7855\u58eb\u53ca\u4ee5\u4e0a",
            4: "\u535a\u58eb\u53ca\u4ee5\u4e0a"
        },
        expSalary: {
            "-1": 2e3,
            1: 4e3,
            2: 6e3,
            3: 1e4,
            4: 2e4,
            5: 5e4
        },
        expSalaryArray: [{
            key: -1,
            val: 2e3
        }, {
            key: 1,
            val: 4e3
        }, {
            key: 2,
            val: 6e3
        }, {
            key: 3,
            val: 1e4
        }, {
            key: 4,
            val: 2e4
        }, {
            key: 5,
            val: 5e4
        }],
        cooking: {
            1: "\u4f1a\u505a\u996d\uff0c\u5e0c\u671b\u5bf9\u65b9\u4e5f\u4f1a",
            2: "\u4f1a\u505a\u996d\uff0c\u5bf9\u53e6\u4e00\u534a\u6ca1\u8981\u6c42",
            3: "\u4e0d\u592a\u4f1a\uff0c\u5bf9\u53e6\u4e00\u534a\u6ca1\u8981\u6c42",
            4: "\u4e0d\u592a\u4f1a\uff0c\u5e0c\u671b\u5bf9\u65b9\u53a8\u827a\u6bd4\u6211\u597d"
        },
        arrangement: {
            1: "\u5de5\u4f5c\u65f6\u95f4\u56fa\u5b9a\uff0c\u4e0d\u63a5\u53d7\u5bf9\u65b9\u51fa\u5dee",
            2: "\u5de5\u4f5c\u65f6\u95f4\u56fa\u5b9a\uff0c\u4e0d\u4ecb\u610f\u5bf9\u65b9\u51fa\u5dee",
            3: "\u5de5\u4f5c\u7ecf\u5e38\u51fa\u5dee",
            4: "\u5de5\u4f5c\u5076\u5c14\u51fa\u5dee"
        },
        smoking: {
            1: "\u4e0d\u5438\u70df\uff0c\u4e14\u5f88\u53cd\u611f\u5438\u70df",
            2: "\u4e0d\u5438\u70df\uff0c\u4f46\u4e5f\u4e0d\u53cd\u611f",
            3: "\u5076\u5c14\u5438\u70df",
            4: "\u7ecf\u5e38\u5438\u70df"
        },
        drink: {
            1: "\u4e0d\u559d\u9152\uff0c\u4e14\u5f88\u53cd\u611f\u559d\u9152",
            2: "\u4e0d\u559d\u9152\uff0c\u4f46\u4e5f\u4e0d\u53cd\u611f",
            3: "\u793e\u4ea4\u9700\u8981\u65f6\u624d\u559d",
            4: "\u7ecf\u5e38\u559d\u9152"
        },
        loveAndMarriage: {
            1: "\u80fd\u63a5\u53d7\u95ea\u5a5a",
            2: "\u4e00\u5e74\u5185",
            3: "\u4e24\u5e74\u5185",
            4: "\u4e09\u5e74\u53ca\u4ee5\u4e0a",
            5: "\u6682\u65f6\u4e0d\u60f3\u7ed3\u5a5a"
        },
        needChild: {
            1: "\u60f3\u8981\u5b69\u5b50",
            2: "\u4e0d\u60f3\u8981\u5b69\u5b50",
            3: "\u89c6\u60c5\u51b5\u800c\u5b9a"
        },
        withParents: {
            1: "\u4e0d\u4ecb\u610f",
            2: "\u4ecb\u610f"
        },
        housework: {
            1: "\u8fd9\u662f\u59bb\u5b50\u7684\u5206\u5185\u4e8b",
            2: "\u592b\u59bb\u5e73\u5747\u5206\u914d",
            3: "\u8c01\u6709\u65f6\u95f4\u8c01\u505a",
            4: "\u592b\u59bb\u5404\u81ea\u627f\u62c5\u81ea\u5df1\u64c5\u957f\u7684\u5bb6\u52a1"
        },
        financial: {
            1: "\u7531\u592b\u59bb\u5171\u540c\u8ba1\u5212",
            2: "\u592b\u59bb\u5404\u81ea\u652f\u914d\u5404\u81ea\u7684\u6536\u5165",
            3: "\u7531\u59bb\u5b50\u6253\u7406",
            4: "\u7531\u4e08\u592b\u6253\u7406"
        },
        constellation: {
            1: "\u6469\u7faf",
            2: "\u6c34\u74f6",
            3: "\u53cc\u9c7c",
            4: "\u767d\u7f8a",
            5: "\u91d1\u725b",
            6: "\u53cc\u5b50",
            7: "\u5de8\u87f9",
            8: "\u72ee\u5b50",
            9: "\u5904\u5973",
            10: "\u5929\u79e4",
            11: "\u5929\u874e",
            12: "\u5c04\u624b"
        },
        zodiac: {
            1: "\u9f20",
            2: "\u725b",
            3: "\u864e",
            4: "\u5154",
            5: "\u9f99",
            6: "\u86c7",
            7: "\u9a6c",
            8: "\u7f8a",
            9: "\u7334",
            10: "\u9e21",
            11: "\u72d7",
            12: "\u732a"
        },
        height: function(a, b, c) {
            var d = {}
              , e = 1;
            b = b || 150,
            c = c || 210;
            for (var f = b; f <= c; f++)
                d[f] = f,
                e += 1;
            return d
        },
        age: function(a, b, c) {
            var d = {}
              , e = 1;
            b = b || 18,
            c = c || 60;
            for (var f = b; f <= c; f++)
                d[f] = f,
                e += 1;
            return d
        },
        city: {
            all: function() {
                return d.extend(this.mainland, this.overseas)
            },
            mainland: {
                1: "\u5317\u4eac",
                2: "\u4e0a\u6d77",
                3: "\u5929\u6d25",
                4: "\u91cd\u5e86",
                5: "\u6d59\u6c5f",
                6: "\u6c5f\u82cf",
                7: "\u5e7f\u4e1c",
                8: "\u798f\u5efa",
                9: "\u6e56\u5357",
                10: "\u6e56\u5317",
                11: "\u8fbd\u5b81",
                12: "\u5409\u6797",
                13: "\u9ed1\u9f99\u6c5f",
                14: "\u6cb3\u5317",
                15: "\u6cb3\u5357",
                16: "\u5c71\u4e1c",
                17: "\u9655\u897f",
                18: "\u7518\u8083",
                19: "\u9752\u6d77",
                20: "\u65b0\u7586",
                21: "\u5c71\u897f",
                22: "\u56db\u5ddd",
                23: "\u8d35\u5dde",
                24: "\u5b89\u5fbd",
                25: "\u6c5f\u897f",
                26: "\u4e91\u5357",
                27: "\u5185\u8499\u53e4",
                28: "\u5e7f\u897f",
                29: "\u897f\u85cf",
                30: "\u5b81\u590f",
                31: "\u6d77\u5357"
            },
            overseas: {
                32: "\u9999\u6e2f",
                33: "\u6fb3\u95e8",
                34: "\u53f0\u6e7e",
                35: "\u6d77\u5916",
                36: "\u5176\u4ed6\u5730\u533a"
            },
            opened: {
                1: "\u5317\u4eac",
                2: "\u4e0a\u6d77",
                "7-1": "\u5e7f\u5dde",
                "5-1": "\u676d\u5dde",
                "7-3": "\u6df1\u5733"
            },
            specialCity: {
                1: "\u5317\u4eac",
                2: "\u4e0a\u6d77",
                3: "\u5929\u6d25",
                4: "\u91cd\u5e86"
            },
            specialCities: [1, 2, 3, 4, 32, 33, 34, 36],
            city: {
                1: {
                    1: "\u4e1c\u57ce\u533a",
                    2: "\u897f\u57ce\u533a",
                    3: "\u5d07\u6587\u533a",
                    4: "\u5ba3\u6b66\u533a",
                    5: "\u671d\u9633\u533a",
                    6: "\u4e30\u53f0\u533a",
                    7: "\u77f3\u666f\u5c71\u533a",
                    8: "\u6d77\u6dc0\u533a",
                    9: "\u95e8\u5934\u6c9f\u533a",
                    10: "\u623f\u5c71\u533a",
                    11: "\u901a\u5dde\u533a",
                    12: "\u987a\u4e49\u533a",
                    13: "\u660c\u5e73\u533a",
                    14: "\u5927\u5174\u533a",
                    15: "\u6000\u67d4\u533a",
                    16: "\u5e73\u8c37\u533a",
                    17: "\u5bc6\u4e91\u53bf",
                    18: "\u5ef6\u5e86\u53bf"
                },
                2: {
                    1: "\u9ec4\u6d66\u533a",
                    2: "\u5362\u6e7e\u533a",
                    3: "\u5f90\u6c47\u533a",
                    4: "\u957f\u5b81\u533a",
                    5: "\u9759\u5b89\u533a",
                    6: "\u666e\u9640\u533a",
                    7: "\u95f8\u5317\u533a",
                    8: "\u8679\u53e3\u533a",
                    9: "\u6768\u6d66\u533a",
                    10: "\u95f5\u884c\u533a",
                    11: "\u5b9d\u5c71\u533a",
                    12: "\u5609\u5b9a\u533a",
                    13: "\u6d66\u4e1c\u65b0\u533a",
                    14: "\u91d1\u5c71\u533a",
                    15: "\u677e\u6c5f\u533a",
                    16: "\u9752\u6d66\u533a",
                    17: "\u5357\u6c47\u533a",
                    18: "\u5949\u8d24\u533a",
                    19: "\u5d07\u660e\u53bf"
                },
                3: {
                    1: "\u548c\u5e73\u533a",
                    2: "\u6cb3\u4e1c\u533a",
                    3: "\u6cb3\u897f\u533a",
                    4: "\u5357\u5f00\u533a",
                    5: "\u6cb3\u5317\u533a",
                    6: "\u7ea2\u6865\u533a",
                    7: "\u5858\u6cbd\u533a",
                    8: "\u6c49\u6cbd\u533a",
                    9: "\u5927\u6e2f\u533a",
                    10: "\u4e1c\u4e3d\u533a",
                    11: "\u897f\u9752\u533a",
                    12: "\u6d25\u5357\u533a",
                    13: "\u5317\u8fb0\u533a",
                    14: "\u6b66\u6e05\u533a",
                    15: "\u5b9d\u577b\u533a",
                    16: "\u5b81\u6cb3\u53bf",
                    17: "\u9759\u6d77\u53bf",
                    18: "\u84df\u53bf"
                },
                4: {
                    1: "\u4e07\u5dde\u533a",
                    2: "\u6daa\u9675\u533a",
                    3: "\u6e1d\u4e2d\u533a",
                    4: "\u5927\u6e21\u53e3\u533a",
                    5: "\u6c5f\u5317\u533a",
                    6: "\u6c99\u576a\u575d\u533a",
                    7: "\u4e5d\u9f99\u5761\u533a",
                    8: "\u5357\u5cb8\u533a",
                    9: "\u5317\u789a\u533a",
                    10: "\u4e07\u76db\u533a",
                    11: "\u53cc\u6865\u533a",
                    12: "\u6e1d\u5317\u533a",
                    13: "\u5df4\u5357\u533a",
                    14: "\u9ed4\u6c5f\u533a",
                    15: "\u957f\u5bff\u533a",
                    16: "\u7da6\u6c5f\u53bf",
                    17: "\u6f7c\u5357\u53bf",
                    18: "\u94dc\u6881\u53bf",
                    19: "\u5927\u8db3\u53bf",
                    20: "\u8363\u660c\u53bf",
                    21: "\u74a7\u5c71\u53bf",
                    22: "\u6881\u5e73\u53bf",
                    23: "\u57ce\u53e3\u53bf",
                    24: "\u4e30\u90fd\u53bf",
                    25: "\u57ab\u6c5f\u53bf",
                    26: "\u6b66\u9686\u53bf",
                    27: "\u5fe0\u53bf",
                    28: "\u5f00\u53bf",
                    29: "\u4e91\u9633\u53bf",
                    30: "\u5949\u8282\u53bf",
                    31: "\u5deb\u5c71\u53bf",
                    32: "\u5deb\u6eaa\u53bf",
                    33: "\u77f3\u67f1\u53bf",
                    34: "\u79c0\u5c71\u53bf",
                    35: "\u9149\u9633\u53bf",
                    36: "\u5f6d\u6c34\u53bf",
                    37: "\u6c5f\u6d25\u5e02",
                    38: "\u5408\u5ddd\u5e02",
                    39: "\u6c38\u5ddd\u5e02",
                    40: "\u5357\u5ddd\u5e02"
                },
                5: {
                    1: "\u676d\u5dde",
                    2: "\u5b81\u6ce2",
                    3: "\u6e29\u5dde",
                    4: "\u5609\u5174",
                    5: "\u6e56\u5dde",
                    6: "\u7ecd\u5174",
                    7: "\u91d1\u534e",
                    8: "\u8862\u5dde",
                    9: "\u821f\u5c71",
                    10: "\u53f0\u5dde",
                    11: "\u4e3d\u6c34"
                },
                6: {
                    1: "\u5357\u4eac",
                    2: "\u65e0\u9521",
                    3: "\u5f90\u5dde",
                    4: "\u5e38\u5dde",
                    5: "\u82cf\u5dde",
                    6: "\u5357\u901a",
                    7: "\u8fde\u4e91\u6e2f",
                    8: "\u6dee\u5b89",
                    9: "\u76d0\u57ce",
                    10: "\u626c\u5dde",
                    11: "\u9547\u6c5f",
                    12: "\u6cf0\u5dde",
                    13: "\u5bbf\u8fc1"
                },
                7: {
                    1: "\u5e7f\u5dde",
                    2: "\u97f6\u5173",
                    3: "\u6df1\u5733",
                    4: "\u73e0\u6d77",
                    5: "\u6c55\u5934",
                    6: "\u4f5b\u5c71",
                    7: "\u6c5f\u95e8",
                    8: "\u6e5b\u6c5f",
                    9: "\u8302\u540d",
                    10: "\u8087\u5e86",
                    11: "\u60e0\u5dde",
                    12: "\u6885\u5dde",
                    13: "\u6c55\u5c3e",
                    14: "\u6cb3\u6e90",
                    15: "\u9633\u6c5f",
                    16: "\u6e05\u8fdc",
                    17: "\u4e1c\u839e",
                    18: "\u4e2d\u5c71",
                    19: "\u6f6e\u5dde",
                    20: "\u63ed\u9633",
                    21: "\u4e91\u6d6e"
                },
                8: {
                    1: "\u798f\u5dde",
                    2: "\u53a6\u95e8",
                    3: "\u8386\u7530",
                    4: "\u4e09\u660e",
                    5: "\u6cc9\u5dde",
                    6: "\u6f33\u5dde",
                    7: "\u5357\u5e73",
                    8: "\u9f99\u5ca9",
                    9: "\u5b81\u5fb7"
                },
                9: {
                    1: "\u957f\u6c99",
                    2: "\u682a\u6d32",
                    3: "\u6e58\u6f6d",
                    4: "\u8861\u9633",
                    5: "\u90b5\u9633",
                    6: "\u5cb3\u9633",
                    7: "\u5e38\u5fb7",
                    8: "\u5f20\u5bb6\u754c",
                    9: "\u76ca\u9633",
                    10: "\u90f4\u5dde",
                    11: "\u6c38\u5dde",
                    12: "\u6000\u5316",
                    13: "\u5a04\u5e95",
                    14: "\u6e58\u897f"
                },
                10: {
                    1: "\u6b66\u6c49",
                    2: "\u9ec4\u77f3",
                    3: "\u5341\u5830",
                    4: "\u5b9c\u660c",
                    5: "\u8944\u6a0a",
                    6: "\u9102\u5dde",
                    7: "\u8346\u95e8",
                    8: "\u5b5d\u611f",
                    9: "\u8346\u5dde",
                    10: "\u9ec4\u5188",
                    11: "\u54b8\u5b81",
                    12: "\u968f\u5dde",
                    13: "\u6069\u65bd",
                    14: "\u4ed9\u6843",
                    15: "\u6f5c\u6c5f",
                    16: "\u5929\u95e8",
                    17: "\u795e\u519c\u67b6"
                },
                11: {
                    1: "\u6c88\u9633",
                    2: "\u5927\u8fde",
                    3: "\u978d\u5c71",
                    4: "\u629a\u987a",
                    5: "\u672c\u6eaa",
                    6: "\u4e39\u4e1c",
                    7: "\u9526\u5dde",
                    8: "\u8425\u53e3",
                    9: "\u961c\u65b0",
                    10: "\u8fbd\u9633",
                    11: "\u76d8\u9526",
                    12: "\u94c1\u5cad",
                    13: "\u671d\u9633",
                    14: "\u846b\u82a6\u5c9b"
                },
                12: {
                    1: "\u957f\u6625",
                    2: "\u5409\u6797",
                    3: "\u56db\u5e73",
                    4: "\u8fbd\u6e90",
                    5: "\u901a\u5316",
                    6: "\u767d\u5c71",
                    7: "\u677e\u539f",
                    8: "\u767d\u57ce",
                    9: "\u5ef6\u8fb9"
                },
                13: {
                    1: "\u54c8\u5c14\u6ee8",
                    2: "\u9f50\u9f50\u54c8\u5c14",
                    3: "\u9e21\u897f",
                    4: "\u9e64\u5c97",
                    5: "\u53cc\u9e2d\u5c71",
                    6: "\u5927\u5e86",
                    7: "\u4f0a\u6625",
                    8: "\u4f73\u6728\u65af",
                    9: "\u4e03\u53f0\u6cb3",
                    10: "\u7261\u4e39\u6c5f",
                    11: "\u9ed1\u6cb3",
                    12: "\u7ee5\u5316",
                    13: "\u5927\u5174\u5b89\u5cad"
                },
                14: {
                    1: "\u77f3\u5bb6\u5e84",
                    2: "\u5510\u5c71",
                    3: "\u79e6\u7687\u5c9b",
                    4: "\u90af\u90f8",
                    5: "\u90a2\u53f0",
                    6: "\u4fdd\u5b9a",
                    7: "\u5f20\u5bb6\u53e3",
                    8: "\u627f\u5fb7",
                    9: "\u6ca7\u5dde",
                    10: "\u5eca\u574a",
                    11: "\u8861\u6c34"
                },
                15: {
                    1: "\u90d1\u5dde",
                    2: "\u5f00\u5c01",
                    3: "\u6d1b\u9633",
                    4: "\u5e73\u9876\u5c71",
                    5: "\u5b89\u9633",
                    6: "\u9e64\u58c1",
                    7: "\u65b0\u4e61",
                    8: "\u7126\u4f5c",
                    9: "\u6fee\u9633",
                    10: "\u8bb8\u660c",
                    11: "\u6f2f\u6cb3",
                    12: "\u4e09\u95e8\u5ce1",
                    13: "\u5357\u9633",
                    14: "\u5546\u4e18",
                    15: "\u4fe1\u9633",
                    16: "\u5468\u53e3",
                    17: "\u9a7b\u9a6c\u5e97",
                    18: "\u6d4e\u6e90"
                },
                16: {
                    1: "\u6d4e\u5357",
                    2: "\u9752\u5c9b",
                    3: "\u6dc4\u535a",
                    4: "\u67a3\u5e84",
                    5: "\u4e1c\u8425",
                    6: "\u70df\u53f0",
                    7: "\u6f4d\u574a",
                    8: "\u6d4e\u5b81",
                    9: "\u6cf0\u5b89",
                    10: "\u5a01\u6d77",
                    11: "\u65e5\u7167",
                    12: "\u83b1\u829c",
                    13: "\u4e34\u6c82",
                    14: "\u5fb7\u5dde",
                    15: "\u804a\u57ce",
                    16: "\u6ee8\u5dde",
                    17: "\u83cf\u6cfd"
                },
                17: {
                    1: "\u897f\u5b89",
                    2: "\u94dc\u5ddd",
                    3: "\u5b9d\u9e21",
                    4: "\u54b8\u9633",
                    5: "\u6e2d\u5357",
                    6: "\u5ef6\u5b89",
                    7: "\u6c49\u4e2d",
                    8: "\u6986\u6797",
                    9: "\u5b89\u5eb7",
                    10: "\u5546\u6d1b"
                },
                18: {
                    1: "\u5170\u5dde",
                    2: "\u5609\u5cea\u5173",
                    3: "\u91d1\u660c",
                    4: "\u767d\u94f6",
                    5: "\u5929\u6c34",
                    6: "\u6b66\u5a01",
                    7: "\u5f20\u6396",
                    8: "\u5e73\u51c9",
                    9: "\u9152\u6cc9",
                    10: "\u5e86\u9633",
                    11: "\u5b9a\u897f",
                    12: "\u9647\u5357",
                    13: "\u4e34\u590f",
                    14: "\u7518\u5357"
                },
                19: {
                    1: "\u897f\u5b81",
                    2: "\u6d77\u4e1c",
                    3: "\u6d77\u5317",
                    4: "\u9ec4\u5357",
                    5: "\u6d77\u5357",
                    6: "\u679c\u6d1b",
                    7: "\u7389\u6811",
                    8: "\u6d77\u897f"
                },
                20: {
                    1: "\u4e4c\u9c81\u6728\u9f50",
                    2: "\u514b\u62c9\u739b\u4f9d",
                    3: "\u5410\u9c81\u756a",
                    4: "\u54c8\u5bc6",
                    5: "\u660c\u5409",
                    6: "\u535a\u5c14\u5854\u62c9",
                    7: "\u5df4\u97f3\u90ed\u695e",
                    8: "\u963f\u514b\u82cf",
                    9: "\u514b\u5b5c\u52d2\u82cf",
                    10: "\u5580\u4ec0",
                    11: "\u548c\u7530",
                    12: "\u4f0a\u7281",
                    13: "\u5854\u57ce",
                    14: "\u963f\u52d2\u6cf0",
                    15: "\u77f3\u6cb3\u5b50",
                    16: "\u963f\u62c9\u5c14",
                    17: "\u56fe\u6728\u8212\u514b",
                    18: "\u4e94\u5bb6\u6e20"
                },
                21: {
                    1: "\u592a\u539f",
                    2: "\u5927\u540c",
                    3: "\u9633\u6cc9",
                    4: "\u957f\u6cbb",
                    5: "\u664b\u57ce",
                    6: "\u6714\u5dde",
                    7: "\u664b\u4e2d",
                    8: "\u8fd0\u57ce",
                    9: "\u5ffb\u5dde",
                    10: "\u4e34\u6c7e",
                    11: "\u5415\u6881"
                },
                22: {
                    1: "\u6210\u90fd",
                    2: "\u81ea\u8d21",
                    3: "\u6500\u679d\u82b1",
                    4: "\u6cf8\u5dde",
                    5: "\u5fb7\u9633",
                    6: "\u7ef5\u9633",
                    7: "\u5e7f\u5143",
                    8: "\u9042\u5b81",
                    9: "\u5185\u6c5f",
                    10: "\u4e50\u5c71",
                    11: "\u5357\u5145",
                    12: "\u7709\u5c71",
                    13: "\u5b9c\u5bbe",
                    14: "\u5e7f\u5b89",
                    15: "\u8fbe\u5dde",
                    16: "\u96c5\u5b89",
                    17: "\u5df4\u4e2d",
                    18: "\u8d44\u9633",
                    19: "\u963f\u575d",
                    20: "\u7518\u5b5c",
                    21: "\u51c9\u5c71"
                },
                23: {
                    1: "\u8d35\u9633",
                    2: "\u516d\u76d8\u6c34",
                    3: "\u9075\u4e49",
                    4: "\u5b89\u987a",
                    5: "\u94dc\u4ec1",
                    6: "\u9ed4\u897f\u5357",
                    7: "\u6bd5\u8282",
                    8: "\u9ed4\u4e1c\u5357",
                    9: "\u9ed4\u5357"
                },
                24: {
                    1: "\u5408\u80a5",
                    2: "\u829c\u6e56",
                    3: "\u868c\u57e0",
                    4: "\u6dee\u5357",
                    5: "\u9a6c\u978d\u5c71",
                    6: "\u6dee\u5317",
                    7: "\u94dc\u9675",
                    8: "\u5b89\u5e86",
                    9: "\u9ec4\u5c71",
                    10: "\u6ec1\u5dde",
                    11: "\u961c\u9633",
                    12: "\u5bbf\u5dde",
                    13: "\u5de2\u6e56",
                    14: "\u516d\u5b89",
                    15: "\u4eb3\u5dde",
                    16: "\u6c60\u5dde",
                    17: "\u5ba3\u57ce"
                },
                25: {
                    1: "\u5357\u660c",
                    2: "\u666f\u5fb7\u9547",
                    3: "\u840d\u4e61",
                    4: "\u4e5d\u6c5f",
                    5: "\u65b0\u4f59",
                    6: "\u9e70\u6f6d",
                    7: "\u8d63\u5dde",
                    8: "\u5409\u5b89",
                    9: "\u5b9c\u6625",
                    10: "\u629a\u5dde",
                    11: "\u4e0a\u9976"
                },
                26: {
                    1: "\u6606\u660e",
                    2: "\u66f2\u9756",
                    3: "\u7389\u6eaa",
                    4: "\u4fdd\u5c71",
                    5: "\u662d\u901a",
                    6: "\u4e3d\u6c5f",
                    7: "\u666e\u6d31",
                    8: "\u4e34\u6ca7",
                    9: "\u695a\u96c4",
                    10: "\u7ea2\u6cb3",
                    11: "\u6587\u5c71",
                    12: "\u897f\u53cc\u7248\u7eb3",
                    13: "\u5927\u7406",
                    14: "\u5fb7\u5b8f",
                    15: "\u6012\u6c5f",
                    16: "\u8fea\u5e86"
                },
                27: {
                    1: "\u547c\u548c\u6d69\u7279",
                    2: "\u5305\u5934",
                    3: "\u4e4c\u6d77",
                    4: "\u8d64\u5cf0",
                    5: "\u901a\u8fbd",
                    6: "\u9102\u5c14\u591a\u65af",
                    7: "\u547c\u4f26\u8d1d\u5c14",
                    8: "\u5df4\u5f66\u6dd6\u5c14",
                    9: "\u4e4c\u5170\u5bdf\u5e03\u76df",
                    10: "\u5174\u5b89\u76df",
                    11: "\u9521\u6797\u90ed\u52d2\u76df",
                    12: "\u963f\u62c9\u5584\u76df"
                },
                28: {
                    1: "\u5357\u5b81",
                    2: "\u67f3\u5dde",
                    3: "\u6842\u6797",
                    4: "\u68a7\u5dde",
                    5: "\u5317\u6d77",
                    6: "\u9632\u57ce\u6e2f",
                    7: "\u94a6\u5dde",
                    8: "\u8d35\u6e2f",
                    9: "\u7389\u6797",
                    10: "\u767e\u8272",
                    11: "\u8d3a\u5dde",
                    12: "\u6cb3\u6c60",
                    13: "\u6765\u5bbe",
                    14: "\u5d07\u5de6"
                },
                29: {
                    1: "\u62c9\u8428",
                    2: "\u660c\u90fd",
                    3: "\u5c71\u5357",
                    4: "\u65e5\u5580\u5219",
                    5: "\u90a3\u66f2",
                    6: "\u963f\u91cc",
                    7: "\u6797\u829d"
                },
                30: {
                    1: "\u94f6\u5ddd",
                    2: "\u77f3\u5634\u5c71",
                    3: "\u5434\u5fe0",
                    4: "\u56fa\u539f",
                    5: "\u4e2d\u536b"
                },
                31: {
                    1: "\u6d77\u53e3",
                    2: "\u4e09\u4e9a",
                    3: "\u4e94\u6307\u5c71",
                    4: "\u743c\u6d77",
                    5: "\u510b\u5dde",
                    6: "\u6587\u660c",
                    7: "\u4e07\u5b81",
                    8: "\u4e1c\u65b9",
                    9: "\u5b9a\u5b89",
                    10: "\u5c6f\u660c",
                    11: "\u6f84\u8fc8",
                    12: "\u4e34\u9ad8",
                    13: "\u767d\u6c99",
                    14: "\u660c\u6c5f",
                    15: "\u4e50\u4e1c",
                    16: "\u9675\u6c34",
                    17: "\u4fdd\u4ead",
                    18: "\u743c\u4e2d",
                    19: "\u897f\u6c99\u7fa4\u5c9b",
                    20: "\u5357\u6c99\u7fa4\u5c9b",
                    21: "\u4e2d\u6c99\u7fa4\u5c9b"
                },
                32: {
                    1: "\u4e2d\u897f\u533a",
                    2: "\u4e1c\u533a",
                    3: "\u4e5d\u9f99\u57ce\u533a",
                    4: "\u89c2\u5858\u533a",
                    5: "\u5357\u533a",
                    6: "\u6df1\u6c34\u57d7\u533a",
                    7: "\u9ec4\u5927\u4ed9\u533a",
                    8: "\u6e7e\u4ed4\u533a",
                    9: "\u6cb9\u5c16\u65fa\u533a",
                    10: "\u79bb\u5c9b\u533a",
                    11: "\u8475\u9752\u533a",
                    12: "\u5317\u533a",
                    13: "\u897f\u8d21\u533a",
                    14: "\u6c99\u7530\u533a",
                    15: "\u5c6f\u95e8\u533a",
                    16: "\u5927\u57d4\u533a",
                    17: "\u8343\u6e7e\u533a",
                    18: "\u5143\u6717\u533a"
                },
                33: {
                    1: "\u6fb3\u95e8"
                },
                34: {
                    1: "\u53f0\u5317\u5e02",
                    2: "\u9ad8\u96c4\u5e02",
                    3: "\u57fa\u9686\u5e02",
                    4: "\u53f0\u4e2d\u5e02",
                    5: "\u53f0\u5357\u5e02",
                    6: "\u65b0\u7af9\u5e02",
                    7: "\u5609\u4e49\u5e02",
                    9: "\u53f0\u5317\u53bf",
                    10: "\u5b9c\u5170\u53bf",
                    11: "\u6843\u56ed\u53bf",
                    12: "\u65b0\u7af9\u53bf",
                    13: "\u82d7\u6817\u53bf",
                    14: "\u53f0\u4e2d\u53bf",
                    15: "\u5f70\u5316\u53bf",
                    16: "\u5357\u6295\u53bf",
                    17: "\u4e91\u6797\u53bf",
                    18: "\u5609\u4e49\u53bf",
                    19: "\u53f0\u5357\u53bf",
                    20: "\u9ad8\u96c4\u53bf",
                    21: "\u5c4f\u4e1c\u53bf",
                    22: "\u6f8e\u6e56\u53bf",
                    23: "\u53f0\u4e1c\u53bf",
                    24: "\u82b1\u83b2\u53bf"
                },
                35: {
                    1: "\u7f8e\u56fd",
                    2: "\u52a0\u62ff\u5927",
                    3: "\u6fb3\u5927\u5229\u4e9a",
                    4: "\u65b0\u897f\u5170",
                    5: "\u82f1\u56fd",
                    6: "\u6cd5\u56fd",
                    7: "\u5fb7\u56fd",
                    8: "\u6377\u514b",
                    9: "\u8377\u5170",
                    10: "\u745e\u58eb",
                    11: "\u5e0c\u814a",
                    12: "\u632a\u5a01",
                    13: "\u745e\u5178",
                    14: "\u4e39\u9ea6",
                    15: "\u82ac\u5170",
                    16: "\u7231\u5c14\u5170",
                    17: "\u5965\u5730\u5229",
                    18: "\u610f\u5927\u5229",
                    19: "\u4e4c\u514b\u5170",
                    20: "\u4fc4\u7f57\u65af",
                    21: "\u897f\u73ed\u7259",
                    22: "\u97e9\u56fd",
                    23: "\u65b0\u52a0\u5761",
                    24: "\u9a6c\u6765\u897f\u4e9a",
                    25: "\u5370\u5ea6",
                    26: "\u6cf0\u56fd",
                    27: "\u65e5\u672c",
                    28: "\u5df4\u897f",
                    29: "\u963f\u6839\u5ef7",
                    30: "\u5357\u975e",
                    31: "\u57c3\u53ca"
                },
                36: {
                    1: "\u5176\u4ed6\u5730\u533a"
                }
            }
        },
        mobileNation: {
            "0086": "\u4e2d\u56fd\u5927\u9646+86",
            "00852": "\u4e2d\u56fd\u9999\u6e2f+852",
            "00853": "\u4e2d\u56fd\u6fb3\u95e8+853",
            "00886": "\u4e2d\u56fd\u53f0\u6e7e+886",
            "001": "\u7f8e\u56fd/\u52a0\u62ff\u5927+1",
            "0060": "\u9a6c\u6765\u897f\u4e9a+60",
            "0061": "\u6fb3\u5927\u5229\u4e9a+61",
            "0081": "\u65e5\u672c+81",
            "0082": "\u97e9\u56fd+82",
            "0065": "\u65b0\u52a0\u5761+65",
            "0044": "\u82f1\u56fd+44",
            "0033": "\u6cd5\u56fd+33",
            "007": "\u4fc4\u7f57\u65af+7",
            "0066": "\u6cf0\u56fd+66",
            "0049": "\u5fb7\u56fd+49",
            "0064": "\u65b0\u897f\u5170+64",
            "0091": "\u5370\u5ea6+91"
        },
        reqCredit: {
            1: "\u4e2d\u7ea7\u53ca\u4ee5\u4e0a",
            2: "\u53ea\u770b\u9ad8\u7ea7"
        },
        reqLoginTime: {
            1: "\u5f53\u524d\u5728\u7ebf",
            2: "3\u5929\u5185\u767b\u5f55\u8fc7"
        }
    };
    return e
});
define("utils/statistic/userStatistic", function(a, b, c) {
    "use strict";
    var d = a("lib/zepto")
      , e = a("model/UserData")
      , f = {
        eventName: {
            REGISTER: "register",
            WEDDING: "wedding",
            ACTIVITY520: "activity520",
            SUPERHERO: "superhero",
            FRIENDSTAG: "friendsTag",
            LOVE_CAFE: "loveCafe"
        },
        tagName: {
            WEDDING_HOMEPAGE_VISIT: "wedding_homepage_visit",
            WEDDING_CONTENT_VISIT: "wedding_content_visit",
            WEDDING_CREATE: "wedding_create",
            WEDDING_SHARE: "wedding_share",
            WEDDING_COMMENT_CREATE: "wedding_comment_create",
            ACTIVITY520_SHARE: "activity520_share",
            ACTIVITY520_DOWNLOAD: "activity520_download",
            SUPERHERO_SHARE: "superhero_share",
            SUPERHERO_TEST: "superhero_test",
            FRIENDSTAG_WXFRIENDS: "friendsTag_wxfriends",
            FRIENDSTAG_WXMOMENTS: "friendsTag_wxmoments",
            PAGE_CLICK: "page_click",
            OPEN_APP: "open_app",
            DOWNLOAD: "download"
        },
        doStatistic: function(a, b, c) {
            var g = !1, h = !1, i;
            c = c || "web";
            for (i in f.eventName)
                if (f.eventName.hasOwnProperty(i) && f.eventName[i] === a) {
                    g = !0;
                    break
                }
            for (i in f.tagName)
                if (f.tagName.hasOwnProperty(i) && f.tagName[i] === b) {
                    h = !0;
                    break
                }
            if (g && h) {
                var j = e.getLoginUser()
                  , k = {
                    event: a,
                    tag: b,
                    origin: c
                };
                j && (k.uid = j.id),
                d.getJSON("/api/user/statistic", k, function() {})
            }
        }
    };
    return f
});
define("model/UserData", function(a, b, c) {
    var d = a("lib/zepto")
      , e = null
      , f = {
        init: function() {
            this.setLoginUser()
        },
        getLoginUser: function() {
            return e
        },
        setLoginUser: function(a) {
            if (a)
                e = a;
            else
                try {
                    a = JSON.parse(d("#data_loginUser").html()),
                    e = a
                } catch (b) {
                    e = null
                }
        }
    };
    f.init();
    return f
});
define("utils/statistic/DAStatistic", function(a, b, c) {
    "use strict";
    var d = a("model/UserData")
      , e = a("utils/Utils")
      , f = {
        init: function() {
            if (!g) {
                var a = CONFIG.DATrackerConfig || {
                    truncateLength: 255,
                    persistence: "localStorage",
                    cross_subdomain_cookie: !1
                };
                DATracker.init("MA-94A1-BB29DC5DA865", a);
                var b = d.getLoginUser();
                if (!b && DATracker.get_user_id())
                    DATracker.logout();
                else if (b && DATracker.get_user_id() !== b.id) {
                    DATracker.login(b.id);
                    var c = {
                        nickName: b.nickName,
                        $region: e.selectValue("province", b.province, !1, ""),
                        $province: e.selectValue("province", b.province, !1, ""),
                        $city: e.selectValue("city", b.province + "-" + b.city, !1, ""),
                        $age: b.age,
                        $gender: e.selectValue("sex", b.sex, !1, ""),
                        creditLevel: b.creditLevel,
                        createdTime: e.format("yyyy-MM-dd HH:mm", b.createdTime)
                    };
                    DATracker.people.set(c)
                }
                g = !0
            }
        },
        eventName: {
            PageView: "PageView",
            VISIT_FROM_EMAIL: "VISIT_FROM_EMAIL",
            VISIT_FROM_MESSAGE: "VISIT_FROM_MESSAGE",
            view_people: "view_people",
            view_onepost: "view_onepost",
            view_vippage: "view_vippage",
            view_chargepage: "view_chargepage",
            VIEW_3G_PAGE: "VIEW_3G_PAGE",
            SLIDE_TO_BOTTOM: "SLIDE_TO_BOTTOM",
            CLICK_OPEN_APP: "CLICK_OPEN_APP",
            BANNER_OPEN_APP: "BANNER_OPEN_APP",
            BANNER_SLIDER_USER: "BANNER_SLIDER_USER",
            SINGLEDAY2017_BEGIN: "SINGLEDAY2017_BEGIN",
            SINGLEDAY2017_REPLAY: "SINGLEDAY2017_REPLAY",
            SINGLEDAY2017_SHARE: "SINGLEDAY2017_SHARE",
            SINGLEDAY2017_DOWNLOAD: "SINGLEDAY2017_DOWNLOAD",
            SINGLEDAY2017_TEL_BOOTH: "SINGLEDAY2017_TEL_BOOTH",
            VIEW_LOGIN_PAGE: "VIEW_LOGIN_PAGE",
            STORY2017_VIEW: "STORY2017_VIEW",
            STORY2017_CREATE_RESULT: "STORY2017_CREATE_RESULT",
            STORY2017_BEGIN_TEST: "STORY2017_BEGIN_TEST",
            STORY2017_REPLAY: "STORY2017_REPLAY",
            H5_SPECIAL_VOICE_RECORD: "H5_SPECIAL_VOICE_RECORD",
            H5_SPECIAL_VOICE_RETURN: "H5_SPECIAL_VOICE_RETURN",
            H5_SPECIAL_VOICE_SHARE: "H5_SPECIAL_VOICE_SHARE",
            H5_SPECIAL_VOICE_TO3G: "H5_SPECIAL_VOICE_TO3G",
            VISIT_H5_SPECIAL_VOICE: "VISIT_H5_SPECIAL_VOICE",
            VISIT_H5_SPECIAL_VOICE_RESULT: "VISIT_H5_SPECIAL_VOICE_RESULT",
            VISIT_H5_SPECIAL_VALENTINE_GUESS: "VISIT_H5_SPECIAL_VALENTINE_GUESS",
            VISIT_H5_SPECIAL_VALENTINE_SHARE: "VISIT_H5_SPECIAL_VALENTINE_SHARE",
            VISIT_H5_SPECIAL_VALENTINE_STAT_SHARE: "VISIT_H5_SPECIAL_VALENTINE_STAT_SHARE",
            VISIT_H5_SPECIAL_VALENTINE_TOP_LINK: "VISIT_H5_SPECIAL_VALENTINE_TOP_LINK",
            VISIT_H5_SPECIAL_VALENTINE_H5_LINK: "VISIT_H5_SPECIAL_VALENTINE_H5_LINK",
            VISIT_H5_SPECIAL_NEUROPATHY: "VISIT_H5_SPECIAL_NEUROPATHY",
            VISIT_H5_SPECIAL_NEUROPATHY_LINK: "VISIT_H5_SPECIAL_NEUROPATHY_LINK",
            VISIT_H5_SPECIAL_NEUROPATHY_REPLAY: "VISIT_H5_SPECIAL_NEUROPATHY_REPLAY",
            VISIT_H5_SPECIAL_NEUROPATHY_PLAY: "VISIT_H5_SPECIAL_NEUROPATHY_PLAY",
            VISIT_H5_SPECIAL_NEUROPATHY_SHARE: "VISIT_H5_SPECIAL_NEUROPATHY_SHARE",
            VISIT_H5_SPECIAL_NEUROPATHY_ANSWER: "VISIT_H5_SPECIAL_NEUROPATHY_ANSWER",
            VISIT_H5_SPECIAL_NEUROPATHY_CHECKNAME: "VISIT_H5_SPECIAL_NEUROPATHY_CHECKNAME",
            VISIT_H5_SPECIAL_NEUROPATHY_BEGIN: "VISIT_H5_SPECIAL_NEUROPATHY_BEGIN",
            H5_SPECIAL_WILDER_CHECK: "H5_SPECIAL_WILDER_CHECK",
            LOVEPRODUCER_VIEW: "LOVEPRODUCER_VIEW",
            LOVEPRODUCER_CREATE_RESULT: "LOVEPRODUCER_CREATE_RESULT",
            LOVEPRODUCER_BEGIN_TEST: "LOVEPRODUCER_BEGIN_TEST",
            LOVEPRODUCER_SHARE: "LOVEPRODUCER_SHARE",
            LOVEPRODUCER_CHOOSE_SEX: "LOVEPRODUCER_CHOOSE_SEX",
            LOVEPRODUCER_CHOOSE_ANSWER: "LOVEPRODUCER_CHOOSE_ANSWER",
            LOVEINSTITUTE_VISIT: "LOVEINSTITUTE_VISIT",
            LOVEINSTITUTE_LOADIMG: "LOVEINSTITUTE_LOADIMG",
            VISIT_H5_SPECIAL_VALENTINEUP: "VISIT_H5_SPECIAL_VALENTINEUP",
            H5_SPECIAL_VALENTINEUP_FB: "H5_SPECIAL_VALENTINEUP_FB",
            H5_SPECIAL_VALENTINEUP_DT: "H5_SPECIAL_VALENTINEUP_DT",
            H5_SPECIAL_VALENTINEUP_RZ: "H5_SPECIAL_VALENTINEUP_RZ",
            H5_SPECIAL_VALENTINEUP_CL: "H5_SPECIAL_VALENTINEUP_CL",
            H5_SPECIAL_VALENTINEUP_GIFT: "H5_SPECIAL_VALENTINEUP_GIFT",
            H5_SPECIAL_VALENTINEUP_TB: "H5_SPECIAL_VALENTINEUP_TB",
            H5_SPECIAL_VALENTINEUP_RW: "H5_SPECIAL_VALENTINEUP_RW",
            VISIT_H5_SPECIAL_GRIL: "VISIT_H5_SPECIAL_GRIL",
            H5_SPECIAL_GRIL_FB: "H5_SPECIAL_GRIL_FB",
            H5_SPECIAL_GRIL_DT: "H5_SPECIAL_GRIL_DT",
            H5_SPECIAL_GRIL_RZ: "H5_SPECIAL_GRIL_RZ",
            H5_SPECIAL_GRIL_CL: "H5_SPECIAL_GRIL_CL",
            H5_SPECIAL_GRIL_GIFT: "H5_SPECIAL_GRIL_GIFT",
            H5_SPECIAL_GRIL_TB: "H5_SPECIAL_GRIL_TB",
            H5_SPECIAL_GRIL_RW: "H5_SPECIAL_GRIL_RW",
            VISIT_H5_SPECIAL_INVITE: "VISIT_H5_SPECIAL_INVITE",
            H5_SPECIAL_INVITE_DOWNLOADBTN: "H5_SPECIAL_INVITE_DOWNLOADBTN",
            H5_SPECIAL_INVITE_MUSTLOGIN: "H5_SPECIAL_INVITE_MUSTLOGIN",
            H5_SPECIAL_INVITE_SHAREBTN: "H5_SPECIAL_INVITE_SHAREBTN",
            VISIT_H5_SPECIAL_GODDESS_BEGIN: "VISIT_H5_SPECIAL_GODDESS_BEGIN",
            H5_SPECIAL_GODDESS_BEGINBTN: "H5_SPECIAL_GODDESS_BEGINBTN",
            VISIT_H5_SPECIAL_GODDESS_RESULT: "VISIT_H5_SPECIAL_GODDESS_RESULT",
            VISIT_H5_SPECIAL_GODDESS_SHARE: "VISIT_H5_SPECIAL_GODDESS_SHARE",
            VISIT_H5_SPECIAL_GODDESS_DOWNLOAD: "VISIT_H5_SPECIAL_GODDESS_DOWNLOAD",
            VISIT_H5_SPECIAL_GODDESS_ANSWER: "VISIT_H5_SPECIAL_GODDESS_ANSWER",
            course_view: "course_view",
            Psychological_test: "Psychological_test",
            Psychological_test_start: "Psychological_test_start",
            Psychological_test_paysuccess: "Psychological_test_paysuccess",
            Psychological_test_alldone: "Psychological_test_alldone",
            Psychological_test_download: "Psychological_test_download",
            Psychological_test_result_download: "Psychological_test_result_download",
            Psychological_test_result_share: "Psychological_test_result_share",
            Psychological_test_to_test: "Psychological_test_to_test",
            Psychological_test_code: "Psychological_test_code",
            Psychological_test_more: "Psychological_test_more",
            Psychological_test_img: "Psychological_test_img",
            Psychological_test_freeExamExchangeSuccess: "Psychological_test_freeExamExchangeSuccess",
            consult_visit: "consult_visit",
            consult_retrieve_test: "consult_retrieve_test",
            consult_call: "consult_call",
            consult_chat_online: "consult_chat_online",
            consult_first_aid: "consult_first_aid",
            Psychological_test2: "Psychological_test2",
            Psychological_test2_start: "Psychological_test2_start",
            Psychological_test2_paysuccess: "Psychological_test2_paysuccess",
            Psychological_test2_alldone: "Psychological_test2_alldone",
            Psychological_test2_download: "Psychological_test2_download",
            Psychological_test2_result_download: "Psychological_test2_result_download",
            Psychological_test2_result_share: "Psychological_test2_result_share",
            Psychological_test3: "Psychological_test3",
            Psychological_test3_start: "Psychological_test3_start",
            Psychological_test3_paysuccess: "Psychological_test3_paysuccess",
            Psychological_test3_alldone: "Psychological_test3_alldone",
            Psychological_test3_download: "Psychological_test3_download",
            Psychological_test3_result_download: "Psychological_test3_result_download",
            Psychological_test3_result_share: "Psychological_test3_result_share",
            VISIT_H5_SPECIAL_SELFHOOD_BEGIN: "VISIT_H5_SPECIAL_SELFHOOD_BEGIN",
            VISIT_H5_SPECIAL_SELFHOOD_RESULT: "VISIT_H5_SPECIAL_SELFHOOD_RESULT",
            VISIT_H5_SPECIAL_SELFHOOD_BEGINBTN: "VISIT_H5_SPECIAL_SELFHOOD_BEGINBTN",
            VISIT_H5_SPECIAL_SELFHOOD_SHARE: "VISIT_H5_SPECIAL_SELFHOOD_SHARE",
            VISIT_H5_SPECIAL_SELFHOOD_AGAINBTN: "VISIT_H5_SPECIAL_SELFHOOD_AGAINBTN",
            VISIT_H5_SPECIAL_SELFHOOD_WEIXIN: "VISIT_H5_SPECIAL_SELFHOOD_WEIXIN",
            VISIT_H5_SPECIAL_SELFHOOD_OPENOTHERURL: "VISIT_H5_SPECIAL_SELFHOOD_OPENOTHERURL",
            Psychological_test4: "Psychological_test4",
            Psychological_test4_start: "Psychological_test4_start",
            Psychological_test4_paysuccess: "Psychological_test4_paysuccess",
            Psychological_test4_alldone: "Psychological_test4_alldone",
            Psychological_test4_download: "Psychological_test4_download",
            Psychological_test4_result_download: "Psychological_test4_result_download",
            Psychological_test4_result_share: "Psychological_test4_result_share",
            Psychological_test5: "Psychological_test5",
            Psychological_test5_start: "Psychological_test5_start",
            Psychological_test5_paysuccess: "Psychological_test5_paysuccess",
            Psychological_test5_alldone: "Psychological_test5_alldone",
            Psychological_test5_download: "Psychological_test5_download",
            Psychological_test5_result_download: "Psychological_test5_result_download",
            Psychological_test5_result_share: "Psychological_test5_result_share",
            Psychological_test6: "Psychological_test6",
            Psychological_test6_start: "Psychological_test6_start",
            Psychological_test6_paysuccess: "Psychological_test6_paysuccess",
            Psychological_test6_alldone: "Psychological_test6_alldone",
            Psychological_test6_download: "Psychological_test6_download",
            Psychological_test6_result_download: "Psychological_test6_result_download",
            Psychological_test6_result_share: "Psychological_test6_result_share",
            Psychological_test7: "Psychological_test7",
            Psychological_test7_start: "Psychological_test7_start",
            Psychological_test7_paysuccess: "Psychological_test7_paysuccess",
            Psychological_test7_alldone: "Psychological_test7_alldone",
            Psychological_test7_download: "Psychological_test7_download",
            Psychological_test7_result_download: "Psychological_test7_result_download",
            Psychological_test7_result_share: "Psychological_test7_result_share",
            loveLobPage: "loveLobPage",
            playTogetherPage: "playTogetherPage",
            Psychological_test8: "Psychological_test8",
            Psychological_test8_start: "Psychological_test8_start",
            Psychological_test8_paysuccess: "Psychological_test8_paysuccess",
            Psychological_test8_alldone: "Psychological_test8_alldone",
            Psychological_test8_download: "Psychological_test8_download",
            Psychological_test8_result_download: "Psychological_test8_result_download",
            Psychological_test8_result_share: "Psychological_test8_result_share",
            Psychological_test9: "Psychological_test9",
            Psychological_test9_start: "Psychological_test9_start",
            Psychological_test9_paysuccess: "Psychological_test9_paysuccess",
            Psychological_test9_alldone: "Psychological_test9_alldone",
            Psychological_test9_download: "Psychological_test9_download",
            Psychological_test9_result_download: "Psychological_test9_result_download",
            Psychological_test9_result_share: "Psychological_test9_result_share",
            STORY2018_VIEW: "STORY2018_VIEW",
            STORY2018_CREATE_RESULT: "STORY2018_CREATE_RESULT",
            STORY2018_BEGIN_TEST: "STORY2018_BEGIN_TEST",
            STORY2018_REPLAY: "STORY2018_REPLAY",
            Psychological_test10: "Psychological_test10",
            Psychological_test10_start: "Psychological_test10_start",
            Psychological_test10_paysuccess: "Psychological_test10_paysuccess",
            Psychological_test10_alldone: "Psychological_test10_alldone",
            Psychological_test10_download: "Psychological_test10_download",
            Psychological_test10_result_download: "Psychological_test10_result_download",
            Psychological_test10_result_share: "Psychological_test10_result_share",
            Psychological_test11: "Psychological_test11",
            Psychological_test11_start: "Psychological_test11_start",
            Psychological_test11_paysuccess: "Psychological_test11_paysuccess",
            Psychological_test11_alldone: "Psychological_test11_alldone",
            Psychological_test11_download: "Psychological_test11_download",
            Psychological_test11_result_download: "Psychological_test11_result_download",
            Psychological_test11_result_share: "Psychological_test11_result_share",
            Psychological_test12: "Psychological_test12",
            Psychological_test12_start: "Psychological_test12_start",
            Psychological_test12_paysuccess: "Psychological_test12_paysuccess",
            Psychological_test12_alldone: "Psychological_test12_alldone",
            Psychological_test12_download: "Psychological_test12_download",
            Psychological_test12_result_download: "Psychological_test12_result_download",
            Psychological_test12_result_share: "Psychological_test12_result_share",
            STORY2019_VIEW_ENTER: "STORY2019_VIEW_ENTER",
            STORY2019_VIEW_RESULT: "STORY2019_VIEW_RESULT",
            STORY2019_CREATE_RESULT: "STORY2019_CREATE_RESULT",
            STORY2019_BEGIN_TEST: "STORY2019_BEGIN_TEST",
            STORY2019_REPLAY: "STORY2019_REPLAY",
            STORY2019_SHAKE_FAIL: "STORY2019_SHAKE_FAIL",
            STORY2019_AD_CLICK: "STORY2019_AD_CLICK",
            STORY2019_SAVE_IMG: "STORY2019_SAVE_IMG",
            STORY2019_RESULT_MECLICK: "STORY2019_RESULT_MECLICK"
        },
        doStatistic: function(a, b) {
            f.eventName.hasOwnProperty(a) && DATracker.track(a, b)
        }
    }
      , g = !1;
    return f
});
define("utils/Log", function(a, b, c) {
    "use strict";
    var d = a("lib/zepto")
      , e = a("basic/Class")
      , f = e.extend({
        init: function() {},
        imgArray: function() {
            return [new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image, new Image]
        },
        getRandomNum: function(a) {
            return Math.floor(a * (Math.random() % 1))
        },
        keyFrom: function(a) {
            var b, c, e = !1, f = d(a);
            if (f[0] === window)
                return "window";
            c = f.data("log") || f.data("keyfrom"),
            b = d.map(d(f).parents(), function(a) {
                return d(a).data("log") || d(a).data("keyfrom")
            }).reverse(),
            c && (b[b.length] = c);
            return b.join(".")
        },
        paramConcat: function(a, b) {
            var c = "", e;
            if (a && d.type(a) === "object")
                for (e in a)
                    e == "method" && a[e] == "" ? c += "&" + e + "=click" : c += "&" + e + "=" + a[e];
            a && d.type(a) === "string" && (c += "&" + a);
            return c
        },
        doLog: function(a) {
            var b = a.elem, c = a.parameter, d = a.path || "/page.do", e, f = this.keyFrom(b);
            d.indexOf("?") === -1 ? e = d + "?" + "keyfrom=" + f + this.paramConcat(c, b) : e = d + "&" + "keyfrom=" + f + this.paramConcat(c, b),
            this.send(e)
        },
        send: function(a) {
            if (typeof a == "undefined")
                throw "no valid logger address";
            var b = this, c = this.imgArray()[b.getRandomNum(10)], d;
            a.match(/^http(s)?:\/\/.+/) ? d = a : d = location.protocol + "//" + location.host + (/^\//.test(a) ? a : "/" + a),
            d += "&__rnd=" + (new Date).getTime(),
            c.src = d
        }
    })
      , g = null;
    return {
        doLog: function(a) {
            g === null && (g = new f),
            g.doLog(a)
        },
        keyFrom: function(a) {
            g === null && (g = new f);
            return g.keyFrom(a)
        },
        send: function(a) {
            g === null && (g = new f);
            return g.send(a)
        }
    }
});
define("task/widget/logger", function(a, b, c) {
    "use strict";
    var d = a("lib/zepto")
      , e = a("task/basic/Task")
      , f = a("utils/Log");
    // (new e("logger",function() {
    //     d("body").delegate("a[href]", "click", function(a) {
    //         var b = d(a.currentTarget)
    //           , c = b.attr("href");
    //         if (c.indexOf("javascript") === -1) {
    //             var e = b.data("method");
    //             e = e || "",
    //             f.doLog({
    //                 parameter: {
    //                     method: e
    //                 },
    //                 elem: b
    //             })
    //         }
    //     })
    //     //f.send("/page.do?_page=" + f.keyFrom("body"))
    // }
    // )).add()
});
define("task/widget/initDAStatistic", function(a, b, c) {
    "use strict";
    var d = a("task/basic/Task")
      , e = a("utils/statistic/DAStatistic")
      , f = a("lib/zepto");
    (new d("initDAStatistic",function() {
        e.init();
        var a = f("body").attr("data-log");
        switch (a) {
        case "pUserWap":
            e.doStatistic(e.eventName.view_people);
            break;
        case "pTopicWap":
            e.doStatistic(e.eventName.view_onepost);
            break;
        case "pServices":
            e.doStatistic(e.eventName.view_vippage);
            break;
        case "pCharge":
            e.doStatistic(e.eventName.view_chargepage)
        }
    }
    )).add()
});
define("task/widget/downFloatLayer", function(a, b, c) {
    "use strict";
    var d = a("lib/zepto")
      , e = a("task/basic/Task")
      , f = a("utils/Utils")
      , g = a("widget/SliderTouch")
      , h = a("utils/statistic/DAStatistic");
    (new e("downFloatLayer",function() {
        if (!f.ua("huatian")) {
            var a = {
                init: function() {
                    this.$elem = d(".app-banner");
                    if (this.$elem.length != 0) {
                        this.$containerEl = this.$elem.find(".app-banner-el"),
                        this.config = {
                            minDistance: 68,
                            maxDistance: 296,
                            maleText: ["\u4e09\u89c2\u6b63\u6696\u7537 \u6709\u623f\u6709\u8f66\u5c31\u5dee\u4f60\u4e86", "\u540d\u6821\u7537\u533b\u751f \u60f3\u548c\u4f60\u8d70\u904d\u4e16\u754c", "\u957f\u5f97\u5e05\u6709\u624d\u534e \u5b8c\u7f8e\u5b66\u9738\u5f8b\u5e08", "\u6cbb\u6108\u7cfb\uff01\u6709\u8179\u808c\u7684\u6d77\u5f52\u5c0f\u9c9c\u8089", "\u6587\u827a\u8bbe\u8ba1\u5e08 \u62cd\u7167\u901b\u8857\u5fc5\u5907\u6696\u7537", "\u4f18\u8d28\u5e05\u6c14IT\u7537 \u60f3\u7ed9\u4f60\u7a33\u7a33\u7684\u5e78\u798f"],
                            femaleText: ["\u6e29\u5a49\u7f8e\u5973\u8001\u5e08 \u60f3\u627e\u4e2a\u4eba\u4e92\u9053\u65e9\u5b89", "\u7d20\u989c9\u5206\uff01\u6e05\u7eaf\u6d77\u5f52\u59b9\u7eb8\u6c42\u5e26\u8d70", "\u6696\u5fc3\u767d\u8863\u5929\u4f7f \u60f3\u505a\u4f60\u7684\u5c0f\u592a\u9633", "\u751c\u7f8e\u59b9\u5b50 \u540d\u4f01\u5458\u5de5\u6536\u5165\u7a33\u5b9a", "\u5403\u8d27\u840c\u59b9\u5b50 \u4f1a\u505a\u996d\u7231\u751f\u6d3b", "\u540d\u6821\u5927\u7f8e\u5973 \u53ea\u60f3\u9047\u89c1\u5bf9\u7684\u4f60"],
                            oldmaleText: ["\u9ad8\u989c\u503c\u91d1\u878d\u7537 \u6709\u623f\u6709\u8f66\u5c31\u5dee\u4f60", "\u540d\u6821\u7537\u533b\u751f \u60f3\u548c\u4f60\u8d70\u904d\u4e16\u754c", "\u73b0\u5b9e\u7248\u4f55\u4ee5\u741b \u5b8c\u7f8e\u5b66\u9738\u5f8b\u5e08", "\u6cbb\u6108\u7cfb\uff01\u6709\u8179\u808c\u7684\u6d77\u5f52\u5c0f\u9c9c\u8089", "\u9ad8\u6536\u5165\u8bbe\u8ba1\u603b\u76d1 \u7537\u53cb\u529bmax", "BAT\u9ad8\u7ba1 \u5e74\u8f7b\u6709\u4e3a\u5f88\u987e\u5bb6"],
                            oldfemaleText: ["\u7f8e\u7ffb\uff01\u4e2d\u6587\u7cfb\u8001\u5e08\u60f3\u5ac1\u7ed9\u7231\u60c5", "\u795e\u4f3c\u9648\u610f\u6db5\uff01\u6d77\u5f52\u59b9\u7eb8\u6c42\u5e26\u8d70", "\u840c\u840c\u5c0f\u62a4\u58eb \u60f3\u505a\u4f60\u7684\u5c0f\u592a\u9633", "\u91d1\u878d\u5708\u9ad8\u5706\u5706 \u60f3\u8c08\u8d70\u5fc3\u7684\u604b\u7231", "\u4e66\u9999\u6c14\u597d\u53a8\u827a\u517c\u5f97 \u5e26\u5979\u56de\u5bb6\u5427", "\u957f\u76f8\u7f8e\u5b66\u5386\u9ad8\u6027\u683c\u597d \u592a\u5b8c\u7f8e\uff01"],
                            maleAvatar: ["male-1.jpg", "male-2.jpg", "male-3.jpg", "male-4.jpg", "male-5.jpg", "male-6.jpg"],
                            femaleAvatar: ["female-1.jpg", "female-2.jpg", "female-3.jpg", "female-4.jpg", "female-5.jpg", "female-6.jpg"]
                        },
                        this.avatarPrefix = "../img/",
                        this.userArray = [],
                        this.setUserArray(),
                        this.eventBind();
                        var a = 7e3;
                        CONFIG.isOldDownFloatLayer && (a = 3e3),
                        this.slider = new g(this.$elem,{
                            autoplay: !0,
                            interval: a,
                            containerSelector: ".app-banner-container",
                            panesSelector: ".app-banner-el",
                            pageContainerSelector: ".js-banner-gallery-pages"
                        }),
                        this.setContent(),
                        this.dataDoStatistic()
                    }
                },
                eventBind: function() {
                    var a = this
                      , b = null
                      , c = null
                      , d = null
                      , e = null
                      , f = null
                      , g = null;
                    this.$elem.on("touchstart", function(a) {
                        a = a.originalEvent || a,
                        b = a.touches[0].clientY,
                        c = a.touches[0].clientY,
                        d = a.touches[0].clientX,
                        e = a.touches[0].clientX,
                        f = +(new Date)
                    }).on("touchmove", function(a) {
                        a = a.originalEvent || a,
                        c = a.touches[0].clientY,
                        e = a.touches[0].clientX
                    }).on("touchend touchcancel", function() {
                        g = +(new Date);
                        if (Math.abs(e - d) < 10 && Math.abs(c - b) < 10 && g - f <= 300) {
                            var i = a.slider.currentPane
                              , j = {
                                index: 0
                            };
                            i < 5 && (j.sex = a.userArray[i - 1].sex,
                            j.index = a.userArray[i - 1].index),
                            h.doStatistic(h.eventName.BANNER_OPEN_APP, j),
                            a.$elem.click()
                        }
                    })
                },
                setContent: function() {
                    var a = this
                      , b = this.$containerEl.find(".js-distance")
                      , c = this.$containerEl.find(".js-banner-text")
                      , d = this.$containerEl.find(".js-sex")
                      , e = this.$containerEl.find(".js-avatar");
                    // b.each(function(c) {
                    //     b.eq(c).html(a.getDistance())
                    // }),
                    // c.each(function(b) {
                    //     var f = a.userArray[b];
                    //     c.eq(b).html(f.text);
                    //     var g = f.sex == "\u7537" ? "\u4ed6" : "\u5979";
                    //     d.eq(b).html(g),
                    //     e.eq(b).attr("src", a.avatarPrefix + f.avatar)
                    // })
                },
                getDistance: function() {
                    var a = this.config.maxDistance
                      , b = this.config.minDistance
                      , c = Math.floor(Math.random() * (a - b + 1) + b) / 100;
                    return c.toFixed(2)
                },
                setUserArray: function() {
                    var a = [0, 1, 2, 3, 4, 5];
                    a = this.shuffle(a),
                    CONFIG.isOldDownFloatLayer ? (this.userArray.push({
                        index: a[0] + 1,
                        sex: "\u7537",
                        text: this.config.oldmaleText[a[0]],
                        avatar: this.config.maleAvatar[a[0]]
                    }),
                    this.userArray.push({
                        index: a[1] + 1,
                        sex: "\u7537",
                        text: this.config.oldmaleText[a[1]],
                        avatar: this.config.maleAvatar[a[1]]
                    }),
                    a = this.shuffle(a),
                    this.userArray.push({
                        index: a[0] + 1,
                        sex: "\u5973",
                        text: this.config.oldfemaleText[a[0]],
                        avatar: this.config.femaleAvatar[a[0]]
                    }),
                    this.userArray.push({
                        index: a[1] + 1,
                        sex: "\u5973",
                        text: this.config.oldfemaleText[a[1]],
                        avatar: this.config.femaleAvatar[a[1]]
                    }),
                    this.userArray = this.shuffle(this.userArray)) : (this.userArray[1] = {
                        index: a[0] + 1,
                        sex: "\u7537",
                        text: this.config.maleText[a[0]],
                        avatar: this.config.maleAvatar[a[0]]
                    },
                    this.userArray[3] = {
                        index: a[1] + 1,
                        sex: "\u7537",
                        text: this.config.maleText[a[1]],
                        avatar: this.config.maleAvatar[a[1]]
                    },
                    a = this.shuffle(a),
                    this.userArray[0] = {
                        index: a[0] + 1,
                        sex: "\u5973",
                        text: this.config.femaleText[a[0]],
                        avatar: this.config.femaleAvatar[a[0]]
                    },
                    this.userArray[2] = {
                        index: a[1] + 1,
                        sex: "\u5973",
                        text: this.config.femaleText[a[1]],
                        avatar: this.config.femaleAvatar[a[1]]
                    })
                },
                shuffle: function(a) {
                    var b = a.length, c, d;
                    while (b)
                        c = Math.floor(Math.random() * b--),
                        d = a[c],
                        a[c] = a[b],
                        a[b] = d;
                    return a
                },
                dataDoStatistic: function() {
                    var a = this.userArray
                      , b = a.length;
                    for (var c = 0; c < b; c++) {
                        var d = a[c];
                        h.doStatistic(h.eventName.BANNER_SLIDER_USER, {
                            sex: d.sex,
                            index: d.index
                        })
                    }
                }
            };
            a.init()
        }
    }
    )).add()
});
define("widget/SliderTouch", function(a, b, c) {
    var d = a("lib/zepto")
      , e = a("basic/Class")
      , f = a("lib/hammer")
      , g = e.extend({
        currentPane: 0,
        paneWidth: 0,
        paneCount: 0,
        realPaneCount: 0,
        pages: null,
        autoplayTimer: null,
        autoplayRestartTimer: null,
        DEFAULT: {
            autoplay: !1,
            interval: 3e3,
            containerSelector: "ul",
            panesSelector: "li",
            pageContainerSelector: "",
            pageActiveClass: "active",
            animateClass: "animate",
            loopScroll: !0
        },
        init: function(a, b) {
            this._elem = d(a),
            this.config = d.extend({}, this.DEFAULT, b),
            this.container = this._elem.find(this.config.containerSelector),
            this.panes = this._elem.find(this.config.panesSelector),
            this.paneCount = this.panes.length,
            this.realPaneCount = this.paneCount,
            this.pageContainer = d(this.config.pageContainerSelector),
            this.paneCount > 1 ? (this._insertPages(),
            this._completePanes(),
            this._setPaneDimensions(),
            this._adjustContainerOffset(!0),
            this._updatePages(),
            this._bindEvent(),
            this.restartAutoPlay()) : this.paneCount == 1 && this.panes.show()
        },
        _insertPages: function() {
            if (this.pageContainer && this.pageContainer.length > 0) {
                for (var a = 0; a < this.realPaneCount; a++)
                    this.pageContainer.append("<span></span>");
                this.pages = this.pageContainer.find("span")
            }
        },
        _completePanes: function() {
            var a = this.panes[0].cloneNode(!0)
              , b = this.panes[this.realPaneCount - 1].cloneNode(!0)
              , c = "translate3d(0,0,0) scale3d(1,1,1)";
            this.container.append(a).prepend(b),
            this.panes = this._elem.find(this.config.panesSelector),
            this.paneCount = this.panes.length,
            this.panes.css("-webkit-transform", c),
            this.panes.css("transform", c)
        },
        _setPaneDimensions: function() {
            var a = this
              , b = a.panes.find("img").height()
              , c = 0;
            a.paneWidth = a._elem.width(),
            a.panes.each(function() {
                d(this).width(a.paneWidth),
                c = d(this).find("img").height(),
                b = b < c ? b : c
            }),
            a.container.width(a.paneWidth * a.paneCount),
            this._elem.css("height", b)
        },
        _adjustContainerOffset: function(a) {
            a && this.showPane(1),
            this.currentPane === this.panes.length - 1 && this.showPane(1),
            this.currentPane === 0 && this.showPane(this.panes.length - 2)
        },
        _updatePages: function() {
            var a = this.currentPane - 1;
            this.currentPane === this.panes.length - 1 && (a = 0),
            this.currentPane === 0 && (a = this.panes.length - 3),
            this.pages && this.pages.length > 0 && (this.pages.removeClass(this.config.pageActiveClass),
            this.pages.eq(a).addClass(this.config.pageActiveClass),
            this.pageContainer.html(this.pages))
        },
        _setContainerOffset: function(a, b) {
            var c = "translate3d(" + a + "%,0,0) scale3d(1,1,1)";
            this.container.removeClass(this.config.animateClass),
            b && this.container.addClass(this.config.animateClass),
            this.container.css("-webkit-transform", c),
            this.container.css("transform", c)
        },
        showPane: function(a, b) {
            var c = 0
              , d = this;
            a = Math.max(0, Math.min(a, this.paneCount - 1)),
            this.currentPane = a,
            c = -(100 / this.paneCount * this.currentPane),
            this._setContainerOffset(c, b),
            this._updatePages(),
            setTimeout(function() {
                d._adjustContainerOffset()
            }, 200)
        },
        enableAutoplay: function() {
            var a = this;
            !a.autoplayTimer && a.config.autoplay && (a.autoplayTimer = setTimeout(function() {
                a.next()
            }, a.config.interval))
        },
        disableAutoplay: function() {
            this.autoplayTimer && (clearTimeout(this.autoplayTimer),
            this.autoplayTimer = !1)
        },
        next: function() {
            this.disableAutoplay(),
            this.showPane(this.currentPane + 1, !0),
            this.enableAutoplay()
        },
        prev: function() {
            this.disableAutoplay(),
            this.showPane(this.currentPane - 1, !0),
            this.enableAutoplay()
        },
        _handleHammer: function(a) {
            var b = this;
            a.gesture.preventDefault(),
            b.disableAutoplay();
            switch (a.type) {
            case "dragright":
            case "dragleft":
                var c = -(100 / b.paneCount) * b.currentPane
                  , d = 100 / b.paneWidth * a.gesture.deltaX / b.paneCount;
                b._setContainerOffset(d + c);
                break;
            case "release":
                a.timeStamp - a.gesture.startEvent.timeStamp < 400 && Math.abs(a.gesture.deltaX) > 20 || Math.abs(a.gesture.deltaX) > b.paneWidth / 2 ? a.gesture.direction == "right" ? b.prev() : b.next() : b.showPane(b.currentPane, !0),
                b.enableAutoplay()
            }
        },
        restartAutoPlay: function() {
            var a = this;
            a.disableAutoplay(),
            clearTimeout(a.autoplayRestartTimer),
            a.autoplayRestartTimer = setTimeout(function() {
                a._setPaneDimensions(),
                a.enableAutoplay()
            }, 500)
        },
        _bindEvent: function() {
            var a = this
              , b = a.config;
            d(window).on("resize orientationchange", function() {
                a.restartAutoPlay()
            }),
            (new f(a._elem[0],{
                swipe: !1,
                drag_lock_to_axis: !0
            })).on("release dragleft dragright", function(b) {
                a._handleHammer(b)
            })
        }
    });
    return g
});
define("lib/hammer", function(a, b, c) {
    function o() {
        d.READY || (L.determineEventTypes(),
        p.each(d.gestures, function(a) {
            V.register(a)
        }),
        L.onTouch(d.DOCUMENT, m, V.detect),
        L.onTouch(d.DOCUMENT, n, V.detect),
        d.READY = !0)
    }
    "use strict";
    var d = function(a, b) {
        return new d.Instance(a,b || {})
    };
    d.VERSION = "1.0.10",
    d.defaults = {
        stop_browser_behavior: {
            userSelect: "none",
            touchAction: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    },
    d.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
    d.HAS_TOUCHEVENTS = "ontouchstart"in window,
    d.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i,
    d.NO_MOUSEEVENTS = d.HAS_TOUCHEVENTS && window.navigator.userAgent.match(d.MOBILE_REGEX),
    d.EVENT_TYPES = {},
    d.UPDATE_VELOCITY_INTERVAL = 16,
    d.DOCUMENT = window.document;
    var e = d.DIRECTION_DOWN = "down"
      , f = d.DIRECTION_LEFT = "left"
      , g = d.DIRECTION_UP = "up"
      , h = d.DIRECTION_RIGHT = "right"
      , i = d.POINTER_MOUSE = "mouse"
      , j = d.POINTER_TOUCH = "touch"
      , k = d.POINTER_PEN = "pen"
      , l = d.EVENT_START = "start"
      , m = d.EVENT_MOVE = "move"
      , n = d.EVENT_END = "end";
    d.plugins = d.plugins || {},
    d.gestures = d.gestures || {},
    d.READY = !1;
    var p = d.utils = {
        extend: function(a, b, c) {
            for (var d in b) {
                if (a[d] !== undefined && c)
                    continue;
                a[d] = b[d]
            }
            return a
        },
        each: function(a, b, c) {
            var d, e;
            if ("forEach"in a)
                a.forEach(b, c);
            else if (a.length !== undefined) {
                for (d = -1; e = a[++d]; )
                    if (b.call(c, e, d, a) === !1)
                        return
            } else
                for (d in a)
                    if (a.hasOwnProperty(d) && b.call(c, a[d], d, a) === !1)
                        return
        },
        inStr: function(a, b) {
            return a.indexOf(b) > -1
        },
        hasParent: function(a, b) {
            while (a) {
                if (a == b)
                    return !0;
                a = a.parentNode
            }
            return !1
        },
        getCenter: function(a) {
            var b = []
              , c = []
              , d = []
              , e = []
              , f = Math.min
              , g = Math.max;
            if (a.length === 1)
                return {
                    pageX: a[0].pageX,
                    pageY: a[0].pageY,
                    clientX: a[0].clientX,
                    clientY: a[0].clientY
                };
            p.each(a, function(a) {
                b.push(a.pageX),
                c.push(a.pageY),
                d.push(a.clientX),
                e.push(a.clientY)
            });
            return {
                pageX: (f.apply(Math, b) + g.apply(Math, b)) / 2,
                pageY: (f.apply(Math, c) + g.apply(Math, c)) / 2,
                clientX: (f.apply(Math, d) + g.apply(Math, d)) / 2,
                clientY: (f.apply(Math, e) + g.apply(Math, e)) / 2
            }
        },
        getVelocity: function(a, b, c) {
            return {
                x: Math.abs(b / a) || 0,
                y: Math.abs(c / a) || 0
            }
        },
        getAngle: function(a, b) {
            var c = b.clientX - a.clientX
              , d = b.clientY - a.clientY;
            return Math.atan2(d, c) * 180 / Math.PI
        },
        getDirection: function(a, b) {
            var c = Math.abs(a.clientX - b.clientX)
              , d = Math.abs(a.clientY - b.clientY);
            if (c >= d)
                return a.clientX - b.clientX > 0 ? f : h;
            return a.clientY - b.clientY > 0 ? g : e
        },
        getDistance: function(a, b) {
            var c = b.clientX - a.clientX
              , d = b.clientY - a.clientY;
            return Math.sqrt(c * c + d * d)
        },
        getScale: function(a, b) {
            if (a.length >= 2 && b.length >= 2)
                return this.getDistance(b[0], b[1]) / this.getDistance(a[0], a[1]);
            return 1
        },
        getRotation: function(a, b) {
            if (a.length >= 2 && b.length >= 2)
                return this.getAngle(b[1], b[0]) - this.getAngle(a[1], a[0]);
            return 0
        },
        isVertical: function(a) {
            return a == g || a == e
        },
        toggleDefaultBehavior: function(a, b, c) {
            if (!(!b || !a || !a.style)) {
                p.each(["webkit", "moz", "Moz", "ms", "o", ""], function(d) {
                    p.each(b, function(b, e) {
                        d && (e = d + e.substring(0, 1).toUpperCase() + e.substring(1)),
                        e in a.style && (a.style[e] = !c && b)
                    })
                });
                var e = function() {
                    return !1
                };
                b.userSelect == "none" && (a.onselectstart = !c && e),
                b.userDrag == "none" && (a.ondragstart = !c && e)
            }
        }
    };
    d.Instance = function(a, b) {
        var c = this;
        o(),
        this.element = a,
        this.enabled = !0,
        this.options = p.extend(p.extend({}, d.defaults), b || {}),
        this.options.stop_browser_behavior && p.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, !1),
        this.eventStartHandler = L.onTouch(a, l, function(a) {
            c.enabled && V.startDetect(c, a)
        }),
        this.eventHandlers = [];
        return this
    }
    ,
    d.Instance.prototype = {
        on: function(a, b) {
            var c = a.split(" ");
            p.each(c, function(a) {
                this.element.addEventListener(a, b, !1),
                this.eventHandlers.push({
                    gesture: a,
                    handler: b
                })
            }, this);
            return this
        },
        off: function(a, b) {
            var c = a.split(" "), d, e;
            p.each(c, function(a) {
                this.element.removeEventListener(a, b, !1);
                for (d = -1; e = this.eventHandlers[++d]; )
                    e.gesture === a && e.handler === b && this.eventHandlers.splice(d, 1)
            }, this);
            return this
        },
        trigger: function(a, b) {
            b || (b = {});
            var c = d.DOCUMENT.createEvent("Event");
            c.initEvent(a, !0, !0),
            c.gesture = b;
            var e = this.element;
            p.hasParent(b.target, e) && (e = b.target),
            e.dispatchEvent(c);
            return this
        },
        enable: function(a) {
            this.enabled = a;
            return this
        },
        dispose: function() {
            var a, b;
            this.options.stop_browser_behavior && p.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, !0);
            for (a = -1; b = this.eventHandlers[++a]; )
                this.element.removeEventListener(b.gesture, b.handler, !1);
            this.eventHandlers = [],
            L.unbindDom(this.element, d.EVENT_TYPES[l], this.eventStartHandler);
            return null
        }
    };
    var I = null
      , J = !1
      , K = !1
      , L = d.event = {
        bindDom: function(a, b, c) {
            var d = b.split(" ");
            p.each(d, function(b) {
                a.addEventListener(b, c, !1)
            })
        },
        unbindDom: function(a, b, c) {
            var d = b.split(" ");
            p.each(d, function(b) {
                a.removeEventListener(b, c, !1)
            })
        },
        onTouch: function(a, b, c) {
            var e = this
              , f = function f(f) {
                var g = f.type.toLowerCase();
                if (!p.inStr(g, "mouse") || !K) {
                    p.inStr(g, "touch") || p.inStr(g, "pointerdown") || p.inStr(g, "mouse") && f.which === 1 ? J = !0 : p.inStr(g, "mouse") && !f.which && (J = !1);
                    if (p.inStr(g, "touch") || p.inStr(g, "pointer"))
                        K = !0;
                    var h = 0;
                    if (J) {
                        d.HAS_POINTEREVENTS && b != n ? h = Q.updatePointer(b, f) : p.inStr(g, "touch") ? h = f.touches.length : K || (h = p.inStr(g, "up") ? 0 : 1),
                        h > 0 && b == n ? b = m : h || (b = n);
                        if (h || I === null)
                            I = f;
                        c.call(V, e.collectEventData(a, b, e.getTouchList(I, b), f)),
                        d.HAS_POINTEREVENTS && b == n && (h = Q.updatePointer(b, f))
                    }
                    h || (I = null,
                    J = !1,
                    K = !1,
                    Q.reset())
                }
            };
            this.bindDom(a, d.EVENT_TYPES[b], f);
            return f
        },
        determineEventTypes: function() {
            var a;
            d.HAS_POINTEREVENTS ? a = Q.getEvents() : d.NO_MOUSEEVENTS ? a = ["touchstart", "touchmove", "touchend touchcancel"] : a = ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"],
            d.EVENT_TYPES[l] = a[0],
            d.EVENT_TYPES[m] = a[1],
            d.EVENT_TYPES[n] = a[2]
        },
        getTouchList: function(a) {
            if (d.HAS_POINTEREVENTS)
                return Q.getTouchList();
            if (a.touches)
                return a.touches;
            a.identifier = 1;
            return [a]
        },
        collectEventData: function(a, b, c, d) {
            var e = j;
            if (p.inStr(d.type, "mouse") || Q.matchType(i, d))
                e = i;
            return {
                center: p.getCenter(c),
                timeStamp: Date.now(),
                target: d.target,
                touches: c,
                eventType: b,
                pointerType: e,
                srcEvent: d,
                preventDefault: function() {
                    var a = this.srcEvent;
                    a.preventManipulation && a.preventManipulation(),
                    a.preventDefault && a.preventDefault()
                },
                stopPropagation: function() {
                    this.srcEvent.stopPropagation()
                },
                stopDetect: function() {
                    return V.stopDetect()
                }
            }
        }
    }
      , Q = d.PointerEvent = {
        pointers: {},
        getTouchList: function() {
            var a = [];
            p.each(this.pointers, function(b) {
                a.push(b)
            });
            return a
        },
        updatePointer: function(a, b) {
            a == n ? delete this.pointers[b.pointerId] : (b.identifier = b.pointerId,
            this.pointers[b.pointerId] = b);
            return Object.keys(this.pointers).length
        },
        matchType: function(a, b) {
            if (!b.pointerType)
                return !1;
            var c = b.pointerType
              , d = {};
            d[i] = c === i,
            d[j] = c === j,
            d[k] = c === k;
            return d[a]
        },
        getEvents: function() {
            return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
        },
        reset: function() {
            this.pointers = {}
        }
    }
      , V = d.detection = {
        gestures: [],
        current: null,
        previous: null,
        stopped: !1,
        startDetect: function(a, b) {
            this.current || (this.stopped = !1,
            this.current = {
                inst: a,
                startEvent: p.extend({}, b),
                lastEvent: !1,
                lastVelocityEvent: !1,
                velocity: !1,
                name: ""
            },
            this.detect(b))
        },
        detect: function(a) {
            if (!!this.current && !this.stopped) {
                a = this.extendEventData(a);
                var b = this.current.inst
                  , c = b.options;
                p.each(this.gestures, function(d) {
                    if (!this.stopped && c[d.name] !== !1 && b.enabled !== !1 && d.handler.call(d, a, b) === !1) {
                        this.stopDetect();
                        return !1
                    }
                }, this),
                this.current && (this.current.lastEvent = a),
                a.eventType == n && !a.touches.length - 1 && this.stopDetect();
                return a
            }
        },
        stopDetect: function() {
            this.previous = p.extend({}, this.current),
            this.current = null,
            this.stopped = !0
        },
        getVelocityData: function(a, b, c, e) {
            var f = this.current
              , g = f.lastVelocityEvent
              , h = f.velocity;
            g && a.timeStamp - g.timeStamp > d.UPDATE_VELOCITY_INTERVAL ? (h = p.getVelocity(a.timeStamp - g.timeStamp, a.center.clientX - g.center.clientX, a.center.clientY - g.center.clientY),
            f.lastVelocityEvent = a) : f.velocity || (h = p.getVelocity(b, c, e),
            f.lastVelocityEvent = a),
            f.velocity = h,
            a.velocityX = h.x,
            a.velocityY = h.y
        },
        getInterimData: function(a) {
            var b = this.current.lastEvent, c, d;
            a.eventType == n ? (c = b && b.interimAngle,
            d = b && b.interimDirection) : (c = b && p.getAngle(b.center, a.center),
            d = b && p.getDirection(b.center, a.center)),
            a.interimAngle = c,
            a.interimDirection = d
        },
        extendEventData: function(a) {
            var b = this.current
              , c = b.startEvent;
            if (a.touches.length != c.touches.length || a.touches === c.touches)
                c.touches = [],
                p.each(a.touches, function(a) {
                    c.touches.push(p.extend({}, a))
                });
            var d = a.timeStamp - c.timeStamp
              , e = a.center.clientX - c.center.clientX
              , f = a.center.clientY - c.center.clientY;
            this.getVelocityData(a, d, e, f),
            this.getInterimData(a),
            p.extend(a, {
                startEvent: c,
                deltaTime: d,
                deltaX: e,
                deltaY: f,
                distance: p.getDistance(c.center, a.center),
                angle: p.getAngle(c.center, a.center),
                direction: p.getDirection(c.center, a.center),
                scale: p.getScale(c.touches, a.touches),
                rotation: p.getRotation(c.touches, a.touches)
            });
            return a
        },
        register: function(a) {
            var b = a.defaults || {};
            b[a.name] === undefined && (b[a.name] = !0),
            p.extend(d.defaults, b, !0),
            a.index = a.index || 1e3,
            this.gestures.push(a),
            this.gestures.sort(function(a, b) {
                if (a.index < b.index)
                    return -1;
                if (a.index > b.index)
                    return 1;
                return 0
            });
            return this.gestures
        }
    };
    d.gestures.Drag = {
        name: "drag",
        index: 50,
        defaults: {
            drag_min_distance: 10,
            correct_for_drag_min_distance: !0,
            drag_max_touches: 1,
            drag_block_horizontal: !1,
            drag_block_vertical: !1,
            drag_lock_to_axis: !1,
            drag_lock_min_distance: 25
        },
        triggered: !1,
        handler: function(a, b) {
            var c = V.current;
            if (c.name != this.name && this.triggered)
                b.trigger(this.name + "end", a),
                this.triggered = !1;
            else {
                if (b.options.drag_max_touches > 0 && a.touches.length > b.options.drag_max_touches)
                    return;
                switch (a.eventType) {
                case l:
                    this.triggered = !1;
                    break;
                case m:
                    if (a.distance < b.options.drag_min_distance && c.name != this.name)
                        return;
                    var d = c.startEvent.center;
                    if (c.name != this.name) {
                        c.name = this.name;
                        if (b.options.correct_for_drag_min_distance && a.distance > 0) {
                            var i = Math.abs(b.options.drag_min_distance / a.distance);
                            d.pageX += a.deltaX * i,
                            d.pageY += a.deltaY * i,
                            d.clientX += a.deltaX * i,
                            d.clientY += a.deltaY * i,
                            a = V.extendEventData(a)
                        }
                    }
                    if (c.lastEvent.drag_locked_to_axis || b.options.drag_lock_to_axis && b.options.drag_lock_min_distance <= a.distance)
                        a.drag_locked_to_axis = !0;
                    var j = c.lastEvent.direction;
                    a.drag_locked_to_axis && j !== a.direction && (p.isVertical(j) ? a.direction = a.deltaY < 0 ? g : e : a.direction = a.deltaX < 0 ? f : h),
                    this.triggered || (b.trigger(this.name + "start", a),
                    this.triggered = !0),
                    b.trigger(this.name, a),
                    b.trigger(this.name + a.direction, a);
                    var k = p.isVertical(a.direction);
                    (b.options.drag_block_vertical && k || b.options.drag_block_horizontal && !k) && a.preventDefault();
                    break;
                case n:
                    this.triggered && b.trigger(this.name + "end", a),
                    this.triggered = !1
                }
            }
        }
    },
    d.gestures.Hold = {
        name: "hold",
        index: 10,
        defaults: {
            hold_timeout: 500,
            hold_threshold: 2
        },
        timer: null,
        handler: function(a, b) {
            switch (a.eventType) {
            case l:
                clearTimeout(this.timer),
                V.current.name = this.name,
                this.timer = setTimeout(function() {
                    V.current.name == "hold" && b.trigger("hold", a)
                }, b.options.hold_timeout);
                break;
            case m:
                a.distance > b.options.hold_threshold && clearTimeout(this.timer);
                break;
            case n:
                clearTimeout(this.timer)
            }
        }
    },
    d.gestures.Release = {
        name: "release",
        index: Infinity,
        handler: function(a, b) {
            a.eventType == n && b.trigger(this.name, a)
        }
    },
    d.gestures.Swipe = {
        name: "swipe",
        index: 40,
        defaults: {
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            swipe_velocity: .7
        },
        handler: function(a, b) {
            if (a.eventType == n) {
                if (a.touches.length < b.options.swipe_min_touches || a.touches.length > b.options.swipe_max_touches)
                    return;
                if (a.velocityX > b.options.swipe_velocity || a.velocityY > b.options.swipe_velocity)
                    b.trigger(this.name, a),
                    b.trigger(this.name + a.direction, a)
            }
        }
    },
    d.gestures.Tap = {
        name: "tap",
        index: 100,
        defaults: {
            tap_max_touchtime: 250,
            tap_max_distance: 10,
            tap_always: !0,
            doubletap_distance: 20,
            doubletap_interval: 300
        },
        has_moved: !1,
        handler: function(a, b) {
            var c, d, e;
            if (a.eventType == l)
                this.has_moved = !1;
            else if (a.eventType == m && !this.moved)
                this.has_moved = a.distance > b.options.tap_max_distance;
            else if (a.eventType == n && a.srcEvent.type != "touchcancel" && a.deltaTime < b.options.tap_max_touchtime && !this.has_moved) {
                c = V.previous,
                d = c && c.lastEvent && a.timeStamp - c.lastEvent.timeStamp,
                e = !1,
                c && c.name == "tap" && d && d < b.options.doubletap_interval && a.distance < b.options.doubletap_distance && (b.trigger("doubletap", a),
                e = !0);
                if (!e || b.options.tap_always)
                    V.current.name = "tap",
                    b.trigger(V.current.name, a)
            }
        }
    },
    d.gestures.Touch = {
        name: "touch",
        index: -Infinity,
        defaults: {
            prevent_default: !1,
            prevent_mouseevents: !1
        },
        handler: function(a, b) {
            b.options.prevent_mouseevents && a.pointerType == i ? a.stopDetect() : (b.options.prevent_default && a.preventDefault(),
            a.eventType == l && b.trigger(this.name, a))
        }
    },
    d.gestures.Transform = {
        name: "transform",
        index: 45,
        defaults: {
            transform_min_scale: .01,
            transform_min_rotation: 1,
            transform_always_block: !1,
            transform_within_instance: !1
        },
        triggered: !1,
        handler: function(a, b) {
            if (V.current.name != this.name && this.triggered)
                b.trigger(this.name + "end", a),
                this.triggered = !1;
            else {
                if (a.touches.length < 2)
                    return;
                b.options.transform_always_block && a.preventDefault();
                if (b.options.transform_within_instance)
                    for (var c = -1; a.touches[++c]; )
                        if (!p.hasParent(a.touches[c].target, b.element))
                            return;
                switch (a.eventType) {
                case l:
                    this.triggered = !1;
                    break;
                case m:
                    var d = Math.abs(1 - a.scale)
                      , e = Math.abs(a.rotation);
                    if (d < b.options.transform_min_scale && e < b.options.transform_min_rotation)
                        return;
                    V.current.name = this.name,
                    this.triggered || (b.trigger(this.name + "start", a),
                    this.triggered = !0),
                    b.trigger(this.name, a),
                    e > b.options.transform_min_rotation && b.trigger("rotate", a),
                    d > b.options.transform_min_scale && (b.trigger("pinch", a),
                    b.trigger("pinch" + (a.scale < 1 ? "in" : "out"), a));
                    break;
                case n:
                    this.triggered && b.trigger(this.name + "end", a),
                    this.triggered = !1
                }
            }
        }
    };
    return d
});
