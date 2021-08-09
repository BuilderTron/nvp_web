(function ($, window, undefined) {
    var lastTime = 0,
        running,
        animate = function (elem) {
            if (running) {
                window.requestAnimationFrame(animate, elem);
                jQuery.fx.tick();
            }
        },
        vendors = ["ms", "moz", "webkit", "o"];
    for (
        var x = 0, len = vendors.length;
        x < len && !window.requestAnimationFrame;
        ++x
    ) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame =
            window[vendors[x] + "CancelAnimationFrame"] ||
            window[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (fn, element) {
            var currTime = new Date().getTime(),
                delta = currTime - lastTime,
                timeToCall = Math.max(0, 16 - delta);
            var id = window.setTimeout(function () {
                fn(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
    jQuery.fx.timer = function (timer) {
        if (timer() && jQuery.timers.push(timer) && !running) {
            running = true;
            animate(timer.elem);
        }
    };
    jQuery.fx.stop = function () {
        running = false;
    };
})(jQuery, this);
!(function (a) {
    "function" == typeof define && define.amd
        ? define(["jquery"], a)
        : "object" == typeof exports
            ? (module.exports = a)
            : a(jQuery);
})(function (a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (
            ((b = a.event.fix(g)),
                (b.type = "mousewheel"),
                "detail" in g && (m = -1 * g.detail),
                "wheelDelta" in g && (m = g.wheelDelta),
                "wheelDeltaY" in g && (m = g.wheelDeltaY),
                "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
                "axis" in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
                (j = 0 === m ? l : m),
                "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
                "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
                0 !== m || 0 !== l)
        ) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                (j *= q), (m *= q), (l *= q);
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                (j *= r), (m *= r), (l *= r);
            }
            if (
                ((n = Math.max(Math.abs(m), Math.abs(l))),
                    (!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
                    d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
                    (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
                    (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
                    (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
                    k.settings.normalizeOffset && this.getBoundingClientRect)
            ) {
                var s = this.getBoundingClientRect();
                (o = b.clientX - s.left), (p = b.clientY - s.top);
            }
            return (
                (b.deltaX = l),
                (b.deltaY = m),
                (b.deltaFactor = f),
                (b.offsetX = o),
                (b.offsetY = p),
                (b.deltaMode = 0),
                h.unshift(b, j, l, m),
                e && clearTimeout(e),
                (e = setTimeout(c, 200)),
                (a.event.dispatch || a.event.handle).apply(this, h)
            );
        }
    }
    function c() {
        f = null;
    }
    function d(a, b) {
        return (
            k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
        );
    }
    var e,
        f,
        g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h =
            "onwheel" in document || document.documentMode >= 9
                ? ["wheel"]
                : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = (a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function () {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
                a.data(this, "mousewheel-page-height", k.getPageHeight(this));
        },
        teardown: function () {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"),
                a.removeData(this, "mousewheel-page-height");
        },
        getLineHeight: function (b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return (
                d.length || (d = a("body")),
                parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
            );
        },
        getPageHeight: function (b) {
            return a(b).height();
        },
        settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
    });
    a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a);
        },
    });
});
eval(
    (function (d, e, a, c, b, f) {
        b = function (a) {
            return (
                (a < e ? "" : b(parseInt(a / e))) +
                (35 < (a %= e) ? String.fromCharCode(a + 29) : a.toString(36))
            );
        };
        if (!"".replace(/^/, String)) {
            for (; a--;) f[b(a)] = c[a] || b(a);
            c = [
                function (a) {
                    return f[a];
                },
            ];
            b = function () {
                return "\\w+";
            };
            a = 1;
        }
        for (; a--;)
            c[a] && (d = d.replace(new RegExp("\\b" + b(a) + "\\b", "g"), c[a]));
        return d;
    })(
        '(11(g,p,Q){11 F(a,b){1a 1i(a.1E(b),10)||0}11 J(){14 a=p,b="4A";"ln"in p||(b="lm",a=1x.3J||1x.2J);1a{1c:a[b+"kL"],1e:a[b+"kK"]}}11 ia(){14 a=L();p.2W.4e="";p.7n(a.x,a.y)}11 ja(a,b){a="//19.kG/kD/cl.7L?2e="+7N(a).1q(/!/g,"%21").1q(/\'/g,"%27").1q(/\\(/g,"%28").1q(/\\)/g,"%29").1q(/\\*/g,"%2A");g.7j({2e:a,7z:"cl"});kc=11(a){b.1n(j,a)}}11 R(a){14 b=[];g("*",a).1Y(11(){14 a="";"51"!=g(j).1E("c6-2F")?a=g(j).1E("c6-2F"):"2K"!=1d g(j).2N("2g")&&"7D"==j.7K.23()&&(a=g(j).2N("2g"));if(-1==a.1L("k8")){a=a.1q(/2e\\(\\"/g,"");a=a.1q(/2e\\(/g,"");a=a.1q(/\\"\\)/g,"");a=a.1q(/\\)/g,"");a=a.25(",");1u(14 d=0;d<a.1g;d++)if(0<a[d].1g&&-1==g.k4(a[d],b)){14 e="";D.7e&&9>D.2v&&(e="?"+M(c5*S()));b.4F(a[d]+e)}}});1a b}11 Z(a){a=a.25(".").8q().23();14 b=-1!==a.1L("?")?a.25("?").8q():"";1a a.1q(b,"")}11 aa(a){a=Z(a);1a-1!==T.2F.1L(a)?"2F":-1!==T.2u.1L(a)?"2u":-1!==T.1F.1L(a)?"1F":"3w"}11 ba(a,b){1a 1i(b/2k*a)}11 U(a){1a(a=k1(a).1q(/^\\s+|\\s+$/g,"").6i(/^([^:\\/?#]+:)?(\\/\\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\\/?#]*)(?::(\\d*))?))?([^?#]*)(\\?[^#]*)?(#[\\s\\S]*)?/))?{2Z:a[0]||"",56:a[1]||"",4w:a[2]||"",jZ:a[3]||"",jY:a[4]||"",jX:a[5]||"",3u:a[6]||"",78:a[7]||"",4e:a[8]||""}:1f}11 N(a,b){11 c(a){14 b=[];a.1q(/^(\\.\\.?(\\/|$))+/,"").1q(/\\/(\\.(\\/|$))+/g,"/").1q(/\\/\\.\\.$/,"/../").1q(/\\/?[^\\/]*/g,11(a){"/.."===a?b.8q():b.4F(a)});1a b.58("").1q(/^\\//,"/"===a.41(0)?"/":"")}b=U(b||"");a=U(a||"");1a b&&a?(b.56||a.56)+(b.56||b.4w?b.4w:a.4w)+c(b.56||b.4w||"/"===b.3u.41(0)?b.3u:b.3u?(a.4w&&!a.3u?"/":"")+a.3u.74(0,a.3u.73("/")+1)+b.3u:a.3u)+(b.56||b.4w||b.3u?b.78:b.78||a.78)+b.4e:1f}11 ka(a,b,c){j.72=j.72||{};j.72.c2=j.72.c2||{};14 d=0,e=0,f=0,h={jQ:-6,jP:-5,a:-5,jO:-4,b:-4,jK:-3,bX:-3,"#":-2,p:1,6Z:1};d=11(a){a=(""+a).1q(/[6g\\-+]/g,".");a=a.1q(/([^.\\d]+)/g,".$1.").1q(/\\.{2,}/g,".");1a a.1g?a.25("."):[-8]};14 g=11(a){1a a?bW(a)?h[a]||-7:1i(a,10):0};a=d(a);b=d(b);e=ca(a.1g,b.1g);1u(d=0;d<e;d++)if(a[d]!=b[d])if(a[d]=g(a[d]),b[d]=g(b[d]),a[d]<b[d]){f=-1;1z}1Z if(a[d]>b[d]){f=1;1z}if(!c)1a f;4h(c){1r">":1r"gt":1a 0<f;1r">=":1r"ge":1a 0<=f;1r"<=":1r"le":1a 0>=f;1r"==":1r"=":1r"eq":1a 0===f;1r"<>":1r"!=":1r"bU":1a 0!==f;1r"":1r"<":1r"jC":1a 0>f;7F:1a 1f}}11 L(){14 a=0,b=0;"3c"==1d p.bQ?(b=p.bQ,a=p.jy):1x.2J&&(1x.2J.4x||1x.2J.4z)?(b=1x.2J.4z,a=1x.2J.4x):1x.3J&&(1x.3J.4x||1x.3J.4z)&&(b=1x.3J.4z,a=1x.3J.4x);1a{x:a,y:b}}11 da(a,b,c){14 d=r[a+b];1f==d&&(d=r[b]);1a 1f!=d?(0==b.1L(a)&&1f==c&&(c=b.6N(a.1g)),1f==c&&(c=b),c+\'="\'+d+\'" \'):""}11 A(a,b){if(0==a.1L("6b#"))1a"";0==a.1L("5b#")&&1f==b&&(b=a.6N(4));1a da("5b#",a,b)}11 G(a,b){if(0==a.1L("5b#"))1a"";0==a.1L("6b#")&&1f==b&&(b=a.6N(4));1a da("6b#",a,b)}11 ea(a,b){14 c,d="",e=b?" />":">";-1==a.1L("6b#")&&(c=r["5b#"+a],1f==c&&(c=r[a]),0==a.1L("5b#")&&(a=a.6N(4)),1f!=c&&(d=\'  <4g 2f="\'+a+\'" 2H="\'+c+\'"\'+e+"\\n"));1a d}11 la(){1u(14 a=0;a<2I.1g;a++){14 b=2I[a];6a r[b];6a r["6b#"+b];6a r["5b#"+b]}}11 69(){14 a="jt";14 b=2I;if(4>b.1g||0!=b.1g%2)b=bL,b=b.1q("%%",a),67(b),a="";1Z{r=[];r.2g=b[0];r.1c=b[1];r.1e=b[2];r.6G="6F:bK-bC-bA-by-bx";r.4Q="3K://5f.7t.3b/2X/7R/";a=b[3];if(1f==a||""==a)a="6,0,2,0";r.6z="3K://5f.7t.3b/iK/iJ.iF#2v="+a;1u(14 c,d=4;d<b.1g;d+=2)c=b[d].23(),a=b[d+1],"2f"==c||"id"==c?r.2f=a:r[c]=a;b="<3g "+A("6G")+A("1c")+A("1e")+A("6z")+A("2f","id")+A("6w")+A("8k")+A("8m")+A("4b")+A("8o")+A("1v")+A("1K")+A("bv")+A("bu")+">\\n"+ea("2g",!1);d="  <8z "+G("2g")+G("1c")+G("1e")+G("4Q")+G("2f")+G("8o")+G("6w");la("2g","1c","1e","4Q","6G","6z","2f","6w","8k","8m","4b","8o","bu","1v","1K","bv");1u(c in r)a=r[c],1f!=a&&(d+=G(c),b+=ea(c,!1));a=b+d+"> </8z>\\n</3g>"}1a a}14 T={2u:["iz"],2F:"iu ir il ij ii ih i9 i8 i4".25(" "),3w:"i3 i2 i0 hZ hY 2L hX 7L 6Z hW hV hU hT hR hQ hP hO".25(" "),1F:"hN bk hK hJ hy 48 3y 82 5l hk 8d".25(" ")},O=g(p),E=g(1x),D,B,H,t="",V=5m.8p||5m.bc||p.8t,z=!!("hc"in p)&&/h8|gU|b5|b2|b1|gx|gl|aT gj/i.1C(V),8R=/(gc|bb\\d+|fU).+9f|fO|fN\\/|fM|fB|fA|fz|fy|fx|fw|ip(fu|aG)|aF|fp|fo |fm|fl|fj|9f.+fg|fe|8t m(fd|in)i|fc( aq)?|f4|p(cz|f0)\\/|eZ|eY|eX|eW(4|6)0|eT|eJ|6V\\.(et|en)|eh|eg|ef ce|ee|ed/i.1C(V)||/ec|e9|e8|e7|e4|50[1-6]i|dY|dX|a 9X|dW|ac(er|9V|s\\-)|ai(ko|dQ)|al(av|ca|co)|dM|an(ex|8D|dE)|dB|ar(ch|go)|as(8K|dz)|dy|au(di|\\-m|r |s )|dt|be(ck|ll|dm)|bi(lb|dk)|bl(ac|az)|br(e|v)w|dj|bw\\-(n|u)|dh\\/|df|dd|db\\-|d9|d6|d5|d2\\-|co(d1|9M)|cZ|da(it|ll|cX)|cW|dc\\-s|cV|cU|cT|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|7S)|er(ic|k0)|cP|ez([4-7]0|aq|9X|cO)|cM|cL(\\-|6g)|g1 u|cJ|cI|gf\\-5|g\\-8c|go(\\.w|aG)|gr(ad|cD)|cC|cB|hd\\-(m|p|t)|cA\\-|hi(9I|9H)|hp( i|ip)|hs\\-c|ht(c(\\-| |6g|a|g|p|s|t)|kH)|hu(aw|kB)|i\\-(20|go|69)|kv|kq( |\\-|\\/)|kp|kn|km|kg|kf|ke|kd|aF|ja(t|v)a|k9|k2|jW|jV|jU|jS( |\\/)|jM|jL |jJ\\-|jH(c|k)|le(4E|jG)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|jF|jB|jz\\-w|jv|js\\/|69(8K|1I|jr)|9w(5N|21|ca)|m\\-cr|jq(bX|9v)|jn(jh|8R|9u)|j5|8c(5N|iZ|bi|de|do|t(\\-| |o|v)|9t)|iS(50|iM|v )|i5|hS|hI[0-2]|hB[2-3]|hx(0|2)|hn(0|2|5)|hl(0(0|1)|10)|bU((c|m)\\-|1Q|hh|hb|h9|h7)|gR(6|i)|gQ|gP|gK(gH|gG)|gF|gE|gz|gy(a|d|t)|gp|gk(13|\\-([1-8]|c))|gi|gd|6Z(ay|fH)|fG\\-2|fF(ck|fD|9q)|fv|fk|9I\\-g|88\\-a|fh(ff|12|21|32|60|\\-[2-7]|i\\-)|fb|f9|f5|f3|f2|eQ(eO|eM)|eG\\/|eF(ge|69|eC|8n|8D|ep)|ej(5N|h\\-|9V|p\\-)|ei\\/|9q(c(\\-|0|1)|47|9w|9M|9v)|eb\\-|e6|e5(\\-|m)|e3\\-0|e2(45|id)|e1(al|ar|b3|it|e0)|dZ(ft|8D)|dV(5N|h\\-|v\\-|v )|dU(5N|dS)|dR(18|50)|dO(dN|10|18)|9H(gt|lk)|dL\\-|dJ\\-|dD(i|m)|dA\\-|t\\-8c|6h(6Z|dr)|9u(70|m\\-|dn|dl)|dg\\-9|6V(\\.b|g1|d7)|d3|d0|cY|cS|cQ(cK|8K)|cG(40|5[0-3]|\\-v)|lh|l8|l7|kE(52|53|60|61|70|80|81|83|85|98)|fs(\\-| )|fi|dT|dP(g |dK|jf)|f1|fq|hM|iW\\-|aN|jE|cH\\-/i.1C(V.dp(0,4)),K=z?"3L.1G":"6j.1G",9h=z?"7q.1G":"fC.1G",88=z?"99.1G":"hj.1G",W=z?"9i.1G":"9j.1G",I=4V.jD,P=4V.jI,X=4V.kj,ca=4V.3H,Y=4V.3D,M=4V.kJ,S=4V.kQ,fa=11(a,b,c,d){14 e=j;e.17=b;e.33=a.33||a;e.4k=a.4k;e.9k=d;1>c.1g?e.8V():e.1k=c;e.1l={1R:e.1k.1g,2V:0,1o:1f,1h:1f,1p:1f,3e:g("2J"),3X:0,1X:g(\'<1b 1v="19-1X"></1b>\'),2n:g(\'<1b 1v="19-2n"><1b></1b></1b>\'),1O:g(\'<1b 1v="19-1O"></1b>\'),3S:g(\'<1b 1v="19-4A-1O"></1b>\'),1K:g(\'<1b 1v="19-1K"></1b>\'),9l:g(\'<a 1v="19-4n" 1K="\'+e.17.2T.4n+\'"></a>\'),75:g(\'<a 1v="19-3m" 1K="\'+e.17.2T.8C+\'"></a>\'),8B:g(\'<a 1v="19-4v" 1K="\'+e.17.2T.9m+\'"></a>\'),43:g(\'<a 1v="19-1h-42" 1K="\'+e.17.2T.1h+\'"></a>\'),4d:g(\'<a 1v="19-1p-42" 1K="\'+e.17.2T.8x+\'"></a>\'),1P:g(\'<1b 1v="19-1P\'+(z?" 6X":"")+\'" 59="1a 2U;"><1b 1v="19-1W"></1b></1b>\'),2O:g(\'<1b 1v="19-1P\'+(z?" 6X":"")+\' 19-1h" 59="1a 2U;"><1b 1v="19-1W"></1b></1b>\'),2M:g(\'<1b 1v="19-1P\'+(z?" 6X":"")+\' 19-1p" 59="1a 2U;"><1b 1v="19-1W"></1b></1b>\'),2E:g(\'<a 1v="19-42 19-1h-42" 59="1a 2U;" 1K="\'+e.17.2T.1h+\'"><2o></2o></a>\'),2t:g(\'<a 1v="19-42 19-1p-42" 59="1a 2U;" 1K="\'+e.17.2T.8x+\'"><2o></2o></a>\'),1B:g(\'<1b 1v="19-1B" 59="1a 2U;"><1b 1v="19-1B-1W"><a 1v="19-1B-ek"></a><1b 1v="19-1B-6P"></1b></1b></1b>\'),6O:!1,3V:!1,3O:!1,3F:!1,3I:!1,8h:eV,2z:!1,3n:!1,4C:0,3s:0,4G:0};e.1l.8b=e.1l.2E.2i(e.1l.2t);e.89();e.9n();e.17.4m=0<e.17.4m&&e.17.4m>=e.1l.1R?e.1l.1R-1:e.17.4m;e.17.4m=e.17.9o?M(S()*e.1l.1R):e.17.4m;e.1l.2V=e.17.4m;d?e.9p():e.86();e.17.2C&&(e.84(),O.3a(11(){e.84()}));z&&(a=/(6j|4W|5g|fI|fP)/ig,e.17.1S.1s=e.17.1S.1s.1q(a,"3L"),e.17.1S.1T=e.17.1S.1T.1q(a,"3L"),e.17.1U.1s=e.17.1U.1s.1q(a,"3L"),e.17.1U.1T=e.17.1U.1T.1q(a,"3L"));e.17.26.6u&&g.3C(e.17.1N,{5E:0,63:0,6p:0,6o:0})};fa.4c={62:11(){j.1l.3X+=1;"1H"==j.17.3B.23()?j.1l.2n.1D("19-1s").24().2x({1y:"-9r"},j.17.1s.2q,"2Q"):j.1l.2n.1D("19-1s").24().2x({1w:"-9r"},j.17.1s.2q,"2Q")},4B:11(){--j.1l.3X;j.1l.3X=0>j.1l.3X?0:j.1l.3X;"1H"==j.17.3B.23()?0>=j.1l.3X&&j.1l.2n.2p("19-1s").24().2x({1y:"-9s"},j.17.1s.2q,"7x"):0>=j.1l.3X&&j.1l.2n.2p("19-1s").24().2x({1w:"-9s"},j.17.1s.2q,"7x")},5n:11(){14 a=j;a.1I={i6:a.1l.1P,ib:a.1l.2O,ik:a.1l.2M,im:a.1l.1o,iD:a.1l.1h,iE:a.1l.1p,1T:11(){a.3p()},4K:11(){0<2I.1g?a.3r(!0):a.3r()},3m:11(){a.5q()}}},8V:11(){14 a=j,b=[],c=[];g(a.33,a.4k).1Y(11(){14 d=g(j),e=d.2N(a.17.2N)||1f,f=d.1A("17")&&j4("({"+d.1A("17")+"})")||{},h=d.1A("1S"),l=d.1A("1K"),k=d.1A("1j")||aa(e);c.4F({1t:e,1S:h,1K:l,1j:k,17:f});a.9k||b.4F(d)});a.1k=c;a.6H=b},89:11(){14 a=j,b=[];g.1Y(a.1k,11(c,d){"3l"==1d d&&(d={2e:d});14 e=d.2e||d.1t||1f,f=d.17||{},h=d.1S||1f,l=d.1K||1f,k=d.1j?d.1j.23():aa(e),n="3g"!=1d e?Z(e):"";f.2h=f.2h||("2F"==k?e:1f);f.95=f.95||1f;f.3v=f.3v||a.17.3v;f.1c=f.1c||1f;f.1e=f.1e||1f;f.3M="2K"!=1d f.3M?f.3M:!0;f.3N="2K"!=1d f.3N?f.3N:!0;f.1U="2K"!=1d f.1U?f.1U:a.17.1U.8Y&&g.3C({},{},a.17.1U.8Y);"1F"==k&&(f.2j="2K"!=1d f.2j?f.2j:{},f.2j.3y=f.2j.3y||f.2j.jx||1f,f.2j.26="2K"!=1d f.2j.26?f.2j.26:"26",f.2j.6l=f.2j.6l||"jA",f.2j.5t="2K"!=1d f.2j.5t?f.2j.5t:!1);f.1c&&f.1e||("1F"==k?(f.1c=9x,f.1e=9y):"3w"==k?(f.1c="2k%",f.1e="90%"):"2u"==k&&(f.1c=9x,f.1e=9y));6a d.2e;d.8U=c;d.1t=e;d.1S=h;d.1K=l;d.1j=k;d.17=f;d.2Y=n;b.4F(d)});a.1k=b},9p:11(){14 a=j.1l.2V;j.1l.1o=a;j.1l.1h=j.1k[a+1]?a+1:1f;j.1l.1p=j.1k[a-1]?a-1:1f;j.7a();j.77()},7a:11(){14 a=j,b=a.1l,c=a.17,d=J(),e=c.3B.23(),f=0<b.1R&&a.1k.5J(11(a,b,d){1a-1===["2F","2u","1F"].1L(a.1j)&&"2K"===1d a.9z&&(c.8M||a.17.8M)}),h=0<f.1g;c.8L&&!c.3S&&(b.3I=d.1c<=b.8h);b.1X.1D(c.3v).1T().1E("2S",c.1X.2S);c.2C&&b.1X[0].jN("9A",c.2C);c.26.1O&&(b.1O.1D(c.3v).1J(b.9l),c.26.3m&&b.1O.1J(b.75),c.26.3z&&b.1O.1J(b.8B),1<b.1R&&b.1O.1J(b.4d).1J(b.43));b.3e.1D("19-8I").1J(b.1X).1J(b.2n).1J(b.1P).1J(b.2O).1J(b.2M);c.3S||b.3e.1J(b.1O);c.26.6u&&b.3e.1J(b.2E).1J(b.2t);c.26.2h&&1<b.1R&&(b.3e.1J(b.1B),b.1B.1D(c.3v).1D("19-"+e),g("1b.19-1B-6P",b.1B).3q(),b.6O=!0);d="1H"==c.3B.23()?{1w:1i(d.1c/2-b.2n.3o()/2)}:{1y:1i(d.1e/2-b.2n.2m()/2)};b.2n.1D(c.3v).1E(d);b.2E.2i(b.2t).1D(c.3v);"1H"==e&&b.2n.2i(b.2E).2i(b.2t).1D("1H");b.3e[b.3I?"1D":"2p"]("3I");c.2R||(b.2t.2i(b.2t).2i(b.4d).2i(b.43).2p("3Q"),0==b.1o&&b.2t.2i(b.4d).1D("3Q"),b.1o>=b.1R-1&&b.2E.2i(b.43).1D("3Q"));c.1s.46?(b.1X.24().3h(c.1s.2q),b.1O.24().3h(c.1s.2q)):(b.1X.1s(),b.1O.1s());14 l=f.1g;h?(a.62(),g.1Y(f,11(d,e){a.9B(j,11(d){9C.kk(d);14 e=-1;a.1k.5J(11(a,b,c){a.1t==d.2e&&(e=b);1a a.1t==d.2e});14 f=a.1k[e];d&&g.3C(!0,f,{1t:d.4s,1j:d.1j,9z:!0,17:{2j:d.2j,1c:"2F"==d.1j?0:d.1c||f.1c,1e:"2F"==d.1j?0:d.1e||f.1e,2h:f.17.2h||d.2h}});l--;0==l&&(a.4B(),b.6C=!1,a.5C(),c.1s.46?2D(11(){a.5D()},c.1s.2q):a.5D())})})):c.1s.46?2D(11(){a.5D()},c.1s.2q):a.5D();a.5n();p.1G={4n:11(){a.3p()},3m:11(){a.5q()},9D:11(){a.2d("1h")},9E:11(){a.2d("1p")},3Y:11(b){a.3Y(b)},4K:11(){a.4K()},7d:11(){0<2I.1g?a.3r(!0):a.3r()},5G:11(b){a.5G(b)},9F:11(){a.3p();a.6K()}};c.2C&&(b.3F=!0,p.2W.4e=c.2C+"/"+b.1o,2D(11(){b.3F=!1},55));c.3z.9G||(a.5K(),b.8B.2p("19-4v").1D("19-3Z"));"11"==1d a.17.1m.9J&&a.17.1m.9J.1n(a)},44:11(a,b,c){j.5n();a.2q=c||j.17.2G.5P;"1o"==b&&(j.1l.4a=a.17.3M?!1:!0,j.1l.5p=a.17.3N?!1:!0);4h(b){1r"1o":14 d=j.1l.1P;14 e=j.1l.1o;1z;1r"1h":d=j.1l.2O;e=j.1l.1h;1z;1r"1p":d=j.1l.2M,e=j.1l.1p}d.8f("3j 1v").1D("19-1P"+(z?" 6X":"")).1D(a.17.3v);g("1b.19-4A-1O",d).4H();if(a.1K||j.17.3S){14 f=j.1l.3S.5V();if(a.1K&&j.17.1s.1K){14 h=j.1l.1K.5V();h.3q().2L(a.1K);f.1J(h)}j.17.3S&&f.1J(1<j.1l.1R?j.1l.1O.5V():j.1l.1O);d.cE(f)}9C.cF("44",2I);j.9K(a,d,e,b)},9K:11(a,b,c,d){14 e=j,f=e.17,h={9L:b,87:c};4h(a.1j){1r"2F":"11"==1d f.1m.2c&&f.1m.2c.1n(e,e.1I,c);"11"==1d a.17.2c&&a.17.2c.1n(e,h);e.4f(a.1t,11(k){"11"==1d f.1m.1V&&f.1m.1V.1n(e,e.1I,c);"11"==1d a.17.1V&&a.17.1V.1n(e,h);b.1A({2r:k?k.1c:cN,2s:k?k.1e:6A});g("1b.19-1W",b).3q().1J(k?\'<7D 2g="\'+a.1t+\'" 1v="19-2F" />\':\'<2o 1v="19-67">\'+f.66.4f+"</2o>");"11"==1d f.1m.1M&&f.1m.1M.1n(e,e.1I,c);"11"==1d a.17.1M&&a.17.1M.1n(e,h);e.3P(a,d,b)});1z;1r"1F":b.1A({2r:a.17.1c,2s:a.17.1e});"1o"===d?(e.5c(b,a),"11"==1d f.1m.1M&&f.1m.1M.1n(e,e.1I,c),"11"==1d a.17.1M&&a.17.1M.1n(e,h)):g("1b.19-1W",b).3q();e.3P(a,d,b);1z;1r"3w":b.1A({2r:a.17.1c,2s:a.17.1e});e.3P(a,d,b);if("1o"===d){14 l=e.5c(b,a);"11"==1d f.1m.1M&&f.1m.1M.1n(e,e.1I,c);"11"==1d a.17.1M&&a.17.1M.1n(e,h);"11"==1d f.1m.2c&&f.1m.2c.1n(e,e.1I,c);"11"==1d a.17.2c&&a.17.2c.1n(e,h);l.4o("5a",11(){"11"==1d f.1m.1V&&f.1m.1V.1n(e,e.1I,c);"11"==1d a.17.1V&&a.17.1V.1n(e,h);l.6W("5a")})}1Z g("1b.19-1W",b).3q();1z;1r"76":l=g(a.1t);14 k=e.5c(b,a),n=R(b);b.1A({2r:e.1k[c].17.1c||l.3o(),2s:e.1k[c].17.1e||l.2m()});k.cR().eq(0).1s();"11"==1d f.1m.1M&&f.1m.1M.1n(e,e.1I,c);"11"==1d a.17.1M&&a.17.1M.1n(e,h);"11"==1d f.1m.2c&&f.1m.2c.1n(e,e.1I,c);"11"==1d a.17.2c&&a.17.2c.1n(e,h);e.4f(n,11(){"11"==1d f.1m.1V&&f.1m.1V.1n(e,e.1I,c);"11"==1d a.17.1V&&a.17.1V.1n(e,h);e.3P(a,d,b)});1z;1r"2u":l=e.5c(b,a);b.1A({2r:e.1k[c].17.1c||l.3o(),2s:e.1k[c].17.1e||l.2m()});"11"==1d f.1m.1M&&f.1m.1M.1n(e,e.1I,c);"11"==1d a.17.1M&&a.17.1M.1n(e,h);e.3P(a,d,b);1z;1r"7j":14 m=a.17.7j||{};"11"==1d f.1m.2c&&f.1m.2c.1n(e,e.1I,c);"11"==1d a.17.2c&&a.17.2c.1n(e,h);e.62();g.7j({2e:a.1t||f.2P.2e,1A:m.1A||1f,7z:m.7z||"2L",1j:m.1j||f.2P.1j,7h:m.7h||f.2P.7h,7k:m.7k||f.2P.7k,7p:m.7p||f.2P.7p,7m:m.7m||f.2P.7m,6y:m.6y||f.2P.6y,79:m.79||f.2P.79,6L:m.6L||f.2P.6L,6I:m.6I||f.2P.6I,68:11(k,l,n){e.4B();14 q=g(k),u=g("1b.19-1W",b),C=e.1k[c].17.1c||1i(q[0].6t("1c")),v=e.1k[c].17.1e||1i(q[0].6t("1e")),y=q[0].6t("1c")&&q[0].6t("1e")?{9N:"d4"}:{};u.3q().1J(g(\'<1b 1v="19-7r"></1b>\').1E(y).2L(q));b.1s().1A({2r:C||u.3o(),2s:v||u.2m()}).1T();"11"==1d f.1m.1M&&f.1m.1M.1n(e,e.1I,c);"11"==1d a.17.1M&&a.17.1M.1n(e,h);q=R(b);e.4f(q,11(){"11"==1d f.1m.1V&&f.1m.1V.1n(e,e.1I,c);"11"==1d a.17.1V&&a.17.1V.1n(e,h);e.3P(a,d,b)});f.2P.68(k,l,n);"11"==1d m.68&&m.68(k,l,n)},4P:11(k,l,n){"11"==1d f.1m.1V&&f.1m.1V.1n(e,e.1I,c);"11"==1d a.17.1V&&a.17.1V.1n(e,h);e.4B();g("1b.19-1W",b).3q().1J(\'<2o 1v="19-67">\'+f.66.9O+"</2o>");e.3P(a,d,b);f.2P.4P(k,l,n);"11"==1d m.4P&&m.4P(k,l,n)}});1z;1r"2L":k=a.1t;1W=g("1b.19-1W",b);k[0].7K?l=k.5V():(k=g(k),l=k.33?g("<1b>"+k+"</1b>"):k);14 C=e.1k[c].17.1c||1i(l.2N("1c")),y=e.1k[c].17.1e||1i(l.2N("1e"));e.5c(b,a);l.d8(1x.3J).1T();"11"==1d f.1m.1M&&f.1m.1M.1n(e,e.1I,c);"11"==1d a.17.1M&&a.17.1M.1n(e,h);n=R(b);"11"==1d f.1m.2c&&f.1m.2c.1n(e,e.1I,c);"11"==1d a.17.2c&&a.17.2c.1n(e,h);e.4f(n,11(){"11"==1d f.1m.1V&&f.1m.1V.1n(e,e.1I,c);"11"==1d a.17.1V&&a.17.1V.1n(e,h);b.1s().1A({2r:C||1W.3o(),2s:y||1W.2m()}).1T();l.4H();e.3P(a,d,b)})}},3P:11(a,b,c){14 d=j,e=d.1l,f=d.17;"1o"!=b&&("1h"==b?c.1D("19-1h"):c.1D("19-1p"));if("1o"==b)14 h=e.1o;1Z if("1h"==b){14 l=f.1N.6p;h=e.1h}1Z l=f.1N.6o,h=e.1p;14 k={9L:c,87:h};d.1k[h].17.1c=d.1k[h].17.1c||0;d.1k[h].17.1e=d.1k[h].17.1e||0;"1o"==b?f.1s.46?c.1E(B,H).3h(a.2q,11(){c.1E(B,"");if(a.1S){d.7w(a,c);14 b=g("1b.19-1S",c),e=1i(b.2m()/c.2m()*2k);f.1S.2V&50>=e&&b.3h(f.2G.5W)}if(b=a.17.1U)d.7u(b,a.1t,c),f.1U.2V&&g("1b.19-1U",c).3h(f.2G.5W);d.5C();"11"==1d f.1m.2w&&f.1m.2w.1n(d,d.1I,h);"11"==1d a.17.2w&&a.17.2w.1n(d,k)}):(c.1s(),d.5C(),"11"==1d f.1m.2w&&f.1m.2w.1n(d,d.1I,h),"11"==1d a.17.2w&&a.17.2w.1n(d,k)):f.1s.46?c.9P(a.2q,l,11(){"1h"==b?e.3V=!1:e.3O=!1;d.5C();"11"==1d f.1m.2w&&f.1m.2w.1n(d,d.1I,h);"11"==1d a.17.2w&&a.17.2w.1n(d,k)}):(c.1E({2S:l}).1s(),"1h"==b?e.3V=!1:e.3O=!1,d.5C(),"11"==1d f.1m.2w&&f.1m.2w.1n(d,d.1I,h),"11"==1d a.17.2w&&a.17.2w.1n(d,k));2D(11(){d.3r()},0)},5D:11(){14 a=j.1l,b=j.17;b.2R&&3<=a.1R?(a.1o==a.1R-1&&(a.1h=0),0==a.1o&&(a.1p=a.1R-1)):b.2R=!1;j.44(j.1k[a.1o],"1o",b.1s.2q);j.1k[a.1h]&&j.44(j.1k[a.1h],"1h",b.1s.2q);j.1k[a.1p]&&j.44(j.1k[a.1p],"1p",b.1s.2q)},5C:11(){14 a=j,b=a.1l,c=a.17,d=1f;if(b.6O&&!a.1l.6C){14 e=b.1B,f=g("1b.19-1B-1W",e),h=g("1b.19-1B-6P",f),l=0;h.8f("3j").3q();g.1Y(a.1k,11(k,n){14 m=b.1o==k?"19-5k":"",C=b.1o==k?c.1B.9b:c.1B.9a,y=n.17.2h,q=g(\'<1b 1v="19-2h"></1b>\'),u=g(\'<1b 1v="19-2h-7b"></1b>\');q.1E({2S:0}).1D(m);"1F"!=n.1j&&"2u"!=n.1j||"2K"!=1d n.17.7b?n.17.7b&&(u.1D("19-2h-"+n.17.7b),q.1J(u)):(u.1D("19-2h-1F"),q.1J(u));y&&a.4f(y,11(b){l++;b?q.1A({2r:b.1c,2s:b.1e}).1J(\'<7D 2g="\'+y+\'" 4b="0" />\'):q.1A({2r:c.1B.93,2s:c.1B.92});4I(d);d=2D(11(){a.5U(e,f,h)},20);2D(11(){q.9P(c.2G.5P,C)},20*l)});h.1J(q)});a.1l.6C=!0}},5U:11(a,b,c){14 d=j,e=d.1l,f=d.17,h=J(),l=f.3B.23();a||(a=e.1B);b||(b=g("1b.19-1B-1W",a));c||(c=g("1b.19-1B-6P",b));14 k=g(".19-2h",c);e="1H"==l?h.1c-f.1N.5T:k.eq(0).3o()-f.1N.5T;h="1H"==l?k.eq(0).2m()-f.1N.5S:h.1e-f.1N.5S;14 n="1H"==l?0:e,m="1H"==l?h:0,C=g(".19-5k",c),y={};3>2I.1g&&(k.1E({2S:f.1B.9a}),C.1E({2S:f.1B.9b}));k.1Y(11(a){a=g(j);14 b=a.1A(),c="1H"==l?0:f.1B.93;1e="1H"==l?f.1B.92:0;8W=d.5O(c,1e,b.2r,b.2s,!0);a.1E({1c:8W.1c,1e:8W.1e});"1H"==l&&a.1E({"dq":"1w"});"1H"==l?n+=a.3o():m+=a.2m()});y={1c:n,1e:m};c.1E(y);y={};k=c.31();14 q=C.1g?C.31():{1y:1i(h/2),1w:1i(e/2)};k.1y-=E.4z();k.1w-=E.4x();q.1y=q.1y-k.1y-E.4z();q.1w=q.1w-k.1w-E.4x();"1H"==l?(y.1y=0,y.1w=1i(e/2-q.1w-C.3o()/2)):(y.1y=1i(h/2-q.1y-C.2m()/2),y.1w=0);3>2I.1g?c.24().2x(y,f.2G.5L,"2Q"):c.1E(y)},4f:11(a,b){g.3E(a)||(a=[a]);14 c=j,d=a.1g;0<d?(c.62(),g.1Y(a,11(e,f){14 h=2y du;h.dv=11(){--d;0==d&&(c.4B(),b(h))};h.dw=h.dx=11(){--d;0==d&&(c.4B(),b(!1))};h.2g=a[e]})):b(!1)},86:11(){14 a=j,b=a.1l,c=z?"3L.iL":"6j.iL",d=z?"6j.iL":"3L.iL";if(a.4k&&a.33){14 e=g(a.33,a.4k);g(a.4k).1Q(c,a.33,11(){14 c=g(j);c=e.8U(c);b.1o=c;b.1h=a.1k[c+1]?c+1:1f;b.1p=a.1k[c-1]?c-1:1f;a.7a();a.77();1a!1}).1Q(d,a.33,11(){1a!1})}1Z g.1Y(a.6H,11(e,h){h.1Q(c,11(){b.1o=e;b.1h=a.1k[e+1]?e+1:1f;b.1p=a.1k[e-1]?e-1:1f;a.7a();a.77();1a!1}).1Q(d,11(){1a!1})})},6K:11(){j.4k&&j.33?g(j.4k).5u(".iL",j.33):g.1Y(j.6H,11(a,b){b.5u(".iL")})},4K:11(){j.6K();j.8V();j.89();j.86()},77:11(){11 a(a){c.3I||(c.4C||c.8b.1s(),c.4C=4I(c.4C),-1===k.1L(a.8J)&&(c.4C=2D(11(){c.8b.1T();c.4C=4I(c.4C)},c5)))}14 b=j,c=b.1l,d=b.17,e=d.3B.23(),f=g(".19-1P"),h=t.8H+".1G",l=8G=2k,k=[c.2E[0],c.2t[0],c.2E[0].36,c.2t[0].36];O.4o("dC.1G",11(){14 a=J();d.8L&&!d.3S&&(c.3I=a.1c<=c.8h);c.3e[c.3I?"1D":"2p"]("3I");b.3r(1f);z&&(4I(c.9Q),c.9Q=2D(11(){14 a=L().y;p.7n(0,a-30);p.7n(0,a+30);p.7n(0,a)},dF));c.6O&&b.5U()}).4o("dG.1G",11(a){if(d.26.3W)4h(a.dH){1r 13:a.dI&&d.3W.9R&&b.5q();1z;1r 27:d.3W.9S&&b.3p();1z;1r 37:d.3W.1w&&!c.5B&&b.2d("1p");1z;1r 38:d.3W.6V&&!c.5B&&b.2d("1p");1z;1r 39:d.3W.5F&&!c.5B&&b.2d("1h");1z;1r 40:d.3W.9T&&!c.5B&&b.2d("1h")}});t.5A&&O.4o(h,11(){b.8w()});h=[d.1S.1s+".1G",d.1S.1T+".1G",d.1U.1s+".1G",d.1U.1T+".1G"].5J(11(a,b,c){1a c.73(a)===b});14 n="";g.1Y(h,11(a,b){0!=a&&(n+=" ");n+=b});E.1Q(K,".19-1X",11(){d.1X.9U&&b.3p()}).1Q(K,".19-1h, .19-1h-42",11(){b.2d("1h")}).1Q(K,".19-1p, .19-1p-42",11(){b.2d("1p")}).1Q(K,".19-2h",11(){14 a=g(j);a=g(".19-2h",c.1B).8U(a);a!=c.1o&&b.3Y(a)}).1Q(n,".19-1P:8v(.19-1h, .19-1p)",11(a){14 b=g("1b.19-1S",c.1P),e=g("1b.19-1U",c.1P),f=d.2G.5W;c.3V||c.3O?(a.1j!=d.1S.1s||b.is(":3d")?a.1j==d.1S.1T&&b.is(":3d")&&b.4p(f):b.3h(f),a.1j!=d.1U.1s||e.is(":3d")?a.1j==d.1U.1T&&e.is(":3d")&&e.4p(f):e.3h(f)):(a.1j!=d.1S.1s||b.is(":3d")?a.1j==d.1S.1T&&b.is(":3d")&&b.24().4p(f):b.24().3h(f),a.1j!=d.1U.1s||e.is(":3d")?a.1j==d.1U.1T&&e.is(":3d")&&e.24().4p(f):e.24().3h(f))}).1Q("4W.1G 5g.1G",".19-7r",11(a){c.4a="4W"==a.1j?!0:!1}).1Q(K,".19-1O a.19-4n, .19-1O a.19-3m, .19-1O a.19-4v, .19-1O a.19-3Z",11(){14 a=g(j);a.8s("19-3m")?b.5q():a.8s("19-4v")?(b.5K(),a.1D("19-3Z").2p("19-4v")):a.8s("19-3Z")?(b.3Z(),a.1D("19-4v").2p("19-3Z")):b.3p()}).1Q(W,".19-1X, .19-1B-1W",11(a){a.8r()});if(d.26.6u&&!z)E.1Q("9j.1G",a);if(d.26.3z&&d.3z.9W)E.1Q("4W.1G 5g.1G",".19-1P:8v(.19-1h, .19-1p)",11(a){"4W"==a.1j&&c.3s?b.3Z():"5g"==a.1j&&c.4G&&b.5K()});h=g(".19-1X, .19-1P, .19-1B");if(d.26.3M)h.1Q("3M.1G",11(a,d){c.4a||(a.8r(),0>d?b.2d("1h"):0<d&&b.2d("1p"))});if(d.26.3N)f.1Q(9h,11(a){11 h(a){14 b=g(j);a=r[a];14 c=[w.2l[0]-x.2l[0],w.2l[1]-x.2l[1]];b[0].3j["1H"==e?"1w":"1y"]=("1H"==e?a.1w-c[0]:a.1y-c[1])+"4U"}11 k(a){if(w){14 b=a.6J.6Q?a.6J.6Q[0]:a;x={5z:(2y 9Y).9Z(),2l:[b.a0-n,b.a1-m]};f.1Y(h);a.8r()}}11 q(){f.1Y(11(){14 a=g(j),b=a.1A("31")||{1y:a.31().1y-m,1w:a.31().1w-n},c=b.1y;b=b.1w;a.1E(B,H).24().2x({1y:c,1w:b},a2,"2Q",11(){a.1E(B,"")})})}if(!(c.3V||c.3O||1==c.1R||c.5p)){c.3e.1D("19-a3");a=a.6J.6Q?a.6J.6Q[0]:a;14 m=E.4z(),n=E.4x(),p=[f.eq(0).31(),f.eq(1).31(),f.eq(2).31()],r=[{1y:p[0].1y-m,1w:p[0].1w-n},{1y:p[1].1y-m,1w:p[1].1w-n},{1y:p[2].1y-m,1w:p[2].1w-n}],w={5z:(2y 9Y).9Z(),2l:[a.a0-n,a.a1-m]},x;f.4o(W,k);E.8l(88,11(a){f.6W(W,k);c.3e.2p("19-a3");w&&x&&("1H"==e&&a4>x.5z-w.5z&&I(w.2l[0]-x.2l[0])>l&&I(w.2l[1]-x.2l[1])<8G?w.2l[0]>x.2l[0]?c.1o!=c.1R-1||d.2R?(c.3n=!0,b.2d("1h")):q():0!=c.1o||d.2R?(c.3n=!0,b.2d("1p")):q():"a5"==e&&a4>x.5z-w.5z&&I(w.2l[1]-x.2l[1])>l&&I(w.2l[0]-x.2l[0])<8G?w.2l[1]>x.2l[1]?c.1o!=c.1R-1||d.2R?(c.3n=!0,b.2d("1h")):q():0!=c.1o||d.2R?(c.3n=!0,b.2d("1p")):q():q());w=x=Q})}})},3Y:11(a){14 b=j,c=b.1l,d=b.17,e=a-c.1o;d.2R&&(a==c.1R-1&&0==c.1o&&(e=-1),c.1o==c.1R-1&&0==a&&(e=1));if(1==e)b.2d("1h");1Z if(-1==e)b.2d("1p");1Z{if(c.3V||c.3O)1a!1;"11"==1d d.1m.6k&&d.1m.6k.1n(b,b.1I);d.2C&&(c.3F=!0,p.2W.4e=d.2C+"/"+a);b.1k[a]&&(b.1k[a].17.3M?b.1l.4a=!1:c.4a=!0,c.5p=b.1k[a].17.3N?!1:!0);g.1Y([c.1P,c.2O,c.2M],11(a,b){b.1E(B,H).4p(d.2G.5P)});c.1o=a;c.1h=a+1;c.1p=a-1;b.5n();2D(11(){b.5D()},d.2G.5P+50);g(".19-2h",c.1B).2p("19-5k").eq(a).1D("19-5k");b.5U();d.2C&&2D(11(){c.3F=!1},55);d.2R||(c.2E.2i(c.2t).2i(c.4d).2i(c.43).2p("3Q"),0==c.1o&&c.2t.2i(c.4d).1D("3Q"),c.1o>=c.1R-1&&c.2E.2i(c.43).1D("3Q"));b.8j();"11"==1d d.1m.6x&&d.1m.6x.1n(b,b.1I)}},2d:11(a){14 b=j,c=b.1l,d=b.17,e=d.3B.23(),f=J(),h=d.2G.a6;if(c.3V||c.3O)1a!1;14 l="1h"==a?c.1h:c.1p;d.2C&&(c.3F=!0,p.2W.4e=d.2C+"/"+l);if("1h"==a){if(!b.1k[l])1a!1;14 k=c.2O,n=c.1P,m=c.2M,C="19-1p",y="19-1h"}1Z if("1p"==a){if(!b.1k[l])1a!1;k=c.2M;n=c.1P;m=c.2O;C="19-1h";y="19-1p"}"11"==1d d.1m.6k&&d.1m.6k.1n(b,b.1I);"1h"==a?c.3V=!0:c.3O=!0;14 q=g("1b.19-1S",n),u=g("1b.19-1U",n);q.1g&&q.24().4p(h,11(){g(j).4H()});u.1g&&u.24().4p(h,11(){g(j).4H()});b.1k[l].1S&&(b.7w(b.1k[l],k),q=g("1b.19-1S",k),u=1i(q.2m()/k.2m()*2k),d.1S.2V&&50>=u&&q.3h(h));if(q=b.1k[l].17.1U)b.7u(q,b.1k[l].1t,k),d.1U.2V&&g("1b.19-1U",k).3h(d.2G.5W);g.1Y([k,n,m],11(a,b){b.2p("19-1h 19-1p")});14 v=k.1A("31");q=f.1c-d.1N.5T;f=f.1e-d.1N.5S;u=v.64.1c;14 r=v.64.1e,t=v.a7;v=v.8e;14 w=1i(f/2-r/2-v.H-t.H/2);v=1i(q/2-u/2-v.W-t.W/2);k.1E(B,H).2x({1y:w,1w:v,2S:1},h,c.3n?"2Q":"5y",11(){k.1E(B,"")});g("1b.19-1W",k).2x({1c:u,1e:r},h,c.3n?"2Q":"5y");r=n.1A("31");14 x=r.3g;v=r.8e;u=r.64.1c;r=r.64.1e;u=1i(u*d.1N["1h"==a?"5H":"5I"]);r=1i(r*d.1N["1h"==a?"5H":"5I"]);w="1H"==e?1i(f/2-x.5x-r/2-v.H-t.H/2):1i(f-x.4J-v.H-t.H/2);"1p"==a?v="1H"==e?1i(q-x.4J-v.W-t.W/2):1i(q/2-u/2-v.W-x.5x-t.W/2):(w="1H"==e?w:1i(x.4J-v.H-r-t.H/2),v="1H"==e?1i(x.4J-v.W-u-t.W/2):1i(q/2-x.5x-u/2-v.W-t.W/2));g("1b.19-1W",n).2x({1c:u,1e:r},h,c.3n?"2Q":"5y");n.1D(C).1E(B,H).2x({1y:w,1w:v,2S:d.1N.6o},h,c.3n?"2Q":"5y",11(){n.1E(B,"");g(".19-2h",c.1B).2p("19-5k").eq(l).1D("19-5k");b.5U();b.1k[l]&&(c.4a=b.1k[l].17.3M?!1:!0,c.5p=b.1k[l].17.3N?!1:!0);c.3n=!1;-1!==["3w","1F"].1L(b.1k[c.1o].1j)&&g("1b.19-1W",n).3q();"1h"==a?(c.2O=m,c.2M=n,c.1P=k,c.2O.1T(),c.1h+=1,c.1p=c.1o,c.1o+=1,d.2R&&(c.1o>c.1R-1&&(c.1o=0),c.1o==c.1R-1&&(c.1h=0),0==c.1o&&(c.1p=c.1R-1)),b.5n(),b.1k[c.1h]?b.44(b.1k[c.1h],"1h"):c.3V=!1):(c.2M=m,c.2O=n,c.1P=k,c.2M.1T(),c.1h=c.1o,c.1o=c.1p,c.1p=c.1o-1,d.2R&&(c.1o==c.1R-1&&(c.1h=0),0==c.1o&&(c.1p=c.1R-1)),b.5n(),b.1k[c.1p]?b.44(b.1k[c.1p],"1p"):c.3O=!1);-1!==["3w","1F"].1L(b.1k[c.1o].1j)&&b.44(b.1k[c.1o],"1o");d.2C&&2D(11(){c.3F=!1},55);d.2R||(c.2E.2i(c.2t).2i(c.4d).2i(c.43).2p("3Q"),0==c.1o&&c.2t.2i(c.4d).1D("3Q"),c.1o>=c.1R-1&&c.2E.2i(c.43).1D("3Q"));b.3r();b.8j();"11"==1d d.1m.6x&&d.1m.6x.1n(b,b.1I)});w="1H"==e?F(m,"1y"):"1h"==a?1i(-(f/2)-m.2m()):1i(2*w);v="1H"==e?"1h"==a?1i(-(q/2)-m.3o()):1i(2*v):F(m,"1w");m.1E(B,H).2x({1y:w,1w:v,2S:d.1N.6p},h,c.3n?"2Q":"5y",11(){m.1E(B,"")}).1D(y)},7w:11(a,b){14 c=g(\'<1b 1v="19-1S"></1b>\');a.1S&&(c.2L(a.1S),g("1b.19-1W",b).1J(c))},a8:11(a,b){14 c=j.17,d=p.2W.2Z;g.1Y(a,11(e,f){if(!f)1a!0;4h(e.23()){1r"a9":14 h="3K://5f.a9.3b/ab.7L?v=4&2g=bm&u={1t}";14 g="4L 1Q eo";1z;1r"ae":h="3K://ae.3b/es?5w={1t}";g="4L 1Q eu";1z;1r"ev":h="ew://ey.eA.3b/ab?2e={1t}";g="4L 1Q eB+";1z;1r"af":h="3K://af.3b/eD?2e={1t}";g="4L 1Q eE";1z;1r"ag":h="3K://ag.3b/ah?eH=2&2e={1t}";g="4L 1Q eI";1z;1r"7V":h="3K://7V.3b/ah?2e={1t}",g="4L 1Q 7V"}a[e]={1t:f.1t&&N(d,f.1t)||c.2C&&p.2W.2Z||"3l"!==1d b&&d||b&&N(d,b)||d,4s:f.4s||h||f.1t&&N(d,f.1t)||b&&N(d,b),2T:f.2T||g||"4L 1Q "+e,1c:"2K"==1d f.1c||bW(f.1c)?eK:1i(f.1c),1e:f.1e||eL}});1a a},7u:11(a,b,c){14 d=g(\'<1b 1v="19-1U"></1b>\'),e="<7S>";a=j.a8(a,b);g.1Y(a,11(a,b){a.23();14 c=b.4s.1q(/\\{1t\\}/g,7N(b.1t).1q(/!/g,"%21").1q(/\'/g,"%27").1q(/\\(/g,"%28").1q(/\\)/g,"%29").1q(/\\*/g,"%2A").1q(/%20/g,"+"));e+=\'<li 1v="\'+a+\'"><a 2Z="\'+c+\'" eN="aj:eP.ak(j.2Z\'+(0>=b.1c||0>=b.1e?"":", \'\', \'eR=4E,1O=4E,eS=7U,eU=7U,1e="+b.1e+",1c="+b.1c+",1w=40,1y=40\'")+\');1a 2U;" 1K="\'+b.2T+\'" 8J="am"></a></li>\'});e+="</7S>";d.2L(e);g("1b.19-1W",c).1J(d)},5q:11(){t.5A?t.7T()?t.5v(1x.3J):t.7o(1x.3J):j.8w()},8w:11(){14 a=j.1l,b=J(),c=j.17;if(c.3x){14 d=a.1P,e=j.1k[a.1o],f=b.1c,h=b.1e,l=[d,a.2O,a.2M,a.2E,a.2t,a.1X,a.1O,a.1B,a.2n];b=[a.2O,a.2M,a.2E,a.2t,a.2n,a.1B];if(a.2z)a.2z=a.5B=a.4a=a.5p=!1,a.1X.1E({2S:j.17.1X.2S}),g.1Y(b,11(a,b){b.1s()}),a.75.2N("1K",c.2T.8C),d.1A({2r:d.1A("6m"),2s:d.1A("6q"),6m:1f,6q:1f}),g.1Y(l,11(a,b){b.2p("19-3m")}),"11"==1d c.1m.ao&&c.1m.ao.1n(j,j.1I);1Z{a.2z=a.5B=a.4a=a.5p=!0;a.1X.1E({2S:1});g.1Y(b,11(a,b){b.1T()});a.75.2N("1K",c.2T.ap);if(-1!=c.6r.1L(e.1j))d.1A({6m:d.1A("2r"),6q:d.1A("2s"),2r:f,2s:h});1Z{b=e.17.4y||c.4y||"";a=f;e=h;f=d.1A("2r");14 k=d.1A("2s");"f6"==b.23()?(e=a/f*k,e<h&&(a=h/k*f,e=h)):"f7"==b.23()?(h=j.5O(a,e,f,k,!0),a=h.1c,e=h.1e):"f8"!=b.23()&&(h=j.5O(a,e,f,k,f>a||k>e?!0:!1),a=h.1c,e=h.1e);d.1A({6m:d.1A("2r"),6q:d.1A("2s"),2r:a,2s:e})}g.1Y(l,11(a,b){b.1D("19-3m")});"11"==1d c.1m.at&&c.1m.at.1n(j,j.1I)}}1Z a.2z=a.2z?!1:!0;j.3r(!0)},3p:11(){14 a=j.1l,b=j.17;O.6W(".1G");E.5u(".1G");a.2z&&t.5v(1x.3J);g(".19-1X, .19-1P, .19-1B").5u(".1G");b.1T.46?a.1X.24().4p(b.1T.2q,11(){a.1X.4H();a.3e.2p("19-8I").5u(".1G")}):(a.1X.4H(),a.3e.2p("19-8I").5u(".1G"));g.1Y([a.1O,a.1P,a.2O,a.2M,a.2E,a.2t,a.2n,a.1B],11(a,b){b.8f("3j").4H()});a.6C=a.2z=!1;p.1G=1f;b.2C&&(a.3F=!0,ia(),2D(11(){a.3F=!1},55));"11"==1d b.1m.ax&&b.1m.ax.1n(j,j.1I)},3r:11(){14 a=j.1l,b=j.17,c=b.3B.23(),d=J(),e=d.1c,f=d.1e;d=a.2z&&b.3x||a.3I?0:"1H"==c?0:a.1B.3o();14 h=a.3I?a.1O.2m():a.2z&&b.3x?0:"1H"==c?a.1B.2m():0;e=a.2z&&b.3x?e:e-b.1N.5T;f=a.2z&&b.3x?f:f-b.1N.5S;14 l="1H"==c?1i(j.1k[a.1h]||j.1k[a.1p]?2*(b.1N.5E+b.1N.63):30>=e/10?30:e/10):1i(30>=e/10?30:e/10)+d,k="1H"==c?1i(30>=f/10?30:f/10)+h:1i(j.1k[a.1h]||j.1k[a.1p]?2*(b.1N.5E+b.1N.63):30>=f/10?30:f/10);d={1j:"1o",1c:e,1e:f,5M:j.1k[a.1o],7J:l,7H:k,aA:d,aB:h,2x:2I.1g,1P:a.1P};j.6B(d);j.1k[a.1h]&&(d=g.3C(d,{1j:"1h",5M:j.1k[a.1h],4J:b.1N.5E,5x:b.1N.aC,1P:a.2O}),j.6B(d));j.1k[a.1p]&&(d=g.3C(d,{1j:"1p",5M:j.1k[a.1p],4J:b.1N.63,5x:b.1N.aD,1P:a.2M}),j.6B(d));b="1H"==c?{1w:1i(e/2-a.2n.3o()/2)}:{1y:1i(f/2-a.2n.2m()/2)};a.2n.1E(b)},6B:11(a){14 b=j.1l,c=j.17,d=c.3B.23(),e="1o"==a.1j?b.2z&&c.3x?a.1c:a.1c-a.7J:a.1c-a.7J,f="1o"==a.1j?b.2z&&c.3x?a.1e:a.1e-a.7H:a.1e-a.7H,h=a.5M,l=a.5M.17,k=a.1P,n=a.4J||0,m=a.5x||0,p=a.aA,r=a.aB;"1o"==a.1j?("3c"==1d l.1c&&l.1c&&(e=b.2z&&c.3x&&(-1!=c.6r.1L(h.1j)||l.4y||c.4y)?e:l.1c>e?e:l.1c),"3c"==1d l.1e&&l.1e&&(f=b.2z&&c.3x&&(-1!=c.6r.1L(h.1j)||l.4y||c.4y)?f:l.1e>f?f:l.1e)):("3c"==1d l.1c&&l.1c&&(e=l.1c>e?e:l.1c),"3c"==1d l.1e&&l.1e&&(f=l.1e>f?f:l.1e));c.3S&&(f=1i(f-g(".19-4A-1O",k).2m()));b="3l"==1d l.1c&&-1!=l.1c.1L("%")?ba(1i(l.1c.1q("%","")),a.1c):k.1A("2r");h="3l"==1d l.1e&&-1!=l.1e.1L("%")?ba(1i(l.1e.1q("%","")),a.1e):k.1A("2s");h="3l"==1d l.1c&&-1!=l.1c.1L("%")||"3l"==1d l.1e&&-1!=l.1e.1L("%")?{1c:b,1e:h}:j.5O(e,f,b,h);e=g.3C({},h,{});"1p"==a.1j||"1h"==a.1j?(b=1i(h.1c*("1h"==a.1j?c.1N.5I:c.1N.5H)),h=1i(h.1e*("1h"==a.1j?c.1N.5I:c.1N.5H))):(b=h.1c,h=h.1e);f=1i((F(k,"5s-1w")+F(k,"5s-5F")+F(k,"4b-1w-1c")+F(k,"4b-5F-1c"))/2);l=1i((F(k,"5s-1y")+F(k,"5s-aE")+F(k,"4b-1y-1c")+F(k,"4b-aE-1c")+(g(".19-4A-1O",k).2m()||0))/2);4h(a.1j){1r"1o":14 q=1i(a.1e/2-h/2-l-r/2),u=1i(a.1c/2-b/2-f-p/2);1z;1r"1h":q="1H"==d?1i(a.1e/2-m-h/2-l-r/2):1i(a.1e-n-l-r/2);u="1H"==d?1i(a.1c-n-f-p/2):1i(a.1c/2-b/2-f-m-p/2);1z;1r"1p":q="1H"==d?1i(a.1e/2-m-h/2-l-r/2):1i(n-l-h-r/2),u="1H"==d?1i(n-f-b-p/2):1i(a.1c/2-m-b/2-f-p/2)}k.1A("31",{1y:q,1w:u,64:e,8e:{W:f,H:l},a7:{W:p,H:r},3g:a});0<a.2x&&c.2G.7d?(k.1E(B,H).24().2x({1y:q,1w:u},c.2G.5L,"2Q",11(){k.1E(B,"")}),g("1b.19-1W",k).24().2x({1c:b,1e:h},c.2G.5L,"2Q"),g("1b.19-4A-1O",k).24().2x({1c:b},c.2G.5L,"2Q",11(){g(j).1E("9N","3d")})):(k.1E({1y:q,1w:u}),g("1b.19-1W",k).1E({1c:b,1e:h}),g("1b.19-4A-1O",k).1E({1c:b}))},5K:11(a){14 b=j,c=b.1l,d=b.17;!d.3z.7E||d.26.3z&&1>=c.1R||a<c.4G||(c.4G=0,c.3s&&(c.3s=4I(c.3s)),c.3s=2D(11(){c.1o==c.1R-1?b.3Y(0):b.2d("1h")},d.3z.7E))},3Z:11(a){14 b=j.1l;a<b.4G||(b.4G=a||2k,b.3s&&(b.3s=4I(b.3s)))},8j:11(){14 a=j.1l;j.17.26.3z&&a.3s&&!a.4G&&j.5K()},5O:11(a,b,c,d,e){4l=a?b?Y(a/c,b/d):a/c:b/d;e||(4l>j.17.4r?4l=j.17.4r:4l<j.17.4q&&(4l=j.17.4q));a=j.17.7A?X(c*4l):a;b=j.17.7A?X(d*4l):b;1a{1c:a,1e:b,fr:4l}},5G:11(a){j.17=g.3C(!0,j.17,a||{});j.4K()},9n:11(){14 a=1x.5r("1F");j.3i={2u:!8R,2X:0<=1i(ha.4T("5Q"))?!0:!1,9d:!(!a.4j||!a.4j("1F/48").1q(/4E/,"")),97:!(!a.4j||!a.4j("1F/3y").1q(/4E/,"")),96:!(!a.4j||!a.4j("1F/5l").1q(/4E/,"")),aH:!(!a.4j||!a.4j("1F/2X").1q(/4E/,""))}},5c:11(a,b){4h(b.1j){1r"1F":14 c=!1,d=b.95,e=b.17.2j;("1F/48"==d||"48"==b.2Y||"8d"==b.2Y||e.aI)&&j.3i.9d?(b.2Y="48",b.1t=e.aI||b.1t):e.3y&&j.3i.97?(b.2Y="3y",b.1t=e.3y||b.1t):e.5l&&j.3i.96&&(b.2Y="82",b.1t=e.5l||b.1t);!j.3i.9d||"1F/48"!=d&&"48"!=b.2Y&&"8d"!=b.2Y?!j.3i.97||"1F/3y"!=d&&"3y"!=b.2Y?!j.3i.96||"1F/5l"!=d&&"82"!=b.2Y?!j.3i.aH||"1F/2X"!=d&&"bk"!=b.2Y&&"fE"!=b.2Y||(c=!0,d="1F/2X"):(c=!0,d="1F/5l"):(c=!0,d="1F/3y"):(c=!0,d="1F/48");if(c)14 f=g("<1F />",{1c:"2k%",1e:"2k%",6l:e.6l,5t:e.5t,aJ:e.aJ,26:e.26}).1J(g("<4s />",{2g:b.1t,1j:d}));1Z j.3i.2X?(f=g("<3g />",{1j:"1F/2X",4Q:"3K://5f.7t.3b/2X/7R"}).2N({1A:b.1t,1c:"2k%",1e:"2k%"}).1J(g("<4g />",{2f:"2g",2H:b.1t})).1J(g("<4g />",{2f:"5t",2H:"2U"})).1J(g("<4g />",{2f:"aK",2H:"2U"})).1J(g("<4g />",{2f:"aL",2H:"aM"})),D.7e&&(f=69(b.1t,"2k%","2k%","","fJ","aM","fK","2U","fL","2U"))):f=g("<2o />",{"1v":"19-67",2L:j.17.66.94.1q("{4Q}","3K://5f.7t.3b/2X/7R").1q("{1j}","5Q")});1z;1r"2u":if(j.3i.2u){14 h="",l=0;b.17.91?g.1Y(b.17.91,11(a,b){0!=l&&(h+="&");h+=a+"="+7N(b);l++}):h=1f;f=g("<8z />").2N({1j:"5R/x-6M-2u",2g:b.1t,1c:"3c"==1d b.17.1c&&b.17.1c&&"1"==j.17.4q&&"1"==j.17.4r?b.17.1c:"2k%",1e:"3c"==1d b.17.1e&&b.17.1e&&"1"==j.17.4q&&"1"==j.17.4r?b.17.1e:"2k%",fQ:"fR",fS:"#fT",4v:"6T",aK:"6T",fV:"6T",fW:"fX",aL:"fY",fZ:"aO",aP:"6T",91:h,3m:"7U"})}1Z f=g("<2o />",{"1v":"19-67",2L:j.17.66.94.1q("{4Q}","3K://5f.g0.3b/go/g2").1q("{1j}","g3 g4 g5")});1z;1r"3w":f=g("<3w />").2N({1c:"3c"==1d b.17.1c&&b.17.1c&&"1"==j.17.4q&&"1"==j.17.4r?b.17.1c:"2k%",1e:"3c"==1d b.17.1e&&b.17.1e&&"1"==j.17.4q&&"1"==j.17.4r?b.17.1e:"2k%",2g:b.1t,g6:0,8k:0,8m:0,g7:z?"g8":"g9",ga:"",gb:"",aP:""});1z;1r"76":f=g(\'<1b 1v="19-7r"></1b>\').2L(g(b.1t).5V(!0));1z;1r"2L":c=b.1t,c[0].7K||(c=g(b.1t),c=c.33?g("<1b>"+c+"</1b>"):c),f=g(\'<1b 1v="19-7r"></1b>\').2L(c)}g("1b.19-1W",a).3q().2L(f);"1F"===f[0].8T.23()&&D.4N&&2D(11(){14 a=f[0].aQ+"?"+M(gg*S());f[0].aQ=a;f[0].2g=a});1a f},9B:11(a,b){14 c=j,d=a.1t;c.62();ja(d,11(a){c.4B();if(a){14 d={1g:!1};d.2e=a.2e;if(6A==a.5w){a=a.gh;14 e=a.1j,g=a.4s;d.4s=g.2g;d.1c=g.1c&&1i(g.1c)||0;d.1e=g.1e&&1i(g.1e)||0;d.1j=e;d.2h=g.2h||a.aR&&a.aR[0];d.2j=a.2j||{};d.1g=!0;"5R/x-6M-2u"==g.1j?d.1j="2u":-1!=g.1j.1L("1F/")?d.1j="1F":-1!=g.1j.1L("/2L")?d.1j="3w":-1!=g.1j.1L("2F/")&&(d.1j="2F")}1Z if("2K"!=1d a.aS)5o a.aS;b.1n(j,d.1g?d:!1)}})},84:11(a){14 b=j.1l,c=j.17;a=U(a||p.2W.2Z).4e;14 d=a.25("/");b.3F||"#"+c.2C!=d[0]&&1<a.1g||(d[1]?(b=d[1]||0,j.1k[b]?(a=g(".19-1X"),a.1g&&a.2N("9A")==c.2C?j.3Y(b):j.6H[b].6U(z?"3L":"6j")):(a=g(".19-1X"),a.1g&&j.3p())):(a=g(".19-1X"),a.1g&&j.3p()))}};g.fn.1G=11(){14 a=2I,b=g.gm(a[0])?a[0]:a[1],c=g.3E(a[0])||"3l"==1d a[0]?a[0]:a[1];b||(b={});b=g.3C(!0,{2N:"2Z",3B:"a5",3v:"gn",2C:!1,2R:!1,4m:0,9o:!1,7A:!0,4r:1,4q:.2,3S:!1,8M:!1,8L:!0,3x:!0,4y:1f,6r:"2u, 1F",1X:{9U:!0,2S:.85},26:{6u:!1,3z:!1,1O:!0,3m:!0,2h:!0,3W:!0,3M:!0,3N:!0},3W:{1w:!0,5F:!0,6V:!0,9T:!0,9S:!0,9R:!0},1s:{46:!0,2q:aU,1K:!0},1T:{46:!0,2q:aU},1S:{2V:!0,1s:"4W",1T:"5g"},1U:{2V:!0,1s:"4W",1T:"5g",8Y:!1},1N:{5T:0,5S:0,5E:45,aC:0,6p:1,5I:1,63:45,aD:0,6o:1,5H:1},1B:{93:gq,92:80,9a:1,9b:.6},2G:{7d:!0,5L:6A,a6:a2,5P:gs,5W:6A},3z:{7E:gu,9W:!1,9G:!0},2T:{4n:"gv gw 6h 4n",8C:"8F aV (aW+8F)",ap:"gA aV (aW+8F)",9m:"gB",1h:"gC",8x:"gD"},66:{4f:"aX 4P aY aZ b0 6h 5a gI.",9O:"aX 4P aY aZ b0 6h 5a gJ.",94:"8E gL aN gM gN 6h gO 8A b4 <a 2Z=\'{4Q}\' 8J=\'am\'>{1j} 6Y</a>."},2P:{2e:"",6L:11(a,b){},7h:!1,6I:11(a,b){},7k:!1,4P:11(a,b,c){},68:11(a,b,c){},7p:!0,7m:!1,6y:1f,79:1f,1j:"gS"},1m:{}},b);14 d=g.3E(c)||"3l"==1d c?!0:!1;c=g.3E(c)?c:[];"3l"==1d a[0]&&(c[0]=a[0]);if(ka(g.fn.gT,"1.8",">=")){14 e=2y fa(g(j),b,c,d);1a{4n:11(){e.3p()},3m:11(){e.5q()},9D:11(){e.2d("1h")},9E:11(){e.2d("1p")},3Y:11(a){e.3Y(a)},4K:11(){e.4K()},7d:11(){0<2I.1g?e.3r(!0):e.3r()},5G:11(a){e.5G(a)},9F:11(){e.3p();e.6K()}}}5o"8E 8y 2v gV gW gX is gY gZ. 1G 8A 8y 1.8+";};g.1G=11(a,b){1a g.fn.1G(a,b)};g.3C(g.h0,{7x:11(a,b,c,d,e){1a-d*(P(1-(b/=e)*b)-1)+c},2Q:11(a,b,c,d,e){1a d*P(1-(b=b/e-1)*b)+c},5y:11(a,b,c,d,e){1a 1>(b/=e/2)?-d/2*(P(1-b*b)-1)+c:d/2*(P(1-(b-=2)*b)+1)+c}});(11(){g.1Y("7q 9i 99 h1 h2 3N h3 h4 h5 h6".25(" "),11(a,b){g.fn[b]=11(a){1a a?j.4o(b,a):j.6U(b)};g.b6&&(g.b6[b]=!0)});g.4D.b7.3L={b8:11(){14 a=j,b=g(j),c,d;b.4o("7q.8u",11(e){c=L();b.8l("99.8u",11(b){d=L();b=g.4D.he(b||p.4D);b.1j="3L";c&&d&&c.x==d.x&&c.y==d.y&&(g.4D.hf||g.4D.hg).1n(a,b);c=d=Q})})},b9:11(){g(j).6W("7q.8u")}}})();(11(){t={5A:!1,7T:11(){1a!1},7o:11(){},5v:11(){},8H:"",3t:""};8a=["4N","bd","o","8n","hm"];if("2K"!=1d 1x.5v)t.5A=!0;1Z 1u(14 a=0,b=8a.1g;a<b;a++)if(t.3t=8a[a],"2K"!=1d 1x[t.3t+"bf"]){t.5A=!0;1z}t.5A&&(t.8H=t.3t+"ho",t.7T=11(){4h(j.3t){1r"":1a 1x.hq;1r"4N":1a 1x.hr;7F:1a 1x[j.3t+"hv"]}},t.7o=11(a){1a""===j.3t?a.7o():a[j.3t+"hw"]()},t.5v=11(a){1a""===j.3t?1x.5v():1x[j.3t+"bf"]()})})();(11(){14 a=5m.8p;a=a.23();14 b=/(bg)[ \\/]([\\w.]+)/.4S(a)||/(4N)[ \\/]([\\w.]+)/.4S(a)||/(8t)(?:.*2v|)[ \\/]([\\w.]+)/.4S(a)||/(7e) ([\\w.]+)/.4S(a)||0>a.1L("hz")&&/(hA)(?:.*? bh:([\\w.]+)|)/.4S(a)||[];a=b[1]||"";b=b[2]||"0";D={};a&&(D[a]=!0,D.2v=b);D.bg?D.4N=!0:D.4N&&(D.hC=!0)})();(11(){11 a(a){1u(14 d=0,f=b.1g;d<f;d++){14 h=b[d]?b[d]+a.41(0).hD()+a.74(1):a;if(c.3j[h]!==Q)1a h}}14 b=["","4N","bd","8n","o"],c=1x.5r("1b");B=a("hE")||"";H=a("hF")?"hG(0) ":""})();14 ha={2v:"0.7.9",2f:"hH",bj:11(a,b,c){1a 11(){a(b,c)}},5j:"<",4R:11(a){1a"2K"!=1d a},3E:11(a){1a/hL/i.1C(7l.4c.7P.1n(a))},4X:11(a){1a"11"==1d a},4M:11(a){1a"3l"==1d a},5X:11(a){1a"3c"==1d a},4i:11(a){1a"3l"==1d a&&/\\d/.1C(a)},bn:/[\\d][\\d\\.\\6g,-]*/,34:/[\\.\\6g,-]/g,5i:11(a,b){14 c=j.4i(a)?(j.4R(b)?2y 2B(b):j.bn).4S(a):1f;1a c?c[0]:1f},3U:11(a,b,c){14 d=1i;if(j.4i(a)&&j.4i(b)){if(j.4R(c)&&c.3U)1a c.3U(a,b);a=a.25(j.34);b=b.25(j.34);1u(c=0;c<Y(a.1g,b.1g);c++){if(d(a[c],10)>d(b[c],10))1a 1;if(d(a[c],10)<d(b[c],10))1a-1}}1a 0},3A:11(a,b){14 c;if(!j.4i(a))1a 1f;j.5X(b)||(b=4);b--;14 d=a.1q(/\\s/g,"").25(j.34).5Y(["0","0","0","0"]);1u(c=0;4>c;c++)if(/^(0+)(.+)$/.1C(d[c])&&(d[c]=2B.$2),c>b||!/\\d/.1C(d[c]))d[c]="0";1a d.74(0,4).58(",")},$$5Z:11(a){1a 11(b){if(!a.3R&&b){14 c,d,e=a.3E(b)?b:a.4M(b)?[b]:[];1u(d=0;d<e.1g;d++)if(a.4M(e[d])&&/[^\\s]/.1C(e[d])&&(c=(b=5m.i1[e[d]])?b.7v:0)&&(c.2f||c.4u))1a b}1a 1f}},9c:11(a,b,c){a=2y 2B(a,"i");b=!j.4R(b)||b?/\\d/:0;c=c?2y 2B(c,"i"):0;14 d=5m.3i,e;1u(e=0;e<d.1g;e++){14 f=d[e].4u||"";14 h=d[e].2f||"";if(a.1C(f)&&(!b||b.1C(2B.bo+2B.bp))||a.1C(h)&&(!b||b.1C(2B.bo+2B.bp)))if(!c||!c.1C(f)&&!c.1C(h))1a d[e]}1a 1f},i7:11(a,b,c){14 d;b=2y 2B(b,"i");c=c?2y 2B(c,"i"):0;14 e,f=j.4M(a)?[a]:a;1u(e=0;e<f.1g;e++)if((d=j.5Z(f[e]))&&(d=d.7v)){14 h=d.4u||"";a=d.2f||"";if(b.1C(h)||b.1C(a))if(!c||!c.1C(h)&&!c.1C(a))1a d}1a 0},8Z:11(a,b){14 c,d,e=-1;if(2<j.6n||!a||!a.2v||!(c=j.5i(a.2v)))1a b;if(!b)1a c;c=j.3A(c);b=j.3A(b);14 f=b.25(j.34);14 h=c.25(j.34);1u(d=0;d<f.1g;d++)if(-1<e&&d>e&&"0"!=f[d]||h[d]!=f[d]&&(-1==e&&(e=d),"0"!=f[d]))1a b;1a c},bq:p.ie,3T:11(a){14 b=1f;2a{b=2y j.bq(a)}2b(c){}1a b},bs:11(a){14 b,c=/^[\\$][\\$]/;1u(b in a)if(c.1C(b))2a{14 d=b.74(2);0<d.1g&&!a[d]&&(a[d]=a[b](a),6a a[b])}2b(e){}},6s:11(a,b,c){14 d;if(a){if(1==a[b[0]]||c)1u(d=0;d<b.1g;d+=2)a[b[d]]=b[d+1];1u(d in a)(c=a[d])&&1==c[b[0]]&&j.6s(c,b)}},bt:11(){14 a=5m,b,c=1x,d=a.8p||"",e=a.bc||"",f=a.io||"";a=a.iq||"";j.6s(j,["$",j]);1u(b in j.5h)j.5h[b]&&j.6s(j.5h[b],["$",j,"$$",j.5h[b]],1);j.bs(j);j.6n=2k;if(f){14 h=["8N",1,"iv",2,"iw",3,"ix",4,"b5",21.1,"b1",21.2,"b2",21.3,"8N.*iy",22.1,"8N.*iA",22.2,"iB\\\\s*iC",22.3,"",2k];1u(b=h.1g-2;0<=b;b-=2)if(h[b]&&(2y 2B(h[b],"i")).1C(f)){j.6n=h[b+1];1z}}j.35=c.6v("35")[0]||c.6v("2J")[0]||c.2J||1f;j.65=(j.3R=(2y iG("1a/*@iH!@*/!1"))())&&/iI\\s*(\\d+\\.?\\d*)/i.1C(d)?7Y(2B.$1,10):1f;j.7X=j.7I=1f;if(j.3R){b=1x.5r("1b");2a{b.3j.iN="2e(#7F#iO)",j.7I=b.iP("{iQ-iR-7G-iT-iU}","iV").1q(/,/g,".")}2b(l){}b=7Y(j.7I||"0",10);j.7X=c.bz||(/iX/i.1C(c.iY||"")?5:b)||j.65;j.65=b||j.7X}j.6D=!1;if(j.3R)1u(c="bB.j0 bB.j1 j2.j3 6E.6E bD.bD j6.j7 j8.j9 jb.jc".25(" "),b=0;b<c.1g;b++)if(j.3T(c[b])){j.6D=!0;1z}j.jd=(j.je=/bE/i.1C(a)&&/bE\\s*\\/\\s*\\d/i.1C(d))?j.3A(/bh\\s*\\:\\s*([\\.\\,\\d]+)/i.1C(d)?2B.$1:"0.9"):1f;j.jg=(j.bF=/ji\\s*\\/\\s*(\\d[\\d\\.]*)/i.1C(d))?j.3A(2B.$1):1f;j.jj=(j.jk=(/jl/i.1C(e)||!e&&!j.bF)&&/jm\\s*\\/\\s*(\\d[\\d\\.]*)/i.1C(d))&&/bG\\s*\\/\\s*(\\d[\\d\\.]*)/i.1C(d)?j.3A(2B.$1):1f;j.jo=(j.jp=/aT\\s*[\\/]?\\s*(\\d+\\.?\\d*)/i.1C(d))&&(/bG\\s*\\/\\s*(\\d+\\.?\\d*)/i.1C(d),1)?7Y(2B.$1,10):1f;j.bH("5a",j.bj(j.bI,j))},bJ:11(a){14 b={5w:-3,6Y:0};if(!j.4M(a))1a b;if(1==a.1g)1a j.7C=a,b;a=a.23().1q(/\\s/g,"");14 c=j.5h[a];if(!c||!c.4T)1a b;b.6Y=c;j.4R(c.5e)||(c.5e=1f,c.2v=1f,c.bM=1f,c.5d=1f,c.ju=a);j.8P=!1;if(j.3R&&!j.6D&&"jw"!==a)1a b.5w=-2,b;b.5w=1;1a b},bN:11(a,b){j.3E(b)&&(j.4X(a)||j.3E(a)&&0<a.1g&&j.4X(a[0]))&&b.4F(a)},6c:11(a){14 b;if(j.3E(a))1u(b=0;b<a.1g&&1f!==a[b];b++)j.1n(a[b]),a[b]=1f},1n:11(a){14 b=j.3E(a)?a.1g:-1;if(0<b&&j.4X(a[0]))a[0](j,1<b?a[1]:0,2<b?a[2]:0,3<b?a[3]:0);1Z j.4X(a)&&a(j)},7C:",",$$4T:11(a){1a 11(b,c,d){b=a.bJ(b);if(0>b.5w)1a 1f;b=b.6Y;1!=b.5d&&(b.4T(1f,c,d),1f===b.5d&&(b.5d=1));a.bO();1a c=(c=b.2v||b.bM)?c.1q(a.34,a.7C):c}},bO:11(){j.8P&&j.4R(p.bP)&&p.bP()},7Q:11(a,b){14 c=!1,d=\'<3g 1c="1" 1e="1" 3j="6R:51" \'+a.bR(b)+">"+a.bS+j.5j+"/3g>";if(!j.35)1a c;j.35.bT(1x.5r("3g"),j.35.36);j.35.36.7B=d;2a{j.35.36.6G=a.6S}2b(e){}2a{j.35.36.3g&&(c=!0)}2b(e){}2a{c&&4>j.35.36.bV&&(j.8P=!0)}2b(e){}j.35.6d(j.35.36);1a c},6e:11(a,b){14 c=j;if(!c.6D||!a)1a 1f;a.6f&&a.6f.1g&&1f!==a.6f[a.6f.1g-1]&&c.6c(a.6f);14 d,e=a.8i;if(c.4i(b)){if(e.6i&&e.3D&&0>=c.3U(b,e.3D))1a!0;if(e.6i&&e.3H&&0<=c.3U(b,e.3H))1a!1;(d=c.7Q(a,b))&&(!e.3D||0<c.3U(b,e.3D))&&(e.3D=b);d||e.3H&&!(0>c.3U(b,e.3H))||(e.3H=b);1a d}14 f=[0,0,0,0],h=[].5Y(e.8g),g=e.3D?1:0,k,n=11(b,d){14 e=[].5Y(f);e[b]=d;1a c.7Q(a,e.58(","))};if(e.3H){d=e.3H.25(c.34);1u(k=0;k<d.1g;k++)d[k]=1i(d[k],10);d[0]<h[0]&&(h[0]=d[0])}if(e.3D){14 m=e.3D.25(c.34);1u(k=0;k<m.1g;k++)m[k]=1i(m[k],10);m[0]>f[0]&&(f[0]=m[0])}if(m&&d)1u(k=1;k<m.1g&&m[k-1]==d[k-1];k++)d[k]<h[k]&&(h[k]=d[k]),m[k]>f[k]&&(f[k]=m[k]);if(e.3H)1u(k=1;k<h.1g;k++)if(0<d[k]&&0==h[k]&&h[k-1]<e.8g[k-1]){h[k-1]+=1;1z}1u(k=0;k<h.1g;k++){m={};1u(e=0;20>e&&!(1>h[k]-f[k]);e++){d=X((h[k]+f[k])/2);if(m["a"+d])1z;m["a"+d]=1;n(k,d)?(f[k]=d,g=1):h[k]=d}h[k]=f[k];!g&&n(k,f[k])&&(g=1);if(!g)1z}1a g?f.58(","):1f},bH:11(a,b){if(j.4X(b))if(p.bY)p.bY(a,b,!1);1Z if(p.bZ)p.bZ("1Q"+a,b);1Z{14 c=p["1Q"+a];p["1Q"+a]=j.c0(b,c)}},c0:11(a,b){1a 11(){a();"11"==1d b&&b()}},c1:[],4O:[],bI:11(a){a.3f=!0;a.6c(a.c1);a.6c(a.4O);if(a.7W)a.7W()},3f:!1,$$jR:11(a){1a 11(b){a.3f?a.1n(b):a.bN(b,a.4O)}},1b:1f,71:"jT",c3:50,3k:1,c4:11(){14 a,b,c;if(j.1b&&j.1b.57)1u(a=j.1b.57.1g-1;0<=a;a--){if((c=j.1b.57[a])&&c.57)1u(b=c.57.1g-1;0<=b;b--){14 d=c.57[b];2a{c.6d(d)}2b(e){}}if(c)2a{j.1b.6d(c)}2b(e){}}!j.1b&&(a=1x.7Z(j.71))&&(j.1b=a);if(j.1b&&j.1b.7O){2a{j.1b.7O.6d(j.1b)}2b(e){}j.1b=1f}},7y:[],7W:11(){14 a,b;if(j.3f&&(!j.4O||!j.4O.1g||1f===j.4O[j.4O.1g-1])){1u(a in j)if((b=j[a])&&b.7c&&(3==b.k3||b.7c.1g&&1f!==b.7c[b.7c.1g-1]))1a;1u(a=0;a<j.7y.1g;a++)j.6c(j.7y);j.c4()}},7f:11(a){1a a&&(a=a.k5||a.k6,j.5X(a))?a:-1},k7:11(a,b,c,d){14 e=a.2o,f=j.7f(e);c=c.2o;14 g=j.7f(c);b=b.2o;14 l=j.7f(b);if(!(e&&c&&b&&j.7g(a)))1a-2;if(g<l||0>f||0>g||0>l||l<=j.3k||1>j.3k)1a 0;if(f>=l)1a-1;2a{if(f==j.3k&&(!j.3R||4==j.7g(a).bV)&&(!a.3f&&j.3f||a.3f&&j.5X(d)&&(j.5X(a.8O)||(a.8O=d),10<=d-a.8O)))1a 1}2b(k){}1a 0},7g:11(a,b){14 c=a?a.2o:0,d=c&&c.36?1:0;2a{d&&b&&j.1b.kb()}2b(e){}1a d?c.36:1f},7i:11(a,b){14 c=a.3j,d;if(c&&b)1u(d=0;d<b.1g;d+=2)2a{c[b[d]]=b[d+1]}2b(e){}},c7:11(a,b){14 c=1f,d=b?p.1y.1x:p.1x,e=d.6v("2J")[0]||d.2J;if(!e)2a{d.c8(\'<1b id="c9">.\'+j.5j+"/1b>"),c=d.7Z("c9")}2b(f){}if(e=d.6v("2J")[0]||d.2J)e.bT(a,e.36),c&&e.6d(c)},cb:11(a,b,c,d,e){e=1x;14 f=e.5r("2o"),g,l="kh 51 ki 51 5s 4Z cc 4Z cd 3d".25(" ");j.4R(d)||(d="");if(j.4M(a)&&/[^\\s]/.1C(a)){a=a.23().1q(/\\s/g,"");14 k=j.5j+a+\' 1c="\'+j.3k+\'" 1e="\'+j.3k+\'" \';k+=\'3j="kl-3j:51;4b-3j:51;5s:4Z;cc:4Z;cd:3d;6R:76;" \';1u(g=0;g<b.1g;g+=2)/[^\\s]/.1C(b[g+1])&&(k+=b[g]+\'="\'+b[g+1]+\'" \');k+=">";1u(g=0;g<c.1g;g+=2)/[^\\s]/.1C(c[g+1])&&(k+=j.5j+\'4g 2f="\'+c[g]+\'" 2H="\'+c[g+1]+\'" />\');k+=d+j.5j+"/"+a+">"}1Z k=d;j.1b||((b=e.7Z(j.71))?j.1b=b:(j.1b=e.5r("1b"),j.1b.id=j.71),j.7i(j.1b,l.5Y(["1c",j.c3+"4U","1e",j.3k+3+"4U","cf",j.3k+3+"4U","cg",j.3k+3+"4U","ci","cj","6R","kr"])),b||(j.7i(j.1b,"87 ks 5F 4Z 1y 4Z".25(" ")),j.c7(j.1b)));if(j.1b&&j.1b.7O){j.7i(f,l.5Y(["cf",j.3k+3+"4U","cg",j.3k+3+"4U","ci","cj","6R","76"]));2a{f.kt=k}2b(n){}2a{j.1b.ku(f)}2b(n){}1a{2o:f,3f:j.3f,8T:a,7B:k}}1a{2o:1f,3f:j.3f,8T:"",7B:k}},5h:{2X:{4t:["1F/2X","5R/x-kw","2F/x-kx","2F/x-2X"],3G:"ky.kz.1",kA:"5Q.5Q",6S:"6F:bK-bC-bA-by-bx",9e:7,bS:\'<4g 2f="2g" 2H="" /><4g 2f="kC" 2H="2U" />\',bR:11(a){1a\'6z="#2v=\'+a+\'"\'},8i:{3D:0,3H:0,6i:0,8g:[16,cm,cm,0]},4T:11(a){14 b=j.$,c=1f,d=1f;if(b.3R){b.4i(a)&&(a=a.25(b.34),3<a.1g&&0<1i(a[3],10)&&(a[3]="kF"),a=a.58(","));if(b.4i(a)&&b.65>=j.9e&&0<j.8S()){j.5e=j.cn(a);j.5d=0;1a}j.5d=1;!c&&b.65>=j.9e&&(c=j.cp(b.6e(j)));c||(d=b.3T(j.3G))&&d.cq&&(c=d.cq.7P(16),c=1i(c.41(0),16)+"."+1i(c.41(1),16)+"."+1i(c.41(2),16))}1Z b.5Z(j.4t)&&(d=3!=b.6n?b.9c("5Q.*kI-?in",0):1f)&&d.2f&&(c=b.5i(d.2f));j.5e=c?1:d?0:-1;j.2v=b.3A(c,3)},8X:["7,60,0,0","0,0,0,0"],8Q:["7,50,0,0",1f],7M:[11(a,b){14 c=b.25(a.$.34);1a[c[0],c[1].41(0),c[1].41(1),c[2]].58()},1f],cp:11(a){14 b=j.$,c,d=j.8X,e=j.8Q;if(a)1u(a=b.3A(a),c=0;c<d.1g;c++)if(d[c]&&0>b.3U(a,d[c])&&e[c]&&0<=b.3U(a,e[c])&&j.7M[c])1a j.7M[c](j,a);1a a},8S:11(){14 a=j.$,b,c=j.8S,d=j.8X,e=j.8Q;if(!c.2H)1u(c.2H=-1,b=0;b<d.1g;b++){if(d[b]&&a.6e(j,d[b])){c.2H=1;1z}if(e[b]&&a.6e(j,e[b])){c.2H=-1;1z}}j.8i.6i=1==c.2H?1:0;1a c.2H},cn:11(a){1a j.$.6e(j,a)?.7:-1}},2u:{4t:"5R/x-6M-2u",3G:"6E.6E",6S:"6F:kM-kN-7G-kO-cs",4T:11(){14 a=11(a){1a a?(a=/[\\d][\\d\\,\\.\\s]*[ct]{0,1}[\\d\\,]*/.4S(a))?a[0].1q(/[ct\\.]/g,",").1q(/\\s/g,""):1f:1f},b=j.$,c,d=1f,e=1f,f=1f;if(b.3R){1u(c=15;2<c;c--)if(e=b.3T(j.3G+"."+c)){f=c.7P();1z}e||(e=b.3T(j.3G));if("6"==f)2a{e.kP="aO"}2b(h){1a"6,0,21,0"}2a{d=a(e.cu("$2v"))}2b(h){}!d&&f&&(d=f)}1Z{if(e=b.5Z(j.4t)){c=b.7g(b.cb("3g",["1j",j.4t],[],"",j));2a{d=b.5i(c.cu("$2v"))}2b(h){}}d||((c=e?e.7v:1f)&&c.4u&&(d=a(c.4u)),d&&(d=b.8Z(c,d)))}j.5e=d?1:-1;j.2v=b.3A(d);1a!0}},6M:{4t:"5R/x-kR",3G:"cv.cv",6S:"6F:kS-kT-7G-kU-cs",4T:11(){14 a=1f,b=1f,c=j.$;if(c.3R){2a{b=c.3T(j.3G).kV("")}2b(d){}c.4M(b)&&0<b.1g?a=c.5i(b):c.3T(j.3G+".8")?a="8":c.3T(j.3G+".7")?a="7":c.3T(j.3G+".1")&&(a="6")}1Z(b=c.9c("kW\\\\s*1u\\\\s*kX"))&&b.4u&&c.5Z(j.4t)&&(a=c.5i(b.4u)),a&&(a=c.8Z(b,a));j.5e=a?1:-1;j.2v=c.3A(a)}},9t:0}};ha.bt();14 bL=\'8E "%%" 11 8A an kY 3c kZ 2I.\\l0 l1 be in b4 l3 "l4", "l5", ...\',r=1f;(11(){11 a(a){a=a||2W.2Z;1a"#"+a.1q(/^[^#]*#?(.*)$/,"$1")}14 b=1x,c=g.4D.b7,d=b.bz,e="l6"in p&&(cw 0===d||7<d);g.fn.3a=11(a){1a a?j.4o("3a",a):j.6U("3a")};g.fn.3a.cx=50;c.3a=g.3C(c.3a,{b8:11(){if(e)1a!1;g(f.2V)},b9:11(){if(e)1a!1;g(f.24)}});14 f=11(){11 c(){14 b=a(),d=t(n);b!==n?(r(n=b,d),g(p).6U("3a")):d!==n&&(2W.2Z=2W.2Z.1q(/#.*/,"")+d);f=2D(c,g.fn.3a.cx)}14 d={},f,n=a(),m=11(a){1a a},r=m,t=m;d.2V=11(){f||c()};d.24=11(){f&&4I(f);f=cw 0};D.7e&&!e&&11(){14 e,f;d.2V=11(){e||(f=(f=g.fn.3a.2g)&&f+a(),e=g(\'<3w 6w="-1" 1K="3q"/>\').1T().8l("5a",11(){f||r(a());c()}).2N("2g",f||"aj:0").l9("2J")[0].lc,b.ld=11(){2a{"1K"===4D.lf&&(e.1x.1K=b.1K)}2b(v){}})};d.24=m;t=11(){1a a(e.2W.2Z)};r=11(a,c){14 d=e.1x,f=g.fn.3a.cy;a!==c&&(d.1K=b.1K,d.ak(),f&&d.c8(\'<9g>1x.cy="\'+f+\'"\\lj/9g>\'),d.4n(),e.2W.4e=a)}}();1a d}()})();4Y.4c.5J||(4Y.4c.5J=11(a,b){if(1f==j)5o 2y 7s;14 c=7l(j),d=c.1g>>>0;if("11"!=1d a)5o 2y 7s;1u(14 e=[],f=0;f<d;f++)if(f in c){14 g=c[f];a.1n(b,g,f,c)&&e.4F(g)}1a e});4Y.4c.1L||(4Y.4c.1L=11(a,b){if(1f==j)5o 2y 7s(\'"j" is 1f lo 8v lp\');14 c=7l(j),d=c.1g>>>0;if(0===d)1a-1;14 e=+b||0;lq===I(e)&&(e=0);if(e>=d)1a-1;1u(e=ca(0<=e?e:d-I(e),0);e<d;){if(e in c&&c[e]===a)1a e;e++}1a-1});4Y.4c.73||(4Y.4c.73=11(a){if(1f==j)5o 2y 7s;14 b=7l(j),c=b.1g>>>0;if(0===c)1a-1;14 d=c;1<2I.1g&&(d=lr(2I[1]),d!=d?d=0:0!=d&&d!=1/0&&d!=-(1/0)&&(d=(0<d||-1)*M(I(d))));1u(c=0<=d?Y(d,c-1):c-I(d);0<=c;c--)if(c in b&&b[c]===a)1a c;1a-1})})(8y,j);',
        62,
        1330,
        "                   this                                            function   var   options  ilightbox return div width typeof height null length next parseInt type items vars callback call current prev replace case show URL for class left document top break data thumbnails test addClass css video iLightBox horizontal ui append title indexOf onRender styles toolbar holder on total caption hide social onAfterLoad container overlay each else    toLowerCase stop split controls    try catch onBeforeLoad moveTo url name src thumbnail add html5video 100 coords outerHeight loader span removeClass speed naturalWidth naturalHeight prevButton flash version onShow animate new isInFullScreen  RegExp linkId setTimeout nextButton image effects value arguments body undefined html prevPhoto attr nextPhoto ajaxSetup easeOutCirc infinite opacity text false start location quicktime ext href  offset  selector splitNumRegx head firstChild    iLightBoxHashChange com number visible BODY winLoaded object fadeIn plugins style pluginSize string fullscreen isSwipe outerWidth closeAction empty repositionPhoto cycleID prefix pathname skin iframe fullAlone webm slideshow formatNum path extend min isArray hashLock progID max isMobile documentElement http itap mousewheel swipe prevLock configureHolder disabled isIE innerToolbar getAXO compareNums nextLock keyboard loadRequests goTo pause  charAt button innerNextButton loadContent  effect  mp4  lockWheel border prototype innerPrevButton hash loadImage param switch isStrNum canPlayType context factor startFrom close bind fadeOut minScale maxScale source mimeType description play authority scrollLeft fullViewPort scrollTop inner hideLoader mouseID event no push isPaused remove clearTimeout offsetX refresh Share isString webkit WLfuncs error pluginspage isDefined exec getVersion px Math mouseenter isFunc Array 0px  none     protocol childNodes join ondragstart load obj addContent getVersionDone installed www mouseleave Plugins getNum openTag active ogg navigator createUI throw lockSwipe fullScreenAction createElement padding autoplay off cancelFullScreen status offsetY easeInOutCirc time supportsFullScreen lockKey generateThumbnails generateBoxes nextOffsetX right setOption prevScale nextScale filter resume repositionSpeed item 01 getNewDimenstions loadedFadeSpeed QuickTime application pageOffsetY pageOffsetX positionThumbnails clone fadeSpeed isNum concat hasMimeType   showLoader prevOffsetX newDims verIE errors alert success ma delete emb callArray removeChild codebaseSearch BIfuncs _ to match click onBeforeChange preload naturalWidthOld OS prevOpacity nextOpacity naturalHeightOld fullStretchTypes initObj getAttribute arrows getElementsByTagName tabindex onAfterChange username codebase 200 repositionEl dontGenerateThumbs ActiveXEnabled ShockwaveFlash clsid classid itemsObject complete originalEvent dispatchItemsEvents beforeSend shockwave substring thumbs grid touches display classID true trigger up unbind supportTouch plugin pl  divID php_js lastIndexOf slice fullScreenButton inline patchEvents search password addContents icon funcs reposition msie getWidth getDOMobj cache setStyle ajax crossDomain Object ifModified scrollTo requestFullScreen global touchstart wrapper TypeError apple setSocial enabledPlugin setCaption easeInCirc DONEfuncs dataType keepAspectRatio outerHTML getVersionDelimiter img pauseTime default 11CF offsetH verIEfull offsetW nodeName php cdbase2ver encodeURIComponent parentNode toString isActiveXObject download ul isFullScreen yes reddit onDoneEmptyDiv docModeIE parseFloat getElementById   ogv  hashChangeHandler  patchItemsEvents position qa normalizeItems browserPrefixes hideableElements mo m4v diff removeAttr digits mobileMaxWidth SEARCH resetCycle hspace one vspace ms align userAgent pop preventDefault hasClass opera iTap not doFullscreen previous jQuery embed requires innerPlayButton enterFullscreen ny The Enter verticalDistanceThreshold fullScreenEventName noscroll target te mobileOptimizer smartRecognition Win count garbage cdbaseLower oa canUseIsMin tagName index attachItems dims cdbaseUpper buttons getPluginFileVersion  flashvars maxHeight maxWidth missingPlugin videoType html5Vorbis html5WebM  touchend normalOpacity activeOpacity findNavPlugin html5H264 minIEver mobile script pa touchmove mousemove instant closeButton slideShow availPlugins randomStart instantCall se 30px 192px zz ts ri mc 1280 720 recognized linkid ogpRecognition console moveNext movePrev destroy startPaused ta pt onOpen loadSwitcher element nd overflow loadContents fadeTo setTime shift_enter esc down blur oo pauseOnHover wa Date getTime pageX pageY 500 closedhand 1E3 vertical switchSpeed thumbsOffset normalizeSocial facebook  share   twitter delicious digg submit  javascript open  _blank  onExitFullScreen exitFullscreen os   onEnterFullScreen    onHide   thumbsOffsetW thumbsOffsetH nextOffsetY prevOffsetY bottom iris od html5QuickTime h264 poster loop scale tofit your always allowFullScreen currentSrc images response Opera 300 Fullscreen Shift An occurred when trying iPod iPad  the iPhone attrFn special setup teardown   vendor moz  CancelFullScreen chrome rv  handler mov   getNumRegx leftContext rightContext AXO  convertFuncs initScript noexternaldata accesskey  D3488ABDDC6B BC80 documentMode 4B23 Msxml2 8C17 TDCCtl Gecko isChrome Version addWinEvent runWLfuncs init 02BF25D5 na version0 fPush cleanup CollectGarbage pageYOffset getCodeBaseVersion HTML insertBefore ne readyState isNaN rc addEventListener attachEvent winHandler WLfuncs0 ENV divWidth emptyDiv 3E3 background insertDivInBody write pd33993399  insertHTML margin visibility  fontSize lineHeight  verticalAlign baseline  jsonp 128 isMin  CDBASE2VER QuickTimeVersion  444553540000 rRdD GetVariable SWCtl void delay domain ixi hei hcit haie un prepend warn vk zte gene g560 rg fly fetc 400 ze esl8 vi children veri dmob dica devi dbte ng v750 craw v400 mp cmd utst hidden cldc chtm si appendTo cell  cdm  ccwa  capi tx c55  bumb rd m5 nq m3  substr float sh  avan Image onload onerror onabort attw us tim aptu resize tel yw 2E3 keydown keyCode shiftKey tdg nc tcl amoi 00 t6 wi rn t2 mb whit sy sp abac 802s 770s so t5 sm sl sk 4thp sie shar 3gso 6590 6310  sgh 1207 xiino xda windows wap vodafone sdk sc dragger   link Facebook va   home browser Twitter googleplus https  plus  google Google mm post Delicious sa s55 phase Digg treo 640 360 zo onclick ve window ro menubar resizable symbian scrollbars 980 series psp pocket plucker re wmlb rim9 raks phone r600 fill fit stretch r380  qtek palm ob netfront 07 firefox qc webc mmp psio midp maemo  lge kindle wonu ratio w3c  hone prox iemobile hiptop fennec elaine compal blazer mousedown rt qt po pn uc mouseover SCALE AUTOPLAY LOOP blackberry bada avantgo mouseout quality high bgcolor 000000 meego menu wmode transparent showall allowScriptAccess adobe  getflash Adobe Flash player frameborder scrolling auto scroll webkitAllowFullScreen mozallowfullscreen android pire   3E4 results phil Mini pg IEMobile isPlainObject dark  pdxg 120  180  5E3 Press Esc BlackBerry pan p800 Exit Slideshow Next Previous owg1 oran wv ti photo contents op content are attempting view o2im nzph nok GET jquery webOS that was loaded too old easing tap taphold swipeleft swiperight scrollstart scrollstop wt Android wg  wf ontouchstart  fix dispatch handle tf  mouseup 3gp n7 khtml n50 fullscreenchange  fullScreen webkitIsFullScreen    FullScreen RequestFullScreen n30 movie compatible mozilla n20 safari toUpperCase transform perspective translateZ PluginDetect n10 mpeg mpg array x700 avi txt shtml rhtml rb mywa phtml php5 php4 php3 jsp htm cfm cgi mimeTypes aspx asp jpe mwbp currentElement getMimeEnabledPlugin jfif tif  nextElement   ActiveXObject   tiff png jpg prevElement jpeg currentItem  platform  product gif   bmp Mac Linux FreeBSD CE swf Mobile Pocket PC nextItem prevItem cab Function cc_on MSIE qtplugin qtactivex  p1 behavior clientcaps getComponentVersion 89820200 ECBD mt 8B85 00AA005B4383 componentid yas back compatMode 02 XMLHTTP DOMDocument Microsoft XMLDOM eval mmef Shell UIHelper Scripting Dictionary  wmplayer ocx verGecko isGecko nw verChrome o8 Chrome verSafari isSafari Apple Safari mi verOpera isOpera me xo m50 QT_GenerateOBJECTText pluginName m3ga java WEBM pageXOffset m1 metadata lynx lt abs zeto libw xi kyo sqrt kwc RC kpt klon setAttribute beta alpha dev onWindowLoaded kgt plugindetect keji kddi jigs port hostname host  String jemu OTF inArray scrollWidth offsetWidth getTagStatus gradient jbro  focus iLCallback ipaq inno im1k ikom outlineStyle borderStyle round log outline ig01 idea  ibro iac block absolute innerHTML appendChild i230 quicktimeplayer macpaint QuickTimeCheckObject QuickTimeCheck progID0 tc controller getSource vx 9999 net tp Plug floor Height Width D27CDB6E AE6D 96B8 AllowScriptAccess random director 166B1BCA 3F9C 8075 ShockwaveVersion Shockwave Director even of nArguments should  form atttributeName attributeValue oniLightBoxHashChange vulc voda insertAfter   contentWindow onpropertychange  propertyName  vm40  x3c   client innerWidth or defined Infinity Number".split(
            " "
        ),
        0,
        {}
    )
);
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
        return (-c / 2) * (--t * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
        return (c / 2) * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
        return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
        return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin((t / d) * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
        return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
        return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * 0.3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
        return (
            -(
                a *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin(((t * d - s) * (2 * Math.PI)) / p)
            ) + b
        );
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * 0.3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
        return (
            a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
            c +
            b
        );
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (0.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
        if (t < 1)
            return (
                -0.5 *
                (a *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
                b
            );
        return (
            a *
            Math.pow(2, -10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
            0.5 +
            c +
            b
        );
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1)
            return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        } else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        } else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2)
            return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
        return (
            jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
        );
    },
});
(function () {
    var t =
        [].indexOf ||
        function (t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e;
            }
            return -1;
        },
        e = [].slice;
    (function (t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function (n) {
                return e(n, t);
            });
        } else {
            return e(t.jQuery, t);
        }
    })(this, function (n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = { horizontal: {}, vertical: {} };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = (function () {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = { x: t.scrollLeft(), y: t.scrollTop() };
                this.waypoints = { horizontal: {}, vertical: {} };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function () {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function () {
                            e.doScroll();
                            return (e.didScroll = false);
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle);
                    }
                });
                t.bind(p, function () {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function () {
                            n[m]("refresh");
                            return (e.didResize = false);
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle);
                    }
                });
            }
            t.prototype.doScroll = function () {
                var t,
                    e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                    },
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh");
                }
                n.each(t, function (t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function (t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e);
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e);
                        }
                    });
                    l.sort(function (t, e) {
                        return t.offset - e.offset;
                    });
                    if (!o) {
                        l.reverse();
                    }
                    return n.each(l, function (t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i]);
                        }
                    });
                });
                return (this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll,
                });
            };
            t.prototype.refresh = function () {
                var t,
                    e,
                    r,
                    i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left",
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r
                            ? n[m]("viewportHeight")
                            : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top",
                    },
                };
                return n.each(t, function (t, e) {
                    return n.each(i.waypoints[t], function (t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element);
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil((e.contextDimension * i) / 100);
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if ((r.options.onlyOnScroll && l != null) || !r.enabled) {
                            return;
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward]);
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward]);
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward]);
                        }
                    });
                });
            };
            t.prototype.checkEmpty = function () {
                if (
                    n.isEmptyObject(this.waypoints.horizontal) &&
                    n.isEmptyObject(this.waypoints.vertical)
                ) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id];
                }
            };
            return t;
        })();
        l = (function () {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function () {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height();
                        }
                        return t - n(this).outerHeight();
                    };
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i);
            }
            t.prototype.trigger = function (t) {
                if (!this.enabled) {
                    return;
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t);
                }
                if (this.options.triggerOnce) {
                    return this.destroy();
                }
            };
            t.prototype.disable = function () {
                return (this.enabled = false);
            };
            t.prototype.enable = function () {
                this.context.refresh();
                return (this.enabled = true);
            };
            t.prototype.destroy = function () {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty();
            };
            t.getWaypointsByElement = function (t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return [];
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function (t) {
                    return e[t];
                });
            };
            return t;
        })();
        d = {
            init: function (t, e) {
                var r;
                if (e == null) {
                    e = {};
                }
                if ((r = e.handler) == null) {
                    e.handler = t;
                }
                this.each(function () {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i);
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i);
                    }
                    return new l(t, r, e);
                });
                n[m]("refresh");
                return this;
            },
            disable: function () {
                return d._invoke(this, "disable");
            },
            enable: function () {
                return d._invoke(this, "enable");
            },
            destroy: function () {
                return d._invoke(this, "destroy");
            },
            prev: function (t, e) {
                return d._traverse.call(this, t, e, function (t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1]);
                    }
                });
            },
            next: function (t, e) {
                return d._traverse.call(this, t, e, function (t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1]);
                    }
                });
            },
            _traverse: function (t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical";
                }
                if (e == null) {
                    e = r;
                }
                l = h.aggregate(e);
                o = [];
                this.each(function () {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t]);
                });
                return this.pushStack(o);
            },
            _invoke: function (t, e) {
                t.each(function () {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function (t, n) {
                        n[e]();
                        return true;
                    });
                });
                return this;
            },
        };
        n.fn[g] = function () {
            var t, r;
            (r = arguments[0]),
                (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
            if (d[r]) {
                return d[r].apply(this, t);
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments);
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r]);
            } else if (!r) {
                return n.error(
                    "jQuery Waypoints needs a callback function or handler option."
                );
            } else {
                return n.error(
                    "The " + r + " method does not exist in jQuery Waypoints."
                );
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false,
        };
        h = {
            refresh: function () {
                return n.each(a, function (t, e) {
                    return e.refresh();
                });
            },
            viewportHeight: function () {
                var t;
                return (t = r.innerHeight) != null ? t : i.height();
            },
            aggregate: function (t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0;
                }
                if (!e) {
                    return [];
                }
                r = { horizontal: [], vertical: [] };
                n.each(r, function (t, i) {
                    n.each(e[t], function (t, e) {
                        return i.push(e);
                    });
                    i.sort(function (t, e) {
                        return t.offset - e.offset;
                    });
                    r[t] = n.map(i, function (t) {
                        return t.element;
                    });
                    return (r[t] = n.unique(r[t]));
                });
                return r;
            },
            above: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "vertical", function (t, e) {
                    return e.offset <= t.oldScroll.y;
                });
            },
            below: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "vertical", function (t, e) {
                    return e.offset > t.oldScroll.y;
                });
            },
            left: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "horizontal", function (t, e) {
                    return e.offset <= t.oldScroll.x;
                });
            },
            right: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "horizontal", function (t, e) {
                    return e.offset > t.oldScroll.x;
                });
            },
            enable: function () {
                return h._invoke("enable");
            },
            disable: function () {
                return h._invoke("disable");
            },
            destroy: function () {
                return h._invoke("destroy");
            },
            extendFn: function (t, e) {
                return (d[t] = e);
            },
            _invoke: function (t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function (e, n) {
                    n[t]();
                    return true;
                });
            },
            _filter: function (t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return [];
                }
                o = [];
                n.each(i.waypoints[e], function (t, e) {
                    if (r(i, e)) {
                        return o.push(e);
                    }
                });
                o.sort(function (t, e) {
                    return t.offset - e.offset;
                });
                return n.map(o, function (t) {
                    return t.element;
                });
            },
        };
        n[m] = function () {
            var t, n;
            (n = arguments[0]),
                (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
            if (h[n]) {
                return h[n].apply(null, t);
            } else {
                return h.aggregate.call(null, n);
            }
        };
        n[m].settings = { resizeThrottle: 100, scrollThrottle: 30 };
        return i.load(function () {
            return n[m]("refresh");
        });
    });
}.call(this));
(function (a, b, c) {
    "use strict";
    var d = a.document,
        e = a.Modernizr,
        f = function (a) {
            return a.charAt(0).toUpperCase() + a.slice(1);
        },
        g = "Moz Webkit O Ms".split(" "),
        h = function (a) {
            var b = d.documentElement.style,
                c;
            if (typeof b[a] == "string") return a;
            a = f(a);
            for (var e = 0, h = g.length; e < h; e++) {
                c = g[e] + a;
                if (typeof b[c] == "string") return c;
            }
        },
        i = h("transform"),
        j = h("transitionProperty"),
        k = {
            csstransforms: function () {
                return !!i;
            },
            csstransforms3d: function () {
                var a = !!h("perspective");
                if (a) {
                    var c = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
                        d = "@media (" + c.join("transform-3d),(") + "modernizr)",
                        e = b(
                            "<style>" + d + "{#modernizr{height:3px}}" + "</style>"
                        ).appendTo("head"),
                        f = b('<div id="modernizr" />').appendTo("html");
                    (a = f.height() === 3), f.remove(), e.remove();
                }
                return a;
            },
            csstransitions: function () {
                return !!j;
            },
        },
        l;
    if (e) for (l in k) e.hasOwnProperty(l) || e.addTest(l, k[l]);
    else {
        e = a.Modernizr = { _version: "1.6ish: miniModernizr for Isotope" };
        var m = " ",
            n;
        for (l in k) (n = k[l]()), (e[l] = n), (m += " " + (n ? "" : "no-") + l);
        b("html").addClass(m);
    }
    if (e.csstransforms) {
        var o = e.csstransforms3d
            ? {
                translate: function (a) {
                    return "translate3d(" + a[0] + "px, " + a[1] + "px, 0) ";
                },
                scale: function (a) {
                    return "scale3d(" + a + ", " + a + ", 1) ";
                },
            }
            : {
                translate: function (a) {
                    return "translate(" + a[0] + "px, " + a[1] + "px) ";
                },
                scale: function (a) {
                    return "scale(" + a + ") ";
                },
            },
            p = function (a, c, d) {
                var e = b.data(a, "isoTransform") || {},
                    f = {},
                    g,
                    h = {},
                    j;
                (f[c] = d), b.extend(e, f);
                for (g in e) (j = e[g]), (h[g] = o[g](j));
                var k = h.translate || "",
                    l = h.scale || "",
                    m = k + l;
                b.data(a, "isoTransform", e), (a.style[i] = m);
            };
        (b.cssNumber.scale = !0),
            (b.cssHooks.scale = {
                set: function (a, b) {
                    p(a, "scale", b);
                },
                get: function (a, c) {
                    var d = b.data(a, "isoTransform");
                    return d && d.scale ? d.scale : 1;
                },
            }),
            (b.fx.step.scale = function (a) {
                b.cssHooks.scale.set(a.elem, a.now + a.unit);
            }),
            (b.cssNumber.translate = !0),
            (b.cssHooks.translate = {
                set: function (a, b) {
                    p(a, "translate", b);
                },
                get: function (a, c) {
                    var d = b.data(a, "isoTransform");
                    return d && d.translate ? d.translate : [0, 0];
                },
            });
    }
    var q, r;
    e.csstransitions &&
        ((q = {
            WebkitTransitionProperty: "webkitTransitionEnd",
            MozTransitionProperty: "transitionend",
            OTransitionProperty: "oTransitionEnd otransitionend",
            transitionProperty: "transitionend",
        }[j]),
            (r = h("transitionDuration")));
    var s = b.event,
        t = b.event.handle ? "handle" : "dispatch",
        u;
    (s.special.smartresize = {
        setup: function () {
            b(this).bind("resize", s.special.smartresize.handler);
        },
        teardown: function () {
            b(this).unbind("resize", s.special.smartresize.handler);
        },
        handler: function (a, b) {
            var c = this,
                d = arguments;
            (a.type = "smartresize"),
                u && clearTimeout(u),
                (u = setTimeout(
                    function () {
                        s[t].apply(c, d);
                    },
                    b === "execAsap" ? 0 : 100
                ));
        },
    }),
        (b.fn.smartresize = function (a) {
            return a
                ? this.bind("smartresize", a)
                : this.trigger("smartresize", ["execAsap"]);
        }),
        (b.Isotope = function (a, c, d) {
            (this.element = b(c)), this._create(a), this._init(d);
        });
    var v = ["width", "height"],
        w = b(a);
    (b.Isotope.settings = {
        resizable: !0,
        layoutMode: "masonry",
        containerClass: "isotope",
        itemClass: "isotope-item",
        hiddenClass: "isotope-hidden",
        hiddenStyle: { opacity: 0, scale: 0.001 },
        visibleStyle: { opacity: 1, scale: 1 },
        containerStyle: { position: "relative", overflow: "hidden" },
        animationEngine: "best-available",
        animationOptions: { queue: !1, duration: 800 },
        sortBy: "original-order",
        sortAscending: !0,
        resizesContainer: !0,
        transformsEnabled: !0,
        itemPositionDataEnabled: !1,
    }),
        (b.Isotope.prototype = {
            _create: function (a) {
                (this.options = b.extend({}, b.Isotope.settings, a)),
                    (this.styleQueue = []),
                    (this.elemCount = 0);
                var c = this.element[0].style;
                this.originalStyle = {};
                var d = v.slice(0);
                for (var e in this.options.containerStyle) d.push(e);
                for (var f = 0, g = d.length; f < g; f++)
                    (e = d[f]), (this.originalStyle[e] = c[e] || "");
                this.element.css(this.options.containerStyle),
                    this._updateAnimationEngine(),
                    this._updateUsingTransforms();
                var h = {
                    "original-order": function (a, b) {
                        return b.elemCount++, b.elemCount;
                    },
                    random: function () {
                        return Math.random();
                    },
                };
                (this.options.getSortData = b.extend(this.options.getSortData, h)),
                    this.reloadItems(),
                    (this.offset = {
                        left: parseInt(this.element.css("padding-left") || 0, 10),
                        top: parseInt(this.element.css("padding-top") || 0, 10),
                    });
                var i = this;
                setTimeout(function () {
                    i.element.addClass(i.options.containerClass);
                }, 0),
                    this.options.resizable &&
                    w.bind("smartresize.isotope", function () {
                        i.resize();
                    }),
                    this.element.delegate(
                        "." + this.options.hiddenClass,
                        "click",
                        function () {
                            return !1;
                        }
                    );
            },
            _getAtoms: function (a) {
                var b = this.options.itemSelector,
                    c = b ? a.filter(b).add(a.find(b)) : a,
                    d = { position: "absolute" };
                return (
                    (c = c.filter(function (a, b) {
                        return b.nodeType === 1;
                    })),
                    this.usingTransforms && ((d.left = 0), (d.top = 0)),
                    c.css(d).addClass(this.options.itemClass),
                    this.updateSortData(c, !0),
                    c
                );
            },
            _init: function (a) {
                (this.$filteredAtoms = this._filter(this.$allAtoms)),
                    this._sort(),
                    this.reLayout(a);
            },
            option: function (a) {
                if (b.isPlainObject(a)) {
                    this.options = b.extend(!0, this.options, a);
                    var c;
                    for (var d in a) (c = "_update" + f(d)), this[c] && this[c]();
                }
            },
            _updateAnimationEngine: function () {
                var a = this.options.animationEngine
                    .toLowerCase()
                    .replace(/[ _\-]/g, ""),
                    b;
                switch (a) {
                    case "css":
                    case "none":
                        b = !1;
                        break;
                    case "jquery":
                        b = !0;
                        break;
                    default:
                        b = !e.csstransitions;
                }
                (this.isUsingJQueryAnimation = b), this._updateUsingTransforms();
            },
            _updateTransformsEnabled: function () {
                this._updateUsingTransforms();
            },
            _updateUsingTransforms: function () {
                var a = (this.usingTransforms =
                    this.options.transformsEnabled &&
                    e.csstransforms &&
                    e.csstransitions &&
                    !this.isUsingJQueryAnimation);
                a ||
                    (delete this.options.hiddenStyle.scale,
                        delete this.options.visibleStyle.scale),
                    (this.getPositionStyles = a ? this._translate : this._positionAbs);
            },
            _filter: function (a) {
                var b = this.options.filter === "" ? "*" : this.options.filter;
                if (!b) return a;
                var c = this.options.hiddenClass,
                    d = "." + c,
                    e = a.filter(d),
                    f = e;
                if (b !== "*") {
                    f = e.filter(b);
                    var g = a.not(d).not(b).addClass(c);
                    this.styleQueue.push({ $el: g, style: this.options.hiddenStyle });
                }
                return (
                    this.styleQueue.push({ $el: f, style: this.options.visibleStyle }),
                    f.removeClass(c),
                    a.filter(b)
                );
            },
            updateSortData: function (a, c) {
                var d = this,
                    e = this.options.getSortData,
                    f,
                    g;
                a.each(function () {
                    (f = b(this)), (g = {});
                    for (var a in e)
                        !c && a === "original-order"
                            ? (g[a] = b.data(this, "isotope-sort-data")[a])
                            : (g[a] = e[a](f, d));
                    b.data(this, "isotope-sort-data", g);
                });
            },
            _sort: function () {
                var a = this.options.sortBy,
                    b = this._getSorter,
                    c = this.options.sortAscending ? 1 : -1,
                    d = function (d, e) {
                        var f = b(d, a),
                            g = b(e, a);
                        return (
                            f === g &&
                            a !== "original-order" &&
                            ((f = b(d, "original-order")), (g = b(e, "original-order"))),
                            (f > g ? 1 : f < g ? -1 : 0) * c
                        );
                    };
                this.$filteredAtoms.sort(d);
            },
            _getSorter: function (a, c) {
                return b.data(a, "isotope-sort-data")[c];
            },
            _translate: function (a, b) {
                return { translate: [a, b] };
            },
            _positionAbs: function (a, b) {
                return { left: a, top: b };
            },
            _pushPosition: function (a, b, c) {
                (b = Math.round(b + this.offset.left)),
                    (c = Math.round(c + this.offset.top));
                var d = this.getPositionStyles(b, c);
                this.styleQueue.push({ $el: a, style: d }),
                    this.options.itemPositionDataEnabled &&
                    a.data("isotope-item-position", { x: b, y: c });
            },
            layout: function (a, b) {
                var c = this.options.layoutMode;
                this["_" + c + "Layout"](a);
                if (this.options.resizesContainer) {
                    var d = this["_" + c + "GetContainerSize"]();
                    this.styleQueue.push({ $el: this.element, style: d });
                }
                this._processStyleQueue(a, b), (this.isLaidOut = !0);
            },
            _processStyleQueue: function (a, c) {
                var d = this.isLaidOut
                    ? this.isUsingJQueryAnimation
                        ? "animate"
                        : "css"
                    : "css",
                    f = this.options.animationOptions,
                    g = this.options.onLayout,
                    h,
                    i,
                    j,
                    k;
                i = function (a, b) {
                    b.$el[d](b.style, f);
                };
                if (this._isInserting && this.isUsingJQueryAnimation)
                    i = function (a, b) {
                        (h = b.$el.hasClass("no-transition") ? "css" : d),
                            b.$el[h](b.style, f);
                    };
                else if (c || g || f.complete) {
                    var l = !1,
                        m = [c, g, f.complete],
                        n = this;
                    (j = !0),
                        (k = function () {
                            if (l) return;
                            var b;
                            for (var c = 0, d = m.length; c < d; c++)
                                (b = m[c]), typeof b == "function" && b.call(n.element, a, n);
                            l = !0;
                        });
                    if (this.isUsingJQueryAnimation && d === "animate")
                        (f.complete = k), (j = !1);
                    else if (e.csstransitions) {
                        var o = 0,
                            p = this.styleQueue[0],
                            s = p && p.$el,
                            t;
                        while (!s || !s.length) {
                            t = this.styleQueue[o++];
                            if (!t) return;
                            s = t.$el;
                        }
                        var u = parseFloat(getComputedStyle(s[0])[r]);
                        u > 0 &&
                            ((i = function (a, b) {
                                b.$el[d](b.style, f).one(q, k);
                            }),
                                (j = !1));
                    }
                }
                b.each(this.styleQueue, i), j && k(), (this.styleQueue = []);
            },
            resize: function () {
                this["_" + this.options.layoutMode + "ResizeChanged"]() &&
                    this.reLayout();
            },
            reLayout: function (a) {
                this["_" + this.options.layoutMode + "Reset"](),
                    this.layout(this.$filteredAtoms, a);
            },
            addItems: function (a, b) {
                var c = this._getAtoms(a);
                (this.$allAtoms = this.$allAtoms.add(c)), b && b(c);
            },
            insert: function (a, b) {
                this.element.append(a);
                var c = this;
                this.addItems(a, function (a) {
                    var d = c._filter(a);
                    c._addHideAppended(d),
                        c._sort(),
                        c.reLayout(),
                        c._revealAppended(d, b);
                });
            },
            appended: function (a, b) {
                var c = this;
                this.addItems(a, function (a) {
                    c._addHideAppended(a), c.layout(a), c._revealAppended(a, b);
                });
            },
            _addHideAppended: function (a) {
                (this.$filteredAtoms = this.$filteredAtoms.add(a)),
                    a.addClass("no-transition"),
                    (this._isInserting = !0),
                    this.styleQueue.push({ $el: a, style: this.options.hiddenStyle });
            },
            _revealAppended: function (a, b) {
                var c = this;
                setTimeout(function () {
                    a.removeClass("no-transition"),
                        c.styleQueue.push({ $el: a, style: c.options.visibleStyle }),
                        (c._isInserting = !1),
                        c._processStyleQueue(a, b);
                }, 10);
            },
            reloadItems: function () {
                this.$allAtoms = this._getAtoms(this.element.children());
            },
            remove: function (a, b) {
                (this.$allAtoms = this.$allAtoms.not(a)),
                    (this.$filteredAtoms = this.$filteredAtoms.not(a));
                var c = this,
                    d = function () {
                        a.remove(), b && b.call(c.element);
                    };
                a.filter(":not(." + this.options.hiddenClass + ")").length
                    ? (this.styleQueue.push({ $el: a, style: this.options.hiddenStyle }),
                        this._sort(),
                        this.reLayout(d))
                    : d();
            },
            shuffle: function (a) {
                this.updateSortData(this.$allAtoms),
                    (this.options.sortBy = "random"),
                    this._sort(),
                    this.reLayout(a);
            },
            destroy: function () {
                var a = this.usingTransforms,
                    b = this.options;
                this.$allAtoms
                    .removeClass(b.hiddenClass + " " + b.itemClass)
                    .each(function () {
                        var b = this.style;
                        (b.position = ""),
                            (b.top = ""),
                            (b.left = ""),
                            (b.opacity = ""),
                            a && (b[i] = "");
                    });
                var c = this.element[0].style;
                for (var d in this.originalStyle) c[d] = this.originalStyle[d];
                this.element
                    .unbind(".isotope")
                    .undelegate("." + b.hiddenClass, "click")
                    .removeClass(b.containerClass)
                    .removeData("isotope"),
                    w.unbind(".isotope");
            },
            _getSegments: function (a) {
                var b = this.options.layoutMode,
                    c = a ? "rowHeight" : "columnWidth",
                    d = a ? "height" : "width",
                    e = a ? "rows" : "cols",
                    g = this.element[d](),
                    h,
                    i =
                        (this.options[b] && this.options[b][c]) ||
                        this.$filteredAtoms["outer" + f(d)](!0) ||
                        g;
                (h = Math.floor(g / i)),
                    (h = Math.max(h, 1)),
                    (this[b][e] = h),
                    (this[b][c] = i);
            },
            _checkIfSegmentsChanged: function (a) {
                var b = this.options.layoutMode,
                    c = a ? "rows" : "cols",
                    d = this[b][c];
                return this._getSegments(a), this[b][c] !== d;
            },
            _masonryReset: function () {
                (this.masonry = {}), this._getSegments();
                var a = this.masonry.cols;
                this.masonry.colYs = [];
                while (a--) this.masonry.colYs.push(0);
            },
            _masonryLayout: function (a) {
                var c = this,
                    d = c.masonry;
                a.each(function () {
                    var a = b(this),
                        e = Math.ceil(a.outerWidth(!0) / d.columnWidth);
                    e = Math.min(e, d.cols);
                    if (e === 1) c._masonryPlaceBrick(a, d.colYs);
                    else {
                        var f = d.cols + 1 - e,
                            g = [],
                            h,
                            i;
                        for (i = 0; i < f; i++)
                            (h = d.colYs.slice(i, i + e)), (g[i] = Math.max.apply(Math, h));
                        c._masonryPlaceBrick(a, g);
                    }
                });
            },
            _masonryPlaceBrick: function (a, b) {
                var c = Math.min.apply(Math, b),
                    d = 0;
                for (var e = 0, f = b.length; e < f; e++)
                    if (b[e] === c) {
                        d = e;
                        break;
                    }
                var g = this.masonry.columnWidth * d,
                    h = c;
                this._pushPosition(a, g, h);
                var i = c + a.outerHeight(!0),
                    j = this.masonry.cols + 1 - f;
                for (e = 0; e < j; e++) this.masonry.colYs[d + e] = i;
            },
            _masonryGetContainerSize: function () {
                var a = Math.max.apply(Math, this.masonry.colYs);
                return { height: a };
            },
            _masonryResizeChanged: function () {
                return this._checkIfSegmentsChanged();
            },
            _fitRowsReset: function () {
                this.fitRows = { x: 0, y: 0, height: 0 };
            },
            _fitRowsLayout: function (a) {
                var c = this,
                    d = this.element.width(),
                    e = this.fitRows;
                a.each(function () {
                    var a = b(this),
                        f = a.outerWidth(!0),
                        g = a.outerHeight(!0);
                    e.x !== 0 && f + e.x > d && ((e.x = 0), (e.y = e.height)),
                        c._pushPosition(a, e.x, e.y),
                        (e.height = Math.max(e.y + g, e.height)),
                        (e.x += f);
                });
            },
            _fitRowsGetContainerSize: function () {
                return { height: this.fitRows.height };
            },
            _fitRowsResizeChanged: function () {
                return !0;
            },
            _cellsByRowReset: function () {
                (this.cellsByRow = { index: 0 }),
                    this._getSegments(),
                    this._getSegments(!0);
            },
            _cellsByRowLayout: function (a) {
                var c = this,
                    d = this.cellsByRow;
                a.each(function () {
                    var a = b(this),
                        e = d.index % d.cols,
                        f = Math.floor(d.index / d.cols),
                        g = (e + 0.5) * d.columnWidth - a.outerWidth(!0) / 2,
                        h = (f + 0.5) * d.rowHeight - a.outerHeight(!0) / 2;
                    c._pushPosition(a, g, h), d.index++;
                });
            },
            _cellsByRowGetContainerSize: function () {
                return {
                    height:
                        Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) *
                        this.cellsByRow.rowHeight +
                        this.offset.top,
                };
            },
            _cellsByRowResizeChanged: function () {
                return this._checkIfSegmentsChanged();
            },
            _straightDownReset: function () {
                this.straightDown = { y: 0 };
            },
            _straightDownLayout: function (a) {
                var c = this;
                a.each(function (a) {
                    var d = b(this);
                    c._pushPosition(d, 0, c.straightDown.y),
                        (c.straightDown.y += d.outerHeight(!0));
                });
            },
            _straightDownGetContainerSize: function () {
                return { height: this.straightDown.y };
            },
            _straightDownResizeChanged: function () {
                return !0;
            },
            _masonryHorizontalReset: function () {
                (this.masonryHorizontal = {}), this._getSegments(!0);
                var a = this.masonryHorizontal.rows;
                this.masonryHorizontal.rowXs = [];
                while (a--) this.masonryHorizontal.rowXs.push(0);
            },
            _masonryHorizontalLayout: function (a) {
                var c = this,
                    d = c.masonryHorizontal;
                a.each(function () {
                    var a = b(this),
                        e = Math.ceil(a.outerHeight(!0) / d.rowHeight);
                    e = Math.min(e, d.rows);
                    if (e === 1) c._masonryHorizontalPlaceBrick(a, d.rowXs);
                    else {
                        var f = d.rows + 1 - e,
                            g = [],
                            h,
                            i;
                        for (i = 0; i < f; i++)
                            (h = d.rowXs.slice(i, i + e)), (g[i] = Math.max.apply(Math, h));
                        c._masonryHorizontalPlaceBrick(a, g);
                    }
                });
            },
            _masonryHorizontalPlaceBrick: function (a, b) {
                var c = Math.min.apply(Math, b),
                    d = 0;
                for (var e = 0, f = b.length; e < f; e++)
                    if (b[e] === c) {
                        d = e;
                        break;
                    }
                var g = c,
                    h = this.masonryHorizontal.rowHeight * d;
                this._pushPosition(a, g, h);
                var i = c + a.outerWidth(!0),
                    j = this.masonryHorizontal.rows + 1 - f;
                for (e = 0; e < j; e++) this.masonryHorizontal.rowXs[d + e] = i;
            },
            _masonryHorizontalGetContainerSize: function () {
                var a = Math.max.apply(Math, this.masonryHorizontal.rowXs);
                return { width: a };
            },
            _masonryHorizontalResizeChanged: function () {
                return this._checkIfSegmentsChanged(!0);
            },
            _fitColumnsReset: function () {
                this.fitColumns = { x: 0, y: 0, width: 0 };
            },
            _fitColumnsLayout: function (a) {
                var c = this,
                    d = this.element.height(),
                    e = this.fitColumns;
                a.each(function () {
                    var a = b(this),
                        f = a.outerWidth(!0),
                        g = a.outerHeight(!0);
                    e.y !== 0 && g + e.y > d && ((e.x = e.width), (e.y = 0)),
                        c._pushPosition(a, e.x, e.y),
                        (e.width = Math.max(e.x + f, e.width)),
                        (e.y += g);
                });
            },
            _fitColumnsGetContainerSize: function () {
                return { width: this.fitColumns.width };
            },
            _fitColumnsResizeChanged: function () {
                return !0;
            },
            _cellsByColumnReset: function () {
                (this.cellsByColumn = { index: 0 }),
                    this._getSegments(),
                    this._getSegments(!0);
            },
            _cellsByColumnLayout: function (a) {
                var c = this,
                    d = this.cellsByColumn;
                a.each(function () {
                    var a = b(this),
                        e = Math.floor(d.index / d.rows),
                        f = d.index % d.rows,
                        g = (e + 0.5) * d.columnWidth - a.outerWidth(!0) / 2,
                        h = (f + 0.5) * d.rowHeight - a.outerHeight(!0) / 2;
                    c._pushPosition(a, g, h), d.index++;
                });
            },
            _cellsByColumnGetContainerSize: function () {
                return {
                    width:
                        Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) *
                        this.cellsByColumn.columnWidth,
                };
            },
            _cellsByColumnResizeChanged: function () {
                return this._checkIfSegmentsChanged(!0);
            },
            _straightAcrossReset: function () {
                this.straightAcross = { x: 0 };
            },
            _straightAcrossLayout: function (a) {
                var c = this;
                a.each(function (a) {
                    var d = b(this);
                    c._pushPosition(d, c.straightAcross.x, 0),
                        (c.straightAcross.x += d.outerWidth(!0));
                });
            },
            _straightAcrossGetContainerSize: function () {
                return { width: this.straightAcross.x };
            },
            _straightAcrossResizeChanged: function () {
                return !0;
            },
        }),
        (b.fn.imagesLoaded = function (a) {
            function h() {
                a.call(c, d);
            }
            function i(a) {
                var c = a.target;
                c.src !== f &&
                    b.inArray(c, g) === -1 &&
                    (g.push(c),
                        --e <= 0 && (setTimeout(h), d.unbind(".imagesLoaded", i)));
            }
            var c = this,
                d = c.find("img").add(c.filter("img")),
                e = d.length,
                f =
                    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
                g = [];
            return (
                e || h(),
                d.bind("load.imagesLoaded error.imagesLoaded", i).each(function () {
                    var a = this.src;
                    (this.src = f), (this.src = a);
                }),
                c
            );
        });
    var x = function (b) {
        a.console && a.console.error(b);
    };
    b.fn.isotope = function (a, c) {
        if (typeof a == "string") {
            var d = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var c = b.data(this, "isotope");
                if (!c) {
                    x(
                        "cannot call methods on isotope prior to initialization; attempted to call method '" +
                        a +
                        "'"
                    );
                    return;
                }
                if (!b.isFunction(c[a]) || a.charAt(0) === "_") {
                    x("no such method '" + a + "' for isotope instance");
                    return;
                }
                c[a].apply(c, d);
            });
        } else
            this.each(function () {
                var d = b.data(this, "isotope");
                d
                    ? (d.option(a), d._init(c))
                    : b.data(this, "isotope", new b.Isotope(a, this, c));
            });
        return this;
    };
})(window, jQuery);
(function (t) {
    "use strict";
    function e(t) {
        if (t) {
            if ("string" == typeof n[t]) return t;
            t = t.charAt(0).toUpperCase() + t.slice(1);
            for (var e, o = 0, r = i.length; r > o; o++)
                if (((e = i[o] + t), "string" == typeof n[e])) return e;
        }
    }
    var i = "Webkit Moz ms Ms O".split(" "),
        n = document.documentElement.style;
    "function" == typeof define && define.amd
        ? define(function () {
            return e;
        })
        : (t.getStyleProperty = e);
})(window),
    (function (t) {
        "use strict";
        function e(t) {
            var e = parseFloat(t),
                i = -1 === t.indexOf("%") && !isNaN(e);
            return i && e;
        }
        function i() {
            for (
                var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0,
                },
                e = 0,
                i = s.length;
                i > e;
                e++
            ) {
                var n = s[e];
                t[n] = 0;
            }
            return t;
        }
        function n(t) {
            function n(t) {
                if (
                    ("string" == typeof t && (t = document.querySelector(t)),
                        t && "object" == typeof t && t.nodeType)
                ) {
                    var n = r(t);
                    if ("none" === n.display) return i();
                    var h = {};
                    (h.width = t.offsetWidth), (h.height = t.offsetHeight);
                    for (
                        var p = (h.isBorderBox = !(!a || !n[a] || "border-box" !== n[a])),
                        u = 0,
                        f = s.length;
                        f > u;
                        u++
                    ) {
                        var d = s[u],
                            c = n[d],
                            l = parseFloat(c);
                        h[d] = isNaN(l) ? 0 : l;
                    }
                    var m = h.paddingLeft + h.paddingRight,
                        y = h.paddingTop + h.paddingBottom,
                        g = h.marginLeft + h.marginRight,
                        v = h.marginTop + h.marginBottom,
                        _ = h.borderLeftWidth + h.borderRightWidth,
                        b = h.borderTopWidth + h.borderBottomWidth,
                        L = p && o,
                        E = e(n.width);
                    E !== !1 && (h.width = E + (L ? 0 : m + _));
                    var I = e(n.height);
                    return (
                        I !== !1 && (h.height = I + (L ? 0 : y + b)),
                        (h.innerWidth = h.width - (m + _)),
                        (h.innerHeight = h.height - (y + b)),
                        (h.outerWidth = h.width + g),
                        (h.outerHeight = h.height + v),
                        h
                    );
                }
            }
            var o,
                a = t("boxSizing");
            return (
                (function () {
                    if (a) {
                        var t = document.createElement("div");
                        (t.style.width = "200px"),
                            (t.style.padding = "1px 2px 3px 4px"),
                            (t.style.borderStyle = "solid"),
                            (t.style.borderWidth = "1px 2px 3px 4px"),
                            (t.style[a] = "border-box");
                        var i = document.body || document.documentElement;
                        i.appendChild(t);
                        var n = r(t);
                        (o = 200 === e(n.width)), i.removeChild(t);
                    }
                })(),
                n
            );
        }
        var o = document.defaultView,
            r =
                o && o.getComputedStyle
                    ? function (t) {
                        return o.getComputedStyle(t, null);
                    }
                    : function (t) {
                        return t.currentStyle;
                    },
            s = [
                "paddingLeft",
                "paddingRight",
                "paddingTop",
                "paddingBottom",
                "marginLeft",
                "marginRight",
                "marginTop",
                "marginBottom",
                "borderLeftWidth",
                "borderRightWidth",
                "borderTopWidth",
                "borderBottomWidth",
            ];
        "function" == typeof define && define.amd
            ? define(["get-style-property"], n)
            : (t.getSize = n(t.getStyleProperty));
    })(window),
    (function (t) {
        "use strict";
        var e = document.documentElement,
            i = function () { };
        e.addEventListener
            ? (i = function (t, e, i) {
                t.addEventListener(e, i, !1);
            })
            : e.attachEvent &&
            (i = function (e, i, n) {
                (e[i + n] = n.handleEvent
                    ? function () {
                        var e = t.event;
                        (e.target = e.target || e.srcElement), n.handleEvent.call(n, e);
                    }
                    : function () {
                        var i = t.event;
                        (i.target = i.target || i.srcElement), n.call(e, i);
                    }),
                    e.attachEvent("on" + i, e[i + n]);
            });
        var n = function () { };
        e.removeEventListener
            ? (n = function (t, e, i) {
                t.removeEventListener(e, i, !1);
            })
            : e.detachEvent &&
            (n = function (t, e, i) {
                t.detachEvent("on" + e, t[e + i]);
                try {
                    delete t[e + i];
                } catch (n) {
                    t[e + i] = void 0;
                }
            });
        var o = { bind: i, unbind: n };
        "function" == typeof define && define.amd ? define(o) : (t.eventie = o);
    })(this),
    (function (t) {
        "use strict";
        function e(t) {
            "function" == typeof t && (e.isReady ? t() : r.push(t));
        }
        function i(t) {
            var i = "readystatechange" === t.type && "complete" !== o.readyState;
            if (!e.isReady && !i) {
                e.isReady = !0;
                for (var n = 0, s = r.length; s > n; n++) {
                    var a = r[n];
                    a();
                }
            }
        }
        function n(n) {
            return (
                n.bind(o, "DOMContentLoaded", i),
                n.bind(o, "readystatechange", i),
                n.bind(t, "load", i),
                e
            );
        }
        var o = t.document,
            r = [];
        (e.isReady = !1),
            "function" == typeof define && define.amd
                ? define(["eventie"], n)
                : (t.docReady = n(t.eventie));
    })(this),
    (function (t) {
        "use strict";
        function e() { }
        function i(t, e) {
            if (o) return e.indexOf(t);
            for (var i = e.length; i--;) if (e[i] === t) return i;
            return -1;
        }
        var n = e.prototype,
            o = Array.prototype.indexOf ? !0 : !1;
        (n._getEvents = function () {
            return this._events || (this._events = {});
        }),
            (n.getListeners = function (t) {
                var e,
                    i,
                    n = this._getEvents();
                if ("object" == typeof t) {
                    e = {};
                    for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i]);
                } else e = n[t] || (n[t] = []);
                return e;
            }),
            (n.getListenersAsObject = function (t) {
                var e,
                    i = this.getListeners(t);
                return i instanceof Array && ((e = {}), (e[t] = i)), e || i;
            }),
            (n.addListener = function (t, e) {
                var n,
                    o = this.getListenersAsObject(t);
                for (n in o) o.hasOwnProperty(n) && -1 === i(e, o[n]) && o[n].push(e);
                return this;
            }),
            (n.on = n.addListener),
            (n.defineEvent = function (t) {
                return this.getListeners(t), this;
            }),
            (n.defineEvents = function (t) {
                for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
                return this;
            }),
            (n.removeListener = function (t, e) {
                var n,
                    o,
                    r = this.getListenersAsObject(t);
                for (o in r)
                    r.hasOwnProperty(o) &&
                        ((n = i(e, r[o])), -1 !== n && r[o].splice(n, 1));
                return this;
            }),
            (n.off = n.removeListener),
            (n.addListeners = function (t, e) {
                return this.manipulateListeners(!1, t, e);
            }),
            (n.removeListeners = function (t, e) {
                return this.manipulateListeners(!0, t, e);
            }),
            (n.manipulateListeners = function (t, e, i) {
                var n,
                    o,
                    r = t ? this.removeListener : this.addListener,
                    s = t ? this.removeListeners : this.addListeners;
                if ("object" != typeof e || e instanceof RegExp)
                    for (n = i.length; n--;) r.call(this, e, i[n]);
                else
                    for (n in e)
                        e.hasOwnProperty(n) &&
                            (o = e[n]) &&
                            ("function" == typeof o
                                ? r.call(this, n, o)
                                : s.call(this, n, o));
                return this;
            }),
            (n.removeEvent = function (t) {
                var e,
                    i = typeof t,
                    n = this._getEvents();
                if ("string" === i) delete n[t];
                else if ("object" === i)
                    for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
                else delete this._events;
                return this;
            }),
            (n.emitEvent = function (t, e) {
                var i,
                    n,
                    o,
                    r = this.getListenersAsObject(t);
                for (n in r)
                    if (r.hasOwnProperty(n))
                        for (i = r[n].length; i--;)
                            (o = e ? r[n][i].apply(null, e) : r[n][i]()),
                                o === !0 && this.removeListener(t, r[n][i]);
                return this;
            }),
            (n.trigger = n.emitEvent),
            (n.emit = function (t) {
                var e = Array.prototype.slice.call(arguments, 1);
                return this.emitEvent(t, e);
            }),
            "function" == typeof define && define.amd
                ? define(function () {
                    return e;
                })
                : (t.EventEmitter = e);
    })(this),
    (function (t) {
        "use strict";
        function e() { }
        function i(t) {
            function i(e) {
                e.prototype.option ||
                    (e.prototype.option = function (e) {
                        t.isPlainObject(e) &&
                            (this.options = t.extend(!0, this.options, e));
                    });
            }
            function o(e, i) {
                t.fn[e] = function (o) {
                    if ("string" == typeof o) {
                        for (
                            var s = n.call(arguments, 1), a = 0, h = this.length;
                            h > a;
                            a++
                        ) {
                            var p = this[a],
                                u = t.data(p, e);
                            if (u)
                                if (t.isFunction(u[o]) && "_" !== o.charAt(0)) {
                                    var f = u[o].apply(u, s);
                                    if (void 0 !== f) return f;
                                } else r("no such method '" + o + "' for " + e + " instance");
                            else
                                r(
                                    "cannot call methods on " +
                                    e +
                                    " prior to initialization; " +
                                    "attempted to call '" +
                                    o +
                                    "'"
                                );
                        }
                        return this;
                    }
                    return this.each(function () {
                        var n = t.data(this, e);
                        n
                            ? (n.option(o), n._init())
                            : ((n = new i(this, o)), t.data(this, e, n));
                    });
                };
            }
            if (t) {
                var r =
                    "undefined" == typeof console
                        ? e
                        : function (t) {
                            console.error(t);
                        };
                t.bridget = function (t, e) {
                    i(e), o(t, e);
                };
            }
        }
        var n = Array.prototype.slice;
        "function" == typeof define && define.amd
            ? define(["jquery"], i)
            : i(t.jQuery);
    })(window),
    (function (t, e) {
        "use strict";
        function i(t, e) {
            return t[a](e);
        }
        function n(t) {
            if (!t.parentNode) {
                var e = document.createDocumentFragment();
                e.appendChild(t);
            }
        }
        function o(t, e) {
            n(t);
            for (
                var i = t.parentNode.querySelectorAll(e), o = 0, r = i.length;
                r > o;
                o++
            )
                if (i[o] === t) return !0;
            return !1;
        }
        function r(t, e) {
            return n(t), i(t, e);
        }
        var s,
            a = (function () {
                if (e.matchesSelector) return "matchesSelector";
                for (
                    var t = ["webkit", "moz", "ms", "o"], i = 0, n = t.length;
                    n > i;
                    i++
                ) {
                    var o = t[i],
                        r = o + "MatchesSelector";
                    if (e[r]) return r;
                }
            })();
        if (a) {
            var h = document.createElement("div"),
                p = i(h, "div");
            s = p ? i : r;
        } else s = o;
        "function" == typeof define && define.amd
            ? define(function () {
                return s;
            })
            : (window.matchesSelector = s);
    })(this, Element.prototype),
    (function (t) {
        "use strict";
        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }
        function i(t, e) {
            t &&
                ((this.element = t),
                    (this.layout = e),
                    (this.position = { x: 0, y: 0 }),
                    this._create());
        }
        var n = t.getSize,
            o = t.getStyleProperty,
            r = t.EventEmitter,
            s = document.defaultView,
            a =
                s && s.getComputedStyle
                    ? function (t) {
                        return s.getComputedStyle(t, null);
                    }
                    : function (t) {
                        return t.currentStyle;
                    },
            h = o("transition"),
            p = o("transform"),
            u = h && p,
            f = !!o("perspective"),
            d = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend",
                transition: "transitionend",
            }[h],
            c = [
                "transform",
                "transition",
                "transitionDuration",
                "transitionProperty",
            ],
            l = (function () {
                for (var t = {}, e = 0, i = c.length; i > e; e++) {
                    var n = c[e],
                        r = o(n);
                    r && r !== n && (t[n] = r);
                }
                return t;
            })();
        e(i.prototype, r.prototype),
            (i.prototype._create = function () {
                this.css({ position: "absolute" });
            }),
            (i.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (i.prototype.getSize = function () {
                this.size = n(this.element);
            }),
            (i.prototype.css = function (t) {
                var e = this.element.style;
                for (var i in t) {
                    var n = l[i] || i;
                    e[n] = t[i];
                }
            }),
            (i.prototype.getPosition = function () {
                var t = a(this.element),
                    e = this.layout.options,
                    i = e.isOriginLeft,
                    n = e.isOriginTop,
                    o = parseInt(t[i ? "left" : "right"], 10),
                    r = parseInt(t[n ? "top" : "bottom"], 10);
                (o = isNaN(o) ? 0 : o), (r = isNaN(r) ? 0 : r);
                var s = this.layout.size;
                (o -= i ? s.paddingLeft : s.paddingRight),
                    (r -= n ? s.paddingTop : s.paddingBottom),
                    (this.position.x = o),
                    (this.position.y = r);
            }),
            (i.prototype.layoutPosition = function () {
                var t = this.layout.size,
                    e = this.layout.options,
                    i = {};
                e.isOriginLeft
                    ? ((i.left = this.position.x + t.paddingLeft + "px"), (i.right = ""))
                    : ((i.right = this.position.x + t.paddingRight + "px"),
                        (i.left = "")),
                    e.isOriginTop
                        ? ((i.top = this.position.y + t.paddingTop + "px"), (i.bottom = ""))
                        : ((i.bottom = this.position.y + t.paddingBottom + "px"),
                            (i.top = "")),
                    this.css(i),
                    this.emitEvent("layout", [this]);
            });
        var m = f
            ? function (t, e) {
                return "translate3d(" + t + "px, " + e + "px, 0)";
            }
            : function (t, e) {
                return "translate(" + t + "px, " + e + "px)";
            };
        (i.prototype._transitionTo = function (t, e) {
            this.getPosition();
            var i = this.position.x,
                n = this.position.y,
                o = parseInt(t, 10),
                r = parseInt(e, 10),
                s = o === this.position.x && r === this.position.y;
            if ((this.setPosition(t, e), s && !this.isTransitioning))
                return this.layoutPosition(), void 0;
            var a = t - i,
                h = e - n,
                p = {},
                u = this.layout.options;
            (a = u.isOriginLeft ? a : -a),
                (h = u.isOriginTop ? h : -h),
                (p.transform = m(a, h)),
                this.transition({
                    to: p,
                    onTransitionEnd: this.layoutPosition,
                    isCleaning: !0,
                });
        }),
            (i.prototype.goTo = function (t, e) {
                this.setPosition(t, e), this.layoutPosition();
            }),
            (i.prototype.moveTo = u ? i.prototype._transitionTo : i.prototype.goTo),
            (i.prototype.setPosition = function (t, e) {
                (this.position.x = parseInt(t, 10)),
                    (this.position.y = parseInt(e, 10));
            }),
            (i.prototype._nonTransition = function (t) {
                this.css(t.to),
                    t.isCleaning && this._removeStyles(t.to),
                    t.onTransitionEnd && t.onTransitionEnd.call(this);
            }),
            (i.prototype._transition = function (t) {
                var e = this.layout.options.transitionDuration;
                if (!parseFloat(e)) return this._nonTransition(t), void 0;
                var i = t.to,
                    n = [];
                for (var o in i) n.push(o);
                var r = {};
                if (
                    ((r.transitionProperty = n.join(",")),
                        (r.transitionDuration = e),
                        this.element.addEventListener(d, this, !1),
                        (t.isCleaning || t.onTransitionEnd) &&
                        this.on("transitionEnd", function (e) {
                            return (
                                t.isCleaning && e._removeStyles(i),
                                t.onTransitionEnd && t.onTransitionEnd.call(e),
                                !0
                            );
                        }),
                        t.from)
                ) {
                    this.css(t.from);
                    var s = this.element.offsetHeight;
                    s = null;
                }
                this.css(r), this.css(i), (this.isTransitioning = !0);
            }),
            (i.prototype.transition =
                i.prototype[h ? "_transition" : "_nonTransition"]),
            (i.prototype.onwebkitTransitionEnd = function (t) {
                this.ontransitionend(t);
            }),
            (i.prototype.onotransitionend = function (t) {
                this.ontransitionend(t);
            }),
            (i.prototype.ontransitionend = function (t) {
                t.target === this.element &&
                    (this.removeTransitionStyles(),
                        this.element.removeEventListener(d, this, !1),
                        (this.isTransitioning = !1),
                        this.emitEvent("transitionEnd", [this]));
            }),
            (i.prototype._removeStyles = function (t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e);
            });
        var y = { transitionProperty: "", transitionDuration: "" };
        (i.prototype.removeTransitionStyles = function () {
            this.css(y);
        }),
            (i.prototype.removeElem = function () {
                this.element.parentNode.removeChild(this.element),
                    this.emitEvent("remove", [this]);
            }),
            (i.prototype.remove = h
                ? function () {
                    var t = this;
                    this.on("transitionEnd", function () {
                        return t.removeElem(), !0;
                    }),
                        this.hide();
                }
                : i.prototype.removeElem),
            (i.prototype.reveal = function () {
                this.css({ display: "" });
                var t = this.layout.options;
                this.transition({
                    from: t.hiddenStyle,
                    to: t.visibleStyle,
                    isCleaning: !0,
                });
            }),
            (i.prototype.hide = function () {
                this.css({ display: "" });
                var t = this.layout.options;
                this.transition({
                    from: t.visibleStyle,
                    to: t.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: function () {
                        this.css({ display: "none" });
                    },
                });
            }),
            (i.prototype.destroy = function () {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: "",
                });
            }),
            (t.Outlayer = { Item: i });
    })(window),
    (function (t) {
        "use strict";
        function e(t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }
        function i(t) {
            return "[object Array]" === v.call(t);
        }
        function n(t) {
            var e = [];
            if (i(t)) e = t;
            else if ("number" == typeof t.length)
                for (var n = 0, o = t.length; o > n; n++) e.push(t[n]);
            else e.push(t);
            return e;
        }
        function o(t) {
            return t
                .replace(/(.)([A-Z])/g, function (t, e, i) {
                    return e + "-" + i;
                })
                .toLowerCase();
        }
        function r(t, i) {
            if (("string" == typeof t && (t = l.querySelector(t)), !t || !_(t)))
                return (
                    m && m.error("Bad " + this.settings.namespace + " element: " + t),
                    void 0
                );
            (this.element = t),
                (this.options = e({}, this.options)),
                e(this.options, i);
            var n = ++L;
            (this.element.outlayerGUID = n),
                (E[n] = this),
                this._create(),
                this.options.isInitLayout && this.layout();
        }
        function s(t, i) {
            t.prototype[i] = e({}, r.prototype[i]);
        }
        var a = t.Outlayer,
            h = a.Item,
            p = t.docReady,
            u = t.EventEmitter,
            f = t.eventie,
            d = t.getSize,
            c = t.matchesSelector,
            l = t.document,
            m = t.console,
            y = t.jQuery,
            g = function () { },
            v = Object.prototype.toString,
            _ =
                "object" == typeof HTMLElement
                    ? function (t) {
                        return t instanceof HTMLElement;
                    }
                    : function (t) {
                        return (
                            t &&
                            "object" == typeof t &&
                            1 === t.nodeType &&
                            "string" == typeof t.nodeName
                        );
                    },
            b = Array.prototype.indexOf
                ? function (t, e) {
                    return t.indexOf(e);
                }
                : function (t, e) {
                    for (var i = 0, n = t.length; n > i; i++) if (t[i] === e) return i;
                    return -1;
                },
            L = 0,
            E = {};
        (r.prototype.settings = { namespace: "outlayer", item: a.Item }),
            (r.prototype.options = {
                containerStyle: { position: "relative" },
                isInitLayout: !0,
                isOriginLeft: !0,
                isOriginTop: !0,
                isResizeBound: !0,
                transitionDuration: "0.4s",
                hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
                visibleStyle: { opacity: 1, transform: "scale(1)" },
            }),
            e(r.prototype, u.prototype),
            (r.prototype._create = function () {
                this.reloadItems(),
                    (this.stamps = []),
                    this.stamp(this.options.stamp),
                    e(this.element.style, this.options.containerStyle),
                    this.options.isResizeBound && this.bindResize();
            }),
            (r.prototype.reloadItems = function () {
                this.items = this._getItems(this.element.children);
            }),
            (r.prototype._getItems = function (t) {
                for (
                    var e = this._filterFindItemElements(t),
                    i = this.settings.item,
                    n = [],
                    o = 0,
                    r = e.length;
                    r > o;
                    o++
                ) {
                    var s = e[o],
                        a = new i(s, this, this.options.itemOptions);
                    n.push(a);
                }
                return n;
            }),
            (r.prototype._filterFindItemElements = function (t) {
                t = n(t);
                var e = this.options.itemSelector;
                if (!e) return t;
                for (var i = [], o = 0, r = t.length; r > o; o++) {
                    var s = t[o];
                    c(s, e) && i.push(s);
                    for (var a = s.querySelectorAll(e), h = 0, p = a.length; p > h; h++)
                        i.push(a[h]);
                }
                return i;
            }),
            (r.prototype.getItemElements = function () {
                for (var t = [], e = 0, i = this.items.length; i > e; e++)
                    t.push(this.items[e].element);
                return t;
            }),
            (r.prototype.layout = function () {
                this._resetLayout(), this._manageStamps();
                var t =
                    void 0 !== this.options.isLayoutInstant
                        ? this.options.isLayoutInstant
                        : !this._isLayoutInited;
                this.layoutItems(this.items, t), (this._isLayoutInited = !0);
            }),
            (r.prototype._init = r.prototype.layout),
            (r.prototype._resetLayout = function () {
                this.getSize();
            }),
            (r.prototype.getSize = function () {
                this.size = d(this.element);
            }),
            (r.prototype._getMeasurement = function (t, e) {
                var i,
                    n = this.options[t];
                n
                    ? ("string" == typeof n
                        ? (i = this.element.querySelector(n))
                        : _(n) && (i = n),
                        (this[t] = i ? d(i)[e] : n))
                    : (this[t] = 0);
            }),
            (r.prototype.layoutItems = function (t, e) {
                (t = this._getItemsForLayout(t)),
                    this._layoutItems(t, e),
                    this._postLayout();
            }),
            (r.prototype._getItemsForLayout = function (t) {
                for (var e = [], i = 0, n = t.length; n > i; i++) {
                    var o = t[i];
                    o.isIgnored || e.push(o);
                }
                return e;
            }),
            (r.prototype._layoutItems = function (t, e) {
                if (!t || !t.length)
                    return this.emitEvent("layoutComplete", [this, t]), void 0;
                this._itemsOn(t, "layout", function () {
                    this.emitEvent("layoutComplete", [this, t]);
                });
                for (var i = [], n = 0, o = t.length; o > n; n++) {
                    var r = t[n],
                        s = this._getItemLayoutPosition(r);
                    (s.item = r), (s.isInstant = e), i.push(s);
                }
                this._processLayoutQueue(i);
            }),
            (r.prototype._getItemLayoutPosition = function () {
                return { x: 0, y: 0 };
            }),
            (r.prototype._processLayoutQueue = function (t) {
                for (var e = 0, i = t.length; i > e; e++) {
                    var n = t[e];
                    this._positionItem(n.item, n.x, n.y, n.isInstant);
                }
            }),
            (r.prototype._positionItem = function (t, e, i, n) {
                n ? t.goTo(e, i) : t.moveTo(e, i);
            }),
            (r.prototype._postLayout = function () {
                var t = this._getContainerSize();
                t &&
                    (this._setContainerMeasure(t.width, !0),
                        this._setContainerMeasure(t.height, !1));
            }),
            (r.prototype._getContainerSize = g),
            (r.prototype._setContainerMeasure = function (t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox &&
                        (t += e
                            ? i.paddingLeft +
                            i.paddingRight +
                            i.borderLeftWidth +
                            i.borderRightWidth
                            : i.paddingBottom +
                            i.paddingTop +
                            i.borderTopWidth +
                            i.borderBottomWidth),
                        (t = Math.max(t, 0)),
                        (this.element.style[e ? "width" : "height"] = t + "px");
                }
            }),
            (r.prototype._itemsOn = function (t, e, i) {
                function n() {
                    return o++, o === r && i.call(s), !0;
                }
                for (
                    var o = 0, r = t.length, s = this, a = 0, h = t.length;
                    h > a;
                    a++
                ) {
                    var p = t[a];
                    p.on(e, n);
                }
            }),
            (r.prototype.ignore = function (t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0);
            }),
            (r.prototype.unignore = function (t) {
                var e = this.getItem(t);
                e && delete e.isIgnored;
            }),
            (r.prototype.stamp = function (t) {
                if ((t = this._find(t))) {
                    this.stamps = this.stamps.concat(t);
                    for (var e = 0, i = t.length; i > e; e++) {
                        var n = t[e];
                        this.ignore(n);
                    }
                }
            }),
            (r.prototype.unstamp = function (t) {
                if ((t = this._find(t)))
                    for (var e = 0, i = t.length; i > e; e++) {
                        var n = t[e],
                            o = b(this.stamps, n);
                        -1 !== o && this.stamps.splice(o, 1), this.unignore(n);
                    }
            }),
            (r.prototype._find = function (t) {
                return t
                    ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
                        (t = n(t)))
                    : void 0;
            }),
            (r.prototype._manageStamps = function () {
                if (this.stamps && this.stamps.length) {
                    this._getBoundingRect();
                    for (var t = 0, e = this.stamps.length; e > t; t++) {
                        var i = this.stamps[t];
                        this._manageStamp(i);
                    }
                }
            }),
            (r.prototype._getBoundingRect = function () {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
                };
            }),
            (r.prototype._manageStamp = g),
            (r.prototype._getElementOffset = function (t) {
                var e = t.getBoundingClientRect(),
                    i = this._boundingRect,
                    n = d(t),
                    o = {
                        left: e.left - i.left - n.marginLeft,
                        top: e.top - i.top - n.marginTop,
                        right: i.right - e.right - n.marginRight,
                        bottom: i.bottom - e.bottom - n.marginBottom,
                    };
                return o;
            }),
            (r.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (r.prototype.bindResize = function () {
                this.isResizeBound ||
                    (f.bind(t, "resize", this), (this.isResizeBound = !0));
            }),
            (r.prototype.unbindResize = function () {
                f.unbind(t, "resize", this), (this.isResizeBound = !1);
            }),
            (r.prototype.onresize = function () {
                function t() {
                    e.resize();
                }
                this.resizeTimeout && clearTimeout(this.resizeTimeout);
                var e = this;
                this.resizeTimeout = setTimeout(t, 100);
            }),
            (r.prototype.resize = function () {
                var t = d(this.element),
                    e = this.size && t;
                (e && t.innerWidth === this.size.innerWidth) ||
                    (this.layout(), delete this.resizeTimeout);
            }),
            (r.prototype.addItems = function (t) {
                var e = this._getItems(t);
                if (e.length) return (this.items = this.items.concat(e)), e;
            }),
            (r.prototype.appended = function (t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e));
            }),
            (r.prototype.prepended = function (t) {
                var e = this._getItems(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    (this.items = e.concat(i)),
                        this._resetLayout(),
                        this.layoutItems(e, !0),
                        this.reveal(e),
                        this.layoutItems(i);
                }
            }),
            (r.prototype.reveal = function (t) {
                if (t && t.length)
                    for (var e = 0, i = t.length; i > e; e++) {
                        var n = t[e];
                        n.reveal();
                    }
            }),
            (r.prototype.hide = function (t) {
                if (t && t.length)
                    for (var e = 0, i = t.length; i > e; e++) {
                        var n = t[e];
                        n.hide();
                    }
            }),
            (r.prototype.getItem = function (t) {
                for (var e = 0, i = this.items.length; i > e; e++) {
                    var n = this.items[e];
                    if (n.element === t) return n;
                }
            }),
            (r.prototype.getItems = function (t) {
                if (t && t.length) {
                    for (var e = [], i = 0, n = t.length; n > i; i++) {
                        var o = t[i],
                            r = this.getItem(o);
                        r && e.push(r);
                    }
                    return e;
                }
            }),
            (r.prototype.remove = function (t) {
                t = n(t);
                var e = this.getItems(t);
                this._itemsOn(e, "remove", function () {
                    this.emitEvent("removeComplete", [this, e]);
                });
                for (var i = 0, o = e.length; o > i; i++) {
                    var r = e[i];
                    r.remove();
                    var s = b(this.items, r);
                    this.items.splice(s, 1);
                }
            }),
            (r.prototype.destroy = function () {
                var t = this.element.style;
                (t.height = ""), (t.position = ""), (t.width = "");
                for (var e = 0, i = this.items.length; i > e; e++) {
                    var n = this.items[e];
                    n.destroy();
                }
                this.unbindResize(), delete this.element.outlayerGUID;
            }),
            (r.data = function (t) {
                var e = t && t.outlayerGUID;
                return e && E[e];
            }),
            (r.create = function (t, i) {
                function n() {
                    r.apply(this, arguments);
                }
                return (
                    e(n.prototype, r.prototype),
                    s(n, "options"),
                    s(n, "settings"),
                    e(n.prototype.options, i),
                    (n.prototype.settings.namespace = t),
                    (n.data = r.data),
                    (n.Item = function () {
                        h.apply(this, arguments);
                    }),
                    (n.Item.prototype = new r.Item()),
                    (n.prototype.settings.item = n.Item),
                    p(function () {
                        for (
                            var e = o(t),
                            i = l.querySelectorAll(".js-" + e),
                            r = "data-" + e + "-options",
                            s = 0,
                            a = i.length;
                            a > s;
                            s++
                        ) {
                            var h,
                                p = i[s],
                                u = p.getAttribute(r);
                            try {
                                h = u && JSON.parse(u);
                            } catch (f) {
                                m &&
                                    m.error(
                                        "Error parsing " +
                                        r +
                                        " on " +
                                        p.nodeName.toLowerCase() +
                                        (p.id ? "#" + p.id : "") +
                                        ": " +
                                        f
                                    );
                                continue;
                            }
                            var d = new n(p, h);
                            y && y.data(p, t, d);
                        }
                    }),
                    y && y.bridget && y.bridget(t, n),
                    n
                );
            }),
            (r.Item = h),
            (t.Outlayer = r);
    })(window),
    (function (t) {
        "use strict";
        function e(t, e) {
            var n = t.create("masonry");
            return (
                (n.prototype._resetLayout = function () {
                    this.getSize(),
                        this._getMeasurement("columnWidth", "outerWidth"),
                        this._getMeasurement("gutter", "outerWidth"),
                        this.measureColumns();
                    var t = this.cols;
                    for (this.colYs = []; t--;) this.colYs.push(0);
                    this.maxY = 0;
                }),
                (n.prototype.measureColumns = function () {
                    var t = this.items[0].element;
                    (this.columnWidth = this.columnWidth || e(t).outerWidth),
                        (this.columnWidth += this.gutter),
                        (this.cols = Math.floor(
                            (this.size.innerWidth + this.gutter) / this.columnWidth
                        )),
                        (this.cols = Math.max(this.cols, 1));
                }),
                (n.prototype._getItemLayoutPosition = function (t) {
                    t.getSize();
                    var e = Math.ceil(t.size.outerWidth / this.columnWidth);
                    e = Math.min(e, this.cols);
                    for (
                        var n = this._getColGroup(e),
                        o = Math.min.apply(Math, n),
                        r = i(n, o),
                        s = { x: this.columnWidth * r, y: o },
                        a = o + t.size.outerHeight,
                        h = this.cols + 1 - n.length,
                        p = 0;
                        h > p;
                        p++
                    )
                        this.colYs[r + p] = a;
                    return s;
                }),
                (n.prototype._getColGroup = function (t) {
                    if (1 === t) return this.colYs;
                    for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                        var o = this.colYs.slice(n, n + t);
                        e[n] = Math.max.apply(Math, o);
                    }
                    return e;
                }),
                (n.prototype._manageStamp = function (t) {
                    var i = e(t),
                        n = this._getElementOffset(t),
                        o = this.options.isOriginLeft ? n.left : n.right,
                        r = o + i.outerWidth,
                        s = Math.floor(o / this.columnWidth);
                    s = Math.max(0, s);
                    var a = Math.floor(r / this.columnWidth);
                    a = Math.min(this.cols - 1, a);
                    for (
                        var h =
                            (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight,
                        p = s;
                        a >= p;
                        p++
                    )
                        this.colYs[p] = Math.max(h, this.colYs[p]);
                }),
                (n.prototype._getContainerSize = function () {
                    return (
                        (this.maxY = Math.max.apply(Math, this.colYs)),
                        { height: this.maxY }
                    );
                }),
                n
            );
        }
        var i = Array.prototype.indexOf
            ? function (t, e) {
                return t.indexOf(e);
            }
            : function (t, e) {
                for (var i = 0, n = t.length; n > i; i++) {
                    var o = t[i];
                    if (o === e) return i;
                }
                return -1;
            };
        "function" == typeof define && define.amd
            ? define(["outlayer", "get-size"], e)
            : (t.Masonry = e(t.Outlayer, t.getSize));
    })(window);
