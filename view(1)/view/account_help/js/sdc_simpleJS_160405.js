function _wt() {
    this.u = "http" + (window.location.protocol.indexOf('https:') == 0 ? 's': '') + "://221.178.251.33/dcsch95n910000oyikv5jax99_9t1n/dcs.gif?WT.branch=jiangsu";
    this.p = "";
    this.t = "";
    this.WT = {};
    this.z = true;
};
_wt.prototype.D = function() {
    var gu = "http" + (window.location.protocol.indexOf('https:') == 0 ? 's': '') + "://sdc.10086.cn/dcs4vqpi1gn99hjhj4ik4q8d7_4w9z/dcs.gif?WT.branch=jiangsu";
    var gn = ['ZDCX', 'QDCX', 'ZHYEJYXQ', 'CZJF_CZJFJL', 'JFDHCX_JFCX', 'TCJYWCX', 'GRZLGL_PUKMCX', 'HMGSDCX', 'TCSYQK', 'LDTX', 'LDXS', 'TCJYWCX_FJGNBG_HJDD', 'TCJYWCX_FJGNBG_HJZY', 'MSFF', 'YYXX', 'JTZHKHJGL', 'IPZTC', 'GJTGACT', 'GJTGAMY', 'YHTFJ', 'PPTCBG', 'ZXRW_QPPZXRW', 'SJZF', 'YLKCZ', 'MMFW_MMXG', 'MMFW_MMCZ'];
    var $b = null;
    for (var i = 0; i < gn.length; i++) if (this.p.indexOf(gn[i]) > 0) {
        $b = this.u;
        break;
    };
    var gp = [encodeURIComponent('/'), encodeURIComponent('/obsh.html#home')];
    for (var j = 0; j < gp.length; j++) if (this.p.indexOf('=' + gp[j] + '&') > 0) {
        $b = this.u;
        break;
    };
    if ($b) {
        this.u = gu;
        this.G();
        this.u = $b;
    }
};
_wt.prototype.V = function() {
    this.p += "&dcssip=" + window.location.hostname + "&WT.host=" + window.location.hostname + "&dcsuri=" + encodeURIComponent(window.location.pathname) + "&WT.es=" + encodeURIComponent(window.location.href);
    if (window.location.search) this.p += "&dcsqry=" + encodeURIComponent(window.location.search);
    if ((window.document.referrer != "") && (window.document.referrer != "-")) this.p += "&dcsref=" + encodeURIComponent(window.document.referrer) + "&WT.referrer=" + encodeURIComponent(window.document.referrer);
    if (typeof(screen) == "object") {
        this.p += "&WT.sr=" + screen.width + "x" + screen.height;
    };
    this.p += "&WT.ti=" + encodeURIComponent(window.document.title);
};
_wt.prototype.M = function() {
    var $c;
    if (document.all) $c = document.all.tags("meta");
    else if (document.documentElement) $c = document.getElementsByTagName("meta");
    if (typeof($c) != "undefined") {
        var length = $c.length;
        for (var i = 0; i < length; i++) {
            var name = $c.item(i).name;
            if (name.length > 0) {
                if (name.toUpperCase().indexOf("WT.") == 0) this.p += "&" + name + "=" + $c.item(i).content;
            }
        }
    };
    for (N in this.WT) {
        this.p += "&WT." + N + "=" + this.WT[N];
    }
};
_wt.prototype.G = function() {
    var $d = this.p + "&dcsdat=" + (new Date()).getTime() + this.t;
    var pt = {};
    var $e = $d.split("&");
    $d = "";
    for (var i = 0; i < $e.length; i++) {
        if ($e[i].length > 0) pt[$e[i].split("=")[0]] = $e[i].split("=")[1];
    };
    for (N in pt) {
        $d += "&" + N + "=" + pt[N];
    };
    var $f = new Image();
    $f.style.cssText = "display:none;position:absolute;left:-1000px;z-index:-1;width:1px;";
    $f.onload = function() {
        try {
            document.body.appendChild($f);
        } catch(e) {}
    };
    $f.src = this.u + $d;
};
_wt.prototype.S = function() {
    if (this.z) {
        this.z = false;
        this.V();
        this.M();
        this.F();
        this.G();
        this.D();
    }
};
_wt.prototype.dcsMultiTrack = function() {
    var $g = this.dcsMultiTrack.arguments ? this.dcsMultiTrack.arguments: arguments;
    if ($g.length % 2 == 0) for (var i = 0; i < $g.length; i += 2) this.t += "&" + $g[i] + "=" + encodeURIComponent($g[i + 1]);
    this.G();
    this.D();
    this.t = "";
};
_wt.prototype.E = function($h, $i) {
    var e = $h.target || $h.srcElement;
    while (e.tagName && (e.tagName.toLowerCase() != $i.toLowerCase())) {
        e = e.parentElement || e.parentNode;
        e = e || {};
    };
    return e;
};
_wt.prototype.P = function($h) {
    var x = $h.clientX;
    var y = $h.clientY;
    $j = (document.documentElement != undefined && document.documentElement.clientHeight != 0) ? document.documentElement: document.body;
    var $k = window.pageXOffset == undefined ? $j.scrollLeft: window.pageXOffset;
    var $l = window.pageYOffset == undefined ? $j.scrollTop: window.pageYOffset;
    return (x + $k) + "x" + (y + $l);
};
_wt.prototype.N = function($h) {
    var id = "";
    var $m = "";
    var $c = ["div", "table"];
    var $n = $c.length;
    var i, e, $o;
    for (i = 0; i < $n; i++) {
        $o = $c[i];
        if ($o.length) {
            e = this.E($h, $o);
            id = (e.getAttribute && e.getAttribute("id")) ? e.getAttribute("id") : "";
            $m = e.className || "";
            if (id.length || $m.length) break;
        }
    };
    return id.length ? id: $m;
};
Function.prototype.wtbind = function($p) {
    var $q = this;
    var $r = function() {
        return $q.apply($p, arguments);
    };
    return $r;
};
_wt.prototype.K = function($h) {
    $h = $h || (window.event || "");
    if ($h && ((typeof($h.which) != "number") || ($h.which == 1))) {
        var name = "";
        var $s = "";
        var e = this.E($h, "A");
        if (e.href) {
            name = e.href;
            $s = "Link";
        } else {
            e = this.E($h, "INPUT");
            $s = e.type || "";
            if ($s && (($s == "submit") || ($s == "button") || ($s == "reset") || ($s == "text") || ($s == "radio") || ($s == "checkbox"))) {
                name = e.name || e.id || "null";
            }
        }
        if (typeof(this.trackObj) == "undefined" || this.trackObj == "" || this.trackObj == ";;" || this.trackObj.indexOf(";" + name + ";") > -1) {
            if ($s && (($s == "radio") || ($s == "checkbox"))) {
                name = (e.name || e.id || "null") + "." + (e.value || "null");
            }
            if (e.form) name = (e.form.id || e.form.name || e.form.className || "frm") + "." + name;
            if (name && $s) this.dcsMultiTrack("WT.type", $s, "WT.event", name, "WT.nv", this.N($h), "WT.pos", this.P($h));
        };
    }
};
_wt.prototype.trackEvent = function() {
    var e = (navigator.appVersion.indexOf("MSIE") != -1) ? "click": "mousedown";
    if (document.body.addEventListener) document.body.addEventListener(e, this.K.wtbind(this), true);
    else if (document.body.attachEvent) document.body.attachEvent("on" + e, this.K.wtbind(this));
};
_wt.prototype.getFormInfo = function(a, x) {
    if (a) {
        var $c = a.elements;
        var $d;
        if ($c) {
            for (var i = 0; i < $c.length; i += 1) {
                $d = $c[i];
                if ($d.name != undefined && $d.name != "" && (x.indexOf(";" + $d.name + ";") >= 0)) {
                    if ($d.type != undefined && $d.type != "") {
                        if ($d.type == 'checkbox' || $d.type == 'radio') {
                            if ($d.checked == true) {
                                if (this.t.indexOf($d.name) > 0) this.t += ";" + encodeURIComponent($d.value);
                                else this.t += "&" + $d.name + "=" + encodeURIComponent($d.value);
                            }
                        } else {
                            if ($d.type == 'button' || $d.type == 'submit' || $d.type == 'reset' || $d.type == 'image') {
                                continue;
                            } else {
                                this.t += "&" + $d.name + "=" + encodeURIComponent($d.value);
                            }
                        }
                    } else {
                        this.t += "&" + $d.name + "=" + encodeURIComponent($d.value);
                    }
                }
            }
        }
    }
};
_wt.prototype.F = function() {
    var $t = "2";
    var $u = new Date();
    var $v = new Date($u.getTime() + 315360000000);
    var $w = new Date($u.getTime());
    if (document.cookie.indexOf("WT_FPC=") != -1) {
        $t = document.cookie.substring(document.cookie.indexOf("WT_FPC=") + 10);
        if ($t.indexOf(";") != -1) $t = $t.substring(0, $t.indexOf(";"));
        if ($u.getTime() < ((new Date(parseInt($t.substring($t.indexOf(":lv=") + 4, $t.indexOf(":ss="))))).getTime() + 1800000)) $w.setTime((new Date(parseInt($t.substring($t.indexOf(":ss=") + 4)))).getTime());
        $t = $t.substring(0, $t.indexOf(":lv="));
    };
    if ($t.length < 10) {
        var $x = $u.getTime().toString();
        for (var i = 2; i <= (32 - $x.length); i++) $t += Math.floor(Math.random() * 16.0).toString(16);
        $t += $x;
    };
    $t = encodeURIComponent($t);
    this.p += "&WT.co_f=" + $t;
    document.cookie = "WT_FPC=id=" + $t + ":lv=" + $u.getTime().toString() + ":ss=" + $w.getTime().toString() + "; expires=" + $v.toGMTString() + "; path=/; domain=.10086.cn";
};
var _tag = new _wt();
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded",
    function() {
        _tag.S();
    },
    false);
} else {
    if (document.attachEvent) {
        var $z = function() {
            try {
                document.documentElement.doScroll('left');
            } catch(e) {
                setTimeout(arguments.callee, 5);
                return;
            };
            _tag.S();
        };
        $z();
    } else {
        _tag.S();
    }
};
if (typeof(_grtag) == "undefined") {
    _grtag = _tag;
};
//v2014.05.30.1020.Y
