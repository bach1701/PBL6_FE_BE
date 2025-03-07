/*
 * jQuery mmenu v6.0.7
 * @requires jQuery 1.6.0 or later
 *
 * mmenu.frebsite.nl
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */

;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.jquery_mmenu_js = factory(root.jQuery);
    }
}(this, function(jQuery) {

    ! function(t) {
        function e() {
            t[n].glbl || (o = {
                $wndw: t(window),
                $docu: t(document),
                $html: t("html"),
                $body: t("body")
            }, s = {}, a = {}, r = {}, t.each([s, a, r], function(t, e) {
                e.add = function(t) {
                    t = t.split(" ");
                    for (var n = 0, i = t.length; n < i; n++) e[t[n]] = e.mm(t[n])
                }
            }), s.mm = function(t) {
                return "mm-" + t
            }, s.add("wrapper menu panels panel nopanel highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen noanimation"), s.umm = function(t) {
                return "mm-" == t.slice(0, 3) && (t = t.slice(3)), t
            }, a.mm = function(t) {
                return "mm-" + t
            }, a.add("parent child"), r.mm = function(t) {
                return t + ".mm"
            }, r.add("transitionend webkitTransitionEnd click scroll resize keydown mousedown mouseup touchstart touchmove touchend orientationchange"), t[n]._c = s, t[n]._d = a, t[n]._e = r, t[n].glbl = o)
        }
        var n = "mmenu",
            i = "6.1.8";
        if (!(t[n] && t[n].version > i)) {
            t[n] = function(t, e, n) {
                return this.$menu = t, this._api = ["bind", "getInstance", "initPanels", "openPanel", "closePanel", "closeAllPanels", "setSelected"], this.opts = e, this.conf = n, this.vars = {}, this.cbck = {}, this.mtch = {}, "function" == typeof this.___deprecated && this.___deprecated(), this._initAddons(), this._initExtensions(), this._initMenu(), this._initPanels(), this._initOpened(), this._initAnchors(), this._initMatchMedia(), "function" == typeof this.___debug && this.___debug(), this
            }, t[n].version = i, t[n].addons = {}, t[n].uniqueId = 0, t[n].defaults = {
                extensions: [],
                initMenu: function() {},
                initPanels: function() {},
                navbar: {
                    add: !0,
                    title: "Menu",
                    titleLink: "parent"
                },
                onClick: {
                    setSelected: !0
                },
                slidingSubmenus: !0
            }, t[n].configuration = {
                classNames: {
                    divider: "Divider",
                    inset: "Inset",
                    nolistview: "NoListview",
                    nopanel: "NoPanel",
                    panel: "Panel",
                    selected: "Selected",
                    spacer: "Spacer",
                    vertical: "Vertical"
                },
                clone: !1,
                openingInterval: 25,
                panelNodetype: "ul, ol, div",
                transitionDuration: 400
            }, t[n].prototype = {
                getInstance: function() {
                    return this
                },
                initPanels: function(t) {
                    this._initPanels(t)
                },
                openPanel: function(e, i) {
                    if (this.trigger("openPanel:before", e), e && e.length && (e.is("." + s.panel) || (e = e.closest("." + s.panel)), e.is("." + s.panel))) {
                        var r = this;
                        if ("boolean" != typeof i && (i = !0), e.hasClass(s.vertical)) e.add(e.parents("." + s.vertical)).removeClass(s.hidden).parent("li").addClass(s.opened), this.openPanel(e.parents("." + s.panel).not("." + s.vertical).first()), this.trigger("openPanel:start", e), this.trigger("openPanel:finish", e);
                        else {
                            if (e.hasClass(s.opened)) return;
                            var o = this.$pnls.children("." + s.panel),
                                l = o.filter("." + s.opened);
                            if (!t[n].support.csstransitions) return l.addClass(s.hidden).removeClass(s.opened), e.removeClass(s.hidden).addClass(s.opened), this.trigger("openPanel:start", e), void this.trigger("openPanel:finish", e);
                            o.not(e).removeClass(s.subopened);
                            for (var d = e.data(a.parent); d;) d = d.closest("." + s.panel), d.is("." + s.vertical) || d.addClass(s.subopened), d = d.data(a.parent);
                            o.removeClass(s.highest).not(l).not(e).addClass(s.hidden), e.removeClass(s.hidden), this.openPanelStart = function() {
                                l.removeClass(s.opened), e.addClass(s.opened), e.hasClass(s.subopened) ? (l.addClass(s.highest), e.removeClass(s.subopened)) : (l.addClass(s.subopened), e.addClass(s.highest)), this.trigger("openPanel:start", e)
                            }, this.openPanelFinish = function() {
                                l.removeClass(s.highest).addClass(s.hidden), e.removeClass(s.highest), this.trigger("openPanel:finish", e)
                            }, i && !e.hasClass(s.noanimation) ? setTimeout(function() {
                                r.__transitionend(e, function() {
                                    r.openPanelFinish.call(r)
                                }, r.conf.transitionDuration), r.openPanelStart.call(r)
                            }, r.conf.openingInterval) : (this.openPanelStart.call(this), this.openPanelFinish.call(this))
                        }
                        this.trigger("openPanel:after", e)
                    }
                },
                closePanel: function(t) {
                    this.trigger("closePanel:before", t);
                    var e = t.parent();
                    e.hasClass(s.vertical) && (e.removeClass(s.opened), this.trigger("closePanel", t)), this.trigger("closePanel:after", t)
                },
                closeAllPanels: function(t) {
                    this.trigger("closeAllPanels:before"), this.$pnls.find("." + s.listview).children().removeClass(s.selected).filter("." + s.vertical).removeClass(s.opened);
                    var e = this.$pnls.children("." + s.panel),
                        n = t && t.length ? t : e.first();
                    this.$pnls.children("." + s.panel).not(n).removeClass(s.subopened).removeClass(s.opened).removeClass(s.highest).addClass(s.hidden), this.openPanel(n, !1), this.trigger("closeAllPanels:after")
                },
                togglePanel: function(t) {
                    var e = t.parent();
                    e.hasClass(s.vertical) && this[e.hasClass(s.opened) ? "closePanel" : "openPanel"](t)
                },
                setSelected: function(t) {
                    this.trigger("setSelected:before", t), this.$menu.find("." + s.listview).children("." + s.selected).removeClass(s.selected), t.addClass(s.selected), this.trigger("setSelected:after", t)
                },
                bind: function(t, e) {
                    this.cbck[t] = this.cbck[t] || [], this.cbck[t].push(e)
                },
                trigger: function() {
                    var t = this,
                        e = Array.prototype.slice.call(arguments),
                        n = e.shift();
                    if (this.cbck[n])
                        for (var i = 0, s = this.cbck[n].length; i < s; i++) this.cbck[n][i].apply(t, e)
                },
                matchMedia: function(t, e, n) {
                    var i = {
                        yes: e,
                        no: n
                    };
                    this.mtch[t] = this.mtch[t] || [], this.mtch[t].push(i)
                },
                _initAddons: function() {
                    this.trigger("initAddons:before");
                    var e;
                    for (e in t[n].addons) t[n].addons[e].add.call(this), t[n].addons[e].add = function() {};
                    for (e in t[n].addons) t[n].addons[e].setup.call(this);
                    this.trigger("initAddons:after")
                },
                _initExtensions: function() {
                    this.trigger("initExtensions:before");
                    var t = this;
                    this.opts.extensions.constructor === Array && (this.opts.extensions = {
                        all: this.opts.extensions
                    });
                    for (var e in this.opts.extensions) this.opts.extensions[e] = this.opts.extensions[e].length ? "mm-" + this.opts.extensions[e].join(" mm-") : "", this.opts.extensions[e] && ! function(e) {
                        t.matchMedia(e, function() {
                            this.$menu.addClass(this.opts.extensions[e])
                        }, function() {
                            this.$menu.removeClass(this.opts.extensions[e])
                        })
                    }(e);
                    this.trigger("initExtensions:after")
                },
                _initMenu: function() {
                    this.trigger("initMenu:before");
                    this.conf.clone && (this.$orig = this.$menu, this.$menu = this.$orig.clone(), this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function() {
                        t(this).attr("id", s.mm(t(this).attr("id")))
                    })), this.opts.initMenu.call(this, this.$menu, this.$orig), this.$menu.attr("id", this.$menu.attr("id") || this.__getUniqueId()), this.$pnls = t('<div class="' + s.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu);
                    var e = [s.menu];
                    this.opts.slidingSubmenus || e.push(s.vertical), this.$menu.addClass(e.join(" ")).parent().addClass(s.wrapper), this.trigger("initMenu:after")
                },
                _initPanels: function(e) {
                    this.trigger("initPanels:before", e), e = e || this.$pnls.children(this.conf.panelNodetype);
                    var n = t(),
                        i = this,
                        a = function(e) {
                            e.filter(this.conf.panelNodetype).each(function() {
                                var e = i._initPanel(t(this));
                                if (e) {
                                    i._initNavbar(e), i._initListview(e), n = n.add(e);
                                    var r = e.children("." + s.listview).children("li").children(i.conf.panelNodeType).add(e.children("." + i.conf.classNames.panel));
                                    r.length && a.call(i, r)
                                }
                            })
                        };
                    a.call(this, e), this.opts.initPanels.call(this, n), this.trigger("initPanels:after", n)
                },
                _initPanel: function(t) {
                    this.trigger("initPanel:before", t);
                    if (t.hasClass(s.panel)) return t;
                    if (this.__refactorClass(t, this.conf.classNames.panel, "panel"), this.__refactorClass(t, this.conf.classNames.nopanel, "nopanel"), this.__refactorClass(t, this.conf.classNames.vertical, "vertical"), this.__refactorClass(t, this.conf.classNames.inset, "inset"), t.filter("." + s.inset).addClass(s.nopanel), t.hasClass(s.nopanel)) return !1;
                    var e = t.hasClass(s.vertical) || !this.opts.slidingSubmenus;
                    t.removeClass(s.vertical);
                    var n = t.attr("id") || this.__getUniqueId();
                    t.removeAttr("id"), t.is("ul, ol") && (t.wrap("<div />"), t = t.parent()), t.addClass(s.panel + " " + s.hidden).attr("id", n);
                    var i = t.parent("li");
                    return e ? t.add(i).addClass(s.vertical) : t.appendTo(this.$pnls), i.length && (i.data(a.child, t), t.data(a.parent, i)), this.trigger("initPanel:after", t), t
                },
                _initNavbar: function(e) {
                    if (this.trigger("initNavbar:before", e), !e.children("." + s.navbar).length) {
                        var i = e.data(a.parent),
                            r = t('<div class="' + s.navbar + '" />'),
                            o = t[n].i18n(this.opts.navbar.title),
                            l = "";
                        if (i && i.length) {
                            if (i.hasClass(s.vertical)) return;
                            if (i.parent().is("." + s.listview)) var d = i.children("a, span").not("." + s.next);
                            else var d = i.closest("." + s.panel).find('a[href="#' + e.attr("id") + '"]');
                            d = d.first(), i = d.closest("." + s.panel);
                            var c = i.attr("id");
                            switch (o = d.text(), this.opts.navbar.titleLink) {
                                case "anchor":
                                    l = d.attr("href");
                                    break;
                                case "parent":
                                    l = "#" + c
                            }
                            r.append('<a class="' + s.btn + " " + s.prev + '" href="#' + c + '" />')
                        } else if (!this.opts.navbar.title) return;
                        this.opts.navbar.add && e.addClass(s.hasnavbar), r.append('<a class="' + s.title + '"' + (l.length ? ' href="' + l + '"' : "") + ">" + o + "</a>").prependTo(e), this.trigger("initNavbar:after", e)
                    }
                },
                _initListview: function(e) {
                    this.trigger("initListview:before", e);
                    var n = this.__childAddBack(e, "ul, ol");
                    this.__refactorClass(n, this.conf.classNames.nolistview, "nolistview"), n.filter("." + this.conf.classNames.inset).addClass(s.nolistview);
                    var i = n.not("." + s.nolistview).addClass(s.listview).children();
                    this.__refactorClass(i, this.conf.classNames.selected, "selected"), this.__refactorClass(i, this.conf.classNames.divider, "divider"), this.__refactorClass(i, this.conf.classNames.spacer, "spacer");
                    var r = e.data(a.parent);
                    if (r && r.parent().is("." + s.listview) && !r.children("." + s.next).length) {
                        var o = r.children("a, span").first(),
                            l = t('<a class="' + s.next + '" href="#' + e.attr("id") + '" />').insertBefore(o);
                        o.is("span") && l.addClass(s.fullsubopen)
                    }
                    this.trigger("initListview:after", e)
                },
                _initOpened: function() {
                    this.trigger("initOpened:before");
                    var t = this.$pnls.find("." + s.listview).children("." + s.selected).removeClass(s.selected).last().addClass(s.selected),
                        e = t.length ? t.closest("." + s.panel) : this.$pnls.children("." + s.panel).first();
                    this.openPanel(e, !1), this.trigger("initOpened:after")
                },
                _initAnchors: function() {
                    var e = this;
                    o.$body.on(r.click + "-oncanvas", "a[href]", function(i) {
                        var a = t(this),
                            r = !1,
                            o = e.$menu.find(a).length;
                        for (var l in t[n].addons)
                            if (t[n].addons[l].clickAnchor.call(e, a, o)) {
                                r = !0;
                                break
                            }
                        var d = a.attr("href");
                        if (!r && o && d.length > 1 && "#" == d.slice(0, 1)) try {
                            var c = t(d, e.$menu);
                            c.is("." + s.panel) && (r = !0, e[a.parent().hasClass(s.vertical) ? "togglePanel" : "openPanel"](c))
                        } catch (h) {}
                        if (r && i.preventDefault(), !r && o && a.is("." + s.listview + " > li > a") && !a.is('[rel="external"]') && !a.is('[target="_blank"]')) {
                            e.__valueOrFn(e.opts.onClick.setSelected, a) && e.setSelected(t(i.target).parent());
                            var f = e.__valueOrFn(e.opts.onClick.preventDefault, a, "#" == d.slice(0, 1));
                            f && i.preventDefault(), e.__valueOrFn(e.opts.onClick.close, a, f) && e.opts.offCanvas && "function" == typeof e.close && e.close()
                        }
                    })
                },
                _initMatchMedia: function() {
                    var t = this;
                    this._fireMatchMedia(), o.$wndw.on(r.resize, function(e) {
                        t._fireMatchMedia()
                    })
                },
                _fireMatchMedia: function() {
                    for (var t in this.mtch)
                        for (var e = window.matchMedia && window.matchMedia(t).matches ? "yes" : "no", n = 0; n < this.mtch[t].length; n++) this.mtch[t][n][e].call(this)
                },
                _getOriginalMenuId: function() {
                    var t = this.$menu.attr("id");
                    return this.conf.clone && t && t.length && (t = s.umm(t)), t
                },
                __api: function() {
                    var e = this,
                        n = {};
                    return t.each(this._api, function(t) {
                        var i = this;
                        n[i] = function() {
                            var t = e[i].apply(e, arguments);
                            return "undefined" == typeof t ? n : t
                        }
                    }), n
                },
                __valueOrFn: function(t, e, n) {
                    return "function" == typeof t ? t.call(e[0]) : "undefined" == typeof t && "undefined" != typeof n ? n : t
                },
                __refactorClass: function(t, e, n) {
                    return t.filter("." + e).removeClass(e).addClass(s[n])
                },
                __findAddBack: function(t, e) {
                    return t.find(e).add(t.filter(e))
                },
                __childAddBack: function(t, e) {
                    return t.children(e).add(t.filter(e))
                },
                __filterListItems: function(t) {
                    return t.not("." + s.divider).not("." + s.hidden)
                },
                __filterListItemAnchors: function(t) {
                    return this.__filterListItems(t).children("a").not("." + s.next)
                },
                __transitionend: function(t, e, n) {
                    var i = !1,
                        s = function(n) {
                            "undefined" != typeof n && n.target != t[0] || (i || (t.off(r.transitionend), t.off(r.webkitTransitionEnd), e.call(t[0])), i = !0)
                        };
                    t.on(r.transitionend, s), t.on(r.webkitTransitionEnd, s), setTimeout(s, 1.1 * n)
                },
                __getUniqueId: function() {
                    return s.mm(t[n].uniqueId++)
                }
            }, t.fn[n] = function(i, s) {
                e(), i = t.extend(!0, {}, t[n].defaults, i), s = t.extend(!0, {}, t[n].configuration, s);
                var a = t();
                return this.each(function() {
                    var e = t(this);
                    if (!e.data(n)) {
                        var r = new t[n](e, i, s);
                        r.$menu.data(n, r.__api()), a = a.add(r.$menu)
                    }
                }), a
            }, t[n].i18n = function() {
                var e = {};
                return function(n) {
                    switch (typeof n) {
                        case "object":
                            return t.extend(e, n), e;
                        case "string":
                            return e[n] || n;
                        case "undefined":
                        default:
                            return e
                    }
                }
            }(), t[n].support = {
                touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
                csstransitions: function() {
                    return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransitions || Modernizr.csstransitions
                }(),
                csstransforms: function() {
                    return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms || Modernizr.csstransforms
                }(),
                csstransforms3d: function() {
                    return "undefined" == typeof Modernizr || "undefined" == typeof Modernizr.csstransforms3d || Modernizr.csstransforms3d
                }()
            };
            var s, a, r, o
        }
    }(jQuery),

    function(t) {
        var e = "mmenu",
            n = "offCanvas";
        t[e].addons[n] = {
            setup: function() {
                if (this.opts[n]) {
                    var s = this,
                        a = this.opts[n],
                        o = this.conf[n];
                    r = t[e].glbl, this._api = t.merge(this._api, ["open", "close", "setPage"]), "object" != typeof a && (a = {}), "top" != a.position && "bottom" != a.position || (a.zposition = "front"), a = this.opts[n] = t.extend(!0, {}, t[e].defaults[n], a), "string" != typeof o.pageSelector && (o.pageSelector = "> " + o.pageNodetype), this.vars.opened = !1;
                    var l = [i.offcanvas];
                    "left" != a.position && l.push(i.mm(a.position)), "back" != a.zposition && l.push(i.mm(a.zposition)), t[e].support.csstransforms || l.push(i["no-csstransforms"]), t[e].support.csstransforms3d || l.push(i["no-csstransforms3d"]), this.bind("initMenu:after", function() {
                        var t = this;
                        this.setPage(r.$page), this._initBlocker(), this["_initWindow_" + n](), this.$menu.addClass(l.join(" ")).parent("." + i.wrapper).removeClass(i.wrapper), this.$menu[o.menuInsertMethod](o.menuInsertSelector);
                        var e = window.location.hash;
                        if (e) {
                            var s = this._getOriginalMenuId();
                            s && s == e.slice(1) && setTimeout(function() {
                                t.open()
                            }, 1e3)
                        }
                    }), this.bind("initExtensions:after", function() {
                        for (var t = [i.mm("widescreen"), i.mm("iconbar")], e = 0; e < t.length; e++)
                            for (var n in this.opts.extensions)
                                if (this.opts.extensions[n].indexOf(t[e]) > -1) {
                                    ! function(e, n) {
                                        s.matchMedia(e, function() {
                                            r.$html.addClass(t[n])
                                        }, function() {
                                            r.$html.removeClass(t[n])
                                        })
                                    }(n, e);
                                    break
                                }
                    }), this.bind("open:start:sr-aria", function() {
                        this.__sr_aria(this.$menu, "hidden", !1)
                    }), this.bind("close:finish:sr-aria", function() {
                        this.__sr_aria(this.$menu, "hidden", !0)
                    }), this.bind("initMenu:after:sr-aria", function() {
                        this.__sr_aria(this.$menu, "hidden", !0)
                    })
                }
            },
            add: function() {
                i = t[e]._c, s = t[e]._d, a = t[e]._e, i.add("offcanvas slideout blocking modal background opening blocker page no-csstransforms3d"), s.add("style")
            },
            clickAnchor: function(t, e) {
                var s = this;
                if (this.opts[n]) {
                    var a = this._getOriginalMenuId();
                    if (a && t.is('[href="#' + a + '"]')) {
                        if (e) return !0;
                        var o = t.closest("." + i.menu);
                        if (o.length) {
                            var l = o.data("mmenu");
                            if (l && l.close) return l.close(), s.__transitionend(o, function() {
                                s.open()
                            }, s.conf.transitionDuration), !0
                        }
                        return this.open(), !0
                    }
                    if (r.$page) return a = r.$page.first().attr("id"), a && t.is('[href="#' + a + '"]') ? (this.close(), !0) : void 0
                }
            }
        }, t[e].defaults[n] = {
            position: "left",
            zposition: "back",
            blockUI: !0,
            moveBackground: !0
        }, t[e].configuration[n] = {
            pageNodetype: "div",
            pageSelector: null,
            noPageSelector: [],
            wrapPageIfNeeded: !0,
            menuInsertMethod: "prependTo",
            menuInsertSelector: "body"
        }, t[e].prototype.open = function() {
            if (this.trigger("open:before"), !this.vars.opened) {
                var t = this;
                this._openSetup(), setTimeout(function() {
                    t._openFinish()
                }, this.conf.openingInterval), this.trigger("open:after")
            }
        }, t[e].prototype._openSetup = function() {
            var e = this,
                o = this.opts[n];
            this.closeAllOthers(), r.$page.each(function() {
                t(this).data(s.style, t(this).attr("style") || "")
            }), r.$wndw.trigger(a.resize + "-" + n, [!0]);
            var l = [i.opened];
            o.blockUI && l.push(i.blocking), "modal" == o.blockUI && l.push(i.modal), o.moveBackground && l.push(i.background), "left" != o.position && l.push(i.mm(this.opts[n].position)), "back" != o.zposition && l.push(i.mm(this.opts[n].zposition)), r.$html.addClass(l.join(" ")), setTimeout(function() {
                e.vars.opened = !0
            }, this.conf.openingInterval), this.$menu.addClass(i.opened)
        }, t[e].prototype._openFinish = function() {
            var t = this;
            this.__transitionend(r.$page.first(), function() {
                t.trigger("open:finish")
            }, this.conf.transitionDuration), this.trigger("open:start"), r.$html.addClass(i.opening)
        }, t[e].prototype.close = function() {
            if (this.trigger("close:before"), this.vars.opened) {
                var e = this;
                this.__transitionend(r.$page.first(), function() {
                    e.$menu.removeClass(i.opened);
                    var a = [i.opened, i.blocking, i.modal, i.background, i.mm(e.opts[n].position), i.mm(e.opts[n].zposition)];
                    r.$html.removeClass(a.join(" ")), r.$page.each(function() {
                        t(this).attr("style", t(this).data(s.style))
                    }), e.vars.opened = !1, e.trigger("close:finish")
                }, this.conf.transitionDuration), this.trigger("close:start"), r.$html.removeClass(i.opening), this.trigger("close:after")
            }
        }, t[e].prototype.closeAllOthers = function() {
            r.$body.find("." + i.menu + "." + i.offcanvas).not(this.$menu).each(function() {
                var n = t(this).data(e);
                n && n.close && n.close()
            })
        }, t[e].prototype.setPage = function(e) {
            this.trigger("setPage:before", e);
            var s = this,
                a = this.conf[n];
            e && e.length || (e = r.$body.find(a.pageSelector), a.noPageSelector.length && (e = e.not(a.noPageSelector.join(", "))), e.length > 1 && a.wrapPageIfNeeded && (e = e.wrapAll("<" + this.conf[n].pageNodetype + " />").parent())), e.each(function() {
                t(this).attr("id", t(this).attr("id") || s.__getUniqueId())
            }), e.addClass(i.page + " " + i.slideout), r.$page = e, this.trigger("setPage:after", e)
        }, t[e].prototype["_initWindow_" + n] = function() {
            r.$wndw.off(a.keydown + "-" + n).on(a.keydown + "-" + n, function(t) {
                if (r.$html.hasClass(i.opened) && 9 == t.keyCode) return t.preventDefault(), !1
            });
            var t = 0;
            r.$wndw.off(a.resize + "-" + n).on(a.resize + "-" + n, function(e, n) {
                if (1 == r.$page.length && (n || r.$html.hasClass(i.opened))) {
                    var s = r.$wndw.height();
                    (n || s != t) && (t = s, r.$page.css("minHeight", s))
                }
            })
        }, t[e].prototype._initBlocker = function() {
            var e = this;
            this.opts[n].blockUI && (r.$blck || (r.$blck = t('<div id="' + i.blocker + '" class="' + i.slideout + '" />')), r.$blck.appendTo(r.$body).off(a.touchstart + "-" + n + " " + a.touchmove + "-" + n).on(a.touchstart + "-" + n + " " + a.touchmove + "-" + n, function(t) {
                t.preventDefault(), t.stopPropagation(), r.$blck.trigger(a.mousedown + "-" + n)
            }).off(a.mousedown + "-" + n).on(a.mousedown + "-" + n, function(t) {
                t.preventDefault(), r.$html.hasClass(i.modal) || (e.closeAllOthers(), e.close())
            }))
        };
        var i, s, a, r
    }(jQuery),

    function(t) {
        var e = "mmenu",
            n = "scrollBugFix";
        t[e].addons[n] = {
            setup: function() {
                var s = this.opts[n];
                this.conf[n];
                r = t[e].glbl, t[e].support.touch && this.opts.offCanvas && this.opts.offCanvas.blockUI && ("boolean" == typeof s && (s = {
                    fix: s
                }), "object" != typeof s && (s = {}), s = this.opts[n] = t.extend(!0, {}, t[e].defaults[n], s), s.fix && (this.bind("open:start", function() {
                    this.$pnls.children("." + i.opened).scrollTop(0)
                }), this.bind("initMenu:after", function() {
                    this["_initWindow_" + n]()
                })))
            },
            add: function() {
                i = t[e]._c, s = t[e]._d, a = t[e]._e
            },
            clickAnchor: function(t, e) {}
        }, t[e].defaults[n] = {
            fix: !0
        }, t[e].prototype["_initWindow_" + n] = function() {
            var e = this;
            r.$docu.off(a.touchmove + "-" + n).on(a.touchmove + "-" + n, function(t) {
                r.$html.hasClass(i.opened) && t.preventDefault()
            });
            var s = !1;
            r.$body.off(a.touchstart + "-" + n).on(a.touchstart + "-" + n, "." + i.panels + "> ." + i.panel, function(t) {
                r.$html.hasClass(i.opened) && (s || (s = !0, 0 === t.currentTarget.scrollTop ? t.currentTarget.scrollTop = 1 : t.currentTarget.scrollHeight === t.currentTarget.scrollTop + t.currentTarget.offsetHeight && (t.currentTarget.scrollTop -= 1), s = !1))
            }).off(a.touchmove + "-" + n).on(a.touchmove + "-" + n, "." + i.panels + "> ." + i.panel, function(e) {
                r.$html.hasClass(i.opened) && t(this)[0].scrollHeight > t(this).innerHeight() && e.stopPropagation()
            }), r.$wndw.off(a.orientationchange + "-" + n).on(a.orientationchange + "-" + n, function() {
                e.$pnls.children("." + i.opened).scrollTop(0).css({
                    "-webkit-overflow-scrolling": "auto"
                }).css({
                    "-webkit-overflow-scrolling": "touch"
                })
            })
        };
        var i, s, a, r
    }(jQuery),

    function(t) {
        var e = "mmenu",
            n = "screenReader";
        t[e].addons[n] = {
            setup: function() {
                var a = this,
                    o = this.opts[n],
                    l = this.conf[n];
                r = t[e].glbl, "boolean" == typeof o && (o = {
                    aria: o,
                    text: o
                }), "object" != typeof o && (o = {}), o = this.opts[n] = t.extend(!0, {}, t[e].defaults[n], o), o.aria && (this.bind("initAddons:after", function() {
                    this.bind("initMenu:after", function() {
                        this.trigger("initMenu:after:sr-aria")
                    }), this.bind("initNavbar:after", function() {
                        this.trigger("initNavbar:after:sr-aria", arguments[0])
                    }), this.bind("openPanel:start", function() {
                        this.trigger("openPanel:start:sr-aria", arguments[0])
                    }), this.bind("close:start", function() {
                        this.trigger("close:start:sr-aria")
                    }), this.bind("close:finish", function() {
                        this.trigger("close:finish:sr-aria")
                    }), this.bind("open:start", function() {
                        this.trigger("open:start:sr-aria")
                    }), this.bind("open:finish", function() {
                        this.trigger("open:finish:sr-aria")
                    })
                }), this.bind("updateListview", function() {
                    this.$pnls.find("." + i.listview).children().each(function() {
                        a.__sr_aria(t(this), "hidden", t(this).is("." + i.hidden))
                    })
                }), this.bind("openPanel:start", function(t) {
                    var e = this.$menu.find("." + i.panel).not(t).not(t.parents("." + i.panel)),
                        n = t.add(t.find("." + i.vertical + "." + i.opened).children("." + i.panel));
                    this.__sr_aria(e, "hidden", !0), this.__sr_aria(n, "hidden", !1)
                }), this.bind("closePanel", function(t) {
                    this.__sr_aria(t, "hidden", !0)
                }), this.bind("initPanels:after", function(e) {
                    var n = e.find("." + i.prev + ", ." + i.next).each(function() {
                        a.__sr_aria(t(this), "owns", t(this).attr("href").replace("#", ""))
                    });
                    this.__sr_aria(n, "haspopup", !0)
                }), this.bind("initNavbar:after", function(t) {
                    var e = t.children("." + i.navbar);
                    this.__sr_aria(e, "hidden", !t.hasClass(i.hasnavbar))
                }), o.text && (this.bind("initlistview:after", function(t) {
                    var e = t.find("." + i.listview).find("." + i.fullsubopen).parent().children("span");
                    this.__sr_aria(e, "hidden", !0)
                }), "parent" == this.opts.navbar.titleLink && this.bind("initNavbar:after", function(t) {
                    var e = t.children("." + i.navbar),
                        n = !!e.children("." + i.prev).length;
                    this.__sr_aria(e.children("." + i.title), "hidden", n)
                }))), o.text && (this.bind("initAddons:after", function() {
                    this.bind("setPage:after", function() {
                        this.trigger("setPage:after:sr-text", arguments[0])
                    })
                }), this.bind("initNavbar:after", function(n) {
                    var s = n.children("." + i.navbar),
                        a = s.children("." + i.title).text(),
                        r = t[e].i18n(l.text.closeSubmenu);
                    a && (r += " (" + a + ")"), s.children("." + i.prev).html(this.__sr_text(r))
                }), this.bind("initListview:after", function(n) {
                    var r = n.data(s.parent);
                    if (r && r.length) {
                        var o = r.children("." + i.next),
                            d = o.nextAll("span, a").first().text(),
                            c = t[e].i18n(l.text[o.parent().is("." + i.vertical) ? "toggleSubmenu" : "openSubmenu"]);
                        d && (c += " (" + d + ")"), o.html(a.__sr_text(c))
                    }
                }))
            },
            add: function() {
                i = t[e]._c, s = t[e]._d, a = t[e]._e, i.add("sronly")
            },
            clickAnchor: function(t, e) {}
        }, t[e].defaults[n] = {
            aria: !0,
            text: !0
        }, t[e].configuration[n] = {
            text: {
                closeMenu: "Close menu",
                closeSubmenu: "Close submenu",
                openSubmenu: "Open submenu",
                toggleSubmenu: "Toggle submenu"
            }
        }, t[e].prototype.__sr_aria = function(t, e, n) {
            t.prop("aria-" + e, n)[n ? "attr" : "removeAttr"]("aria-" + e, n)
        }, t[e].prototype.__sr_text = function(t) {
            return '<span class="' + i.sronly + '">' + t + "</span>"
        };
        var i, s, a, r
    }(jQuery);
    return true;
}));