(function (e, t, n) {
    function s(t, n) {
        this.bodyOverflowX;
        this.callbacks = { hide: [], show: [] };
        this.checkInterval = null;
        this.Content;
        this.$el = e(t);
        this.$elProxy;
        this.elProxyPosition;
        this.enabled = true;
        this.options = e.extend({}, i, n);
        this.mouseIsOverProxy = false;
        this.namespace = "tooltipster-" + Math.round(Math.random() * 1e5);
        this.Status = "hidden";
        this.timerHide = null;
        this.timerShow = null;
        this.$tooltip;
        this.options.iconTheme = this.options.iconTheme.replace(".", "");
        this.options.theme = this.options.theme.replace(".", "");
        this._init();
    }
    function o(t, n) {
        var r = true;
        e.each(t, function (e, i) {
            if (typeof n[e] === "undefined" || t[e] !== n[e]) {
                r = false;
                return false;
            }
        });
        return r;
    }
    function f() {
        return !a && u;
    }
    function l() {
        var e = n.body || n.documentElement,
            t = e.style,
            r = "transition";
        if (typeof t[r] == "string") {
            return true;
        }
        (v = ["Moz", "Webkit", "Khtml", "O", "ms"]),
            (r = r.charAt(0).toUpperCase() + r.substr(1));
        for (var i = 0; i < v.length; i++) {
            if (typeof t[v[i] + r] == "string") {
                return true;
            }
        }
        return false;
    }
    var r = "tooltipster",
        i = {
            animation: "fade",
            arrow: true,
            arrowColor: "",
            autoClose: true,
            content: null,
            contentAsHTML: false,
            contentCloning: true,
            delay: 200,
            minWidth: 0,
            maxWidth: null,
            functionInit: function (e, t) { },
            functionBefore: function (e, t) {
                t();
            },
            functionReady: function (e, t) { },
            functionAfter: function (e) { },
            icon: "(?)",
            iconCloning: true,
            iconDesktop: false,
            iconTouch: false,
            iconTheme: "tooltipster-icon",
            interactive: false,
            interactiveTolerance: 350,
            multiple: false,
            offsetX: 0,
            offsetY: 0,
            onlyOne: false,
            position: "top",
            positionTracker: false,
            speed: 350,
            timer: 0,
            theme: "tooltipster-default",
            touchDevices: true,
            trigger: "hover",
            updateAnimation: true,
        };
    s.prototype = {
        _init: function () {
            var t = this;
            if (n.querySelector) {
                if (t.options.content !== null) {
                    t._content_set(t.options.content);
                } else {
                    var r = t.$el.attr("title");
                    if (typeof r === "undefined") r = null;
                    t._content_set(r);
                }
                var i = t.options.functionInit.call(t.$el, t.$el, t.Content);
                if (typeof i !== "undefined") t._content_set(i);
                t.$el.removeAttr("title").addClass("tooltipstered");
                if ((!u && t.options.iconDesktop) || (u && t.options.iconTouch)) {
                    if (typeof t.options.icon === "string") {
                        t.$elProxy = e('<span class="' + t.options.iconTheme + '"></span>');
                        t.$elProxy.text(t.options.icon);
                    } else {
                        if (t.options.iconCloning) t.$elProxy = t.options.icon.clone(true);
                        else t.$elProxy = t.options.icon;
                    }
                    t.$elProxy.insertAfter(t.$el);
                } else {
                    t.$elProxy = t.$el;
                }
                if (t.options.trigger == "hover") {
                    t.$elProxy
                        .on("mouseenter." + t.namespace, function () {
                            if (!f() || t.options.touchDevices) {
                                t.mouseIsOverProxy = true;
                                t._show();
                            }
                        })
                        .on("mouseleave." + t.namespace, function () {
                            if (!f() || t.options.touchDevices) {
                                t.mouseIsOverProxy = false;
                            }
                        });
                    if (u && t.options.touchDevices) {
                        t.$elProxy.on("touchstart." + t.namespace, function () {
                            t._showNow();
                        });
                    }
                } else if (t.options.trigger == "click") {
                    t.$elProxy.on("click." + t.namespace, function () {
                        if (!f() || t.options.touchDevices) {
                            t._show();
                        }
                    });
                }
            }
        },
        _show: function () {
            var e = this;
            if (e.Status != "shown" && e.Status != "appearing") {
                if (e.options.delay) {
                    e.timerShow = setTimeout(function () {
                        if (
                            e.options.trigger == "click" ||
                            (e.options.trigger == "hover" && e.mouseIsOverProxy)
                        ) {
                            e._showNow();
                        }
                    }, e.options.delay);
                } else e._showNow();
            }
        },
        _showNow: function (n) {
            var r = this;
            r.options.functionBefore.call(r.$el, r.$el, function () {
                if (r.enabled && r.Content !== null) {
                    if (n) r.callbacks.show.push(n);
                    r.callbacks.hide = [];
                    clearTimeout(r.timerShow);
                    r.timerShow = null;
                    clearTimeout(r.timerHide);
                    r.timerHide = null;
                    if (r.options.onlyOne) {
                        e(".tooltipstered")
                            .not(r.$el)
                            .each(function (t, n) {
                                var r = e(n),
                                    i = r.data("tooltipster-ns");
                                e.each(i, function (e, t) {
                                    var n = r.data(t),
                                        i = n.status(),
                                        s = n.option("autoClose");
                                    if (i !== "hidden" && i !== "disappearing" && s) {
                                        n.hide();
                                    }
                                });
                            });
                    }
                    var i = function () {
                        r.Status = "shown";
                        e.each(r.callbacks.show, function (e, t) {
                            t.call(r.$el);
                        });
                        r.callbacks.show = [];
                    };
                    if (r.Status !== "hidden") {
                        var s = 0;
                        if (r.Status === "disappearing") {
                            r.Status = "appearing";
                            if (l()) {
                                r.$tooltip
                                    .clearQueue()
                                    .removeClass("tooltipster-dying")
                                    .addClass("tooltipster-" + r.options.animation + "-show");
                                if (r.options.speed > 0) r.$tooltip.delay(r.options.speed);
                                r.$tooltip.queue(i);
                            } else {
                                r.$tooltip.stop().fadeIn(i);
                            }
                        } else if (r.Status === "shown") {
                            i();
                        }
                    } else {
                        r.Status = "appearing";
                        var s = r.options.speed;
                        r.bodyOverflowX = e("body").css("overflow-x");
                        e("body").css("overflow-x", "hidden");
                        var o = "tooltipster-" + r.options.animation,
                            a =
                                "-webkit-transition-duration: " +
                                r.options.speed +
                                "ms; -webkit-animation-duration: " +
                                r.options.speed +
                                "ms; -moz-transition-duration: " +
                                r.options.speed +
                                "ms; -moz-animation-duration: " +
                                r.options.speed +
                                "ms; -o-transition-duration: " +
                                r.options.speed +
                                "ms; -o-animation-duration: " +
                                r.options.speed +
                                "ms; -ms-transition-duration: " +
                                r.options.speed +
                                "ms; -ms-animation-duration: " +
                                r.options.speed +
                                "ms; transition-duration: " +
                                r.options.speed +
                                "ms; animation-duration: " +
                                r.options.speed +
                                "ms;",
                            f = r.options.minWidth
                                ? "min-width:" + Math.round(r.options.minWidth) + "px;"
                                : "",
                            c = r.options.maxWidth
                                ? "max-width:" + Math.round(r.options.maxWidth) + "px;"
                                : "",
                            h = r.options.interactive ? "pointer-events: auto;" : "";
                        r.$tooltip = e(
                            '<div class="tooltipster-base ' +
                            r.options.theme +
                            '" style="' +
                            f +
                            " " +
                            c +
                            " " +
                            h +
                            " " +
                            a +
                            '"><div class="tooltipster-content"></div></div>'
                        );
                        if (l()) r.$tooltip.addClass(o);
                        r._content_insert();
                        r.$tooltip.appendTo("body");
                        r.reposition();
                        r.options.functionReady.call(r.$el, r.$el, r.$tooltip);
                        if (l()) {
                            r.$tooltip.addClass(o + "-show");
                            if (r.options.speed > 0) r.$tooltip.delay(r.options.speed);
                            r.$tooltip.queue(i);
                        } else {
                            r.$tooltip.css("display", "none").fadeIn(r.options.speed, i);
                        }
                        r._interval_set();
                        e(t).on(
                            "scroll." + r.namespace + " resize." + r.namespace,
                            function () {
                                r.reposition();
                            }
                        );
                        if (r.options.autoClose) {
                            e("body").off("." + r.namespace);
                            if (r.options.trigger == "hover") {
                                if (u) {
                                    setTimeout(function () {
                                        e("body").on("touchstart." + r.namespace, function () {
                                            r.hide();
                                        });
                                    }, 0);
                                }
                                if (r.options.interactive) {
                                    if (u) {
                                        r.$tooltip.on("touchstart." + r.namespace, function (e) {
                                            e.stopPropagation();
                                        });
                                    }
                                    var p = null;
                                    r.$elProxy
                                        .add(r.$tooltip)
                                        .on(
                                            "mouseleave." + r.namespace + "-autoClose",
                                            function () {
                                                clearTimeout(p);
                                                p = setTimeout(function () {
                                                    r.hide();
                                                }, r.options.interactiveTolerance);
                                            }
                                        )
                                        .on(
                                            "mouseenter." + r.namespace + "-autoClose",
                                            function () {
                                                clearTimeout(p);
                                            }
                                        );
                                } else {
                                    r.$elProxy.on(
                                        "mouseleave." + r.namespace + "-autoClose",
                                        function () {
                                            r.hide();
                                        }
                                    );
                                }
                            } else if (r.options.trigger == "click") {
                                setTimeout(function () {
                                    e("body").on(
                                        "click." + r.namespace + " touchstart." + r.namespace,
                                        function () {
                                            r.hide();
                                        }
                                    );
                                }, 0);
                                if (r.options.interactive) {
                                    r.$tooltip.on(
                                        "click." + r.namespace + " touchstart." + r.namespace,
                                        function (e) {
                                            e.stopPropagation();
                                        }
                                    );
                                }
                            }
                        }
                    }
                    if (r.options.timer > 0) {
                        r.timerHide = setTimeout(function () {
                            r.timerHide = null;
                            r.hide();
                        }, r.options.timer + s);
                    }
                }
            });
        },
        _interval_set: function () {
            var t = this;
            t.checkInterval = setInterval(function () {
                if (
                    e("body").find(t.$el).length === 0 ||
                    e("body").find(t.$elProxy).length === 0 ||
                    t.Status == "hidden" ||
                    e("body").find(t.$tooltip).length === 0
                ) {
                    if (t.Status == "shown" || t.Status == "appearing") t.hide();
                    t._interval_cancel();
                } else {
                    if (t.options.positionTracker) {
                        var n = t._repositionInfo(t.$elProxy),
                            r = false;
                        if (o(n.dimension, t.elProxyPosition.dimension)) {
                            if (t.$elProxy.css("position") === "fixed") {
                                if (o(n.position, t.elProxyPosition.position)) r = true;
                            } else {
                                if (o(n.offset, t.elProxyPosition.offset)) r = true;
                            }
                        }
                        if (!r) {
                            t.reposition();
                        }
                    }
                }
            }, 200);
        },
        _interval_cancel: function () {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        },
        _content_set: function (e) {
            if (typeof e === "object" && e !== null && this.options.contentCloning) {
                e = e.clone(true);
            }
            this.Content = e;
        },
        _content_insert: function () {
            var e = this,
                t = this.$tooltip.find(".tooltipster-content");
            if (typeof e.Content === "string" && !e.options.contentAsHTML) {
                t.text(e.Content);
            } else {
                t.empty().append(e.Content);
            }
        },
        _update: function (e) {
            var t = this;
            t._content_set(e);
            if (t.Content !== null) {
                if (t.Status !== "hidden") {
                    t._content_insert();
                    t.reposition();
                    if (t.options.updateAnimation) {
                        if (l()) {
                            t.$tooltip
                                .css({
                                    width: "",
                                    "-webkit-transition":
                                        "all " +
                                        t.options.speed +
                                        "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                    "-moz-transition":
                                        "all " +
                                        t.options.speed +
                                        "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                    "-o-transition":
                                        "all " +
                                        t.options.speed +
                                        "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                    "-ms-transition":
                                        "all " +
                                        t.options.speed +
                                        "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                    transition:
                                        "all " +
                                        t.options.speed +
                                        "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                })
                                .addClass("tooltipster-content-changing");
                            setTimeout(function () {
                                if (t.Status != "hidden") {
                                    t.$tooltip.removeClass("tooltipster-content-changing");
                                    setTimeout(function () {
                                        if (t.Status !== "hidden") {
                                            t.$tooltip.css({
                                                "-webkit-transition": t.options.speed + "ms",
                                                "-moz-transition": t.options.speed + "ms",
                                                "-o-transition": t.options.speed + "ms",
                                                "-ms-transition": t.options.speed + "ms",
                                                transition: t.options.speed + "ms",
                                            });
                                        }
                                    }, t.options.speed);
                                }
                            }, t.options.speed);
                        } else {
                            t.$tooltip.fadeTo(t.options.speed, 0.5, function () {
                                if (t.Status != "hidden") {
                                    t.$tooltip.fadeTo(t.options.speed, 1);
                                }
                            });
                        }
                    }
                }
            } else {
                t.hide();
            }
        },
        _repositionInfo: function (e) {
            return {
                dimension: { height: e.outerHeight(false), width: e.outerWidth(false) },
                offset: e.offset(),
                position: {
                    left: parseInt(e.css("left")),
                    top: parseInt(e.css("top")),
                },
            };
        },
        hide: function (n) {
            var r = this;
            if (n) r.callbacks.hide.push(n);
            r.callbacks.show = [];
            clearTimeout(r.timerShow);
            r.timerShow = null;
            clearTimeout(r.timerHide);
            r.timerHide = null;
            var i = function () {
                e.each(r.callbacks.hide, function (e, t) {
                    t.call(r.$el);
                });
                r.callbacks.hide = [];
            };
            if (r.Status == "shown" || r.Status == "appearing") {
                r.Status = "disappearing";
                var s = function () {
                    r.Status = "hidden";
                    if (typeof r.Content == "object" && r.Content !== null) {
                        r.Content.detach();
                    }
                    r.$tooltip.remove();
                    r.$tooltip = null;
                    e(t).off("." + r.namespace);
                    e("body")
                        .off("." + r.namespace)
                        .css("overflow-x", r.bodyOverflowX);
                    e("body").off("." + r.namespace);
                    r.$elProxy.off("." + r.namespace + "-autoClose");
                    r.options.functionAfter.call(r.$el, r.$el);
                    i();
                };
                if (l()) {
                    r.$tooltip
                        .clearQueue()
                        .removeClass("tooltipster-" + r.options.animation + "-show")
                        .addClass("tooltipster-dying");
                    if (r.options.speed > 0) r.$tooltip.delay(r.options.speed);
                    r.$tooltip.queue(s);
                } else {
                    r.$tooltip.stop().fadeOut(r.options.speed, s);
                }
            } else if (r.Status == "hidden") {
                i();
            }
            return r;
        },
        show: function (e) {
            this._showNow(e);
            return this;
        },
        update: function (e) {
            return this.content(e);
        },
        content: function (e) {
            if (typeof e === "undefined") {
                return this.Content;
            } else {
                this._update(e);
                return this;
            }
        },
        reposition: function () {
            var n = this;
            if (e("body").find(n.$tooltip).length !== 0) {
                n.$tooltip.css("width", "");
                n.elProxyPosition = n._repositionInfo(n.$elProxy);
                var r = null,
                    i = e(t).width(),
                    s = n.elProxyPosition,
                    o = n.$tooltip.outerWidth(false),
                    u = n.$tooltip.innerWidth() + 1,
                    a = n.$tooltip.outerHeight(false);
                if (n.$elProxy.is("area")) {
                    var f = n.$elProxy.attr("shape"),
                        l = n.$elProxy.parent().attr("name"),
                        c = e('img[usemap="#' + l + '"]'),
                        h = c.offset().left,
                        p = c.offset().top,
                        d =
                            n.$elProxy.attr("coords") !== undefined
                                ? n.$elProxy.attr("coords").split(",")
                                : undefined;
                    if (f == "circle") {
                        var v = parseInt(d[0]),
                            m = parseInt(d[1]),
                            g = parseInt(d[2]);
                        s.dimension.height = g * 2;
                        s.dimension.width = g * 2;
                        s.offset.top = p + m - g;
                        s.offset.left = h + v - g;
                    } else if (f == "rect") {
                        var v = parseInt(d[0]),
                            m = parseInt(d[1]),
                            y = parseInt(d[2]),
                            b = parseInt(d[3]);
                        s.dimension.height = b - m;
                        s.dimension.width = y - v;
                        s.offset.top = p + m;
                        s.offset.left = h + v;
                    } else if (f == "poly") {
                        var w = [],
                            E = [],
                            S = 0,
                            x = 0,
                            T = 0,
                            N = 0,
                            C = "even";
                        for (var k = 0; k < d.length; k++) {
                            var L = parseInt(d[k]);
                            if (C == "even") {
                                if (L > T) {
                                    T = L;
                                    if (k === 0) {
                                        S = T;
                                    }
                                }
                                if (L < S) {
                                    S = L;
                                }
                                C = "odd";
                            } else {
                                if (L > N) {
                                    N = L;
                                    if (k == 1) {
                                        x = N;
                                    }
                                }
                                if (L < x) {
                                    x = L;
                                }
                                C = "even";
                            }
                        }
                        s.dimension.height = N - x;
                        s.dimension.width = T - S;
                        s.offset.top = p + x;
                        s.offset.left = h + S;
                    } else {
                        s.dimension.height = c.outerHeight(false);
                        s.dimension.width = c.outerWidth(false);
                        s.offset.top = p;
                        s.offset.left = h;
                    }
                }
                var A = 0,
                    O = 0,
                    M = 0,
                    _ = parseInt(n.options.offsetY),
                    D = parseInt(n.options.offsetX),
                    P = n.options.position;
                function H() {
                    var n = e(t).scrollLeft();
                    if (A - n < 0) {
                        r = A - n;
                        A = n;
                    }
                    if (A + o - n > i) {
                        r = A - (i + n - o);
                        A = i + n - o;
                    }
                }
                function B(n, r) {
                    if (
                        s.offset.top - e(t).scrollTop() - a - _ - 12 < 0 &&
                        r.indexOf("top") > -1
                    ) {
                        P = n;
                    }
                    if (
                        s.offset.top + s.dimension.height + a + 12 + _ >
                        e(t).scrollTop() + e(t).height() &&
                        r.indexOf("bottom") > -1
                    ) {
                        P = n;
                        M = s.offset.top - a - _ - 12;
                    }
                }
                if (P == "top") {
                    var j = s.offset.left + o - (s.offset.left + s.dimension.width);
                    A = s.offset.left + D - j / 2;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom", "top");
                }
                if (P == "top-left") {
                    A = s.offset.left + D;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom-left", "top-left");
                }
                if (P == "top-right") {
                    A = s.offset.left + s.dimension.width + D - o;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom-right", "top-right");
                }
                if (P == "bottom") {
                    var j = s.offset.left + o - (s.offset.left + s.dimension.width);
                    A = s.offset.left - j / 2 + D;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top", "bottom");
                }
                if (P == "bottom-left") {
                    A = s.offset.left + D;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top-left", "bottom-left");
                }
                if (P == "bottom-right") {
                    A = s.offset.left + s.dimension.width + D - o;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top-right", "bottom-right");
                }
                if (P == "left") {
                    A = s.offset.left - D - o - 12;
                    O = s.offset.left + D + s.dimension.width + 12;
                    var F = s.offset.top + a - (s.offset.top + s.dimension.height);
                    M = s.offset.top - F / 2 - _;
                    if (A < 0 && O + o > i) {
                        var I = parseFloat(n.$tooltip.css("border-width")) * 2,
                            q = o + A - I;
                        n.$tooltip.css("width", q + "px");
                        a = n.$tooltip.outerHeight(false);
                        A = s.offset.left - D - q - 12 - I;
                        F = s.offset.top + a - (s.offset.top + s.dimension.height);
                        M = s.offset.top - F / 2 - _;
                    } else if (A < 0) {
                        A = s.offset.left + D + s.dimension.width + 12;
                        r = "left";
                    }
                }
                if (P == "right") {
                    A = s.offset.left + D + s.dimension.width + 12;
                    O = s.offset.left - D - o - 12;
                    var F = s.offset.top + a - (s.offset.top + s.dimension.height);
                    M = s.offset.top - F / 2 - _;
                    if (A + o > i && O < 0) {
                        var I = parseFloat(n.$tooltip.css("border-width")) * 2,
                            q = i - A - I;
                        n.$tooltip.css("width", q + "px");
                        a = n.$tooltip.outerHeight(false);
                        F = s.offset.top + a - (s.offset.top + s.dimension.height);
                        M = s.offset.top - F / 2 - _;
                    } else if (A + o > i) {
                        A = s.offset.left - D - o - 12;
                        r = "right";
                    }
                }
                if (n.options.arrow) {
                    var R = "tooltipster-arrow-" + P;
                    if (n.options.arrowColor.length < 1) {
                        var U = n.$tooltip.css("background-color");
                    } else {
                        var U = n.options.arrowColor;
                    }
                    if (!r) {
                        r = "";
                    } else if (r == "left") {
                        R = "tooltipster-arrow-right";
                        r = "";
                    } else if (r == "right") {
                        R = "tooltipster-arrow-left";
                        r = "";
                    } else {
                        r = "left:" + Math.round(r) + "px;";
                    }
                    if (P == "top" || P == "top-left" || P == "top-right") {
                        var z = parseFloat(n.$tooltip.css("border-bottom-width")),
                            W = n.$tooltip.css("border-bottom-color");
                    } else if (
                        P == "bottom" ||
                        P == "bottom-left" ||
                        P == "bottom-right"
                    ) {
                        var z = parseFloat(n.$tooltip.css("border-top-width")),
                            W = n.$tooltip.css("border-top-color");
                    } else if (P == "left") {
                        var z = parseFloat(n.$tooltip.css("border-right-width")),
                            W = n.$tooltip.css("border-right-color");
                    } else if (P == "right") {
                        var z = parseFloat(n.$tooltip.css("border-left-width")),
                            W = n.$tooltip.css("border-left-color");
                    } else {
                        var z = parseFloat(n.$tooltip.css("border-bottom-width")),
                            W = n.$tooltip.css("border-bottom-color");
                    }
                    if (z > 1) {
                        z++;
                    }
                    var X = "";
                    if (z !== 0) {
                        var V = "",
                            J = "border-color: " + W + ";";
                        if (R.indexOf("bottom") !== -1) {
                            V = "margin-top: -" + Math.round(z) + "px;";
                        } else if (R.indexOf("top") !== -1) {
                            V = "margin-bottom: -" + Math.round(z) + "px;";
                        } else if (R.indexOf("left") !== -1) {
                            V = "margin-right: -" + Math.round(z) + "px;";
                        } else if (R.indexOf("right") !== -1) {
                            V = "margin-left: -" + Math.round(z) + "px;";
                        }
                        X =
                            '<span class="tooltipster-arrow-border" style="' +
                            V +
                            " " +
                            J +
                            ';"></span>';
                    }
                    n.$tooltip.find(".tooltipster-arrow").remove();
                    var K =
                        '<div class="' +
                        R +
                        ' tooltipster-arrow" style="' +
                        r +
                        '">' +
                        X +
                        '<span style="border-color:' +
                        U +
                        ';"></span></div>';
                    n.$tooltip.append(K);
                }
                n.$tooltip.css({
                    top: Math.round(M) + "px",
                    left: Math.round(A) + "px",
                });
            }
            return n;
        },
        enable: function () {
            this.enabled = true;
            return this;
        },
        disable: function () {
            this.hide();
            this.enabled = false;
            return this;
        },
        destroy: function () {
            var t = this;
            t.hide();
            if (t.$el[0] !== t.$elProxy[0]) t.$elProxy.remove();
            t.$el.removeData(t.namespace).off("." + t.namespace);
            var n = t.$el.data("tooltipster-ns");
            if (n.length === 1) {
                var r =
                    typeof t.Content === "string"
                        ? t.Content
                        : e("<div></div>").append(t.Content).html();
                t.$el
                    .removeClass("tooltipstered")
                    .attr("title", r)
                    .removeData(t.namespace)
                    .removeData("tooltipster-ns")
                    .off("." + t.namespace);
            } else {
                n = e.grep(n, function (e, n) {
                    return e !== t.namespace;
                });
                t.$el.data("tooltipster-ns", n);
            }
            return t;
        },
        elementIcon: function () {
            return this.$el[0] !== this.$elProxy[0] ? this.$elProxy[0] : undefined;
        },
        elementTooltip: function () {
            return this.$tooltip ? this.$tooltip[0] : undefined;
        },
        option: function (e, t) {
            if (typeof t == "undefined") return this.options[e];
            else {
                this.options[e] = t;
                return this;
            }
        },
        status: function () {
            return this.Status;
        },
    };
    e.fn[r] = function () {
        var t = arguments;
        if (this.length === 0) {
            if (typeof t[0] === "string") {
                var n = true;
                switch (t[0]) {
                    case "setDefaults":
                        e.extend(i, t[1]);
                        break;
                    default:
                        n = false;
                        break;
                }
                if (n) return true;
                else return this;
            } else {
                return this;
            }
        } else {
            if (typeof t[0] === "string") {
                var r = "#*$~&";
                this.each(function () {
                    var n = e(this).data("tooltipster-ns"),
                        i = n ? e(this).data(n[0]) : null;
                    if (i) {
                        if (typeof i[t[0]] === "function") {
                            var s = i[t[0]](t[1], t[2]);
                        } else {
                            throw new Error('Unknown method .tooltipster("' + t[0] + '")');
                        }
                        if (s !== i) {
                            r = s;
                            return false;
                        }
                    } else {
                        throw new Error(
                            "You called Tooltipster's \"" +
                            t[0] +
                            '" method on an uninitialized element'
                        );
                    }
                });
                return r !== "#*$~&" ? r : this;
            } else {
                var o = [],
                    u = t[0] && typeof t[0].multiple !== "undefined",
                    a = (u && t[0].multiple) || (!u && i.multiple);
                this.each(function () {
                    var n = false,
                        r = e(this).data("tooltipster-ns"),
                        i = null;
                    if (!r) {
                        n = true;
                    } else {
                        if (a) n = true;
                        else
                            console.log(
                                'Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.'
                            );
                    }
                    if (n) {
                        i = new s(this, t[0]);
                        if (!r) r = [];
                        r.push(i.namespace);
                        e(this).data("tooltipster-ns", r);
                        e(this).data(i.namespace, i);
                    }
                    o.push(i);
                });
                if (a) return o;
                else return this;
            }
        }
    };
    var u = !!("ontouchstart" in t);
    var a = false;
    e("body").one("mousemove", function () {
        a = true;
    });
})(jQuery, window, document);
(function ($) {
    var ParallaxManager = function (options) {
        this.options = options;
        this.vendor_prefixes = ["webkit", "moz", "o", "ms"];
        this.num_vendor_prefixes = this.vendor_prefixes.length;
        var thisBrowserSupportsStyle = function (style) {
            var vendors = ["Webkit", "Moz", "ms", "O"];
            var num_vendors = vendors.length;
            var dummy_el = window.document.createElement("parallax");
            if (dummy_el.style[style] !== undefined) {
                return true;
            }
            style = style.replace(/./, function (first) {
                return first.toUpperCase();
            });
            for (var i = 0; i < num_vendors; i++) {
                var pfx_style = vendors[i] + style;
                if (dummy_el.style[pfx_style] !== undefined) {
                    return true;
                }
            }
            return false;
        };
        this.has_3dtransforms = thisBrowserSupportsStyle("perspective");
        if (
            this.has_3dtransforms &&
            thisBrowserSupportsStyle("WebkitPerspective")
        ) {
            var $test_el = $(
                '<div><style type="text/css">@media (transform-3d),(-webkit-transform-3d) {#parallax-3dtest {position: absolute;left: 9px;height: 5px;margin: 0;padding: 0;border: 0;}</style><div id="parallax-3dtest"></div></div>'
            ).appendTo("body");
            var $el = $("#parallax-3dtest");
            this.has_3dtransforms = $el.height() == 5 && $el.offset().left == 9;
            $test_el.remove();
        }
        this.has_2dtransforms = thisBrowserSupportsStyle("transform");
    };
    $.extend(ParallaxManager.prototype, {
        init: function () {
            this.scroll_factor = this.options.scroll_factor;
            var parallax_blocks = (this.parallax_blocks = []);
            var image_attr = this.options.image_attr;
            var $body = $("body");
            var $origins = this.options.origins;
            $origins.each(function () {
                var $origin = $(this);
                var $parallax_block;
                if ($origin.data(image_attr)) {
                    $parallax_block = $(
                        '<div class="parallax-block"><img class="parallax-image" src="' +
                        $origin.data(image_attr) +
                        '"></div>'
                    );
                    parallax_blocks.push({
                        origin: $origin,
                        block: $parallax_block,
                        bg_ratio: $origin.data("width") / $origin.data("height"),
                    });
                    $body.prepend($parallax_block);
                } else if ($origin.data("tile")) {
                    $parallax_block = $(
                        '<div class="parallax-block"><div class="parallax-image" style="background-image: url(' +
                        $origin.data("tile") +
                        ')"></div></div>'
                    );
                    parallax_blocks.push({
                        origin: $origin,
                        block: $parallax_block,
                        bg_ratio: 1,
                    });
                    $body.prepend($parallax_block);
                }
            });
            var manager = this;
            var reconfigure = function () {
                manager.redrawBlocks();
                manager.render();
            };
            var $window = $(window);
            $window.on("load", reconfigure);
            $window.on("resize", reconfigure);
            $window.on("hwparallax.reconfigure", reconfigure);
            $window.on("scroll", function () {
                manager.render();
            });
        },
        redrawBlocks: function () {
            var window_width = $(window).width();
            var window_height = (this.window_height = $(window).height());
            var body = document.body;
            var html = document.documentElement;
            var document_height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );
            this.max_scrolltop = Math.max(0, document_height - window_height);
            var num_parallax_blocks = this.parallax_blocks.length;
            for (var i = 0; i < num_parallax_blocks; i++) {
                var parallax_block_data = this.parallax_blocks[i];
                var $parallax_block = parallax_block_data.block;
                var bg_ratio = parallax_block_data.bg_ratio;
                var $parallax_image = $parallax_block.children(".parallax-image");
                var $origin = parallax_block_data.origin;
                var origin_height = $origin.outerHeight();
                var min_height =
                    window_height - (window_height - origin_height) * this.scroll_factor;
                var img_width = window_width;
                var img_height = Math.ceil(img_width / bg_ratio);
                var img_xoff = 0;
                if (img_height < min_height) {
                    img_height = min_height;
                    img_width = img_height * bg_ratio;
                    img_xoff = Math.floor(img_width - window_width) / 2;
                }
                $parallax_image.width(img_width).height(img_height);
                $parallax_block
                    .width(window_width)
                    .height(origin_height)
                    .css("visibility", "hidden");
                $.extend(parallax_block_data, {
                    origin_position: $origin.offset().top,
                    origin_height: origin_height,
                    image: $parallax_image,
                    image_xoff: img_xoff,
                    image_height: img_height,
                });
            }
        },
        render: function () {
            if (!this.drawing) {
                this.drawing = true;
                var manager = this;
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(function () {
                        manager.draw();
                    }, document);
                } else {
                    manager.draw();
                }
            }
        },
        draw: function () {
            var scroll_top = Math.min(
                Math.max(0, $(window).scrollTop()),
                this.max_scrolltop
            );
            var num_blocks = this.parallax_blocks.length;
            var data;
            for (var i = 0; i < num_blocks; i++) {
                data = this.parallax_blocks[i];
                if (
                    data.origin_position < scroll_top + this.window_height &&
                    data.origin_position + data.origin_height > scroll_top
                ) {
                    var new_block_position = data.origin_position - scroll_top;
                    var new_image_position =
                        new_block_position * (this.scroll_factor - 1);
                    var block_styles = { visibility: "visible" };
                    var image_styles = {};
                    var block_transform, image_transform, prefixed_style;
                    var j;
                    if (this.has_3dtransforms) {
                        block_transform = block_styles.transform =
                            "translate3d(0px, " + new_block_position + "px, 0px)";
                        image_transform = image_styles.transform =
                            "translate3d(-" +
                            data.image_xoff +
                            "px, " +
                            new_image_position +
                            "px, 0px)";
                        for (j = 0; j < this.num_vendor_prefixes; j++) {
                            prefixed_style = "-" + this.vendor_prefixes[j] + "-transform";
                            block_styles[prefixed_style] = block_transform;
                            image_styles[prefixed_style] = image_transform;
                        }
                    } else if (this.has_2dtransforms) {
                        block_transform = block_styles.transform =
                            "translate(0px, " + new_block_position + "px)";
                        image_transform = image_styles.transform =
                            "translate(-" +
                            data.image_xoff +
                            "px, " +
                            new_image_position +
                            "px)";
                        for (j = 0; j < this.num_vendor_prefixes; j++) {
                            prefixed_style = "-" + this.vendor_prefixes[j] + "-transform";
                            block_styles[prefixed_style] = block_transform;
                            image_styles[prefixed_style] = image_transform;
                        }
                    } else {
                        block_styles.top = new_block_position + "px";
                        block_styles.left = 0 + "px";
                        image_styles.top = new_image_position + "px";
                        image_styles.left = -data.image_xoff + "px";
                    }
                    data.block.css(block_styles);
                    data.image.css(image_styles);
                } else {
                    data.block.css("visibility", "hidden");
                }
            }
            this.drawing = false;
        },
    });
    $.extend($.fn, {
        parallax: function (options) {
            var settings = $.extend(
                { scroll_factor: 0.2, image_attr: "image" },
                options,
                { origins: $(this) }
            );
            var pm = new ParallaxManager(settings);
            pm.init();
        },
    });
})(jQuery);
!(function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
        ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
            e(t, i);
        })
        : "object" == typeof module && module.exports
            ? (module.exports = e(t, require("jquery")))
            : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
    "use strict";
    function i(i, r, a) {
        function h(t, e, n) {
            var o,
                r = "$()." + i + '("' + e + '")';
            return (
                t.each(function (t, h) {
                    var u = a.data(h, i);
                    if (!u)
                        return void s(
                            i + " not initialized. Cannot call methods, i.e. " + r
                        );
                    var d = u[e];
                    if (!d || "_" == e.charAt(0))
                        return void s(r + " is not a valid method");
                    var c = d.apply(u, n);
                    o = void 0 === o ? c : o;
                }),
                void 0 !== o ? o : t
            );
        }
        function u(t, e) {
            t.each(function (t, n) {
                var o = a.data(n, i);
                o ? (o.option(e), o._init()) : ((o = new r(n, e)), a.data(n, i, o));
            });
        }
        (a = a || e || t.jQuery),
            a &&
            (r.prototype.option ||
                (r.prototype.option = function (t) {
                    a.isPlainObject(t) &&
                        (this.options = a.extend(!0, this.options, t));
                }),
                (a.fn[i] = function (t) {
                    if ("string" == typeof t) {
                        var e = o.call(arguments, 1);
                        return h(this, t, e);
                    }
                    return u(this, t), this;
                }),
                n(a));
    }
    function n(t) {
        !t || (t && t.bridget) || (t.bridget = i);
    }
    var o = Array.prototype.slice,
        r = t.console,
        s =
            "undefined" == typeof r
                ? function () { }
                : function (t) {
                    r.error(t);
                };
    return n(e || t.jQuery), i;
}),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define("ev-emitter/ev-emitter", e)
            : "object" == typeof module && module.exports
                ? (module.exports = e())
                : (t.EvEmitter = e());
    })(this, function () {
        function t() { }
        var e = t.prototype;
        return (
            (e.on = function (t, e) {
                if (t && e) {
                    var i = (this._events = this._events || {}),
                        n = (i[t] = i[t] || []);
                    return -1 == n.indexOf(e) && n.push(e), this;
                }
            }),
            (e.once = function (t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = (this._onceEvents = this._onceEvents || {}),
                        n = (i[t] = i[t] || []);
                    return (n[e] = !0), this;
                }
            }),
            (e.off = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return -1 != n && i.splice(n, 1), this;
                }
            }),
            (e.emitEvent = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = 0,
                        o = i[n];
                    e = e || [];
                    for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                        var s = r && r[o];
                        s && (this.off(t, o), delete r[o]),
                            o.apply(this, e),
                            (n += s ? 0 : 1),
                            (o = i[n]);
                    }
                    return this;
                }
            }),
            t
        );
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define("get-size/get-size", [], function () {
                return e();
            })
            : "object" == typeof module && module.exports
                ? (module.exports = e())
                : (t.getSize = e());
    })(window, function () {
        "use strict";
        function t(t) {
            var e = parseFloat(t),
                i = -1 == t.indexOf("%") && !isNaN(e);
            return i && e;
        }
        function e() { }
        function i() {
            for (
                var t = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0,
                },
                e = 0;
                u > e;
                e++
            ) {
                var i = h[e];
                t[i] = 0;
            }
            return t;
        }
        function n(t) {
            var e = getComputedStyle(t);
            return (
                e ||
                a(
                    "Style returned " +
                    e +
                    ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
                ),
                e
            );
        }
        function o() {
            if (!d) {
                d = !0;
                var e = document.createElement("div");
                (e.style.width = "200px"),
                    (e.style.padding = "1px 2px 3px 4px"),
                    (e.style.borderStyle = "solid"),
                    (e.style.borderWidth = "1px 2px 3px 4px"),
                    (e.style.boxSizing = "border-box");
                var i = document.body || document.documentElement;
                i.appendChild(e);
                var o = n(e);
                (r.isBoxSizeOuter = s = 200 == t(o.width)), i.removeChild(e);
            }
        }
        function r(e) {
            if (
                (o(),
                    "string" == typeof e && (e = document.querySelector(e)),
                    e && "object" == typeof e && e.nodeType)
            ) {
                var r = n(e);
                if ("none" == r.display) return i();
                var a = {};
                (a.width = e.offsetWidth), (a.height = e.offsetHeight);
                for (
                    var d = (a.isBorderBox = "border-box" == r.boxSizing), c = 0;
                    u > c;
                    c++
                ) {
                    var l = h[c],
                        f = r[l],
                        m = parseFloat(f);
                    a[l] = isNaN(m) ? 0 : m;
                }
                var p = a.paddingLeft + a.paddingRight,
                    g = a.paddingTop + a.paddingBottom,
                    y = a.marginLeft + a.marginRight,
                    v = a.marginTop + a.marginBottom,
                    _ = a.borderLeftWidth + a.borderRightWidth,
                    E = a.borderTopWidth + a.borderBottomWidth,
                    z = d && s,
                    b = t(r.width);
                b !== !1 && (a.width = b + (z ? 0 : p + _));
                var x = t(r.height);
                return (
                    x !== !1 && (a.height = x + (z ? 0 : g + E)),
                    (a.innerWidth = a.width - (p + _)),
                    (a.innerHeight = a.height - (g + E)),
                    (a.outerWidth = a.width + y),
                    (a.outerHeight = a.height + v),
                    a
                );
            }
        }
        var s,
            a =
                "undefined" == typeof console
                    ? e
                    : function (t) {
                        console.error(t);
                    },
            h = [
                "paddingLeft",
                "paddingRight",
                "paddingTop",
                "paddingBottom",
                "marginLeft",
                "marginRight",
                "marginTop",
                "marginBottom",
                "borderLeftWidth",
                "borderRightWidth",
                "borderTopWidth",
                "borderBottomWidth",
            ],
            u = h.length,
            d = !1;
        return r;
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define("matches-selector/matches-selector", e)
            : "object" == typeof module && module.exports
                ? (module.exports = e())
                : (t.matchesSelector = e());
    })(window, function () {
        "use strict";
        var t = (function () {
            var t = Element.prototype;
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var n = e[i],
                    o = n + "MatchesSelector";
                if (t[o]) return o;
            }
        })();
        return function (e, i) {
            return e[t](i);
        };
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define(
                "fizzy-ui-utils/utils",
                ["matches-selector/matches-selector"],
                function (i) {
                    return e(t, i);
                }
            )
            : "object" == typeof module && module.exports
                ? (module.exports = e(t, require("desandro-matches-selector")))
                : (t.fizzyUIUtils = e(t, t.matchesSelector));
    })(window, function (t, e) {
        var i = {};
        (i.extend = function (t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }),
            (i.modulo = function (t, e) {
                return ((t % e) + e) % e;
            }),
            (i.makeArray = function (t) {
                var e = [];
                if (Array.isArray(t)) e = t;
                else if (t && "number" == typeof t.length)
                    for (var i = 0; i < t.length; i++) e.push(t[i]);
                else e.push(t);
                return e;
            }),
            (i.removeFrom = function (t, e) {
                var i = t.indexOf(e);
                -1 != i && t.splice(i, 1);
            }),
            (i.getParent = function (t, i) {
                for (; t != document.body;)
                    if (((t = t.parentNode), e(t, i))) return t;
            }),
            (i.getQueryElement = function (t) {
                return "string" == typeof t ? document.querySelector(t) : t;
            }),
            (i.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (i.filterFindElements = function (t, n) {
                t = i.makeArray(t);
                var o = [];
                return (
                    t.forEach(function (t) {
                        if (t instanceof HTMLElement) {
                            if (!n) return void o.push(t);
                            e(t, n) && o.push(t);
                            for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                                o.push(i[r]);
                        }
                    }),
                    o
                );
            }),
            (i.debounceMethod = function (t, e, i) {
                var n = t.prototype[e],
                    o = e + "Timeout";
                t.prototype[e] = function () {
                    var t = this[o];
                    t && clearTimeout(t);
                    var e = arguments,
                        r = this;
                    this[o] = setTimeout(function () {
                        n.apply(r, e), delete r[o];
                    }, i || 100);
                };
            }),
            (i.docReady = function (t) {
                "complete" == document.readyState
                    ? t()
                    : document.addEventListener("DOMContentLoaded", t);
            }),
            (i.toDashed = function (t) {
                return t
                    .replace(/(.)([A-Z])/g, function (t, e, i) {
                        return e + "-" + i;
                    })
                    .toLowerCase();
            });
        var n = t.console;
        return (
            (i.htmlInit = function (e, o) {
                i.docReady(function () {
                    var r = i.toDashed(o),
                        s = "data-" + r,
                        a = document.querySelectorAll("[" + s + "]"),
                        h = document.querySelectorAll(".js-" + r),
                        u = i.makeArray(a).concat(i.makeArray(h)),
                        d = s + "-options",
                        c = t.jQuery;
                    u.forEach(function (t) {
                        var i,
                            r = t.getAttribute(s) || t.getAttribute(d);
                        try {
                            i = r && JSON.parse(r);
                        } catch (a) {
                            return void (
                                n &&
                                n.error("Error parsing " + s + " on " + t.className + ": " + a)
                            );
                        }
                        var h = new e(t, i);
                        c && c.data(t, o, h);
                    });
                });
            }),
            i
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define(
                "outlayer/item",
                ["ev-emitter/ev-emitter", "get-size/get-size"],
                function (i, n) {
                    return e(t, i, n);
                }
            )
            : "object" == typeof module && module.exports
                ? (module.exports = e(t, require("ev-emitter"), require("get-size")))
                : ((t.Outlayer = {}), (t.Outlayer.Item = e(t, t.EvEmitter, t.getSize)));
    })(window, function (t, e, i) {
        "use strict";
        function n(t) {
            for (var e in t) return !1;
            return (e = null), !0;
        }
        function o(t, e) {
            t &&
                ((this.element = t),
                    (this.layout = e),
                    (this.position = { x: 0, y: 0 }),
                    this._create());
        }
        function r(t) {
            return t.replace(/([A-Z])/g, function (t) {
                return "-" + t.toLowerCase();
            });
        }
        var s = document.documentElement.style,
            a = "string" == typeof s.transition ? "transition" : "WebkitTransition",
            h = "string" == typeof s.transform ? "transform" : "WebkitTransform",
            u = {
                WebkitTransition: "webkitTransitionEnd",
                transition: "transitionend",
            }[a],
            d = [h, a, a + "Duration", a + "Property"],
            c = (o.prototype = Object.create(e.prototype));
        (c.constructor = o),
            (c._create = function () {
                (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
                    this.css({ position: "absolute" });
            }),
            (c.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t);
            }),
            (c.getSize = function () {
                this.size = i(this.element);
            }),
            (c.css = function (t) {
                var e = this.element.style;
                for (var i in t) {
                    var n = d[i] || i;
                    e[n] = t[i];
                }
            }),
            (c.getPosition = function () {
                var t = getComputedStyle(this.element),
                    e = this.layout._getOption("originLeft"),
                    i = this.layout._getOption("originTop"),
                    n = t[e ? "left" : "right"],
                    o = t[i ? "top" : "bottom"],
                    r = this.layout.size,
                    s =
                        -1 != n.indexOf("%")
                            ? (parseFloat(n) / 100) * r.width
                            : parseInt(n, 10),
                    a =
                        -1 != o.indexOf("%")
                            ? (parseFloat(o) / 100) * r.height
                            : parseInt(o, 10);
                (s = isNaN(s) ? 0 : s),
                    (a = isNaN(a) ? 0 : a),
                    (s -= e ? r.paddingLeft : r.paddingRight),
                    (a -= i ? r.paddingTop : r.paddingBottom),
                    (this.position.x = s),
                    (this.position.y = a);
            }),
            (c.layoutPosition = function () {
                var t = this.layout.size,
                    e = {},
                    i = this.layout._getOption("originLeft"),
                    n = this.layout._getOption("originTop"),
                    o = i ? "paddingLeft" : "paddingRight",
                    r = i ? "left" : "right",
                    s = i ? "right" : "left",
                    a = this.position.x + t[o];
                (e[r] = this.getXValue(a)), (e[s] = "");
                var h = n ? "paddingTop" : "paddingBottom",
                    u = n ? "top" : "bottom",
                    d = n ? "bottom" : "top",
                    c = this.position.y + t[h];
                (e[u] = this.getYValue(c)),
                    (e[d] = ""),
                    this.css(e),
                    this.emitEvent("layout", [this]);
            }),
            (c.getXValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && !e
                    ? (t / this.layout.size.width) * 100 + "%"
                    : t + "px";
            }),
            (c.getYValue = function (t) {
                var e = this.layout._getOption("horizontal");
                return this.layout.options.percentPosition && e
                    ? (t / this.layout.size.height) * 100 + "%"
                    : t + "px";
            }),
            (c._transitionTo = function (t, e) {
                this.getPosition();
                var i = this.position.x,
                    n = this.position.y,
                    o = parseInt(t, 10),
                    r = parseInt(e, 10),
                    s = o === this.position.x && r === this.position.y;
                if ((this.setPosition(t, e), s && !this.isTransitioning))
                    return void this.layoutPosition();
                var a = t - i,
                    h = e - n,
                    u = {};
                (u.transform = this.getTranslate(a, h)),
                    this.transition({
                        to: u,
                        onTransitionEnd: { transform: this.layoutPosition },
                        isCleaning: !0,
                    });
            }),
            (c.getTranslate = function (t, e) {
                var i = this.layout._getOption("originLeft"),
                    n = this.layout._getOption("originTop");
                return (
                    (t = i ? t : -t),
                    (e = n ? e : -e),
                    "translate3d(" + t + "px, " + e + "px, 0)"
                );
            }),
            (c.goTo = function (t, e) {
                this.setPosition(t, e), this.layoutPosition();
            }),
            (c.moveTo = c._transitionTo),
            (c.setPosition = function (t, e) {
                (this.position.x = parseInt(t, 10)),
                    (this.position.y = parseInt(e, 10));
            }),
            (c._nonTransition = function (t) {
                this.css(t.to), t.isCleaning && this._removeStyles(t.to);
                for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
            }),
            (c._transition = function (t) {
                if (!parseFloat(this.layout.options.transitionDuration))
                    return void this._nonTransition(t);
                var e = this._transn;
                for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to)
                    (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    var n = this.element.offsetHeight;
                    n = null;
                }
                this.enableTransition(t.to),
                    this.css(t.to),
                    (this.isTransitioning = !0);
            });
        var l = "opacity," + r(d.transform || "transform");
        (c.enableTransition = function () {
            this.isTransitioning ||
                (this.css({
                    transitionProperty: l,
                    transitionDuration: this.layout.options.transitionDuration,
                }),
                    this.element.addEventListener(u, this, !1));
        }),
            (c.transition = o.prototype[a ? "_transition" : "_nonTransition"]),
            (c.onwebkitTransitionEnd = function (t) {
                this.ontransitionend(t);
            }),
            (c.onotransitionend = function (t) {
                this.ontransitionend(t);
            });
        var f = { "-webkit-transform": "transform" };
        (c.ontransitionend = function (t) {
            if (t.target === this.element) {
                var e = this._transn,
                    i = f[t.propertyName] || t.propertyName;
                if (
                    (delete e.ingProperties[i],
                        n(e.ingProperties) && this.disableTransition(),
                        i in e.clean &&
                        ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
                        i in e.onEnd)
                ) {
                    var o = e.onEnd[i];
                    o.call(this), delete e.onEnd[i];
                }
                this.emitEvent("transitionEnd", [this]);
            }
        }),
            (c.disableTransition = function () {
                this.removeTransitionStyles(),
                    this.element.removeEventListener(u, this, !1),
                    (this.isTransitioning = !1);
            }),
            (c._removeStyles = function (t) {
                var e = {};
                for (var i in t) e[i] = "";
                this.css(e);
            });
        var m = { transitionProperty: "", transitionDuration: "" };
        return (
            (c.removeTransitionStyles = function () {
                this.css(m);
            }),
            (c.removeElem = function () {
                this.element.parentNode.removeChild(this.element),
                    this.css({ display: "" }),
                    this.emitEvent("remove", [this]);
            }),
            (c.remove = function () {
                return a && parseFloat(this.layout.options.transitionDuration)
                    ? (this.once("transitionEnd", function () {
                        this.removeElem();
                    }),
                        void this.hide())
                    : void this.removeElem();
            }),
            (c.reveal = function () {
                delete this.isHidden, this.css({ display: "" });
                var t = this.layout.options,
                    e = {},
                    i = this.getHideRevealTransitionEndProperty("visibleStyle");
                (e[i] = this.onRevealTransitionEnd),
                    this.transition({
                        from: t.hiddenStyle,
                        to: t.visibleStyle,
                        isCleaning: !0,
                        onTransitionEnd: e,
                    });
            }),
            (c.onRevealTransitionEnd = function () {
                this.isHidden || this.emitEvent("reveal");
            }),
            (c.getHideRevealTransitionEndProperty = function (t) {
                var e = this.layout.options[t];
                if (e.opacity) return "opacity";
                for (var i in e) return i;
            }),
            (c.hide = function () {
                (this.isHidden = !0), this.css({ display: "" });
                var t = this.layout.options,
                    e = {},
                    i = this.getHideRevealTransitionEndProperty("hiddenStyle");
                (e[i] = this.onHideTransitionEnd),
                    this.transition({
                        from: t.visibleStyle,
                        to: t.hiddenStyle,
                        isCleaning: !0,
                        onTransitionEnd: e,
                    });
            }),
            (c.onHideTransitionEnd = function () {
                this.isHidden &&
                    (this.css({ display: "none" }), this.emitEvent("hide"));
            }),
            (c.destroy = function () {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: "",
                });
            }),
            o
        );
    }),
    (function (t, e) {
        "use strict";
        "function" == typeof define && define.amd
            ? define(
                "outlayer/outlayer",
                [
                    "ev-emitter/ev-emitter",
                    "get-size/get-size",
                    "fizzy-ui-utils/utils",
                    "./item",
                ],
                function (i, n, o, r) {
                    return e(t, i, n, o, r);
                }
            )
            : "object" == typeof module && module.exports
                ? (module.exports = e(
                    t,
                    require("ev-emitter"),
                    require("get-size"),
                    require("fizzy-ui-utils"),
                    require("./item")
                ))
                : (t.Outlayer = e(
                    t,
                    t.EvEmitter,
                    t.getSize,
                    t.fizzyUIUtils,
                    t.Outlayer.Item
                ));
    })(window, function (t, e, i, n, o) {
        "use strict";
        function r(t, e) {
            var i = n.getQueryElement(t);
            if (!i)
                return void (
                    a &&
                    a.error(
                        "Bad element for " + this.constructor.namespace + ": " + (i || t)
                    )
                );
            (this.element = i),
                h && (this.$element = h(this.element)),
                (this.options = n.extend({}, this.constructor.defaults)),
                this.option(e);
            var o = ++d;
            (this.element.outlayerGUID = o), (c[o] = this), this._create();
            var r = this._getOption("initLayout");
            r && this.layout();
        }
        function s(t) {
            function e() {
                t.apply(this, arguments);
            }
            return (
                (e.prototype = Object.create(t.prototype)),
                (e.prototype.constructor = e),
                e
            );
        }
        var a = t.console,
            h = t.jQuery,
            u = function () { },
            d = 0,
            c = {};
        (r.namespace = "outlayer"),
            (r.Item = o),
            (r.defaults = {
                containerStyle: { position: "relative" },
                initLayout: !0,
                originLeft: !0,
                originTop: !0,
                resize: !0,
                resizeContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
                visibleStyle: { opacity: 1, transform: "scale(1)" },
            });
        var l = r.prototype;
        return (
            n.extend(l, e.prototype),
            (l.option = function (t) {
                n.extend(this.options, t);
            }),
            (l._getOption = function (t) {
                var e = this.constructor.compatOptions[t];
                return e && void 0 !== this.options[e]
                    ? this.options[e]
                    : this.options[t];
            }),
            (r.compatOptions = {
                initLayout: "isInitLayout",
                horizontal: "isHorizontal",
                layoutInstant: "isLayoutInstant",
                originLeft: "isOriginLeft",
                originTop: "isOriginTop",
                resize: "isResizeBound",
                resizeContainer: "isResizingContainer",
            }),
            (l._create = function () {
                this.reloadItems(),
                    (this.stamps = []),
                    this.stamp(this.options.stamp),
                    n.extend(this.element.style, this.options.containerStyle);
                var t = this._getOption("resize");
                t && this.bindResize();
            }),
            (l.reloadItems = function () {
                this.items = this._itemize(this.element.children);
            }),
            (l._itemize = function (t) {
                for (
                    var e = this._filterFindItemElements(t),
                    i = this.constructor.Item,
                    n = [],
                    o = 0;
                    o < e.length;
                    o++
                ) {
                    var r = e[o],
                        s = new i(r, this);
                    n.push(s);
                }
                return n;
            }),
            (l._filterFindItemElements = function (t) {
                return n.filterFindElements(t, this.options.itemSelector);
            }),
            (l.getItemElements = function () {
                return this.items.map(function (t) {
                    return t.element;
                });
            }),
            (l.layout = function () {
                this._resetLayout(), this._manageStamps();
                var t = this._getOption("layoutInstant"),
                    e = void 0 !== t ? t : !this._isLayoutInited;
                this.layoutItems(this.items, e), (this._isLayoutInited = !0);
            }),
            (l._init = l.layout),
            (l._resetLayout = function () {
                this.getSize();
            }),
            (l.getSize = function () {
                this.size = i(this.element);
            }),
            (l._getMeasurement = function (t, e) {
                var n,
                    o = this.options[t];
                o
                    ? ("string" == typeof o
                        ? (n = this.element.querySelector(o))
                        : o instanceof HTMLElement && (n = o),
                        (this[t] = n ? i(n)[e] : o))
                    : (this[t] = 0);
            }),
            (l.layoutItems = function (t, e) {
                (t = this._getItemsForLayout(t)),
                    this._layoutItems(t, e),
                    this._postLayout();
            }),
            (l._getItemsForLayout = function (t) {
                return t.filter(function (t) {
                    return !t.isIgnored;
                });
            }),
            (l._layoutItems = function (t, e) {
                if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
                    var i = [];
                    t.forEach(function (t) {
                        var n = this._getItemLayoutPosition(t);
                        (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
                    }, this),
                        this._processLayoutQueue(i);
                }
            }),
            (l._getItemLayoutPosition = function () {
                return { x: 0, y: 0 };
            }),
            (l._processLayoutQueue = function (t) {
                t.forEach(function (t) {
                    this._positionItem(t.item, t.x, t.y, t.isInstant);
                }, this);
            }),
            (l._positionItem = function (t, e, i, n) {
                n ? t.goTo(e, i) : t.moveTo(e, i);
            }),
            (l._postLayout = function () {
                this.resizeContainer();
            }),
            (l.resizeContainer = function () {
                var t = this._getOption("resizeContainer");
                if (t) {
                    var e = this._getContainerSize();
                    e &&
                        (this._setContainerMeasure(e.width, !0),
                            this._setContainerMeasure(e.height, !1));
                }
            }),
            (l._getContainerSize = u),
            (l._setContainerMeasure = function (t, e) {
                if (void 0 !== t) {
                    var i = this.size;
                    i.isBorderBox &&
                        (t += e
                            ? i.paddingLeft +
                            i.paddingRight +
                            i.borderLeftWidth +
                            i.borderRightWidth
                            : i.paddingBottom +
                            i.paddingTop +
                            i.borderTopWidth +
                            i.borderBottomWidth),
                        (t = Math.max(t, 0)),
                        (this.element.style[e ? "width" : "height"] = t + "px");
                }
            }),
            (l._emitCompleteOnItems = function (t, e) {
                function i() {
                    o.dispatchEvent(t + "Complete", null, [e]);
                }
                function n() {
                    s++, s == r && i();
                }
                var o = this,
                    r = e.length;
                if (!e || !r) return void i();
                var s = 0;
                e.forEach(function (e) {
                    e.once(t, n);
                });
            }),
            (l.dispatchEvent = function (t, e, i) {
                var n = e ? [e].concat(i) : i;
                if ((this.emitEvent(t, n), h))
                    if (((this.$element = this.$element || h(this.element)), e)) {
                        var o = h.Event(e);
                        (o.type = t), this.$element.trigger(o, i);
                    } else this.$element.trigger(t, i);
            }),
            (l.ignore = function (t) {
                var e = this.getItem(t);
                e && (e.isIgnored = !0);
            }),
            (l.unignore = function (t) {
                var e = this.getItem(t);
                e && delete e.isIgnored;
            }),
            (l.stamp = function (t) {
                (t = this._find(t)),
                    t &&
                    ((this.stamps = this.stamps.concat(t)),
                        t.forEach(this.ignore, this));
            }),
            (l.unstamp = function (t) {
                (t = this._find(t)),
                    t &&
                    t.forEach(function (t) {
                        n.removeFrom(this.stamps, t), this.unignore(t);
                    }, this);
            }),
            (l._find = function (t) {
                return t
                    ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
                        (t = n.makeArray(t)))
                    : void 0;
            }),
            (l._manageStamps = function () {
                this.stamps &&
                    this.stamps.length &&
                    (this._getBoundingRect(),
                        this.stamps.forEach(this._manageStamp, this));
            }),
            (l._getBoundingRect = function () {
                var t = this.element.getBoundingClientRect(),
                    e = this.size;
                this._boundingRect = {
                    left: t.left + e.paddingLeft + e.borderLeftWidth,
                    top: t.top + e.paddingTop + e.borderTopWidth,
                    right: t.right - (e.paddingRight + e.borderRightWidth),
                    bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
                };
            }),
            (l._manageStamp = u),
            (l._getElementOffset = function (t) {
                var e = t.getBoundingClientRect(),
                    n = this._boundingRect,
                    o = i(t),
                    r = {
                        left: e.left - n.left - o.marginLeft,
                        top: e.top - n.top - o.marginTop,
                        right: n.right - e.right - o.marginRight,
                        bottom: n.bottom - e.bottom - o.marginBottom,
                    };
                return r;
            }),
            (l.handleEvent = n.handleEvent),
            (l.bindResize = function () {
                t.addEventListener("resize", this), (this.isResizeBound = !0);
            }),
            (l.unbindResize = function () {
                t.removeEventListener("resize", this), (this.isResizeBound = !1);
            }),
            (l.onresize = function () {
                this.resize();
            }),
            n.debounceMethod(r, "onresize", 100),
            (l.resize = function () {
                this.isResizeBound && this.needsResizeLayout() && this.layout();
            }),
            (l.needsResizeLayout = function () {
                var t = i(this.element),
                    e = this.size && t;
                return e && t.innerWidth !== this.size.innerWidth;
            }),
            (l.addItems = function (t) {
                var e = this._itemize(t);
                return e.length && (this.items = this.items.concat(e)), e;
            }),
            (l.appended = function (t) {
                var e = this.addItems(t);
                e.length && (this.layoutItems(e, !0), this.reveal(e));
            }),
            (l.prepended = function (t) {
                var e = this._itemize(t);
                if (e.length) {
                    var i = this.items.slice(0);
                    (this.items = e.concat(i)),
                        this._resetLayout(),
                        this._manageStamps(),
                        this.layoutItems(e, !0),
                        this.reveal(e),
                        this.layoutItems(i);
                }
            }),
            (l.reveal = function (t) {
                this._emitCompleteOnItems("reveal", t),
                    t &&
                    t.length &&
                    t.forEach(function (t) {
                        t.reveal();
                    });
            }),
            (l.hide = function (t) {
                this._emitCompleteOnItems("hide", t),
                    t &&
                    t.length &&
                    t.forEach(function (t) {
                        t.hide();
                    });
            }),
            (l.revealItemElements = function (t) {
                var e = this.getItems(t);
                this.reveal(e);
            }),
            (l.hideItemElements = function (t) {
                var e = this.getItems(t);
                this.hide(e);
            }),
            (l.getItem = function (t) {
                for (var e = 0; e < this.items.length; e++) {
                    var i = this.items[e];
                    if (i.element == t) return i;
                }
            }),
            (l.getItems = function (t) {
                t = n.makeArray(t);
                var e = [];
                return (
                    t.forEach(function (t) {
                        var i = this.getItem(t);
                        i && e.push(i);
                    }, this),
                    e
                );
            }),
            (l.remove = function (t) {
                var e = this.getItems(t);
                this._emitCompleteOnItems("remove", e),
                    e &&
                    e.length &&
                    e.forEach(function (t) {
                        t.remove(), n.removeFrom(this.items, t);
                    }, this);
            }),
            (l.destroy = function () {
                var t = this.element.style;
                (t.height = ""),
                    (t.position = ""),
                    (t.width = ""),
                    this.items.forEach(function (t) {
                        t.destroy();
                    }),
                    this.unbindResize();
                var e = this.element.outlayerGUID;
                delete c[e],
                    delete this.element.outlayerGUID,
                    h && h.removeData(this.element, this.constructor.namespace);
            }),
            (r.data = function (t) {
                t = n.getQueryElement(t);
                var e = t && t.outlayerGUID;
                return e && c[e];
            }),
            (r.create = function (t, e) {
                var i = s(r);
                return (
                    (i.defaults = n.extend({}, r.defaults)),
                    n.extend(i.defaults, e),
                    (i.compatOptions = n.extend({}, r.compatOptions)),
                    (i.namespace = t),
                    (i.data = r.data),
                    (i.Item = s(o)),
                    n.htmlInit(i, t),
                    h && h.bridget && h.bridget(t, i),
                    i
                );
            }),
            (r.Item = o),
            r
        );
    }),
    (function (t, e) {
        "function" == typeof define && define.amd
            ? define(["outlayer/outlayer", "get-size/get-size"], e)
            : "object" == typeof module && module.exports
                ? (module.exports = e(require("outlayer"), require("get-size")))
                : (t.Masonry = e(t.Outlayer, t.getSize));
    })(window, function (t, e) {
        var i = t.create("masonry");
        return (
            (i.compatOptions.fitWidth = "isFitWidth"),
            (i.prototype._resetLayout = function () {
                this.getSize(),
                    this._getMeasurement("columnWidth", "outerWidth"),
                    this._getMeasurement("gutter", "outerWidth"),
                    this.measureColumns(),
                    (this.colYs = []);
                for (var t = 0; t < this.cols; t++) this.colYs.push(0);
                this.maxY = 0;
            }),
            (i.prototype.measureColumns = function () {
                if ((this.getContainerWidth(), !this.columnWidth)) {
                    var t = this.items[0],
                        i = t && t.element;
                    this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
                }
                var n = (this.columnWidth += this.gutter),
                    o = this.containerWidth + this.gutter,
                    r = o / n,
                    s = n - (o % n),
                    a = s && 1 > s ? "round" : "floor";
                (r = Math[a](r)), (this.cols = Math.max(r, 1));
            }),
            (i.prototype.getContainerWidth = function () {
                var t = this._getOption("fitWidth"),
                    i = t ? this.element.parentNode : this.element,
                    n = e(i);
                this.containerWidth = n && n.innerWidth;
            }),
            (i.prototype._getItemLayoutPosition = function (t) {
                t.getSize();
                var e = t.size.outerWidth % this.columnWidth,
                    i = e && 1 > e ? "round" : "ceil",
                    n = Math[i](t.size.outerWidth / this.columnWidth);
                n = Math.min(n, this.cols);
                for (
                    var o = this._getColGroup(n),
                    r = Math.min.apply(Math, o),
                    s = o.indexOf(r),
                    a = { x: this.columnWidth * s, y: r },
                    h = r + t.size.outerHeight,
                    u = this.cols + 1 - o.length,
                    d = 0;
                    u > d;
                    d++
                )
                    this.colYs[s + d] = h;
                return a;
            }),
            (i.prototype._getColGroup = function (t) {
                if (2 > t) return this.colYs;
                for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
                    var o = this.colYs.slice(n, n + t);
                    e[n] = Math.max.apply(Math, o);
                }
                return e;
            }),
            (i.prototype._manageStamp = function (t) {
                var i = e(t),
                    n = this._getElementOffset(t),
                    o = this._getOption("originLeft"),
                    r = o ? n.left : n.right,
                    s = r + i.outerWidth,
                    a = Math.floor(r / this.columnWidth);
                a = Math.max(0, a);
                var h = Math.floor(s / this.columnWidth);
                (h -= s % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
                for (
                    var u = this._getOption("originTop"),
                    d = (u ? n.top : n.bottom) + i.outerHeight,
                    c = a;
                    h >= c;
                    c++
                )
                    this.colYs[c] = Math.max(d, this.colYs[c]);
            }),
            (i.prototype._getContainerSize = function () {
                this.maxY = Math.max.apply(Math, this.colYs);
                var t = { height: this.maxY };
                return (
                    this._getOption("fitWidth") &&
                    (t.width = this._getContainerFitWidth()),
                    t
                );
            }),
            (i.prototype._getContainerFitWidth = function () {
                for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
                return (this.cols - t) * this.columnWidth - this.gutter;
            }),
            (i.prototype.needsResizeLayout = function () {
                var t = this.containerWidth;
                return this.getContainerWidth(), t != this.containerWidth;
            }),
            i
        );
    });