! function(t) {
    var e = "mmenu",
        n = "counters";
    t[e].addons[n] = {
        setup: function() {
            var s = this,
                d = this.opts[n];
            this.conf[n];
            if (c = t[e].glbl, "boolean" == typeof d && (d = {
                    add: d,
                    update: d
                }), "object" != typeof d && (d = {}), d = this.opts[n] = t.extend(!0, {}, t[e].defaults[n], d), this.bind("initListview:after", function(e) {
                    this.__refactorClass(t("em", e), this.conf.classNames[n].counter, "counter")
                }), d.add && this.bind("initListview:after", function(e) {
                    var n;
                    switch (d.addTo) {
                        case "panels":
                            n = e;
                            break;
                        default:
                            n = e.filter(d.addTo)
                    }
                    n.each(function() {
                        var e = t(this).data(a.parent);
                        e && (e.children("em." + i.counter).length || e.prepend(t('<em class="' + i.counter + '" />')))
                    })
                }), d.update) {
                var r = function(e) {
                    e = e || this.$pnls.children("." + i.panel), e.each(function() {
                        var e = t(this),
                            n = e.data(a.parent);
                        if (n) {
                            var c = n.children("em." + i.counter);
                            c.length && (e = e.children("." + i.listview), e.length && c.html(s.__filterListItems(e.children()).length))
                        }
                    })
                };
                this.bind("initListview:after", r), this.bind("updateListview", r)
            }
        },
        add: function() {
            i = t[e]._c, a = t[e]._d, s = t[e]._e, i.add("counter search noresultsmsg")
        },
        clickAnchor: function(t, e) {}
    }, t[e].defaults[n] = {
        add: !1,
        addTo: "panels",
        count: !1
    }, t[e].configuration.classNames[n] = {
        counter: "Counter"
    };
    var i, a, s, c
}(jQuery);