jQuery.fn.center = function () {
    this.css("left", jQuery(window).width() / 2 - this.outerWidth() / 2);
    return this;
};
jQuery.fn.setNav = function () {
    var calScreenWidth = jQuery(window).width();
    var menuLayout = jQuery("#pp_menu_layout").val();
    if (calScreenWidth >= 960) {
        jQuery("#main_menu li ul").css({ display: "none", opacity: 1 });
        if (menuLayout != "leftmenu") {
            jQuery("#menu_wrapper div .nav li.megamenu > ul > li").each(function () {
                jQuery(this).css("height", jQuery(this).parent("ul").height() + "px");
            });
        }
        jQuery("#main_menu li").each(function () {
            var jQuerysublist = jQuery(this).find("ul:first");
            jQuery(this).hover(
                function () {
                    position = jQuery(this).position();
                    if (jQuery(this).parents().attr("class") == "sub-menu") {
                        jQuerysublist.stop().fadeIn(500);
                    } else {
                        jQuerysublist.stop().css({ overflow: "visible" }).fadeIn(100);
                    }
                },
                function () {
                    jQuerysublist.stop().css({ height: "auto" }).fadeOut(100);
                }
            );
        });
        jQuery("#menu_wrapper .nav ul li ul").css({ display: "none", opacity: 1 });
        jQuery("#menu_wrapper .nav ul li").each(function () {
            var jQuerysublist = jQuery(this).find("ul:first");
            jQuery(this).hover(
                function () {
                    jQuerysublist.stop().fadeIn(100);
                },
                function () {
                    jQuerysublist.stop().fadeOut(100);
                }
            );
        });
    }
    jQuery("body").on("click", ".mobile_main_nav > li a", function (event) {
        var jQuerysublist = jQuery(this).parent("li").find("ul.sub-menu:first");
        var menuContainerClass = jQuery(this)
            .parent("li")
            .parent("#mobile_main_menu.mobile_main_nav")
            .parent("div");
        if (jQuerysublist.length > 0) {
            event.preventDefault();
        }
        var menuLevel = "top_level";
        var parentMenu = "";
        var menuClickedId = jQuery(this).attr("id");
        if (
            jQuery(this).parent("li").parent("ul").attr("id") == "mobile_main_menu"
        ) {
            menuLevel = "parent_level";
        } else {
            parentMenu = jQuery(this).parent("li").attr("id");
        }
        if (jQuerysublist.length > 0) {
            jQuery("#mobile_main_menu.mobile_main_nav").addClass("mainnav_out");
            jQuery(".mobile_menu_wrapper div #sub_menu").removeClass("subnav_in");
            jQuery(".mobile_menu_wrapper div #sub_menu").addClass("mainnav_out");
            if (jQuery("#pp_menu_layout").val() == "hammenufull") {
                jQuery(".mobile_menu_wrapper .logo_container").fadeOut("slow");
                jQuery(".mobile_menu_wrapper .social_wrapper").fadeOut("slow");
            }
            setTimeout(function () {
                jQuery("#mobile_main_menu.mobile_main_nav").css("display", "none");
                jQuery(".mobile_menu_wrapper div #sub_menu").remove();
                var subMenuHTML =
                    '<li><a href="#" id="menu_back" class="' +
                    menuLevel +
                    '" data-parent="' +
                    parentMenu +
                    '">' +
                    jQuery("#pp_back").val() +
                    "</a></li>";
                subMenuHTML += jQuerysublist.html();
                menuContainerClass.append(
                    '<ul id="sub_menu" class="nav ' + menuLevel + '"></ul>'
                );
                menuContainerClass.find("#sub_menu").html(subMenuHTML);
                menuContainerClass.find("#sub_menu").addClass("subnav_in");
            }, 200);
        }
    });
    jQuery("body").on("click", "#menu_back.parent_level", function () {
        jQuery(".mobile_menu_wrapper div #sub_menu").removeClass("subnav_in");
        jQuery(".mobile_menu_wrapper div #sub_menu").addClass("subnav_out");
        jQuery("#mobile_main_menu.mobile_main_nav").removeClass("mainnav_out");
        if (jQuery("#pp_menu_layout").val() == "hammenufull") {
            jQuery(".mobile_menu_wrapper .logo_container").fadeIn("slow");
            jQuery(".mobile_menu_wrapper .social_wrapper").fadeIn("slow");
        }
        setTimeout(function () {
            jQuery(".mobile_menu_wrapper div #sub_menu").remove();
            jQuery("#mobile_main_menu.mobile_main_nav").css("display", "block");
            jQuery("#mobile_main_menu.mobile_main_nav").addClass("mainnav_in");
        }, 200);
    });
    jQuery("body").on("click", "#menu_back.top_level", function () {
        event.preventDefault();
        jQuery(".mobile_menu_wrapper div #sub_menu").addClass("subnav_out");
        var parentMenuId = jQuery(this).data("parent");
        setTimeout(function () {
            jQuery(".mobile_menu_wrapper div #sub_menu").remove();
            var menuLevel = "top_level";
            var parentMenu = "";
            if (
                jQuery("#mobile_main_menu.mobile_main_nav li#" + parentMenuId)
                    .parent("ul.sub-menu:first")
                    .parent("li")
                    .parent("ul#main_menu").length == 1
            ) {
                menuLevel = "parent_level";
            } else {
                parentMenu = jQuery(
                    "#mobile_main_menu.mobile_main_nav li#" + parentMenuId
                )
                    .parent("ul.sub-menu:first")
                    .parent("li")
                    .attr("id");
            }
            var subMenuHTML =
                '<li><a href="#" id="menu_back" class="' +
                menuLevel +
                '" data-parent="' +
                parentMenu +
                '">' +
                jQuery("#pp_back").val() +
                "</a></li>";
            subMenuHTML += jQuery(
                "#mobile_main_menu.mobile_main_nav li#" + parentMenuId
            )
                .parent("ul.sub-menu:first")
                .html();
            jQuery(".mobile_menu_wrapper div").append(
                '<ul id="sub_menu" class="nav ' + menuLevel + '"></ul>'
            );
            jQuery(".mobile_menu_wrapper div #sub_menu").html(subMenuHTML);
            jQuery(".mobile_menu_wrapper div #sub_menu").addClass("mainnav_in");
        }, 200);
    });
};
jQuery.fn.setiLightbox = function () {
    var iLightboxapi = jQuery(
        "a.fancy-gallery, .pp_gallery a, .img_frame, .fancy_video, .lightbox_vimeo, .lightbox_youtube, .woocommerce-product-gallery__image a"
    ).iLightBox({
        skin: jQuery("#tg_lightbox_skin").val(),
        path: jQuery("#tg_lightbox_thumbnails").val(),
        type: "inline, video, image",
        maxScale: 1,
        controls: { slideshow: true, arrows: true },
        overlay: { opacity: jQuery("#tg_lightbox_opacity").val() },
    });
    iLightboxapi.refresh();
};
function adjustIframes() {
    jQuery("iframe").each(function () {
        var $this = jQuery(this),
            proportion = $this.data("proportion"),
            w = $this.attr("width"),
            actual_w = $this.width();
        if (!proportion) {
            proportion = $this.attr("height") / w;
            $this.data("proportion", proportion);
        }
        if (actual_w != w) {
            $this.css("height", Math.round(actual_w * proportion) + "px !important");
        }
    });
}
function is_touch_device() {
    return "ontouchstart" in window || "onmsgesturechange" in window;
}
if (jQuery("#pp_page_title_img_blur").val() != "") {
    (function () {
        jQuery(window).scroll(function () {
            var oVal;
            oVal = jQuery(window).scrollTop() / 400;
            if (oVal > 1) {
                oVal = 1;
            }
            return jQuery("#bg_blurred").css("opacity", oVal);
        });
    }.call(this));
}
if (jQuery("#pp_page_title_img_blur").val() != "") {
    (function () {
        jQuery(window).scroll(function () {
            var oVal;
            oVal = 1 - jQuery(window).scrollTop() / 400;
            if (oVal < 0) {
                oVal = 0;
            }
            return jQuery(".background_center_title_wrapper").css("opacity", oVal);
        });
    }.call(this));
}
jQuery(document).ready(function () {
    "use strict";
    jQuery(document).setNav();
    jQuery(window).resize(function () {
        jQuery(document).setNav();
    });
    jQuery(document).setiLightbox();
    jQuery("#menu_expand_wrapper a").on("click", function () {
        jQuery("#menu_wrapper").fadeIn();
        jQuery("#custom_logo").animate({ left: "15px", opacity: 1 }, 400);
        jQuery("#menu_close").animate({ left: "-10px", opacity: 1 }, 400);
        jQuery(this).animate({ left: "-60px", opacity: 0 }, 400);
        jQuery("#menu_border_wrapper select")
            .animate({ left: "0", opacity: 1 }, 400)
            .fadeIn();
    });
    jQuery("#menu_close").on("click", function () {
        jQuery("#custom_logo").animate({ left: "-200px", opacity: 0 }, 400);
        jQuery(this).stop().animate({ left: "-200px", opacity: 0 }, 400);
        jQuery("#menu_expand_wrapper a").animate({ left: "20px", opacity: 1 }, 400);
        jQuery("#menu_border_wrapper select")
            .animate({ left: "-200px", opacity: 0 }, 400)
            .fadeOut();
        jQuery("#menu_wrapper").fadeOut();
    });
    var $window = jQuery(window);
    var dropdowns = jQuery(".portfolio_filter_dropdown");
    dropdowns.find(".portfolio_filter_dropdown_title").on("click", function () {
        dropdowns
            .find(".portfolio_filter_dropdown_select ul.portfolio_select")
            .hide();
        jQuery(this).next().children().toggle();
    });
    dropdowns
        .find(".portfolio_filter_dropdown_select ul.portfolio_select li a")
        .on("click", function () {
            var leSpan = jQuery(this)
                .parents(".portfolio_filter_dropdown")
                .find(".portfolio_filter_dropdown_title a span");
            jQuery(this)
                .parents(".portfolio_filter_dropdown")
                .find(".portfolio_filter_dropdown_select a")
                .each(function () {
                    jQuery(this).removeClass("selected");
                });
            leSpan.html(jQuery(this).html());
            if (jQuery(this).hasClass("default")) {
                leSpan.removeClass("selected");
            } else {
                leSpan.addClass("selected");
                jQuery(this).addClass("selected");
            }
            jQuery(this).parents("ul").hide();
        });
    jQuery(document).bind("click", function (e) {
        if (!jQuery(e.target).parents().hasClass("portfolio_filter_dropdown"))
            jQuery(
                ".portfolio_filter_dropdown .portfolio_filter_dropdown_select ul.portfolio_select"
            ).hide();
    });
    function reLayout() {
        var jQuerycontainer = jQuery("#photo_wall_wrapper, .photo_wall_wrapper");
        var windowWidth = parseInt(jQuerycontainer.width());
        var jQueryportfolioColumn = 4;
        var columnValue;
        var masonryOpts;
        if (windowWidth < 480) {
            jQueryportfolioColumn = 1;
        } else if (windowWidth >= 480 && windowWidth < 960) {
            jQueryportfolioColumn = 2;
        } else if (windowWidth >= 960 && windowWidth < 1400) {
            jQueryportfolioColumn = 4;
        } else if (windowWidth >= 1400 && windowWidth < 2100) {
            jQueryportfolioColumn = 5;
        } else if (windowWidth >= 2100) {
            jQueryportfolioColumn = 6;
        }
        if (windowWidth > 480) {
            columnValue = windowWidth / jQueryportfolioColumn;
        } else if (windowWidth <= 480) {
            columnValue = 480;
        }
        masonryOpts = { columnWidth: columnValue };
        $container.addClass("visible");
        $container
            .isotope({
                resizable: false,
                itemSelector: ".wall_entry",
                masonry: masonryOpts,
            })
            .isotope();
    }
    var $container = jQuery("#photo_wall_wrapper, .photo_wall_wrapper");
    $container.imagesLoaded(function () {
        reLayout();
        $window.smartresize(reLayout);
        $container
            .children(".wall_entry")
            .children(".gallery_type")
            .each(function () {
                jQuery(this).addClass("fade-in");
            });
        $container.children(".wall_entry").mouseenter(function () {
            jQuery(this).addClass("hover");
        });
        $container.children(".wall_entry").mouseleave(function () {
            $container.children(".wall_entry").removeClass("hover");
        });
    });
    jQuery(window).resize(function () {
        if (jQuery(this).width() < 768) {
            jQuery("#menu_expand_wrapper a").trigger("click");
        }
    });
    var isDisableRightClick = jQuery("#pp_enable_right_click").val();
    if (isDisableRightClick != "") {
        jQuery(this).bind("contextmenu", function (e) {
            e.preventDefault();
        });
    }
    function rePortfolioLayout() {
        var jQuerycontainer = jQuery(
            "#portfolio_filter_wrapper, .portfolio_filter_wrapper"
        );
        var windowWidth = jQuerycontainer.width();
        if (
            jQuery("#pp_menu_layout").val() == "leftmenu" &&
            jQuery(window).width() > 768
        ) {
            windowWidth = parseInt(windowWidth + 265);
        }
        var jQueryportfolioColumn = jQuerycontainer.data("columns");
        var columnValue;
        var masonryOpts;
        if (jQuery("#pp_menu_layout").val() == "leftmenu") {
            var windowWidth = jQuerycontainer.width();
        }
        if (windowWidth > 959) {
            columnValue = parseInt(windowWidth / jQueryportfolioColumn);
        } else if (windowWidth < 959 && windowWidth > 480) {
            columnValue = parseInt(windowWidth / jQueryportfolioColumn);
        } else if (windowWidth <= 480) {
            columnValue = 480;
        }
        masonryOpts = { columnWidth: columnValue };
        jQuerycontainer
            .isotope({
                resizable: false,
                itemSelector: ".element",
                masonry: masonryOpts,
            })
            .isotope();
    }
    var $window = jQuery(window);
    var jQuerycontainer = jQuery(
        "#portfolio_filter_wrapper, .portfolio_filter_wrapper"
    );
    jQuerycontainer.imagesLoaded(function () {
        rePortfolioLayout();
        $window.smartresize(rePortfolioLayout);
        jQuerycontainer
            .children(".element")
            .children(".gallery_type")
            .each(function () {
                jQuery(this).addClass("fadeIn");
            });
        jQuerycontainer
            .children(".element")
            .children(".portfolio_type")
            .each(function () {
                jQuery(this).addClass("fadeIn");
            });
        jQuerycontainer.children(".element").mouseenter(function () {
            jQuery(this).addClass("hover");
        });
        jQuerycontainer.children(".element").mouseleave(function () {
            jQuerycontainer.children(".element").removeClass("hover");
        });
        jQuery(this).addClass("visible");
    });
    if (jQuery("#tg_portfolio_filterable_link").val() != 1) {
        jQuery("#portfolio_wall_filters li a").click(function () {
            var selector = jQuery(this).attr("data-filter");
            jQuerycontainer.isotope({ filter: selector });
            jQuery("#portfolio_wall_filters li a").removeClass("active");
            jQuery(this).addClass("active");
            return false;
        });
    }
    function reBlogLayout() {
        var windowWidth = jQuery(window).width();
        var jQueryblogcontainer = jQuery("#blog_grid_wrapper, .blog_grid_wrapper");
        var containerWidth = jQuery(
            "#blog_grid_wrapper, .blog_grid_wrapper"
        ).width();
        if (typeof jQueryblogcontainer.data("columns") != "undefined") {
            var $blogGridColumn = parseInt(jQueryblogcontainer.data("columns"));
        } else {
            var $blogGridColumn = 3;
        }
        var columnValue = 0;
        var masonryOpts;
        if (containerWidth >= 960) {
            columnValue = containerWidth / $blogGridColumn;
        } else if (containerWidth < 960 && containerWidth >= 660) {
            columnValue = containerWidth / 2;
        } else {
            columnValue = containerWidth / 1;
        }
        masonryOpts = { columnWidth: columnValue };
        jQueryblogcontainer
            .isotope({
                resizable: false,
                itemSelector: ".status-publish",
                masonry: masonryOpts,
            })
            .isotope();
    }
    var jQueryblogcontainer = jQuery("#blog_grid_wrapper, .blog_grid_wrapper");
    jQueryblogcontainer.imagesLoaded(function () {
        reBlogLayout();
        $window.smartresize(reBlogLayout);
    });
    jQuery(window).scroll(function () {
        var calScreenWidth = jQuery(window).width();
        if (jQuery(this).scrollTop() > 200) {
            jQuery("#toTop")
                .stop()
                .css({ opacity: 0.5, visibility: "visible" })
                .animate(
                    { visibility: "visible" },
                    { duration: 1000, easing: "easeOutExpo" }
                );
        } else if (jQuery(this).scrollTop() == 0) {
            jQuery("#toTop")
                .stop()
                .css({ opacity: 0, visibility: "hidden" })
                .animate(
                    { visibility: "hidden" },
                    { duration: 1500, easing: "easeOutExpo" }
                );
        }
    });
    jQuery("#toTop, .hr_totop").on("click", function () {
        jQuery("body,html").animate({ scrollTop: 0 }, 800);
    });
    var isDisableDragging = jQuery("#pp_enable_dragging").val();
    if (isDisableDragging != "") {
        jQuery("img").mousedown(function () {
            return false;
        });
    }
    var topBarHeight = jQuery(".header_style_wrapper").height();
    var logoHeight = jQuery("#custom_logo img").height();
    var logoTransHeight = jQuery("#custom_logo_transparent img").height();
    var logoMargin = parseInt(jQuery("#custom_logo").css("marginTop"));
    var logoTransMargin = parseInt(
        jQuery("#custom_logo_transparent").css("marginTop")
    );
    var menuPaddingTop = parseInt(
        jQuery("#menu_wrapper div .nav li > a").css("paddingTop")
    );
    var menuPaddingBottom = parseInt(
        jQuery("#menu_wrapper div .nav li > a").css("paddingBottom")
    );
    var SearchPaddingTop = parseInt(
        jQuery(".top_bar #searchform button").css("paddingTop")
    );
    var menuLayout = jQuery("#pp_menu_layout").val();
    if (menuLayout != "leftmenu" || jQuery(window).width() <= 768) {
        jQuery("#wrapper").css("paddingTop", parseInt(topBarHeight) + "px");
        jQuery("#page_caption .bg_frame_split").css(
            "bottom",
            parseInt(jQuery(".header_style_wrapper").height() + 20) + "px"
        );
    }
    jQuery(window).resize(function () {
        if (jQuery(this).width() > 768) {
            if (menuLayout != "leftmenu") {
                var resizedTopBarHeight = jQuery(".header_style_wrapper").data(
                    "height"
                );
                jQuery("#wrapper").css("paddingTop", resizedTopBarHeight + "px");
                jQuery("#page_content_wrapper.split, .page_content_wrapper.split").css(
                    "top",
                    resizedTopBarHeight + "px"
                );
                jQuery(".logo_wrapper").css("marginTop", "");
                jQuery(".top_bar #searchform button").css("paddingTop", "");
            } else {
                jQuery("#wrapper").css("paddingTop", 0);
            }
        } else {
            jQuery("#wrapper").css("paddingTop", parseInt(topBarHeight) + "px");
        }
        jQuery("#page_caption.split").css("height", jQuery(window).height() + "px");
    });
    if (menuLayout != "leftmenu" || jQuery(window).width() <= 960) {
        jQuery("#page_content_wrapper.split, .page_content_wrapper.split").css(
            "top",
            parseInt(
                topBarHeight + jQuery(".header_style_wrapper .above_top_bar").height()
            ) + "px"
        );
        jQuery("#page_content_wrapper.split, .page_content_wrapper.split").css(
            "paddingBottom",
            parseInt(
                topBarHeight + jQuery(".header_style_wrapper .above_top_bar").height()
            ) + "px"
        );
        jQuery("#page_caption.split").css(
            "top",
            parseInt(
                topBarHeight + jQuery(".header_style_wrapper .above_top_bar").height()
            ) + "px"
        );
        var initialTopBarHeight = jQuery(".header_style_wrapper").height();
        jQuery(".header_style_wrapper").data("height", initialTopBarHeight);
        jQuery(window).scroll(function () {
            if (
                jQuery("#pp_fixed_menu").val() == 1 &&
                jQuery("html").data("style") != "fullscreen"
            ) {
                if (jQuery(this).scrollTop() >= 200) {
                    jQuery(".header_style_wrapper .above_top_bar").hide();
                    jQuery(".extend_top_contact_info").hide();
                    jQuery(".header_style_wrapper").addClass("scroll");
                    jQuery(".top_bar").addClass("scroll");
                    jQuery(".top_bar").addClass(jQuery("#tg_fixed_menu_color").val());
                    if (jQuery(".top_bar").hasClass("hasbg")) {
                        jQuery(".top_bar").removeClass("hasbg");
                        jQuery(".top_bar").data("hasbg", 1);
                        jQuery(".top_bar #custom_logo").removeClass("hidden");
                        jQuery(".top_bar #custom_logo_transparent").addClass("hidden");
                    }
                    if (
                        jQuery("#tg_fixed_menu_color").val() == "dark" ||
                        jQuery("#tg_fixed_menu_color").val() == "black"
                    ) {
                        jQuery(".top_bar #custom_logo").addClass("hidden");
                        jQuery(".top_bar #custom_logo_transparent").removeClass("hidden");
                    }
                } else if (jQuery(this).scrollTop() < 200) {
                    jQuery(".header_style_wrapper .above_top_bar").show();
                    jQuery(".extend_top_contact_info").show();
                    jQuery("#custom_logo img").removeClass("zoom");
                    jQuery("#custom_logo img").css("maxHeight", "");
                    jQuery("#custom_logo_transparent img").removeClass("zoom");
                    if (jQuery(".top_bar").data("hasbg") == 1) {
                        jQuery(".top_bar").addClass("hasbg");
                        jQuery(".top_bar #custom_logo").addClass("hidden");
                        jQuery(".top_bar #custom_logo_transparent").removeClass("hidden");
                    }
                    if (
                        jQuery("#tg_fixed_menu_color").val() == "dark" ||
                        jQuery("#tg_fixed_menu_color").val() == "black"
                    ) {
                        if (jQuery(".top_bar").data("hasbg") == 1) {
                            jQuery(".top_bar #custom_logo").addClass("hidden");
                            jQuery(".top_bar #custom_logo_transparent").removeClass("hidden");
                        } else {
                            jQuery(".top_bar #custom_logo").removeClass("hidden");
                            jQuery(".top_bar #custom_logo_transparent").addClass("hidden");
                        }
                    }
                    jQuery(".header_style_wrapper").removeClass("scroll");
                    jQuery(".top_bar").removeClass("scroll");
                    jQuery(".top_bar").removeClass(jQuery("#tg_fixed_menu_color").val());
                    jQuery("#mobile_nav_icon").show();
                }
            } else {
                if (jQuery(this).scrollTop() >= 200) {
                    jQuery(".header_style_wrapper").addClass("nofixed");
                } else {
                    jQuery(".header_style_wrapper").removeClass("nofixed");
                }
            }
        });
    }
    jQuery(".post_img img").imagesLoaded(function () {
        jQuery(this).parent(".post_img").addClass("fadeIn");
    });
    jQuery(document).mouseenter(function () {
        jQuery("body").addClass("hover");
    });
    jQuery(document).mouseleave(function () {
        jQuery("body").removeClass("hover");
    });
    var siteBaseURL = jQuery("#pp_homepage_url").val();
    if (jQuery("#grandportfolio_ajax_search").val() != "") {
        jQuery("#s").on("input", function () {
            jQuery.ajax({
                url: siteBaseURL + "/wp-admin/admin-ajax.php",
                type: "POST",
                data: "action=grandportfolio_ajax_search&s=" + jQuery("#s").val(),
                success: function (results) {
                    jQuery("#autocomplete").html(results);
                    if (results != "") {
                        jQuery("#autocomplete").addClass("visible");
                        jQuery("#autocomplete").show();
                        jQuery("body.js_nav .mobile_menu_wrapper").css(
                            "overflow",
                            "visible"
                        );
                    } else {
                        jQuery("#autocomplete").hide();
                        jQuery("body.js_nav .mobile_menu_wrapper").css(
                            "overflow",
                            "scroll"
                        );
                    }
                },
            });
        });
        jQuery("#s").keypress(function (event) {
            if (event.which == 13) {
                event.preventDefault();
                jQuery("form#searchform").submit();
            }
        });
        jQuery("#s").focus(function () {
            if (jQuery("#autocomplete").html() != "") {
                jQuery("#autocomplete").addClass("visible");
                jQuery("#autocomplete").fadeIn();
            }
        });
        jQuery("#s").blur(function () {
            jQuery("#autocomplete").fadeOut();
        });
    }
    jQuery(".animated").imagesLoaded(function () {
        var windowWidth = jQuery(window).width();
        if (windowWidth >= 960) {
            jQuery(this).waypoint(
                function (direction) {
                    var animationClass = jQuery(this).data("animation");
                    jQuery(this).addClass(animationClass, direction === "down");
                },
                { offset: "100%" }
            );
        }
    });
    jQuery("#post_more_close").on("click", function () {
        jQuery("#post_more_wrapper").animate({ right: "-380px" }, 300);
        return false;
    });
    jQuery("#mobile_nav_icon").on("click", function () {
        jQuery("body,html").animate({ scrollTop: 0 }, 100);
        jQuery("body").toggleClass("js_nav");
        jQuery("#close_mobile_menu").addClass("open");
        if (is_touch_device()) {
            jQuery("body.js_nav").css("overflow", "auto");
        }
    });
    jQuery("#close_mobile_menu").on("click", function () {
        jQuery("body").removeClass("js_nav");
        jQuery(this).removeClass("open");
    });
    jQuery(".mobile_menu_close a").on("click", function () {
        jQuery("body").removeClass("js_nav");
    });
    jQuery(".close_alert").on("click", function () {
        var target = jQuery(this).data("target");
        jQuery("#" + target).fadeOut();
    });
    jQuery(".progress_bar").waypoint(
        function (direction) {
            jQuery(this).addClass("fadeIn");
            var progressContent = jQuery(this)
                .children(".progress_bar_holder")
                .children(".progress_bar_content");
            var progressWidth = progressContent.data("score");
            progressContent.css({ width: progressWidth + "%" });
        },
        { offset: "100%" }
    );
    jQuery(".tooltip").tooltipster();
    jQuery(".demotip").tooltipster({ position: "left" });
    jQuery(".portfolio_prev_next_link").each(function () {
        jQuery(this).tooltipster({
            content: jQuery(
                '<img src="' +
                jQuery(this).attr("data-img") +
                '" /><br/><div style="text-align:center;margin:7px 0 5px 0;"><strong>' +
                jQuery(this).attr("data-title") +
                "</strong></div>"
            ),
        });
    });
    jQuery(".post_prev_next_link").each(function () {
        jQuery(this).tooltipster({
            content: jQuery('<img src="' + jQuery(this).attr("data-img") + '" />'),
        });
    });
    jQuery(".post_share").on("click", function () {
        var targetShareID = jQuery(this).attr("data-share");
        var targetParentID = jQuery(this).attr("data-parent");
        jQuery(this).toggleClass("visible");
        jQuery("#" + targetShareID).toggleClass("slideUp");
        jQuery("#" + targetParentID).toggleClass("sharing");
        return false;
    });
    if (
        jQuery(".page_slider.menu_transparent").find(".rev_slider_wrapper").length >
        0
    ) {
        var sliderHeight = jQuery(".page_slider.menu_transparent")
            .find(".rev_slider_wrapper")
            .height();
        var topBarHeight = jQuery(".top_bar").height();
        if (jQuery(".above_top_bar").length > 0) {
            topBarHeight += jQuery(".above_top_bar").height();
        }
        if (
            jQuery(".page_slider.menu_transparent").find(
                ".rev_slider_wrapper.fullscreen-container"
            ).length > 0
        ) {
            var topBarHeight = 55;
        }
        jQuery(".ppb_wrapper").css("marginTop", sliderHeight - topBarHeight + "px");
        jQuery("#page_content_wrapper").css(
            "marginTop",
            sliderHeight - topBarHeight + "px"
        );
    }
    jQuery(window).resize(function () {
        if (
            jQuery(".page_slider.menu_transparent").find(".rev_slider_wrapper")
                .length > 0
        ) {
            var sliderHeight = jQuery(".page_slider.menu_transparent")
                .find(".rev_slider_wrapper")
                .height();
            var topBarHeight = jQuery(".top_bar").height();
            if (jQuery(".above_top_bar").length > 0) {
                topBarHeight += jQuery(".above_top_bar").height();
            }
            if (
                jQuery(".page_slider.menu_transparent").find(
                    ".rev_slider_wrapper.fullscreen-container"
                ).length > 0
            ) {
                var topBarHeight = 55;
            }
            jQuery(".ppb_wrapper").css(
                "marginTop",
                sliderHeight - topBarHeight + "px"
            );
            jQuery("#page_content_wrapper").css(
                "marginTop",
                sliderHeight - topBarHeight + "px"
            );
        }
    });
    jQuery(".skin_box").on("click", function () {
        jQuery(".skin_box").removeClass("selected");
        jQuery(this).addClass("selected");
        jQuery("#skin").val(jQuery(this).attr("data-color"));
    });
    jQuery("#demo_apply").on("click", function () {
        jQuery("#ajax_loading").addClass("visible");
        jQuery("body").addClass("loading");
        jQuery("form#form_option").submit();
    });
    jQuery("#option_wrapper").mouseenter(function () {
        jQuery("body").addClass("overflow_hidden");
    });
    jQuery("#option_wrapper").mouseleave(function () {
        jQuery("body").removeClass("overflow_hidden");
    });
    jQuery(".animate").waypoint(
        function (direction) {
            var windowWidth = jQuery(window).width();
            jQuery(this).addClass("visible", direction === "down");
        },
        { offset: "80%" }
    );
    var calScreenHeight = jQuery(window).height() - 108;
    var miniRightPos = 800;
    var cols = 3;
    var masonry = jQuery(".gallery_mansory_wrapper");
    masonry.imagesLoaded(function () {
        masonry.masonry({
            itemSelector: ".mansory_thumbnail",
            isResizable: true,
            isAnimated: true,
            isFitWidth: true,
            columnWidth: Math.floor(masonry.width() / cols),
        });
        masonry
            .children(".mansory_thumbnail")
            .children(".gallery_type")
            .each(function () {
                jQuery(this).addClass("fade-in");
            });
    });
    jQuery(window).resize(function () {
        var masonry = jQuery(".gallery_mansory_wrapper");
        masonry.imagesLoaded(function () {
            masonry.masonry({
                itemSelector: ".mansory_thumbnail",
                isResizable: true,
                isAnimated: true,
                isFitWidth: true,
                columnWidth: Math.floor(masonry.width() / cols),
            });
            masonry
                .children(".mansory_thumbnail")
                .children(".gallery_type")
                .each(function () {
                    jQuery(this).addClass("fade-in");
                });
        });
    });
    if (jQuery.browser.msie && parseFloat(jQuery.browser.version) < 10) {
        jQuery(".animate").css("opacity", 1);
        jQuery(".animate").css("visibility", "visible");
        jQuery(".animated").each(function () {
            jQuery(this).css("opacity", 1);
            jQuery(this).css("visibility", "visible");
        });
    }
    function launchFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    jQuery("#page_maximize").click(function () {
        launchFullscreen(document.documentElement);
        jQuery(this).hide();
        jQuery("#page_minimize").show();
    });
    jQuery("#page_minimize").click(function () {
        exitFullscreen();
        jQuery("#page_maximize").show();
        jQuery(this).hide();
    });
    jQuery("#page_share, #post_share_text").click(function () {
        jQuery("#overlay_background").addClass("visible");
        jQuery("#overlay_background").addClass("share_open");
        jQuery("#fullscreen_share_wrapper").css("visibility", "visible");
    });
    jQuery("#overlay_background").click(function () {
        if (!jQuery("body").hasClass("js_nav")) {
            jQuery("#overlay_background").removeClass("visible");
            jQuery("#overlay_background").removeClass("share_open");
            jQuery("#fullscreen_share_wrapper").css("visibility", "hidden");
        }
    });
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (
        msie > 0 ||
        !!navigator.userAgent.match(/Trident.*rv\:11\./) ||
        is_touch_device()
    ) {
        jQuery(".parallax").each(function () {
            var dataImgURL = jQuery(this).data("image");
            if (jQuery.type(dataImgURL) != "undefined") {
                jQuery(this).css("background-image", "url(" + dataImgURL + ")");
                jQuery(this).css("background-size", "cover");
                jQuery(this).css("background-position", "center center");
            }
        });
    } else {
        jQuery(".parallax").parallax();
        jQuery(window).resize(function () {
            jQuery(".parallax").each(function () {
                var parallaxHeight = jQuery(this).data("content-height");
                parallaxHeight = parseInt(
                    (parallaxHeight / 100) * jQuery(window).height()
                );
                jQuery(this).css("height", parallaxHeight + "px");
            });
            jQuery(window).trigger("hwparallax.reconfigure");
        });
    }
    var menuLayout = jQuery("#pp_menu_layout").val();
    if (jQuery(window).width() < 960 && menuLayout == "leftmenu") {
        document.getElementById("grandportfolio-leftmenu-css").disabled = true;
        jQuery(".mobile_menu_wrapper .logo_container").hide();
    }
    jQuery(window).resize(function () {
        if (jQuery(window).width() >= 960 && menuLayout == "leftmenu") {
            document.getElementById("grandportfolio-leftmenu-css").disabled = false;
            jQuery(".mobile_menu_wrapper .logo_container").show();
        } else if (jQuery(window).width() < 960 && menuLayout == "leftmenu") {
            document.getElementById("grandportfolio-leftmenu-css").disabled = true;
            jQuery(".mobile_menu_wrapper .logo_container").hide();
        }
    });
    jQuery(".rev_slider_wrapper.fullscreen-container").each(function () {
        jQuery(this).append('<div class="icon-scroll"></div>');
    });
    if (jQuery(".one.fullwidth.slideronly").length > 0) {
        jQuery("body").addClass("overflow_hidden");
    }
    jQuery("#fullscreen_gallery_view").click(function () {
        jQuery("#overlay_background_gallery").addClass("hidden");
        jQuery("#fullscreen_gallery_content_wrapper").addClass("hidden");
    });
});
jQuery(window).on("resize load", adjustIframes);
